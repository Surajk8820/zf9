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
  useToast,
} from "@chakra-ui/react";
import styles from "../../styles/NFT.module.css";
import axios from "axios";

type Props = {
  nft: NFT;
};

export default function NFTComponent({ nft }: Props) {
  const { contract } = useContract(HOUSE_NFT_COLLECTION_ADDRESS);
  const address = useAddress();
  const { data: claimEligibility, isLoading: loadingEligibility } =
    useClaimIneligibilityReasons(contract, {
      walletAddress: address as string,
      quantity: 1,
    });
  const toast = useToast();

  const { data: claimCondition, isLoading: loadingClaimCondition } =
    useClaimConditions(contract, nft?.metadata?.id);

  const { data: isOwned, isLoading: isOwnedLoading } = useNFTBalance(
    contract,
    address,
    nft?.metadata?.id
  );

  console.log(claimEligibility, loadingEligibility);

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
        >
          Claimed
        </Web3Button>
      ) : (
        <Web3Button
          style={{ color: "white", background: "blue" }}
          contractAddress={HOUSE_NFT_COLLECTION_ADDRESS}
          action={(contract) => contract.erc1155.claim(nft?.metadata?.id, 1)}
          onSuccess={() =>
            toast({
              title: `claimed successfully!`,
              status: "success",
              isClosable: true,
            })
          }
          onError={(e) => {
            toast({
              title: `Error: ${e.message}`,
              status: "error",
              isClosable: true,
            });
          }}
        >
          Claim Nft
        </Web3Button>
      )}
    </Flex>
  );
}
