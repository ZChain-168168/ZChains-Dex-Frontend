import useSWR from 'swr'
import BigNumber from 'bignumber.js'
import { useContractStaking } from 'hooks/useContract'
import { FAST_INTERVAL } from 'config/constants'
import { useSelector } from 'react-redux'
import { AppState, useAppDispatch } from 'state'

import { useCallback, useEffect, useState } from 'react'
import { gql } from 'graphql-request'
import { infoClientStaking } from 'utils/graphql'
import { StakingHistory, STAKING_STATUS } from './types'
import { setStakingHistory } from './actions'

export const useStakingHistory = (
  address: string,
): { stakingHistory: StakingHistory[] | null | undefined; fetchStakingHistory: () => void } => {
  const dispatch = useAppDispatch()

  const contractStaking = useContractStaking()

  const { mutate } = useSWR(
    ['staking-history', [address]],
    async () => {
      if (address && contractStaking) {
        try {
          const { deposits } = await contractStaking.getUserInfo(address)
          if (deposits?.length > 0) {
            const parseDeposits = deposits.map((item) => {
              const currentTime = new Date().getTime()
              const startTime = +item.start.toString() * 1000
              const endTime = +item.finish.toString() * 1000
              return {
                amount: new BigNumber(+item.amount.toString()).shiftedBy(-18).toNumber(),
                apr: +item.apr.toString(),
                checkpoint: +item.checkpoint.toString(),
                fee: +item.fee.toString(),
                isUnStake: item.isUnStake,
                planId: item.plan,
                poolId: item.poolId,
                userAddress: item.userAddress,
                start: startTime,
                finish: endTime,
                poolStatus: currentTime >= endTime ? STAKING_STATUS.END : STAKING_STATUS.LIVE,
                isOld: true,
              }
            })
            dispatch(setStakingHistory(parseDeposits.reverse()))
          } else {
            dispatch(setStakingHistory([]))
          }
        } catch (error) {
          // console.error('useStakingHistory', error)
          dispatch(setStakingHistory(null))
        }
      }
    },
    { refreshInterval: FAST_INTERVAL },
  )

  const stakingHistory = useSelector((state: AppState) => state.staking.stakingHistory)
  return { stakingHistory, fetchStakingHistory: mutate }
}

// fetch staking with draw History graphql
const graphStakingClaimWithdrawHistories = async (userAddress, planId, transactionHash, startTime, endTime) => {
  const currentTimeHours = new Date().getHours()
  const currentTimeMinute = new Date().getMinutes()
  const currentTimeSecond = new Date().getSeconds()
  const currentTime = currentTimeHours * 60 * 60 + currentTimeMinute * 60 + currentTimeSecond

  const whereStr = `
    where: {
      ${userAddress ? `userAddress: "${userAddress}"` : ''}
      ${planId ? `planId: ${planId}` : ''}
      ${transactionHash ? `transactionHash: "${transactionHash}"` : ''}
      ${startTime ? `createdTime_gte: "${Number(startTime) - currentTime}"` : ''}
      ${endTime ? `createdTime_lte: "${Number(endTime) + currentTime}"` : ''}
    }
  `
  try {
    const query = gql`
      query stakingClaimPools {
        stakingWithdrawHistories(
          first: 1000
          orderBy: startTime
          orderDirection: desc
          ${whereStr}
        ) {
          id
          amount
          planId
          poolId
          startTime
          transactionHash
          userAddress
          createdTime
        }
      }
    `
    const data = await infoClientStaking.request(query)
    return data
  } catch (error) {
    console.error('Failed staking Claim Pools', error)
    return null
  }
}

interface ResponseClaimStakingWithdrawHistories {
  dataWithdraw: StakingHistory[] | undefined | null
}

export const useClaimWithdrawHistories = (
  activeFetch?: boolean,
): {
  stakingWithdrawHistories: ResponseClaimStakingWithdrawHistories
  fetchStakingWithdrawHistories: () => void
  paramsStakeWithdrawHistories: any
  setParamsStakeWithdrawHistories: (p: any) => void
} => {
  const [paramsStakeWithdrawHistories, setParamsStakeWithdrawHistories] = useState({
    userAddress: '',
    planId: '',
    transactionHash: '',
    startTime: '',
    endTime: '',
  })
  const [stakingWithdrawHistories, setStakingWithdrawHistories] = useState<ResponseClaimStakingWithdrawHistories>({
    dataWithdraw: undefined,
  })

  const fetchStakingWithdrawHistories = useCallback(async () => {
    const result = await graphStakingClaimWithdrawHistories(
      paramsStakeWithdrawHistories.userAddress,
      paramsStakeWithdrawHistories.planId,
      paramsStakeWithdrawHistories.transactionHash,
      paramsStakeWithdrawHistories.startTime,
      paramsStakeWithdrawHistories.endTime,
    )
    setStakingWithdrawHistories({
      dataWithdraw: result?.stakingWithdrawHistories || null,
    })
  }, [paramsStakeWithdrawHistories])

  useEffect(() => {
    if (activeFetch) {
      fetchStakingWithdrawHistories()
    }
  }, [activeFetch, fetchStakingWithdrawHistories])

  return {
    stakingWithdrawHistories,
    fetchStakingWithdrawHistories,
    paramsStakeWithdrawHistories,
    setParamsStakeWithdrawHistories,
  }
}

//
//
//
//
//
//

// fetch staking with deposit History graphql
const graphStakingClaimDepositHistories = async (userAddress, planId, transactionHash, startTime, endTime) => {
  const currentTimeHours = new Date().getHours()
  const currentTimeMinute = new Date().getMinutes()
  const currentTimeSecond = new Date().getSeconds()
  const currentTime = currentTimeHours * 60 * 60 + currentTimeMinute * 60 + currentTimeSecond

  const whereStr = `
    where: {
      ${userAddress ? `userAddress: "${userAddress}"` : ''}
      ${planId ? `planId: ${planId}` : ''}
      ${transactionHash ? `transactionHash: "${transactionHash}"` : ''}
      ${startTime ? `createdTime_gte: "${Number(startTime) - currentTime}"` : ''}
      ${endTime ? `createdTime_lte: "${Number(endTime) + currentTime}"` : ''}
    }
  `
  try {
    const query = gql`
      query stakingClaimPools {
        stakingDepositHistories(
          first: 1000
          orderBy: startTime
          orderDirection: desc
          ${whereStr}
        ) {
          amount
          apr
          createdTime
          endTime
          id
          planId
          poolId
          startTime
          status
          transactionHash
          userAddress
        }
      }
    `
    const data = await infoClientStaking.request(query)
    return data
  } catch (error) {
    console.error('Failed staking Claim Pools', error)
    return null
  }
}

interface ResponseClaimStakingDepositHistories {
  dataDeposit: StakingHistory[] | undefined | null
}

export const useClaimDepositHistories = (
  activeFetch?: boolean,
): {
  stakingDepositHistories: ResponseClaimStakingDepositHistories
  fetchStakingDepositHistories: () => void
  paramsDepositHistories: any
  setParamsDepositHistories: (p: any) => void
} => {
  const [paramsDepositHistories, setParamsDepositHistories] = useState({
    userAddress: '',
    planId: '',
    transactionHash: '',
    startTime: '',
    endTime: '',
  })
  const [stakingDepositHistories, setStakingDepositHistories] = useState<ResponseClaimStakingDepositHistories>({
    dataDeposit: undefined,
  })

  const fetchStakingDepositHistories = useCallback(async () => {
    const result = await graphStakingClaimDepositHistories(
      paramsDepositHistories.userAddress,
      paramsDepositHistories.planId,
      paramsDepositHistories.transactionHash,
      paramsDepositHistories.startTime,
      paramsDepositHistories.endTime,
    )
    setStakingDepositHistories({
      dataDeposit: result?.stakingDepositHistories || null,
    })
  }, [, paramsDepositHistories])

  useEffect(() => {
    if (activeFetch) {
      fetchStakingDepositHistories()
    }
  }, [activeFetch, fetchStakingDepositHistories])

  return { stakingDepositHistories, fetchStakingDepositHistories, paramsDepositHistories, setParamsDepositHistories }
}

// fetch staking with deposit History graphql by date

const graphStakingClaimDepositHistoriesByDate = async (start: string, end: string) => {
  const currentTimeHours = new Date().getHours()
  const currentTimeMinute = new Date().getMinutes()
  const currentTimeSecond = new Date().getSeconds()
  const currentTime = currentTimeHours * 60 * 60 + currentTimeMinute * 60 + currentTimeSecond

  const whereStr = `
    {${start ? `createdTime_gte: "${Number(start) - currentTime}"` : ''}
    ${end ? `endTime_lte: "${Number(end) + currentTime}"` : ''}}
  `
  try {
    const query = gql`
      query stakingDepositHistoriesByDate {
        stakingDepositHistories(
          where: ${whereStr}
        ) {
          createdTime
          endTime
          startTime
          id
          amount
          apr
          planId
          poolId
          status
          transactionHash
          userAddress
        }
      }
    `
    const data = await infoClientStaking.request(query)
    return data
  } catch (error) {
    console.error('Failed graphStakingClaimDepositHistoriesByDate', error)
    return null
  }
}

interface ResponseClaimHistory {
  dataDeposit: { stakingDepositHistories: StakingHistory[] } | undefined | null
}

export const useClaimDepositHistoriesByDate = (
  start: string,
  end: string,
): {
  stakingDepositHistories: ResponseClaimHistory
  fetchStakingDepositHistories: () => void
} => {
  const [stakingDepositHistories, setStakingDepositHistories] = useState<ResponseClaimHistory>({
    dataDeposit: undefined,
  })

  const fetchStakingDepositHistories = useCallback(async () => {
    if (start) {
      const result = await graphStakingClaimDepositHistoriesByDate(start, end)
      setStakingDepositHistories({
        dataDeposit: result || null,
      })
    }
  }, [end, start])

  useEffect(() => {
    fetchStakingDepositHistories()
  }, [fetchStakingDepositHistories])

  return { stakingDepositHistories, fetchStakingDepositHistories }
}
