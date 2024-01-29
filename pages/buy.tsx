import React from "react";
import styles from "../styles/Buy.module.css";
import { Container, Heading, Input, Text, Box, Flex } from "@chakra-ui/react";
import NFTGrid from "../components/NFTGrid";
import { NFT_COLLECTION_ADDRESS } from "../const/addresses";
import { useContract, useNFTs } from "@thirdweb-dev/react";
import Image from "next/image";

const Buy = () => {
  const { contract } = useContract(NFT_COLLECTION_ADDRESS);
  const { data, isLoading } = useNFTs(contract);

  console.log(contract);

  return (
    <Box w={"100%"} minH={"70vh"} className={styles.container}>
      {/* <Heading mt={2} size={{ base: "md", md: "lg" }}>Collections</Heading>
      <Text color={"grey"} fontSize={{ base: "12px", md: "16px" }}>
        Buy NFTs from this collection.
      </Text>
      <Box border={'1px soild red'}>
        fffff
      </Box> */}
      <Box className={styles.banner}></Box>
      <Flex className={styles.detailsDiv}>
        <Box>
          <Image
            className={styles.collectionImg}
            width={250}
            height={250}
            src="https://imgur.com/jRBpdIT.png"
            alt="logo"
          />
        </Box>
        <Box>
          <Heading>Hippie Alien Cosmic Club</Heading>
          <Flex gap={5}>
            <Text mt={2}>
              by{" "}
              <span style={{ color: "#AD00FF", fontWeight: 600 }}>
                Zuraverse
              </span>
            </Text>
            <Text mt={2}>
              Items{" "}
              <span style={{ color: "#AD00FF", fontWeight: 600 }}>1000</span>
            </Text>
            <Text mt={2}>
              Chain{" "}
              <span style={{ color: "#AD00FF", fontWeight: 600 }}>Polygon</span>
            </Text>
          </Flex>
          <Text mt={2} fontWeight={600}>
            Description
          </Text>
          <Text mt={2} color={"grey"} fontSize={14}>
            Hey Hippie Aliens{" "}
          </Text>
        </Box>
      </Flex>
      <Box p={"0px 30px"}>
        <NFTGrid
          isLoading={isLoading}
          data={data}
          emptyText={"No NFTs found"}
        />
      </Box>
    </Box>
  );
};

export default Buy;
