import styled from 'styled-components'
import CurrencyFormat from 'react-currency-format'
import { Col, Row } from 'antd'
import { Button, Flex, Link, Skeleton, Text } from '@pancakeswap/uikit'
import { useGetOpvBalance } from 'hooks/useTokenBalance'
import { formatBigNumber } from 'utils/formatBalance'
import { FetchStatus } from 'config/constants/types'
import { useTotalStaked } from 'state/staking/fetchTotalStaked'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useRouter } from 'next/router'
import { roundNumber } from 'helpers'
import BigNumber from 'bignumber.js'

const WHeaderStakingList = styled.div`
  width: 100%;
  padding: 14px 0 24px;
  ${({ theme }) => theme.mediaQueries.md} {
    padding: 30px 0;
  }
  .card-info-item {
    margin-right: 20px;
    &:last-child {
      margin-right: 60px;
    }
  }
`
const WCardInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 49px;
  padding: 10px 14px;
  background: #eefbff;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
`
const WButtonHistory = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;

  a,
  button {
    width: 100%;
    ${({ theme }) => theme.mediaQueries.md} {
      width: fit-content;
    }
  }
`

const HeaderStakingList = ({ opvEarned, pool }) => {
  const { account } = useActiveWeb3React()
  const { balance, fetchStatus } = useGetOpvBalance(pool?.stakeAddress?.id)
  const { totalStaked } = useTotalStaked(account, pool?.stakeAddress?.id)
  const router = useRouter()

  return (
    <WHeaderStakingList>
      <Row
        gutter={[
          { xs: 12, sm: 16, md: 24 },
          { xs: 12, sm: 16, md: 24 },
        ]}
      >
        <Col xs={24} sm={12} md={6}>
          <WCardInfo className="card-info-item">
            <Text fontSize={['13px', , '13px']} fontWeight={600} style={{ whiteSpace: 'nowrap' }}>
              {pool?.stakeAddress?.symbol || 'CREDIT'} AVAILABLE
            </Text>
            <Text fontSize={['13px', , '13px']} ellipsis fontWeight={600} style={{ whiteSpace: 'nowrap' }}>
              <CurrencyFormat
                value={fetchStatus === FetchStatus.Fetched ? formatBigNumber(balance, 3) : 0}
                displayType="text"
                thousandSeparator
                renderText={(t) => t}
              />
            </Text>
          </WCardInfo>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <WCardInfo className="card-info-item">
            <Text fontSize={['13px', , '13px']} fontWeight={600} style={{ whiteSpace: 'nowrap' }}>
              CURRENT {pool?.stakeAddress?.symbol || 'CREDIT'} STAKING
            </Text>
            <Text fontSize={['13px', , '13px']} fontWeight={600}>
              <CurrencyFormat
                value={roundNumber(new BigNumber(pool?.totalStaked).shiftedBy(-18).toNumber()) || 0}
                displayType="text"
                thousandSeparator
                renderText={(t) => t}
              />
            </Text>
          </WCardInfo>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <WCardInfo className="card-info-item">
            <Text fontSize={['13px', , '13px']} fontWeight={600} style={{ whiteSpace: 'nowrap' }}>
              {pool?.stakeAddress?.symbol || 'CREDIT'} EARNED
            </Text>
            <Text fontSize={['13px', , '13px']} fontWeight={600}>
              <CurrencyFormat value={opvEarned || 0} displayType="text" thousandSeparator renderText={(t) => t} />
            </Text>
          </WCardInfo>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <WButtonHistory>
            <Button
              onClick={() => {
                router.push('/new-staking/history')
              }}
            >
              History
            </Button>
          </WButtonHistory>
        </Col>
      </Row>
      <div style={{ height: 12 }} />
      {/* <Row
        gutter={[
          { xs: 12, sm: 16, md: 24 },
          { xs: 12, sm: 16, md: 24 },
        ]}
      >
        <Col xs={24} sm={24} md={12}>
          <WCardInfo className="card-info-item">
            <Text fontSize={['13px', , '13px']} fontWeight={600} style={{ whiteSpace: 'nowrap' }}>
              Commission AVAILABLE
            </Text>
            <Text fontSize={['13px', , '13px']} fontWeight={600} style={{ whiteSpace: 'nowrap' }}>
              <CurrencyFormat
                value={fetchStatus === FetchStatus.Fetched ? formatBigNumber(balance, 3) : 0}
                displayType="text"
                thousandSeparator
                renderText={(t) => t}
              />
            </Text>
          </WCardInfo>
        </Col>
        <Col xs={24} sm={12} md={12}>
          <WButtonHistory>

            <Button>Claim</Button>
          </WButtonHistory>
        </Col>
      </Row> */}
    </WHeaderStakingList>
  )
}

export default HeaderStakingList
