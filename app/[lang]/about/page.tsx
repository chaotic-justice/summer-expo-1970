import { CoreProps } from "@/app/[lang]/layout"
import Single from "@/components/about/Single"

const page = ({ params: { lang } }: CoreProps) => {
  return <Single lang={lang} />
}

export default page
