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
      image: "https://res.cloudinary.com/dddnxiqpq/image/upload/v1711090930/hou_smejyv.png",
      collectionName: "Zura House",
    },
    {
      image: "https://res.cloudinary.com/dddnxiqpq/image/upload/v1711091203/fd_oxivb3.png",
      collectionName: "Hippie Alien Space Hovership",
    },
    {
      image: "https://res.cloudinary.com/dddnxiqpq/image/upload/v1711091487/conz_myszwm.png",
      collectionName: "Conzura",
    },
    {
      image: "https://res.cloudinary.com/dddnxiqpq/image/upload/v1711091641/dum_cgwt8a.png",
      collectionName: "Zurian NFT's",
    },
    {
      image: "https://res.cloudinary.com/dddnxiqpq/image/upload/v1711091641/dum_cgwt8a.png",
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
