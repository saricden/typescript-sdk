---
slug: /sdk.signaturepayloadinput
title: SignaturePayloadInput variable
hide_title: true
---
<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[@thirdweb-dev/sdk](./sdk.md) &gt; [SignaturePayloadInput](./sdk.signaturepayloadinput.md)

## SignaturePayloadInput variable

<b>Signature:</b>

```typescript
SignaturePayloadInput: z.ZodObject<{
    metadata: z.ZodObject<z.extendShape<{
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        image: z.ZodOptional<z.ZodUnion<[z.ZodTypeAny, z.ZodString]>>;
        external_url: z.ZodOptional<z.ZodUnion<[z.ZodTypeAny, z.ZodString]>>;
    }, {
        animation_url: z.ZodOptional<z.ZodUnion<[z.ZodTypeAny, z.ZodString]>>;
        background_color: z.ZodOptional<z.ZodUnion<[z.ZodEffects<z.ZodString, string, string>, z.ZodString]>>;
        properties: z.ZodEffects<z.ZodEffects<z.ZodOptional<z.ZodUnion<[z.ZodEffects<z.ZodArray<z.ZodObject<{
            key: z.ZodString;
            value: z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>, z.ZodUnion<[z.ZodTypeAny, z.ZodString]>]>;
        }, "strip", z.ZodTypeAny, {
            value?: any;
            key: string;
        }, {
            value?: any;
            key: string;
        }>, "many">, {
            value?: any;
            key: string;
        }[], {
            value?: any;
            key: string;
        }[]>, z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>, z.ZodUnion<[z.ZodTypeAny, z.ZodString]>]>>]>>, {
            value?: any;
            key: string;
        }[] | Record<string, any> | undefined, {
            value?: any;
            key: string;
        }[] | Record<string, any> | undefined>, Record<string, any> | undefined, {
            value?: any;
            key: string;
        }[] | Record<string, any> | undefined>;
    }>, "strip", z.ZodLazy<z.ZodType<Json, z.ZodTypeDef, Json>>, {
        [x: string]: Json;
        description?: string | undefined;
        image?: any;
        external_url?: any;
        animation_url?: any;
        background_color?: string | undefined;
        properties?: Record<string, any> | undefined;
        name: string;
    }, {
        [x: string]: Json;
        description?: string | undefined;
        image?: any;
        external_url?: any;
        animation_url?: any;
        background_color?: string | undefined;
        properties?: {
            value?: any;
            key: string;
        }[] | Record<string, any> | undefined;
        name: string;
    }>;
    to: z.ZodDefault<z.ZodString>;
    price: z.ZodDefault<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodNumber]>, string, string | number>>;
    currencyAddress: z.ZodDefault<z.ZodString>;
    mintStartTime: z.ZodEffects<z.ZodDefault<z.ZodDate>, ethers$1.BigNumber, Date | undefined>;
    mintEndTime: z.ZodEffects<z.ZodDefault<z.ZodDate>, ethers$1.BigNumber, Date | undefined>;
    uid: z.ZodEffects<z.ZodOptional<z.ZodString>, string, string | undefined>;
    royaltyRecipient: z.ZodDefault<z.ZodString>;
    royaltyBps: z.ZodDefault<z.ZodNumber>;
    primarySaleRecipient: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    currencyAddress: string;
    price: string;
    metadata: {
        [x: string]: Json;
        description?: string | undefined;
        image?: any;
        external_url?: any;
        animation_url?: any;
        background_color?: string | undefined;
        properties?: Record<string, any> | undefined;
        name: string;
    };
    to: string;
    mintStartTime: ethers$1.BigNumber;
    mintEndTime: ethers$1.BigNumber;
    uid: string;
    royaltyRecipient: string;
    royaltyBps: number;
    primarySaleRecipient: string;
}, {
    currencyAddress?: string | undefined;
    price?: string | number | undefined;
    to?: string | undefined;
    mintStartTime?: Date | undefined;
    mintEndTime?: Date | undefined;
    uid?: string | undefined;
    royaltyRecipient?: string | undefined;
    royaltyBps?: number | undefined;
    primarySaleRecipient?: string | undefined;
    metadata: {
        [x: string]: Json;
        description?: string | undefined;
        image?: any;
        external_url?: any;
        animation_url?: any;
        background_color?: string | undefined;
        properties?: {
            value?: any;
            key: string;
        }[] | Record<string, any> | undefined;
        name: string;
    };
}>
```