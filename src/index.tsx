import { Buffer } from 'buffer'
window.Buffer = Buffer
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { mainnet } from '@reown/appkit/networks'

// Use environment variable (must start with VITE_)
const projectId = import.meta.env.VITE_REOWN_PROJECT_ID
const networks = [mainnet]

const queryClient = new QueryClient()

const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks,
  ssr: false // critical for Vercel
})

// Initialize AppKit with Wagmi adapter
createAppKit({
  projectId,
  networks,
  adapters: [wagmiAdapter],
  metadata: {
    name: 'My Web3 Wallet DApp',
    description: 'Wallet connection app',
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