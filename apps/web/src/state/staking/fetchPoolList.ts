import { useCallback, useEffect, useState } from 'react'
import { gql } from 'graphql-request'
import { infoClientStaking } from 'utils/graphql'
import { StakingPools } from './types'

// fetch nft detail graphql
const graphStakingClaimPools = async () => {
  try {
    const query = gql`
      query stakingClaimPools {
        pools {
          totalStaked
          totalReward
          stakeAddress {
            symbol
            name
            id
            decimals
          }
          rewardAddress {
            symbol
            name
            id
            decimals
          }
          terms {
            totalStaked
            totalReward
            rewardPerSecond
            maxTotalStake
            id
            day
            maxTotalStake
          }
          id
        }
        terms {
          day
          id
          maxTotalStake
          rewardPerSecond
          totalReward
          totalStaked
          pool {
            id
            totalReward
            totalStaked
          }
          maxTotalStake
        }
        tokens {
          symbol
          name
          id
          decimals
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

const graphStakingClaimPool = async (id: string) => {
  try {
    const query = gql`
      query stakingClaimPool($id: ID!) {
        pool(id: $id) {
          totalStaked
          totalReward
          id
          rewardAddress {
            decimals
            id
            name
            symbol
          }
          stakeAddress {
            decimals
            id
            name
            symbol
          }
          terms(orderBy: "day", orderDirection: "desc") {
            id
            day
            rewardPerSecond
            totalStaked
            totalReward
            maxTotalStake
            pool {
              rewardAddress {
                decimals
                id
                name
                symbol
              }
              stakeAddress {
                decimals
                id
                symbol
                name
              }
              id
            }
          }
        }
      }
    `
    const data = await infoClientStaking.request(query, { id })
    return data
  } catch (error) {
    console.error('Failed staking Claim Pools', error)
    return null
  }
}

interface ResponseClaimPool {
  data: any[] | undefined | null
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
      data: result?.pools || null,
    })
  }, [])

  useEffect(() => {
    fetchPoolList()
  }, [fetchPoolList])

  return { poolLists, fetchPoolList }
}

export const useClaimPool = (
  id: string,
): {
  pool: any
  fetchPoolList: (id) => void
} => {
  const [pool, setPool] = useState<any>({
    data: undefined,
  })
  const fetchPoolList = useCallback(async (id) => {
    const result = await graphStakingClaimPool(id)
    setPool({
      data: result?.pool || null,
    })
  }, [])

  useEffect(() => {
    if (id) {
      fetchPoolList(id)
    }
  }, [fetchPoolList, id])

  return { pool, fetchPoolList }
}
