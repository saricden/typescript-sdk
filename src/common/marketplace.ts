import { BigNumber, BigNumberish } from "ethers";
import {
  ERC165__factory,
  IERC1155,
  IERC1155__factory,
  IERC721,
  IERC721__factory,
} from "@thirdweb-dev/contracts";
import {
  InterfaceId_IERC1155,
  InterfaceId_IERC721,
} from "../constants/contract";
import { Provider } from "@ethersproject/providers";
import { ContractWrapper } from "../core/classes/contract-wrapper";
import { SignerOrProvider } from "../core";
import {
  NewAuctionListing,
  NewDirectListing,
  Offer,
} from "../types/marketplace";
import invariant from "tiny-invariant";
import { fetchCurrencyValue } from "./currency";
import { MAX_BPS } from "../schema/shared";

/**
 * This method checks if the given token is approved for the marketplace contract.
 * This is particularly useful for direct listings where the token
 * being listed may be moved before the listing is actually closed.
 *
 * TODO: Ask Jake/Krishang: do we need to also check the owners balance of the token,
 * based on the listing quantity? I.e. query the balance of the tokenId, and check if
 * the seller holds enough of the token
 *
 * @internal
 * @param provider - The connected provider
 * @param marketplaceAddress - The address of the marketplace contract
 * @param assetContract - The address of the asset contract.
 * @param tokenId - The token id of the token.
 * @param from - The address of the account that owns the token.
 * @returns - True if the marketplace is approved on the token, false otherwise.
 */
export async function isTokenApprovedForMarketplace(
  provider: Provider,
  marketplaceAddress: string,
  assetContract: string,
  tokenId: BigNumberish,
  from: string,
): Promise<boolean> {
  try {
    const erc165 = ERC165__factory.connect(assetContract, provider);
    const isERC721 = await erc165.supportsInterface(InterfaceId_IERC721);
    const isERC1155 = await erc165.supportsInterface(InterfaceId_IERC1155);
    if (isERC721) {
      const asset = IERC721__factory.connect(assetContract, provider);

      const approved = await asset.isApprovedForAll(from, marketplaceAddress);
      if (approved) {
        return true;
      }
      return (
        (await asset.getApproved(tokenId)).toLowerCase() ===
        marketplaceAddress.toLowerCase()
      );
    } else if (isERC1155) {
      const asset = IERC1155__factory.connect(assetContract, provider);
      return await asset.isApprovedForAll(from, marketplaceAddress);
    } else {
      console.error("Contract does not implement ERC 1155 or ERC 721.");
      return false;
    }
  } catch (err: any) {
    console.error("Failed to check if token is approved", err);
    return false;
  }
}

/**
 * Checks if the marketplace is approved to make transfers on the assetContract
 * If not, it tries to set the approval.
 * @param signerOrProvider
 * @param marketplaceAddress
 * @param assetContract
 * @param tokenId
 * @param from
 */
export async function handleTokenApproval(
  signerOrProvider: SignerOrProvider,
  marketplaceAddress: string,
  assetContract: string,
  tokenId: BigNumberish,
  from: string,
): Promise<void> {
  const erc165 = ERC165__factory.connect(assetContract, signerOrProvider);
  const isERC721 = await erc165.supportsInterface(InterfaceId_IERC721);
  const isERC1155 = await erc165.supportsInterface(InterfaceId_IERC1155);
  // check for token approval
  if (isERC721) {
    const asset = new ContractWrapper<IERC721>(
      signerOrProvider,
      assetContract,
      IERC721__factory.abi,
      {},
    );
    const approved = await asset.readContract.isApprovedForAll(
      from,
      marketplaceAddress,
    );
    if (!approved) {
      const isTokenApproved =
        (await asset.readContract.getApproved(tokenId)).toLowerCase() ===
        marketplaceAddress.toLowerCase();

      if (!isTokenApproved) {
        await asset.sendTransaction("setApprovalForAll", [
          marketplaceAddress,
          true,
        ]);
      }
    }
  } else if (isERC1155) {
    const asset = new ContractWrapper<IERC1155>(
      signerOrProvider,
      assetContract,
      IERC1155__factory.abi,
      {},
    );

    const approved = await asset.readContract.isApprovedForAll(
      from,
      marketplaceAddress,
    );
    if (!approved) {
      await asset.sendTransaction("setApprovalForAll", [
        marketplaceAddress,
        true,
      ]);
    }
  } else {
    throw Error("Contract must implement ERC 1155 or ERC 721.");
  }
}

/**
 * Used to verify fields in new listing.
 * @internal
 */
// TODO this should be done in zod
export function validateNewListingParam(
  param: NewDirectListing | NewAuctionListing,
) {
  invariant(
    param.assetContractAddress !== undefined &&
      param.assetContractAddress !== null,
    "Asset contract address is required",
  );
  invariant(
    param.buyoutPricePerToken !== undefined &&
      param.buyoutPricePerToken !== null,
    "Buyout price is required",
  );
  invariant(
    param.listingDurationInSeconds !== undefined &&
      param.listingDurationInSeconds !== null,
    "Listing duration is required",
  );
  invariant(
    param.startTimeInSeconds !== undefined && param.startTimeInSeconds !== null,
    "Start time is required",
  );
  invariant(
    param.tokenId !== undefined && param.tokenId !== null,
    "Token ID is required",
  );
  invariant(
    param.quantity !== undefined && param.quantity !== null,
    "Quantity is required",
  );

  switch (param.type) {
    case "NewAuctionListing": {
      invariant(
        param.reservePricePerToken !== undefined &&
          param.reservePricePerToken !== null,
        "Reserve price is required",
      );
    }
  }
}

/**
 * Maps a contract offer to the strict interface
 *
 * @internal
 * @param offer
 * @returns - An `Offer` object
 */
export async function mapOffer(
  provider: Provider,
  listingId: BigNumber,
  offer: any,
): Promise<Offer> {
  return {
    quantity: offer.quantityDesired,
    pricePerToken: offer.pricePerToken,
    currencyContractAddress: offer.currency,
    buyerAddress: offer.offeror,
    quantityDesired: offer.quantityWanted,
    currencyValue: await fetchCurrencyValue(
      provider,
      offer.currency,
      (offer.quantityWanted as BigNumber).mul(offer.pricePerToken as BigNumber),
    ),
    listingId,
  } as Offer;
}

export function isWinningBid(
  winningPrice: BigNumberish,
  newBidPrice: BigNumberish,
  bidBuffer: BigNumberish,
): boolean {
  bidBuffer = BigNumber.from(bidBuffer);
  winningPrice = BigNumber.from(winningPrice);
  newBidPrice = BigNumber.from(newBidPrice);
  const buffer = newBidPrice.sub(winningPrice).mul(MAX_BPS).div(winningPrice);
  return buffer.gte(bidBuffer);
}