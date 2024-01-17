import { createAction } from '@reduxjs/toolkit'

export const setOwnerStaking = createAction<{ ownerStaking: string }>('admin/ownerStaking')

export const setOwnerContract = createAction<{ ownerContract: string }>('admin/ownerContract')
