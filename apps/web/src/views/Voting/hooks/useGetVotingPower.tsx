import { ChainId } from '@pancakeswap/sdk'
import { useAccount } from 'wagmi'
import { chains } from 'utils/wagmi'
import { FetchStatus } from 'config/constants/types'
import useSWRImmutable from 'swr/immutable'
import { getAddress } from 'utils/addressHelpers'
import { getActivePools } from 'utils/calls'
import { bscRpcProvider } from 'utils/providers'
import { getVotingPower } from '../helpers'

interface State {
  cakeBalance?: number
  cakeVaultBalance?: number
  cakePoolBalance?: number
  poolsBalance?: number
  cakeBnbLpBalance?: number
  ifoPoolBalance?: number
  total: number
  lockedCakeBalance?: number
  lockedEndTime?: number
}

const useGetVotingPower = (block?: number, chainId?: number): State & { isLoading: boolean; isError: boolean } => {
  const { address: account } = useAccount()
  const { data, status, error } = useSWRImmutable(account ? [chainId, account, block, 'votingPower'] : null, async () => {
    const chain = chains.find((c) => c.id === chainId)
    const blockNumber = block || (await bscRpcProvider.getBlockNumber())
    const eligiblePools = await getActivePools(blockNumber)
    const poolAddresses = eligiblePools.map(({ contractAddress }) => getAddress(contractAddress, chain.id || ChainId.BSC))
    const {
      cakeBalance,
      cakeBnbLpBalance,
      cakePoolBalance,
      total,
      poolsBalance,
      cakeVaultBalance,
      ifoPoolBalance,
      lockedCakeBalance,
      lockedEndTime,
    } = await getVotingPower(chain?.testnet, account, poolAddresses, blockNumber)
    return {
      cakeBalance,
      cakeBnbLpBalance,
      cakePoolBalance,
      poolsBalance,
      cakeVaultBalance,
      ifoPoolBalance,
      total,
      lockedCakeBalance,
      lockedEndTime,
    }
  })
  if (error) console.error(error)

  return { ...data, isLoading: status !== FetchStatus.Fetched, isError: status === FetchStatus.Failed }
}

export default useGetVotingPower
