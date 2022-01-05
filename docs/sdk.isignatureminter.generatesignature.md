<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@3rdweb/sdk](./sdk.md) &gt; [ISignatureMinter](./sdk.isignatureminter.md) &gt; [generateSignature](./sdk.isignatureminter.generatesignature.md)

## ISignatureMinter.generateSignature() method

Generates a signature. This should only be called by wallets that have the `MINTER` role on the contract. Otherwise their signature won't be valid.

<b>Signature:</b>

```typescript
generateSignature(mintRequest: NewSignaturePayload): Promise<{
        payload: SignaturePayload;
        signature: string;
    }>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  mintRequest | [NewSignaturePayload](./sdk.newsignaturepayload.md) | The request to generate a signature for. |

<b>Returns:</b>

Promise&lt;{ payload: [SignaturePayload](./sdk.signaturepayload.md)<!-- -->; signature: string; }&gt;

- The payload (with the uri pre-populated) and signature.
