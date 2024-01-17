import { Button, Col, Form, Input, Row } from 'antd'
import React, { useState } from 'react'

import { useRouter } from 'next/router'
import styled from 'styled-components'

import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import useCatchTxErrorMessage from 'hooks/useCatchTxErrorMessage'
import { useContractStaking } from 'hooks/useContract'
import { useTransactionAdder } from 'state/transactions/hooks'

const WPoolUpdate = styled.div`
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
        min-width: 167px;
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

  .pool-update-content {
    .pool-update-content-top {
      display: flex;
      margin-bottom: 10px;

      p {
        text-align: left;

        ${({ theme }) => theme.mediaQueries.sm} {
          text-align: right;
        }
      }
    }
  }

  .ant-form-item-control-input {
    .ant-input-borderless {
      padding: 0;

      ::placeholder {
        color: rgba(0, 0, 0, 0.85);
        font-size: 14px;
      }
    }
  }
`

const PoolUpdate: React.FC = () => {
  const [form] = Form.useForm()
  const router = useRouter()

  const { poolId } = router.query

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
      rewardAddress: values.rewardAddress,
      lpAddress: values.lpAddress,
    }
    setErrorMess('')
    setStakingLoading(true)

    const { txResponse, status, message } = await fetchWithCatchTxError(() =>
      callWithGasPrice(contractStaking, 'updatePool', [
        updatePoolParams.poolId,
        [updatePoolParams.rewardAddress, updatePoolParams.lpAddress],
      ]),
    )
    setStakingLoading(false)
    if (status) {
      addTransaction(txResponse, {
        summary: `Create pool `,
      })
      setAmount('')
    } else {
      setErrorMess(message)
    }
  }

  return (
    <WPoolUpdate>
      <div className="zodi-control-page">
        <h1>Update Pool</h1>
        <Button type="primary" size="large" onClick={() => router.back()}>
          Back
        </Button>
      </div>

      <div className="pool-update-content">
        <Form form={form} onFinish={handleSubmit}>
          <Row gutter={32}>
            <Col span={16} offset={4}>
              <Form.Item name="poolId" label="Pool ID" id="poolId">
                <Input readOnly bordered={false} placeholder={`${router.query.poolId}`} />
              </Form.Item>

              <Form.Item name="rewardAddress" label="Reward Address" rules={[{ required: true }]}>
                <Input size="large" placeholder="Address" autoComplete="true" />
              </Form.Item>

              <Form.Item name="lpAddress" label="LP Address" rules={[{ required: true }]}>
                <Input size="large" placeholder="Address" autoComplete="true" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item className="action" style={{ textAlign: 'center' }}>
            <Button size="large" type="primary" htmlType="submit" className="primary-button" loading={stakingLoading}>
              Confirm
            </Button>
          </Form.Item>
        </Form>
      </div>
    </WPoolUpdate>
  )
}

export default PoolUpdate
