import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Tooltip,
  VStack,
  Image,
  Alert,
  AlertIcon,
  Progress,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState, useRef } from "react";
import styles from "../../styles/Profile.module.css";
import {
  MARKETPLACE_ADDRESS,
  HASH_NFT_COLLECTION_ADDRESS,
  CONZURA_NFT_COLLECTION_ADDRESS,
  HOUSE_NFT_COLLECTION_ADDRESS,
  KARMA_TOKEN_ADDRESS,
} from "../../const/addresses";
import { useRouter } from "next/router";
import NFTGrid from "../../components/hash/NFTGrid";
import ConzuraNFTGrid from "../../components/conzura/ConzuraNFTGrid";
import {
  ConnectWallet,
  SmartWallet,
  ThirdwebNftMedia,
  shortenIfAddress,
  smartWallet,
  useChain,
  useConnect,
  useContract,
  useDisconnect,
  useIsWalletModalOpen,
  useOwnedNFTs,
  usePersonalWalletAddress,
  useSetIsWalletModalOpen,
  useSmartWallet,
  useWallet,
  useTokenDrop,
  useTokenSupply,
  useTokenBalance,
  useClaimToken,
} from "@thirdweb-dev/react";
import { FaCommentsDollar, FaHome } from "react-icons/fa";
import { MdDashboard, MdContactSupport } from "react-icons/md";
import { CopyIcon, Search2Icon } from "@chakra-ui/icons";
import { CgProfile } from "react-icons/cg";
import { FcAbout } from "react-icons/fc";
import { useAddress } from "@thirdweb-dev/react";
import axios from "axios";
import { EditModal } from "../../components/EditModal";
import StatusIndicator from "../../components/StatusIndicator";

// import Sidebar from "../../components/hash/Sidebar";

export default function ProfilePage() {
  const router = useRouter();
  const currentChain = useChain();
  const disconnect = useDisconnect();
  const connect = useConnect();
  const address = useAddress();
  const [currentWallet, setCurrentWallet] = useState<string>("");
  const [currentUser, setUser] = useState<any>();
  const [completionPercentage, setCompletionPercentage] = useState(25);
  const tokenDrop = useTokenDrop(KARMA_TOKEN_ADDRESS);
  const { data: tokenSupply } = useTokenSupply(tokenDrop);
  const { data: tokenBalance } = useTokenBalance(tokenDrop, address);
  const { mutate: claimToken, isLoading: clamming } = useClaimToken(tokenDrop);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const { contract: nftCollection } = useContract(HASH_NFT_COLLECTION_ADDRESS);
  const { contract: nftCollection2 } = useContract(
    CONZURA_NFT_COLLECTION_ADDRESS
  );
  const { contract: nftCollection3 } = useContract(
    HOUSE_NFT_COLLECTION_ADDRESS
  );

  const { contract: marketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );

  const { data: hashNfts, isLoading: hashLoading } = useOwnedNFTs(
    nftCollection,
    currentWallet as string
  );

  const { data: conzuraNfts, isLoading: conzuraLoading } = useOwnedNFTs(
    nftCollection2,
    currentWallet as string
  );

  const { data: houseNfts, isLoading: houseLoading } = useOwnedNFTs(
    nftCollection3,
    currentWallet as string
  );

  // merging all NFT's array in one

  interface NFT {
    id: number;
    name: string;
  }

  const redirectToHome = () => {
    router.push("/");
  };

  // function for setting current value of profile completion

  const updateCompletion = () => {
    // Default 25%
    let newPercentage = 25;

    if (currentUser) {
      if (currentUser.email.trim() !== "") {
        newPercentage += 25;
      }

      if (currentUser.profileImg.trim() !== "" && currentUser.userName !== "") {
        newPercentage += 25;
      }

      if (currentUser.hasHouseId !== null) {
        newPercentage += 25;
      }
    }

    setCompletionPercentage(newPercentage);
  };

  console.log(completionPercentage, currentUser);

  useEffect(() => {
    updateCompletion();
  }, [currentUser]);

  useEffect(() => {
    if (address) {
      setCurrentWallet(address);
    }
  }, [address]);

  // redirect to mint function
  const redirectToMint = (redirect: string) => {
    if (redirect === "hash") {
      router.push(`/hash_page/${redirect}`);
    } else if (redirect === "conzura") {
      router.push(`/conzura_page/${redirect}`);
    } else if (redirect === "house") {
      router.push(`/house_page/${redirect}`);
    }
  };

  let smartWallet = useAddress();
  let personalWallet = usePersonalWalletAddress();

  // Fetching profile data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/user`, {
          headers: {
            zurawallet: `${smartWallet}`,
          },
        });
        setUser(response?.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchData();
  }, [smartWallet]);

  useEffect(() => {
    const postUserData = async () => {
      try {
        if (smartWallet !== undefined && personalWallet !== undefined) {
          const payload = {
            zurawallet: smartWallet,
            personalwallet: personalWallet,
          };

          const response = await axios.post(
            `http://localhost:8080/user/profile`,
            payload
          );
          console.log(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    postUserData();
  }, [smartWallet, personalWallet]);

  // function for clamming token

  const claimKarma = () => {
    let amount: number = 100;
    claimToken({ amount, to: address as string });
  };

  // function for setting reward to backend 
  // const setClaimed = () => {
  //   axios.put("http://localhost:8080/user/profile/update")
  // }

  return (
    <Box className={styles.container}>
      <Box className={styles.sidebar}>
        <Box onClick={redirectToHome} className={styles.logo}>
          <Image src="https://imgur.com/scwbA1J.png" width={"40px"} />
        </Box>
        <Box className={styles.links}>
          <VStack spacing={6} className={styles.link}>
            <Tooltip hasArrow label="Home" aria-label="A tooltip">
              <Box className={styles.linkTag}>{<FaHome size={"20px"} />}</Box>
            </Tooltip>
            <Tooltip hasArrow label="Dashboard" aria-label="A tooltip">
              <Box className={styles.linkTag}>
                {<MdDashboard size={"20px"} />}
              </Box>
            </Tooltip>
            <Tooltip hasArrow label="Profile" aria-label="A tooltip">
              <Box className={styles.linkTag}>
                {<CgProfile size={"20px"} />}
              </Box>
            </Tooltip>
            <Tooltip hasArrow label="About" aria-label="A tooltip">
              <Box className={styles.linkTag}>{<FcAbout size={"20px"} />}</Box>
            </Tooltip>
            <Tooltip hasArrow label="Contact Us" aria-label="A tooltip">
              <Box className={styles.linkTag}>
                {<MdContactSupport size={"20px"} />}
              </Box>
            </Tooltip>
          </VStack>
        </Box>
      </Box>
      <Box className={styles.main}>
        <Box className={styles.profileSection}>
          <Box position={"relative"}>
            <Box className={styles.coverImg} pos={"relative"}>
              <Image
                width={"100%"}
                height={"100%"}
                src={"https://imgur.com/ZcQErOc.png"}
                alt="cover"
              />
              {completionPercentage === 100 ? null : (
                <Box top={0} pos={"absolute"}>
                  <Alert color={"black"} status="warning">
                    <AlertIcon />
                    Seems your account is not completed🙂, Complete Now!
                  </Alert>
                </Box>
              )}
            </Box>
            <Box
              top={100}
              left={100}
              position={"absolute"}
              overflow={"hidden"}
              className={styles.profileImg}
            >
              <Image src={"https://imgur.com/n22iSFg.png"} alt="profile_pic" />
            </Box>
          </Box>
          <Box mt={"80px"} textAlign={"center"}>
            <Box display={personalWallet === undefined ? "none" : "block"}>
              <EditModal />
              <Text fontSize={"20px"} fontWeight={600}>
                {currentUser?.userName?.toUpperCase() || "Anonymous"}
              </Text>
            </Box>
            <Flex
              display={address ? "flex" : "none"}
              gap={3}
              justify={"center"}
              align={"center"}
            >
              <Text>{shortenIfAddress(address, true)}</Text>
              <CopyIcon cursor={"pointer"} />
            </Flex>
            <Box>
              <StatusIndicator />
            </Box>
          </Box>
          {personalWallet === undefined ? (
            <Box p={4} textAlign={"center"}>
              <Button>Switch to Zura Wallet</Button>
            </Box>
          ) : (
            <Box>
              <Box p={5} mt={"20px"}>
                <Text>{`Email: ${currentUser?.email || "N/A"}`}</Text>
                <Text>{`Karma Balance: ${tokenBalance?.displayValue} ${tokenBalance?.symbol}`}</Text>
                <Text>{`Trees Planted: ${
                  currentUser?.treesPlanted || 0
                }`}</Text>
                <Text>{`Carbon Offset: ${
                  currentUser?.carbonOffset || 0
                }`}</Text>
              </Box>
              {completionPercentage == 100 &&
              currentUser?.gotProfileReward === false ? (
                <Box p={2}>
                  <Button color={'white'} bg={"green"} w={"100%"}>
                    <Image
                      src="https://imgur.com/Sma4TLJ.png"
                      width={"30px"}
                      h={"30px"}
                      alt="karma_coin"
                      mr={2}
                    />
                    Claim Karma
                  </Button>
                </Box>
              ) : (
                <Flex flexDir={"column"} className={styles.progressbar}>
                  {completionPercentage < 100 ? (
                    <>
                      <Progress
                        colorScheme="purple"
                        size={"lg"}
                        width={"100%"}
                        hasStripe
                        value={completionPercentage}
                      />
                      <Text>{`${completionPercentage}% completed`}</Text>
                    </>
                  ) : null}
                </Flex>
              )}
            </Box>
          )}
          <Box>
            <button
              onClick={() => {
                disconnect();
                router.push("/");
              }}
              className={styles.btn}
            >
              {address ? "Logout" : "Login"}
            </button>
          </Box>
        </Box>
        <Box className={styles.nftSection}>
          <Tabs variant="solid-rounded" colorScheme="blue">
            <TabList
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              gap={0}
            >
              <Flex gap={8} w={"50%"}>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Search2Icon color="gray.300" />
                  </InputLeftElement>
                  <Input
                    focusBorderColor="#44444C"
                    type="text"
                    placeholder="Search for collections"
                  />
                </InputGroup>
                <Flex gap={2}>
                  <Tab>House</Tab>
                  <Tab>Hash</Tab>
                  <Tab>Conzura</Tab>
                </Flex>
              </Flex>
              <Box>
                <ConnectWallet />
              </Box>
            </TabList>
            <TabPanels>
              <TabPanel p={"20px 0px"}>
                {houseNfts?.length === 0 ? (
                  <Box className={styles.emptyNFT}>
                    <Button onClick={(e) => redirectToMint("house")}>
                      Mint House
                    </Button>
                  </Box>
                ) : (
                  <Box className={styles.nftGrid}>
                    {houseNfts && houseNfts.length > 0
                      ? houseNfts.map((e) => (
                          <Box className={styles.nftCard} key={e.metadata.id}>
                            <ThirdwebNftMedia
                              metadata={e.metadata}
                              height={"100%"}
                              width={"100%"}
                            />
                            <Text
                              mt={2}
                              color={"grey"}
                              fontSize={"12px"}
                            >{`TOKEN ID #${e.metadata.id}`}</Text>
                            <Text>{e.metadata.name}</Text>
                          </Box>
                        ))
                      : null}
                  </Box>
                )}
              </TabPanel>
              <TabPanel p={"20px 0px"}>
                {hashNfts?.length === 0 ? (
                  <Box className={styles.emptyNFT}>
                    <Button onClick={(e) => redirectToMint("hash")}>
                      Mint Hash
                    </Button>
                  </Box>
                ) : (
                  <Box className={styles.nftGrid}>
                    {hashNfts && hashNfts.length > 0
                      ? hashNfts.map((e) => (
                          <Box className={styles.nftCard} key={e.metadata.id}>
                            <ThirdwebNftMedia
                              metadata={e.metadata}
                              height={"100%"}
                              width={"100%"}
                            />
                            <Text
                              mt={2}
                              color={"grey"}
                              fontSize={"12px"}
                            >{`TOKEN ID #${e.metadata.id}`}</Text>
                            <Text>{e.metadata.name}</Text>
                          </Box>
                        ))
                      : null}
                  </Box>
                )}
              </TabPanel>
              <TabPanel p={"20px 0px"}>
                {conzuraNfts?.length === 0 ? (
                  <Box className={styles.emptyNFT}>
                    <Button onClick={(e) => redirectToMint("conzura")}>
                      Mint Conzura
                    </Button>
                  </Box>
                ) : (
                  <Box className={styles.nftGrid}>
                    {conzuraNfts && conzuraNfts.length > 0
                      ? conzuraNfts.map((e) => (
                          <Box className={styles.nftCard} key={e.metadata.id}>
                            <ThirdwebNftMedia
                              metadata={e.metadata}
                              height={"100%"}
                              width={"100%"}
                            />
                            <Text
                              mt={2}
                              color={"grey"}
                              fontSize={"12px"}
                            >{`TOKEN ID #${e.metadata.id}`}</Text>
                            <Text>{e.metadata.name}</Text>
                          </Box>
                        ))
                      : null}
                  </Box>
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </Box>
  );
}
