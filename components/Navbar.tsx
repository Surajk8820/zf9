import React from "react";
import { ConnectWallet, darkTheme, useAddress } from "@thirdweb-dev/react";
import NextLink from "next/link";
import {
  Avatar,
  Box,
  Flex,
  Link,
  Button,
  Menu,
  MenuButton,
  useDisclosure,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Tooltip,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import styles from "../styles/Navbar.module.css";
import Image from "next/image";
import { useRouter } from "next/router";

const Navbar = () => {
  const address = useAddress();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const redirectToHome = () => {
    // redirecting to home
    router.push("/");
  };

  return (
    <>
      <Box
        bg={"#141414"}
        color={"white"}
        p={{ base: 2 }}
        pl={{ md: 12, base: "" }}
        pr={{ md: 12, base: "" }}
      >
        <Flex alignItems={"center"} justifyContent={"space-between"} w={"100%"}>
          <Box onClick={redirectToHome} cursor={"pointer"}>
            <Image
              width={150}
              height={150}
              src="https://zuraverse.xyz/wp-content/uploads/2020/10/V5.png"
              alt="logo"
            />
          </Box>
          <Box
            className={styles.searchbar}
            display={{ base: "none", md: "block" }}
          >
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
          </Box>
          <Flex alignItems={"center"}>
            <Box className={styles.connectWallet}>
              <ConnectWallet
                theme={darkTheme({
                  colors: {
                    accentText: "#ff00ea",
                    accentButtonBg: "#ff00ea",
                  },
                })}
                modalTitle={"Zura Marketplace"}
                switchToActiveChain={true}
                modalSize={"wide"}
                welcomeScreen={{
                  title: "Welcome to the world of Zuraverse",
                  img: {
                    src: "https://imgur.com/ZMxCd38.png",
                    width: 150,
                    height: 150,
                  },
                }}
                modalTitleIconUrl={"https://imgur.com/ZMxCd38.png"}
              />
            </Box>
            <Box>
              {address && (
                <Link as={NextLink} href={`/profile/${address}`}>
                  <Tooltip hasArrow label={"Profile"}>
                    <Avatar border={'2px solid #444444'} src="https://imgur.com/752APp1.png" ml={"10px"} />
                  </Tooltip>
                </Link>
              )}
            </Box>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Navbar;
