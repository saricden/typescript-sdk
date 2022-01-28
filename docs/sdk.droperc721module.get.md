<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@3rdweb/sdk](./sdk.md) &gt; [DropErc721Module](./sdk.droperc721module.md) &gt; [get](./sdk.droperc721module.get.md)

## DropErc721Module.get() method

Get a single NFT Metadata

<b>Signature:</b>

```typescript
get(tokenId: BigNumberish): Promise<NFTMetadataOwner>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  tokenId | BigNumberish | the tokenId of the NFT to retrieve |

<b>Returns:</b>

Promise&lt;NFTMetadataOwner&gt;

The NFT metadata

## Example


```javascript
const nft = await module.get("0");
console.log(nft);
```
