import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useStakingListData } from 'state/staking/fetchStakingList'
import { useStakingTotalEarnedContract } from 'state/staking/hooks'
import { useStakingHistory } from 'state/staking/fetchStakingHistory'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useRouter } from 'next/router'
import ModalStaking from '../ModalStaking'
import HeaderStakingList from './HeaderStakingList'
import PackageStakingList from './PackageStakingList'
import useContractStakingConditions from '../../hooks/useContractStakingConditions'
import { useClaimPool } from 'state/staking/fetchPoolList'
import { useGetOwnerStaking, useGetWhiteListAddress } from 'state/admin/hook'
import { Button } from '@pancakeswap/uikit'
import { Col, DatePicker, Form, Input, Modal, Row, Button as AntButton } from 'antd'
import { useTranslation } from '@pancakeswap/localization'
import useCatchTxErrorMessage from 'hooks/useCatchTxErrorMessage'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { useContractStaking } from 'hooks/useContract'
import { useTransactionAdder } from 'state/transactions/hooks'

const WStakingList = styled.div`
  width: 100%;
`

const StakingList: React.FC = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const id = router.query.id
  const { pool } = useClaimPool(id?.toString())
  const { account } = useActiveWeb3React()
  const [modalStaking, setModalStaking] = useState({ open: false, dataModal: null })
  const { stakingList, fetchStakingList } = useStakingListData(Number(id), pool.data?.stakeAddress?.id)

  const { projectFee } = useContractStakingConditions()
  const { stakingHistory } = useStakingHistory(account)
  // const { opvEarned } = useStakingEarn(account, stakingList, stakingHistory)
  const { opvEarned } = useStakingTotalEarnedContract(account, stakingHistory, pool.data?.rewardAddress?.id)

  const handleStaking = (packageItem) => {
    setModalStaking({ open: true, dataModal: packageItem })
  }

  const handleStakingSuccess = useCallback(() => {
    setModalStaking({ open: false, dataModal: null })
    fetchStakingList()
  }, [fetchStakingList])

  const { isWhitelistAddress } = useGetWhiteListAddress(account)
  useEffect(() => {
    setIsOwner(isWhitelistAddress)
    setLoading(false)
  }, [account, isWhitelistAddress])

  const [isOwner, setIsOwner] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showCreatePlan, setShowCreatePlan] = useState(false)
  const [showUpdatePlan, setShowUpdatePlan] = useState(false)
  const [errorMess, setErrorMess] = useState('')
  const [stakingLoading, setStakingLoading] = useState(false)
  const [amount, setAmount] = useState<string | number>('')
  const { callWithGasPrice } = useCallWithGasPrice()
  const { fetchWithCatchTxError } = useCatchTxErrorMessage()
  const contractStaking = useContractStaking()
  const addTransaction = useTransactionAdder()

  const [form] = Form.useForm()
  const [formUpdate] = Form.useForm()

  const handleSubmit = async (values) => {
    const updatePlanParams = {
      poolId: pool.data?.id,
      planId: values?.planId,
      day: values?.day,
      rewardPerSecond: values?.rewardPerSecond,
      maxTotalStake: values?.maxTotalStake,
    }

    setErrorMess('')
    setStakingLoading(true)

    const { txResponse, status, message } = await fetchWithCatchTxError(() =>
      callWithGasPrice(contractStaking, 'updatePlan', [
        updatePlanParams.poolId,
        updatePlanParams.planId,
        updatePlanParams.day,
        updatePlanParams.rewardPerSecond,
        updatePlanParams.maxTotalStake,
      ]),
    )
    setStakingLoading(false)
    if (status) {
      addTransaction(txResponse, {
        summary: `Create plan `,
      })
      setAmount('')
      setShowCreatePlan(false)
      fetchStakingList()
    } else {
      setErrorMess(message)
    }
  }
  const [planData, setPlanData] = useState(null)
  useEffect(() => {
    if (planData && showUpdatePlan) {
      formUpdate.setFieldsValue({
        poolId: pool.data?.id,
        planId: planData?.id?.split('-')[1],
        day: planData?.day,
        rewardPerSecond: planData?.rewardPerSecond,
        maxTotalStake: planData?.maxTotalStake,
      })
    }
  }, [planData])
  const handleSubmitUpdate = async (values) => {
    const updatePlanParams = {
      poolId: pool.data?.id,
      planId: values?.planId,
      day: values?.day,
      rewardPerSecond: values?.rewardPerSecond,
      maxTotalStake: values?.maxTotalStake,
    }
    setErrorMess('')
    setStakingLoading(true)

    const { txResponse, status, message } = await fetchWithCatchTxError(() =>
      callWithGasPrice(contractStaking, 'updatePlan', [
        updatePlanParams.poolId,
        updatePlanParams.planId,
        updatePlanParams.day,
        updatePlanParams.rewardPerSecond,
        updatePlanParams.maxTotalStake,
      ]),
    )
    setStakingLoading(false)
    if (status) {
      addTransaction(txResponse, {
        summary: `Update plan `,
      })
      setAmount('')
      setShowUpdatePlan(false)
      fetchStakingList()
    } else {
      setErrorMess(message)
    }
  }
  const onUpdate = (p) => {
    setPlanData(p)
    setShowUpdatePlan(true)
  }

  const maxPlanId = Math.max(...(stakingList?.map((item) => Number(item?.planId)) || []))

  return (
    <WStakingList>
      <HeaderStakingList opvEarned={opvEarned} pool={pool?.data} />
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
          Plan List
        </div>
        {isOwner && (
          <Button
            scale="sm"
            minWidth={[, '120px']}
            onClick={() => {
              setShowCreatePlan(true)
            }}
          >
            Add Plan
          </Button>
        )}
      </div>
      <PackageStakingList pool={pool?.data} stakingList={stakingList} onStaking={handleStaking} onUpdate={onUpdate} />
      <ModalStaking
        open={modalStaking.open}
        dataModal={modalStaking.dataModal}
        projectFee={projectFee}
        setModalStaking={setModalStaking}
        onStakingSuccess={handleStakingSuccess}
      />

      <Modal
        centered
        title={t('Create plan')}
        open={showCreatePlan}
        footer={null}
        onCancel={() => {
          setShowCreatePlan(false)
        }}
        style={{
          width: '100%',
          maxWidth: '500px',
        }}
      >
        <Form
          initialValues={{
            planId: maxPlanId + 1,
          }}
          layout="vertical"
          form={form}
          onFinish={handleSubmit}
        >
          <Row>
            <Col span={24}>
              <Form.Item
                rules={[{ required: true }]}
                style={{ width: '100%' }}
                name="planId"
                label="Plan ID"
                id="planId"
              >
                <Input size="large" placeholder={`Plan ID`} />
              </Form.Item>

              <Form.Item style={{ width: '100%' }} name="day" label="Periods" rules={[{ required: true }]}>
                <Input size="large" placeholder="Days" autoComplete="true" />
              </Form.Item>
              <Form.Item
                style={{ width: '100%' }}
                name="rewardPerSecond"
                label="Reward Amount per second"
                rules={[{ required: true }]}
              >
                <Input size="large" placeholder="Reward Amount per second" autoComplete="true" />
              </Form.Item>
              <Form.Item
                style={{ width: '100%' }}
                name="maxTotalStake"
                label="Max total stake (Set value to 0 for unlimited staking)"
                rules={[{ required: true }]}
              >
                <Input size="large" placeholder="Max total stake" autoComplete="true" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item className="action" style={{ textAlign: 'center', width: '100%' }}>
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
        title={t('Update plan')}
        open={showUpdatePlan}
        footer={null}
        onCancel={() => {
          setShowUpdatePlan(false)
        }}
        style={{
          width: '100%',
          maxWidth: '500px',
        }}
      >
        <Form layout="vertical" form={formUpdate} onFinish={handleSubmitUpdate}>
          <Row>
            <Col span={24}>
              {/* <Select allowClear size="large" placeholder="Selected Plan">
              {stakingList &&
                stakingList.map((item) => (
                  <Option key={`${item.planId}`} value={`${item.planId}`}>
                    {item.planId}
                  </Option>
                ))}
            </Select> */}
              <Form.Item style={{ width: '100%' }} name="poolId" label="Pool ID" id="poolId">
                <Input readOnly placeholder={`${pool.data?.id}`} />
              </Form.Item>

              <Form.Item style={{ width: '100%' }} name="planId" label="Plan ID" id="planId">
                <Input readOnly placeholder={`${planData?.id?.split('-')[1]}`} />
              </Form.Item>

              <Form.Item style={{ width: '100%' }} name="day" label="Periods" rules={[{ required: true }]}>
                <Input size="large" placeholder="Days" autoComplete="true" />
              </Form.Item>
              <Form.Item
                style={{ width: '100%' }}
                name="rewardPerSecond"
                label="Reward Amount per second"
                rules={[{ required: true }]}
              >
                <Input size="large" placeholder="Reward Amount per second" autoComplete="true" />
              </Form.Item>
              <Form.Item
                style={{ width: '100%' }}
                name="maxTotalStake"
                label="Max total stake (Set value to 0 for unlimited staking)"
                rules={[{ required: true }]}
              >
                <Input size="large" placeholder="Max total stake" autoComplete="true" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item className="action" style={{ textAlign: 'center', width: '100%' }}>
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

export default StakingList
