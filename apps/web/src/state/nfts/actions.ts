import { createAction } from '@reduxjs/toolkit'
import { NftResponse } from './types'

export const setNftsList = createAction<{ list: NftResponse | null | undefined }>('nfts/setNftsList')
