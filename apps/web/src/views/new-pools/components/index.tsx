import Container from 'components/Layout/Container'
import { PageMeta } from 'components/Layout/Page'
import styled from 'styled-components'
import StakingBanner from 'views/Staking/components/StakingBanner'
import PoolList from './PoolList'

const WStaking = styled.div`
  margin-top: 40px;
`

const Pools = () => {
  return (
    <WStaking>
      <PageMeta />

      <Container>
        <StakingBanner />
      </Container>

      <Container>
        <PoolList />
      </Container>
    </WStaking>
  )
}

export default Pools
