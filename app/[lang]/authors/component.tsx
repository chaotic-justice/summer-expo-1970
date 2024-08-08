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
          console.log("author", author?.node?.displayNames)
          let displayName = author?.node?.displayNames?.find((name) => name?.lang === lang)
          if (!displayName && author?.node?.displayNames && author?.node?.displayNames?.length > 0) {
            displayName = author?.node?.displayNames[0]
          }
          return (
            <li key={author?.node?.id}>
              <Link href={`/authors/${match && match[1]}`}>
                <h2>{displayName?.value}</h2>
              </Link>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default AuthorsList