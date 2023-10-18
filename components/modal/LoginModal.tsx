import { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Input,
} from "@chakra-ui/react";

interface LoginModalProps {
  isOpen: boolean;
  setNickname: React.Dispatch<React.SetStateAction<string>>;
  nickname: string;
}

export function LoginModal({ isOpen, setNickname, nickname }: LoginModalProps) {
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const [overlay, setOverlay] = useState(<OverlayOne />);
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNickname(value);
  };
  return (
    <Modal isCentered isOpen={isOpen} onClose={() => {}}>
      {overlay}
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
          >
            Continue
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
