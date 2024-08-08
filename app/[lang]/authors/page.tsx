import AuthorsList from "@/app/[lang]/authors/component";
import { CoreProps } from "@/app/[lang]/layout"
import client from "@/tina/__generated__/client";

const page = async ({ params: { lang } }: CoreProps) => {
  const connection = await client.queries.authorConnection()

  return <AuthorsList {...connection} lang={lang} />
}

export default page;

