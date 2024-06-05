import { useState, useEffect, useCallback } from 'react'
import { AppState, useAppDispatch } from 'state'
import { useSelector } from 'react-redux'
import { stringify } from 'querystring'
import { gql } from 'graphql-request'
import { MORALIS_APP_API, MORALIS_APP_API_KEY } from 'config/constants/moralis'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { DEFAULT_CHAIN_ID, NFT_ADDRESS } from 'config'
import { setNftsList } from './actions'
import { MyNftItem, NftResponse } from './types'
import { infoClientZCD } from '../../utils/graphql'

export const useSelectorMyNftsList = (): NftResponse | null | undefined => {
  return useSelector((state: AppState) => state.nfts.list)
}

export const useMyNftsList = ({ limit, account }: { limit?: number; account?: string }) => {
  const dispatch = useAppDispatch()
  const [paramsNftsList, setParamsNftsList] = useState({
    limit: limit || 9,
    pageSize: 9,
    chain: 'bsc testnet',
    format: 'decimal',
    token_addresses: NFT_ADDRESS,
  })

  const fetchMyNftsList = useCallback(() => {
    if (account) {
      try {
        fetch(`${MORALIS_APP_API}/${account}/nft?${stringify(paramsNftsList)}`, {
          method: 'GET',
          headers: {
            'x-api-key': MORALIS_APP_API_KEY,
          },
        })
          .then((res) => res.json())
          .then((result: any) => {
            if (result?.result?.length >= 0) {
              dispatch(setNftsList({ list: result }))
            } else {
              dispatch(setNftsList({ list: null }))
            }
          })
      } catch (error) {
        dispatch(setNftsList({ list: null }))
      }
    }
  }, [dispatch, account, paramsNftsList])

  useEffect(() => {
    fetchMyNftsList()
  }, [fetchMyNftsList])

  return {
    paramsNftsList,
    setParamsNftsList,
    data: useSelectorMyNftsList(),
    fetchMyNftsList,
  }
}

// fetch nft list use graphql for fetch data
const fetchOpvNftsList = async (total: number, address: string, rareName?: string) => {
  const whereString = rareName ? `owner: $address, rareName: $rareName` : `owner: $address`
  try {
    const query = gql`
      query opvNftsList($address: Bytes!, $total: Int!, $rareName: String!) {
        opvNfts(first: $total where: { ${whereString} } orderBy: tokenId orderDirection: desc) {  
          id
          owner
          rareId
          rareName
          tokenUri
          tokenId
        }
      } 
    `
    const data = await infoClientZCD.request(query, { address, total, rareName })
    return data
  } catch (error) {
    console.error('Failed to fetch my nfts list', error)
    return null
  }
}

interface ResponseNftsList {
  total: number
  pageSize: number
  account: string
  rareName: string
  data: MyNftItem[] | undefined | null
}
export const useGraphMyNftsList = (
  account?: string,
): {
  myNftsList: ResponseNftsList
  fetchMyNftsList: () => void
  setParamsNftsList: (p: any) => void
} => {
  const [paramsNftsList, setParamsNftsList] = useState({
    total: 9,
    pageSize: 9,
    account: '',
    rareName: '',
  })
  const [myNftsList, setMyNftsList] = useState<ResponseNftsList>({
    ...paramsNftsList,
    data: undefined,
  })

  const fetchMyNftsList = useCallback(async () => {
    if (paramsNftsList.account) {
      const result = await fetchOpvNftsList(paramsNftsList.total, paramsNftsList.account, paramsNftsList.rareName)
      setMyNftsList({
        ...paramsNftsList,
        data: result?.opvNfts || null,
      })
    }
  }, [paramsNftsList])

  useEffect(() => {
    if (account) {
      setParamsNftsList((prev) => ({ ...prev, account }))
    }
  }, [account])
  useEffect(() => {
    fetchMyNftsList()
  }, [fetchMyNftsList])

  return { myNftsList, fetchMyNftsList, setParamsNftsList }
}

// fetch nft detail graphql
const fetchOpvNftDetail = async (tokenId?: string) => {
  const whereString = tokenId ? `tokenId: ${tokenId}` : ``
  try {
    const query = gql`
      query opvNft {
        opvNfts(where: { ${whereString} }) {  
          id
          owner
          rareId
          rareName
          tokenUri
          tokenId
        }
      } 
    `
    const data = await infoClientZCD.request(query)
    return data
  } catch (error) {
    console.error('Failed to fetch my nfts list', error)
    return null
  }
}
export const useOpvNftDetail = (
  tokenId?: string,
): {
  myNftDetail: MyNftItem | undefined | null
  fetchMyNftDetail: () => void
} => {
  const [myNftDetail, setMyNftDetail] = useState<MyNftItem | undefined | null>()

  const fetchMyNftDetail = useCallback(async () => {
    if (tokenId) {
      const result = await fetchOpvNftDetail(tokenId)
      setMyNftDetail(result?.opvNfts?.length > 0 ? result?.opvNfts[0] : null)
    }
  }, [tokenId])

  useEffect(() => {
    fetchMyNftDetail()
  }, [fetchMyNftDetail])

  return { myNftDetail, fetchMyNftDetail }
}
