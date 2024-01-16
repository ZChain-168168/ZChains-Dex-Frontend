import { useState, useEffect } from 'react'
import BigNumber from 'bignumber.js'
import { useContractCampaigns } from 'hooks/useContract'
import { CampaignItem, CAMPAIGN_STATUS } from './types'

export const useCampaignItem = (campaignId): CampaignItem | undefined => {
  const [data, setData] = useState<CampaignItem | undefined>(undefined)

  const contracts = useContractCampaigns()

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;(async () => {
      if (contracts && campaignId) {
        let campaignItem
        try {
          const result = await contracts.campaigns(campaignId)
          const totalPool = new BigNumber(result.totalPool.toString()).shiftedBy(-18).toNumber()
          const start = result.start.toNumber() * 1000
          const finish = result.finish.toNumber() * 1000

          const currentTimestamp = new Date().getTime()

          // check status coming, live, end
          let status = CAMPAIGN_STATUS.COMING
          if (start && finish) {
            if (currentTimestamp > finish) {
              status = CAMPAIGN_STATUS.END
            } else if (currentTimestamp > start && currentTimestamp < finish) {
              status = CAMPAIGN_STATUS.LIVE
            }
          }

          campaignItem = {
            id: campaignId,
            currentPool: null,
            start,
            finish,
            totalPool,
            status,
            duration: finish - start,
            loading: false,
          }
          setData(campaignItem)
        } catch (error) {
          console.error('fetchCampaigns error', error)
        }
      }
    })()
  }, [campaignId, contracts])

  return data
}

export default useCampaignItem
