import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

import { Button, Form, Space, Table } from 'antd'
import Link from 'next/link'
import styled from 'styled-components'

import ReactHTMLTableToExcel from 'react-html-table-to-excel'

import { useStakingListData } from 'state/staking/fetchStakingList'
import { roundNumber } from 'helpers'

const WPlanList = styled.div`
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
    margin: 0;
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

        ${({ theme }) => theme.mediaQueries.sm} {
          text-align: right;
        }

        .ant-form-item-required {
          justify-content: flex-start;
        }
      }
    }
  }

  .ant-form-item-control-input {
    #Pool {
      padding: 0;

      ::placeholder {
        color: rgba(0, 0, 0, 0.85);
        font-size: 14px;
      }
    }
  }

  .table-content {
    .ant-pagination {
      display: none;
    }

    .add-pool {
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
      margin-top: 10px;

      a {
        color: rgb(255, 255, 255) !important;
      }
    }

    .ant-table-tbody {
      .ant-table-cell:last-child {
        a {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px 12px;
          background-color: rgb(255, 193, 7);
          border-color: rgb(255, 193, 7);
          text-shadow: rgb(0 0 0 / 12%) 0px -1px 0px;
          box-shadow: rgb(0 0 0 / 4%) 0px 2px;
          color: rgb(33, 37, 41) !important;
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
  }
`

const WExportCsv = styled.div`
  display: flex;
  justify-content: flex-end;
`

const PlanList: React.FC = () => {
  const [form] = Form.useForm()
  const router = useRouter()

  const { poolId } = router.query

  const tableRef = useRef(null)
  useEffect(() => {
    const table = tableRef.current.querySelector('table')
    table.setAttribute('id', 'table-to-xls')
  }, [tableRef])

  const { stakingList, fetchStakingList } = useStakingListData()

  const columns = [
    {
      title: 'No',
      dataIndex: 'planId',
    },
    {
      title: 'Plan',
      dataIndex: 'planId',
    },
    {
      title: 'APY',
      dataIndex: 'apr',
      render: (data) => {
        return `${data}%`
      },
    },
    {
      title: 'Total Pools Staked',
      dataIndex: 'totalStakedAmount',
      render: (data) => {
        return roundNumber(data, { decimals: 18 }).toLocaleString()
      },
    },

    {
      title: 'Action',
      key: 'planID',
      render: (data, item) => <Link href={`/admin/pool/${poolId}/plan/update/${item.planId}`}>Update</Link>,
    },
  ]

  return (
    <WPlanList>
      <div className="zodi-control-page">
        <h1>Plan List</h1>
        <Button type="primary" size="large" onClick={() => router.back()}>
          Back
        </Button>
      </div>

      <div className="table-content">
        <div className="table-wrapper" ref={tableRef}>
          <WExportCsv>
            <ReactHTMLTableToExcel
              id="table-xls-button"
              className="download-table-xls-button"
              table="table-to-xls"
              sheet="Sales report"
              filename="Plan List"
              buttonText="Export CSV"
            />
          </WExportCsv>

          <Table columns={columns} dataSource={stakingList || []} scroll={{ x: 700 }} />
        </div>

        <div className="add-pool">
          <Link href={`/admin/pool//${poolId}/plan/create`}>New plan</Link>
        </div>
      </div>
    </WPlanList>
  )
}

export default PlanList
