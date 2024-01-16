import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Col, Form, Input, Row, Select } from 'antd'
import { Option } from 'antd/lib/mentions'

import React, { useState } from 'react'

import { useRouter } from 'next/router'
import styled from 'styled-components'

import { toLocaleString } from 'utils'

import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import useCatchTxErrorMessage from 'hooks/useCatchTxErrorMessage'
import { useContractCampaigns } from 'hooks/useContract'
import { useTransactionAdder } from 'state/transactions/hooks'

const WCampaignsUpdateRate = styled.div`
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

  .custom-repeater-field {
    .ant-form-item-control {
      margin: 0 !important ;

      .ant-form-item-label {
        /* min-width: 30%; */
      }

      .ant-form-item-control {
        ${({ theme }) => theme.mediaQueries.sm} {
          margin-left: 16.666666667% !important;
        }
      }
    }

    .ant-btn-dashed {
      display: flex;
      justify-content: space-between;
      align-items: center;

      ${({ theme }) => theme.mediaQueries.sm} {
        justify-content: center;
      }

      span {
        text-align: left;
        margin: 0;
      }

      span:last-child {
        margin-left: 10px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        display: inline-block;
      }
    }
  }
`

const CampaignsUpdateRate: React.FC = () => {
  const [form] = Form.useForm()
  const router = useRouter()
  // ID of campaign
  const { campaignID } = router.query

  const [errorMess, setErrorMess] = useState('')
  const [stakingLoading, setStakingLoading] = useState(false)
  const [amount, setAmount] = useState<string | number>('')

  const { callWithGasPrice } = useCallWithGasPrice()
  const { fetchWithCatchTxError } = useCatchTxErrorMessage()
  const contractCampaigns = useContractCampaigns()
  const addTransaction = useTransactionAdder()

  const handleSubmit = async (values) => {
    const rares = []
    const opvQuantities = []
    // eslint-disable-next-line array-callback-return
    values.meta_data.map((data) => {
      rares.push(parseInt(data.key))
      opvQuantities.push(toLocaleString(data.value * 1e18))
    })

    const updateRateParams = {
      rares,
      opvQuantities,
      campId: campaignID,
    }
    setErrorMess('')
    setStakingLoading(true)
    const { txResponse, status, message } = await fetchWithCatchTxError(() =>
      callWithGasPrice(contractCampaigns, 'updateRateCampaign', [
        updateRateParams.campId,
        updateRateParams.rares,
        updateRateParams.opvQuantities,
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
    <WCampaignsUpdateRate>
      <div className="zodi-control-page">
        <h1>Update Rate For Campaigns</h1>
        <Button type="primary" size="large" onClick={() => router.back()}>
          Back
        </Button>
      </div>
      <Form form={form} onFinish={handleSubmit}>
        <Row gutter={32}>
          <Col span={16} offset={4}>
            <Form.Item name="campaignId" label="Campaign ID">
              <Input size="middle" placeholder={`${campaignID}`} readOnly />
            </Form.Item>

            <div className="custom-repeater-field">
              <Form.List name="meta_data">
                {(fields, { add, remove }, { errors }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Form.Item required={false} key={key}>
                        <Form.Item
                          {...restField}
                          label="NFT Name"
                          name={[name, 'key']}
                          validateTrigger={['onChange', 'onBlur']}
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message: "Please input passenger's or delete this field.",
                            },
                          ]}
                        >
                          <Select allowClear size="middle" placeholder="STAR">
                            <Option key="0" value="0">
                              HEMATITE
                            </Option>

                            <Option key="1" value="1">
                              AMBER
                            </Option>

                            <Option key="2" value="2">
                              ZICRON
                            </Option>

                            <Option key="3" value="3">
                              PERIDOT
                            </Option>

                            <Option key="4" value="4">
                              TOURMALINE
                            </Option>

                            <Option key="5" value="5">
                              TOPAZ
                            </Option>

                            <Option key="6" value="6">
                              BERYL
                            </Option>

                            <Option key="7" value="7">
                              EMERALD
                            </Option>

                            <Option key="8" value="8">
                              SPINEL
                            </Option>

                            <Option key="9" value="9">
                              RUBY
                            </Option>

                            <Option key="10" value="10">
                              STAR
                            </Option>
                          </Select>
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          name={[name, 'value']}
                          label="OPV Reward"
                          validateTrigger={['onChange', 'onBlur']}
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message: "Please input passenger's or delete this field.",
                            },
                          ]}
                        >
                          <Input size="middle" placeholder="1000" autoComplete="true" />
                        </Form.Item>

                        <MinusCircleOutlined className="dynamic-delete-button" onClick={() => remove(name)} />
                      </Form.Item>
                    ))}

                    <Form.Item className="button-action">
                      <Button type="dashed" onClick={() => add()} style={{ width: '100%' }} icon={<PlusOutlined />}>
                        Add new NFT and Reward
                      </Button>
                      <Form.ErrorList errors={errors} />
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </div>
          </Col>
        </Row>

        <Form.Item className="action" style={{ textAlign: 'center' }}>
          <Button size="large" type="default" htmlType="submit" className="primary-button" loading={stakingLoading}>
            Confirm
          </Button>
        </Form.Item>
      </Form>
    </WCampaignsUpdateRate>
  )
}

export default CampaignsUpdateRate
