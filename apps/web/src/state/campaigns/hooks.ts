import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import BigNumber from 'bignumber.js'
import moment from 'moment'
import { useContractCampaigns } from 'hooks/useContract'
import { AppState, useAppDispatch } from 'state'
import { useFastRefreshEffect } from 'hooks/useRefreshEffect'
import { campaignsSelector } from './selectors'
import { fetchCampaignsPublicDataAsync } from '.'
import { CampaignItem, CAMPAIGN_STATUS, CAMPAIGN_TYPE } from './types'

export const usePollCoreCampaignsData = () => {
  const dispatch = useAppDispatch()

  useFastRefreshEffect(() => {
    dispatch(fetchCampaignsPublicDataAsync())
  }, [dispatch])
}

export const getDefaultCampaign = (campaigns: CampaignItem[] = []): CampaignItem[] => {
  const defaultCampaign = [
    {
      id: 'INTRO_BUY_NFT',
      currentPool: 2.51,
      start: 1671037200000,
      finish: 1672419600000,
      totalPool: 100000,
      duration: 7776000000,
      status: CAMPAIGN_STATUS.LIVE,
      loading: false,
      type: CAMPAIGN_TYPE.INTRO_BUY_NFT,
      position: 1,
    },
    {
      id: 'REFERRAL_TO_EARN',
      currentPool: 2.51,
      totalPool: 100000,
      duration: 7776000000,
      status: CAMPAIGN_STATUS.LIVE,
      loading: false,
      type: CAMPAIGN_TYPE.REFERRAL_TO_EARN,
      position: 2,
    },
  ]
  const newCampaign = []
  const currentTimestamp = new Date().getTime()
  for (let i = 0; i < defaultCampaign.length; i++) {
    const item = defaultCampaign[i]

    let { status } = item
    // check status coming, live, end
    if (item.start && item.finish) {
      if (currentTimestamp > item.finish) {
        status = CAMPAIGN_STATUS.END
      } else if (currentTimestamp > item.start && currentTimestamp < item.finish) {
        status = CAMPAIGN_STATUS.LIVE
      }
    }

    newCampaign.push({
      ...item,
      status,
    })
  }
  const mapCampaignWithDefault = [...newCampaign, ...campaigns]
  return mapCampaignWithDefault
}

export const useDefaultCampaigns = () => {
  return useMemo(() => getDefaultCampaign([]), [])
}

export const useCampaigns = () => {
  return useSelector(useMemo(() => campaignsSelector(), []))
}

export const useCampaignsWithDefault = () => {
  const campaigns = useSelector(useMemo(() => campaignsSelector(), []))
  return useMemo(() => {
    const data = getDefaultCampaign(campaigns?.data || [])
    return { data }
  }, [campaigns])
}

export const useCampaignItem = (campaignId?: string | number): CampaignItem | undefined => {
  const campaigns = useSelector((state: AppState) => state.campaigns.data)
  return useMemo(() => {
    return campaigns?.find((campaign) => campaign.id === +campaignId)
  }, [campaignId, campaigns])
}

export const useCheckIsNftClaimed = (
  campaignId?: string | number,
  tokenId?: string | number,
): {
  isClaimed?: boolean
  fetchClaimTime: () => void
} => {
  const [isClaimed, setClaimTime] = useState(true)
  const contractCampaign = useContractCampaigns()
  const fetchClaimTime = useCallback(async () => {
    if (contractCampaign && campaignId && tokenId) {
      const lastTimeClaim = await (await contractCampaign.claimTimeByCampaigns(campaignId, tokenId)).toNumber()
      const currentTime = new Date(moment(new Date()).format('YYYY/MM/DD')).getTime()
      if (lastTimeClaim * 1000 >= currentTime) {
        setClaimTime(true)
      } else {
        setClaimTime(false)
      }
    }
  }, [campaignId, contractCampaign, tokenId])

  useEffect(() => {
    fetchClaimTime()
  }, [fetchClaimTime])
  return { isClaimed, fetchClaimTime }
}

export const useAvailableClaim = (
  campaignId?: string | number,
  tokenId?: string | number,
): {
  availableClaim?: number
  fetchAvailableClaim: () => void
} => {
  const [availableClaim, setAvailableClaim] = useState<number | undefined>()
  const contractCampaign = useContractCampaigns()

  const fetchAvailableClaim = useCallback(async () => {
    if (contractCampaign && campaignId && tokenId) {
      const result = await contractCampaign.calculateReward(tokenId, campaignId)
      setAvailableClaim(new BigNumber(result.totalAmount.toString()).shiftedBy(-18).toNumber())
    }
  }, [campaignId, contractCampaign, tokenId])

  useEffect(() => {
    fetchAvailableClaim()
  }, [fetchAvailableClaim])

  return { availableClaim, fetchAvailableClaim }
}
