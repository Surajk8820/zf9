import React, { useEffect, useState } from "react";
import styles from "../../styles/Buy.module.css";
import {
  Heading,
  Text,
  Box,
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  SkeletonText,
} from "@chakra-ui/react";
import NFTGrid from "../../components/house/NFTGrid";
import { HOUSE_NFT_COLLECTION_ADDRESS } from "../../const/addresses";
import { useChain, useContract, useNFTs } from "@thirdweb-dev/react";
import Image from "next/image";
import { Search2Icon } from "@chakra-ui/icons";
import { BsFillGrid3X3GapFill, BsFillGridFill } from "react-icons/bs";

interface NFTMetadata {
  name: string;
  description?: string;
  image?: string;
  external_link?: string;
}

const Hash = () => {
  const { contract } = useContract(HOUSE_NFT_COLLECTION_ADDRESS);
  const { data, isLoading } = useNFTs(contract);
  const [searchText, setSearch] = useState<string>("");
  const [filteredData, setFilteredData] = useState<any>([]);
  const [collectionMetadata, setCollectionMetadata] = useState<any>();
  const [gridCount, setGridCount] = useState<number>(5);
  const chain = useChain();

  const handleSearch = (e: any) => {
    const searchText = e.target.value;
    setSearch(searchText);
    if (searchText === "") {
      setFilteredData([]);
    } else {
      if (data !== undefined) {
        let filteredItems: any = data.filter((item: any) => {
          return item?.metadata?.name
            ?.toLowerCase()
            .includes(searchText.toLowerCase());
        });
        setFilteredData(filteredItems);
      }
    }
  };

  useEffect(() => {
    const getData = async () => {
      let dq: any = await contract?.metadata.get();
      setCollectionMetadata(dq);
    };
    getData();
  }, [contract]);

  const handleGridDisplay = () => {
    if (gridCount === 5) {
      setGridCount(3);
      return;
    }
    setGridCount(5);
  };

  return (
    <Box w={"100%"} minH={"70vh"} className={styles.container}>
      <Box className={styles.houseBanner}></Box>
      <Flex className={styles.detailsDiv}>
        <Box>
          <video
            className={styles.collectionImg}
            width="250"
            height="240"
            autoPlay
            loop
            preload={"auto"}
            controls
          >
            <source src="https://imgur.com/YpH8ADx.mp4" type="video/mp4" />
          </video>
        </Box>
        {collectionMetadata ? (
          <Box>
            <Heading>{collectionMetadata?.name}</Heading>
            <Flex gap={5}>
              <Text mt={2}>
                by{" "}
                <span style={{ color: "#AD00FF", fontWeight: 600 }}>
                  Zuraverse
                </span>
              </Text>
              <Text mt={2}>
                Items{" "}
                <span style={{ color: "#AD00FF", fontWeight: 600 }}>
                  {data?.length}
                </span>
              </Text>
              <Text mt={2}>
                Chain{" "}
                <span style={{ color: "#AD00FF", fontWeight: 600 }}>
                  {`${chain?.chain}`}
                </span>
              </Text>
            </Flex>
            <Text mt={2} fontWeight={600}>
              Description
            </Text>
            <Text mt={2} color={"grey"} fontSize={14}>
              {collectionMetadata?.description}
            </Text>
          </Box>
        ) : (
          <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
        )}
      </Flex>
      <Box className={styles.searchDiv}>
        <Tabs variant="unstyled">
          <Box
            display={"flex"}
            flexDir={{ base: "column", md: "row" }}
            alignItems={"center"}
            gap={4}
            justifyContent={"space-between"}
          >
            <TabList
              borderRadius={"5px"}
              w={{ base: "100%", md: "fit-content" }}
              p={2}
              gap={{ base: 2, md: 7 }}
              background={"#222528"}
            >
              <Tab
                w={"100%"}
                _selected={{ color: "white", bg: "blue", borderRadius: "5px" }}
                fontSize={{ base: "14px", md: "16px" }}
              >
                Items
              </Tab>
              <Tab
                w={"100%"}
                _selected={{ color: "white", bg: "blue", borderRadius: "5px" }}
                fontSize={{ base: "14px", md: "16px" }}
              >
                Activity
              </Tab>
              <Tab
                w={"100%"}
                _selected={{ color: "white", bg: "blue", borderRadius: "5px" }}
                fontSize={{ base: "14px", md: "16px" }}
              >
                Analytics
              </Tab>
            </TabList>
            <Divider
              display={{ base: "block", md: "none" }}
              mt={0}
              orientation="horizontal"
            />

            <Flex
              align={"center"}
              justify={"space-between"}
              gap={{ base: 2 }}
              w={{ base: "100%", md: "70%" }}
            >
              <InputGroup w={{ base: "100%", md: "60%" }}>
                <InputLeftElement h={"100%"} pointerEvents="none">
                  <Search2Icon fontSize={"12px"} color="gray.300" />
                </InputLeftElement>
                <Input
                  focusBorderColor="none"
                  border={"none"}
                  background={"#1c1c20"}
                  width={"100%"}
                  borderRadius={"5px"}
                  type="text"
                  placeholder="Search items by name, attributes"
                  onChange={(e) => handleSearch(e)}
                />
              </InputGroup>{" "}
              <Flex alignItems={"center"} gap={2}>
                <Box display={{ base: "none", md: "block" }}>
                  <Select borderColor={"#444444"}>
                    <option value="">Price: low to high</option>
                    <option value="">Price: high to low</option>
                  </Select>
                </Box>
                <Flex
                  alignItems={"center"}
                  justifyContent={"center"}
                  borderRadius={"5px"}
                  w={"40px"}
                  h={"40px"}
                  onClick={handleGridDisplay}
                  border={"1px solid #444444"}
                  display={{base : "none", md : "flex"}}
                >
                  {gridCount === 5 ? (
                    <BsFillGrid3X3GapFill size={"24px"} />
                  ) : (
                    <BsFillGridFill size={"24px"} />
                  )}
                </Flex>
              </Flex>
            </Flex>
          </Box>
          <Divider
            display={{ base: "none", md: "block" }}
            mt={4}
            orientation="horizontal"
          />
          <TabPanels>
            <TabPanel mt={4} p={0}>
              <Box>
                <NFTGrid
                  gridCount={gridCount}
                  isLoading={isLoading}
                  data={filteredData.length > 0 ? filteredData : data}
                  emptyText={"No NFTs found"}
                />
              </Box>
            </TabPanel>
            <TabPanel>
              <p>This is activity tab!</p>
            </TabPanel>
            <TabPanel>
              <p>This is Analytics Tab!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default Hash;
