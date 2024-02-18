import { ChainId } from '@pancakeswap/sdk'
import { BinanceWalletConnector } from '@pancakeswap/wagmi/connectors/binanceWallet'
import { BloctoConnector } from '@pancakeswap/wagmi/connectors/blocto'
import { TrustWalletConnector } from '@pancakeswap/wagmi/connectors/trustWallet'
import { multicallAddresses, multicallCreateBlockNumber } from '@pancakeswap/multicall'
import { bsc, bscTestnet, mainnet } from 'wagmi/chains'
import { Chain, configureChains, createClient } from 'wagmi'
import memoize from 'lodash/memoize'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { LedgerConnector } from 'wagmi/connectors/ledger'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { SafeConnector } from './safeConnector'

export const mtvTestnet: Chain = {
  // edit
  id: ChainId.MTV_TESTNET,
  name: 'MetaViral Chain Testnet',
  network: 'mtvTestnet',
  nativeCurrency: {
    decimals: 18,
    name: 'MetaViral Chain Native Token',
    symbol: 'tMTV',
  },
  rpcUrls: {
    public: {
      http: ['https://testnet-rpc.metaviralscan.com'],
      // webSocket?:
    },
    default: {
      http: ['https://testnet-rpc.metaviralscan.com'],
      // webSocket?:
    },
  },
  blockExplorers: {
    etherscan: { name: 'MTVScan', url: 'https://testnet.metaviralscan.com' },
    default: { name: 'MTVScan', url: 'https://testnet.metaviralscan.com' },
  },
  contracts: {
    multicall3: {
      address: multicallAddresses[ChainId.MTV_TESTNET] as any,
      blockCreated: multicallCreateBlockNumber[ChainId.MTV_TESTNET],
    },
  },
  testnet: true,
}

export const mtv: Chain = {
  // edit
  id: ChainId.MTV,
  name: 'MetaViral Chain',
  network: 'mtv',
  nativeCurrency: {
    decimals: 18,
    name: 'MetaViral Chain Native Token',
    symbol: 'MTV',
  },
  rpcUrls: {
    public: {
      http: ['https://mainnet-rpc.metaviralscan.com'],
      // webSocket?:
    },
    default: {
      http: ['https://mainnet-rpc.metaviralscan.com'],
      // webSocket?:
    },
  },
  blockExplorers: {
    etherscan: { name: 'MTVScan', url: 'https://metaviralscan.com' },
    default: { name: 'MTVScan', url: 'https://metaviralscan.com' },
  },
  contracts: {
    multicall3: {
      address: multicallAddresses[ChainId.MTV] as any,
      blockCreated: multicallCreateBlockNumber[ChainId.MTV],
    },
  },
  testnet: true,
}

export const creditChain: Chain = {
  id: 4400,
  name: 'Credit Smart Chain',
  network: 'CREDIT',
  nativeCurrency: {
    decimals: 18,
    name: 'CREDIT mainnet',
    symbol: 'CREDIT',
  },
  rpcUrls: {
    public: { http: ['https://rpc.creditsmartchain.com'] },
    default: { http: ['https://rpc.creditsmartchain.com'] },
  },
  blockExplorers: {
    default: { name: 'Scan Creditsmartchain', url: 'https://scan.creditsmartchain.com' },
  },

  contracts: {
    multicall3: {
      address: multicallAddresses[ChainId.CREDIT] as any,
      blockCreated: multicallCreateBlockNumber[ChainId.CREDIT],
    },
  },
  testnet: true,
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

const CHAINS = [creditChain, avalanche]

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
    appName: 'TeleportStation',
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
