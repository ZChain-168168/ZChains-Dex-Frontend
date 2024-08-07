import { ChainId } from '@pancakeswap/sdk'
import StakingHistory from '../../../views/StakingHistory'
import { SUPPORT_STAKING } from 'config/constants/supportChains'

const StakingHistoryPage = () => <StakingHistory />

StakingHistoryPage.Chains = [ChainId.ZCD]

export default StakingHistoryPage
