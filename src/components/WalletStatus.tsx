import React, { useEffect, useState } from 'react'
import { useAccount, useBalance, useProvider } from 'wagmi'
import ERC20_ABI from '../abi/ERC20.json'
import { ethers } from 'ethers'

// List of ERC-20 tokens you want to detect (contract addresses)
const ERC20_TOKENS = [
  { name: 'USDT', address: '0xdAC17F958D2ee523a2206206994597C13D831ec7', decimals: 6 },
  { name: 'USDC', address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', decimals: 6 },
  { name: 'DAI', address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', decimals: 18 },
  // Add more tokens as needed
]

export default function WalletStatus() {
  const { address, isConnected } = useAccount()
  const provider = useProvider()
  const { data: ethBalance } = useBalance({
    address: address,
    watch: true
  })

  const [tokenBalances, setTokenBalances] = useState<{ name: string; balance: string }[]>([])

  useEffect(() => {
    if (!isConnected || !address) return

    const fetchTokenBalances = async () => {
      const balances: { name: string; balance: string }[] = []

      for (const token of ERC20_TOKENS) {
        try {
          const contract = new ethers.Contract(token.address, ERC20_ABI, provider)
          const rawBalance = await contract.balanceOf(address)
          const formatted = ethers.utils.formatUnits(rawBalance, token.decimals)
          balances.push({ name: token.name, balance: formatted })
        } catch (err) {
          console.error(`Error fetching balance for ${token.name}:`, err)
        }
      }

      setTokenBalances(balances)
    }

    fetchTokenBalances()
  }, [address, isConnected, provider])

  if (!isConnected) {
    return <p>No wallet connected.</p>
  }

  return (
    <div style={{ marginTop: 20 }}>
      <p><strong>Connected address:</strong> {address}</p>
      <p><strong>ETH balance:</strong> {ethBalance?.formatted} {ethBalance?.symbol}</p>

      <h3>ERC-20 Token Balances:</h3>
      <ul>
        {tokenBalances.map((token) => (
          <li key={token.name}>
            {token.name}: {token.balance}
          </li>
        ))}
      </ul>
    </div>
  )
}