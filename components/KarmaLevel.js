import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Button,
  Input,
  Tooltip,
  Text,
  Flex,
  Image,
  Progress,
} from "@chakra-ui/react";
import { FaSignal } from "react-icons/fa";
import styles from "../styles/KarmaLevel.module.css";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";

export function KarmaLevel() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);

  return (
    <>
      <Tooltip hasArrow label="Karma Level" aria-label="A tooltip">
        <Button
          w="fit-content"
          m={"auto"}
          leftIcon={<FaSignal />}
          onClick={onOpen}
          background={"transparent"}
          color={"white"}
          _hover={{
            bg: "transparent",
            color: "grey",
          }}
        >
          {""}
        </Button>
      </Tooltip>
      <Modal
        finalFocusRef={finalRef}
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        size={"lg"}
      >
        {" "}
        <ModalOverlay />
        <ModalContent
          bg={
            "linear-gradient(180deg, rgba(87,0,72,1) 29%, rgba(26,14,81,1) 81%)"
          }
          color={"white"}
        >
          <ModalHeader fontSize={"18px"}>Karma Sapien Level</ModalHeader>
          <ModalCloseButton />
          <ModalBody className={styles.container}>
            <Box h={"fit-content"}>
              <Flex justify={"space-between"}>
                <Box>
                  <Text fontSize={"32px"}>Abyssal Fin</Text>
                  <Flex className={styles.level}>
                    <button>Level 1</button>
                    <button>2</button>
                    <button>3</button>
                    <button>4</button>
                    <button>5</button>
                    <button>6</button>
                    <button>7</button>
                    <button>8</button>
                    <button>9</button>
                    <button>10</button>
                  </Flex>
                </Box>
                <Flex gap={2}>
                  <Flex color={"#00FFFF"} flexDir="column" align={"center"}>
                    <Image
                      src="https://imgur.com/dlU5JXg.png"
                      width={"60px"}
                      alt="logo"
                    />
                    <Text fontSize={"12px"}>Carbon Offset</Text>
                    <Text fontSize={"22px"}>
                      625<span style={{ fontSize: "12px" }}>kg</span>
                    </Text>
                  </Flex>
                  <Flex color={"#0EFF1F"} flexDir="column" align={"center"}>
                    <Image
                      src="https://imgur.com/ZlsX0Jx.png"
                      width={"60px"}
                      alt="logo"
                    />
                    <Text fontSize={"12px"}>Trees Planted</Text>
                    <Text fontSize={"22px"}>25</Text>
                  </Flex>
                </Flex>
              </Flex>
              <Box className={styles.NftDiv}></Box>
              <Box mt={5} letterSpacing={1} fontSize={"18px"}>
                The Abyssal Fin represents represents the origins. It signifies
                the very beginning. Its scales shimmer with resilience. This
                level symbolizes Initiation, Curiosity, and the Foundation of
                your journey.
              </Box>
              <Flex align={"center"} mt={7} justify={"space-around"}>
                <Button w={"40px"} borderRadius={"50%"}>
                  <GrCaretPrevious />
                </Button>
                <Flex gap={1} textAlign={"center"} flexDir={"column"}>
                  <Text>YOUR LEVEL 2 UNLOCKS </Text>
                  <Progress
                    borderRadius={"20px"}
                    colorScheme="blue"
                    height="32px"
                    value={40}
                  />
                  <Text fontSize={"12px"}>
                    Karma Points needed for next evolution
                  </Text>
                </Flex>
                <Button w={"40px"} borderRadius={"50%"}>
                  <GrCaretNext />
                </Button>
              </Flex>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
