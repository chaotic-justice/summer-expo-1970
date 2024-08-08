"use client";

import { AuthorQuery } from "@/tina/__generated__/types"
import { Wallpaper } from "lucide-react"
import { useTina } from "tinacms/dist/react"

interface Props {
  query: string
  variables: {
    relativePath: string
  }
  data: AuthorQuery
}

const Author = (props: Props) => {
  const {
    data: { author },
  } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  })
  const obj = {
    wallpaper: author?.wallpaper,
    title: author?.title,
  }

  return (
    <>
      <code>
        <pre
          style={{
            backgroundColor: "lightgray",
          }}
        >
          {JSON.stringify(obj, null, 2)}
        </pre>
      </code>
    </>
  )
}

export default Author;

