import React from 'react'
import { Flex, Text, Box, ArrowDownIcon } from '@pancakeswap/uikit'
import { ChainLogo } from 'components/Logo/ChainLogo'
import styled from 'styled-components'

interface Props {
  data?: any
  onSelect?: () => void
  selectTitle?: string
}

function SelectChain({ data, onSelect, selectTitle }: Props) {
  const { chainid, title } = data

  return (
    <SelectWrap onClick={onSelect}>
      <Text fontSize={14} color="#AEAFB0">
        {selectTitle}
      </Text>
      <Flex p={2} style={{ borderRadius: 10, minWidth: 220 }} alignItems="center" justifyContent="space-between">
        <ChainLogo chainId={chainid} />
        <Text fontSize={14} color="#AEAFB0">
          {title || ' Select Network'}
        </Text>
        <ArrowDownIcon color="#FFFFFF" />
      </Flex>
    </SelectWrap>
  )
}

const SelectWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  svg path {
    fill: #fff;
  }
`

export default SelectChain
