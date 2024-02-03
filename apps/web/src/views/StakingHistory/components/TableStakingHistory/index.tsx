import { use, useState } from 'react'
import { useMatchBreakpoints, useModal } from '@pancakeswap/uikit'
import styled from 'styled-components'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import MobileListContainer from 'components/MobileListContainer'
import { useStakingHistory } from 'state/staking/fetchStakingHistory'
import StakingHistoryItemMobile from './StakingHistoryItemMobile'
import TableStakingHistoryDesktop from './TableStakingHistoryDesktop'
import ModalDetailUnstake from '../ModalDetailUnstake'
import ModalStakingWithdraw from '../ModalStakingWithdraw'
import { useRouter } from 'next/router'

const WTableStakingHistory = styled.div`
  width: 100%;
  padding: 12px;
  background: #eefbff;
  border-radius: 12px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 16px 24px;
  }
`

const TableStakingHistory = () => {
  const { account } = useActiveWeb3React()
  const { isMobile } = useMatchBreakpoints()
  const router = useRouter()
  const { stakeAddress, rewardAddress } = router.query

  const [paramsStakingHistory, setPramsStakingHistory] = useState({
    page: 1,
    pageSize: 10,
  })
  const { stakingHistory } = useStakingHistory(account, paramsStakingHistory.pageSize, paramsStakingHistory.page)
  const dataStakingHistoryMobile = stakingHistory
    ? stakingHistory.slice(
        paramsStakingHistory.page * paramsStakingHistory.pageSize - paramsStakingHistory.pageSize,
        paramsStakingHistory.page * paramsStakingHistory.pageSize,
      )
    : []

  const handleLoadMore = () => {
    setPramsStakingHistory((prev) => ({
      ...prev,
      pageSize: prev.pageSize + 10,
    }))
  }

  const [onPresentModalStaking] = useModal(<ModalDetailUnstake title="Stake Detail" />)
  const [onPresentModalWithdraw] = useModal(<ModalStakingWithdraw title="Stake Detail" />)

  return (
    <WTableStakingHistory>
      {isMobile ? (
        <MobileListContainer
          total={dataStakingHistoryMobile.length}
          dataSource={dataStakingHistoryMobile}
          renderItem={(item, index) => (
            <StakingHistoryItemMobile
              index={index + 1}
              stakingHistoryItem={item}
              onClaim={onPresentModalStaking}
              onWithdraw={onPresentModalWithdraw}
            />
          )}
          handleLoadMore={handleLoadMore}
        />
      ) : (
        <TableStakingHistoryDesktop
          dataSource={stakingHistory}
          paramsStakingHistory={paramsStakingHistory}
          setPramsStakingHistory={setPramsStakingHistory}
          onClaim={onPresentModalStaking}
          onWithdraw={onPresentModalWithdraw}
        />
      )}
    </WTableStakingHistory>
  )
}

export default TableStakingHistory
