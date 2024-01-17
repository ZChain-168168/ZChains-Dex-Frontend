import { useCallback, useState } from 'react'
import styled from 'styled-components'
import { useStakingListData } from 'state/staking/fetchStakingList'
import { useStakingTotalEarnedContract } from 'state/staking/hooks'
import { useStakingHistory } from 'state/staking/fetchStakingHistory'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useRouter } from 'next/router'
import ModalStaking from '../ModalStaking'
import HeaderStakingList from './HeaderStakingList'
import PackageStakingList from './PackageStakingList'
import useContractStakingConditions from '../../hooks/useContractStakingConditions'

const WStakingList = styled.div`
  width: 100%;
`

const StakingList: React.FC = () => {
  const router = useRouter()
  const { account } = useActiveWeb3React()
  const [modalStaking, setModalStaking] = useState({ open: false, dataModal: null })

  const { stakingList, fetchStakingList } = useStakingListData()
  const { projectFee } = useContractStakingConditions()
  const { stakingHistory } = useStakingHistory(account)
  // const { opvEarned } = useStakingEarn(account, stakingList, stakingHistory)
  const { opvEarned } = useStakingTotalEarnedContract(account, stakingHistory)

  const handleStaking = (packageItem) => {
    // setModalStaking({ open: true, dataModal: packageItem })
    router.push('new-staking')
  }

  const handleStakingSuccess = useCallback(() => {
    setModalStaking({ open: false, dataModal: null })
    fetchStakingList()
  }, [fetchStakingList])

  return (
    <WStakingList>
      <HeaderStakingList opvEarned={opvEarned} />
      <PackageStakingList stakingList={stakingList} onStaking={handleStaking} />
      <ModalStaking
        open={modalStaking.open}
        dataModal={modalStaking.dataModal}
        projectFee={projectFee}
        setModalStaking={setModalStaking}
        onStakingSuccess={handleStakingSuccess}
      />
    </WStakingList>
  )
}

export default StakingList
