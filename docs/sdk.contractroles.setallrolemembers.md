<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@3rdweb/sdk](./sdk.md) &gt; [ContractRoles](./sdk.contractroles.md) &gt; [setAllRoleMembers](./sdk.contractroles.setallrolemembers.md)

## ContractRoles.setAllRoleMembers() method

Call this to OVERWRITE the list of addresses that are members of specific roles.

Every role in the list will be overwritten with the new list of addresses provided with them. If you want to add or remove addresses for a single address use [ContractRoles.grantRole()](./sdk.contractroles.grantrole.md) and [ContractRoles.revokeRole()](./sdk.contractroles.revokerole.md) respectively instead.

<b>Signature:</b>

```typescript
setAllRoleMembers(rolesWithAddresses: {
        [key in TRole]?: string[];
    }): Promise<TransactionResult>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  rolesWithAddresses | { \[key in TRole\]?: string\[\]; } | A record of [Role](./sdk.role.md)<!-- -->s to lists of addresses that should be members of the given role. |

<b>Returns:</b>

Promise&lt;TransactionResult&gt;

## Exceptions

If you are requestiong a role that does not exist on the contract this will throw an error.

## Example

Say you want to overwrite the list of addresses that are members of the minter role.

```javascript
const minterAddresses: string[] = await contract.getRoleMemberList("minter");
await contract.setAllRoleMembers({
 minter: []
});
console.log(await contract.getRoleMemberList("minter")); // No matter what members had the role before, the new list will be set to []
```
