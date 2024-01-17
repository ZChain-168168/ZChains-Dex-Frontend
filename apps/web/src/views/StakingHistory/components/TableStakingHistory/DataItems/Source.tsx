import React from 'react'
import { Box, Flex, Link, Text } from '@pancakeswap/uikit'

const Source: React.FC<{ record }> = ({ record }) => (
  <Link external href={record.marketUrl}>
    <Flex alignItems="center" style={{ whiteSpace: 'nowrap' }}>
      <Box width={['24px']} height={['24px']} mr="8px">
        <img src={`https://s2.coinmarketcap.com/static/img/exchanges/64x64/${record.exchangeId}.png`} alt="" />
      </Box>
      <Text color="textSubtle" fontWeight="700" fontSize={['13px', , '16px']}>
        {record.exchangeName}
      </Text>
    </Flex>
  </Link>
)

export default Source
