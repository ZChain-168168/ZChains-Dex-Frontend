import { useCallback, useEffect, useState } from 'react'
import { gql } from 'graphql-request'
import { infoClientCREDIT } from 'utils/graphql'
import { StakingPools } from './types'

// fetch nft detail graphql
const graphStakingClaimPools = async () => {
  try {
    const query = gql`
      query stakingClaimPools {
        stakePools {
          id
          lpAddress
          lpTokenName
          rewardAddress
          rewardTokenName
        }
      }
    `
    const data = await infoClientCREDIT.request(query)
    return data
  } catch (error) {
    console.error('Failed staking Claim Pools', error)
    return null
  }
}

interface ResponseClaimPool {
  data: StakingPools[] | undefined | null
}

export const useClaimPools = (): {
  poolLists: ResponseClaimPool
  fetchPoolList: () => void
} => {
  const [poolLists, setPoolLists] = useState<ResponseClaimPool>({
    data: undefined,
  })

  const fetchPoolList = useCallback(async () => {
    const result = await graphStakingClaimPools()
    setPoolLists({
      data: result?.stakePools || null,
    })
  }, [])

  useEffect(() => {
    fetchPoolList()
  }, [fetchPoolList])

  return { poolLists, fetchPoolList }
}
