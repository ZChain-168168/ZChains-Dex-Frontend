import {
  MenuItemsType,
  DropdownMenuItemType,
  SwapIcon,
  SwapFillIcon,
  EarnFillIcon,
  EarnIcon,
  TrophyIcon,
  TrophyFillIcon,
  NftIcon,
  NftFillIcon,
  MoreIcon,
  DropdownMenuItems,
} from '@pancakeswap/uikit'
import { ContextApi } from '@pancakeswap/localization'
import { nftsBaseUrl } from 'views/Nft/market/constants'
import { getPerpetualUrl } from 'utils/getPerpetualUrl'
import { SUPPORT_ONLY_BSC } from 'config/constants/supportChains'

export type ConfigMenuDropDownItemsType = DropdownMenuItems & { hideSubNav?: boolean }
export type ConfigMenuItemsType = Omit<MenuItemsType, 'items'> & { hideSubNav?: boolean; image?: string } & {
  items?: ConfigMenuDropDownItemsType[]
}

const addMenuItemSupported = (item, chainId) => {
  if (!chainId || !item.supportChainIds) {
    return item
  }
  if (item.supportChainIds?.includes(chainId)) {
    return item
  }
  return {
    ...item,
    disabled: true,
  }
}

const config: (
  t: ContextApi['t'],
  isDark: boolean,
  languageCode?: string,
  chainId?: number,
) => ConfigMenuItemsType[] = (t, isDark, languageCode, chainId) =>
  [
    // {
    //   label: t('Home'),
    //   href: '/',
    //   icon: EarnIcon,
    //   fillIcon: EarnFillIcon,
    //   image: '/images/decorations/pe2.png',
    //   showItemsOnMobile: false,
    //   items: [],
    // },
    {
      label: t('Swap'),
      icon: SwapIcon,
      fillIcon: SwapFillIcon,
      href: '/',
      items: [],
      showItemsOnMobile: false,
    },
    {
      label: t('Liquidity'),
      icon: SwapIcon,
      fillIcon: SwapFillIcon,
      href: '/liquidity',
      items: [],
      showItemsOnMobile: false,
    },
    // {
    //   label: t('Earn'),
    //   href: '#',
    //   icon: EarnIcon,
    //   fillIcon: EarnFillIcon,
    //   image: '/images/decorations/pe2.png',
    //   items: [
    //     {
    //       label: t('Farms'),
    //       href: '#',
    //     },
    //     {
    //       label: t('Staking'),
    //       href: '#',
    //       supportChainIds: SUPPORT_ONLY_BSC,
    //     },
    //   ].map((item) => addMenuItemSupported(item, chainId)),
    // },
    {
      label: t('Token Info'),
      href: '/info',
      icon: EarnIcon,
      fillIcon: EarnFillIcon,
      image: '/images/decorations/pe2.png',
      showItemsOnMobile: false,
      items: [],
    },
    // {
    //   label: t('Staking'),
    //   href: '/staking',
    //   icon: EarnIcon,
    //   fillIcon: EarnFillIcon,
    //   showItemsOnMobile: false,
    //   items: [],
    // },
    {
      label: t('Bridge'),
      href: '/bridge',
      icon: EarnIcon,
      fillIcon: EarnFillIcon,
      showItemsOnMobile: false,
      items: [],
    },
    // {
    //   label: t('Voting'),
    //   href: '/voting',
    //   supportChainIds: SUPPORT_ONLY_BSC,
    //   image: '/images/voting/voting-bunny.png',
    //   items: [],
    // },

    // {
    //   label: '',
    //   href: '#',
    //   // href: '/ifo',
    //   icon: MoreIcon,
    //   hideSubNav: true,
    //   items: [
    //     {
    //       label: t('IFO'),
    //       href: '#',
    //       // href: '/ifo',
    //       icon: EarnIcon,
    //       fillIcon: EarnFillIcon,
    //       image: '/images/ifos/ifo-bunny.png',
    //       supportChainIds: SUPPORT_ONLY_BSC,
    //       items: [],
    //     },
    //     {
    //       label: t('NFT'),
    //       // href: `${nftsBaseUrl}`,
    //       href: '#',
    //       icon: NftIcon,
    //       fillIcon: NftFillIcon,
    //       supportChainIds: SUPPORT_ONLY_BSC,
    //       image: '/images/decorations/nft.png',
    //       items: [
    //         {
    //           label: t('Overview'),
    //           // href: `${nftsBaseUrl}`,
    //           href: '#',
    //         },
    //         {
    //           label: t('Collections'),
    //           // href: `${nftsBaseUrl}/collections`,
    //           href: '#',
    //         },
    //         {
    //           label: t('Activity'),
    //           // href: `${nftsBaseUrl}/activity`,
    //           href: '#',
    //         },
    //       ],
    //     },
    //     // {
    //     //   label: t('Voting'),
    //     //   href: '/voting',
    //     //   supportChainIds: SUPPORT_ONLY_BSC,
    //     //   image: '/images/voting/voting-bunny.png',
    //     // },
    //     // {
    //     //   type: DropdownMenuItemType.DIVIDER,
    //     // },
    //     // {
    //     //   label: t('Leaderboard'),
    //     //   href: '/teams',
    //     //   supportChainIds: SUPPORT_ONLY_BSC,
    //     //   image: '/images/decorations/leaderboard.png',
    //     // },
    //     // {
    //     //   type: DropdownMenuItemType.DIVIDER,
    //     // },
    //     // {
    //     //   label: t('Blog'),
    //     //   href: 'https://blog.pancakeswap.finance',
    //     //   type: DropdownMenuItemType.EXTERNAL_LINK,
    //     // },
    //     // {
    //     //   label: t('Docs'),
    //     //   href: 'https://docs.pancakeswap.finance',
    //     //   type: DropdownMenuItemType.EXTERNAL_LINK,
    //     // },
    //   ].map((item) => addMenuItemSupported(item, chainId)),
    // },
  ].map((item) => addMenuItemSupported(item, chainId))

export default config
