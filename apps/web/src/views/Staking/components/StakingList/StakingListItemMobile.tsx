import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { useTranslation } from '@pancakeswap/localization'
import { StakingItemType } from 'state/staking/types'
import { isNumber, roundNumber } from 'helpers'
import CurrencyFormat from 'react-currency-format'
import { Box, Button, Skeleton, Text } from '@pancakeswap/uikit'
import { useGetWhiteListAddress } from 'state/admin/hook'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import ConnectWalletButton from 'components/ConnectWalletButton'

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

const StakingListItemMobile: React.FC<{
  index?: number
  stakingItem: any
  onStake: (p: any) => void
  onUpdate: (p: any) => void
  pool: any
}> = ({ stakingItem, onStake, pool, onUpdate }) => {
  const { t } = useTranslation()
  const { account } = useActiveWeb3React()
  const { isWhitelistAddress } = useGetWhiteListAddress(account)

  const [isOwner, setIsOwner] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setIsOwner(isWhitelistAddress)
    setLoading(false)
  }, [account, isWhitelistAddress])
  console.log('stakingItem', stakingItem)

  return (
    <WStakingListItemMobile>
      <div className="market-price-item-content">
        <div className="history-item-line">
          <p>Token</p>
          <Text bold fontSize="13px">
            {pool?.stakeAddress?.name}
          </Text>
        </div>
        {/*  */}
        <div className="history-item-line">
          <p>{t('Symbol')}</p>
          <Text color="#008D0E" bold fontSize="13px">
            {pool?.stakeAddress?.symbol}
          </Text>
        </div>
        {/*  */}
        <div className="history-item-line">
          <p>{t('Daily reward')}</p>

          <Box background="#EDF0F3" p="5px 10px" borderRadius="10px" minWidth="100px">
            <Text color="#000" bold fontSize="13px" textAlign="center">
              {roundNumber(
                (stakingItem?.rewardPerSecond * 3600 * 24) / 10 ** stakingItem?.pool?.rewardAddress?.decimals,
                {
                  scale: 9,
                  scaleSmall: 9,
                },
              ).toFixed(9)}{' '}
              {stakingItem?.pool?.rewardAddress?.symbol}
            </Text>
          </Box>
        </div>

        {/*  */}
        <div className="history-item-line">
          <p>{t('Duration (days)')}</p>
          <Box background="#EDF0F3" p="5px 10px" borderRadius="10px" minWidth="100px">
            <Text bold fontSize="13px" textAlign="center">
              {stakingItem?.day}
            </Text>
          </Box>
        </div>

        <div className="history-item-line">
          <p>{t('Total Pools Staked')}</p>

          {isNumber(stakingItem?.totalStaked) ? (
            <Box style={{ textAlign: 'center' }} background="#EDF0F3" p="5px 10px" borderRadius="10px" minWidth="100px">
              <CurrencyFormat
                value={roundNumber(new BigNumber(stakingItem?.totalStaked).shiftedBy(-18).toNumber())}
                displayType="text"
                thousandSeparator
                suffix={` ${pool?.rewardAddress?.symbol}` || ` CREDIT`}
                renderText={(txt) => txt}
              />
            </Box>
          ) : (
            <Skeleton height="14px" width="80px" />
          )}
        </div>

        {/*  */}
        <div className="history-item-line">
          <p />
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          {account ? (
            <Button scale="sm" minWidth={[, '100px']} onClick={() => onStake(stakingItem)}>
              Stake
            </Button>
          ) : (
            <ConnectWalletButton scale="sm" />
          )}
          {isOwner && (
            <>
              {account ? (
                <Button scale="sm" minWidth={[, '80px']} onClick={() => onUpdate(stakingItem)}>
                  Update
                </Button>
              ) : (
                <ConnectWalletButton scale="sm" />
              )}
            </>
          )}
        </div>
      </div>
    </WStakingListItemMobile>
  )
}

export default StakingListItemMobile
