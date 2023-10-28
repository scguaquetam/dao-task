
import { useMemo } from "react";
import useGenerateQrCode from "../../hooks/useGenerateQrCode";
import useCheckForResponse from "../../hooks/useVerificationResponse";
import { useQRCode } from "next-qrcode";
import { v4 as uuidv4 } from "uuid";
import {
  Button,
  Box,
  Text,
  Center,
  Image,
  VStack,
  Heading,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

const Verifier = () => {
  const sessionId = useMemo(() => uuidv4(), []);
  const { Canvas } = useQRCode();
  const {
    data: qrCode,
    isLoading: loadingQrCode,
    isError: qrCodeError,
  } = useGenerateQrCode(sessionId);

  const { data: verificationResponse } = useCheckForResponse(sessionId, !!qrCode);

  return (
    <VStack minH="100vh" justify="center" align="center" spacing={4}>
      <Box
        bgGradient="radial(indigo.400, purple.400, pink.400)"
        rounded="full"
        opacity="0.1"
        w="50%"
        h="64"
        pos="absolute"
        blur="3xl"
        top="8"
        left="25%"
        zIndex="-1"
      />

      <Heading fontSize={{ base: "3xl", lg: "5xl" }} textAlign="center">
        Prove that you are part of this DAO
      </Heading>

      <Text fontSize="xl" maxW="2xl" textAlign="center" mt={2} mb={4}>
        Scan the QR code below with the Polygon ID app to prove that you are part of this DAO
      </Text>

      {qrCodeError ? (
        <Text className="text-center">
          Something went wrong generating the QR code.
        </Text>
      ) : loadingQrCode ? (
        <Text className="text-center">Loading...</Text>
      ) : (
        <Center>
          <Canvas text={JSON.stringify(qrCode)} options={{ width: 300 }} />
        </Center>
      )}

      <Text mt={4} fontSize="xl" maxW="xl" mb={4} textAlign="center">
        Your current status:{" "}
        {verificationResponse ? (
          <span className="text-green-400">
            <CheckIcon /> Verified. Redirecting to your Member dashboard...
          </span>
        ) : (
          <span className="text-red-400">
            <CloseIcon /> Not verified
          </span>
        )}
      </Text>

      <Heading fontSize="3xl" fontWeight="semibold" transition="color">
        How can I get a Verified Credential?
      </Heading>

      <Text fontSize="xl" maxW="2xl" mt={2} mb={4} textAlign="center">
        In Axia, each DAO has at least 1 "Admin" user that can send claim links to the people the DAO selected as part of the Committee. This will allow you to claim your DAO credential, after you get it, you can return to this page to prove your membership. If you haven't received a claim link, please get in touch with your DAO admin.
      </Text>

      <Text fontSize="xl" maxW="2xl" mt={4} mb={2} textAlign="center">
        So far the only way to get your Verified Credential is by using your Polygon ID app.
      </Text>

      <Text fontSize="xl" maxW="2xl" mt={2} mb={2} textAlign="center">
        Download the app:
      </Text>

      <VStack spacing={4} mt={2}>
        <Button
          bgGradient="to-br"
          variant="secondary"
          onClick={() =>
            window.open("https://apps.apple.com/us/app/polygon-id/id1629870183")
          }
        >
          Download for iOS
        </Button>

        <Button
          bgGradient="to-br"
          variant="secondary"
          onClick={() =>
            window.open(
              "https://play.google.com/store/apps/details?id=com.polygonid.wallet&pli=1"
            )
          }
        >
          Download for Android
        </Button>
      </VStack>
    </VStack>
  );
};

export default Verifier;