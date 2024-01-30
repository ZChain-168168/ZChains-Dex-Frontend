import useSWR from 'swr'
import { formatBigNumber } from 'utils/formatBalance'
import { useContractStaking } from 'hooks/useContract'
import { FAST_INTERVAL } from 'config/constants'
import { useSelector } from 'react-redux'
import { AppState, useAppDispatch } from 'state'
import { setTotalStaked } from './actions'

export const useTotalStaked = (
  address: string,
  contractAddress?: string,
): { totalStaked: number | null | undefined; fetchTotalStaked: () => void } => {
  const dispatch = useAppDispatch()

  const contractStaking = useContractStaking()

  const { mutate } = useSWR(
    ['total-staked', [address]],
    async () => {
      if (address && contractStaking) {
        try {
          const totalStaked = await contractStaking.getUserTotalDeposits(address)
          dispatch(setTotalStaked(+formatBigNumber(totalStaked)))
        } catch (error) {
          console.error('useTotalStaked', error)
          dispatch(setTotalStaked(null))
        }
      }
    },
    { refreshInterval: FAST_INTERVAL },
  )

  const totalStaked = useSelector((state: AppState) => state.staking.totalStaked)
  return { totalStaked, fetchTotalStaked: mutate }
}
