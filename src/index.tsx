import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { mainnet } from '@reown/appkit/networks'

const projectId = 'c00145b1e7f8d39d821971d8aeb61276' // Replace with your Reown project ID
const networks = [mainnet]

const queryClient = new QueryClient()

const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks,
  ssr: false
})

// Initialize AppKit with Wagmi adapter
createAppKit({
  projectId,
  networks,
  adapters: [wagmiAdapter],
  metadata: {
    name: 'My Web3 DApp',
    description: 'A simple Ethereum wallet connect app',
    url: window.location.origin,
    icons: []
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
)