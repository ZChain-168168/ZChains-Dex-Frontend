import { useState, useEffect } from 'react'
import axios from 'axios'
import { NftMetaData } from './types'

function useNftMetaDataByUrl(url: string): NftMetaData | undefined | null {
  const [nftMetaData, setNftMetaData] = useState<NftMetaData | undefined | null>()

  useEffect(() => {
    async function fetchMetaData() {
      if (url) {
        try {
          axios.get(url).then((res) => {
            if (res.status === 200) {
              setNftMetaData(res.data)
            } else {
              setNftMetaData(null)
            }
          })
        } catch (error) {
          setNftMetaData(null)
        }
      }
    }
    fetchMetaData()
  }, [url])

  return nftMetaData
}

export default useNftMetaDataByUrl
