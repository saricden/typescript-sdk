<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@thirdweb-dev/sdk](./sdk.md) &gt; [ContractDeployer](./sdk.contractdeployer.md) &gt; [deploySplit](./sdk.contractdeployer.deploysplit.md)

## ContractDeployer.deploySplit() method

Deploys a new Split contract

<b>Signature:</b>

```typescript
deploySplit(metadata: z.input<typeof Split.schema.deploy>): Promise<string>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  metadata | z.input&lt;typeof Split.schema.deploy&gt; | the contract metadata |

<b>Returns:</b>

Promise&lt;string&gt;

the address of the deployed contract

