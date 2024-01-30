import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { useTranslation } from '@pancakeswap/localization'
import { StakingItemType } from 'state/staking/types'
import { isNumber, roundNumber } from 'helpers'
import CurrencyFormat from 'react-currency-format'
import { Box, Button, Skeleton, Text } from '@pancakeswap/uikit'

const WStakingListItemMobile = styled.div`
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

const PoolListItemMobile: React.FC<{
  index?: number
  stakingItem: StakingItemType
  onStake: (p: any) => void
}> = ({ stakingItem, onStake }) => {
  const { t } = useTranslation()
  return (
    <WStakingListItemMobile>
      <div className="market-price-item-content">
        <div className="history-item-line">
          <p>Token</p>
          <Text bold fontSize="13px">
            OPV
          </Text>
        </div>
        {/*  */}
        <div className="history-item-line">
          <p>{t('Est.APR')}</p>
          <Text color="#008D0E" bold fontSize="13px">
            {stakingItem?.apr}
          </Text>
        </div>
        {/*  */}
        <div className="history-item-line">
          <p>{t('Duration (days)')}</p>

          <Box background="#EDF0F3" p="5px 10px" borderRadius="10px" minWidth="100px">
            <Text color="#000" bold fontSize="13px" textAlign="center">
              {stakingItem?.time}
            </Text>
          </Box>
        </div>

        {/*  */}
        <div className="history-item-line">
          <p>{t('Total Pools Staked')}</p>
          <Text bold fontSize="13px">
            {isNumber(stakingItem?.totalStakedAmount) ? (
              <CurrencyFormat
                value={roundNumber(new BigNumber(stakingItem.totalStakedAmount).shiftedBy(-18).toNumber())}
                displayType="text"
                thousandSeparator
                suffix={` OPV`}
                renderText={(txt) => txt}
              />
            ) : (
              <Skeleton height="14px" width="80px" />
            )}
          </Text>
        </div>

        {/*  */}
        <div className="history-item-line">
          <p />
          <Button scale="sm" minWidth={['120px']} onClick={() => onStake(stakingItem)}>
            Stake
          </Button>
        </div>
      </div>
    </WStakingListItemMobile>
  )
}

export default PoolListItemMobile
