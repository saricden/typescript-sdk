import { Voucher } from "./../types/voucher/Voucher";
import { SignatureMint721, SignatureMint721__factory } from "@3rdweb/contracts";
import { MintRequestStructOutput } from "@3rdweb/contracts/dist/SignatureMint721";
import { TransactionReceipt } from "@ethersproject/providers";
import { sign } from "crypto";
import { Signer } from "ethers";
import { formatBytes32String, hexlify, toUtf8Bytes } from "ethers/lib/utils";
import { v4 as uuidv4 } from "uuid";
import { ModuleType } from "../common";
import { Module } from "../core/module";
import { MetadataURIOrObject } from "../core/types";
import { IVoucher } from "../interfaces/modules";
import { NewMintRequest, Voucher } from "../types";

const EIP712Domain = [
  { name: "name", type: "string" },
  { name: "version", type: "string" },
  { name: "chainId", type: "uint256" },
  { name: "verifyingContract", type: "address" },
];

const MintRequest = [
  { name: "to", type: "address" },
  { name: "uri", type: "string" },
  { name: "price", type: "uint256" },
  { name: "currency", type: "address" },
  { name: "validityStartTimestamp", type: "uint128" },
  { name: "validityEndTimestamp", type: "uint128" },
  { name: "uid", type: "bytes32" },
];

/**
 * Access this module by calling {@link ThirdwebSDK.getVoucherModule}
 *
 * @alpha
 * @public
 */
export class VoucherModule
  extends Module<SignatureMint721>
  implements IVoucher
{
  public static moduleType: ModuleType = ModuleType.VOUCHER as const;

  /**
   * @internal
   */
  protected connectContract(): SignatureMint721 {
    return SignatureMint721__factory.connect(
      this.address,
      this.providerOrSigner,
    );
  }

  /**
   * @internal
   */
  protected getModuleType(): ModuleType {
    return VoucherModule.moduleType;
  }

  public async setModuleMetadata(
    metadata: MetadataURIOrObject,
  ): Promise<TransactionReceipt> {
    const uri = await this.sdk.getStorage().uploadMetadata(metadata);
    return await this.sendTransaction("setContractURI", [uri]);
  }

  mint(req: NewMintRequest): Promise<string> {
    throw new Error("Method not implemented.");
  }
  mintBatch(tokenMetadata: NewMintRequest[]): Promise<string[]> {
    throw new Error("Method not implemented.");
  }

  public async verify(
    mintRequest: Voucher,
    signature: string,
  ): Promise<boolean> {
    const message = {
      to: mintRequest.to,
      uri: mintRequest.uri,
      price: mintRequest.price,
      currency: mintRequest.currencyAddress,
      validityEndTimestamp: mintRequest.voucherEndTimeEpochSeconds,
      validityStartTimestamp: mintRequest.voucherStartTimeEpochSeconds,
      uid: mintRequest.id,
    } as MintRequestStructOutput;

    return await this.readOnlyContract.verify(message, signature);
  }

  claim(mintRequest: Voucher, signature: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async generateSignature(
    mintRequest: NewMintRequest,
  ): Promise<{ voucher: Voucher; signature: string }> {
    let id = mintRequest.id;
    if (mintRequest.id === undefined) {
      console.warn("mintRequest.id is an empty string, generating uuid-v4");
      const buffer = Buffer.alloc(16);
      uuidv4({}, buffer);
      id = hexlify(toUtf8Bytes(buffer.toString("hex")));
    } else {
      id = hexlify(id as string);
    }

    const metadataUri = await this.sdk
      .getStorage()
      .uploadMetadata(mintRequest.metadata);

    const from = await this.getSignerAddress();
    const signer = (await this.getSigner()) as Signer;

    const message = {
      to: mintRequest.to,
      uri: metadataUri,
      price: mintRequest.price,
      currency: mintRequest.currencyAddress,
      validityEndTimestamp: mintRequest.voucherEndTimeEpochSeconds,
      validityStartTimestamp: mintRequest.voucherStartTimeEpochSeconds,
      uid: id,
    } as MintRequestStructOutput;
    const chainId = await this.getChainID();
    const signature = await this.signTypedData(
      signer,
      from,
      {
        name: "SignatureMint721",
        version: "1",
        chainId,
        verifyingContract: this.address,
      },
      { MintRequest },
      message,
    );

    return {
      voucher: {
        ...mintRequest,
        id,
        uri: metadataUri,
      },
      signature: signature.toString(),
    };
  }
}