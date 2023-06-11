import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useContract, useNFTs } from "@thirdweb-dev/react";
import { NFTCard } from "../components/NFTCard";
import { useState, useContext } from "react"
import { ContractsContext } from './ContractsContext';

const Home: NextPage = () => {
  const count = 30;

  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState(''); 

  const { searchContract, setSearchContract } = useContext(ContractsContext);

  const { contract } = useContract(searchContract);
  const { data: nfts, isLoading: isLoadingNFTs } = useNFTs(
    contract,
    {
      count: count,
      start: (page - 1) * count
    }
  )
  return (
      <div className={styles.container}>
        <h1 style={{ textAlign: "center" }} >Astar NFT Project</h1>
        <div className={styles.pagnation}>
          <input 
              type="string"
              value={inputValue}
              style={{ width: "350px" }} 
              onChange={(event) => setInputValue(event.target.value)}
            />
          <button onClick={() => setSearchContract(inputValue)}>serch</button>
        </div>
        <div className={styles.NFTGrid}>
        {!isLoadingNFTs && (
          nfts?.map((nft, index) => (
            <NFTCard key={index} nft={nft} />
          ) 
        ))}
        </div>
        <div className={styles.pagnation}>
          <button onClick={() => setPage(page - 1)} disabled={page===1}>Previous</button>
          <input 
            type="number"
            value={page}
            onChange={(e) => setPage(parseInt(e.target.value))}
          />
          <button onClick={() => setPage(page + 1)}>Next</button>
        </div>
      </div>
  );
};

export default Home;
