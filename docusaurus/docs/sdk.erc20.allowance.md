---
slug: /sdk.erc20.allowance
title: Erc20.allowance() method
hide_title: true
---
<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[@thirdweb-dev/sdk](./sdk.md) &gt; [Erc20](./sdk.erc20.md) &gt; [allowance](./sdk.erc20.allowance.md)

## Erc20.allowance() method

Get Token Allowance

**Signature:**

```typescript
allowance(spender: string): Promise<BigNumber>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  spender | string |  |

**Returns:**

Promise&lt;BigNumber&gt;

The allowance of one wallet over anothers funds.

## Remarks

Get the allowance of a 'spender' wallet over the connected wallet's funds - the allowance of a different address for a token is the amount of tokens that the `spender` wallet is allowed to spend on behalf of the connected wallet.

## Example


```javascript
// Address of the wallet to check token allowance
const spenderAddress = "0x...";

const allowance = await contract.allowanceOf(otherAddress);
console.log(allowance);
```