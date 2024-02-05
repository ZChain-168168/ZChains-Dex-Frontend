import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from '@pancakeswap/localization'
import { STAKING_STATUS, StakingHistory } from 'state/staking/types'
import { formatDate, roundNumber } from 'helpers'
import Amount from './DataItems/Amount'
import Period from './DataItems/Period'
import StakingStatus from './DataItems/StakingStatus'
import Action from './DataItems/Action'
import { Button } from '@pancakeswap/uikit'

const WStakingHistoryItemMobile = styled.div`
  .market-price-item-content {
    width: 100%;
    padding: 0 0 16px;
    background: #eefbff;
    border-bottom: 0.5px solid rgb(91, 101, 143, 0.3);

    .history-item-line {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
      ${({ theme }) => theme.mediaQueries.sm} {
        margin-bottom: 16px;
      }
      &.table-history-amount {
        p {
          &[data-amount='deposit'] {
            font-weight: 700;
            color: green;
          }
          &[data-amount='withdraw'] {
            font-weight: 700;
            color: red;
          }
        }
      }
      &.table-history-status {
        p {
          &:last-child {
            &[data-status='Completed'] {
              background: #008d0e;
            }
            &[data-status='Pending'] {
              background: #ebc500;
            }
            color: #ffffff;
            font-weight: 700;
            font-size: 16px;
            line-height: 140%;
            border-radius: 4px;
            width: 103px;
            height: 30px;
            text-align: center;
            padding: 4px 8px;
          }
        }
      }
      &:last-child {
        margin-bottom: 0;
      }
      & > p {
        &:first-child {
          font-size: 13px;
          font-weight: 700;
          margin-bottom: 0;
        }
        &:last-child {
          font-size: 13px;
          margin-bottom: 0;
        }
      }
    }
  }
`

const StakingHistoryItemMobile: React.FC<{
  index: number
  stakingHistoryItem: any
  onClaim: (p: any, cb: () => void) => void
  onWithdraw: (p: any, cb: () => void) => void
}> = ({ index, stakingHistoryItem, onClaim, onWithdraw }) => {
  const { t } = useTranslation()

  const [time, setTime] = useState(Date.now())

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])
  const endTime = stakingHistoryItem.finish < time / 1000 ? stakingHistoryItem.finish : time / 1000
  const startTime =
    stakingHistoryItem.staking?.withDraw?.length > 0
      ? stakingHistoryItem?.staking?.withDraw[stakingHistoryItem?.staking?.withDraw?.length - 1]
      : stakingHistoryItem?.start

  const diffTime = (endTime - startTime);
  const estReward = diffTime * stakingHistoryItem?.rewardPerSecond  * stakingHistoryItem?.amount / 10 ** stakingHistoryItem?.staking?.pool?.rewardAddress?.decimals
  return (
    <WStakingHistoryItemMobile>
      <div className="market-price-item-content">
        <div className="history-item-line">
          <p>#</p>
          <p>{index}</p>
        </div>
        {/*  */}
        <div className="history-item-line">
          <p>{t('Stake Amount')}</p>
          <Amount
            suffix={` ${stakingHistoryItem?.staking?.pool?.stakeAddress?.symbol}`}
            value={stakingHistoryItem.amount / 1e18}
          />
        </div>

        <div className="history-item-line">
          <p>{t('Est Reward')}</p>
          <Amount
            suffix={` ${stakingHistoryItem?.staking?.pool?.rewardAddress?.symbol}`}
            // value={diffTime }
            value={estReward}
          // value={roundNumber(
          //   (stakingHistoryItem?.rewardPerSecond * stakingHistoryItem?.amount * (endTime - startTime)) /
          //     10 ** stakingHistoryItem?.staking?.pool?.rewardAddress?.decimals,
          //   { scale: 9 },
          // )}
          />
        </div>
        {/*  */}
        <div className="history-item-line">
          <p>{t('Fee')}</p>
          <p>{stakingHistoryItem.fee}</p>
        </div>

        {/*  */}
        <div className="history-item-line">
          <p>{t('Period')}</p>
          <p>
            <Period start={stakingHistoryItem.start * 1000} end={stakingHistoryItem.finish * 1000} />
          </p>
        </div>

        {/*  */}
        <div className="history-item-line">
          <p>{t('Status')}</p>
          <p>
            <StakingStatus
              isUnStake={stakingHistoryItem?.staking?.unstake.length !== 0}
              poolStatus={stakingHistoryItem?.finish > Date.now() / 1000 ? STAKING_STATUS.LIVE : STAKING_STATUS.END}
              onClaim={() => {
                if (onClaim) {
                  onClaim(stakingHistoryItem, () => null)
                }
              }}
            />
          </p>
        </div>

        {/*  */}
        <div className="history-item-line">
          <p>{t('Start')}</p>
          <p>{formatDate(stakingHistoryItem.start * 1000)}</p>
        </div>

        {/*  */}
        <div className="history-item-line">
          <p>{t('Finish')}</p>
          <p>{formatDate(stakingHistoryItem.finish * 1000)}</p>
        </div>

        {/*  */}
        <div className="history-item-line">
          <p>{t('Action')}</p>
          <div style={{ textAlign: 'center' }}>
            {stakingHistoryItem.finish < Date.now() / 1000 && stakingHistoryItem.staking.unstake.length === 0 ? (
              <Button
                scale="sm"
                width={105}
                onClick={() => {
                  if (onClaim) {
                    onClaim(stakingHistoryItem, () => null)
                  }
                }}
              >
                {t('Unstake')}
              </Button>
            ) : (
              <Action
                stakingHistory={stakingHistoryItem}
                onWithdraw={(cb) => {
                  onWithdraw(stakingHistoryItem, cb)
                }}
              />
            )}
          </div>
        </div>
      </div>
    </WStakingHistoryItemMobile>
  )
}

export default StakingHistoryItemMobile
