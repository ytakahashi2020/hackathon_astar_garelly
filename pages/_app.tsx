import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { ContractsProvider } from './ContractsProvider';
import "../styles/globals.css";
import { Astar } from "@thirdweb-dev/chains";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
// const activeChain = "ethereum";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider activeChain={Astar}>
      <ContractsProvider>
        <Component {...pageProps} />
      </ContractsProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
