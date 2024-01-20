import { ChainId } from '@pancakeswap/sdk'
import { ACTIVE_CHAIN } from 'config/chains'

export const GRAPH_API_PROFILE = 'https://api.thegraph.com/subgraphs/name/pancakeswap/profile'
export const GRAPH_API_PREDICTION_BNB = 'https://api.thegraph.com/subgraphs/name/pancakeswap/prediction-v2'
export const GRAPH_API_PREDICTION_CAKE = 'https://api.thegraph.com/subgraphs/name/pancakeswap/prediction-cake'

export const GRAPH_API_LOTTERY = 'https://api.thegraph.com/subgraphs/name/pancakeswap/lottery'
export const SNAPSHOT_BASE_URL =
  ACTIVE_CHAIN === 'credit'
    ? 'https://credit-graphnode.evmbuilder.com/subgraphs/name/dex/pairs'
    : 'https://api.thegraph.com/subgraphs/name/ttsgoerbridge/dexswap-avax' // edit
export const API_PROFILE = 'https://profile.pancakeswap.com'
export const API_NFT = 'https://nft.pancakeswap.com/api/v1'
export const SNAPSHOT_API = `${SNAPSHOT_BASE_URL}`
export const SNAPSHOT_HUB_API = `${SNAPSHOT_BASE_URL}/api/message`
export const GRAPH_API_POTTERY = 'https://api.thegraph.com/subgraphs/name/pancakeswap/pottery'

/**
 * V1 will be deprecated but is still used to claim old rounds
 */
export const GRAPH_API_PREDICTION_V1 = 'https://api.thegraph.com/subgraphs/name/pancakeswap/prediction'

// export const INFO_CLIENT = 'https://proxy-worker.pancake-swap.workers.dev/bsc-exchange'
export const INFO_CLIENT =
  ACTIVE_CHAIN === 'credit'
    ? 'https://credit-graphnode.evmbuilder.com/subgraphs/name/dex/exchange'
    : 'https://api.thegraph.com/subgraphs/name/ttsgoerbridge/dexswap-exchange-avax' // edit

export const INFO_CLIENT_STAKING = 'https://api.thegraph.com/subgraphs/name/tdkhoa2002/staking_no_refferals'

export const INFO_CLIENT_AVAX = 'https://api.thegraph.com/subgraphs/name/ttsgoerbridge/dexswap-avax'

export const INFO_CLIENT_ETH = 'https://api.thegraph.com/subgraphs/name/pancakeswap/exhange-eth'
export const BLOCKS_CLIENT = 'https://api.thegraph.com/subgraphs/name/pancakeswap/blocks'
export const BLOCKS_CLIENT_ETH = 'https://api.thegraph.com/subgraphs/name/blocklytics/ethereum-blocks'
export const STABLESWAP_SUBGRAPH_CLIENT = 'https://api.thegraph.com/subgraphs/name/pancakeswap/exchange-stableswap'
export const GRAPH_API_NFTMARKET = 'https://api.thegraph.com/subgraphs/name/pancakeswap/nft-market'
export const GRAPH_HEALTH = 'https://api.thegraph.com/index-node/graphql'

export const TC_MOBOX_SUBGRAPH = 'https://api.thegraph.com/subgraphs/name/pancakeswap/trading-competition-v3'
export const TC_MOD_SUBGRAPH = 'https://api.thegraph.com/subgraphs/name/pancakeswap/trading-competition-v4'

export const FARM_API = 'https://farms-api.pancakeswap.com'

export const BIT_QUERY = 'https://graphql.bitquery.io'

export const ACCESS_RISK_API = '/api/risk'

export const CELER_API = 'https://api.celerscan.com/scan'

export const INFO_CLIENT_WITH_CHAIN = {
  [ChainId.BSC]: INFO_CLIENT,
  [ChainId.ETHEREUM]: INFO_CLIENT_ETH,
  [ChainId.CREDIT]: INFO_CLIENT,
  [ChainId.AVAX]: INFO_CLIENT,
}

export const BLOCKS_CLIENT_WITH_CHAIN = {
  [ChainId.BSC]: BLOCKS_CLIENT,
  [ChainId.ETHEREUM]: BLOCKS_CLIENT_ETH,
  [ChainId.CREDIT]: BLOCKS_CLIENT,
  [ChainId.AVAX]: INFO_CLIENT,
}

export const ASSET_CDN = 'https://assets.pancakeswap.finance'
