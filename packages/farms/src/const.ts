import { FixedNumber } from '@ethersproject/bignumber'

export const FIXED_ZERO = FixedNumber.from(0)
export const FIXED_ONE = FixedNumber.from(1)
export const FIXED_TWO = FixedNumber.from(2)

export const FARM_AUCTION_HOSTING_IN_SECONDS = 691200

export const masterChefAddresses = { // edit
  97: '0xB4A466911556e39210a6bB2FaECBB59E4eB7E43d',
  56: '0xa5f8C5Dbd5F286960b9d90548680aE5ebFf07652',
  10435: '0x6581c83E6De689553A7ea6E7be916d838989ec10',
}

// if not masterChefAddresses else using vault, only usesing at fetchPublicFarmsData => nonBSCVaultAddresses[chainId]
export const nonBSCVaultAddresses = {  // edit
  56: '0xE6c904424417D03451fADd6E3f5b6c26BcC43841', // Only for pass contracts test
  1: '0x2e71B2688019ebdFDdE5A45e6921aaebb15b25fb',
  5: '0xE6c904424417D03451fADd6E3f5b6c26BcC43841',
  10435: '0x6581c83E6De689553A7ea6E7be916d838989ec10',
}
