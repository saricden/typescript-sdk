<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@3rdweb/sdk](./sdk.md) &gt; [NFTModule](./sdk.nftmodule.md) &gt; [balanceOf](./sdk.nftmodule.balanceof.md)

## NFTModule.balanceOf() method

Get NFT Balance

<b>Signature:</b>

```typescript
balanceOf(address: string): Promise<BigNumber>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  address | string |  |

<b>Returns:</b>

Promise&lt;BigNumber&gt;

The balance of the NFTs in the wallet

## Remarks

Get a wallets NFT balance (number of NFTs in this module owned by the wallet).

## Example


```javascript
// Address of the wallet to check NFT balance
const address = "{{wallet_address}}";

const balance = await module.balanceOf(address);
console.log(balance);
```
