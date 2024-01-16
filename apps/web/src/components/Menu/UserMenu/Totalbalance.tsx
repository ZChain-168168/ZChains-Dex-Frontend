import { EyeIcon, EyeSleepIcon, Flex } from '@pancakeswap/uikit'
import { roundNumber } from 'helpers'
import { useOPVBusdPrice } from 'hooks/useBUSDPrice'
import { useGetOpvBalance } from 'hooks/useTokenBalance'
import { useState } from 'react'
import styled from 'styled-components'
import { formatBigNumber } from 'utils/formatBalance'

const WTotalBalance = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 32px;
  min-width: 130px;
  padding: 5px 20px;
  padding-right: 36px;

  background: #f3f3f3;
  border: 0.5px solid #0aadad;
  border-radius: 8px;
  cursor: pointer;
  position: relative;

  svg {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 14px;
    path {
      &:first-child {
        fill: #0aadad;
      }
      &:nth-child(2) {
        fill: #0aadad;
      }
      &:last-child {
        fill: #0aadad;
      }
    }
  }
`

const TotalBalance = ({ ...props }) => {
  const [show, setShow] = useState(false)
  const { balance } = useGetOpvBalance()
  const opvPrice = useOPVBusdPrice({ forceMainnet: true })
  return (
    <WTotalBalance onClick={() => setShow((prev) => !prev)} {...props}>
      <Flex alignItems="center">
        {show ? (
          `${roundNumber(formatBigNumber(balance))} ($${roundNumber(opvPrice)}) OPV`
        ) : (
          <>
            <span>$ </span>********
          </>
        )}
      </Flex>
      {show ? <EyeIcon /> : <EyeSleepIcon />}
    </WTotalBalance>
  )
}

export default TotalBalance
