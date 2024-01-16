/* eslint-disable prefer-destructuring */
import { Button, Col, DatePicker, Form, Input, Row } from 'antd'
import React, { useEffect, useState } from 'react'

import moment from 'moment'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import { toLocaleString } from 'utils'

import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import useCatchTxErrorMessage from 'hooks/useCatchTxErrorMessage'
import { useContractCampaigns } from 'hooks/useContract'
import { useTransactionAdder } from 'state/transactions/hooks'
import useCampaignItem from 'state/campaigns/useCampaignItem'

const WCampaignsUpdate = styled.div`
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

    ${({ theme }) => theme.mediaQueries.sm} {
      align-items: flex-end;
      flex-direction: row;
    }

    h1 {
      font-size: 50px;
      font-weight: 500;
      margin-bottom: 15px;

      ${({ theme }) => theme.mediaQueries.sm} {
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

  .ant-space {
    width: 100%;

    .ant-picker {
      width: 100%;
    }
  }
`

const CampaignsUpdate: React.FC = () => {
  const [form] = Form.useForm()
  const router = useRouter()
  // ID of campaign

  const [campaignID] = useState(router.query.campaignID)
  const [errorMess, setErrorMess] = useState('')
  const [stakingLoading, setStakingLoading] = useState(false)
  const [amount, setAmount] = useState<string | number>('')

  const { callWithGasPrice } = useCallWithGasPrice()
  const { fetchWithCatchTxError } = useCatchTxErrorMessage()
  const contractCampaigns = useContractCampaigns()
  const addTransaction = useTransactionAdder()

  const campaignItem = useCampaignItem(campaignID)
  console.log('campaignItem', campaignItem)

  const [isSetInitForm, setIsSetInitForm] = useState(false)
  useEffect(() => {
    if (campaignItem && !isSetInitForm) {
      form.setFieldsValue({
        campaignID: campaignItem.id,
        start: moment(campaignItem.start),
        end: moment(campaignItem.finish),
        reward: campaignItem.totalPool,
      })
      setIsSetInitForm(true)
    }
  }, [campaignItem, form, isSetInitForm])

  const handleSubmit = async (values) => {
    const start = (moment(values.start).toDate().getTime() / 1000).toFixed()
    const end = (moment(values.end).toDate().getTime() / 1000).toFixed()
    const reward = values.reward

    const updateParams = {
      start,
      end,
      totalReward: toLocaleString(reward * 1e18),
      campaignID,
    }

    console.log(updateParams)

    setErrorMess('')
    setStakingLoading(true)
    const { txResponse, status, message } = await fetchWithCatchTxError(() =>
      callWithGasPrice(contractCampaigns, 'modifyCampaign', [
        updateParams.campaignID,
        [updateParams.start, updateParams.end, updateParams.totalReward, 0],
      ]),
    )
    setStakingLoading(false)
    if (status) {
      addTransaction(txResponse, {
        summary: `Update Campaigns  ${campaignID} `,
      })
      setAmount('')
    } else {
      setErrorMess(message)
    }
  }
  return (
    <WCampaignsUpdate>
      <div className="zodi-control-page">
        <h1>Modify Campaigns</h1>
        <Button type="primary" size="large" onClick={() => router.back()}>
          Back
        </Button>
      </div>
      <Form form={form} onFinish={handleSubmit}>
        <Row gutter={32}>
          <Col span={16} offset={4}>
            <Form.Item name="campaignId" label="Campaign ID">
              <Input size="middle" placeholder={`${router.query.campaignID}`} readOnly />
            </Form.Item>

            <Form.Item name="start" label="Start time" rules={[{ required: true }]}>
              <DatePicker style={{ width: '100%' }} format="yyyy-MM-DD" />
            </Form.Item>

            <Form.Item name="end" label="End time" rules={[{ required: true }]}>
              <DatePicker style={{ width: '100%' }} format="yyyy-MM-DD" />
            </Form.Item>

            <Form.Item name="reward" label="Total Reward" rules={[{ required: true }]}>
              <Input size="middle" placeholder="Total Reward" autoComplete="true" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item className="action" style={{ textAlign: 'center' }}>
          <Button size="large" type="primary" htmlType="submit" className="primary-button" loading={stakingLoading}>
            Modify Campaigns
          </Button>
        </Form.Item>
      </Form>
    </WCampaignsUpdate>
  )
}

export default CampaignsUpdate
