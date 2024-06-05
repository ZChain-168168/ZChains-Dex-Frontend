import memoize from 'lodash/memoize'
import { ContextApi } from '@pancakeswap/localization'
import { PageMeta } from './types'
import { ASSET_CDN } from './endpoints'

export const DEFAULT_META: PageMeta = {
  title: 'zChain',
  description: 'zChain is a decentralized exchange running on the zChain blockchain.',
  image: `${ASSET_CDN}/web/og/hero.jpg`,
}

interface PathList {
  paths: { [path: string]: { title: string; basePath?: boolean; description?: string; image?: string } }
  defaultTitleSuffix: string
}

const getPathList = (t: ContextApi['t']): PathList => {
  return {
    paths: {
      '/': { title: t('Home') },
      '/swap': { basePath: true, title: t('Exchange'), image: `/logo.png` },
      '/limit-orders': { basePath: true, title: t('Limit Orders'), image: `/logo.png` },
      '/add': { basePath: true, title: t('Add Liquidity'), image: `/logo.png` },
      '/remove': { basePath: true, title: t('Remove Liquidity'), image: `/logo.png` },
      '/liquidity': { title: t('Liquidity'), image: `/logo.png` },
      '/find': { title: t('Import Pool') },
      '/competition': { title: t('Trading Battle') },
      '/prediction': { title: t('Prediction'), image: `/logo.png` },
      '/prediction/leaderboard': { title: t('Leaderboard'), image: `/logo.png` },
      '/farms': { title: t('Farms'), image: `/logo.png` },
      '/farms/auction': { title: t('Farm Auctions'), image: `/logo.png` },
      '/pools': { title: t('Pools'), image: `/logo.png` },
      '/lottery': { title: t('Lottery'), image: `/logo.png` },
      '/ifo': { title: t('Initial Farm Offering'), image: `/logo.png` },
      '/teams': { basePath: true, title: t('Leaderboard'), image: `/logo.png` },
      '/voting': { basePath: true, title: t('Voting'), image: `/logo.png` },
      '/voting/proposal': { title: t('Proposals'), image: `/logo.png` },
      '/voting/proposal/create': { title: t('Make a Proposal'), image: `/logo.png` },
      '/info': {
        title: `${t('Overview')} - ${t('Info')}`,
        description: 'View statistics for zChain exchanges.',
        image: `/logo.png`,
      },
      '/info/pairs': {
        title: `${t('Pairs')} - ${t('Info')}`,
        description: 'View statistics for zChain exchanges.',
        image: `/logo.png`,
      },
      '/info/tokens': {
        title: `${t('Tokens')} - ${t('Info')}`,
        description: 'View statistics for zChain exchanges.',
        image: `/logo.png`,
      },
      '/nfts': { title: t('NFT Marketplace'), image: `/logo.png` },
      '/nfts/collections': { basePath: true, title: t('Collections'), image: `/logo.png` },
      '/nfts/activity': { title: t('Activity'), image: `/logo.png` },
      '/profile': { basePath: true, title: t('Profile') },
      '/pancake-squad': { basePath: true, title: t('Pancake Squad') },
      '/pottery': { basePath: true, title: t('Pottery'), image: `/logo.png` },
    },
    defaultTitleSuffix: t('zChain'),
  }
}

export const getCustomMeta = memoize(
  (path: string, t: ContextApi['t'], _: string): PageMeta => {
    const pathList = getPathList(t)
    const pathMetadata =
      pathList.paths[path] ??
      pathList.paths[Object.entries(pathList.paths).find(([url, data]) => data.basePath && path.startsWith(url))?.[0]]

    if (pathMetadata) {
      return {
        title: `${pathMetadata.title}`,
        ...(pathMetadata.description && { description: pathMetadata.description }),
        image: pathMetadata.image,
      }
    }
    return null
  },
  (path, t, locale) => `${path}#${locale}`,
)
