import React, { useEffect } from "react";
import { useAccount } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { LoginModal } from "../../components/modal/LoginModal";
const Dashboard = () => {
  const { isConnected, isDisconnected, address } = useAccount();
  const { openConnectModal, connectModalOpen } = useConnectModal();
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [nickname, setNickname] = React.useState("");
  useEffect(() => {
    console.log("isconnected is ", isConnected);

    // Si no está conectado, intenta conectar
    if (isDisconnected && openConnectModal) {
      openConnectModal();
    }
    onLogin();
  }, [isConnected, isDisconnected, connectModalOpen]);
  const onLogin = async () => {
    try {
      const url = "/api/graphql";
      const body = {
        type: "login",
        address: address,
      };
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const responseData = await response.json();
      console.log("final response data is ", responseData);
    } catch (error) {
      console.error(error);
    }
  };
  return isRegistered ? (
    <div>Dashboard</div>
  ) : (
    <LoginModal
      isOpen={!isRegistered}
      setNickname={setNickname}
      nickname={nickname}
    />
  );
};

export default Dashboard;
