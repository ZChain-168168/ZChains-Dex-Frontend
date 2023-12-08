import { mtvTestnetTokens } from '@pancakeswap/tokens'
import { SerializedFarmConfig } from '../../types'

const priceHelperLps: SerializedFarmConfig[] = [ // edit earn MUSD = MUSD helper
  /**
   * These LPs are just used to help with price calculation for MasterChef LPs (farms.ts).
   * This list is added to the MasterChefLps and passed to fetchFarm. The calls to get contract information about the token/quoteToken in the LP are still made.
   * The absence of a PID means the masterchef contract calls are skipped for this farm.
   * Prices are then fetched for all farms (masterchef + priceHelperLps).
   * Before storing to redux, farms without a PID are filtered out.
   */
  {
    pid: null,
    token: mtvTestnetTokens.musd,
    quoteToken: mtvTestnetTokens.wbnb,
    lpSymbol: `${mtvTestnetTokens.musd.symbol}-${mtvTestnetTokens.wbnb.symbol} LPs`,
    lpAddress: '0x56a181b9fF0000E8355a29Dd27152871f6cb7aF4',
  },
].map((p) => ({ ...p, token: p.token.serialize, quoteToken: p.quoteToken.serialize }))

export default priceHelperLps
