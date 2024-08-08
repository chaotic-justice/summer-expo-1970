import { CoreProps } from "@/app/[lang]/layout"
import Landing from "@/components/landing/Landing"
import client from "@/tina/__generated__/client"
import { notFound } from "next/navigation"

const page = async ({ params: { lang } }: CoreProps) => {
  let res = undefined
  try {
    res = await client.queries.artwork({
      relativePath: `landing.mdx`,
    })
  } catch (error) {
    console.error(res?.errors, error)
    return notFound()
  }
  return <Landing {...res} lang={lang} />
}

export default page
