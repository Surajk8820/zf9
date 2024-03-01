import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Box,
  Flex,
  Text,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { useEffect } from "react";

export default function ClaimKarmaModal({ func, isLoading, isClaimmed }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay backdropFilter="blur(5px)" />
        <ModalContent bg={"#18181a"}>
          <ModalHeader></ModalHeader>
          <ModalCloseButton color={"white"} />
          <ModalBody>
            {isClaimmed ? (
              <Box>
                <Image
                  src="https://i.pinimg.com/originals/7d/b3/24/7db324ed27acf79d21e3a3132287623c.gif"
                  width={"100%"}
                  height={"100%"}
                />
                <Text
                  color={"white"}
                  textAlign={"center"}
                  fontWeight={600}
                  fontSize={"30px"}
                >
                  Claimed
                </Text>
              </Box>
            ) : (
              <Box color={"white"} p={4}>
                <Flex align="center" justify="center" w={"100%"} h={"20vh"}>
                  <Flex direction="column">
                    <Flex align={"center"} justify={"center"} gap={2}>
                      <Text fontWeight={600} fontSize={"100px"}>
                        100
                      </Text>
                      <Image
                        src={"https://imgur.com/z3I5FVj.png"}
                        width={"80px"}
                        height={"80px"}
                        alt="coin"
                      />
                    </Flex>
                    <Text textAlign={"center"} fontWeight={600}>
                      YaY! You got 100 Karma
                    </Text>
                  </Flex>
                </Flex>
                <Button
                  isDisabled={isLoading}
                  onClick={func}
                  mt={4}
                  bg={"#31ED31"}
                  w={"100%"}
                >
                  {isLoading ? <Spinner /> : "Claim Now"}
                </Button>
              </Box>
            )}
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
