import styled from 'styled-components'
import { Flex, TextGradient, Text, Link, useMatchBreakpoints, OpenNewIcon } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import ConnectWalletButton from 'components/ConnectWalletButton'
import Container from 'components/Layout/Container'
import { useAccount } from 'wagmi'
import { DOCS_URL } from 'config/constants'
import SunburstSvg from './SunburstSvg'
import CompositeImage from './CompositeImage'

const BgWrapper = styled.div`
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
`

const StyledSunburst = styled(SunburstSvg)`
  height: 350%;
  width: 350%;

  ${({ theme }) => theme.mediaQueries.xl} {
    height: 400%;
    width: 400%;
  }
`

const Wrapper = styled(Flex)`
  z-index: 1;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`

const FloatingPancakesWrapper = styled(Container)`
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  visibility: hidden;

  ${({ theme }) => theme.mediaQueries.md} {
    visibility: visible;
  }
`

const TopLeftImgWrapper = styled(Flex)`
  position: absolute;
  left: 20%;
  top: 50%;
  transform: translate(-50%, -50%);
  img {
    width: 60px;
  }
`

const BottomRightImgWrapper = styled(Flex)`
  position: absolute;
  right: 15%;
  top: 50%;
  transform: translate(-50%, -50%);
  img {
    width: 80px;
  }
`

const Footer = () => {
  const { t } = useTranslation()
  const { address: account } = useAccount()
  const { isTablet, isDesktop } = useMatchBreakpoints()

  return (
    <>
      <BgWrapper>
        <Flex alignItems="center" justifyContent="center" width="100%" height="100%">
          <StyledSunburst />
        </Flex>
      </BgWrapper>
      {(isTablet || isDesktop) && (
        <FloatingPancakesWrapper>
          <TopLeftImgWrapper>
            <img src="/images/home/lunar-bunny/light.png" alt="" />
          </TopLeftImgWrapper>
          <BottomRightImgWrapper>
            <img src="/images/home/lunar-bunny/loudspeaker.png" alt="" />
          </BottomRightImgWrapper>
        </FloatingPancakesWrapper>
      )}
      <Wrapper>
        <Text mb="24px" fontSize="32px" textAlign="center">
          {t('Ready for ')}{' '}
          <TextGradient as="span" fontSize="32px">
            TeleportStationManna ?
          </TextGradient>
        </Text>
        <Text textAlign="center" fontSize="16px">
          {t('Connect your crypto wallet to star using the app in seconds.')}
        </Text>
        <Text mb="24px" fontSize="16px">
          No registration needed.
        </Text>
        <Link external href={`${DOCS_URL}`}>
          {t('Learn how to start')}
          <OpenNewIcon color="primary" ml="4px" />
        </Link>
        {!account && <ConnectWalletButton mt="24px" />}
      </Wrapper>
    </>
  )
}

export default Footer
