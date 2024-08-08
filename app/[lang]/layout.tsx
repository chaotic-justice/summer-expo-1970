import GoogleAnalytics from "@/app/GoogleAnalytics";
import { TailwindIndicator } from "@/components/TailwindIndicator";
import { ThemeProvider } from "@/components/ThemeProvider";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import "@/styles/loading.css";
import { Analytics } from "@vercel/analytics/react";
import { Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server"
import { Inter as FontSans, Zen_Kaku_Gothic_Antique } from "next/font/google"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const zenKaku = Zen_Kaku_Gothic_Antique({
  weight: ["300", "400", "500", "700"],
  style: ["normal"],
  preload: false,
  variable: "--font-jp",
})

export const metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  // icons: siteConfig.icons,
  // metadataBase: siteConfig.metadataBase,
  openGraph: siteConfig.openGraph,
  twitter: siteConfig.twitter,
}
export const viewport: Viewport = {
  themeColor: siteConfig.themeColors,
}

export type CoreProps = {
  params: { lang: string }
}

type Props = CoreProps & {
  children: React.ReactNode
}

export default async function RootLayout({ children, params: { lang } }: Props) {
  const messages = await getMessages()
  return (
    <html lang={lang}>
      <head />
      <body className={cn("flex flex-col min-h-screen bg-background font-sans antialiased", lang === "en" ? `font-sans ${fontSans.variable}` : `font-jp ${zenKaku.variable}`)}>
        <ThemeProvider attribute="class" defaultTheme={siteConfig.nextThemeColor} enableSystem>
          <NextIntlClientProvider messages={messages}>
            <Header />
            <main className="flex flex-col items-center py-6">{children}</main>
            <Footer />
          </NextIntlClientProvider>
          <Analytics />
          <TailwindIndicator />
        </ThemeProvider>
        {process.env.NODE_ENV === "development" ? (
          <></>
        ) : (
          <>
            <GoogleAnalytics />
          </>
        )}
      </body>
    </html>
  )
}



