import { DefaultSeoProps } from 'next-seo'

export const SEO: DefaultSeoProps = {
  titleTemplate: '%s | ZChains',
  defaultTitle: 'Blog | ZChains',
  description:
    'Cheaper and faster than Uniswap? Discover ZChains, the leading DEX on Credit Smart Chain (ZCD) with the best farms in DeFi and a lottery for CAKE.',
  twitter: {
    cardType: 'summary_large_image',
    handle: '@ZChains',
    site: '@ZChains',
  },
  openGraph: {
    title: '🥞 ZChains - A next evolution DeFi exchange on Credit Smart Chain (ZCD)',
    description:
      'The most popular AMM on ZCD! Earn CAKE through yield farming or win it in the Lottery, then stake it in Syrup Pools to earn more tokens! Initial Farm Offerings (new token launch model pioneered by ZChains), NFTs, and more, on a platform you can trust.',
    images: [{ url: 'https://ZChains.finance/images/hero.png' }],
  },
}
