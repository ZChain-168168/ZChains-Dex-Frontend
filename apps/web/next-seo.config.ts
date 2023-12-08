import { DefaultSeoProps } from 'next-seo'

export const SEO: DefaultSeoProps = {
  titleTemplate: '%s | MetaViral',
  defaultTitle: 'MetaViral',
  description:
    'Cheaper and faster than Uniswap? Discover MetaViral, the leading DEX on MetaViral with the best farms in DeFi and a lottery for MTV.',
  twitter: {
    cardType: 'summary_large_image',
    handle: '@MetaViral',
    site: '@MetaViral',
  },
  openGraph: {
    title: 'MetaViral - A next evolution DeFi exchange on MetaViral',
    description:
      'The most popular AMM on BSC by user count! Earn MTV through yield farming or win it in the Lottery, then stake it in Syrup Pools to earn more tokens! Initial Farm Offerings (new token launch model pioneered by MetaViral, NFTs, and more, on a platform you can trust.',
    images: [{ url: 'https://assets.MetaViral.finance/web/og/hero.jpg' }],
  },
}
