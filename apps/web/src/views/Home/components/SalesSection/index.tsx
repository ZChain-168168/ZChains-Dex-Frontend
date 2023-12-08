import { Flex, Text, TextGradient, Button } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { useTranslation } from '@pancakeswap/localization'
import CustomEndLine from '../CustomEndLine'
import CakeDataRow from '../CakeDataRow'

const CustomSaleSection = styled(Flex)`
  position: relative;
  .right-bg {
    max-width: 400px;
    position: absolute;
    right: 0;
    display: none;
    ${({ theme }) => theme.mediaQueries.md} {
      display: block;
    }
  }
`

const SalesSection: React.FC<{ chainId: number }> = ({ chainId }) => {
  const { t } = useTranslation()
  return (
    <CustomSaleSection flexDirection="column">
      <img className="right-bg" src="/images/home/lunar-bunny/phone-shop.png" alt="" />
      <Flex
        flexDirection={['column-reverse', null, null, 'row']}
        alignItems={['flex-end', null, null, 'center']}
        justifyContent="center"
        style={{ zIndex: 10 }}
      >
        <Flex
          flexDirection="column"
          flex="1"
          ml={[null, null, null, null]}
          mr={[null, null, null, '64px']}
          alignSelf={['flex-start', null, null, 'center']}
        >
          <Text mb="24px" fontSize="32px">
            <TextGradient as="span" fontSize={['32px', , '32px']}>
              {t('MetaViralManna ')}{' '}
            </TextGradient>
            <Text fontSize="32px">
              Community Vote
            </Text>
          </Text>
          <Text mb="24px" fontSize="16px">
            <Text as="span" >
              MetaViralManna
            </Text>{' '}
            is governed by it’s community members who can create & vote important proposals
          </Text>
          <Flex>
            <Button scale="sm">Buy MTN</Button>
          </Flex>
          <CustomEndLine />
        </Flex>
        <Flex flexDirection="column" flex="1" ml={[null, null, null, null]} mr={[null, null, null, '64px']} />
      </Flex>
      <Flex mt="32px">
        <CakeDataRow />
      </Flex>
    </CustomSaleSection>
  )
}

export default SalesSection
