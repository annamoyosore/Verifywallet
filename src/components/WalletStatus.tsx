import React, { useEffect, useState } from 'react'
import { useAccount, useBalance } from 'wagmi'

export default function WalletStatus() {
  const { address, isConnected } = useAccount()
  const [ethBalance, setEthBalance] = useState<string>('0')

  // Fetch ETH balance when wallet changes
  const { data: balanceData } = useBalance({
    address: address,
    watch: true, // auto update when balance changes
  })

  useEffect(() => {
    if (balanceData?.formatted) {
      setEthBalance(balanceData.formatted)
    }
  }, [balanceData])

  if (!isConnected || !address) return <p>No wallet connected</p>

  return (
    <div style={{ marginTop: 10, fontFamily: 'Arial, sans-serif' }}>
      <p><strong>Connected Wallet:</strong> {address}</p>
      <p><strong>ETH Balance:</strong> {ethBalance} ETH</p>
    </div>
  )
}