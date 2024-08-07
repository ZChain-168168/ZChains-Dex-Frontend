import { Flex, Heading, Skeleton, Text, Balance } from '@pancakeswap/uikit'
import cakeAbi from 'config/abi/cake.json'
import { bscTokens } from '@pancakeswap/tokens'
import { useTranslation } from '@pancakeswap/localization'
import { useIntersectionObserver } from '@pancakeswap/hooks'
import { useEffect, useState } from 'react'
import { usePriceCakeBusd } from 'state/farms/hooks'
import styled from 'styled-components'
import { formatBigNumber, formatLocalisedCompactNumber } from '@pancakeswap/utils/formatBalance'
import { multicallv3 } from 'utils/multicall'
import { getCakeVaultAddress } from 'utils/addressHelpers'
import useSWR from 'swr'
import { SLOW_INTERVAL } from 'config/constants'
import cakeVaultV2Abi from 'config/abi/cakeVaultV2.json'
import { BigNumber } from '@ethersproject/bignumber'

const StyledColumn = styled(Flex)<{ noMobileBorder?: boolean; noDesktopBorder?: boolean }>`
  align-items: center;
  flex-direction: column;
  justify-content: center;
  row-gap: 12px;

  background: #fff;
  padding: 24px;
  border-radius: 12px;
  img {
    width: 24px;
    height: 24px;
  }
`

const Grid = styled.div`
  z-index: 10;
  display: grid;
  grid-gap: 16px 8px;
  margin-top: 24px;
  grid-template-columns: repeat(2, auto);
  grid-template-areas:
    'a b'
    'c d';

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-gap: 16px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-areas: 'a b c d';
    grid-gap: 32px;
    grid-template-columns: repeat(4, auto);
  }
`

const emissionsPerBlock = 9.9

/**
 * User (Planet Finance) built a contract on top of our original manual CAKE pool,
 * but the contract was written in such a way that when we performed the migration from Masterchef v1 to v2, the tokens were stuck.
 * These stuck tokens are forever gone (see their medium post) and can be considered out of circulation."
 * https://planetfinanceio.medium.com/MetaViral-works-with-planet-to-help-cake-holders-f0d253b435af
 * https://twitter.com/MetaViral/status/1523913527626702849
 * https://bscscan.com/tx/0xd5ffea4d9925d2f79249a4ce05efd4459ed179152ea5072a2df73cd4b9e88ba7
 */
const planetFinanceBurnedTokensWei = BigNumber.from('637407922445268000000000')
const cakeVaultAddress = getCakeVaultAddress()

const CakeDataRow = () => {
  const { t } = useTranslation()
  const { observerRef, isIntersecting } = useIntersectionObserver()
  const [loadData, setLoadData] = useState(false)
  const {
    data: { cakeSupply, burnedBalance, circulatingSupply } = {
      cakeSupply: 0,
      burnedBalance: 0,
      circulatingSupply: 0,
    },
  } = useSWR(
    loadData ? ['cakeDataRow'] : null,
    async () => {
      const totalSupplyCall = { abi: cakeAbi, address: bscTokens.cake.address, name: 'totalSupply' }
      const burnedTokenCall = {
        abi: cakeAbi,
        address: bscTokens.cake.address,
        name: 'balanceOf',
        params: ['0x000000000000000000000000000000000000dEaD'],
      }
      const cakeVaultCall = {
        abi: cakeVaultV2Abi,
        address: cakeVaultAddress,
        name: 'totalLockedAmount',
      }

      const [[totalSupply], [burned], [totalLockedAmount]] = await multicallv3({
        calls: [totalSupplyCall, burnedTokenCall, cakeVaultCall],
        allowFailure: true,
      })
      const totalBurned = planetFinanceBurnedTokensWei.add(burned)
      const circulating = totalSupply.sub(totalBurned.add(totalLockedAmount))

      return {
        cakeSupply: totalSupply && burned ? +formatBigNumber(totalSupply.sub(totalBurned)) : 0,
        burnedBalance: burned ? +formatBigNumber(totalBurned) : 0,
        circulatingSupply: circulating ? +formatBigNumber(circulating) : 0,
      }
    },
    {
      refreshInterval: SLOW_INTERVAL,
    },
  )
  const cakePriceBusd = usePriceCakeBusd()
  const mcap = cakePriceBusd.times(circulatingSupply)
  const mcapString = formatLocalisedCompactNumber(mcap.toNumber())

  useEffect(() => {
    if (isIntersecting) {
      setLoadData(true)
    }
  }, [isIntersecting])

  return (
    <Grid>
      <StyledColumn noMobileBorder style={{ gridArea: '1' }}>
        <img src="/images/home/lunar-bunny/mini-house.png" alt="" />
        <Text textAlign="center">{t('Total supply')}</Text>
        {cakeSupply ? (
          <Balance decimals={0} lineHeight="1.1" fontSize="24px" fontWeight="500" value={cakeSupply} textAlign="center" />
        ) : (
          <>
            <div ref={observerRef} />
            <Skeleton height={24} width={126} my="4px" />
          </>
        )}
      </StyledColumn>
      <StyledColumn noDesktopBorder style={{ gridArea: 'b' }}>
        <img src="/images/home/lunar-bunny/marketcap.png" alt="" />
        <Text textAlign="center">{t('Market cap')}</Text>
        {mcap?.gt(0) && mcapString ? (
          <Heading  color="primary" scale="lg" textAlign="center">
            {t('$%marketCap%', { marketCap: mcapString })}
          </Heading>
        ) : (
          <Skeleton height={24} width={126} my="4px" />
        )}
      </StyledColumn>
      <StyledColumn style={{ gridArea: 'c' }}>
        <img src="/images/home/lunar-bunny/time-burn.png" alt="" />
        <Text textAlign="center">{t('Burned to date')}</Text>
        {burnedBalance ? (
          <Balance decimals={0} lineHeight="1.1" fontSize="24px" fontWeight="500" value={burnedBalance} textAlign="center" />
        ) : (
          <Skeleton height={24} width={126} my="4px" />
        )}
      </StyledColumn>

      <StyledColumn style={{ gridArea: 'd' }}>
        <img src="/images/home/lunar-bunny/emission.png" alt="" />
        <Text textAlign="center">{t('Current emissions')}</Text>

        <Heading color="primary" scale="lg">{t('%cakeEmissions%/block', { cakeEmissions: emissionsPerBlock })}</Heading>
      </StyledColumn>

      {/* <Flex flexDirection="column" style={{ gridArea: 'a' }}>
        <Text color="textSubtle">{t('Circulating Supply')}</Text>
        {circulatingSupply ? (
          <Balance decimals={0} lineHeight="1.1" fontSize="24px" fontWeight="500" value={circulatingSupply} textAlign="center" />
        ) : (
          <Skeleton height={24} width={126} my="4px" />
        )}
      </Flex>
      <StyledColumn noMobileBorder style={{ gridArea: 'c' }}>
        <Text color="textSubtle">{t('Max Supply')}</Text>

        <Balance decimals={0} lineHeight="1.1" fontSize="24px" fontWeight="500" value={750000000} textAlign="center" />
      </StyledColumn> */}
    </Grid>
  )
}

export default CakeDataRow
