import Author from "@/app/[lang]/authors/[filename]/component";
import client from "@/tina/__generated__/client";
import { notFound } from "next/navigation";

const page = async ({
  params: { filename },
}: {
  params: { filename: string };
}) => {
  let res = undefined;
  try {
    res = await client.queries.author({
      relativePath: `${filename}.md`,
    });
  } catch (error) {
    console.error(res?.errors, error);
    return notFound();
  }

  return <Author {...res} />;
};

export default page;


