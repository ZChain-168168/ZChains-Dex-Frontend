import { formatEther } from '@ethersproject/units'
import { MultiCallV2 } from '@pancakeswap/multicall'
import { ChainId } from '@pancakeswap/sdk'
import { masterChefAddresses } from './const'
import { farmV2FetchFarms, FetchFarmsParams, fetchMasterChefV2Data } from './fetchFarms'

const supportedChainId = [ChainId.ZCD, ChainId.ZCD_TESTNET] // edit
export const bCakeSupportedChainId = [ChainId.ZCD, ChainId.ZCD_TESTNET] // edit

export function createFarmFetcher(multicallv2: MultiCallV2) {
  const fetchFarms = async (
    params: {
      chainId: number
      isTestnet: boolean
    } & Pick<FetchFarmsParams, 'chainId' | 'farms'>,
  ) => {
    const { isTestnet, farms, chainId } = params
    const masterChefAddress = masterChefAddresses[chainId]
    const { poolLength, totalRegularAllocPoint, totalSpecialAllocPoint, cakePerBlock } = await fetchMasterChefV2Data({
      chainId,
      isTestnet,
      multicallv2,
      masterChefAddress,
    })
    // console.log('{ poolLength, totalRegularAllocPoint, totalSpecialAllocPoint, cakePerBlock }', { poolLength, totalRegularAllocPoint, totalSpecialAllocPoint, cakePerBlock })
    const regularCakePerBlock = formatEther(cakePerBlock)
    // console.log('params', params)
    // console.log('regularCakePerBlock', regularCakePerBlock)
    const farmsWithPrice = await farmV2FetchFarms({
      chainId,
      isTestnet,
      multicallv2,
      farms: farms.filter((f) => !f.pid || poolLength.gt(f.pid)),
      masterChefAddress,
      totalRegularAllocPoint,
      totalSpecialAllocPoint,
    })

    return {
      farmsWithPrice,
      poolLength: poolLength.toNumber(),
      regularCakePerBlock: +regularCakePerBlock,
    }
  }
  return {
    fetchFarms,
    isChainSupported: (chainId: number) => supportedChainId.includes(chainId),
    supportedChainId,
    isTestnet: (chainId: number) => ![ChainId.BSC, ChainId.ETHEREUM].includes(chainId),
  }
}

export * from './apr'
export * from './farmsPriceHelpers'
export * from './types'
export * from './deserializeFarmUserData'
export * from './deserializeFarm'
export { FARM_AUCTION_HOSTING_IN_SECONDS } from './const'
export * from './filterFarmsByQuery'
