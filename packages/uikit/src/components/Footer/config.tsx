import { Language } from "../LangSelector/types";
import { FooterLinkType } from "./types";
import {
  TwitterIcon,
  TelegramIcon,
  RedditIcon,
  FacebookIcon,
  InstagramIcon,
  GithubIcon,
  DiscordIcon,
  YoutubeIcon,
} from "../Svg";

export const footerLinks: FooterLinkType[] = [
  {
    label: "About",
    items: [
      {
        label: "Contact",
        // href: "https://docs.metaviralscan.com/contact-us",
      },
      {
        label: "Blog",
        // href: "https://blog.pancakeswap.finance/",
      },
      {
        label: "Community",
        // href: "https://docs.metaviralscan.com/contact-us/telegram",
      },
      {
        label: "CAKE",
        // href: "https://docs.metaviralscan.com/tokenomics/cake",
      },
      {
        label: "—",
      },
      {
        label: "Online Store",
        // href: "https://pancakeswap.creator-spring.com/",
        isHighlighted: true,
      },
    ],
  },
  {
    label: "Help",
    items: [
      {
        label: "Customer",
        // href: "Support https://docs.metaviralscan.com/contact-us/customer-support",
      },
      {
        label: "Troubleshooting",
        // href: "https://docs.metaviralscan.com/help/troubleshooting",
      },
      {
        label: "Guides",
        // href: "https://docs.metaviralscan.com/get-started",
      },
    ],
  },
  {
    label: "Developers",
    items: [
      {
        label: "Github",
        // href: "https://github.com/pancakeswap",
      },
      {
        label: "Documentation",
        // href: "https://docs.pancakeswap.finance",
      },
      {
        label: "Bug Bounty",
        // href: "https://app.gitbook.com/@pancakeswap-1/s/pancakeswap/code/bug-bounty",
      },
      {
        label: "Audits",
        // href: "https://docs.metaviralscan.com/help/faq#is-pancakeswap-safe-has-pancakeswap-been-audited",
      },
      {
        label: "Careers",
        // href: "https://docs.metaviralscan.com/hiring/become-a-chef",
      },
    ],
  },
];

export const socials: Array<{
  label: string;
  icon: any;
  href?: string;
  items?: Array<{
    label: string;
    href: string;
  }>;
}> = [
  {
    label: "Facebook",
    icon: FacebookIcon,
    // href: "https://github.com/facebook/",
  },
  {
    label: "Twitter",
    icon: TwitterIcon,
    // href: "https://twitter.com/pancakeswap",
  },
  {
    label: "Telegram",
    icon: TelegramIcon,
    href: "https://t.me/creditweb3updates",
    // items: [
    //   {
    //     label: "English",
    //     // href: "https://t.me/pancakeswap",
    //   },
    //   {
    //     label: "Bahasa Indonesia",
    //     // href: "https://t.me/PancakeSwapIndonesia",
    //   },
    //   {
    //     label: "中文",
    //     // href: "https://t.me/PancakeSwap_CN",
    //   },
    //   {
    //     label: "Tiếng Việt",
    //     // href: "https://t.me/PancakeSwapVN",
    //   },
    //   {
    //     label: "Italiano",
    //     // href: "https://t.me/pancakeswap_ita",
    //   },
    //   {
    //     label: "русский",
    //     // href: "https://t.me/pancakeswap_ru",
    //   },
    //   {
    //     label: "Türkiye",
    //     // href: "https://t.me/pancakeswapturkiye",
    //   },
    //   {
    //     label: "Português",
    //     // href: "https://t.me/PancakeSwapPortuguese",
    //   },
    //   {
    //     label: "Español",
    //     // href: "https://t.me/PancakeswapEs",
    //   },
    //   {
    //     label: "日本語",
    //     // href: "https://t.me/pancakeswapjp",
    //   },
    //   {
    //     label: "Français",
    //     // href: "https://t.me/pancakeswapfr",
    //   },
    //   {
    //     label: "Deutsch",
    //     // href: "https://t.me/PancakeSwap_DE",
    //   },
    //   {
    //     label: "Filipino",
    //     // href: "https://t.me/Pancakeswap_Ph",
    //   },
    //   {
    //     label: "ქართული ენა",
    //     // href: "https://t.me/PancakeSwapGeorgia",
    //   },
    //   {
    //     label: "हिन्दी",
    //     // href: "https://t.me/PancakeSwapINDIA",
    //   },
    //   {
    //     label: "Announcements",
    //     // href: "https://t.me/PancakeSwapAnn",
    //   },
    // ],
  },
  {
    label: "Youtube",
    icon: YoutubeIcon,
    // href: "https://www.youtube.com/@pancakeswap_official",
  },
  // {
  //   label: "Reddit",
  //   icon: RedditIcon,
  // href: "https://reddit.com/r/pancakeswap",
  // },
  {
    label: "Instagram",
    icon: InstagramIcon,
    // href: "https://instagram.com/pancakeswap_official",
  },
  // {
  //   label: "Github",
  //   icon: GithubIcon,
  //   href: "https://github.com/pancakeswap/",
  // },
  // {
  //   label: "Discord",
  //   icon: DiscordIcon,
  //   href: "https://discord.gg/pancakeswap",
  // },
];

export const langs: Language[] = [...Array(20)].map((_, i) => ({
  code: `en${i}`,
  language: `English${i}`,
  locale: `Locale${i}`,
}));
