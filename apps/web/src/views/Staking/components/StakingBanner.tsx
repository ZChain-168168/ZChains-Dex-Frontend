import { Box, Text } from '@pancakeswap/uikit'
import styled from 'styled-components'
import CautionImage from '../images/caution.png'

const WStakingBanner = styled.div`
  display: flex;
  padding: 12px 8px;
  background: rgb(53, 54, 60);
  border-radius: 20px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 20px;
  }
`

const StakingBanner = () => {
  return (
    <WStakingBanner>
      <Box maxWidth={32} mr="12px">
        <img src={CautionImage.src} alt="" />
      </Box>
      <Box>
        <Text fontSize={['24px', , ' 32px']} color="text" fontWeight={600} lineHeight="unset" mb="6px">
          Caution:
        </Text>
        <Text fontSize={['12px', , '16px']} color="text" fontWeight={600}>
          - Staked package will not be allowed to cancel until the lock expires.
        </Text>
        <Text fontSize={['12px', , '16px']} color="text" fontWeight={600}>
          - After locking, your CREDIT tokens will be deducted from &#34;Spot&#34; wallet.
        </Text>
        <Text fontSize={['12px', , '16px']} color="text" fontWeight={600}>
          - You can participate in many different &#34;Stake&#34; packages with only one account.
        </Text>
      </Box>
    </WStakingBanner>
  )
}

export default StakingBanner
