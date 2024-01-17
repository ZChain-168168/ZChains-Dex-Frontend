import { createSelector } from '@reduxjs/toolkit'
import { State } from 'state/types'

export const campaignsSelector = () =>
  createSelector(
    (state: State) => state.campaigns,
    (campaigns) => {
      return {
        data: campaigns.data,
      }
    },
  )
