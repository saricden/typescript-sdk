<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@3rdweb/sdk](./sdk.md) &gt; [ThirdwebSDK](./sdk.thirdwebsdk.md) &gt; [getModuleList](./sdk.thirdwebsdk.getmodulelist.md)

## ThirdwebSDK.getModuleList() method

<b>Signature:</b>

```typescript
getModuleList(walletAddress: string): Promise<{
        address: string;
        moduleType: "DropERC721" | "TokenERC721" | "DropERC1155" | "TokenERC1155" | "TokenERC20" | "VoteERC20";
        metadata: () => Promise<{
            [x: string]: Json;
            description?: string | undefined;
            image?: string | undefined;
            external_link?: string | undefined;
            name: string;
            seller_fee_basis_points: number;
            fee_recipient: string;
        }> | Promise<{
            [x: string]: Json;
            description?: string | undefined;
            image?: string | undefined;
            external_link?: string | undefined;
            symbol: string;
            name: string;
        }> | Promise<{
            [x: string]: Json;
            description?: string | undefined;
            image?: string | undefined;
            external_link?: string | undefined;
            name: string;
            proposal_start_time_in_seconds: number;
            proposal_voting_time_in_seconds: number;
            voting_delay_in_blocks: number;
            voting_period_in_blocks: number;
            voting_token_address: string;
            voting_quorum_fraction: number;
            proposal_token_threshold: ethers$1.BigNumber;
        }>;
    }[]>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  walletAddress | string |  |

<b>Returns:</b>

Promise&lt;{ address: string; moduleType: "DropERC721" \| "TokenERC721" \| "DropERC1155" \| "TokenERC1155" \| "TokenERC20" \| "VoteERC20"; metadata: () =&gt; Promise&lt;{ \[x: string\]: Json; description?: string \| undefined; image?: string \| undefined; external\_link?: string \| undefined; name: string; seller\_fee\_basis\_points: number; fee\_recipient: string; }&gt; \| Promise&lt;{ \[x: string\]: Json; description?: string \| undefined; image?: string \| undefined; external\_link?: string \| undefined; symbol: string; name: string; }&gt; \| Promise&lt;{ \[x: string\]: Json; description?: string \| undefined; image?: string \| undefined; external\_link?: string \| undefined; name: string; proposal\_start\_time\_in\_seconds: number; proposal\_voting\_time\_in\_seconds: number; voting\_delay\_in\_blocks: number; voting\_period\_in\_blocks: number; voting\_token\_address: string; voting\_quorum\_fraction: number; proposal\_token\_threshold: ethers$1.BigNumber; }&gt;; }\[\]&gt;
