import { DefaultSeoProps } from 'next-seo'

export const SEO: DefaultSeoProps = {
  titleTemplate: '%s | TeleportStation',
  defaultTitle: 'TeleportStation',
  description:
    'Cheaper and faster than Uniswap? Discover TeleportStation, the leading DEX on TeleportStation with the best farms in DeFi and a lottery for MTV.',
  twitter: {
    cardType: 'summary_large_image',
    handle: '@TeleportStation',
    site: '@TeleportStation',
  },
  openGraph: {
    title: 'TeleportStation - A next evolution DeFi exchange on TeleportStation',
    description:
      'The most popular AMM on BSC by user count! Earn MTV through yield farming or win it in the Lottery, then stake it in Syrup Pools to earn more tokens! Initial Farm Offerings (new token launch model pioneered by TeleportStation, NFTs, and more, on a platform you can trust.',
    images: [{ url: 'https://assets.teleportstation.finance/web/og/hero.jpg' }],
  },
}
