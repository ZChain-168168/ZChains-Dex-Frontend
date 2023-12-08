import { Percent } from '@pancakeswap/swap-sdk-core'
import { ERC20Token } from './entities/token'

export enum ChainId {
  ETHEREUM = 1,
  GOERLI = 5,
  BSC = 56,
  BSC_TESTNET = 97,
  MTV = 10434,
  MTV_TESTNET = 10435, // edit
}

export type ChainMap<T> = {
  readonly [chainId in ChainId]: T
}

export const ZERO_PERCENT = new Percent('0')
export const ONE_HUNDRED_PERCENT = new Percent('1')

export const ROUTER_ADDRESS: ChainMap<string> = {
  [ChainId.ETHEREUM]: '0xEfF92A263d31888d860bD50809A8D171709b7b1c',
  [ChainId.GOERLI]: '0xEfF92A263d31888d860bD50809A8D171709b7b1c',
  [ChainId.BSC]: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
  [ChainId.BSC_TESTNET]: '0xD99D1c33F9fC3444f8101754aBC46c52416550D1',
  [ChainId.MTV_TESTNET]: '0xe569DAb4bF24dD2370e6e76Dd94498c00AD7344D', // edit
  [ChainId.MTV]: '0x6b300A5c17A058CC84c51EBDEaD7fF6D9841c13d', // edit
}

const FACTORY_ADDRESS = '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73'
const FACTORY_ADDRESS_ETH = '0x1097053Fd2ea711dad45caCcc45EfF7548fCB362'
export const FACTORY_ADDRESS_MAP: Record<number, string> = {
  [ChainId.ETHEREUM]: FACTORY_ADDRESS_ETH,
  [ChainId.GOERLI]: FACTORY_ADDRESS_ETH,
  [ChainId.BSC]: FACTORY_ADDRESS,
  [ChainId.BSC_TESTNET]: '0x6725f303b657a9451d8ba641348b6761a6cc7a17',
  [ChainId.MTV_TESTNET]: '0xA48d3555e6846F891d4291AB37C5bD3CC47c55a5', // edit
  [ChainId.MTV]: '0x001d538DFafa303AD358B50A1d37bc7494891F70', // edit
}

const INIT_CODE_HASH = '0x00fb7f630766e6a796048ea87d01acd3068e8ff67d078148a3fa3f4a84f69bd5'
const INIT_CODE_HASH_ETH = '0x57224589c67f3f30a6b0d7a1b54cf3153ab84563bc609ef41dfb34f8b2974d2d'
export const INIT_CODE_HASH_MAP: Record<number, string> = {
  [ChainId.ETHEREUM]: INIT_CODE_HASH_ETH,
  [ChainId.GOERLI]: INIT_CODE_HASH_ETH,
  [ChainId.BSC]: INIT_CODE_HASH,
  [ChainId.BSC_TESTNET]: '0xd0d4c4cd0848c93cb4fd1f498d7013ee6bfb25783ea21593d5834f5d250ece66',
  [ChainId.MTV_TESTNET]: '0x68a52e8edf5c01d56cf9eed6893e94aad2ec6ef49b8aef6bd4e2d87f32baa4bd', // edit
  [ChainId.MTV]: '0x5fecf0089b488d689ca663fae59c148ac40005aeadbdc683b9afe2dd5ac445b7', // edit
}

export const WETH9 = {
  [ChainId.ETHEREUM]: new ERC20Token(
    ChainId.ETHEREUM,
    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    18,
    'WETH',
    'Wrapped Ether',
    'https://weth.io'
  ),
  [ChainId.GOERLI]: new ERC20Token(
    ChainId.GOERLI,
    '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
    18,
    'WETH',
    'Wrapped Ether',
    'https://weth.io'
  ),
}

export const WBNB = {
  [ChainId.ETHEREUM]: new ERC20Token(
    ChainId.ETHEREUM,
    '0x418D75f65a02b3D53B2418FB8E1fe493759c7605',
    18,
    'WBNB',
    'Wrapped BNB',
    'https://www.binance.org'
  ),
  [ChainId.BSC]: new ERC20Token(
    ChainId.BSC,
    '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    18,
    'WBNB',
    'Wrapped BNB',
    'https://www.binance.org'
  ),
  [ChainId.BSC_TESTNET]: new ERC20Token(
    ChainId.BSC_TESTNET,
    '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd', 
    18,
    'WBNB',
    'Wrapped BNB',
    'https://www.binance.org'
  ),
  [ChainId.MTV_TESTNET]: new ERC20Token(
    ChainId.MTV_TESTNET,
    '0x99d5BD783eD96Fe81624a16B4f60E2f88f759BfF', // edit
    18,
    'WMTV',
    'Wrapped MTV',
    'https://www.binance.org',
    '/images/10435/tokens/0x99d5BD783eD96Fe81624a16B4f60E2f88f759BfF.png'
  ),
  [ChainId.MTV]: new ERC20Token(
    ChainId.MTV,
    '0x433b04307151b0cdb1eE3BFCffBde391e86be43F', // edit
    18,
    'WMTV',
    'Wrapped MTV',
    'https://www.binance.org',
    '/images/10435/tokens/0x433b04307151b0cdb1eE3BFCffBde391e86be43F.png'
  ),
}

export const WNATIVE: Record<number, ERC20Token> = {
  [ChainId.ETHEREUM]: WETH9[ChainId.ETHEREUM],
  [ChainId.GOERLI]: WETH9[ChainId.GOERLI],
  [ChainId.BSC]: WBNB[ChainId.BSC],
  [ChainId.BSC_TESTNET]: WBNB[ChainId.BSC_TESTNET],
  [ChainId.MTV_TESTNET]: WBNB[ChainId.MTV_TESTNET], // edit
  [ChainId.MTV]: WBNB[ChainId.MTV], // edit
}

export const NATIVE: Record< // edit
  number,
  {
    name: string
    symbol: string
    decimals: number
  }
> = {
  [ChainId.ETHEREUM]: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  [ChainId.GOERLI]: { name: 'Goerli Ether', symbol: 'GOR', decimals: 18 },
  [ChainId.BSC]: {
    name: 'Binance Chain Native Token',
    symbol: 'BNB',
    decimals: 18,
  },
  [ChainId.BSC_TESTNET]: {
    name: 'Binance Chain Native Token',
    symbol: 'tBNB',
    decimals: 18,
  },
  [ChainId.MTV_TESTNET]: {
    name: 'Metaviral Chain Native Token',
    symbol: 'tMTV',
    decimals: 18,
  },
  [ChainId.MTV]: {
    name: 'Metaviral Chain Native Token',
    symbol: 'MTV',
    decimals: 18,
  },
}
