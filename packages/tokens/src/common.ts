import { ChainId, ERC20Token, Token } from '@pancakeswap/sdk'

// edit
export const CAKE_MAINNET = new ERC20Token(
  ChainId.BSC,
  '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
  18,
  'CAKE',
  'PancakeSwap Token',
  'https://pancakeswap.finance/',
)

export const CAKE_TESTNET = new ERC20Token(
  ChainId.BSC_TESTNET,
  '0xFa60D973F7642B748046464e165A65B7323b0DEE',
  18,
  'CAKE',
  'PancakeSwap Token',
  'https://pancakeswap.finance/',
)

export const CAKE_TESTNET_MTV = new ERC20Token( // edit
  ChainId.MTV_TESTNET,
  '0xbc691Ff9F9DCCa20DB97FCd56930a193169c9305',
  18,
  'CAKE',
  'TeleportSwap Token',
  'https://pancakeswap.finance/',
)

// export const CAKE_CREDIT = new ERC20Token( // edit
//   ChainId.CREDIT,
//   '0x6ee35EC174d928E773Be492c99ab89Bd25EdbBf0',
//   18,
//   'CAKE',
//   'TeleportSwap Token',
//   'https://pancakeswap.finance/',
// )

export const USDC_BSC = new ERC20Token(
  ChainId.BSC,
  '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
  18,
  'USDC',
  'Binance-Peg USD Coin',
  'https://www.centre.io/usdc',
)

export const USDC_TESTNET = new ERC20Token(
  ChainId.BSC_TESTNET,
  '0x64544969ed7EBf5f083679233325356EbE738930',
  18,
  'USDC',
  'Binance-Peg USD Coin',
  'https://www.centre.io/usdc',
)

export const USDC_ETH = new ERC20Token(
  ChainId.ETHEREUM,
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  6,
  'USDC',
  'USD Coin',
)

export const USDC_GOERLI = new ERC20Token(
  ChainId.GOERLI,
  '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',
  6,
  'tUSDC',
  'test USD Coin',
)

export const USDT_BSC = new ERC20Token(
  ChainId.BSC,
  '0x55d398326f99059fF775485246999027B3197955',
  18,
  'USDT',
  'Tether USD',
  'https://tether.to/',
)

export const USDT_ETH = new ERC20Token(
  ChainId.ETHEREUM,
  '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  18,
  'USDT',
  'Tether USD',
  'https://tether.to/',
)

export const EGG_CREDIT = new ERC20Token(
  ChainId.CREDIT,
  '0x366b71c23396d845Bb5CC1631606F17F0b45033f',
  18,
  'EGG',
  'AFASA EggBank Egg Token',
  'https://tether.to/',
  '/images/4400/tokens/0x366b71c23396d845Bb5CC1631606F17F0b45033f.png',
)

export const HEN_CREDIT = new ERC20Token(
  ChainId.CREDIT,
  '0x7690fAfd39B2D41aceCa85BA78970D6078eFbb4A',
  18,
  'HEN',
  'AFASA EggBank Hen Token',
  'https://tether.to/',
  '/images/4400/tokens/0x7690fAfd39B2D41aceCa85BA78970D6078eFbb4A.png',
)

export const USDT_MTV_TESTNET = new ERC20Token(
  ChainId.MTV_TESTNET,
  '0x35F6207320Ae813198485b93eD8036ebab8De5c8',
  18,
  'USDT',
  'Tether USD',
  'https://tether.to/',
  '/images/10435/tokens/0x35F6207320Ae813198485b93eD8036ebab8De5c8.png',
)
export const USDT_MTV = new ERC20Token(
  ChainId.MTV,
  '0x88cd3B410235F7C35819ab4a606b2724Da47a56a',
  18,
  'USDT',
  'MetaViral USD PEG-Tether',
  'https://tether.to/',
  '/images/10435/tokens/0x88cd3B410235F7C35819ab4a606b2724Da47a56a.png',
)

export const USDT_CREDIT = new ERC20Token(
  ChainId.CREDIT,
  '0x4DD741d2F49073ed7aCfaA34fb53330C7324e319',
  18,
  'USDT',
  'Teleport USDT',
  'https://tether.to/',
  '/images/4400/tokens/0x4DD741d2F49073ed7aCfaA34fb53330C7324e319.png',
)

export const USDT_AVAX = new ERC20Token(
  ChainId.AVAX,
  '0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7',
  18,
  'USDT',
  'Avalanche USDT',
  'https://tether.to/',
  '/images/43114/tokens/0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7.png',
)

export const BUSD_BSC = new ERC20Token(
  ChainId.BSC,
  '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
  18,
  'BUSD',
  'Binance USD',
  'https://www.paxos.com/busd/',
)

export const BUSD_TESTNET = new ERC20Token(
  ChainId.BSC_TESTNET,
  '0xaB1a4d4f1D656d2450692D237fdD6C7f9146e814',
  18,
  'BUSD',
  'Binance USD',
  'https://www.paxos.com/busd/',
)

export const BUSD_TESTNET_MTV = new ERC20Token(
  ChainId.MTV_TESTNET,
  '0x65c72B37d645A0533418E68E89AAA513A11AdA99',
  18,
  'BUSD',
  'Binance USD',
  'https://www.paxos.com/busd/',
  '/images/10435/tokens/0x65c72B37d645A0533418E68E89AAA513A11AdA99.png',
)

export const BUSD_MTV = new ERC20Token(
  ChainId.MTV,
  '0x6a3f146746AFf711D7486c01ba0F181FF364e23D',
  18,
  'MUSD',
  'MetaViral USD ( MUSD )',
  'https://www.paxos.com/busd/',
  '/images/10435/tokens/0x6a3f146746AFf711D7486c01ba0F181FF364e23D.png',
)

// export const BUSD_CREDIT = new ERC20Token(
//   ChainId.CREDIT,
//   process.env.NEXT_PUBLIC_WRAPPED || '0xf7D5280ED0DC5fC3E0Af25973508a4F0b9B19Ba6',
//   18,
//   'CUSD',
//   'Credit Chain USD ( CUSD )',
//   'https://www.paxos.com/busd/',
//   '/images/10435/tokens/0xf7D5280ED0DC5fC3E0Af25973508a4F0b9B19Ba6.png',
// )

export const BUSD_ETH = new ERC20Token(
  ChainId.ETHEREUM,
  '0x4Fabb145d64652a948d72533023f6E7A623C7C53',
  18,
  'BUSD',
  'Binance USD',
  'https://www.paxos.com/busd/',
)

export const BUSD_GOERLI = new ERC20Token(
  ChainId.GOERLI,
  '0xb809b9B2dc5e93CB863176Ea2D565425B03c0540',
  18,
  'BUSD',
  'Binance USD',
  'https://www.paxos.com/busd/',
)

export const WBTC_ETH = new ERC20Token(
  ChainId.ETHEREUM,
  '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
  8,
  'WBTC',
  'Wrapped BTC',
)

export const BUSD = {
  [ChainId.ETHEREUM]: BUSD_ETH,
  [ChainId.GOERLI]: BUSD_GOERLI,
  [ChainId.BSC]: BUSD_BSC,
  [ChainId.BSC_TESTNET]: BUSD_TESTNET,
  [ChainId.MTV_TESTNET]: BUSD_TESTNET_MTV,
  [ChainId.MTV]: BUSD_MTV, // edit as MUSD
  // [ChainId.CREDIT]: BUSD_CREDIT,
}

export const CAKE = {
  [ChainId.BSC]: CAKE_MAINNET,
  [ChainId.BSC_TESTNET]: CAKE_TESTNET,
  [ChainId.MTV_TESTNET]: CAKE_TESTNET_MTV, // edit
  // [ChainId.CREDIT]: CAKE_CREDIT,
}

export const USDC = {
  [ChainId.BSC]: USDC_BSC,
  [ChainId.BSC_TESTNET]: USDC_TESTNET,
  [ChainId.ETHEREUM]: USDC_ETH,
  [ChainId.GOERLI]: USDC_GOERLI,
  // [ChainId.CREDIT]: USDT_CREDIT,
}

export const USDT = {
  [ChainId.BSC]: USDT_BSC,
  [ChainId.ETHEREUM]: USDT_ETH,
  [ChainId.MTV_TESTNET]: USDT_MTV_TESTNET,
  [ChainId.MTV]: USDT_MTV, // edit
  [ChainId.CREDIT]: USDT_CREDIT, // edit
  [ChainId.AVAX]: USDT_AVAX,
}
export const OPV_MAINNET = new Token(
  ChainId.BSC,
  '0x36c7b164f85d6f775cd128966d5819c7d36feff3',
  18,
  'OPV',
  'OpenLive Group',
  'https://pancakeswap.finance/',
)

export const OPV_TESTNET = new Token(
  ChainId.BSC_TESTNET,
  '0x083d803CD54f3cbc2A41DA5D7AD998CF0DFA3Cc9',
  18,
  'OPV',
  'OpenLive Group',
  'https://pancakeswap.finance/',
)

export const TELEPORT_CREDIT = new Token(
  ChainId.CREDIT,
  '0x4d5d78a5e645707b7039f6e872d3d02984c9ddf5',
  18,
  'CREDIT',
  'Teleport CREDIT',
  'https://pancakeswap.finance/',
)

export const OPV = {
  [ChainId.BSC]: OPV_MAINNET,
  [ChainId.BSC_TESTNET]: OPV_TESTNET,
}
