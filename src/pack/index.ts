import { BigNumber, BigNumberish, BytesLike, ethers } from "ethers";
import { getRoleHash, ModuleType, Role } from "../common";
import { NotFoundError } from "../common/error";
import { uploadMetadata } from "../common/ipfs";
import { getMetadataWithoutContract, NFTMetadata } from "../common/nft";
import { Module } from "../core/module";
import {
  ERC1155__factory,
  Pack as PackContract,
  Pack__factory,
} from "../types";

/**
 * @public
 */
export interface PackMetadata {
  id: string;
  creator: string;
  currentSupply: BigNumber;
  openStart: Date | null;
  openEnd: Date | null;
  metadata: NFTMetadata;
}

/**
 * @public
 */
export interface PackNFT {
  supply: BigNumber;
  metadata: NFTMetadata;
}

/**
 * @public
 */
export interface IPackCreateArgs {
  assetContract: string;
  metadata: string | Record<string, any>;
  assets: {
    tokenId: BigNumberish;
    amount: BigNumberish;
  }[];
  secondsUntilOpenStart?: number;
  secondsUntilOpenEnd?: number;
  rewardsPerOpen?: number;
}

/**
 * @public
 */
export interface IPackBatchArgs {
  tokenId: BigNumberish;
  amount: BigNumberish;
}

/**
 * The PackModule. This should always be created via `getPackModule()` on the main SDK.
 * @public
 */
export class PackModule extends Module {
  public static moduleType: ModuleType = ModuleType.PACK;

  private __contract: PackContract | null = null;
  /**
   * @internal - This is a temporary way to access the underlying contract directly and will likely become private once this module implements all the contract functions.
   */
  public get contract(): PackContract {
    return this.__contract || this.connectContract();
  }
  private set contract(value: PackContract) {
    this.__contract = value;
  }

  /**
   * @internal
   */
  protected connectContract(): PackContract {
    return (this.contract = Pack__factory.connect(
      this.address,
      this.providerOrSigner,
    ));
  }

  public async open(packId: string): Promise<NFTMetadata[]> {
    const tx = await this.contract.openPack(packId);
    const receipt = await tx.wait();

    const event = receipt?.events?.find((e) => e.event === "PackOpenRequest");
    const args = event?.args;
    const requestId = args?.requestId as string;
    const opener = args?.opener as string;

    const fulfillEvent: any = await new Promise((resolve) => {
      this.contract.once(
        // eslint-disable-next-line new-cap
        this.contract.filters.PackOpenFulfilled(null, opener),
        (_packId, _opener, _requestId, rewardContract, rewardIds) => {
          if (requestId === _requestId) {
            resolve({
              packId: _packId,
              opener: _opener,
              requestId,
              rewardContract,
              rewardIds,
            });
          }
        },
      );
    });
    const { rewardIds } = fulfillEvent;
    return await Promise.all(
      rewardIds.map((rewardId: BigNumber) =>
        getMetadataWithoutContract(
          this.providerOrSigner,
          this.address,
          rewardId.toString(),
          this.ipfsGatewayUrl,
        ),
      ),
    );
  }

  public async get(packId: string): Promise<PackMetadata> {
    const [meta, state] = await Promise.all([
      await getMetadataWithoutContract(
        this.providerOrSigner,
        this.address,
        packId,
        this.ipfsGatewayUrl,
      ),
      this.contract.getPack(packId),
    ]);
    const entity: PackMetadata = {
      id: packId,
      metadata: meta,
      creator: state.creator,
      currentSupply: state.currentSupply,
      openStart: state.openStart.gt(0)
        ? new Date(state.openStart.toNumber() * 1000)
        : null,
      openEnd: state.openEnd.lte(Number.MAX_SAFE_INTEGER - 1)
        ? new Date(state.openEnd.toNumber() * 1000)
        : null,
    };
    return entity;
  }

  public async getAll(): Promise<PackMetadata[]> {
    const maxId = (await this.contract.nextTokenId()).toNumber();
    return await Promise.all(
      Array.from(Array(maxId).keys()).map((i) => this.get(i.toString())),
    );
  }

  public async getNFTs(packId: string): Promise<PackNFT[]> {
    const packReward = await this.contract.getPackWithRewards(packId);
    if (!packReward.source) {
      throw new NotFoundError();
    }
    const rewards = await Promise.all(
      packReward.tokenIds.map((tokenId) =>
        getMetadataWithoutContract(
          this.providerOrSigner,
          this.address,
          tokenId.toString(),
          this.ipfsGatewayUrl,
        ),
      ),
    );
    return rewards.map((reward, i) => ({
      supply: packReward.amountsPacked[i],
      metadata: reward,
    }));
  }

  // passthrough to the contract
  public balanceOf = async (address: string, tokenId: string) =>
    this.contract.balanceOf(address, tokenId);

  public balance = async (tokenId: string) =>
    this.contract.balanceOf(await this.getSignerAddress(), tokenId);

  public isApproved = async (address: string, operator: string) =>
    this.contract.isApprovedForAll(address, operator);

  public setApproval = async (operator: string, approved = true) => {
    const tx = await this.contract.setApprovalForAll(operator, approved);
    await tx.wait();
  };

  public transfer = async (to: string, tokenId: string, amount: BigNumber) => {
    const tx = await this.contract.safeTransferFrom(
      await this.getSignerAddress(),
      to,
      tokenId,
      amount,
      [0],
    );
    await tx.wait();
  };

  // owner functions
  public createPack = async (args: IPackCreateArgs): Promise<PackMetadata> => {
    const asset = ERC1155__factory.connect(
      args.assetContract,
      this.providerOrSigner,
    );

    const from = await this.getSignerAddress();
    const ids = args.assets.map((a) => a.tokenId);
    const amounts = args.assets.map((a) => a.amount);
    const uri = await uploadMetadata(args.metadata);

    const packParams = ethers.utils.defaultAbiCoder.encode(
      ["string", "uint256", "uint256", "uint256"],
      [
        uri,
        args.secondsUntilOpenStart || 0,
        args.secondsUntilOpenEnd || 0,
        args.rewardsPerOpen || 1,
      ],
    );

    const tx = await asset.safeBatchTransferFrom(
      from,
      this.address,
      ids,
      amounts,
      packParams,
    );
    const receipt = await tx.wait();
    const event = receipt?.events?.find((e) => e.event === "PackCreated");
    const packId = event?.args?.packId;
    return await this.get(packId);
  };

  public transferFrom = async (
    from: string,
    to: string,
    args: IPackBatchArgs,
    data: BytesLike = [0],
  ) => {
    const tx = await this.contract.safeTransferFrom(
      from,
      to,
      args.tokenId,
      args.amount,
      data,
    );
    await tx.wait();
  };

  public transferBatchFrom = async (
    from: string,
    to: string,
    args: IPackBatchArgs[],
    data: BytesLike = [0],
  ) => {
    const ids = args.map((a) => a.tokenId);
    const amounts = args.map((a) => a.amount);
    const tx = await this.contract.safeBatchTransferFrom(
      from,
      to,
      ids,
      amounts,
      data,
    );
    await tx.wait();
  };

  // owner functions
  public transferLink = async (to: string, amount: BigNumberish) => {
    const tx = await this.contract.transferLink(to, amount);
    await tx.wait();
  };

  public setRoyaltyBps = async (amount: number) => {
    const tx = await this.contract.setRoyaltyBps(amount);
    await tx.wait();
  };

  public setModuleMetadata = async (metadata: string | Record<string, any>) => {
    const uri = await uploadMetadata(metadata);
    const tx = await this.contract.setContractURI(uri);
    await tx.wait();
  };

  public async grantRole(role: Role, address: string) {
    const tx = await this.contract.grantRole(getRoleHash(role), address);
    await tx.wait();
  }

  public async revokeRole(role: Role, address: string) {
    const tx = await this.contract.revokeRole(getRoleHash(role), address);
    await tx.wait();
  }
}
