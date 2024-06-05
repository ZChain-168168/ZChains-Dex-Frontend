import { CHAIN_IDS } from 'utils/wagmi'
import { ChainId } from '@pancakeswap/sdk'
import Pools from 'views/new-pools/components'

const PoolsPage = () => <Pools />

PoolsPage.chains = [ChainId.ZCD]

export default PoolsPage
