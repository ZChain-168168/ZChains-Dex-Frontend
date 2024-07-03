import { ChainId } from '@pancakeswap/sdk'
import { BinanceWalletConnector } from '@pancakeswap/wagmi/connectors/binanceWallet'
import { BloctoConnector } from '@pancakeswap/wagmi/connectors/blocto'
import { TrustWalletConnector } from '@pancakeswap/wagmi/connectors/trustWallet'
import { multicallAddresses, multicallCreateBlockNumber } from '@pancakeswap/multicall'
import { mainnet } from 'wagmi/chains'
import { Chain, configureChains, createClient } from 'wagmi'
import memoize from 'lodash/memoize'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { LedgerConnector } from 'wagmi/connectors/ledger'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { SafeConnector } from './safeConnector'

export const zChain: Chain = {
  id: 168168,
  name: 'ZChains',
  network: 'ZCD',
  nativeCurrency: {
    decimals: 18,
    name: 'ZChains',
    symbol: 'ZCD',
  },
  rpcUrls: {
    public: { http: ['https://rpc.zchains.com'] },
    default: { http: ['https://rpc.zchains.com'] },
  },
  blockExplorers: {
    default: { name: 'Scan ZChains', url: 'https://scan.zchains.com' },
  },

  contracts: {
    multicall3: {
      address: multicallAddresses[ChainId.ZCD] as any,
      blockCreated: multicallCreateBlockNumber[ChainId.ZCD],
    },
  },
  testnet: false,
}

export const eth: Chain = {
  id: 1,
  name: 'Ethereum',
  network: 'ETH',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: ['https://cloudflare-eth.com'] },
    default: { http: ['https://cloudflare-eth.com'] },
  },
  blockExplorers: {
    default: { name: 'Etherscan', url: 'https://etherscan.io' },
  },

  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 14353601,
    },
  },
  testnet: false,
}

export const zChainTestnet: Chain = {
  id: 16816,
  name: 'ZChains Testnet',
  network: 'ZCD',
  nativeCurrency: {
    decimals: 18,
    name: 'ZChains Testnet',
    symbol: 'ZCD',
  },
  rpcUrls: {
    public: { http: ['https://rpc-testnet.zchains.com'] },
    default: { http: ['https://rpc-testnet.zchains.com'] },
  },
  blockExplorers: {
    default: { name: 'Scan ZChains Testnet', url: 'https://testscan.zchains.com' },
  },

  contracts: {
    multicall3: {
      address: multicallAddresses[ChainId.ZCD_TESTNET] as any,
      blockCreated: multicallCreateBlockNumber[ChainId.ZCD_TESTNET],
    },
  },
  testnet: true,
}

const bscExplorer = { name: 'BscScan', url: 'https://bscscan.com' }

export const bsc: Chain = {
  id: 56,
  name: 'BNB Smart Chain',
  network: 'BSC',
  rpcUrls: {
    public: { http: ['https://bsc-dataseed1.binance.org'] },
    default: { http: ['https://bsc-dataseed1.binance.org'] },
  },
  blockExplorers: {
    default: bscExplorer,
    etherscan: bscExplorer,
  },
  nativeCurrency: {
    name: 'Binance Chain Native Token',
    symbol: 'BNB',
    decimals: 18,
  },
  contracts: {
    multicall3: {
      address: '0x1Ee38d535d541c55C9dae27B12edf090C608E6Fb',
      blockCreated: 10959122,
    },
  },
}

export const avalanche: Chain = {
  id: 43114,
  name: 'Avalanche C-Chain',
  network: 'AVAX',

  nativeCurrency: { name: 'Avalanche', symbol: 'AVAX', decimals: 6 },
  blockExplorers: {
    default: {
      name: 'Snowtrace',
      url: 'https://snowtrace.io/',
    },
  },
  rpcUrls: {
    public: { http: ['https://rpc.ankr.com/avalanche'] },
    default: { http: ['https://rpc.ankr.com/avalanche'] },
  },
  contracts: {
    multicall3: {
      address: multicallAddresses[ChainId.AVAX] as any,
      blockCreated: multicallCreateBlockNumber[ChainId.AVAX],
    },
  },
  testnet: true,
}

const CHAINS = [zChain, zChainTestnet, eth]

const getNodeRealUrl = (networkName: string) => {
  let host = null

  switch (networkName) {
    case 'homestead':
      if (process.env.NEXT_PUBLIC_NODE_REAL_API_ETH) {
        host = `eth-mainnet.nodereal.io/v1/${process.env.NEXT_PUBLIC_NODE_REAL_API_ETH}`
      }
      break
    case 'goerli':
      if (process.env.NEXT_PUBLIC_NODE_REAL_API_GOERLI) {
        host = `eth-goerli.nodereal.io/v1/${process.env.NEXT_PUBLIC_NODE_REAL_API_GOERLI}`
      }
      break
    default:
      host = null
  }

  if (!host) {
    return null
  }

  const url = `https://${host}`
  return {
    http: url,
    webSocket: url.replace(/^http/i, 'wss').replace('.nodereal.io/v1', '.nodereal.io/ws/v1'),
  }
}

export const { provider, chains } = configureChains(CHAINS, [
  jsonRpcProvider({
    rpc: (chain) => {
      if (!!process.env.NEXT_PUBLIC_NODE_PRODUCTION && chain.id === bsc.id) {
        return { http: process.env.NEXT_PUBLIC_NODE_PRODUCTION }
      }
      if (process.env.NODE_ENV === 'test' && chain.id === mainnet.id) {
        return { http: 'https://cloudflare-eth.com' }
      }

      return getNodeRealUrl(chain.network) || { http: chain.rpcUrls.default.http[0] }
    },
  }),
])

export const injectedConnector = new InjectedConnector({
  chains,
  options: {
    shimDisconnect: false,
    shimChainChangedDisconnect: true,
  },
})

export const coinbaseConnector = new CoinbaseWalletConnector({
  chains,
  options: {
    appName: 'ZChains',
    appLogoUrl: 'https://swap.metaviral.com/logo.png',
  },
})

export const walletConnectConnector = new WalletConnectConnector({
  chains,
  options: {
    qrcode: true,
  },
})

export const walletConnectNoQrCodeConnector = new WalletConnectConnector({
  chains,
  options: {
    qrcode: false,
  },
})

export const metaMaskConnector = new MetaMaskConnector({
  chains,
  options: {
    shimDisconnect: false,
    shimChainChangedDisconnect: true,
  },
})

const bloctoConnector = new BloctoConnector({
  chains,
  options: {
    defaultChainId: 56,
    appId: 'e2f2f0cd-3ceb-4dec-b293-bb555f2ed5af',
  },
})

const ledgerConnector = new LedgerConnector({
  chains,
})

export const bscConnector = new BinanceWalletConnector({ chains })

export const trustWalletConnector = new TrustWalletConnector({
  chains,
  options: {
    shimDisconnect: false,
    shimChainChangedDisconnect: true,
  },
})

export const client = createClient({
  autoConnect: false,
  provider,
  connectors: [
    new SafeConnector({ chains }),
    metaMaskConnector,
    injectedConnector,
    coinbaseConnector,
    walletConnectConnector,
    bscConnector,
    bloctoConnector,
    ledgerConnector,
    trustWalletConnector,
  ],
})

export const CHAIN_IDS = chains.map((c) => c.id)

export const isChainSupported = memoize((chainId: number) => {
  return CHAIN_IDS.includes(chainId)
})

export const isChainTestnet = memoize((chainId: number) => chains.find((c) => c.id === chainId)?.testnet)
