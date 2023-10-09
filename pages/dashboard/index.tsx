import React, { useEffect } from 'react'
import { useAccount, useConnect } from 'wagmi';
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from '@rainbow-me/rainbowkit';
const Dashboard = () => {
  const { isConnected, isDisconnected } = useAccount();
  const { openConnectModal, connectModalOpen } = useConnectModal();
  useEffect(() => {
    console.log('isconnected is ', isConnected);
    
    // Si no está conectado, intenta conectar
    if (isDisconnected && openConnectModal) {
      openConnectModal();
    }
  }, [isConnected, isDisconnected, connectModalOpen]);
  
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard