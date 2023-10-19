import React, { use, useEffect } from "react";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { LoginModal } from "../../components/modal/LoginModal";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../graphql/createUser";
import { LOGIN } from "../../graphql/login";
import { Button } from "@chakra-ui/react";
const Dashboard = () => {
  const [signUp, { data, loading, error }] = useMutation(CREATE_USER);
  const [login, { data: loginData, loading: loginLoading, error: loginError }] = useMutation(LOGIN);
  const { isConnected, isDisconnected, address } = useAccount();
  const { openConnectModal, connectModalOpen } = useConnectModal();
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [nickname, setNickname] = React.useState("");
  useEffect(() => {
    if (isDisconnected && openConnectModal) {
      openConnectModal();
    }
    onLogin();
  }, [isConnected, isDisconnected, connectModalOpen]);
  const onLogin = async () => {
    try {
      const response = await login({
        variables: {
          loginInput: {
            address: address,
          },
        },
      });
      setIsRegistered(true)
    } catch (error) {
      console.error(error);
    }
  };
  const createUser = async () => {
    try {
      const response = await signUp({
        variables: {
          signUpInput: {
            address: address,
            nickname: nickname,
          },
        },
      });
    } catch (error) {
      console.error('error is ', error);
    }
  }
  return isRegistered ? (
    <>
      <div>Dashboard</div>
    </>
  ) : (
    <LoginModal
      isOpen={!isRegistered}
      setNickname={setNickname}
      nickname={nickname}
      createUser={createUser}
    />
  );
};

export default Dashboard;
