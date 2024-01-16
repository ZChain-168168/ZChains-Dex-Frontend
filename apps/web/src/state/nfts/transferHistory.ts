import { useCallback, useEffect, useState } from 'react'
import { gql } from 'graphql-request'
import { infoClientCREDIT } from 'utils/graphql'
import { NftTransferHistoryItemType } from './types'

// fetch nft detail graphql
const graphNftTransferHistory = async (total: number, tokenId?: string) => {
  //  where: { tokenId: ${tokenId} }
  try {
    const query = gql`
      query nftTransferHistory {
        transferNFTs(first: ${total}, where: { tokenId: ${tokenId} }) {
          id
          newOwner
          previousOwner
          tokenId
          transactionHash
        }
      } 
    `
    const data = await infoClientCREDIT.request(query)
    return data
  } catch (error) {
    console.error('Failed graphNftTransferHistory', error)
    return null
  }
}

interface ResponseTransferHistory {
  total: number
  pageSize: number
  tokenId: string
  data: NftTransferHistoryItemType[] | undefined | null
}
export const useNftTransferHistory = (
  tokenId?: string,
): {
  nftTransferHistory: ResponseTransferHistory
  setParamsNftTransferHistory: (p: any) => void
  fetchNftTransferHistory: () => void
} => {
  const [paramsNftClaimHistory, setParamsNftTransferHistory] = useState({
    total: 10,
    pageSize: 10,
    tokenId,
  })
  const [nftTransferHistory, setNftClaimHistory] = useState<ResponseTransferHistory>({
    ...paramsNftClaimHistory,
    data: undefined,
  })

  const fetchNftTransferHistory = useCallback(async () => {
    if (paramsNftClaimHistory.tokenId) {
      const result = await graphNftTransferHistory(paramsNftClaimHistory.total, paramsNftClaimHistory.tokenId)
      setNftClaimHistory({
        ...paramsNftClaimHistory,
        data: result?.transferNFTs || null,
      })
    }
  }, [paramsNftClaimHistory])

  useEffect(() => {
    if (tokenId) {
      setParamsNftTransferHistory((prev) => ({ ...prev, tokenId }))
    }
  }, [tokenId])
  useEffect(() => {
    fetchNftTransferHistory()
  }, [fetchNftTransferHistory])

  return { nftTransferHistory, fetchNftTransferHistory, setParamsNftTransferHistory }
}
