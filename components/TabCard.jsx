import React from "react";
import styles from "../styles/TabCard.module.css";
import { Box, Text } from "@chakra-ui/react";

const TabCard = () => {
  let cardData = [
    {
      image: "https://imgur.com/KbSB528.png",
      collectionName: "Hippie Alien Cosmic CLub",
    },
    {
      image: "https://imgur.com/Prfnh4J.png",
      collectionName: "Zurian NFT's",
    },
    {
      image: "https://imgur.com/mbzPYaS.png",
      collectionName: "Zura Land NFT",
    },
  ];

  return (
    <>
      {cardData &&
        cardData.map((e, index) => {
          return (
            <Box key={index} className={styles.cardContainer}>
              <Box className={styles.imgDiv}>
                <img src={e.image} alt="" />
              </Box>
              <Box mt={3}>
                <Text fontSize={"20px"}>{e.collectionName}</Text>
                <Text color={"grey"}>Zuraverse</Text>
              </Box>
            </Box>
          );
        })}
    </>
  );
};

export default TabCard;
