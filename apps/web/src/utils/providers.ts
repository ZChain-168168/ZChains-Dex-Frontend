import { StaticJsonRpcProvider } from '@ethersproject/providers'
import { ACTIVE_CHAIN } from 'config/chains'

export const BSC_PROD_NODE =
  ACTIVE_CHAIN === 'credit' ? 'https://rpc.creditsmartchain.com/' : 'https://rpc.ankr.com/avalanche/' // process.env.NEXT_PUBLIC_NODE_PRODUCTION || 'https://bsc.nodereal.io' // edit

export const bscRpcProvider = new StaticJsonRpcProvider(BSC_PROD_NODE)

export default null
