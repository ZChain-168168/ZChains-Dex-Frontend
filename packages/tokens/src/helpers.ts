import { ChainId } from '@pancakeswap/sdk'
import { TokenAddressMap } from '@pancakeswap/token-lists'

/**
 * An empty result, useful as a default.
 */
export const EMPTY_LIST: TokenAddressMap<ChainId> = {
  [ChainId.ETHEREUM]: {},
  [ChainId.BSC]: {},
  [ChainId.BSC_TESTNET]: {},
  [ChainId.ZCD]: {},
  [ChainId.AVAX]: {},
}

export function serializeTokens(unserializedTokens) {
  const serializedTokens = Object.keys(unserializedTokens).reduce((accum, key) => {
    return { ...accum, [key]: unserializedTokens[key].serialize }
  }, {} as any)

  return serializedTokens
}
