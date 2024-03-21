import {
  Avatar,
  Box,
  Container,
  Flex,
  Input,
  SimpleGrid,
  Skeleton,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import {
  MediaRenderer,
  ThirdwebNftMedia,
  Web3Button,
  useActiveClaimCondition,
  useContract,
  useMinimumNextBid,
  useValidDirectListings,
  useValidEnglishAuctions,
} from "@thirdweb-dev/react";
import { NFT, ThirdwebSDK } from "@thirdweb-dev/sdk";
import React, { useState } from "react";
import {
  MARKETPLACE_ADDRESS,
  CONZURA_NFT_COLLECTION_ADDRESS,
} from "../../../../const/addresses";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import styles from "../../../../styles/TokenPage.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  nft: NFT;
  contractMetadata: any;
};

type NftType = {
  metadata?: {
    attributes?: {
      [key: string]: {
        trait_type: string;
        value: string;
      };
    };
  };
};

export default function TokenPage({ nft, contractMetadata }: Props) {
  const { contract: marketplace, isLoading: loadingMarketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );

  const { contract: nftCollection } = useContract(
    CONZURA_NFT_COLLECTION_ADDRESS
  );

  // Add for active claim conditions
  const { data: activeClaimCondition, isLoading: isLoadingClaimCondition } =
    useActiveClaimCondition(nftCollection, nft.metadata.id);

  const { data: directListing, isLoading: loadingDirectListing } =
    useValidDirectListings(marketplace, {
      tokenContract: CONZURA_NFT_COLLECTION_ADDRESS,
      tokenId: nft.metadata.id,
    });

  //Add these for auction section
  const [bidValue, setBidValue] = useState<string>();

  const { data: auctionListing, isLoading: loadingAuction } =
    useValidEnglishAuctions(marketplace, {
      tokenContract: CONZURA_NFT_COLLECTION_ADDRESS,
      tokenId: nft.metadata.id,
    });

  async function buyListing() {
    let txResult;

    //Add for auction section
    if (auctionListing?.[0]) {
      txResult = await marketplace?.englishAuctions.buyoutAuction(
        auctionListing[0].id
      );
    } else if (directListing?.[0]) {
      txResult = await marketplace?.directListings.buyFromListing(
        directListing[0].id,
        1
      );
    } else {
      throw new Error("No listing found");
    }

    return txResult;
  }

  async function createBidOffer() {
    let txResult;
    if (!bidValue) {
      return;
    }

    if (auctionListing?.[0]) {
      txResult = await marketplace?.englishAuctions.makeBid(
        auctionListing[0].id,
        bidValue
      );
    } else if (directListing?.[0]) {
      txResult = await marketplace?.offers.makeOffer({
        assetContractAddress: CONZURA_NFT_COLLECTION_ADDRESS,
        tokenId: nft.metadata.id,
        totalPrice: bidValue,
      });
    } else {
      throw new Error("No listing found");
    }
    return txResult;
  }

  return (
    <Box className={styles.container} m={"auto"}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 10, md: 20 }}>
        <Box
          overflow={"hidden"}
          width={"100%"}
          height={"65vh"}
          display={"flex"}
          alignItems={"center"}
        >
          <Skeleton isLoaded={!loadingMarketplace}>
            <Box m={"auto"} w={{ base: "100%", md: "60%" }}>
              <ThirdwebNftMedia
                metadata={nft.metadata}
                width="100%"
                height="100%"
              />
            </Box>
          </Skeleton>
        </Box>

        <Stack spacing={"20px"}>
          {contractMetadata && (
            <Flex alignItems={"center"}>
              <Box borderRadius={"4px"} overflow={"hidden"} mr={"10px"}>
                <MediaRenderer
                  src={contractMetadata.image}
                  height="32px"
                  width="32px"
                />
              </Box>
              <Text fontWeight={"bold"}>{contractMetadata.name}</Text>
            </Flex>
          )}
          <Box mx={2.5}>
            <Text fontSize={{ base: "2xl", md: "4xl" }} fontWeight={"bold"}>
              {nft.metadata.name}
            </Text>
            <Link href={`/profile/${nft.owner}`}>
              <Flex direction={"row"} alignItems={"center"}>
                <Avatar
                  src="https://bit.ly/broken-link"
                  h={"24px"}
                  w={"24px"}
                  mr={"10px"}
                />
                <Text fontSize={"small"}>
                  {nft.owner.slice(0, 6)}...{nft.owner.slice(-4)}
                </Text>
              </Flex>
            </Link>
            <Box mt={4} mb={4}>
              <Text fontWeight={"bold"}>Description:</Text>
              <Text>{nft.metadata.description}</Text>
            </Box>
            <Box>
              <Tabs variant="unstyled">
                <TabList
                  justifyContent={{ base: "space-around" }}
                  gap={5}
                  borderRadius={"5px"}
                  bg={"#222528"}
                  p={2}
                  className={styles.tabList}
                >
                  <Tab
                    borderRadius={"5px"}
                    _selected={{ color: "white", bg: "#0C2D48" }}
                    width={"50%"}
                  >
                    Details
                  </Tab>
                  <Tab
                    borderRadius={"5px"}
                    _selected={{ color: "white", bg: "#0C2D48" }}
                    width={"50%"}
                  >
                    Properties
                  </Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Flex gap={8} justifyContent={"start"} alignItems={"start"}>
                      <Box fontSize={'16px'} width={"100%"}>
                        {activeClaimCondition ? (
                          <Flex
                            borderRadius={"5px"}
                            p={4}
                            bg={"#222528"}
                            gap={8}
                          >
                            <Box>
                              <Text>Current Phase:</Text>
                              <Text>Supply:</Text>
                              <Text>Price:</Text>
                              <Text>Max Claim Per Wallet:</Text>
                            </Box>
                            <Box>
                              <Text>{activeClaimCondition.metadata?.name}</Text>
                              <Text>{`${activeClaimCondition?.availableSupply}/${activeClaimCondition?.maxClaimableSupply}`}</Text>
                              <Text>{`${activeClaimCondition?.price} Matic`}</Text>
                              <Text>
                                {activeClaimCondition.maxClaimablePerWallet}
                              </Text>
                            </Box>
                          </Flex>
                        ) : (
                          <Skeleton></Skeleton>
                        )}
                      </Box>
                    </Flex>
                  </TabPanel>
                  <TabPanel>
                    <Box>
                      <Text fontWeight={"bold"}>Traits:</Text>
                      <SimpleGrid columns={2} spacing={4}>
                        {Object.entries(
                          (nft as NftType)?.metadata?.attributes || {}
                        ).map(([key, value]) => (
                          <Flex
                            key={key}
                            direction={"column"}
                            alignItems={"center"}
                            justifyContent={"center"}
                            borderWidth={1}
                            p={"8px"}
                            mt={3}
                            borderRadius={"4px"}
                            _hover={{ background: "#24252E" }}
                          >
                            <Text fontSize={"small"}>{value.trait_type}</Text>
                            <Text fontSize={"small"} fontWeight={"bold"}>
                              {value.value}
                            </Text>
                          </Flex>
                        ))}
                      </SimpleGrid>
                    </Box>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
            <Box className={styles.buyBtn}>
              <Web3Button
                style={{ color: "white", background: "blue", width: "100%", height : "50px" }}
                contractAddress={CONZURA_NFT_COLLECTION_ADDRESS}
                action={(contract) =>
                  contract.erc1155.claim(nft?.metadata?.id, 1)
                }
                onSuccess={() =>
                  toast.success("Claimed Success!", {
                    position: "bottom-center",
                    autoClose: 3000,
                    theme: "colored",
                  })
                }
                onError={(e) => {
                  console.log(e);
                }}
              >
                Claim
              </Web3Button>
            </Box>
          </Box>
        </Stack>
      </SimpleGrid>
      <ToastContainer />
    </Box>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const tokenId = context.params?.tokenId as string;

  const sdk = new ThirdwebSDK("mumbai");

  const contract = await sdk.getContract(CONZURA_NFT_COLLECTION_ADDRESS);

  const nft = await contract.erc1155.get(tokenId);

  let contractMetadata;

  try {
    contractMetadata = await contract.metadata.get();
  } catch (e) {}

  return {
    props: {
      nft,
      contractMetadata: contractMetadata || null,
    },
    revalidate: 1, // https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const sdk = new ThirdwebSDK("mumbai");

  const contract = await sdk.getContract(CONZURA_NFT_COLLECTION_ADDRESS);

  const nfts = await contract?.erc1155.getAll();

  const paths = nfts.map((nft) => {
    return {
      params: {
        contractAddress: CONZURA_NFT_COLLECTION_ADDRESS,
        tokenId: nft.metadata.id,
      },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
};
