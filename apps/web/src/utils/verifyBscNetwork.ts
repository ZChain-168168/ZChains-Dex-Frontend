import { ChainId } from '@pancakeswap/sdk'

export const verifyBscNetwork = (chainId: number) => {
  return (
    chainId === ChainId.BSC ||
    chainId === ChainId.BSC_TESTNET ||
    chainId === ChainId.ZCD ||
    chainId === ChainId.ZCD_TESTNET
  ) // edit
}
