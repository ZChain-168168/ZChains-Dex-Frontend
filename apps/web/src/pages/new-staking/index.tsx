import { CHAIN_IDS } from 'utils/wagmi'
import Staking from '../../views/Staking'
import { ChainId } from '@pancakeswap/sdk'

const StakingPage = () => <Staking />

StakingPage.Chains = [ChainId.BSC_TESTNET]

export default StakingPage
