import styled from 'styled-components'
import { PageSection } from '@pancakeswap/uikit'
import { useAccount } from 'wagmi'
import useTheme from 'hooks/useTheme'
import Container from 'components/Layout/Container'
import { useTranslation } from '@pancakeswap/localization'
import { useActiveChainId } from 'hooks/useActiveChainId'
import Hero from './components/Hero'
import InvesterSection from './components/InvesterSection'
import SalesSection from './components/SalesSection'
import Footer from './components/Footer'

const StyledHeroSection = styled(PageSection)`
  padding-top: 0;

  ${({ theme }) => theme.mediaQueries.md} {
    padding-top: 0;
  }
`

const UserBannerWrapper = styled(Container)`
  z-index: 1;
  position: absolute;
  width: 100%;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  padding-left: 0px;
  padding-right: 0px;

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-left: 24px;
    padding-right: 24px;
  }
`

const Home: React.FC<React.PropsWithChildren> = () => {
  const { theme } = useTheme()
  const { address: account } = useAccount()
  const { chainId } = useActiveChainId()

  return (
    <>
      <style jsx global>
        {`
          // #home-1 .page-bg {
          //   background: linear-gradient(139.73deg, #e6fdff 0%, #f3efff 100%);
          // }
          // [data-theme='dark'] #home-1 .page-bg {
          //   background: radial-gradient(103.12% 50% at 50% 50%, #21193a 0%, #191326 100%);
          // }
          // #home-2 .page-bg {
          //   background: linear-gradient(180deg, #ffffff 22%, #d7caec 100%);
          // }
          // [data-theme='dark'] #home-2 .page-bg {
          //   background: linear-gradient(180deg, #09070c 22%, #201335 100%);
          // }
          // #home-3 .page-bg {
          //   background: linear-gradient(180deg, #b7e7ff 0%, #eaf2f6 100%);
          // }
          // [data-theme='dark'] #home-3 .page-bg {
          //   background: linear-gradient(180deg, #0b4576 0%, #091115 100%);
          // }
          // #home-4 .inner-wedge svg {
          //   fill: #d8cbed;
          // }
          // [data-theme='dark'] #home-4 .inner-wedge svg {
          //   fill: #201335;
          // }
        `}
      </style>
      <StyledHeroSection
        innerProps={{ style: { margin: '0', width: '100%' } }}
        containerProps={{
          id: 'home-1',
        }}
        index={2}
        hasCurvedDivider={false}
      >
        <Hero />
      </StyledHeroSection>
      <PageSection
        innerProps={{ style: { margin: '0 0 48px', width: '100%' } }}
        containerProps={{
          id: 'home-2',
        }}
        index={2}
        hasCurvedDivider={false}
      >
        <InvesterSection />
      </PageSection>
      <PageSection
        innerProps={{ style: { margin: '0', width: '100%', maxWidth: '1200px' } }}
        background={theme.colors.backgroundAlt}
        containerProps={{
          id: 'home-3',
        }}
        index={3}
        hasCurvedDivider={false}
      >
        <SalesSection chainId={chainId} />
      </PageSection>

      <PageSection
        innerProps={{ style: { margin: '48px 0', width: '100%', maxWidth: '1200px' } }}
        background="#fff"
        index={4}
        hasCurvedDivider={false}
      >
        <Footer />
      </PageSection>
    </>
  )
}

export default Home
