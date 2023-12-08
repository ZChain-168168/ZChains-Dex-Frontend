import { ChainId } from "@pancakeswap/sdk"
import CreateProposal from '../../../views/Voting/CreateProposal'

const CreateProposalPage = () => <CreateProposal />

CreateProposalPage.chains = [ChainId.BSC, ChainId.GOERLI]

export default CreateProposalPage
