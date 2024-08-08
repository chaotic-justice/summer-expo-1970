import Many from "@/components/records/Many";
import client from "@/tina/__generated__/client";

const page = async ({ params: { lang } }: { params: { lang: string } }) => {
  const connection = await client.queries.authorConnection(
    {},
    {
      fetchOptions: { cache: "no-store" },
    }
  )

  return <Many {...connection} lang={lang} />
}

export default page;

