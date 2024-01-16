/* eslint-disable no-await-in-loop */
import BigNumber from 'bignumber.js'
import { BIG_ZERO } from 'utils/bigNumber'
import { getCampaignContract } from 'utils/contractHelpers'
import { CampaignItem, CAMPAIGN_STATUS } from './types'

const sleep = async (time) => new Promise((resolve) => setTimeout(resolve, time))

const fetchCampaignsLength = async (contracts) => {
  try {
    const result = await contracts.CURRENT_ID()
    return +result.toString()
  } catch (error) {
    console.error('fetchCampaignsLength Length Error: ', error)
    return BIG_ZERO.toNumber()
  }
}

const fetchCampaigns = async () => {
  const contracts = getCampaignContract()
  const campaignsLength = await fetchCampaignsLength(contracts)

  let count = 0
  const list: CampaignItem[] = []
  try {
    while (true) {
      count++
      const result = await contracts.campaigns(count)
      const currentPool = new BigNumber(result.currentPool.toString()).shiftedBy(-18).toNumber()
      const totalPool = new BigNumber(result.totalPool.toString()).shiftedBy(-18).toNumber()
      const start = result.start.toNumber() * 1000
      const finish = result.finish.toNumber() * 1000

      if (count <= campaignsLength) {
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

        const campaignItem = {
          id: count,
          currentPool,
          start,
          finish,
          totalPool,
          status,
          duration: finish - start,
          loading: false,
        }
        list.push(campaignItem)
        await sleep(200)
      } else {
        break
      }
    }
  } catch (error) {
    console.error('fetchCampaigns error', error)
  }
  return { list: list.sort((a, b) => b.start - a.start), length: campaignsLength }
}

export default fetchCampaigns
