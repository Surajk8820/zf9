import React from "react";
import styles from "../styles/Footer.module.css";
import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";

const Footer = () => {
  return (
    <Flex className={styles.footerContainer}>
      <Box>
        <Image
          width={200}
          height={200}
          src="https://zuraverse.xyz/wp-content/uploads/2020/10/V5.png"
          alt="logo"
        />
        <Text mt={5} color={'grey'}>©2023 Zuraverse, All Rights Reserved.</Text>
      </Box>
      <Flex className={styles.linksDiv}>
        <Flex>
          <Text>Marketplace</Text>
          <Box className={styles.links}>
            <a href="">Popular collections</a>
            <a href="">{"Art's"}</a>
            <a href="">Gaming</a>
            <a href="">{"PFP's"}</a>
          </Box>
        </Flex>
        <Flex>
          <Text>Company</Text>
          <Box className={styles.links}>
            <a href="">About Us</a>
            <a href="">{"Carrer's"}</a>
            <a href="">Ventures</a>
            <a href="">Grants</a>
          </Box>
        </Flex>
        <Flex>
          <Text>Resources</Text>
          <Box className={styles.links}>
            <a href="">About Us</a>
            <a href="">{"Carrer's"}</a>
            <a href="">Ventures</a>
            <a href="">Grants</a>
          </Box>
        </Flex>
        <Flex>
          <Text>NFTs</Text>
          <Box className={styles.links}>
            <a href="">About Us</a>
            <a href="">{"Carrer's"}</a>
            <a href="">Ventures</a>
            <a href="">Grants</a>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Footer;
