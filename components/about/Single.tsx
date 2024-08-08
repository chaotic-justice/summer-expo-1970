"use client"
import { useTranslations } from "next-intl"

type Props = {
  lang: string
}

const Single = ({ lang }: Props) => {
  const t = useTranslations("About")

  return (
    <div className="flex h-screen items-center">
      <div className="container px-4 md:px-6">
        <div className="space-y-4">
          {new Array(5).fill(-1).map((_, i) => {
            const line = t(`line${i}`)
            return (
              <div key={i} className="space-y-4">
                <p className="text-justify mx-auto sm:max-w-[490px] text-xs/6 sm:text-sm sm:leading-6 tracking-widest whitespace-pre-wrap">{line}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Single
