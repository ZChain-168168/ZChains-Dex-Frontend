import React from 'react'
import styled from 'styled-components'
import { STAKING_STATUS } from 'state/staking/types'
import { useTranslation } from '@pancakeswap/localization'
import { Button } from '@pancakeswap/uikit'

const WStakingStatus = styled.div`
  color: black;
  font-weight: bold;

  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
`

const StakingStatus: React.FC<{
  loading?: boolean
  isUnStake?: boolean
  poolStatus: STAKING_STATUS
  onClaim: () => void
}> = ({ loading, isUnStake, poolStatus, onClaim, ...props }) => {
  const { t } = useTranslation()
  return (
    <WStakingStatus className="tokens-item-pairs" {...props}>
      {(() => {
        if (isUnStake) {
          return t('Claimed')
        }
        if (poolStatus === STAKING_STATUS.LIVE) {
          return t('Locked')
        }
        return t('Claimable')
      })()}
    </WStakingStatus>
  )
}
export default StakingStatus
