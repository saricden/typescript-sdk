---
slug: /sdk.marketplacedirect.cancellisting
title: MarketplaceDirect.cancelListing() method
hide_title: true
---
<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[@thirdweb-dev/sdk](./sdk.md) &gt; [MarketplaceDirect](./sdk.marketplacedirect.md) &gt; [cancelListing](./sdk.marketplacedirect.cancellisting.md)

## MarketplaceDirect.cancelListing() method

Cancel Direct Listing

**Signature:**

```typescript
cancelListing(listingId: BigNumberish): Promise<TransactionResult>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  listingId | BigNumberish |  |

**Returns:**

Promise&lt;[TransactionResult](./sdk.transactionresult.md)&gt;

## Remarks

Cancel a direct listing on the marketplace

## Example


```javascript
// The listing ID of the direct listing you want to cancel
const listingId = "0";

await contract.direct.cancelListing(listingId);
```