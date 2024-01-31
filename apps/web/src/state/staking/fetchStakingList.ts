/* eslint-disable no-await-in-loop */
import { FAST_INTERVAL } from 'config/constants'
import { useSelector } from 'react-redux'
import { AppState, useAppDispatch } from 'state'
import useSWR from 'swr'
import { getContractStaking } from 'utils/contractHelpers'
import { StakingItemType } from './types'
import { setStakingList } from './actions'

export const useStakingListData = (
  poolId,
  contractAddress?: string,
): { stakingList: StakingItemType[]; fetchStakingList: () => void } => {
  const dispatch = useAppDispatch()

  const { mutate } = useSWR(
    ['staking-list', poolId, contractAddress],
    async () => {
      const contractStaking = getContractStaking(contractAddress)
      if (contractStaking) {
        const arr: StakingItemType[] = []
        try {
          let count = 0
          while (true) {
            const poolInfo = await contractStaking.poolPlans(poolId, count)
            const apr = +poolInfo.rewardPerSecond.toString()
            const time = +poolInfo.day.toString()
            const totalStakedAmount = +poolInfo.totalStaked.toString()
            if (apr === 0 && time === 0 && totalStakedAmount === 0) break
            const aprPerDay = +((apr / 1e18) * 100 * 365 * 86400).toFixed(1)
            arr.push({
              poolId,
              planId: count,
              apr: aprPerDay,
              time,
              totalStakedAmount,
              min: 1,
              max: 500,
            })
            count += 1
          }
          dispatch(
            setStakingList({
              stakingList: arr,
            }),
          )
        } catch (error) {
          console.error('useStakingListData', error)
        }
      }
    },
    { refreshInterval: FAST_INTERVAL },
  )

  const stakingList = useSelector((state: AppState) => state.staking.stakingList)
  return { stakingList, fetchStakingList: mutate }
}
