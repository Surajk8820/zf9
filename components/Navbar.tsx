import React from "react";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import NextLink from "next/link";
import {
  Avatar,
  Box,
  Flex,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import styles from "../styles/Navbar.module.css";
import Image from "next/image";

const Navbar = () => {
  const address = useAddress();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} p={2} px={4}>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Flex alignItems={"center"} justifyContent={"center"} gap={"5px"}>
            <Box>
              <Image
                width={150}
                height={150}
                src="https://zuraverse.xyz/wp-content/uploads/2020/10/V5.png"
                alt="logo"
              />
            </Box>
          </Flex>
          <HStack spacing={8} alignItems={"center"}>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              <Box className={styles.searchbar}>
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
            </HStack>
          </HStack>
          <Flex alignItems={"center"} justifyContent={"center"} gap={5}>
            <Box className={styles.connectWallet}>
              <ConnectWallet />
            </Box>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Box>
                  {address && (
                    <Link as={NextLink} href={`/profile/${address}`}>
                      <Avatar src=""></Avatar>
                    </Link>
                  )}
                </Box>
              </MenuButton>
              <MenuList>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Navbar;
