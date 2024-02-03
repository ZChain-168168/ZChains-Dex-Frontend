import { useTranslation } from '@pancakeswap/localization'
import { Button } from '@pancakeswap/uikit'
import { Button as AntButton, Col, Form, Input, Modal, Row } from 'antd'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import useCatchTxErrorMessage from 'hooks/useCatchTxErrorMessage'
import { useContractStaking } from 'hooks/useContract'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useGetOwnerStaking, useGetWhiteListAddress } from 'state/admin/hook'
import { useClaimPools } from 'state/staking/fetchPoolList'
import { useTransactionAdder } from 'state/transactions/hooks'
import styled from 'styled-components'
import PackagePoolList from './PackagePoolsList'

const WStakingList = styled.div`
  width: 100%;
  margin-top: 40px;
`

const PoolList: React.FC = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { poolLists, fetchPoolList } = useClaimPools()
  const handleStaking = (packageItem) => {
    router.push(`/staking/${packageItem.id}`)
  }
  const { account } = useActiveWeb3React()

  const { isWhitelistAddress } = useGetWhiteListAddress(account)

  const [isOwner, setIsOwner] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isWhitelistAddress) {
      setIsOwner(true)
      setLoading(false)
    }
  }, [account, isWhitelistAddress])

  const [form] = Form.useForm()
  const [errorMess, setErrorMess] = useState('')
  const [stakingLoading, setStakingLoading] = useState(false)
  const [amount, setAmount] = useState<string | number>('')
  const { callWithGasPrice } = useCallWithGasPrice()
  const { fetchWithCatchTxError } = useCatchTxErrorMessage()
  const contractStaking = useContractStaking()
  const addTransaction = useTransactionAdder()
  const [showCreatePool, setShowCreatePool] = useState(false)
  const [showUpdatePool, setShowUpdatePool] = useState(false)
  const [poolData, setPoolData] = useState(null)
  const handleSubmit = async (values) => {
    const updatePoolParams = {
      poolId: values.poolId,
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
    fetchPoolList()
  }
  const onUpdate = (p) => {
    setPoolData(p)
    setShowUpdatePool(true)
  }
  const [formUpdate] = Form.useForm()
  useEffect(() => {
    if (poolData && showUpdatePool) {
      formUpdate.setFieldsValue({
        poolId: poolData?.id,
        rewardAddress: poolData?.rewardAddress?.id,
        lpAddress: poolData?.stakeAddress?.id,
      })
    }
  }, [poolData])

  const handleSubmitUpdate = async (values) => {
    const updatePoolParams = {
      poolId: values.poolId,
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
    fetchPoolList()
  }

  const maxPoolId = Math.max(...(poolLists?.data?.map((item) => Number(item?.id)) || []))
  return (
    <WStakingList>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <div
          style={{
            fontSize: '24px',
            fontWeight: 500,
            color: 'rgba(0, 0, 0, 0.88)',
          }}
        >
          Pool List
        </div>
        {isOwner && (
          <Button
            scale="sm"
            minWidth={[, '120px']}
            onClick={() => {
              setShowCreatePool(true)
            }}
          >
            Add Pool
          </Button>
        )}
      </div>
      <PackagePoolList stakingList={poolLists.data} onStaking={handleStaking} onUpdate={onUpdate} />
      <Modal
        centered
        title={t('Create pool')}
        open={showCreatePool}
        footer={null}
        onCancel={() => {
          setShowCreatePool(false)
        }}
        style={{
          width: '100%',
          maxWidth: '500px',
        }}
      >
        <Form
          initialValues={{
            poolId: maxPoolId + 1,
          }}
          layout="vertical"
          form={form}
          onFinish={handleSubmit}
        >
          <Row gutter={8}>
            <Col span={24}>
              <Form.Item name="poolId" label="Pool ID" rules={[{ required: true }]} style={{ width: '100%' }}>
                <Input
                  style={{ width: '100%' }}
                  readOnly
                  value={maxPoolId + 1}
                  size="large"
                  placeholder="Pool ID"
                  autoComplete="true"
                />
              </Form.Item>

              <Form.Item name="rewardAddress" label="Reward Address" rules={[{ required: true }]}>
                <Input style={{ width: '100%' }} size="large" placeholder="Address" autoComplete="true" />
              </Form.Item>

              <Form.Item name="lpAddress" label="Stake Address" rules={[{ required: true }]}>
                <Input style={{ width: '100%' }} size="large" placeholder="Address" autoComplete="true" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item className="action" style={{ textAlign: 'center' }}>
            <AntButton
              size="large"
              type="primary"
              htmlType="submit"
              className="primary-button"
              loading={stakingLoading}
            >
              Confirm
            </AntButton>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        centered
        title={t('Update pool')}
        open={showUpdatePool}
        footer={null}
        onCancel={() => {
          setShowUpdatePool(false)
        }}
        style={{
          width: '100%',
          maxWidth: '500px',
        }}
      >
        <Form layout="vertical" form={formUpdate} onFinish={handleSubmitUpdate}>
          <Row gutter={8}>
            <Col span={24}>
              <Form.Item name="poolId" label="Pool ID" rules={[{ required: true }]} style={{ width: '100%' }}>
                <Input readOnly style={{ width: '100%' }} size="large" placeholder="Pool ID" autoComplete="true" />
              </Form.Item>

              <Form.Item name="rewardAddress" label="Reward Address" rules={[{ required: true }]}>
                <Input style={{ width: '100%' }} size="large" placeholder="Address" autoComplete="true" />
              </Form.Item>

              <Form.Item name="lpAddress" label="Stake Address" rules={[{ required: true }]}>
                <Input style={{ width: '100%' }} size="large" placeholder="Address" autoComplete="true" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item className="action" style={{ textAlign: 'center' }}>
            <AntButton
              size="large"
              type="primary"
              htmlType="submit"
              className="primary-button"
              loading={stakingLoading}
            >
              Confirm
            </AntButton>
          </Form.Item>
        </Form>
      </Modal>
    </WStakingList>
  )
}

export default PoolList
