import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Input,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  useToast,
  Spinner,
  Flex,
  Text,
  Skeleton,
} from "@chakra-ui/react";
import {
  Web3Button,
  useAddress,
  useContract,
  useTokenBalance,
  useTokenDrop,
  useTransferToken,
} from "@thirdweb-dev/react";
import { KARMA_TOKEN_ADDRESS, MATIC_TOKEN_ADDRESS } from "../const/addresses";
import Image from "next/image";

export function SendFundModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const toast = useToast();

  const [walletAdd, setWalletAdd] = useState("");
  const [amount, setAmount] = useState(0);
  const { contract } = useContract(KARMA_TOKEN_ADDRESS);
  const {
    mutate: transferTokens,
    isLoading,
    error,
    status,
  } = useTransferToken(contract);
  const tokenDrop = useTokenDrop(KARMA_TOKEN_ADDRESS);
  const address = useAddress();
  const { data: tokenBalance } = useTokenBalance(tokenDrop, address);

  const handleTransfer = () => {
    transferTokens({
      to: walletAdd,
      amount: Number(amount),
    });
  };

  useEffect(() => {
    if (status === "error") {
      toast({
        title: `Opps ! Try Again`,
        status: "error",
        isClosable: true,
      });
    }
  }, [status, toast]);

  return (
    <>
      <Button
        onClick={onOpen}
        bg={"#654E30"}
        boxShadow={
          "box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
        }
        color={"white"}
        fontWeight={400}
      >
        Transfer Karma
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
        isCentered
      >
        <ModalOverlay backdropFilter="blur(8px)" />
        <ModalContent color={"white"} bg={"#131418"}>
          <ModalHeader display={status === "success" ? "none" : "block"}>
            Send Karma
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {status === "success" ? (
              <Box w={"100%"} h={"fit-content"} textAlign="center">
                <img
                  src="https://www.medibuddy.in/assets/gif/switch-profile-success.gif"
                  alt="success-gif"
                  width="100%"
                  height={"100%"}
                />
                <Text fontSize={"22px"} color={"#65fe08"}>
                  Transfer Success
                </Text>
              </Box>
            ) : (
              <>
                <FormControl>
                  <FormLabel>Token</FormLabel>
                  <Flex
                    gap={2}
                    p={4}
                    border={"1px solid white"}
                    borderRadius={"5px"}
                  >
                    <Box>
                      <Image
                        src={"https://imgur.com/vaMs9nq.png"}
                        width={"60"}
                        height={"60"}
                        alt="kp_logo"
                      />
                    </Box>
                    <Box>
                      <Text>Karma</Text>
                      <Text>
                        {tokenBalance ? (
                          `${Math.floor(tokenBalance?.displayValue)} ${
                            tokenBalance.symbol
                          }`
                        ) : (
                          <Skeleton noOfLines={1} skeletonHeight="2" />
                        )}
                      </Text>
                    </Box>
                  </Flex>
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Send to</FormLabel>
                  <Input
                    placeholder="0x..."
                    onChange={(e) => setWalletAdd(e.target.value)}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Amount</FormLabel>
                  <Input
                    placeholder="0"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </FormControl>
              </>
            )}
          </ModalBody>

          <ModalFooter>
            {status !== "success" && (
              <Web3Button
                style={{ color: "white", background: "#0000FF", width: "100%" }}
                contractAddress={KARMA_TOKEN_ADDRESS}
                action={handleTransfer}
              >
                {status === "loading" ? <Spinner /> : "Transfer"}
              </Web3Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
