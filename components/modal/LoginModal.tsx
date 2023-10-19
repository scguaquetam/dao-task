import { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Input,
  useToast,
} from "@chakra-ui/react";

interface LoginModalProps {
  isOpen: boolean;
  setNickname: React.Dispatch<React.SetStateAction<string>>;
  nickname: string;
  createUser: () => void;
}

export function LoginModal({ isOpen, setNickname, nickname, createUser }: LoginModalProps) {
  const toast = useToast()
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNickname(value);
  };
  const onContinue = () => {
    if(nickname.length < 3) {
      toast({
        title: 'Please input a correct nickname.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } else {
      createUser()
    }
  };
  return (
    <Modal isCentered isOpen={isOpen} onClose={() => {}}>
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
      <ModalContent bg="#9776E1" borderRadius={"20px"}>
        <ModalHeader textAlign="center" fontSize={"2xl"}>
          Choose a nickname
        </ModalHeader>
        <ModalBody flexDirection="column" alignItems="center" mb={4}>
          <Input
            placeholder="Nickname"
            size="lg"
            mb={4}
            borderRadius="25px"
            bg="linear-gradient(#3107DA,#5b1bcb)"
            onChange={(e) => onChangeInput(e)}
            value={nickname}
          />
          <Button
            width="100%"
            mt={4}
            bg="linear-gradient(#8a46ff,#6e38cc)"
            size="lg"
            onClick={onContinue}
          >
            Continue
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
