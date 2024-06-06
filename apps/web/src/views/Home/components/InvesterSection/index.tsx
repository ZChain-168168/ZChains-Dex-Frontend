import { Flex, Text, Box, Button } from '@pancakeswap/uikit'

const InvesterSection = () => {
  return (
    <Flex flexDirection="column">
      <Flex
        flexDirection={['column-reverse', null, null, 'row']}
        alignItems={['flex-end', null, null, 'center']}
        justifyContent="center"
      >
        <Flex
          flexDirection="column"
          flex="1"
          ml={[null, null, null, null]}
          mr={[null, null, null, '64px']}
          alignSelf={['flex-start', null, null, 'center']}
        >
          <Text mb="24px" fontSize="32px">
            Becoming an Investor
          </Text>
          <Text mb="24px" fontSize="16px">
            So investors using the{' '}
            <Text as="span" color="primary">
              zChain
            </Text>{' '}
            platform just in your grasp get attractive benefits
          </Text>
          <Box maxWidth="400px" mt="24px">
            <img src="/images/home/lunar-bunny/investor.png" alt="" />
          </Box>
        </Flex>
        <Flex flexDirection="column" flex="1" ml={[null, null, null, null]} mr={[null, null, null, '64px']}>
          <Box maxWidth="400px" mb="32px">
            <img src="/images/home/lunar-bunny/piglet-money.png" alt="" />
          </Box>
          <Text mb="24px" fontSize={['24px', , '32px']}>
            High Passive Income
          </Text>
          <Text mb="24px" fontSize={['12px', , '16px']}>
            So investors using the{' '}
            <Text as="span" color="primary">
              zChain
            </Text>{' '}
            platform just in your grasp get attractive benefits
          </Text>
          <Flex>
            <Button scale="sm">Explore</Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default InvesterSection
