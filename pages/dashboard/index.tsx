import React, { useEffect } from 'react'
import { useAccount, useConnect } from 'wagmi';
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from '@rainbow-me/rainbowkit';

import {LOGIN} from '../../graphql/login'
import { useMutation } from '@apollo/client';
const Dashboard = () => {
  const [login , { data, loading, error }] = useMutation(LOGIN);
  const { isConnected, isDisconnected } = useAccount();
  const { openConnectModal, connectModalOpen } = useConnectModal();
  useEffect(() => {
    console.log('isconnected is ', isConnected);
    
    // Si no está conectado, intenta conectar
    if (isDisconnected && openConnectModal) {
      openConnectModal();
    }
    onLogin()
  }, [isConnected, isDisconnected, connectModalOpen]);
  const onLogin = async () => {
    try {
      const url = "/api/graphql";
      const body = {
        type: "login",
        address: "0xaA7880DB88D8e051428b5204817e58D8327340Da"
      }
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const responseData = await response.json();
      console.log('final response data is ', responseData);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard