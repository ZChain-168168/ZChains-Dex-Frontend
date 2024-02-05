import styled from 'styled-components'
import { Table } from 'antd'
import CurrencyFormat from 'react-currency-format'
import { useTranslation } from '@pancakeswap/localization'
import { Button, Flex, Skeleton, useMatchBreakpoints } from '@pancakeswap/uikit'
import { StakingItemType } from 'state/staking/types'
import { isNumber, roundNumber } from 'helpers'
import BigNumber from 'bignumber.js'
import MobileListContainer from 'components/MobileListContainer'
import ConnectWalletButton from 'components/ConnectWalletButton'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import StakingListItemMobile from './StakingListItemMobile'
import { useGetOwnerStaking, useGetWhiteListAddress } from 'state/admin/hook'
import { useEffect, useState } from 'react'

const WPackageStakingList = styled.div`
  width: 100%;
  padding: 0px 12px;
  background: #eefbff;
  border-radius: 12px;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 16px 24px;
  }
  .ant-table {
    background: transparent;

    .ant-table-thead
      > tr
      > th:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not(
        [colspan]
      )::before {
      display: none;
    }

    .ant-table-thead {
      .ant-table-cell {
        font-size: 13px;
        font-weight: bold;
        padding: 12px 6px;
        background: transparent;
        border-bottom: 1px solid #292929;
        ${({ theme }) => theme.mediaQueries.sm} {
          font-size: 16px;
          padding: 12px;
        }
        &:first-child {
          padding-left: 0;
        }
      }
    }

    .ant-table-tbody {
      .ant-table-cell {
        font-size: 13px;
        font-weight: 600;
        padding: 12px 6px;
        background: transparent;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        ${({ theme }) => theme.mediaQueries.sm} {
          font-size: 16px;
          padding: 12px;
        }
        &:first-child {
          padding-left: 0;
        }
      }

      .staking-item-token {
      }
      .staking-item-apr {
        color: #008d0e;
      }
      .staking-item-duration {
        padding: 6px 20px;
        background: #edf0f3;
        border-radius: 8px;
      }
    }

    ///////
    .staking-item-amount {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`

interface Props {
  stakingList: StakingItemType[] | undefined | null
  onStaking: (p: any) => void
  pool: any
  onUpdate: (p: any) => void
}
const PackageStakingList: React.FC<Props> = ({ stakingList, onStaking, pool, onUpdate }) => {
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()
  const { account } = useActiveWeb3React()
  const { isWhitelistAddress } = useGetWhiteListAddress(account)

  const [isOwner, setIsOwner] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setIsOwner(isWhitelistAddress)
    setLoading(false)
  }, [account, isWhitelistAddress])

  const columns = [
    {
      title: t('Token'),
      dataIndex: 'title',
      render: () => {
        return <div className="staking-item-token">{pool?.stakeAddress?.name}</div>
      },
    },
    {
      title: t('Symbol'),
      dataIndex: 'rewardPerSecond',
      render: (text) => {
        return <div className="staking-item-token">{pool?.stakeAddress?.symbol}</div>
      },
    },
    {
      title: <div style={{ textAlign: 'center' }}>{t('Daily reward')}</div>,
      dataIndex: 'rewardPerSecond',
      render: (text, record) => {
        return (
          <div className="staking-item-token" style={{ textAlign: 'center' }}>
            {roundNumber((record?.rewardPerSecond * 3600 * 24) / 10 ** Number(record?.pool?.rewardAddress?.decimals), {
              scale: 9,
              scaleSmall: 9,
            }).toFixed(9)}{' '}
            {record?.pool?.rewardAddress?.symbol}
          </div>
        )
      },
    },
    {
      title: <div style={{ textAlign: 'center' }}>{t('Duration (days)')}</div>,
      dataIndex: 'day',
      render: (text) => {
        return (
          <div className="staking-item-duration" style={{ textAlign: 'center' }}>
            {text}
          </div>
        )
      },
    },
    {
      title: <div style={{ textAlign: 'center' }}>{t('Total Pools Staked')}</div>,
      dataIndex: 'totalStaked',
      render: (text) => {
        return (
          <div className="staking-item-amount" style={{ textAlign: 'center' }}>
            {isNumber(text) ? (
              <CurrencyFormat
                value={roundNumber(new BigNumber(text).shiftedBy(-18).toNumber())}
                displayType="text"
                thousandSeparator
                suffix={` ${pool?.stakeAddress?.symbol}` || ` CREDIT`}
                renderText={(txt) => txt}
              />
            ) : (
              <Skeleton height="14px" width="80px" />
            )}
          </div>
        )
      },
    },
    {
      title: '',
      dataIndex: 'actions',
      render: (_, record) => {
        return (
          <Flex justifyContent="flex-end">
            {account ? (
              <Button scale="sm" minWidth={[, '120px']} onClick={() => onStaking(record)}>
                Stake
              </Button>
            ) : (
              <ConnectWalletButton scale="sm" />
            )}
          </Flex>
        )
      },
    },
    {
      ...(isOwner && {
        title: '',
        dataIndex: 'actions',
        render: (_, record) => {
          return (
            <Flex justifyContent="center">
              {account ? (
                <Button scale="sm" minWidth={[, '80px']} onClick={() => onUpdate(record)}>
                  Update
                </Button>
              ) : (
                <ConnectWalletButton scale="sm" />
              )}
            </Flex>
          )
        },
      }),
    },
  ]

  return (
    <WPackageStakingList>
      {isMobile ? (
        <MobileListContainer
          total={pool?.terms?.length}
          dataSource={pool?.terms || []}
          renderItem={(item) => (
            <StakingListItemMobile pool={pool} stakingItem={item} onStake={onStaking} onUpdate={onUpdate} />
          )}
        />
      ) : (
        <Table
          columns={columns}
          scroll={{ x: 400 }}
          rowKey={(record) => record?.planId}
          dataSource={pool?.terms || []}
          pagination={false}
        />
      )}
    </WPackageStakingList>
  )
}

export default PackageStakingList
