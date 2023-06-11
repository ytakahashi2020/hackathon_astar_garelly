# 1 Astar Networkの使用

activeChainにAstarを設定しています。

```ts:_app.tsx
import { Astar } from "@thirdweb-dev/chains";


 <ThirdwebProvider activeChain={Astar}>
      <ContractsProvider>
        <Component {...pageProps} />
      </ContractsProvider>
    </ThirdwebProvider>
```

# 2 コントラクト・NFTの抽出

thirdwebSDKの「useContract」、「useNFTs」を使用しています。

```ts:index.tsx
    const { searchContract, setSearchContract } = useContext(ContractsContext);

    const { contract } = useContract(searchContract);
    const { data: nfts, isLoading: isLoadingNFTs } = useNFTs(
    contract,
    {
      count: count,
      start: (page - 1) * count
    }
  )
```

# 3 NFTの表示

変数「isLoadingNFTs」を使い、ローディングが終わっている場合は変数「nfts」をmapします。

「nfts」が存在する場合に、「NFTCard」コンポーネントを使用しています。

```ts:index.tsx
    <div className={styles.NFTGrid}>
        {!isLoadingNFTs && (
          nfts?.map((nft, index) => (
            <NFTCard key={index} nft={nft} />
          ) 
        ))}
    </div>
```

# 4 NFTCard

画像の表示は、「ThirdwebNftMedia」を使用しています。

画像を押下した時、個別表示となるようにしています。

```js:NFTCard.js
export const NFTCard = ({ nft }) => {
  return (
    <Link href={`/nft/${nft.metadata.id}`}>
      <div className={styles.NFTCard}>
        <ThirdwebNftMedia metadata={nft.metadata} width="100%" height="100%" />
        <h3>{nft.metadata.name}</h3>
      </div>
    </Link>
  );
};
```

# 5 個別のNFT・イベントの抽出

コントラクトの取得に「useContract」、個別のNFTの取得に「useNFT」、イベントの取得に「useContractEvents」を使用しています。

```js:[id].js
const { contract } = useContract(searchContract);
  const { data: nft, isLoading: isLoadingNFT } = useNFT(contract, id);
  const { data: events, isLoading: isLoadingEvents } = useContractEvents(
    contract,
    "Transfer",
    {
      queryFilter: {
        filters: {
          tokenId: id,
        },
        order: "desc",
      },
    }
  );
```

# 6 トランスファー履歴の表示

変数「isLoadingEvents」を使い、ローディングが終わっている場合は変数「events」をmapします。

```js:[id].js
<div>
    <h3>History:</h3>
    {!isLoadingEvents && (
        <div>
        {events.map((event, index) => (
            <div key={index}>
            <strong>From: </strong>
            {event.data.from}
            <strong>To: </strong>
            {event.data.to}
            </div>
        ))}
        </div>
    )}
</div>
```

## Getting Started

Create a project using this example:

```bash
npx thirdweb create --template next-typescript-starter
```

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

On `pages/_app.tsx`, you'll find our `ThirdwebProvider` wrapping your app, this is necessary for our [hooks](https://portal.thirdweb.com/react) and
[UI Components](https://portal.thirdweb.com/ui-components) to work.

### Deploy to IPFS

Deploy a copy of your application to IPFS using the following command:

```bash
yarn deploy
```

## Learn More

To learn more about thirdweb and Next.js, take a look at the following resources:

- [thirdweb React Documentation](https://docs.thirdweb.com/react) - learn about our React SDK.
- [thirdweb TypeScript Documentation](https://docs.thirdweb.com/typescript) - learn about our JavaScript/TypeScript SDK.
- [thirdweb Portal](https://docs.thirdweb.com) - check our guides and development resources.
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

You can check out [the thirdweb GitHub organization](https://github.com/thirdweb-dev) - your feedback and contributions are welcome!

## Join our Discord!

For any questions, suggestions, join our discord at [https://discord.gg/thirdweb](https://discord.gg/thirdweb).
