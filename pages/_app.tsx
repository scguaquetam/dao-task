import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { ApolloClient, InMemoryCache, ApolloProvider, NormalizedCacheObject } from "@apollo/client";
import {
  arbitrum,
  goerli,
  mainnet,
  optimism,
  polygon,
  base,
  zora,
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { ChakraProvider } from "@chakra-ui/react";
import {theme} from '../config/theme'
import Layout from '../components/app/Layout';
import '../styles/globals.css';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    zora,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli] : []),
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit App',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID!,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    uri: "http://localhost:3000/graphql",
    cache: new InMemoryCache(),
  });
  return (
    <WagmiConfig config={wagmiConfig}>
      <ApolloProvider client={apolloClient}>
        <RainbowKitProvider chains={chains}>
          <ChakraProvider theme={theme}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ChakraProvider>
        </RainbowKitProvider>
      </ApolloProvider>
    </WagmiConfig>
  );
}

export default MyApp;
