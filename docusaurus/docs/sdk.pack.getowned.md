---
slug: /sdk.pack.getowned
title: Pack.getOwned() method
hide_title: true
---
<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[@thirdweb-dev/sdk](./sdk.md) &gt; [Pack](./sdk.pack.md) &gt; [getOwned](./sdk.pack.getowned.md)

## Pack.getOwned() method

`getOwned` is a convenience method for getting all owned tokens for a particular wallet.

**Signature:**

```typescript
getOwned(_address?: string): Promise<PackMetadataWithBalance[]>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  \_address | string | The address to check for token ownership |

**Returns:**

Promise&lt;[PackMetadataWithBalance](./sdk.packmetadatawithbalance.md)\[\]&gt;

An array of PackMetadataWithBalance objects that are owned by the address
