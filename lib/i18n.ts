export const localeNames: any = {
  en: "🇺🇸 English",
  zh: "🇨🇳 中文",
  ja: "🇯🇵 日本語",
  ar: "🇸🇦 العربية",
  es: "🇪🇸 Español",
  ru: "🇷🇺 Русский",
}
export const defaultLocale = "en"

import { LocalePrefix } from "next-intl/routing"
import { getRequestConfig } from "next-intl/server"
import { notFound } from "next/navigation"

// Can be imported from a shared config
export const locales = ["en", "zh"]

export const localePrefix: LocalePrefix<typeof locales> = "always"

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound()

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
