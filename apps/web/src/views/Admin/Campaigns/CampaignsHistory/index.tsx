import { Button, Col, DatePicker, Form, Input, Row, Space, Table } from 'antd'
import { useCampaignsClaimHistory } from 'state/nfts/claimHistory'

import { useMemo, useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'

import styled from 'styled-components'

import ReactHTMLTableToExcel from 'react-html-table-to-excel'

import { formatCode } from 'helpers/CommonHelper'
import { getBlockExploreLink } from 'utils'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { formatDate } from 'helpers'

const WCampaignsHistory = styled.div`
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

  .ant-form-horizontal {
    margin-bottom: 20px;

    .ant-form-item {
      margin-bottom: 20px;

      ${({ theme }) => theme.mediaQueries.md} {
        margin-bottom: 0;
      }

      .ant-form-item-row {
        flex-direction: column;
      }
    }

    .ant-row {
      width: 100%;
      margin-right: 10px;

      .ant-col {
        max-width: 100%;
        min-width: 80px;
        margin: 0;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;

        ${({ theme }) => theme.mediaQueries.md} {
          justify-content: space-between;
          align-items: center;
          flex-direction: row;
        }
      }
    }

    .ant-space-vertical {
      margin-top: 20px;
      ${({ theme }) => theme.mediaQueries.sm} {
        margin-top: 0;
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

const { RangePicker } = DatePicker

const CampaignsHistory: React.FC = () => {
  const [searchAddress, setSearchAddress] = useState('')
  const [dateRange, setDateRange] = useState([])

  const [form] = Form.useForm()
  const router = useRouter()
  const { chainId } = useActiveWeb3React()

  const tableRef = useRef(null)
  useEffect(() => {
    const table = tableRef.current.querySelector('table')
    table.setAttribute('id', 'table-to-xls')
  }, [tableRef])

  // ID of campaign
  const { campaignID } = router.query

  const { campaignsClaimHistory, setParamsCampaignsClaimHistory } = useCampaignsClaimHistory(
    String(campaignID),
    dateRange && dateRange[0] ? String(dateRange[0]) : '',
    dateRange && dateRange[1] ? String(dateRange[1]) : '',
  )

  const campaignsClaimHistoryClone: any[] = useMemo(
    () =>
      campaignsClaimHistory.data
        ?.map((campaign) => ({
          ...campaign,
        }))
        .filter((item) => item.userAddress.includes(searchAddress)),
    [campaignsClaimHistory.data, searchAddress],
  )

  const columns = [
    {
      title: 'No ',
      key: 'index',
      render: (text, record, index) => index,
    },
    {
      title: 'Campaign ID',
      dataIndex: 'campaignId',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      render: (data: any) => {
        return (data / 1e18).toLocaleString()
      },
    },
    {
      title: 'TxH',
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
      title: 'Address',
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
  ]

  const handleSearchAddress = (e) => {
    setSearchAddress(e.target.value.toLowerCase())
  }

  const handleSearchDate = (e) => {
    setDateRange(e?.map((time) => Date.parse(time._d) / 1000))
  }

  const handleSubmit = (values) => {
    const data2 = {}
  }

  return (
    <WCampaignsHistory>
      <div className="zodi-control-page">
        <h1>History Claim Reward</h1>
        <Button type="primary" size="large" onClick={() => router.back()}>
          Back
        </Button>
      </div>

      <Form form={form} onFinish={handleSubmit}>
        <Row>
          <Col>
            <Form.Item name="Address" label="Address">
              <Input size="middle" placeholder="Address" autoComplete="true" onChange={handleSearchAddress} />
            </Form.Item>

            {/* <Form.Item name="Campaign" label="Campaign">
              <Input size="middle" placeholder="Campaign" autoComplete="true" onChange={handleSearchCampaign} />
            </Form.Item> */}

            <Form.Item name="Date" label="Date">
              <Space direction="vertical" size={12}>
                <RangePicker format="YYYY/MM/DD" onChange={handleSearchDate} />
              </Space>
            </Form.Item>
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
            filename="History Claim Reward"
            buttonText="Export CSV"
          />
        </WExportCsv>

        <Table
          columns={columns}
          dataSource={campaignsClaimHistoryClone}
          scroll={{ x: 600 }}
          pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '30', '100'] }}
        />
      </div>
    </WCampaignsHistory>
  )
}

export default CampaignsHistory
