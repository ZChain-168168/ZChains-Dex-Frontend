import { useCallback, useEffect, useState } from 'react'
import { useContractStaking, useContractCampaigns } from 'hooks/useContract'
import { useDispatch, useSelector } from 'react-redux'
import { setOwnerStaking, setOwnerContract } from './actions'
import { AppState } from '../index'

export const useGetOwnerStaking = (stakingAddress?: string) => {
  const dispatch = useDispatch()
  const contractStaking = useContractStaking(stakingAddress)

  const fetchOwnerStaking = useCallback(async () => {
    if (contractStaking) {
      const ownerStaking = await contractStaking.owner()
      dispatch(setOwnerStaking({ ownerStaking }))
    }
  }, [contractStaking, dispatch])

  useEffect(() => {
    fetchOwnerStaking()
  }, [fetchOwnerStaking])

  const { ownerStake } = useSelector((state: AppState) => state.admin)

  return { ownerStake }
}

export const useGetWhiteListAddress = (
  account: string,
): {
  isWhitelistAddress: boolean
  fetchWhiteListAddress: () => void
} => {
  const [isWhitelistAddress, setIsWhitelistAddress] = useState<boolean>(false)
  const contractStaking = useContractStaking()

  const fetchWhiteListAddress = useCallback(async () => {
    if (contractStaking) {
      const isWhitelistAddress = await contractStaking.whiteList(account)
      setIsWhitelistAddress(isWhitelistAddress)
    }
  }, [contractStaking])

  useEffect(() => {
    fetchWhiteListAddress()
  }, [fetchWhiteListAddress])

  return { isWhitelistAddress, fetchWhiteListAddress }
}

export const useGetOwnerContract = () => {
  const dispatch = useDispatch()
  const contractContract = useContractCampaigns()

  const fetchOwnerContract = useCallback(async () => {
    if (contractContract) {
      const ownerContract = await contractContract.owner()
      dispatch(setOwnerContract({ ownerContract }))
    }
  }, [contractContract, dispatch])

  useEffect(() => {
    fetchOwnerContract()
  }, [fetchOwnerContract])

  const { ownerContract } = useSelector((state: AppState) => state.admin)

  return { ownerContract }
}
