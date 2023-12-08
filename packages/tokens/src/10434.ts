import { ChainId, WBNB, ERC20Token } from '@pancakeswap/sdk'
import { BUSD, USDT } from './common'

// edit
export const mtvTokens = {
  wbnb: WBNB[ChainId.MTV],
  busd: BUSD[ChainId.MTV],
  usdt: USDT[ChainId.MTV],
  // usdtMTVLPs: new ERC20Token(
  //   ChainId.MTV,
  //   '0x60f4343FfD8B94C005588A44e2A0CB0769E002d9',
  //   18,
  //   'PiSwap-LP',
  //   'PiSwap LPs',
  //   'https://appname.com/',
  // ),
  // busdMTVLPs: new ERC20Token(
  //   ChainId.MTV,
  //   '0xe3843CE4AD68958005f1c3180c894A2ab456Da9b',
  //   18,
  //   'PiSwap-LP',
  //   'PiSwap LPs',
  //   'https://appname.com/',
  // ),
}
