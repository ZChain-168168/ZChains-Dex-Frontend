import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import stringify from 'fast-json-stable-stringify'
import type { AppState } from 'state'
import type {
  UnknownAsyncThunkFulfilledAction,
  UnknownAsyncThunkPendingAction,
  UnknownAsyncThunkRejectedAction,
} from '@reduxjs/toolkit/dist/matchers'
import fetchCampaigns from './fetchCampaigns'

export const fetchCampaignsPublicDataAsync = createAsyncThunk<
  { list?: any; length: number },
  void,
  { state: AppState }
>(
  'campaigns/fetchCampaignsPublicDataAsync',
  async () => {
    try {
      return fetchCampaigns()
    } catch (error) {
      console.error(error)
      return null
    }
  },
  {
    condition: (arg, { getState }) => {
      const { campaigns } = getState()
      if (campaigns.loadingKeys[stringify({ type: fetchCampaignsPublicDataAsync.typePrefix, arg })]) {
        console.debug('campaigns is fetching, skipping here')
        return false
      }
      return true
    },
  },
)

type UnknownAsyncThunkFulfilledOrPendingAction =
  | UnknownAsyncThunkFulfilledAction
  | UnknownAsyncThunkPendingAction
  | UnknownAsyncThunkRejectedAction

const serializeLoadingKey = (
  action: UnknownAsyncThunkFulfilledOrPendingAction,
  suffix: UnknownAsyncThunkFulfilledOrPendingAction['meta']['requestStatus'],
) => {
  const type = action.type.split(`/${suffix}`)[0]
  return stringify({
    arg: action.meta.arg,
    type,
  })
}

/* Reducer */
export interface SerializedCampaignsState {
  data: any[]
  loadingKeys: Record<string, boolean>
  campaignLength?: number
}

const initialState: SerializedCampaignsState = {
  data: [],
  loadingKeys: {},
}

export const farmsSlice = createSlice({
  name: 'Campaigns',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Update farms with live data
    builder.addCase(fetchCampaignsPublicDataAsync.fulfilled, (state, action) => {
      const { list, length } = action.payload
      state.data = list
      state.campaignLength = length
      state.loadingKeys[serializeLoadingKey(action, 'fulfilled')] = false
    })
    builder.addCase(fetchCampaignsPublicDataAsync.pending, (state, action) => {
      state.loadingKeys[serializeLoadingKey(action, 'pending')] = true
    })
    builder.addCase(fetchCampaignsPublicDataAsync.rejected, (state, action) => {
      state.loadingKeys[serializeLoadingKey(action, 'rejected')] = false
    })
  },
})

export default farmsSlice.reducer
