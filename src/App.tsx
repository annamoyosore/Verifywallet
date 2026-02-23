import React from 'react'
import { AppKitButton } from '@reown/appkit/react'
import WalletStatus from './components/WalletStatus'

export default function App() {
  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>My Web3 Wallet DApp</h1>
      <AppKitButton /> {/* Opens wallet connection modal */}
      <WalletStatus />
    </div>
  )
}