import React, { useState } from 'react'
import styled from 'styled-components'
import { STAKING_STATUS, StakingHistory } from 'state/staking/types'
import { useTranslation } from '@pancakeswap/localization'
import { Button } from '@pancakeswap/uikit'
import moment from 'moment-timezone'
import momentTimezone from 'moment-timezone'

const WAction = styled.div`
  color: black;
  font-weight: bold;

  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
`

const Action: React.FC<{
  stakingHistory: any
  onWithdraw: (cb: () => void) => void
}> = ({ stakingHistory, onWithdraw, ...props }) => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)

  const handleClaim = () => {
    onWithdraw(() => {
      setLoading(false)
    })
  }

  const tz = momentTimezone(stakingHistory.finish * 1000)
  const time = tz.tz('Asia/Ho_Chi_Minh').unix()

  const current = moment().tz('Asia/Ho_Chi_Minh').unix()

  const poolStatus = time > current ? STAKING_STATUS.LIVE : STAKING_STATUS.END
  const isLive = poolStatus === STAKING_STATUS.LIVE
  return (
    <WAction className="tokens-item-pairs" {...props}>
      {(() => {
        if (isLive) {
          return (
            <Button scale="sm" isLoading={loading} disabled={loading} onClick={handleClaim}>
              {t('Withdraw')}
            </Button>
          )
        }
        return <></>
      })()}
    </WAction>
  )
}
export default Action
