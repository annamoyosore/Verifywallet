import React from 'react'
import { AppKitButton } from '@reown/appkit/react'
import WalletStatus from './components/WalletStatus'

export default function App() {
  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>My Web3 Wallet DApp</h1>

      {/* Wallet Connect Button */}
      <AppKitButton />

      {/* Shows connected wallet address */}
      <WalletStatus />
    </div>
  )
}