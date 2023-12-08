import { mtvTestnetTokens } from '@pancakeswap/tokens'
import { SerializedFarmConfig } from '@pancakeswap/farms'

const farms: SerializedFarmConfig[] = [ // edit
  /**
   * These 3 farms (PID 0, 2, 3) should always be at the top of the file.
   */
  // {
  //   pid: 0,
  //   lpSymbol: 'CAKE',
  //   lpAddress: '0x99d5BD783eD96Fe81624a16B4f60E2f88f759BfF',
  //   token: mtvTestnetTokens.syrup,
  //   quoteToken: mtvTestnetTokens.cake,
  // },
  {
    pid: 2,
    v1pid: 2,
    lpSymbol: 'USDT-MTV LP',
    lpAddress: '0x60f4343FfD8B94C005588A44e2A0CB0769E002d9',
    token: mtvTestnetTokens.usdt,
    quoteToken: mtvTestnetTokens.wbnb,
    boosted: true,
  },
  {
    pid: 4,
    v1pid: 4,
    lpSymbol: 'BUSD-MTV LP',
    lpAddress: '0xe3843CE4AD68958005f1c3180c894A2ab456Da9b',
    token: mtvTestnetTokens.busd,
    quoteToken: mtvTestnetTokens.wbnb,
    boosted: true,
  }
].map((p) => ({ ...p, token: p.token.serialize, quoteToken: p.quoteToken.serialize }))

export default farms
