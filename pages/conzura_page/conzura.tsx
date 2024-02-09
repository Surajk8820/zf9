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
} from "@chakra-ui/react";
import NFTGrid from "../../components/conzura/NFTGrid";
import { CONZURA_NFT_COLLECTION_ADDRESS } from "../../const/addresses";
import { useContract, useNFTs } from "@thirdweb-dev/react";
import Image from "next/image";
import { Search2Icon } from "@chakra-ui/icons";
import { BsFillGrid3X3GapFill, BsFillGridFill } from "react-icons/bs";

interface NFTMetadata {
  name: string;
  description?: string;
  image?: string;
  external_link?: string;
}

const Conzura = () => {
  const { contract } = useContract(CONZURA_NFT_COLLECTION_ADDRESS);
  const { data, isLoading } = useNFTs(contract);
  const [searchText, setSearch] = useState<string>("");
  const [filteredData, setFilteredData] = useState<NFTMetadata[]>([]);
  const [collectionMetadata, setCollectionMetadata] = useState<NFTMetadata[]>(
    []
  );
  const [gridCount, setGridCount] = useState<number>(5);

  // const handleSearch = () => {
  //   if (data !== undefined && searchText !== "") {
  //     let filteredItems: NFTMetadata[] = data.filter(
  //       (item: { metadata?: NFTMetadata }, index: number) => {
  //         return item?.metadata?.name
  //           ?.toLowerCase()
  //           .includes(searchText.toLowerCase());
  //       }
  //     );
  //     setFilteredData(filteredItems);
  //   } else {
  //     setFilteredData([]);
  //   }
  // };

  // const renderData = searchText !== "" ? filteredData : data;

  // useEffect(() => {
  //   const getData = async () => {
  //     const dq = await contract?.metadata.get();
  //     setCollectionMetadata(dq ?? {});
  //   };
  //   getData();
  // }, []);

  const handleGridDisplay = () => {
    if (gridCount === 5) {
      setGridCount(3);
      return;
    }
    setGridCount(5);
  };

  return (
    <Box w={"100%"} minH={"70vh"} className={styles.container}>
      <Box className={styles.banner}></Box>
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
            <source src="https://imgur.com/PMUg3KZ.mp4" type="video/mp4" />
          </video>
        </Box>
        <Box>
          <Heading>{"Hippie Aliens Cosmic Club"}</Heading>
          <Flex gap={5}>
            <Text mt={2}>
              by{" "}
              <span style={{ color: "#AD00FF", fontWeight: 600 }}>
                Zuraverse
              </span>
            </Text>
            <Text mt={2}>
              Items{" "}
              <span style={{ color: "#AD00FF", fontWeight: 600 }}>1000</span>
            </Text>
            <Text mt={2}>
              Chain{" "}
              <span style={{ color: "#AD00FF", fontWeight: 600 }}>Polygon</span>
            </Text>
          </Flex>
          <Text mt={2} fontWeight={600}>
            Description
          </Text>
          <Text mt={2} color={"grey"} fontSize={14}>
            {"zuraverse"}
          </Text>
        </Box>
      </Flex>
      <Box className={styles.searchDiv}>
        <Tabs variant="unstyled">
          <Flex alignItems={"center"} gap={4} justifyContent={"space-between"}>
            <TabList gap={7}>
              <Tab
                _selected={{ color: "white", bg: "blue", borderRadius: "5px" }}
              >
                Items
              </Tab>
              <Tab
                _selected={{ color: "white", bg: "blue", borderRadius: "5px" }}
              >
                Activity
              </Tab>
              <Tab
                _selected={{ color: "white", bg: "blue", borderRadius: "5px" }}
              >
                Analytics
              </Tab>
            </TabList>
            <Box w={"50%"}>
              <InputGroup>
                <InputLeftElement h={"100%"} pointerEvents="none">
                  <Search2Icon fontSize={"12px"} color="gray.300" />
                </InputLeftElement>
                <Input
                  focusBorderColor="none"
                  border={"none"}
                  background={"#1c1c20"}
                  width={{ base: "5px", md: "100%" }}
                  borderRadius={"5px"}
                  type="text"
                  placeholder="Search items by name, attributes"
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                    }
                  }}
                />
              </InputGroup>{" "}
            </Box>
            <Flex alignItems={"center"} gap={2}>
              <Box>
                <Select borderColor={"#373737"}>
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
              >
                {gridCount === 5 ? (
                  <BsFillGrid3X3GapFill size={"24px"} />
                ) : (
                  <BsFillGridFill size={"24px"} />
                )}
              </Flex>
            </Flex>
          </Flex>
          <Divider mt={4} orientation="horizontal" />
          <TabPanels>
            <TabPanel mt={4} p={0}>
              <Box>
                <NFTGrid
                  gridCount={gridCount}
                  isLoading={isLoading}
                  data={data}
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

export default Conzura;
