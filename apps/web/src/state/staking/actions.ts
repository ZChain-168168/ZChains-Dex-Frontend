import { createAction } from '@reduxjs/toolkit'
import { StakingItemType, StakingHistory } from './types'

export const setStakingList = createAction<{ stakingList: StakingItemType[] | null | undefined }>(
  'staking/setStakingList',
)

export const setTotalStaked = createAction<number | null | undefined>('staking/setTotalStaked')

export const setStakingHistory = createAction<StakingHistory[] | null | undefined>('staking/setStakingHistory')
