export interface StakingItemType {
  poolId: number
  planId: number
  apr: number
  time: number
  totalStakedAmount: number
  min: number
  max: number
}

export enum STAKING_STATUS {
  LIVE,
  END,
}
export interface StakingHistory {
  amount: number
  apr: number
  checkpoint: number
  fee: number
  finish: number
  isUnStake: boolean
  planId: number
  poolId: number
  start: number
  userAddress: string
  poolStatus: STAKING_STATUS
  isOld: boolean
}

export interface StakingPools {
  id: string
  lpAddress: string
  lpTokenName: string
  rewardAddress: string
  rewardTokenName: string
}
