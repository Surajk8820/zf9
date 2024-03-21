import React from "react";
import { NFT } from "@thirdweb-dev/sdk";
import {
  MARKETPLACE_ADDRESS,
  CONZURA_NFT_COLLECTION_ADDRESS,
} from "../../const/addresses";
import {
  ThirdwebNftMedia,
  Web3Button,
  useAddress,
  useContract,
  useNFTBalance,
  useValidDirectListings,
  useValidEnglishAuctions,
} from "@thirdweb-dev/react";
import { Box, Flex, Skeleton, Text } from "@chakra-ui/react";
import styles from "../../styles/NFT.module.css";
import { toast } from "react-toastify";

type Props = {
  nft: NFT;
};

export default function NFTComponent({ nft }: Props) {
  const { contract: marketplace, isLoading: loadingMarketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );

  const { contract } = useContract(CONZURA_NFT_COLLECTION_ADDRESS);
  const address = useAddress();
  const { data: isOwned, isLoading: isOwnedLoading } = useNFTBalance(
    contract,
    address,
    nft?.metadata?.id
  );

  const { data: directListing, isLoading: loadingDirectListing } =
    useValidDirectListings(marketplace, {
      tokenContract: CONZURA_NFT_COLLECTION_ADDRESS,
      tokenId: nft.metadata.id,
    });

  //Add for auciton section
  const { data: auctionListing, isLoading: loadingAuction } =
    useValidEnglishAuctions(marketplace, {
      tokenContract: CONZURA_NFT_COLLECTION_ADDRESS,
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

      {/* <Box mt={2}>
        ntg
      </Box> */}
    </Flex>
  );
}
