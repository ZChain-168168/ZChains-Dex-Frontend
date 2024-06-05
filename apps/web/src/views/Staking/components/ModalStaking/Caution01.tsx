import { Box, Text } from '@pancakeswap/uikit'
import styled from 'styled-components'
import CautionImage from '../../images/caution.png'

const WCaution01 = styled.div`
  display: flex;
  padding: 12px 8px;
  background: #bbbbbb;
  border-radius: 20px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 20px;
  }
`

const Caution01 = () => {
  return (
    <WCaution01>
      <Box maxWidth={24} mr="6px">
        <img src={CautionImage.src} alt="" />
      </Box>
      <Box>
        <Text fontSize="12px" color="#000" fontWeight={700} lineHeight="unset" mb="2px">
          Caution:
        </Text>
        <Text fontSize="12px" color="#000" fontWeight={600}>
          - Staked package will not be allowed to cancel until the lock expires.
        </Text>
        <Text fontSize="12px" color="#000" fontWeight={600}>
          - After locking, your ZCD tokens will be deducted from &#34;Spot&#34; wallet.
        </Text>
        <Text fontSize="12px" color="#000" fontWeight={600}>
          - You can participate in many different &#34;Stake&#34; packages with only one account.
        </Text>
      </Box>
    </WCaution01>
  )
}

export default Caution01
