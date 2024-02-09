import React from "react";
import { NFT } from "@thirdweb-dev/sdk";
import {
  MARKETPLACE_ADDRESS,
  HASH_NFT_COLLECTION_ADDRESS,
} from "../../const/addresses";
import {
  ThirdwebNftMedia,
  useContract,
  useValidDirectListings,
  useValidEnglishAuctions,
} from "@thirdweb-dev/react";
import { Box, Flex, Skeleton, Text } from "@chakra-ui/react";
import styles from "../../styles/NFT.module.css";

type Props = {
  nft: NFT;
};

export default function NFTComponent({ nft }: Props) {
  const { contract: marketplace, isLoading: loadingMarketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );

  const { data: directListing, isLoading: loadingDirectListing } =
    useValidDirectListings(marketplace, {
      tokenContract: HASH_NFT_COLLECTION_ADDRESS,
      tokenId: nft.metadata.id,
    });

  //Add for auciton section
  const { data: auctionListing, isLoading: loadingAuction } =
    useValidEnglishAuctions(marketplace, {
      tokenContract: HASH_NFT_COLLECTION_ADDRESS,
      tokenId: nft.metadata.id,
    });

  return (
    <Flex className={styles.container}>
      <Box borderRadius={"4px"} overflow={"hidden"}>
        <ThirdwebNftMedia
          className={styles.imgContainer}
          metadata={nft.metadata}
          height={"100%"}
          width={"100%"}
        />
      </Box>
      <Text mt={2} fontSize={"small"} color={"darkgray"}>
        Token ID #{nft.metadata.id}
      </Text>
      <Text fontWeight={800} fontSize={{ base: "12px", md: "16px" }}>
        {nft.metadata.name}
      </Text>

      <Box mt={2}>
        {loadingMarketplace || loadingDirectListing || loadingAuction ? (
          <Skeleton></Skeleton>
        ) : directListing && directListing[0] ? (
          <Box>
            <Flex direction={"column"}>
              <Text fontSize={{ base: "8px", md: "14px" }}>Price</Text>
              <Text
                fontSize={{ base: "8px", md: "14px" }}
              >{`${directListing[0]?.currencyValuePerToken.displayValue} ${directListing[0]?.currencyValuePerToken.symbol}`}</Text>
            </Flex>
          </Box>
        ) : auctionListing && auctionListing[0] ? (
          <Box>
            <Flex direction={"column"}>
              <Text fontSize={"small"}>Minimum Bid</Text>
              <Text
                fontSize={"small"}
              >{`${auctionListing[0]?.minimumBidCurrencyValue.displayValue} ${auctionListing[0]?.minimumBidCurrencyValue.symbol}`}</Text>
            </Flex>
          </Box>
        ) : (
          <Box>
            <Flex direction={"column"}>
              <Text fontSize={{ base: "8px", md: "14px" }}>Price</Text>
              <Text fontSize={{ base: "8px", md: "14px" }}>Not Listed</Text>
            </Flex>
          </Box>
        )}
      </Box>
    </Flex>
  );
}
