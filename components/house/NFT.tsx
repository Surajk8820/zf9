import React, { useEffect, useState } from "react";
import { NFT } from "@thirdweb-dev/sdk";
import {
  MARKETPLACE_ADDRESS,
  HOUSE_NFT_COLLECTION_ADDRESS,
} from "../../const/addresses";
import {
  ThirdwebNftMedia,
  Web3Button,
  useActiveClaimConditionForWallet,
  useAddress,
  useClaimConditions,
  useClaimIneligibilityReasons,
  useContract,
  useContractMetadata,
  useNFTBalance,
  useTotalCirculatingSupply,
  useTotalCount,
  useValidDirectListings,
  useValidEnglishAuctions,
} from "@thirdweb-dev/react";
import {
  Box,
  Button,
  Flex,
  Skeleton,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import styles from "../../styles/NFT.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  nft: NFT;
};

export default function NFTComponent({ nft }: Props) {
  // const { contract: marketplace, isLoading: loadingMarketplace } = useContract(
  //   MARKETPLACE_ADDRESS,
  //   "marketplace-v3"
  // );

  // const { data: directListing, isLoading: loadingDirectListing } =
  //   useValidDirectListings(marketplace, {
  //     tokenContract: HOUSE_NFT_COLLECTION_ADDRESS,
  //     tokenId: nft.metadata.id,
  //   });

  // //Add for auciton section
  // const { data: auctionListing, isLoading: loadingAuction } =
  //   useValidEnglishAuctions(marketplace, {
  //     tokenContract: HOUSE_NFT_COLLECTION_ADDRESS,
  //     tokenId: nft.metadata.id,
  //   });

  const { contract } = useContract(HOUSE_NFT_COLLECTION_ADDRESS);
  const address = useAddress();

  const { data: claimCondition, isLoading: loadingClaimCondition } =
    useClaimConditions(contract, nft?.metadata?.id);

  const { data: isOwned, isLoading: isOwnedLoading } = useNFTBalance(
    contract,
    address,
    nft?.metadata?.id
  );

  console.log(isOwned?.toNumber());
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
      <Box mb={2} fontSize={"12px"} color={"grey"}>
        {!claimCondition ? (
          <SkeletonText mt="4" noOfLines={2} spacing="4" skeletonHeight="1" />
        ) : (
          <>
            <Text>{`Current Phase : ${
              claimCondition[0]?.metadata?.name || "N/A"
            }`}</Text>
            <Text>{`Max Claimable : ${
              claimCondition[0]?.maxClaimablePerWallet || "N/A"
            }/${claimCondition[0]?.maxClaimableSupply || "N/A"}`}</Text>
          </>
        )}
      </Box>
      {contract && address && isOwned && isOwned.toNumber() > 0 ? (
        <Web3Button
          style={{ color: "white", background: "#050A30" }}
          isDisabled
          contractAddress={HOUSE_NFT_COLLECTION_ADDRESS}
          action={(contract) => contract.erc1155.claim(nft?.metadata?.id, 1)}
          onSuccess={() =>
            toast.success("Claimed Success!", {
              position: "bottom-center",
              autoClose: 3000,
              theme: "colored",
            })
          }
        >
          Claimed
        </Web3Button>
      ) : (
        <Web3Button
          style={{ color: "white", background: "blue" }}
          contractAddress={HOUSE_NFT_COLLECTION_ADDRESS}
          action={(contract) => contract.erc1155.claim(nft?.metadata?.id, 1)}
          onSuccess={() =>
            toast.success("Claimed Success!", {
              position: "bottom-center",
              autoClose: 3000,
              theme: "colored",
            })
          }
        >
          Claim NFT
        </Web3Button>
      )}
      <ToastContainer />
    </Flex>
  );
}
