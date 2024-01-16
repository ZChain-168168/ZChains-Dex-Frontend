import { Button, Col, DatePicker, Form, Input, Row } from 'antd'

import React, { useState } from 'react'

import { useRouter } from 'next/router'
import styled from 'styled-components'

import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import useCatchTxErrorMessage from 'hooks/useCatchTxErrorMessage'
import { useContractStaking } from 'hooks/useContract'
import { useTransactionAdder } from 'state/transactions/hooks'

const WPlanUpdate = styled.div`
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
    #planId {
      padding: 0;

      ::placeholder {
        color: rgba(0, 0, 0, 0.85);
        font-size: 14px;
      }
    }

    #poolId {
      padding: 0;

      ::placeholder {
        color: rgba(0, 0, 0, 0.85);
        font-size: 14px;
      }
    }
  }
`

const PlanUpdate: React.FC = () => {
  const [form] = Form.useForm()
  const router = useRouter()

  const { poolId, planId } = router.query

  const [errorMess, setErrorMess] = useState('')
  const [stakingLoading, setStakingLoading] = useState(false)
  const [amount, setAmount] = useState<string | number>('')

  const { callWithGasPrice } = useCallWithGasPrice()
  const { fetchWithCatchTxError } = useCatchTxErrorMessage()
  const contractStaking = useContractStaking()
  const addTransaction = useTransactionAdder()

  const handleSubmit = async (values) => {
    const updatePoolParams = {
      poolId,
      planId,
      time: (values.time._d.getTime() / 1000).toFixed().toString(),
      periods: values.periods,
      apy: values.apy,
    }
    console.log(updatePoolParams)
    setErrorMess('')
    setStakingLoading(true)

    const { txResponse, status, message } = await fetchWithCatchTxError(() =>
      callWithGasPrice(contractStaking, 'updatePlan', [
        updatePoolParams.poolId,
        updatePoolParams.planId,
        [updatePoolParams.time, updatePoolParams.periods, updatePoolParams.apy],
      ]),
    )
    setStakingLoading(false)
    if (status) {
      addTransaction(txResponse, {
        summary: `Update plan `,
      })
      setAmount('')
    } else {
      setErrorMess(message)
    }
  }

  return (
    <WPlanUpdate>
      <div className="zodi-control-page">
        <h1>Update Plan</h1>
        <Button type="primary" size="large" onClick={() => router.back()}>
          Back
        </Button>
      </div>

      <Form form={form} onFinish={handleSubmit}>
        <Row gutter={32}>
          <Col span={16} offset={4}>
            {/* <Select allowClear size="large" placeholder="Selected Plan">
              {stakingList &&
                stakingList.map((item) => (
                  <Option key={`${item.planId}`} value={`${item.planId}`}>
                    {item.planId}
                  </Option>
                ))}
            </Select> */}
            <Form.Item name="poolId" label="Pool ID" id="poolId">
              <Input readOnly bordered={false} placeholder={`${poolId}`} />
            </Form.Item>

            <Form.Item name="planId" label="Plan ID" id="planId">
              <Input readOnly bordered={false} placeholder={`${planId}`} />
            </Form.Item>

            <Form.Item name="time" label="Time" rules={[{ required: true }]}>
              <DatePicker style={{ width: '100%' }} autoComplete="true" />
            </Form.Item>

            <Form.Item name="periods" label="Periods" rules={[{ required: true }]}>
              <Input size="large" placeholder="Periods" autoComplete="true" />
            </Form.Item>

            <Form.Item name="apy" label="APY" rules={[{ required: true }]}>
              <Input addonBefore="%" size="large" placeholder="APY" autoComplete="true" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item className="action" style={{ textAlign: 'center' }}>
          <Button size="large" type="primary" htmlType="submit" className="primary-button" loading={stakingLoading}>
            Confirm
          </Button>
        </Form.Item>
      </Form>
    </WPlanUpdate>
  )
}

export default PlanUpdate
