import type { AppProps } from "next/app";
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  embeddedWallet,
  smartWallet,
  trustWallet,
  zerionWallet,
  rainbowWallet,
  localWallet,
  safeWallet,
} from "@thirdweb-dev/react";
import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
// import { useChain, useConnectionStatus } from "@thirdweb-dev/react";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "mumbai";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const smartWalletOptions = {
    factoryAddress: "0x83bEd5fcF32E93674fBe85ed198874000f9270d0",
    gasless: true,
  };

  return (
    <ThirdwebProvider
      clientId={
        process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID ||
        "a997f0721b38194f0841d8a732f91703"
      }
      activeChain={activeChain}
      supportedWallets={[
        smartWallet(metamaskWallet(), smartWalletOptions),
        smartWallet(
          embeddedWallet({
            auth: {
              options: ["email", "google", "apple"],
            },
          }),
          smartWalletOptions
        ),
      ]}
    >
      <ChakraProvider>
        {router.pathname === "/profile/[address]" ? null : <Navbar />}
        <Component {...pageProps} />
        {router.pathname === "/profile/[address]" ? null : <Footer />}
      </ChakraProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
