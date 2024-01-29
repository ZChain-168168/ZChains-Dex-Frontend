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
import { useClaimPool } from 'state/staking/fetchPoolList'

const WStakingList = styled.div`
  width: 100%;
`

const StakingList: React.FC = () => {
  const router = useRouter()
  const id = router.query.id
  const { account } = useActiveWeb3React()
  const [modalStaking, setModalStaking] = useState({ open: false, dataModal: null })
  const { stakingList, fetchStakingList } = useStakingListData(Number(id) || 0)
  const { pool } = useClaimPool(id?.toString() || '0')

  const { projectFee } = useContractStakingConditions()
  const { stakingHistory } = useStakingHistory(account)
  // const { opvEarned } = useStakingEarn(account, stakingList, stakingHistory)
  const { opvEarned } = useStakingTotalEarnedContract(account, stakingHistory)

  const handleStaking = (packageItem) => {
    setModalStaking({ open: true, dataModal: packageItem })
  }

  const handleStakingSuccess = useCallback(() => {
    setModalStaking({ open: false, dataModal: null })
    fetchStakingList()
  }, [fetchStakingList])

  return (
    <WStakingList>
      <HeaderStakingList opvEarned={opvEarned} pool={pool?.data} />
      <PackageStakingList pool={pool?.data} stakingList={stakingList} onStaking={handleStaking} />
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
