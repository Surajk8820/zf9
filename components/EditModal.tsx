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
import { uploadCloudinary } from "../components/CloudinaryUpload";

export function EditModal({ updateFunc, currentUser }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);

  const [name, setName] = useState(currentUser?.userName);
  const [coverImg, setCoverImg] = useState<any>("");
  const [profileImg, setProfileImg] = useState<any>("");
  const [email, setMail] = useState(currentUser?.email);

  const handleFormUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let cover;
    let profile;

    if (coverImg !== "") {
      cover = await uploadCloudinary(coverImg[0]);
    }
    if (profileImg !== "") {
      profile = await uploadCloudinary(profileImg[0]);
    }
    const payload = {
      userName: name,
      coverImg: cover,
      profileImg: profile,
      email,
    };

    updateFunc(payload);
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
        {""}
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
                <Input
                  placeholder="enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>
              <Box>
                <label>Email</label>
                <Input
                  value={email}
                  type="email"
                  placeholder="enter email"
                  onChange={(e) => setMail(e.target.value)}
                />
              </Box>
              <Box>
                <label>Cover Image</label>
                <Input
                  type="file"
                  accept="image/png"
                  onChange={(e) => setCoverImg(e.target.files)}
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
              <Button
                mt={4}
                mb={4}
                w="100%"
                bg="#0000FF"
                color={"white"}
                type="submit"
              >
                Update
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
