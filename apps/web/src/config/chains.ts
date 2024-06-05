import { ChainId } from '@pancakeswap/sdk'
import memoize from 'lodash/memoize'
import { get } from 'lodash'
import invert from 'lodash/invert'

export const CHAIN_QUERY_NAME = {
  [ChainId.ETHEREUM]: 'eth',
  [ChainId.BSC]: 'bsc',
  [ChainId.BSC_TESTNET]: 'bscTestnet',
  [ChainId.ZCD]: 'zchainTestnet',
  [ChainId.AVAX]: 'avax',
} satisfies Record<ChainId, string>

const CHAIN_QUERY_NAME_TO_ID = invert(CHAIN_QUERY_NAME)

export const getChainId = memoize((chainName: string) => {
  if (!chainName) return undefined
  return CHAIN_QUERY_NAME_TO_ID[chainName] ? +CHAIN_QUERY_NAME_TO_ID[chainName] : undefined
})

let chainKey = null
if (typeof global.window !== undefined) {
  chainKey = new URLSearchParams(get(global, 'window.location.search'))?.get('chain')
}

// Config constant
export const ACTIVE_CHAIN =
  chainKey === CHAIN_QUERY_NAME[ChainId.ZCD]
    ? CHAIN_QUERY_NAME[ChainId.ZCD]
    : chainKey === CHAIN_QUERY_NAME[ChainId.BSC_TESTNET]
    ? CHAIN_QUERY_NAME[ChainId.BSC_TESTNET]
    : CHAIN_QUERY_NAME[ChainId.AVAX] // edit

// default select chainId
export const DEFAULT_ACTIVE_CHAIN_ID = ChainId.ZCD // edit
