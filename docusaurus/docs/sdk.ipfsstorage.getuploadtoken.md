---
slug: /sdk.ipfsstorage.getuploadtoken
title: IpfsStorage.getUploadToken() method
hide_title: true
---
<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[@thirdweb-dev/sdk](./sdk.md) &gt; [IpfsStorage](./sdk.ipfsstorage.md) &gt; [getUploadToken](./sdk.ipfsstorage.getuploadtoken.md)

## IpfsStorage.getUploadToken() method

Fetches a one-time-use upload token that can used to upload a file to storage.

**Signature:**

```typescript
getUploadToken(contractAddress: string): Promise<string>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  contractAddress | string |  |

**Returns:**

Promise&lt;string&gt;

- The one time use token that can be passed to the Pinata API.