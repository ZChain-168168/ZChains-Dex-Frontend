import BackLink from 'components/BackLink'
import Container from 'components/Layout/Container'
import styled from 'styled-components'
import TableStakingHistory from './components/TableStakingHistory'

const TokenInfoContainer = styled.div`
  padding-bottom: 120px;
`

const TokenInfo: React.FC<React.PropsWithChildren> = () => {
  return (
    <TokenInfoContainer>
      <Container mb={['14px', , '24px']}>
        <BackLink showArrow title="Stake History" href="/staking" />
      </Container>

      <Container mb={['24px', , '48px']}>
        <TableStakingHistory />
      </Container>
    </TokenInfoContainer>
  )
}

export default TokenInfo
