import React, { use, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { Button, useToast } from "@chakra-ui/react";

import { CREATE_USER } from "../../graphql/createUser.graphql";
import { UPDATE_USER } from "../../graphql/updateUser.graphql";
import { LOGIN } from "../../graphql/login";

import { LoginModal } from "../../components/modal/LoginModal";
import { useRouter } from "next/router";
import KanbanComponent from "../../components/dashboard/KanbanComponent";
import { getHeader } from "../../utils/helpers";

const Dashboard = () => {
  const router = useRouter();
  const toast = useToast();
  const { isConnected, isDisconnected, address } = useAccount();
  const { openConnectModal, connectModalOpen } = useConnectModal();
  const { dashboardId } = router.query;
  const [signUp, { data, loading, error }] = useMutation(CREATE_USER);
  const [updateUser, { data : updateData, loading: updateLoading, error: updateError }] = useMutation(UPDATE_USER);
  const [login, { data: loginData, loading: loginLoading, error: loginError }] = useMutation(LOGIN);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>("");
  const [errorCreating, setErrorCreating] = useState<string>("");
  const [signUpStep, setSignUpStep] = useState<number>(0);
  useEffect(() => {
    if (isDisconnected && openConnectModal) {
      openConnectModal();
    }
    onLogin();
  }, [isConnected, isDisconnected, connectModalOpen]);
  useEffect(() => {
    if(!dashboardId || dashboardId === undefined) return
    
    console.log(dashboardId);
    
  }, [dashboardId])
  
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
      console.log("response is ", response);
      setSignUpStep(1);
      const token = response?.data?.signUp?.token
      localStorage.setItem('token', token)
    } catch (e : any) {
      console.log(error?.message)
      if(!error?.message|| error?.message === undefined ) return
      setErrorCreating(error?.message);
      toast({
        title: error?.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }
  const pickRole = async (role: string) => {
    try {
      console.log("role is ", role);
      const response = await updateUser({
        variables: {
          updateUserInput: {
            id: data.signUp.user.id,
            primaryRol: role,
          },
        },
        context: getHeader()
      });
      console.log("response is ", response);
      setIsRegistered(true)
    } catch (error) {
      console.error('error is ', error);
      toast({
        title: "Error picking user role, please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }
  return isRegistered ? (
    <>
      <KanbanComponent/>
    </>
  ) : (
    <LoginModal
      isOpen={!isRegistered}
      setNickname={setNickname}
      nickname={nickname}
      createUser={createUser}
      signUpStep={signUpStep}
      pickRole={pickRole}
      errorCreating={errorCreating}
      seterrorCreating={setErrorCreating}
    />
  );
};

export default Dashboard;
