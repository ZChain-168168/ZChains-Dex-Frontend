import { ChainId, WBNB, ERC20Token } from '@pancakeswap/sdk'
import { BUSD, USDT } from './common'

// edit
export const creditTokens = {
  wbnb: WBNB[ChainId.CREDIT],
  busd: BUSD[ChainId.CREDIT],
  usdt: USDT[ChainId.CREDIT],
  musd: new ERC20Token(
    ChainId.CREDIT,
    '0x967783AC4C89FbE6199B775A12B1F43fB5eb4d23',
    18,
    'MUSD',
    'MUSD Token',
    'https://pancakeswap.finance/',
  ),
  syrup: new ERC20Token(
    ChainId.CREDIT,
    '0x66e68669B8989ba17B5Fb59807E9A452c65Fd7CD',
    18,
    'SYRUP',
    'SyrupBar Token',
    'https://pancakeswap.finance/',
    '/images/10435/tokens/0x66e68669B8989ba17B5Fb59807E9A452c65Fd7CD.png',
  ),
  cake: new ERC20Token(
    ChainId.CREDIT,
    '0xbc691Ff9F9DCCa20DB97FCd56930a193169c9305',
    18,
    'CAKE',
    'CAKE Token',
    'https://pancakeswap.finance/',
    '/images/10435/tokens/0xbc691Ff9F9DCCa20DB97FCd56930a193169c9305.png',
  ),
  usdtMTVLPs: new ERC20Token(
    ChainId.CREDIT,
    '0x60f4343FfD8B94C005588A44e2A0CB0769E002d9',
    18,
    'PiSwap-LP',
    'PiSwap LPs',
    'https://pancakeswap.finance/',
  ),
  busdMTVLPs: new ERC20Token(
    ChainId.CREDIT,
    '0xe3843CE4AD68958005f1c3180c894A2ab456Da9b',
    18,
    'PiSwap-LP',
    'PiSwap LPs',
    'https://pancakeswap.finance/',
  ),
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
