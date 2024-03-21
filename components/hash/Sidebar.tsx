"use client";

import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
} from "react-icons/fi";
import {FaSignal} from "react-icons/fa"
import { IconType } from "react-icons";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import styles from "../../styles/Sidebar.module.css";
import Image from "next/image";
import { MdContentCopy } from "react-icons/md";
import { TbPointFilled } from "react-icons/tb";
import { EditModal } from "../EditModal";
import {
  MARKETPLACE_ADDRESS,
  HASH_NFT_COLLECTION_ADDRESS,
  CONZURA_NFT_COLLECTION_ADDRESS,
} from "../../const/addresses";
import { useRouter } from "next/router";
import NFTGrid from "./NFTGrid";
import { useContract, useOwnedNFTs } from "@thirdweb-dev/react";

interface LinkItemProps {
  name: string;
  icon: IconType;
}

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: React.ReactNode;
}

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome },
  { name: "Trending", icon: FiTrendingUp },
  { name: "Explore", icon: FiCompass },
  { name: "Favourites", icon: FiStar },
  { name: "Settings", icon: FiSettings },
  {name : "Karma Level", icon : FaSignal}
];

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={"black"}
      borderRight="1px"
      borderRightColor={"#444444"}
      w={{ base: "full", md: 40 }}
      pos="fixed"
      h="full"
      {...rest}
      border={"1px solid red"}
      zIndex={-1}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "#0000FF",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={"black"}
      borderBottomWidth="1px"
      borderBottomColor={"#444444"}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <Box display={"flex"} alignItems={"center"} gap={4}>
        <IconButton
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          icon={<FiMenu />}
          color={"white"}
        />

        <Text
          display={{ base: "flex", md: "none" }}
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
        >
          Logo
        </Text>
      </Box>

      <Box>
        <ConnectWallet />
      </Box>
    </Flex>
  );
};

const SidebarWithHeader = () => {
  const address = useAddress();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { contract: nftCollection } = useContract(HASH_NFT_COLLECTION_ADDRESS);

  const { contract: marketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );

  const { data: ownedNfts, isLoading: loadingOwnedNfts } = useOwnedNFTs(
    nftCollection,
    router.query.address as string
  );

  interface NFT {
    id: number;
    name: string;
  }

  return (
    <Box minH="100vh" bg={"#141414"} color="white">
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box className={styles.container} ml={{ base: 0, md: 20 }} p="4">
        <Box className={styles.profileDiv}>
          <Box className={styles.profile}>
            <Image
              width={400}
              height={400}
              src={"https://imgur.com/fUAivt9.png"}
              alt="profile_logo"
            />
          </Box>
          <Flex m={"auto"}>
            <EditModal />
          </Flex>
          <Box w={"100%"} textAlign={"center"}>
            <Text fontSize={"20px"}>Albert Ekka</Text>
            <Flex align={"center"} justify={"center"}>
              <TbPointFilled size={"20px"} color="#04D010" />
              <Text mr={1} fontSize={"12px"}>
                0x8c2B...4814
              </Text>
              <MdContentCopy cursor={"pointer"} size={"14px"} />
            </Flex>
            <Text fontSize={"12px"}>surajguptabnp14c@gmail.com</Text>
            <Text mt={2} fontSize={"14px"}>
              I am a good Gamer.
            </Text>
          </Box>
        </Box>
        <Box className={styles.neftsDiv}>
          <NFTGrid
            data={ownedNfts}
            isLoading={loadingOwnedNfts}
            emptyText={"You don't own any NFTs yet from this collection."}
            gridCount={4}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SidebarWithHeader;
