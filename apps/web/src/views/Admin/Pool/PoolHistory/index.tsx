import { Button, Checkbox, Col, DatePicker, Form, Input, Row, Table, Space } from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'

import React, { useMemo, useState, useEffect, useRef } from 'react'

import { useRouter } from 'next/router'
import styled from 'styled-components'

import debounce from 'lodash/debounce'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'

import {
  useClaimDepositHistories,
  useClaimWithdrawHistories,
  useClaimDepositHistoriesByDate,
} from 'state/staking/fetchStakingHistory'

import { formatDate } from 'helpers'
import { formatCode } from 'helpers/CommonHelper'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { getBlockExploreLink } from 'utils'
import { formatNumber } from 'utils/formatBalance'

const { RangePicker } = DatePicker

const WPoolHistory = styled.div`
  width: 100%;
  padding: 20px;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(233, 233, 233);
  margin-top: 10px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 35px;
  }

  .zodi-control-page {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 32px;

    ${({ theme }) => theme.mediaQueries.md} {
      align-items: flex-end;
      flex-direction: row;
    }

    h1 {
      font-size: 50px;
      font-weight: 500;
      margin-bottom: 20px;

      ${({ theme }) => theme.mediaQueries.md} {
        margin-bottom: 0;
      }
    }

    a {
      border-color: rgb(24, 144, 255);
      background: rgb(24, 144, 255);
      text-shadow: rgb(0 0 0 / 12%) 0px -1px 0px;
      box-shadow: rgb(0 0 0 / 4%) 0px 2px;
      color: rgb(255, 255, 255) !important;
      padding: 8px 20px;
      min-height: 38px;
      max-height: 38px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      box-shadow: rgb(0 0 0 / 35%) 0px 5px 15px;
      cursor: pointer;
    }
  }

  .anticon {
    margin: 0 !important;
  }

  .ant-form {
    .ant-row {
      .ant-col {
        margin: 0;

        ${({ theme }) => theme.mediaQueries.sm} {
          margin-left: 16.66666667%;
        }
      }

      .ant-form-item-label {
        min-width: 110px;
        margin-left: 0;
        text-align: left;

        .ant-form-item-required {
          justify-content: flex-start;
        }
      }
    }
  }

  .history-content {
    .history-content-head {
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;

      ${({ theme }) => theme.mediaQueries.md} {
        flex-direction: row;
        align-items: center;
      }

      .ant-checkbox-wrapper {
        margin: 0 0 10px 0;

        ${({ theme }) => theme.mediaQueries.md} {
          margin: 0 10px 5px 0;
        }
      }

      .ant-form-item {
        margin: 0;
      }
    }

    .history-content-middle {
      margin-bottom: 10px;

      .ant-row {
        margin-bottom: 8px;

        .ant-col {
          ${({ theme }) => theme.mediaQueries.sm} {
            margin: 0 !important;
          }
        }
      }

      .ant-checkbox-wrapper {
        margin: 0 0 10px 0;

        ${({ theme }) => theme.mediaQueries.md} {
          margin: 0 10px 5px 0;
        }
      }

      .ant-form-item {
        margin: 0;
      }
    }
  }

  .table-wrapper {
    #table-xls-button {
      border-color: rgb(41, 190, 84);
      background: rgb(41, 190, 84);
      text-shadow: rgb(0 0 0 / 12%) 0px -1px 0px;
      box-shadow: rgb(0 0 0 / 4%) 0px 2px;
      color: rgb(255, 255, 255) !important;
      padding: 8px 20px;
      min-height: 38px;
      max-height: 38px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      box-shadow: rgb(0 0 0 / 35%) 0px 5px 15px;
      cursor: pointer;
    }
  }
`

const WExportCsv = styled.div`
  display: flex;
  justify-content: flex-end;
`

const checkList = {
  DEPOSIT: 'Deposit',
  WITHDRAW: 'Withdraw',
}

const PoolHistory: React.FC = () => {
  const [form] = Form.useForm()
  const router = useRouter()
  const { chainId } = useActiveWeb3React()

  const [selected, setSelected] = useState(checkList.DEPOSIT)

  // Get data from deposit history with graph
  const { stakingDepositHistories, setParamsDepositHistories } = useClaimDepositHistories(
    selected === checkList.DEPOSIT,
  )
  // Get data from withDraw history with graph
  const { stakingWithdrawHistories, setParamsStakeWithdrawHistories } = useClaimWithdrawHistories(
    selected === checkList.WITHDRAW,
  )

  const handleCheckBox = (e: CheckboxChangeEvent) => {
    setSelected(e.target.value)
  }

  const handleSearchAddress = debounce((e) => {
    setParamsDepositHistories((prev) => ({ ...prev, userAddress: e.target.value }))
    setParamsStakeWithdrawHistories((prev) => ({ ...prev, userAddress: e.target.value }))
  }, 200)

  const handleSearchPlan = debounce((e) => {
    setParamsDepositHistories((prev) => ({ ...prev, planId: e.target.value }))
    setParamsStakeWithdrawHistories((prev) => ({ ...prev, planId: e.target.value }))
  }, 200)

  const handleSearchTxH = debounce((e) => {
    setParamsDepositHistories((prev) => ({ ...prev, transactionHash: e.target.value }))
    setParamsStakeWithdrawHistories((prev) => ({ ...prev, transactionHash: e.target.value }))
  }, 200)

  const handleSearchByDate = debounce((date) => {
    const [start, end] = date || [null, null]
    setParamsDepositHistories((prev) => ({
      ...prev,
      startTime: start ? Math.floor(new Date(start).getTime() / 1000) : null,
      endTime: end ? Math.floor(new Date(end).getTime() / 1000) : null,
    }))

    setParamsStakeWithdrawHistories((prev) => ({
      ...prev,
      startTime: start ? Math.floor(new Date(start).getTime() / 1000) : null,
      endTime: end ? Math.floor(new Date(end).getTime() / 1000) : null,
    }))
  }, 200)

  const columnsDeposit = [
    {
      title: 'Pool ID',
      dataIndex: 'poolId',
    },
    {
      title: 'Plan ID',
      dataIndex: 'planId',
    },
    // {
    //   title: 'User',
    //   dataIndex: 'id',
    //   render: (data) => {
    //     return (
    //       <a href={getBlockExploreLink(data, 'transaction', chainId)} target="_blank" rel="noreferrer">
    //         {formatCode(data, 5, 5)}
    //       </a>
    //     )
    //   },
    // },
    {
      title: 'Amount',
      dataIndex: 'amount',
      render: (text) => formatNumber(text / 1e18),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (data) => {
        return Number(data) === 0 ? 'Live' : 'Ended'
      },
    },
    {
      title: 'Transaction Hash',
      dataIndex: 'transactionHash',
      render: (data) => {
        return (
          <a href={getBlockExploreLink(data, 'transaction', chainId)} target="_blank" rel="noreferrer">
            {formatCode(data, 5, 5)}
          </a>
        )
      },
    },
    {
      title: 'User Address',
      dataIndex: 'userAddress',
      render: (data) => {
        return (
          <a href={getBlockExploreLink(data, 'address', chainId)} target="_blank" rel="noreferrer">
            {formatCode(data, 5, 5)}
          </a>
        )
      },
    },
    {
      title: 'Create time',
      dataIndex: 'createdTime',
      render: (record) => {
        return (
          <div>
            <p>{formatDate(record * 1000, 'yyyy-MM-DD')}</p>
          </div>
        )
      },
    },
    {
      title: 'End time',
      dataIndex: 'endTime',
      render: (record) => {
        return (
          <div>
            <p>{formatDate(record * 1000, 'yyyy-MM-DD')}</p>
          </div>
        )
      },
    },
  ]

  const columnsWithdraw = [
    {
      title: 'Pool ID',
      dataIndex: 'poolId',
    },
    {
      title: 'Plan ID',
      dataIndex: 'planId',
    },
    // {
    //   title: 'User',
    //   dataIndex: 'id',
    //   render: (data) => {
    //     return (
    //       <a href={getBlockExploreLink(data, 'transaction', chainId)} target="_blank" rel="noreferrer">
    //         {formatCode(data, 5, 5)}
    //       </a>
    //     )
    //   },
    // },
    {
      title: 'Amount',
      dataIndex: 'amount',
      render: (text) => formatNumber(text / 1e18),
    },
    {
      title: 'Transaction Hash',
      dataIndex: 'transactionHash',
      render: (data) => {
        return (
          <a href={getBlockExploreLink(data, 'transaction', chainId)} target="_blank" rel="noreferrer">
            {formatCode(data, 5, 5)}
          </a>
        )
      },
    },
    {
      title: 'User Address',
      dataIndex: 'userAddress',
      render: (data) => {
        return (
          <a href={getBlockExploreLink(data, 'address', chainId)} target="_blank" rel="noreferrer">
            {formatCode(data, 5, 5)}
          </a>
        )
      },
    },
    {
      title: 'Create time',
      dataIndex: 'createdTime',
      render: (record) => {
        return (
          <div>
            <p>{formatDate(record * 1000, 'yyyy-MM-DD')}</p>
          </div>
        )
      },
    },
    // {
    //   title: 'Start time',
    //   dataIndex: 'startTime',
    //   render: (record) => {
    //     return (
    //       <div>
    //         <p>{formatDate(record * 1000, 'yyyy-MM-DD')}</p>
    //       </div>
    //     )
    //   },
    // },
  ]

  //
  const tableRef = useRef(null)
  useEffect(() => {
    const table = tableRef.current.querySelector('table')
    table.setAttribute('id', 'table-to-xls')
  }, [tableRef])

  return (
    <WPoolHistory>
      <div className="zodi-control-page">
        <h1>Pool History</h1>
        <Button type="primary" size="large" onClick={() => router.back()}>
          Back
        </Button>
      </div>

      <div className="history-content">
        <div className="history-content-head">
          {Object.values(checkList).map((item) => {
            return (
              <Checkbox name={item} key={item} onChange={handleCheckBox} checked={item === selected} value={item}>
                {item}
              </Checkbox>
            )
          })}

          <Form.Item name="range_picker" label="Date">
            <Space direction="vertical" size={12}>
              <RangePicker format="YYYY/MM/DD" onChange={handleSearchByDate} />
            </Space>
          </Form.Item>
        </div>

        <div className="history-content-middle">
          <Form form={form} layout="vertical">
            <Row gutter={8}>
              <Col span={8}>
                <Form.Item name="Address" label="Address">
                  <Input size="middle" autoComplete="true" onChange={handleSearchAddress} placeholder="Address" />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item name="Plan" label="Plan">
                  <Input size="middle" autoComplete="true" onChange={handleSearchPlan} placeholder="Plan" />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item name="TxH" label="TxH">
                  <Input size="middle" autoComplete="true" onChange={handleSearchTxH} placeholder="Transaction hash" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>

        <div className="history-content-middle">
          {selected === 'Deposit' ? (
            <div className="table-wrapper" ref={tableRef}>
              <WExportCsv>
                <ReactHTMLTableToExcel
                  id="table-xls-button"
                  className="download-table-xls-button"
                  table="table-to-xls"
                  sheet="Sales report"
                  filename="Pool History Deposit"
                  buttonText="Export CSV"
                />
              </WExportCsv>

              <Table
                columns={columnsDeposit}
                dataSource={stakingDepositHistories?.dataDeposit || []}
                scroll={{ x: 800 }}
                pagination={{
                  defaultPageSize: 10,
                  showSizeChanger: true,
                  pageSizeOptions: ['10', '30', '100'],
                }}
              />
            </div>
          ) : (
            <div className="table-wrapper" ref={tableRef}>
              <WExportCsv>
                <ReactHTMLTableToExcel
                  id="table-xls-button"
                  className="download-table-xls-button"
                  table="table-to-xls"
                  sheet="Sales report"
                  filename="Pool History Withdraw"
                  buttonText="Export CSV"
                />
              </WExportCsv>
              <Table
                columns={columnsWithdraw}
                dataSource={stakingWithdrawHistories?.dataWithdraw || []}
                scroll={{ x: 800 }}
                pagination={{
                  defaultPageSize: 10,
                  showSizeChanger: true,
                  pageSizeOptions: ['10', '30', '100'],
                }}
              />
            </div>
          )}
        </div>
      </div>
    </WPoolHistory>
  )
}

export default PoolHistory
