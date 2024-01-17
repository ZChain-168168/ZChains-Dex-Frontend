import { createReducer } from '@reduxjs/toolkit'
import { setOwnerStaking, setOwnerContract } from './actions'
import { Owner } from './types'

export const initialState: Owner = {
  ownerStake: '',
  ownerContract: '',
}

export default createReducer<Owner>(initialState, (builder) =>
  builder
    .addCase(setOwnerStaking, (state, { payload }) => {
      return { ...state, ownerStake: payload.ownerStaking }
    })

    .addCase(setOwnerContract, (state, { payload }) => {
      return { ...state, ownerContract: payload.ownerContract }
    }),
)
