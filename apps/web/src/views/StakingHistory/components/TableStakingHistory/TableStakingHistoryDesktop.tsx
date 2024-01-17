import { useTranslation } from '@pancakeswap/localization'
import { Table } from 'antd'
import styled from 'styled-components'
import { formatDate } from 'helpers'
import { StakingHistory } from 'state/staking/types'
import Amount from './DataItems/Amount'
import StakingStatus from './DataItems/StakingStatus'
import Period from './DataItems/Period'
import Action from './DataItems/Action'

const WTableStakingHistoryDesktop = styled(Table)`
  .ant-table {
    background: transparent;

    .ant-table-thead
      > tr
      > th:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not([colspan])::before {
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
        font-size: 12px;
        font-weight: 600;
        padding: 12px 6px;
        background: transparent;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        ${({ theme }) => theme.mediaQueries.sm} {
          font-size: 14px;
          padding: 12px;
        }
        &:first-child {
          padding-left: 0;
        }
      }
    }
  }
`

interface Props {
  dataSource?: StakingHistory[]
  paramsStakingHistory: any
  setPramsStakingHistory: (p: any) => void
  onClaim?: (p: StakingHistory, cb: () => void) => void
  onWithdraw?: (p: StakingHistory, cb: () => void) => void
}
const TableStakingHistoryDesktop: React.FC<Props> = ({
  dataSource,
  paramsStakingHistory,
  setPramsStakingHistory,
  onClaim,
  onWithdraw,
}) => {
  const { t } = useTranslation()

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      render: (_, __, index) => {
        const { page, pageSize } = paramsStakingHistory
        return <div>{(page - 1) * pageSize + index + 1}</div>
      },
    },
    {
      title: <div style={{ textAlign: 'center' }}>{t('Value')}</div>,
      dataIndex: 'amount',
      render: (_, record) => {
        return (
          <div style={{ textAlign: 'center' }}>
            <Amount value={record.amount} />
          </div>
        )
      },
    },
    {
      title: <div style={{ textAlign: 'center' }}>{t('Fee')}</div>,
      dataIndex: 'fee',
      render: (_, record) => {
        return <p style={{ textAlign: 'center' }}>{record.fee}</p>
      },
    },
    {
      title: <div style={{ textAlign: 'center' }}>{t('Period')}</div>,
      dataIndex: 'period',
      render: (_, record) => {
        return (
          <div style={{ textAlign: 'center' }}>
            <Period start={record.start} end={record.finish} />
          </div>
        )
      },
    },
    {
      title: <div style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>{t('Status')}</div>,
      dataIndex: 'isUnStake',
      render: (_, record) => {
        return (
          <StakingStatus
            isUnStake={record.isUnStake}
            poolStatus={record.poolStatus}
            onClaim={() => {
              if (onClaim) {
                onClaim(record, () => null)
              }
            }}
          />
        )
      },
    },
    {
      title: <div style={{ textAlign: 'center' }}>{t('Start')}</div>,
      dataIndex: 'start',
      render: (text) => {
        return <p style={{ textAlign: 'center' }}>{formatDate(text)}</p>
      },
    },
    {
      title: <div style={{ textAlign: 'center' }}>{t('Finish')}</div>,
      dataIndex: 'finish',
      render: (text) => {
        return <p style={{ textAlign: 'center' }}>{formatDate(text)}</p>
      },
    },
    {
      title: <div style={{ textAlign: 'center' }}>{t('Action')}</div>,
      dataIndex: 'finish',
      render: (_, record) => (
        <div style={{ textAlign: 'center' }}>
          <Action
            stakingHistory={record}
            onWithdraw={(cb) => {
              onWithdraw(record, cb)
            }}
          />
        </div>
      ),
    },
  ]

  return (
    <WTableStakingHistoryDesktop
      loading={!dataSource}
      columns={columns}
      scroll={{ x: 400 }}
      rowKey={(record: any) => record.finish}
      dataSource={dataSource || []}
      pagination={{
        total: dataSource?.length,
        current: paramsStakingHistory.page,
        showTotal: (total) => `${total} Items`,
        onChange: (page, pageSize) => {
          setPramsStakingHistory((prev) => ({
            ...prev,
            page,
            pageSize,
          }))
        },
      }}
    />
  )
}

export default TableStakingHistoryDesktop
