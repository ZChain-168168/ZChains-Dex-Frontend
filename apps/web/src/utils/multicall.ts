import { CallOverrides } from '@ethersproject/contracts'
import { createMulticall, Call } from '@pancakeswap/multicall'
import { DEFAULT_ACTIVE_CHAIN_ID } from "config/chains"
import { provider } from './wagmi'

export type { Call }

export interface MulticallOptions extends CallOverrides {
  requireSuccess?: boolean
}

const { multicall, multicallv2, multicallv3, multicallv2Typed, multicallv3Typed } = createMulticall(provider, DEFAULT_ACTIVE_CHAIN_ID)

export default multicall

export { multicallv2, multicallv3, multicallv2Typed, multicallv3Typed }
