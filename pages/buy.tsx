import React from "react";
import styles from "../styles/Buy.module.css";
import { Container, Heading, Text } from "@chakra-ui/react";
import NFTGrid from "../components/NFTGrid";
import { NFT_COLLECTION_ADDRESS } from "../const/addresses";
import { useContract, useNFTs } from "@thirdweb-dev/react";

const buy = () => {
  const { contract } = useContract(NFT_COLLECTION_ADDRESS);
  const { data, isLoading } = useNFTs(contract);

  return (
    <Container maxW={"100%"} minH={"70vh"} className={styles.container}>
      <Heading>Collections</Heading>
      <Text>Buy NFTs from this collection.</Text>
      <NFTGrid isLoading={isLoading} data={data} emptyText={"No NFTs found"} />
    </Container>
  );
};

export default buy;
