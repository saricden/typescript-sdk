---
slug: /sdk.contractdeployer.deploytoken
title: ContractDeployer.deployToken() method
hide_title: true
---
<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[@thirdweb-dev/sdk](./sdk.md) &gt; [ContractDeployer](./sdk.contractdeployer.md) &gt; [deployToken](./sdk.contractdeployer.deploytoken.md)

## ContractDeployer.deployToken() method

Deploys a new Token contract

**Signature:**

```typescript
deployToken(metadata: z.input<typeof Token.schema.deploy>): Promise<string>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  metadata | z.input&lt;typeof Token.schema.deploy&gt; | the contract metadata |

**Returns:**

Promise&lt;string&gt;

the address of the deployed contract
