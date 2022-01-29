<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@3rdweb/sdk](./sdk.md) &gt; [MarketplaceModule](./sdk.marketplacemodule.md) &gt; [getWinningBid](./sdk.marketplacemodule.getwinningbid.md)

## MarketplaceModule.getWinningBid() method

Get Highest Bid

<b>Signature:</b>

```typescript
getWinningBid(listingId: BigNumberish): Promise<Offer | undefined>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  listingId | BigNumberish |  |

<b>Returns:</b>

Promise&lt;[Offer](./sdk.offer.md) \| undefined&gt;

## Remarks

Get the current highest bid of an active auction.

## Example


```javascript
// The listing ID of the auction that closed
const listingId = 0;

module
  .getWinningBid(listingId)
  .then((offer) => console.log(offer))
  .catch((err) => console.error(err));
```
