import type { Collection } from "tinacms"

const Author: Collection = {
  label: "Authors",
  name: "author",
  path: "content/authors",
  format: "mdx",
  ui: {
    router: ({ document }) => {
      return `/records/${document._sys.breadcrumbs.join("/")}`
    },
  },
  fields: [
    {
      label: "Title",
      name: "title",
      type: "string",
      isTitle: true,
      required: true,
    },
    {
      label: "English name",
      type: "string",
      name: "name_en",
    },
    {
      label: "Chinese name",
      type: "string",
      name: "name_zh",
    },
    {
      label: "Wallpaper",
      name: "wallpaper",
      type: "image",
    },
    {
      label: "PDF Link",
      name: "pdfLink",
      type: "string",
    },
  ],
}

export default Author
