export enum CAMPAIGN_STATUS {
  COMING,
  LIVE,
  END,
}

export enum CAMPAIGN_TYPE {
  'INTRO_BUY_NFT',
  'REFERRAL_TO_EARN',
}

export interface CampaignItem {
  id: number
  currentPool: number
  start?: number
  finish?: number
  totalPool: number
  duration: number
  status: CAMPAIGN_STATUS
  loading: boolean
  title?: string
  type?: CAMPAIGN_TYPE
  position?: number
}
