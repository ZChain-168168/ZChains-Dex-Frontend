import { BigNumber } from '@ethersproject/bignumber'
import { SerializedWrappedToken } from '@pancakeswap/token-lists'
import { creditTokens } from '@pancakeswap/tokens'
import { Pool } from '@pancakeswap/uikit'
import Trans from 'components/Trans'
import { VaultKey } from 'state/types'
import { PoolCategory } from './types'

export const MAX_LOCK_DURATION = 31536000
export const UNLOCK_FREE_DURATION = 604800
export const ONE_WEEK_DEFAULT = 604800
export const BOOST_WEIGHT = BigNumber.from('20000000000000')
export const DURATION_FACTOR = BigNumber.from('31536000')

export const vaultPoolConfig = {
  // edit
  // [VaultKey.CakeVaultV1]: {
  //   name: <Trans>Auto CAKE</Trans>,
  //   description: <Trans>Automatic restaking</Trans>,
  //   autoCompoundFrequency: 5000,
  //   gasLimit: 380000,
  //   tokenImage: {
  //     primarySrc: `/images/tokens/${mtvTestnetTokens.cake.address}.svg`,
  //     secondarySrc: '/images/tokens/autorenew.svg',
  //   },
  // },
  [VaultKey.CakeVault]: {
    name: <Trans>Stake MTV</Trans>,
    description: <Trans>Stake, Earn – And more!</Trans>,
    autoCompoundFrequency: 5000,
    gasLimit: 600000,
    tokenImage: {
      // primarySrc: `/images/tokens/${mtvTestnetTokens.cake.address}.svg`,
      secondarySrc: '/images/tokens/autorenew.svg',
    },
  },
  // [VaultKey.CakeFlexibleSideVault]: {
  //   name: <Trans>Flexible CAKE</Trans>,
  //   description: <Trans>Flexible staking on the side.</Trans>,
  //   autoCompoundFrequency: 5000,
  //   gasLimit: 500000,
  //   tokenImage: {
  //     primarySrc: `/images/tokens/${mtvTestnetTokens.cake.address}.svg`,
  //     secondarySrc: '/images/tokens/autorenew.svg',
  //   },
  // },
  // [VaultKey.IfoPool]: {
  //   name: 'IFO CAKE',
  //   description: <Trans>Stake CAKE to participate in IFOs</Trans>,
  //   autoCompoundFrequency: 1,
  //   gasLimit: 500000,
  //   tokenImage: {
  //     primarySrc: `/images/tokens/${mtvTestnetTokens.cake.address}.svg`,
  //     secondarySrc: `/images/tokens/ifo-pool-icon.svg`,
  //   },
  // },
} as const

export const livePools: Pool.SerializedPoolConfig<SerializedWrappedToken>[] = [
  // edit
  {
    sousId: 0,
    stakingToken: creditTokens.usdt,
    earningToken: creditTokens.usdt,
    contractAddress: {
      56: '0xa5f8C5Dbd5F286960b9d90548680aE5ebFf07652',
      97: '0x228E1ae35066E836ad3D0856a31591faB1Fd3d99',
      10435: '0x3dc160f7302bc915e6134b6d963c55eb97c545ae',
      4400: '0x7036EF2bE4e56Ed60058bB3e9D5dB4E62EEB8de3',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerBlock: '0.01022',
    isFinished: false,
  },
  // {
  //   sousId: 1,
  //   stakingToken: creditTokens.usdt,
  //   earningToken:  creditTokens.usdt,
  //   contractAddress: {
  //     56: '0xa5f8C5Dbd5F286960b9d90548680aE5ebFf07652',
  //     97: '',
  //     10435: '0x3dc160f7302bc915e6134b6d963c55eb97c545ae',
  //     4400: '0x7036EF2bE4e56Ed60058bB3e9D5dB4E62EEB8de3',
  //   },
  //   poolCategory: PoolCategory.CORE,
  //   tokenPerBlock: '0.01022',
  //   version: 3,
  // },
  // {
  //   sousId: 2,
  //   stakingToken: mtvTestnetTokens.busdMTVLPs,
  //   earningToken: mtvTestnetTokens.musd,
  //   contractAddress: {
  //     56: '0xaEC63F134a7853C6DaC9BA428d7962cD7C6c5e30',
  //     97: '',
  //     10435: '0xd120ef7cae427e6018046c97d8b61fc900ba9d0a',
  //     4400: '0x7036EF2bE4e56Ed60058bB3e9D5dB4E62EEB8de3',
  //   },
  //   poolCategory: PoolCategory.CORE,
  //   tokenPerBlock: '0.02022',
  //   version: 3,
  // },
].map((p) => ({
  ...p,
  stakingToken: p.stakingToken.serialize,
  earningToken: p.earningToken.serialize,
}))

// known finished pools
const finishedPools = [
  // {
  //   sousId: 310,
  //   stakingToken: bscTokens.cake,
  //   earningToken: bscTokens.champ,
  //   contractAddress: {
  //     56: '0x3B48325b7CA831ca7D5b649B074fF697c66166c3',
  //     97: '',
  //   },
  //   poolCategory: PoolCategory.CORE,
  //   tokenPerBlock: '1.961',
  //   version: 3,
  // },
  // {
  //   sousId: 303,
  //   stakingToken: bscTokens.cake,
  //   earningToken: bscTokens.mgp,
  //   contractAddress: {
  //     56: '0x365F744c8b7608253697cA2Ed561537B65a3438B',
  //     97: '',
  //   },
  //   poolCategory: PoolCategory.CORE,
  //   tokenPerBlock: '6.944',
  //   version: 3,
  //   isFinished: false,
  // },
  // {
  //   sousId: 262,
  //   stakingToken: bscTokens.cake,
  //   earningToken: bscTokens.ach,
  //   contractAddress: {
  //     97: '',
  //     56: '0xD5668e936B951292Ddf8c84553CC58F85948F816',
  //   },
  //   poolCategory: PoolCategory.CORE,
  //   enableEmergencyWithdraw: true,
  //   tokenPerBlock: '7.502',
  // },
].map((p) => ({
  ...p,
  isFinished: true,
  stakingToken: p.stakingToken.serialize,
  earningToken: p.earningToken.serialize,
}))

export default [...livePools, ...finishedPools] as Pool.SerializedPoolConfig<SerializedWrappedToken>[]
