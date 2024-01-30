/* eslint-disable no-await-in-loop */
import { useState } from 'react'
import useSWR from 'swr'
import { roundNumber } from 'helpers'
import { useContractStaking } from 'hooks/useContract'
import { formatBigNumber } from 'utils/formatBalance'
import { StakingHistory, StakingItemType, STAKING_STATUS } from './types'
import { log } from 'console'

export function useStakingEarn(account?: string, stakingList?: StakingItemType[], stakingHistory?: StakingHistory[]) {
  const [opvEarned, setOpvEarned] = useState<number | undefined>()
  useSWR(
    ['staking-earn', account, stakingList, stakingHistory],
    async () => {
      if (account && stakingList && stakingHistory) {
        let totalEarn = 0
        const currentTime = new Date().getTime()
        for (let i = 0; i < stakingHistory.length; i++) {
          const stakingHistoryItem = stakingHistory[i]
          const fPackage = stakingList.find(
            (item) => item.planId === stakingHistoryItem.planId && item.poolId === stakingHistoryItem.poolId,
          )

          let timeWasLocked = (currentTime - stakingHistoryItem.start) / 1000 / 60 / 60 / 24 // day reward locked
          timeWasLocked = timeWasLocked > fPackage.time ? fPackage.time : timeWasLocked // all day locked

          const percentPerDay = ((stakingHistoryItem.apr / 1e18) * 100 * 30 * 84600) / 360
          if (stakingHistoryItem.poolStatus === STAKING_STATUS.LIVE) {
            const rewardPerPackage = ((percentPerDay * stakingHistoryItem.amount) / 100) * timeWasLocked
            totalEarn += rewardPerPackage
          }
          if (stakingHistoryItem.poolStatus === STAKING_STATUS.END) {
            const rewardPerPackage = ((percentPerDay * stakingHistoryItem.amount) / 100) * timeWasLocked
            totalEarn += rewardPerPackage
          }
        }

        setOpvEarned(roundNumber(totalEarn, { scale: 5, scaleSmall: 2 }))
      }
    },
    { refreshInterval: 1000 },
  )
  return { opvEarned }
}

// Staking earned
export async function fetchStakingEarned(contractStaking, account, startTime) {
  const packageEarned = await contractStaking.calculateDivedend(startTime?.toString(), account)
  const totalEarn = +formatBigNumber(packageEarned)
  return totalEarn
}

export function useStakingTotalEarnedContract(
  account?: string,
  stakingHistory?: StakingHistory[],
  stakingAddress?: string,
) {
  const contractStaking = useContractStaking(stakingAddress)
  const [opvEarned, setOpvEarned] = useState<number | undefined>()
  useSWR(
    ['staking-earned-contract', account, stakingHistory, stakingAddress],
    async () => {
      if (account && contractStaking && stakingHistory) {
        try {
          let totalEarn = 0
          for (let i = 0; i < stakingHistory.length; i++) {
            const packageItem = stakingHistory[i]
            const resultEarn = await fetchStakingEarned(contractStaking, account, packageItem.start / 1000)
            totalEarn += resultEarn
            setOpvEarned(roundNumber(totalEarn, { scale: 6 }))
          }
        } catch (error) {
          console.error('useStakingTotalEarnedContract', error)
        }
      }
    },
    { refreshInterval: 1000 },
  )
  return { opvEarned }
}

export function useStakingEarned(account?: string, start?: number) {
  const contractStaking = useContractStaking()
  const { data } = useSWR(
    ['staking-earned', account, start],
    async () => {
      if (account && contractStaking && start) {
        try {
          const resultEarned = await fetchStakingEarned(contractStaking, account, start / 1000)
          return resultEarned
        } catch (error) {
          return undefined
        }
      }
      return undefined
    },
    { refreshInterval: 1000 },
  )
  return { opvEarned: data }
}
