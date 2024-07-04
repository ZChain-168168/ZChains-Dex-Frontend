import { StaticJsonRpcProvider } from '@ethersproject/providers'
import { ACTIVE_CHAIN } from 'config/chains'

export const BSC_PROD_NODE = ACTIVE_CHAIN === 'zchain' ? 'https://rpc.zchains.com/' : 'https://rpc-testnet.zchains.com/' // process.env.NEXT_PUBLIC_NODE_PRODUCTION || 'https://bsc.nodereal.io' // edit

export const bscRpcProvider = new StaticJsonRpcProvider(BSC_PROD_NODE)

export default null
