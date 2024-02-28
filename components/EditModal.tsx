import React, { useState } from "react";
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
import styles from "../styles/Editmodal.module.css";

export function EditModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);

  const [name, setName] = useState("");
  const [coverImg, setCoverImg] = useState<string | undefined>("");
  const [profileImg, setProfileImg] = useState<string | undefined>("");

  const handleFormUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      name,
      coverImg,
      profileImg,
    };

    console.log(payload);
  };

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
        <ModalContent bg={"#222528"} color={"white"}>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody className={styles.inputBoxContainer}>
            <form onSubmit={handleFormUpdate} className={styles.form}>
              <Box>
                <label>Name</label>
                <Input placeholder="enter name" />
              </Box>
              <Box>
                <label>Email</label>
                <Input placeholder="enter email" />
              </Box>
              <Box>
                <label>Cover Image</label>
                <Input
                  type="file"
                  accept="image/png"
                  onChange={(e) => setCoverImg(e?.target?.files?.[0].name)}
                />
              </Box>
              <Box>
                <label>Profile Image</label>
                <Input
                  type="file"
                  accept="image/png"
                  onChange={(e) => setProfileImg(e?.target?.files?.[0].name)}
                />
              </Box>
                <Button mt={4} mb={4} w="100%" bg="#0000FF" color={"white"} type="submit">
                  Update
                </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
