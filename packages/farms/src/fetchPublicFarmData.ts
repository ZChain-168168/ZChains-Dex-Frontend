import { MultiCallV2 } from '@pancakeswap/multicall'
import { ChainId } from '@pancakeswap/sdk'
import chunk from 'lodash/chunk'
import { SerializedFarmPublicData, SerializedFarmConfig } from './types'
import { nonBSCVaultAddresses } from './const'

const abi = [
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        name: 'balance',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
]

const fetchFarmCalls = (farm: SerializedFarmPublicData, masterChefAddress: string, vaultAddress?: string) => {
  const { lpAddress, token, quoteToken } = farm
  return [
    // Balance of token in the LP contract
    {
      address: token.address,
      name: 'balanceOf',
      params: [lpAddress],
    },
    // Balance of quote token on LP contract
    {
      address: quoteToken.address,
      name: 'balanceOf',
      params: [lpAddress],
    },
    // Balance of LP tokens in the master chef contract
    {
      address: lpAddress,
      name: 'balanceOf',
      params: [vaultAddress || masterChefAddress],
    },
    // Total supply of LP tokens
    {
      address: lpAddress,
      name: 'totalSupply',
    },
  ]
}

export const fetchPublicFarmsData = async (
  farms: SerializedFarmConfig[],
  chainId = ChainId.BSC,
  multicall: MultiCallV2,
  masterChefAddress: string,
): Promise<any[]> => {
  try {
    const farmCalls = farms.flatMap((farm) => fetchFarmCalls(farm, masterChefAddress, nonBSCVaultAddresses[chainId]))
    const chunkSize = farmCalls.length / farms.length
    const farmMultiCallResult = await multicall({ abi, calls: farmCalls, chainId })
    // console.log( await multicall({ abi, calls: [
    //   {
    //     address: '0x60f4343FfD8B94C005588A44e2A0CB0769E002d9',
    //     name: 'balanceOf',
    //     params: [masterChefAddress]
    //   }
    // ], chainId }))
    return chunk(farmMultiCallResult, chunkSize)
  } catch (error) {
    console.error('MasterChef Public Data error ', error)
    throw error
  }
}
