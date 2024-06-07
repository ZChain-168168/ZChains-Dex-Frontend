import { DefaultSeoProps } from 'next-seo'

export const SEO: DefaultSeoProps = {
  titleTemplate: '%s | ZChains',
  defaultTitle: 'ZChains',
  description:
    'Cheaper and faster than Uniswap? Discover ZChains, the leading DEX on ZChains with the best farms in DeFi and a lottery for ZCD.',
  twitter: {
    cardType: 'summary_large_image',
    handle: '@ZChains',
    site: '@ZChains',
  },
  openGraph: {
    title: 'ZChains - A next evolution DeFi exchange on ZChains',
    description:
      'The most popular AMM on ZCD by user count! Earn ZCD through yield farming or win it in the Lottery, then stake it in Syrup Pools to earn more tokens! Initial Farm Offerings (new token launch model pioneered by ZChains, NFTs, and more, on a platform you can trust.',
    images: [{ url: 'https://assets.ZChains.finance/web/og/hero.jpg' }],
  },
}
