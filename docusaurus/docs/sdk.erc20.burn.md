---
slug: /sdk.erc20.burn
title: Erc20.burn() method
hide_title: true
---
<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[@thirdweb-dev/sdk](./sdk.md) &gt; [Erc20](./sdk.erc20.md) &gt; [burn](./sdk.erc20.burn.md)

## Erc20.burn() method

Burn Tokens

**Signature:**

```typescript
burn(amount: BigNumberish): Promise<TransactionResult>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  amount | BigNumberish |  |

**Returns:**

Promise&lt;[TransactionResult](./sdk.transactionresult.md)&gt;

## Remarks

Burn tokens held by the connected wallet

## Example


```javascript
// The amount of this token you want to burn
const amount = 100;

await contract.burn(amount);
```
