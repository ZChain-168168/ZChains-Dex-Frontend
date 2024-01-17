/* eslint-disable prefer-destructuring */
import { Button, Col, DatePicker, Form, Input, Row } from 'antd'
import React, { useState } from 'react'
import { toLocaleString } from 'utils'

import { useRouter } from 'next/router'
import styled from 'styled-components'

import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import useCatchTxErrorMessage from 'hooks/useCatchTxErrorMessage'
import { useContractCampaigns } from 'hooks/useContract'
import { useTransactionAdder } from 'state/transactions/hooks'

const WWithdrawCampaigns = styled.div`
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

const CampaignsWithdraw: React.FC = () => {
  const [form] = Form.useForm()
  const router = useRouter()

  const [errorMess, setErrorMess] = useState('')
  const [stakingLoading, setStakingLoading] = useState(false)
  const [amount, setAmount] = useState<string | number>('')

  const { callWithGasPrice } = useCallWithGasPrice()
  const { fetchWithCatchTxError } = useCatchTxErrorMessage()
  const contractCampaigns = useContractCampaigns()
  const addTransaction = useTransactionAdder()

  const handleSubmit = async (values) => {
    const coinAddress = values.coinAddress
    const value = values.value
    const to = values.to

    const withdrawParams = {
      coinAddress,
      value: toLocaleString(value * 1e18),
      to,
    }

    setErrorMess('')
    setStakingLoading(true)
    const { txResponse, status, message } = await fetchWithCatchTxError(() =>
      callWithGasPrice(contractCampaigns, 'handleForfeitedBalance', [
        withdrawParams.coinAddress,
        withdrawParams.value,
        withdrawParams.to,
      ]),
    )
    setStakingLoading(false)
    if (status) {
      addTransaction(txResponse, {
        summary: `Withdraw Campaigns from ${withdrawParams.coinAddress} to ${withdrawParams.to}. Value: ${withdrawParams.value}`,
      })
      setAmount('')
    } else {
      setErrorMess(message)
    }
  }

  return (
    <WWithdrawCampaigns key={router.pathname.slice(7)}>
      <div className="zodi-control-page">
        <h1>Withdraw Campaigns</h1>
        <Button type="primary" size="large" onClick={() => router.back()}>
          Back
        </Button>
      </div>

      <Form form={form} onFinish={handleSubmit}>
        <Row gutter={32}>
          <Col span={16} offset={4}>
            <Form.Item name="coinAddress" label="Coin Address" rules={[{ required: true }]}>
              <Input size="middle" placeholder="Coin Address" autoComplete="true" />
            </Form.Item>

            <Form.Item name="value" label="Value" rules={[{ required: true }]}>
              <Input size="middle" placeholder="Value" autoComplete="true" />
            </Form.Item>

            <Form.Item name="to" label="To" rules={[{ required: true }]}>
              <Input size="middle" placeholder="Address" autoComplete="true" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item className="action" style={{ textAlign: 'center' }}>
          <Button size="large" type="primary" htmlType="submit" className="primary-button" loading={stakingLoading}>
            Withdraw Campaign
          </Button>
        </Form.Item>
      </Form>
    </WWithdrawCampaigns>
  )
}

export default CampaignsWithdraw
