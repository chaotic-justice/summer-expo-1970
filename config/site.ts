import { SiteConfig } from "@/types/siteConfig";
import { BsGithub, BsInstagram } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

const OPEN_SOURCE_URL = "https://github.com/chaotic-justice/cave-dweller";

const baseSiteConfig = {
  name: "shukagi",
  description: "shukagi's arts gallery site",
  url: "https://kagi.vercel.app",
  metadataBase: "/",
  keywords: ["shukagi", "artworks", "shukagi artist", "shu-kagi"],
  authors: [
    {
      name: "chao justice lai",
      url: "https://github.com/chaotic-justice",
    },
  ],
  creator: "@chaolai",
  openSourceURL: "https://github.com/chaotic-justice/cave-dweller",
  themeColors: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  nextThemeColor: "light", // next-theme option: system | dark | light
  // icons: {
  //   icon: "/favicon.ico",
  //   shortcut: "/favicon-16x16.png",
  // },
  headerLinks: [
    {
      name: "ins",
      href: "https://www.instagram.com/shu_kagi",
      icon: BsInstagram,
    },
  ],
  footerLinks: [
    { name: "email", href: "mailto:shu.kagift@gmail.com", icon: MdEmail },
    {
      name: "github",
      href: OPEN_SOURCE_URL,
      icon: BsGithub,
    },
    {
      name: "ins",
      href: "https://www.instagram.com/shu_kagi",
      icon: BsInstagram,
    },
  ],
}

export const siteConfig: SiteConfig = {
  ...baseSiteConfig,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseSiteConfig.url,
    title: baseSiteConfig.name,
    description: baseSiteConfig.description,
    siteName: baseSiteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: baseSiteConfig.name,
    description: baseSiteConfig.description,
    images: [`${baseSiteConfig.url}/og.png`],
    creator: baseSiteConfig.creator,
  },
};














