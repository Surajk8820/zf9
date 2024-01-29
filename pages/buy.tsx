import React from "react";
import styles from "../styles/Buy.module.css";
import { Container, Heading, Text } from "@chakra-ui/react";
import NFTGrid from "../components/NFTGrid";
import { NFT_COLLECTION_ADDRESS } from "../const/addresses";
import { useContract, useNFTs } from "@thirdweb-dev/react";

const Buy = () => {
  const { contract } = useContract(NFT_COLLECTION_ADDRESS);
  const { data, isLoading } = useNFTs(contract);

  return (
    <Container maxW={"100%"} minH={"70vh"} className={styles.container}>
      <Heading mt={2} size={{ base: "md", md: "lg" }}>Collections</Heading>
      <Text color={"grey"} fontSize={{ base: "12px", md: "16px" }}>
        Buy NFTs from this collection.
      </Text>
      <NFTGrid isLoading={isLoading} data={data} emptyText={"No NFTs found"} />
    </Container>
  );
};

export default Buy;
