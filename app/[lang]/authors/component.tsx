"use client"

import { Link } from "@/lib/navigation"
import { AuthorConnectionQuery } from "@/tina/__generated__/types"

interface Props {
  query: string
  data: AuthorConnectionQuery
  lang: string
}

const AuthorsList = ({
  data: {
    authorConnection: { edges },
  },
  lang,
}: Props) => {
  return (
    <div>
      <h1>About</h1>
      <ol>
        {edges?.map((author) => {
          const pattern = /\/([^/]+)\.md$/
          const match = (author?.node?.id || "").match(pattern)
          return (
            <li key={author?.node?.id}>
              <Link href={`/authors/${match && match[1]}`}>
                <h2>{author?.node?.name_en}</h2>
              </Link>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default AuthorsList