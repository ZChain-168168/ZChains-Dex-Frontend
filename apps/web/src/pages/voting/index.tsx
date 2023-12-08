import { ChainId } from "@pancakeswap/sdk"
import Voting from '../../views/Voting'

const VotingPage = () => <Voting />

VotingPage.chains = [ChainId.BSC, ChainId.GOERLI]

export default VotingPage
