import React from "react";
import styles from "../styles/TabCard.module.css";
import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";

const TabCard = () => {
  const router = useRouter();

  const handleNavigate = (e) => {
    if (e.collectionName === "Hippie Alien Space Hovership") {
      router.push("/hash_page/hash");
    } else if (e.collectionName === "Conzura") {
      router.push("/conzura_page/conzura");
    } else if (e.collectionName === "Zura House") {
      router.push("/house_page/house");
    } else {
      return alert("Sorry😐, No collection found!");
    }
  };

  let cardData = [
    {
      image: "https://imgur.com/DTL8kUW.png",
      collectionName: "Zura House",
    },
    {
      image: "https://imgur.com/ocpIpjV.png",
      collectionName: "Hippie Alien Space Hovership",
    },
    {
      image: "https://imgur.com/k6IktDj.png",
      collectionName: "Conzura",
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
            <Box
              onClick={() => handleNavigate(e)}
              key={index}
              className={styles.cardContainer}
            >
              <Box className={styles.imgDiv}>
                <Image width={600} height={600} src={e.image} alt="" />
              </Box>
              <Box mt={2} pl={2}>
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
