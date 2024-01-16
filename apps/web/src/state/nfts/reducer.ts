import { createReducer } from '@reduxjs/toolkit'
import { setNftsList } from './actions'
import { NftResponse, NftReward } from './types'
import { nftRewardConfig } from './nftRewardConfig'

export interface NftsState {
  list: NftResponse | null | undefined
  nftReward: NftReward[]
}

export const initialState: NftsState = {
  list: undefined,
  nftReward: nftRewardConfig,
}

export default createReducer<NftsState>(initialState, (builder) =>
  builder.addCase(setNftsList, (state, { payload }) => {
    state.list = payload.list
  }),
)
