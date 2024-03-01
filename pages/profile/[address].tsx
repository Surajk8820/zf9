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
  Spinner,
  Grid,
  CircularProgress,
  CircularProgressLabel,
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClaimKarmaModal from "../../components/ClaimKarmaModal";

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
  const [isClaimmed, setIsClaimmed] = useState(false);
  const [currentHouse, setCurrentHouse] = useState("");
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

  // console.log(completionPercentage, currentUser);

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

  useEffect(() => {
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
          // console.log(response.data);
        }
        return;
      } catch (error) {
        console.error(error);
      }
    };

    postUserData();
  }, [smartWallet, personalWallet]);

  // function for clamming token
  const claimKarma = () => {
    let amount: number = 100;

    try {
      claimToken(
        { amount, to: address as string },
        {
          onSuccess: (data) => {
            updateBackend({
              gotProfileReward: true,
            });
            setIsClaimmed(true);
            toast.success(`YaY! You got 100 💰Karma`, {
              position: "bottom-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          },
        }
      );
    } catch (err) {
      console.log(err);
      toast.error("Opps! try again");
    }
  };

  // if houseNft minted, store the id to backend

  useEffect(() => {
    if (
      houseNfts &&
      houseNfts?.length > 0 &&
      currentUser &&
      currentUser?.hasHouseId === null
    ) {
      updateBackend({
        hasHouseId: houseNfts[0]?.metadata.id,
        hasHouseMetadata: houseNfts[0]?.metadata,
      });
      window.location.reload();
    }
  }, [houseNfts, currentUser]);

  // function for manipulating backend
  const updateBackend = (payload: any) => {
    axios
      .put("http://localhost:8080/user/profile/update", payload, {
        headers: {
          Authorization: "Bearer your_access_token",
          "Content-Type": "application/json",
          zurawallet: smartWallet,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        console.log("something went wrong!");
      });
  };

  if (!address) {
    return (
      <Flex
        bg={"black"}
        align={"center"}
        justify={"center"}
        w={"100%"}
        h={"100vh"}
      >
        <CircularProgress isIndeterminate color="green.300" />
      </Flex>
    );
  }

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
            <Box className={styles.coverImg}>
              <Image
                width={"100%"}
                height={"100%"}
                src={"https://imgur.com/ZcQErOc.png"}
                alt="cover"
              />
              {completionPercentage === 100 ? null : (
                <Flex
                  h={"70px"}
                  w={"100%"}
                  top={0}
                  pos={"absolute"}
                  align={"center"}
                  justify={"start"}
                  bg={"#333652"}
                  gap={3}
                  p={3}
                >
                  <CircularProgress
                    value={completionPercentage}
                    color="#04D010"
                  >
                    <CircularProgressLabel>{`${completionPercentage}%`}</CircularProgressLabel>
                  </CircularProgress>
                  <Text>
                    {`Seems your profile is not completed!  ${
                      !currentUser?.email ? "Add Email &" : ""
                    } ${
                      !currentUser?.userName && !currentUser?.profileImg
                        ? "Add Name & Profile Image &"
                        : ""
                    } ${
                      !currentUser?.hasHouseId ? "Mint House" : ""
                    } to Complete ${
                      currentUser?.gotProfileReward
                        ? ""
                        : "& earn 100 Karma Points 😋"
                    }`}
                  </Text>
                </Flex>
              )}
            </Box>
            <Box overflow={"hidden"} className={styles.profileImg}>
              <Image src={"https://imgur.com/n22iSFg.png"} alt="profile_pic" />
            </Box>
          </Box>
          <Box textAlign={"center"}>
            <Box
              textAlign={"end"}
              display={personalWallet === undefined ? "none" : "block"}
            >
              <EditModal updateFunc={updateBackend} currentUser={currentUser} />
            </Box>
            <Text
              mt={personalWallet === undefined ? "70px" : "30px"}
              fontSize={"20px"}
              fontWeight={600}
            >
              {currentUser?.userName?.toUpperCase() || "Anonymous"}
            </Text>
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
            <Text>{`Email : ${currentUser?.email || "N/A"}`}</Text>
            <Flex className={styles.transectionBtn}>
              <Button>Send</Button>
              <Button>Receive</Button>
            </Flex>
          </Box>
          {personalWallet === undefined ? (
            <Box p={4} textAlign={"center"}>
              <Text className={styles.neonText} fontWeight={600}>
                Switch to Zura Wallet
              </Text>
            </Box>
          ) : (
            <Box>
              <Box className={styles.boxContainer}>
                <Box className={styles.box}>
                  <Flex direction="column">
                    <Text>Karma Points</Text>
                    <Text fontSize={"40px"}>
                      {tokenBalance?.displayValue || 0}
                    </Text>
                  </Flex>
                  <Image
                    src="https://imgur.com/vaMs9nq.png"
                    w={"40%"}
                    h={"40%"}
                    alt="logo"
                    pos={"absolute"}
                    right={0}
                    bottom={1}
                  />
                </Box>
                <Box className={styles.box}>
                  <Flex direction="column">
                    <Text>{"Trees Planted"}</Text>
                    <Text fontSize={"40px"}>
                      {Number(tokenBalance?.displayValue) / 10 || 0}
                    </Text>
                  </Flex>
                  <Image
                    src="https://imgur.com/FzIURqN.png"
                    w={"40%"}
                    h={"40%"}
                    alt="logo"
                    pos={"absolute"}
                    right={0}
                    bottom={1}
                  />
                </Box>
                <Box className={styles.box}>
                  <Flex direction="column">
                    <Text>{"Carbon Offset (tonne)"}</Text>
                    <Text fontSize={"40px"}>
                      {(Number(tokenBalance?.displayValue) / 10) * 0.025 || 0}
                    </Text>
                  </Flex>
                  <Image
                    src="https://imgur.com/jwepmIH.png"
                    w={"40%"}
                    h={"40%"}
                    alt="logo"
                    pos={"absolute"}
                    right={0}
                    bottom={1}
                  />
                </Box>
                <Flex
                  align={"center"}
                  border={"1px solid red"}
                  justify={"center"}
                  p={0}
                  className={styles.box}
                >
                  {currentUser?.hasHouseId ? (
                    <Box h={"100%"} className={styles.houseDiv}>
                      <Image
                        objectFit={"contain"}
                        src={currentUser.hasHouseMetadata.image}
                        width={"100%"}
                        height={"100%"}
                        alt="house_img"
                      />
                      <Text className={styles.houseTxt}>
                        {currentUser?.hasHouseMetadata?.name}
                      </Text>
                    </Box>
                  ) : (
                    "Mint House"
                  )}
                </Flex>
              </Box>
              {completionPercentage == 100 &&
              currentUser?.gotProfileReward === false ? (
                <ClaimKarmaModal
                  func={claimKarma}
                  isLoading={clamming}
                  isClaimmed={isClaimmed}
                />
              ) : null}
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
            <ToastContainer />
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
                    {personalWallet === undefined ? (
                      "No NFT's in your wallet"
                    ) : (
                      <Button onClick={(e) => redirectToMint("house")}>
                        Mint House
                      </Button>
                    )}
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
                    {personalWallet === undefined ? (
                      "No NFT's in your wallet"
                    ) : (
                      <Button onClick={(e) => redirectToMint("house")}>
                        Mint House
                      </Button>
                    )}
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
                    {personalWallet === undefined ? (
                      "No NFT's in your wallet"
                    ) : (
                      <Button onClick={(e) => redirectToMint("house")}>
                        Mint House
                      </Button>
                    )}
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
