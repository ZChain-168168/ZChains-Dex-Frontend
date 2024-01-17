import { createReducer } from '@reduxjs/toolkit'
import { setStakingList, setTotalStaked, setStakingHistory } from './actions'
import { StakingHistory, StakingItemType } from './types'

export interface InvestState {
  stakingList: StakingItemType[] | null | undefined
  totalStaked: number | null | undefined
  stakingHistory: StakingHistory[] | null | undefined
}

export const initialState: InvestState = {
  stakingList: undefined,
  totalStaked: undefined,
  stakingHistory: undefined,
}

export default createReducer<InvestState>(initialState, (builder) =>
  builder
    .addCase(setStakingList, (state, { payload }) => {
      state.stakingList = payload.stakingList
    })
    .addCase(setTotalStaked, (state, { payload }) => {
      state.totalStaked = payload
    })
    .addCase(setStakingHistory, (state, { payload }) => {
      state.stakingHistory = payload
    }),
)
