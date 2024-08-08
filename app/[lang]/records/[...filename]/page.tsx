import Single from "@/components/records/Single";
import client from "@/tina/__generated__/client";
import { notFound } from "next/navigation";
import React from "react";

const page = async ({
  params: { filename, lang },
}: {
  params: { filename: string; lang: string };
}) => {
  let res = undefined;
  try {
    res = await client.queries.author({
      relativePath: `${filename}.mdx`,
    });
  } catch (error) {
    console.error(res?.errors, error);
    return notFound();
  }

  return <Single {...res} />;
};

export default page;

