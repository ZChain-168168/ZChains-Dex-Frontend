import { useState } from 'react'
import { useTranslation } from '@pancakeswap/localization'
import { Box, Checkbox, Flex, Modal, Text, Button } from '@pancakeswap/uikit'
import { formatDate, isNumber, roundNumber } from 'helpers'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import useCatchTxErrorMessage from 'hooks/useCatchTxErrorMessage'
import { useContractStaking } from 'hooks/useContract'
import { StakingHistory } from 'state/staking/types'
import { useTransactionAdder } from 'state/transactions/hooks'
import styled from 'styled-components'
import { toLocaleString } from 'utils'
import useContractStakingConditions from 'views/Staking/hooks/useContractStakingConditions'
import { useStakingEarned } from 'state/staking/hooks'
import FormatAmount from 'components/FormatAmount'
import Amount from '../TableStakingHistory/DataItems/Amount'

const WStyledModal = styled.div`
  padding: 24px;
  background: #eefbff;
  .modal-history-steps {
    max-width: 400px;
    margin: 0 auto 10px;
    li {
      position: relative;
      padding-left: 34px;
      margin-bottom: 24px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      &::before {
        content: '';
        font-weight: 700;
        font-size: 14px;
        line-height: 21px;
        height: 17px;
        width: 17px;
        background: #0074a6;
        display: flex;
        justify-content: center;
        border-radius: 50%;
        position: absolute;
        z-index: 1;
        left: 0;
        top: 0;
      }
      &:not(:last-child)::after {
        content: '';
        position: absolute;
        left: 8px;
        top: 16px;

        width: 1px;
        height: 30px;
        background: #0074a6;
        z-index: 1;
      }

      p {
        font-size: 14px;
        font-weight: 700;
        margin-bottom: 0;
        @media (min-width: 768px) {
          font-size: 16px;
        }
        &:last-child {
          font-size: 14px;
          font-weight: 400;
        }
      }
    }
  }
  .modal-info-stake {
    max-width: 400px;
    margin: 0 auto 20px;
  }
`

interface Props {
  title?: string
  dataModal?: any
  onDismiss?: () => void
}

function ModalDetailUnstake({ title, dataModal, onDismiss, ...props }: Props) {
  const { t } = useTranslation()
  const { account } = useActiveWeb3React()
  const [isAgreementChecked, setIsAgreementChecked] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMess, setErrorMess] = useState('')

  const contractStaking = useContractStaking()
  const { projectFee } = useContractStakingConditions()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { fetchWithCatchTxError } = useCatchTxErrorMessage()

  const addTransaction = useTransactionAdder()

  const handleClaim = async () => {
    if (!account) return false
    if (!contractStaking || !isNumber(projectFee)) return false
    if (!isAgreementChecked) {
      setErrorMess(t('Please check to agree TELEPORT Staking Service Agreement'))
      return false
    }

    const paramsWithdraw = {
      start: dataModal.start * 1000,
      feeBnb: toLocaleString(projectFee * 1e18),
    }

    setErrorMess('')
    setLoading(true)
    const { txResponse, status, message } = await fetchWithCatchTxError(() =>
      callWithGasPrice(contractStaking, 'withdraw', [paramsWithdraw.start], {
        value: paramsWithdraw.feeBnb,
      }),
    )
    setLoading(false)
    if (status) {
      addTransaction(txResponse, {
        summary: `Unstake package success`,
      })
      onDismiss()
    } else {
      setErrorMess(message)
    }

    return false
  }

  const { opvEarned } = useStakingEarned(account, dataModal?.start)

  return (
    <Modal title={title} headerBackground="#EEFBFF" bodyPadding="0" onDismiss={onDismiss} maxWidth={500} {...props}>
      <WStyledModal>
        <ul className="modal-history-steps">
          <li>
            <p>Stake Date</p>
            <p>{dataModal ? formatDate(dataModal?.start * 1000, 'YYYY/MM/DD') : '--'}</p>
          </li>
          <li>
            <p>Value Date</p>
            <p>{dataModal ? formatDate(dataModal?.start * 1000, 'YYYY/MM/DD') : '--'}</p>
          </li>
          <li>
            <p>End Date</p>
            <p>{dataModal ? formatDate(dataModal?.finish * 1000, 'YYYY/MM/DD') : '--'}</p>
          </li>
        </ul>
        <div className="modal-info-stake">
          <Flex justifyContent="space-between" mb="10px">
            <Text fontWeight="700">{dataModal?.staking?.pool?.stakeAddress?.symbol} Staked</Text>
            <Text color="textSubtle" fontWeight="600">
              <Amount
                value={roundNumber(dataModal?.amount / 1e18, { scale: 9, scaleSmall: 9 })}
                suffix={` ${dataModal?.staking?.pool?.stakeAddress?.symbol}`}
              />
            </Text>
          </Flex>
          <Flex justifyContent="space-between">
            <Text fontWeight="700">{dataModal?.staking?.pool?.rewardAddress?.symbol} Earn</Text>
            <Text color="textSubtle" fontWeight="600">
              <FormatAmount
                value={roundNumber(opvEarned, { scale: 6, scaleSmall: 3 })}
                suffix={` ${dataModal?.staking?.pool?.rewardAddress?.symbol}`}
                nullValue="--"
              />
            </Text>
          </Flex>
        </div>

        <Box
          background="rgba(0,0,0,0.1)"
          maxWidth="400px"
          margin="0 auto"
          p="10px 20px"
          borderRadius="12px"
          mb={errorMess ? '16px' : '32px'}
        >
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
        <Box maxWidth="400px" margin="0 auto 16px">
          <Text color="red" fontSize="13px" textAlign="center">
            {errorMess}
          </Text>
        </Box>
        <Flex justifyContent="center">
          <Button isLoading={loading} disabled={loading} onClick={handleClaim}>
            Claim
          </Button>
        </Flex>
      </WStyledModal>
    </Modal>
  )
}

export default ModalDetailUnstake
