import Many from "@/components/works/Many"
import client from "@/tina/__generated__/client"

const page = async () => {
  const connection = await client.queries.artworkConnection(
    {},
    {
      fetchOptions: { cache: "no-store" },
    }
  )

  return <Many {...connection} />
}

export default page
