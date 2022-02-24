---
slug: /sdk.currencyvalueschema
title: CurrencyValueSchema variable
hide_title: true
---
<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[@thirdweb-dev/sdk](./sdk.md) &gt; [CurrencyValueSchema](./sdk.currencyvalueschema.md)

## CurrencyValueSchema variable

<b>Signature:</b>

```typescript
CurrencyValueSchema: z.ZodObject<z.extendShape<{
    name: z.ZodString;
    symbol: z.ZodString;
    decimals: z.ZodNumber;
}, {
    value: z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBigInt, z.ZodType<ethers.BigNumber, z.ZodTypeDef, ethers.BigNumber>]>, ethers.BigNumber, string | number | bigint | ethers.BigNumber>;
    displayValue: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    symbol: string;
    value: ethers.BigNumber;
    name: string;
    decimals: number;
    displayValue: string;
}, {
    symbol: string;
    value: string | number | bigint | ethers.BigNumber;
    name: string;
    decimals: number;
    displayValue: string;
}>
```