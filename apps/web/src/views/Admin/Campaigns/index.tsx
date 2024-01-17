import { useEffect, useMemo, useRef, useState } from 'react'

import { Col, Form, Row, Space, Table, DatePicker } from 'antd'
import Link from 'next/link'
import styled from 'styled-components'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'

import { formatDate } from 'helpers'

import { useCampaigns, usePollCoreCampaignsData } from 'state/campaigns/hooks'

const { RangePicker } = DatePicker

const WCampaigns = styled.div`
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

    ${({ theme }) => theme.mediaQueries.lg} {
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

    .zodi-control-page-right {
      display: flex;
      flex-direction: column;

      ${({ theme }) => theme.mediaQueries.lg} {
        align-items: flex-end;
        flex-direction: row;
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

      a:last-child {
        background-color: rgb(255, 193, 7);
        border-color: rgb(255, 193, 7);
        color: rgb(33, 37, 41) !important;
        margin: 10px 0 0 0;

        ${({ theme }) => theme.mediaQueries.lg} {
          margin: 0 0 0 10px;
        }
      }
    }
  }

  .anticon {
    margin: 0 !important;
  }

  .ant-table-tbody {
    .ant-space-item:nth-child(1) {
      padding: 8px 12px;
      background-color: rgb(255, 193, 7);
      border-color: rgb(255, 193, 7);
      text-shadow: rgb(0 0 0 / 12%) 0px -1px 0px;
      box-shadow: rgb(0 0 0 / 4%) 0px 2px;
      color: rgb(33, 37, 41) !important;

      a {
        color: rgb(33, 37, 41) !important;
      }
    }

    .ant-space-item:nth-child(2) {
      padding: 8px 12px;
      border-color: rgb(23, 162, 184);
      background: rgb(23, 162, 184);
      text-shadow: rgb(0 0 0 / 12%) 0px -1px 0px;
      box-shadow: rgb(0 0 0 / 4%) 0px 2px;
      color: rgb(255, 255, 255) !important;

      a {
        color: rgb(255, 255, 255) !important;
      }
    }

    .ant-space-item:nth-child(3) {
      padding: 8px 12px;
      background-color: rgba(255, 193, 7, 0.815);
      border-color: rgba(255, 193, 7, 0.815);
      text-shadow: rgb(0 0 0 / 12%) 0px -1px 0px;
      box-shadow: rgb(0 0 0 / 4%) 0px 2px;
      color: rgb(33, 37, 41) !important;

      a {
        color: rgb(33, 37, 41) !important;
      }
    }

    .ant-space-item:nth-child(4) {
      padding: 8px 12px;
      border-color: rgb(23, 162, 184);
      background: rgb(23, 162, 184);
      text-shadow: rgb(0 0 0 / 12%) 0px -1px 0px;
      box-shadow: rgb(0 0 0 / 4%) 0px 2px;
      color: rgb(255, 255, 255) !important;

      a {
        color: rgb(255, 255, 255) !important;
      }
    }
  }

  .zodi-form-campaigns {
    .ant-row {
      display: flex;
      flex-direction: column;

      ${({ theme }) => theme.mediaQueries.sm} {
        flex-direction: row;
      }

      .ant-form-item-row {
        display: flex;

        ${({ theme }) => theme.mediaQueries.sm} {
          flex-direction: column;
          align-items: flex-start;
        }
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

const Campaigns: React.FC = () => {
  const [form] = Form.useForm()

  const tableRef = useRef(null)
  useEffect(() => {
    const table = tableRef.current.querySelector('table')
    table.setAttribute('id', 'table-to-xls')
  }, [tableRef])

  usePollCoreCampaignsData() // list campaign data

  const { data: campaigns } = useCampaigns()

  // const [dateRange, setDateRange] = useState([])

  const currentTime = new Date().getTime()

  // Check status
  const campaignsClone: any[] = useMemo(
    () =>
      campaigns
        ?.map((campaign) => ({
          ...campaign,

          // id: campaign.id.sort((a, b) => a.id - b.id),

          status: campaign.finish - currentTime > 0 ? 'Live' : 'Ended',
          totalPool: Number(campaign.totalPool).toLocaleString(),

          // start: `${new Date(campaign.start).getDay()}/${new Date(campaign.start).getMonth()}/${new Date(
          //   campaign.start,
          // ).getFullYear()}`,

          // start: `${new Date(campaign.start).getFullYear()}/${new Date(campaign.start).getMonth()}/${new Date(
          //   campaign.start,
          // ).getDay()}`,

          // finish: `${new Date(campaign.finish).getFullYear()}/${new Date(campaign.finish).getMonth()}/${new Date(
          //   campaign.finish,
          // ).getDay()}`,
          // start: formatDate(campaign.start, 'yyyy-MM-DD'),
          // finish: formatDate(campaign.finish, 'yyyy-MM-DD'),
        }))
        .sort((a, b) => a.id - b.id),

    [campaigns, currentTime],
  )

  const columns = [
    {
      title: 'No ',
      dataIndex: 'id',
      width: 70,
      sorter: {
        compare: (a, b) => a.id - b.id,
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Total Reward',
      dataIndex: 'totalPool',
    },
    {
      title: 'Total Claimed',
      dataIndex: 'currentPool',
    },
    {
      title: 'Start Date',
      dataIndex: 'start',
      render: (record) => {
        return (
          <div>
            <p>{formatDate(record, 'yyyy-MM-DD')}</p>
          </div>
        )
      },
    },
    {
      title: 'End Date',
      dataIndex: 'finish',
      render: (record) => {
        return (
          <div>
            <p>{formatDate(record, 'yyyy-MM-DD')}</p>
          </div>
        )
      },
    },

    {
      title: 'Action',
      dataIndex: 'id',

      render: (id) => (
        <Space size="middle">
          <Link href={`/admin/campaigns/update/${id}`}>Update</Link>
          <Link href={`/admin/campaigns/setrate/${id}`}>Set rate</Link>
          <Link href={`/admin/campaigns/updaterate/${id}`}>Update rate</Link>
          <Link href={`/admin/campaigns/history/${id}`}>History</Link>
        </Space>
      ),
    },
  ]

  return (
    <WCampaigns>
      <div className="zodi-control-page">
        <h1>Campaign Summary</h1>

        <div className="zodi-control-page-right">
          <Link href="/admin/campaigns/create" className="add-campaigns">
            Add Campaigns
          </Link>

          <Link href="/admin/campaigns/withdraw" className="withdraw-campaigns">
            Withdraw
          </Link>
        </div>

        {/* <Link
          href={{ pathname: '/admin/campaigns/create', query: { dataCampaigns: JSON.stringify(campaignsClone) } }}
          className="add-campaigns"
        >
          Add Campaigns
        </Link> */}
      </div>

      <Form form={form} className="zodi-form-campaigns">
        <Row gutter={32}>
          <Col>
            {/* <Form.Item
              name="title"
              label="Title"
              // onChange={(value) => handleSearchTitle(value.target.value)}
            >
              <Input size="middle" placeholder="Full title" autoComplete="true" />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item name="status" label="Lock status">
              <Select
                showSearch
                allowClear
                size="middle"
                placeholder="All"
                // onChange={(value) => handleSearchStatus(value)}
              >
                <Option value>True</Option>
                <Option value={false}>False</Option>
              </Select>
            </Form.Item> */}
          </Col>
        </Row>
      </Form>

      <div className="table-wrapper" ref={tableRef}>
        <WExportCsv>
          <ReactHTMLTableToExcel
            id="table-xls-button"
            className="download-table-xls-button"
            table="table-to-xls"
            sheet="Sales report"
            filename="Campaign Summary"
            buttonText="Export CSV"
          />
        </WExportCsv>

        <Table
          columns={columns}
          dataSource={campaignsClone || []}
          rowKey={(record) => record.id}
          scroll={{ x: 1000 }}
          pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '30', '100'] }}
        />
      </div>
    </WCampaigns>
  )
}

export default Campaigns
