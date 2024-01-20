import React, { useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { Box, Button, Checkbox, Flex, Grid, Skeleton, Text } from '@pancakeswap/uikit'
import { Currency, CurrencyAmount } from '@pancakeswap/sdk'
import { Modal } from 'antd'
import { useContractStaking } from 'hooks/useContract'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { toLocaleString } from 'utils'
import { StakingItemType } from 'state/staking/types'
import { isNumber } from 'helpers'
import { useTranslation } from '@pancakeswap/localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useTransactionAdder } from 'state/transactions/hooks'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import { TOKEN_ADDRESS } from 'config'
import { useCurrency } from 'hooks/Tokens'
import tryParseAmount from '@pancakeswap/utils/tryParseAmount'
import Dots from 'components/Loader/Dots'
import { useGetOpvBalance } from 'hooks/useTokenBalance'
import { FetchStatus } from 'config/constants/types'
import { formatBigNumber } from 'utils/formatBalance'
import useCatchTxErrorMessage from 'hooks/useCatchTxErrorMessage'
import Caution01 from './Caution01'
import StakingInput from './StakingInput'
import CautionImage from '../../images/caution.png'

const GlobalStyleModalStaking = createGlobalStyle`
  .ant-modal-content {
    background: #FFFFFF; 
    border-radius: 20px;  
    overflow: hidden;
    .ant-modal-close-x {
      span {
        color: Red;
      }
    }
    .ant-modal-body {
      padding: 0;
    }
  }
`
const WModalStakingContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  }
  .modal-staking-left {
    flex: 1 1 100%;
    max-width: 100%;
    padding: 24px 12px;
    ${({ theme }) => theme.mediaQueries.md} {
      padding: 24px;
      flex: 1 1 55%;
      max-width: 55%;
    }
  }
  .modal-staking-right {
    flex: 1 1 100%;
    max-width: 100%;
    padding: 12px 12px 24px;
    background: #eefbff;
    ${({ theme }) => theme.mediaQueries.md} {
      padding: 24px;
      flex: 1 1 45%;
      max-width: 45%;
    }
  }
`
const InputRightNode = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  .divider {
    width: 2px;
    height: 16px;
    margin: 0 16px;
    background: #000;
  }
`
interface Props {
  open?: boolean
  dataModal?: StakingItemType
  projectFee?: number
  setModalStaking?: (p: any) => void
  onStakingSuccess: () => void
}
const ModalStaking: React.FC<Props> = ({
  open,
  dataModal,
  projectFee,
  setModalStaking,
  onStakingSuccess,
  ...props
}) => {
  const { t } = useTranslation()

  const [errorMess, setErrorMess] = useState('')
  const [isAgreementChecked, setIsAgreementChecked] = useState(false)
  const [amount, setAmount] = useState<string | number>('')
  const [stakingLoading, setStakingLoading] = useState(false)

  const contractStaking = useContractStaking()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { fetchWithCatchTxError } = useCatchTxErrorMessage()

  const { account } = useActiveWeb3React()
  const addTransaction = useTransactionAdder()

  const { balance: opvBalance, fetchStatus: opvFetchStatus } = useGetOpvBalance()

  // w currency
  const currencyOpv = useCurrency(TOKEN_ADDRESS)
  // amounts
  const independentAmount: CurrencyAmount<Currency> | undefined = tryParseAmount(`${amount}`, currencyOpv)
  const [approveState, approveCallback] = useApproveCallback(independentAmount, contractStaking?.address)

  const onPurchase = async () => {
    if (!account) return false
    if (!contractStaking || !dataModal || !isNumber(projectFee)) return false
    if (!amount || +amount <= 0) {
      setErrorMess(t('Please enter amount'))
      return false
    }
    if (+amount > +formatBigNumber(opvBalance, 3)) {
      setErrorMess(t('Amount is not enough'))
      return false
    }
    if (!isAgreementChecked) {
      setErrorMess(t('Please check to agree OPENLIVE Staking Service Agreement'))
      return false
    }

    const stakingParams = {
      poolId: dataModal.poolId,
      planId: dataModal.planId,
      feeBnb: toLocaleString(projectFee * 1e18),
      amount: toLocaleString(+amount * 1e18),
    }

    setErrorMess('')
    setStakingLoading(true)
    const { txResponse, status, message } = await fetchWithCatchTxError(() =>
      callWithGasPrice(contractStaking, 'invest', [stakingParams.poolId, stakingParams.planId, stakingParams.amount], {
        value: stakingParams.feeBnb,
      }),
    )
    setStakingLoading(false)
    if (status) {
      addTransaction(txResponse, {
        summary: `Staking: ${dataModal.time} days with ${amount} CREDIT`,
      })
      onStakingSuccess()
      setAmount('')
    } else {
      setErrorMess(message)
    }

    return false
  }

  const handleMaxAmount = () => {
    setAmount(formatBigNumber(opvBalance, 3))
  }
  return (
    <Modal
      open={open}
      width={1000}
      className="modal-staking"
      centered
      footer={false}
      onCancel={() => {
        setModalStaking({ open: false, dataModal: null })
        setAmount('')
      }}
      {...props}
    >
      <GlobalStyleModalStaking />
      <WModalStakingContent>
        <div className="modal-staking-left">
          <Text
            as="h2"
            color="#000"
            fontSize={['16px', , '24px']}
            fontWeight="700"
            pb="4px"
            mb="24px"
            style={{ borderBottom: '1px solid #333' }}
          >
            CREDIT Staking
          </Text>
          <div className="modal-staking-left-body">
            <Caution01 />
            <Flex justifyContent="flex-end" mt="12px">
              <Text fontSize={['12px', , '16px']}>Defi Staking Timeline</Text>
            </Flex>
            <Box mb="16px">
              <Text mb="5px" bold fontSize={['12px', , '16px']}>
                Type
              </Text>
              <StakingInput readOnly value={`${dataModal?.time} Days`} style={{ textAlign: 'center' }} />
            </Box>
            <Box mb="24px">
              <Flex justifyContent="space-between">
                <Text mb="5px" bold fontSize={['12px', , '16px']}>
                  Lock Amount
                </Text>
                {opvFetchStatus !== FetchStatus.Fetched ? (
                  <Skeleton height="22px" width="60px" />
                ) : (
                  <Text fontSize={['12px', , '16px']}>Available amount: {formatBigNumber(opvBalance, 3)} CREDIT</Text>
                )}
              </Flex>
              <StakingInput
                placeHolder="Enter amount"
                value={amount}
                rightNode={
                  <InputRightNode className="">
                    <Text>CREDIT</Text>
                    <span className="divider" />
                    <Button scale="xs" onClick={handleMaxAmount}>
                      Max
                    </Button>
                  </InputRightNode>
                }
                onChange={(v) => setAmount(v)}
              />
            </Box>
            <Text bold fontSize={['12px', , '16px']}>
              Lock Amount Limitation
            </Text>
            <Grid gridTemplateColumns={['1fr', , '1fr 1fr']}>
              <Text fontSize={['12px', , '16px']}>Minium: {dataModal?.min || '--'} CREDIT</Text>
              {/* <Text fontSize={['12px', , '16px']}>Maximum: {dataModal?.max || '--'} OPV</Text> */}
            </Grid>
          </div>
        </div>
        <div className="modal-staking-right">
          <Text
            as="h2"
            color="#000"
            fontSize={['16px', , '24px']}
            fontWeight="700"
            pb="4px"
            mb={['12px', , '24px']}
            style={{ borderBottom: '1px solid rgba(0,0,0,0)' }}
          >
            Summary
          </Text>
          <div className="modal-staking-right-body">
            <Flex justifyContent="space-between" mb="6px">
              <Text fontSize={['12px', , '16px']}>Redemption Period</Text>
              <Text bold fontSize={['12px', , '16px']}>
                {dataModal?.time} Days
              </Text>
            </Flex>
            <Flex justifyContent="space-between" mb="6px">
              <Text fontSize={['12px', , '16px']}>Interest Period</Text>
              <Text bold fontSize={['12px', , '16px']}>
                1 Days
              </Text>
            </Flex>
            <Flex justifyContent="space-between" mb="24px">
              <Text fontSize={['12px', , '16px']}>Est.APR</Text>
              <Text bold color="#46D79E" fontSize={['12px', , '16px']}>
                {dataModal?.apr} %
              </Text>
            </Flex>
            <Box background="#BBBBBB" borderRadius="12px" p="12px">
              <Flex>
                <Box maxWidth={24} mr="6px">
                  <img src={CautionImage.src} alt="" />
                </Box>
                <Text color="#fff" fontSize={['12px', , ' 12px']}>
                  The APR is adjusted daily based on the on-chain staking rewards, and the specific APR is subject to
                  the page display on the day.
                </Text>
              </Flex>
            </Box>
            <Flex justifyContent="flex-end">
              <Text fontSize={['8px', '12px']} mt="6px">
                *Check holding assets under Wallet - Earn - Defi Staking
              </Text>
            </Flex>

            <Text
              color="red"
              fontSize={['12px', , ' 14px']}
              minHeight={['30px', , '60px']}
              width="100%"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {errorMess}
            </Text>

            <Box background="#DFDDDD" borderRadius="12px" p="12px 16px">
              <Flex>
                <Box>
                  <Checkbox
                    checked={isAgreementChecked}
                    onChange={(e) => {
                      setIsAgreementChecked(e.target.checked)
                    }}
                  />
                </Box>
                <Text fontSize={['12px', , ' 14px']} pl="10px">
                  I have read and I agree to TELEPORT Staking Service Agreement
                </Text>
              </Flex>
            </Box>

            <Flex mt="16px" justifyContent="center">
              {(() => {
                if (!account)
                  return (
                    <ConnectWalletButton onClick={() => setModalStaking({ open: false })}>Connect</ConnectWalletButton>
                  )
                if (
                  approveState === ApprovalState.NOT_APPROVED ||
                  approveState === ApprovalState.PENDING ||
                  approveState === ApprovalState.UNKNOWN
                ) {
                  return (
                    <Button width="100%" onClick={approveCallback} disabled={approveState === ApprovalState.PENDING}>
                      {approveState === ApprovalState.PENDING ? <Dots>{t('Enabling')}</Dots> : t('Enabling')}
                    </Button>
                  )
                }
                return (
                  <Button
                    width="100%"
                    scale="md"
                    isLoading={stakingLoading}
                    disabled={stakingLoading}
                    onClick={onPurchase}
                  >
                    Confirm Purchase
                  </Button>
                )
              })()}
            </Flex>
          </div>
        </div>
      </WModalStakingContent>
    </Modal>
  )
}

export default React.memo(ModalStaking)
