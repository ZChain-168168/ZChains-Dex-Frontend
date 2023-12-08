import { ContextApi } from "@pancakeswap/localization";
import { FooterLinkType } from "../../../components/Footer/types";

export const footerLinks: (t: ContextApi["t"]) => FooterLinkType[] = (t) => [
  {
    label: t("About"),
    items: [
      {
        label: t("Contact"),
        href: "https://docs.metaviralscan.com/contact-us",
        isHighlighted: true,
      },
      {
        label: t("Brand"),
        href: "https://docs.metaviralscan.com/brand",
      },
      {
        label: t("Blog"),
        href: "https://blog.pancakeswap.finance/",
      },
      {
        label: t("Community"),
        href: "https://docs.metaviralscan.com/contact-us/telegram",
      },
      {
        label: t("Litepaper"),
        href: "https://v2litepaper.pancakeswap.finance/",
      },
    ],
  },
  {
    label: t("Help"),
    items: [
      {
        label: t("Customer Support"),
        href: "https://docs.metaviralscan.com/contact-us/customer-support",
      },
      {
        label: t("Troubleshooting"),
        href: "https://docs.metaviralscan.com/help/troubleshooting",
      },
      {
        label: t("Guides"),
        href: "https://docs.metaviralscan.com/get-started",
      },
    ],
  },
  {
    label: t("Developers"),
    items: [
      {
        label: "Github",
        href: "https://github.com/pancakeswap",
      },
      {
        label: t("Documentation"),
        href: "https://docs.pancakeswap.finance",
      },
      {
        label: t("Bug Bounty"),
        href: "https://docs.metaviralscan.com/code/bug-bounty",
      },
      {
        label: t("Audits"),
        href: "https://docs.metaviralscan.com/help/faq#is-pancakeswap-safe-has-pancakeswap-been-audited",
      },
      {
        label: t("Careers"),
        href: "https://docs.metaviralscan.com/hiring/become-a-chef",
      },
    ],
  },
];
