import { Percent } from '@pancakeswap/swap-sdk-core'
import { ERC20Token } from './entities/token'

export enum ChainId {
  ETHEREUM = 1,
  BSC = 56,
  BSC_TESTNET = 97,
  ZCD = 168168,
  AVAX = 43114,
}

export type ChainMap<T> = {
  readonly [chainId in ChainId]: T
}

export const ZERO_PERCENT = new Percent('0')
export const ONE_HUNDRED_PERCENT = new Percent('1')

export const ROUTER_ADDRESS: ChainMap<string> = {
  [ChainId.ETHEREUM]: '0xEfF92A263d31888d860bD50809A8D171709b7b1c',
  [ChainId.BSC]: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
  [ChainId.BSC_TESTNET]: '0x176344b44a95536df4F486378A50875F48cB17FA',
  [ChainId.ZCD]: '0x0448dC0C885492E4bcACEb451bF793cb49632953',
  [ChainId.AVAX]: '0x24035Dc2e27B3BD7114d0D9995FaD0d08F8019A6',
}

const FACTORY_ADDRESS = '0x0581143aC484Ea70976bd4f3b4a91ce8D5Da5662'
const FACTORY_ADDRESS_ETH = '0x1097053Fd2ea711dad45caCcc45EfF7548fCB362'
export const FACTORY_ADDRESS_MAP: Record<number, string> = {
  [ChainId.ETHEREUM]: FACTORY_ADDRESS_ETH,
  [ChainId.BSC]: FACTORY_ADDRESS,
  [ChainId.BSC_TESTNET]: '0xe27Fb19E926C47E05c1a4be6FD744f74B656479E',
  [ChainId.ZCD]: '0x3e759360B8773a217Ad4c4A43452ab9888fbe392',
  [ChainId.AVAX]: '0x5C19Ff4FDCD47320D56390dAd2B2e4E9e7095137',
}

const INIT_CODE_HASH = '0x00fb7f630766e6a796048ea87d01acd3068e8ff67d078148a3fa3f4a84f69bd5'
const INIT_CODE_HASH_ETH = '0x95235e13cf3477e1e5f991fc05123af2d29b829cde4f23d515cdd24b5fffa40f'
export const INIT_CODE_HASH_MAP: Record<number, string> = {
  [ChainId.ETHEREUM]: INIT_CODE_HASH_ETH,
  [ChainId.BSC]: INIT_CODE_HASH,
  [ChainId.BSC_TESTNET]: '0x5fecf0089b488d689ca663fae59c148ac40005aeadbdc683b9afe2dd5ac445b7',
  [ChainId.ZCD]: '0x2ff3f45ecbc49f8868007fe7cc58203ad68d73094625fe7a60149ab51e932844',
  [ChainId.AVAX]: '0x9e9171515ff75fad67c7c77c4275f331193a37970e9479011a5b574dfb829ecd',
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
    '0xF0D169242aF2d35f36d8A8a9B0B506cCC322fF4A',
    18,
    'WBNB',
    'Wrapped BNB',
    'https://www.binance.org'
  ),
  [ChainId.ZCD]: new ERC20Token(
    ChainId.ZCD,
    '0x8EF73631891FE90FF30813Fbc94c6858FCE5117d', // edit
    18,
    'WZCD',
    'Wrapped ZCD',
    'https://www.binance.org',
    '/images/16816/tokens/0x8EF73631891FE90FF30813Fbc94c6858FCE5117d.png'
  ),
  [ChainId.AVAX]: new ERC20Token(
    ChainId.AVAX,
    '0x5464FcbDdC94005e77c81739CA99A7F9C98fa8e4', // edit
    6,
    'WAVAX',
    'Wrapped Avalanche C-Chain',
    'https://www.binance.org',
    '/images/43114/tokens/0x5464FcbDdC94005e77c81739CA99A7F9C98fa8e4.png'
  ),
}

export const WNATIVE: Record<number, ERC20Token> = {
  [ChainId.ETHEREUM]: WETH9[ChainId.ETHEREUM],
  [ChainId.BSC]: WBNB[ChainId.BSC],
  [ChainId.BSC_TESTNET]: WBNB[ChainId.BSC_TESTNET],
  [ChainId.ZCD]: WBNB[ChainId.ZCD],
  [ChainId.AVAX]: WBNB[ChainId.AVAX],
}

export const NATIVE: Record<
  // edit
  number,
  {
    name: string
    symbol: string
    decimals: number
  }
> = {
  [ChainId.ETHEREUM]: { name: 'Ether', symbol: 'ETH', decimals: 18 },
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
  [ChainId.ZCD]: {
    name: 'ZChains Coin Native Token',
    symbol: 'ZCD',
    decimals: 18,
  },
  [ChainId.AVAX]: {
    name: 'Avalanche C-Chain',
    symbol: 'AVAX',
    decimals: 18,
  },
}
