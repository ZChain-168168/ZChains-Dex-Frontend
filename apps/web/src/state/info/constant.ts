import { BLOCKS_CLIENT, BLOCKS_CLIENT_ETH, INFO_CLIENT, INFO_CLIENT_ETH } from 'config/constants/endpoints'
import { infoClientETH, infoClient, infoStableSwapClient, infoClientZCD, infoClientAVAX } from 'utils/graphql'

import { ChainId } from '@pancakeswap/sdk'
import {
  ETH_TOKEN_BLACKLIST,
  PCS_ETH_START,
  PCS_V2_START,
  TOKEN_BLACKLIST,
  BSC_TOKEN_WHITELIST,
  ETH_TOKEN_WHITELIST,
} from 'config/constants/info'

export type MultiChainName = 'BSC' | 'ETH' | 'ZCD' | 'AVAX'

export const multiChainQueryMainToken = {
  BSC: 'BNB',
  ETH: 'ETH',
  ZCD: 'ETH',
  AVAX: 'ETH',
}

export const multiChainBlocksClient = {
  BSC: BLOCKS_CLIENT,
  ETH: BLOCKS_CLIENT_ETH,
  ZCD: BLOCKS_CLIENT,
  AVAX: BLOCKS_CLIENT,
}

export const multiChainStartTime = {
  BSC: PCS_V2_START,
  ETH: PCS_ETH_START,
  ZCD: PCS_ETH_START,
  AVAX: PCS_ETH_START,
}

export const multiChainId = {
  BSC: ChainId.BSC,
  ETH: ChainId.ETHEREUM,
  ZCD: ChainId.ZCD,
  ZCD_TESTNET: ChainId.ZCD_TESTNET,
  AVAX: ChainId.AVAX,
}

export const multiChainPaths = {
  [ChainId.BSC]: '',
  [ChainId.ETHEREUM]: '/eth',
  [ChainId.ZCD]: '',
  [ChainId.ZCD_TESTNET]: '',
  [ChainId.AVAX]: '',
}

export const multiChainQueryClient = {
  BSC: infoClient,
  ETH: infoClientETH,
  ZCD: infoClientZCD,
  AVAX: infoClientAVAX,
  ZCD_TESTNET: infoClientZCD,
}

export const multiChainQueryEndPoint = {
  BSC: INFO_CLIENT,
  ETH: INFO_CLIENT_ETH,
  ZCD: INFO_CLIENT,
  ZCD_TESTNET: INFO_CLIENT,
}

export const multiChainScan = {
  BSC: 'BscScan',
  ETH: 'EtherScan',
  ZCD: 'CreditScan',
  ZCD_TESTNET: 'CreditScan',
}

export const multiChainTokenBlackList = {
  BSC: TOKEN_BLACKLIST,
  ETH: ETH_TOKEN_BLACKLIST,
  ZCD: TOKEN_BLACKLIST,
  ZCD_TESTNET: TOKEN_BLACKLIST,
  AVAX: TOKEN_BLACKLIST,
}

export const multiChainTokenWhiteList = {
  BSC: BSC_TOKEN_WHITELIST,
  ETH: ETH_TOKEN_WHITELIST,
  ZCD: BSC_TOKEN_WHITELIST,
  ZCD_TESTNET: BSC_TOKEN_WHITELIST,
}

export const getMultiChainQueryEndPointWithStableSwap = (chainName: MultiChainName) => {
  const isStableSwap = checkIsStableSwap()
  if (isStableSwap) return infoStableSwapClient

  return multiChainQueryClient[chainName]
}

export const checkIsStableSwap = () => window.location.href.includes('stableSwap')
