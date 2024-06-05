import { useCallback, useEffect, useState } from 'react'
import { gql } from 'graphql-request'
import { infoClientZCD } from 'utils/graphql'
import { ClaimHistoryItemType } from './types'

// fetch nft detail graphql
const graphNftClaimHistory = async (total: number, tokenId?: string) => {
  try {
    const query = gql`
      query nftClaimHistory($total: Int!) {
        claims(first: $total, where: { tokenId: ${tokenId} }) {
          amount
          id
          transactionHash
          userAddress
          tokenId
        }
      }
    `
    const data = await infoClientZCD.request(query, { total })
    return data
  } catch (error) {
    console.error('Failed graphNftClaimHistory', error)
    return null
  }
}

interface ResponseClaimHistory {
  total: number
  pageSize: number
  tokenId: string
  data: ClaimHistoryItemType[] | undefined | null
}

export const useNftClaimHistory = (
  tokenId?: string,
): {
  nftClaimHistory: ResponseClaimHistory
  fetchNftClaimHistory: () => void
  setParamsNftClaimHistory: (p: any) => void
} => {
  const [paramsNftClaimHistory, setParamsNftClaimHistory] = useState({
    total: 10,
    pageSize: 10,
    tokenId,
  })

  const [nftClaimHistory, setNftClaimHistory] = useState<ResponseClaimHistory>({
    ...paramsNftClaimHistory,
    data: undefined,
  })

  const fetchNftClaimHistory = useCallback(async () => {
    if (paramsNftClaimHistory.tokenId) {
      const result = await graphNftClaimHistory(paramsNftClaimHistory.total, paramsNftClaimHistory.tokenId)
      setNftClaimHistory({
        ...paramsNftClaimHistory,
        data: result?.claims || null,
      })
    }
  }, [paramsNftClaimHistory])

  useEffect(() => {
    if (tokenId) {
      setParamsNftClaimHistory((prev) => ({ ...prev, tokenId }))
    }
  }, [tokenId])
  useEffect(() => {
    fetchNftClaimHistory()
  }, [fetchNftClaimHistory])

  return { nftClaimHistory, fetchNftClaimHistory, setParamsNftClaimHistory }
}

// fetch Campaigns detail graphql
const graphCampaignsClaimHistory = async (
  total: number,
  campaignId?: string,
  createdTimeFrom?: string,
  createdTimeTo?: string,
) => {
  const currentTimeHours = new Date().getHours()
  const currentTimeMinute = new Date().getMinutes()
  const currentTimeSecond = new Date().getSeconds()
  const currentTime = currentTimeHours * 60 * 60 + currentTimeMinute * 60 + currentTimeSecond

  try {
    const query = !createdTimeFrom
      ? gql`
      query campaignsClaimHistory($total: Int!) {
        claims(first: $total, where: { campaignId: ${campaignId} }) {
          campaignId
          createdTime
          id
          tokenId
          totalDays
          transactionHash
          userAddress
          amount
        }
      }
    `
      : gql`
    query campaignsClaimHistory {
      claims(first: $total,where: {campaignId: ${campaignId}, createdTime_gte: "${
          Number(createdTimeFrom) - currentTime
        }", createdTime_lte: "${Number(createdTimeTo) + currentTime}"}) {
        campaignId
        createdTime
        id
        tokenId
        totalDays
        transactionHash
        userAddress
        amount
      }
    }
  `
    const data = await infoClientZCD.request(query, { total })
    return data
  } catch (error) {
    console.error('Failed graphCampaignsClaimHistory', error)
    return null
  }
}

// Campaigns
interface ResponseCampaignsClaimHistory {
  total: number
  pageSize: number
  campaignId: string
  data: ClaimHistoryItemType[] | undefined | null
}

export const useCampaignsClaimHistory = (
  campaignId?: string,
  createdTimeFrom?: string,
  createdTimeTo?: string,
): {
  campaignsClaimHistory: ResponseCampaignsClaimHistory
  fetchCampaignsClaimHistory: () => void
  setParamsCampaignsClaimHistory: (p: any) => void
} => {
  const [paramsCampaignsClaimHistory, setParamsCampaignsClaimHistory] = useState({
    total: 10,
    pageSize: 10,
    campaignId,
  })

  const [campaignsClaimHistory, setCampaignsClaimHistory] = useState<ResponseCampaignsClaimHistory>({
    ...paramsCampaignsClaimHistory,
    data: undefined,
  })

  const fetchCampaignsClaimHistory = useCallback(async () => {
    if (paramsCampaignsClaimHistory.campaignId) {
      const result = await graphCampaignsClaimHistory(
        paramsCampaignsClaimHistory.total,
        paramsCampaignsClaimHistory.campaignId,
        createdTimeFrom,
        createdTimeTo,
      )
      setCampaignsClaimHistory({
        ...paramsCampaignsClaimHistory,
        data: result?.claims || null,
      })
    }
  }, [createdTimeFrom, createdTimeTo, paramsCampaignsClaimHistory])

  useEffect(() => {
    if (campaignId) {
      setParamsCampaignsClaimHistory((prev) => ({ ...prev, campaignId }))
    }
  }, [campaignId])
  useEffect(() => {
    fetchCampaignsClaimHistory()
  }, [fetchCampaignsClaimHistory])

  return { campaignsClaimHistory, fetchCampaignsClaimHistory, setParamsCampaignsClaimHistory }
}
