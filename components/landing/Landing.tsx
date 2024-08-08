import CallToAction from "@/components/landing/CTA"
import { useTranslations } from "next-intl"

export default function HomeIndex({ lang }: { lang: string }) {
  const t = useTranslations("About")

  return (
    <>
      <div className="mx-6 md:mx-24 flex flex-col gap-y-12 md:gap-y-8">
        <h2>{t("title")}</h2>
        <p>{t("p1")}</p>
        <p>{t("p2")}</p>
      </div>
      <CallToAction />
    </>
  )
}
