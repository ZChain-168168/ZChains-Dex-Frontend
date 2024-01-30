import { useTranslation } from '@pancakeswap/localization'
import { Button, Flex, Skeleton, useMatchBreakpoints } from '@pancakeswap/uikit'
import { Table } from 'antd'
import BigNumber from 'bignumber.js'
import ConnectWalletButton from 'components/ConnectWalletButton'
import MobileListContainer from 'components/MobileListContainer'
import { isNumber, roundNumber } from 'helpers'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useEffect, useState } from 'react'
import CurrencyFormat from 'react-currency-format'
import { useGetOwnerStaking } from 'state/admin/hook'
import styled from 'styled-components'
import StakingListItemMobile from './PoolListItemMobile'

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
  stakingList: any[] | undefined | null
  onStaking: (p: any) => void
  onUpdate: (p: any) => void
}
const PackagePoolList: React.FC<Props> = ({ stakingList, onStaking, onUpdate }) => {
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()
  const { account } = useActiveWeb3React()
  const { ownerStake } = useGetOwnerStaking()

  const [isOwner, setIsOwner] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (ownerStake) {
      setIsOwner(account?.toLowerCase() === ownerStake?.toLowerCase())
      setLoading(false)
    }
  }, [account, ownerStake])

  const columns = [
    {
      title: t('Token'),
      dataIndex: 'title',
      render: (_, record) => {
        return <div className="staking-item-token">{record?.stakeAddress?.name}</div>
      },
    },
    {
      title: t('Symbol'),
      dataIndex: 'apr',
      render: (text, record) => {
        return <div className="staking-item-apr">{record?.stakeAddress?.symbol}</div>
      },
    },
    {
      title: <div style={{ textAlign: 'center' }}>{t('Total reward')}</div>,
      dataIndex: 'time',
      render: (text, record) => {
        return (
          <div className="staking-item-duration" style={{ textAlign: 'center' }}>
            {record?.totalReward}
          </div>
        )
      },
    },
    {
      title: <div style={{ textAlign: 'center' }}>{t('Total Pools Staked')}</div>,
      dataIndex: 'totalStakedAmount',
      render: (text, record) => {
        return (
          <div className="staking-item-amount" style={{ textAlign: 'center' }}>
            {isNumber(record?.totalStaked) ? (
              <CurrencyFormat
                value={roundNumber(new BigNumber(record?.totalStaked).shiftedBy(-18).toNumber())}
                displayType="text"
                thousandSeparator
                suffix={` ${record?.rewardAddress?.symbol}` || ` CREDIT`}
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
      title: <div style={{ textAlign: 'center' }}>{t('Total Plans')}</div>,
      dataIndex: 'totalStakedAmount',
      render: (text, record) => {
        return (
          <div className="staking-item-duration" style={{ textAlign: 'center' }}>
            {record?.terms?.length}
          </div>
        )
      },
    },
    {
      title: '',
      render: (_, record) => {
        return (
          <Flex justifyContent="flex-end">
            {account ? (
              <Button scale="sm" minWidth={[, '100px']} onClick={() => onStaking(record)}>
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
          total={stakingList?.length}
          dataSource={stakingList || []}
          renderItem={(item) => <StakingListItemMobile stakingItem={item} onStake={onStaking} />}
        />
      ) : (
        <Table
          columns={columns}
          scroll={{ x: 400 }}
          rowKey={(record) => record.planId}
          dataSource={stakingList || []}
          pagination={false}
        />
      )}
    </WPackageStakingList>
  )
}

export default PackagePoolList
