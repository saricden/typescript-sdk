---
slug: /sdk.editionmetadatainputschema
title: EditionMetadataInputSchema variable
hide_title: true
---
<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[@thirdweb-dev/sdk](./sdk.md) &gt; [EditionMetadataInputSchema](./sdk.editionmetadatainputschema.md)

## EditionMetadataInputSchema variable

<b>Signature:</b>

```typescript
EditionMetadataInputSchema: z.ZodObject<{
    supply: z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBigInt, z.ZodType<ethers.BigNumber, z.ZodTypeDef, ethers.BigNumber>]>, ethers.BigNumber, string | number | bigint | ethers.BigNumber>, string, string | number | bigint | ethers.BigNumber>;
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
}, "strip", z.ZodTypeAny, {
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
    supply: string;
}, {
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
    supply: string | number | bigint | ethers.BigNumber;
}>
```