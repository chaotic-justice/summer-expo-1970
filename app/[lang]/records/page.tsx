import Many from "@/components/records/Many";
import client from "@/tina/__generated__/client";

const page = async () => {
  const connection = await client.queries.authorConnection(
    {},
    {
      fetchOptions: { cache: "no-store" },
    }
  );

  return <Many {...connection} />;
};

export default page;

