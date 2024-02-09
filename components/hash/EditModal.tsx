import React from "react";
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
} from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";

export function EditModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);

  return (
    <>
      <Button
        w="fit-content"
        m={"auto"}
        leftIcon={<FaEdit />}
        onClick={onOpen}
        background={"transparent"}
        color={"white"}
        _hover={{
          bg: "transparent",
          color: "grey",
        }}
      >
        {"Edit"}
      </Button>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        {" "}
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <label>Name</label>
              <Input placeholder="enter name" />
            </Box>
            <Box>
              <label>Email</label>
              <Input placeholder="enter email" />
            </Box>
            <Box>
              <label>Profile Image</label>
              <Input type="file" />
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button w="100%" bg="#0000FF" color={"white"} onClick={onClose}>
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
