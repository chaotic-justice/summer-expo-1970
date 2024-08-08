import type { Collection, Template } from "tinacms"

const descriptiveBlockSchema: Template = {
  label: "Body Content",
  name: "descriptiveBlock",
  ui: {
    defaultItem: {
      subtitle: "20th Century Boys",
      paragraph: "Lorem markdownum evinctus ut cape adhaeret gravis licet progenies ut haesit maxima ille. Est scorpius, mori vel in visaeque Haemoniis viperei furoris e ad vasti, distulit. Crudus sub coniuge iam: dea propera sive",
    },
  },
  fields: [
    {
      label: "Subtitle - en",
      name: "subtitle_en",
      type: "string",
    },
    {
      label: "Paragraph - en",
      name: "paragraph_en",
      type: "string",
      ui: {
        component: "textarea",
      },
    },
    {
      label: "Subtitle - ja",
      name: "subtitle_ja",
      type: "string",
    },
    {
      label: "Paragraph - ja",
      name: "paragraph_ja",
      type: "string",
      ui: {
        component: "textarea",
      },
    },
  ],
}

const procedureBlockSchema: Template = {
  label: "Procedure",
  name: "procedureBlock",
  ui: {
    defaultItem: {
      paragraph_ja: "Lorem markdownum evinctus ut cape adhaeret gravis licet progenies ut haesit maxima ille. Est scorpius, mori vel in visaeque Haemoniis viperei furoris e ad vasti, distulit. Crudus sub coniuge iam: dea propera sive",
      paragraph_en: "Lorem markdownum evinctus ut cape adhaeret gravis licet progenies ut haesit maxima ille. Est scorpius, mori vel in visaeque Haemoniis viperei furoris e ad vasti, distulit. Crudus sub coniuge iam: dea propera sive",
    },
  },
  fields: [
    {
      label: "Image",
      name: "imgSrc",
      type: "image",
    },
    {
      label: "Paragraph - en",
      name: "paragraph_en",
      type: "string",
      ui: {
        component: "textarea",
      },
    },
    {
      label: "Paragraph - ja",
      name: "paragraph_ja",
      type: "string",
      ui: {
        component: "textarea",
      },
    },
  ],
}

const Artwork: Collection = {
  name: "artwork",
  label: "Artworks",
  path: "content/artworks",
  format: "mdx",
  ui: {
    router: ({ document }) => {
      return `works/${document._sys.breadcrumbs.join("/")}`
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
      label: "Caption1",
      name: "caption1",
      type: "string",
    },
    {
      label: "Caption2",
      name: "caption2",
      type: "string",
    },
    {
      label: "Video link",
      name: "videoLink",
      type: "string",
      ui: {
        validate: (value, data) => {
          const youtubeRegex = /^https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:\S+)?$/
          if (value && !youtubeRegex.test(value)) {
            return "Invalid youtube link"
          }
        },
      },
    },
    {
      type: "object",
      name: "imagesList",
      label: "Images",
      list: true,
      fields: [
        {
          type: "image",
          name: "imgSrc",
        },
      ],
      ui: {
        itemProps: (item) => {
          return {
            label: item?.imgSrc,
            style: {
              background: `left / contain no-repeat url(${item?.imgSrc})`,
            },
          }
        },
      },
    },
    {
      type: "object",
      name: "varcharBlocks",
      label: "补充文字内容 (Add body blocks)",
      list: true,
      templates: [descriptiveBlockSchema, procedureBlockSchema],
    },
    {
      type: "reference",
      label: "Author",
      name: "author",
      collections: ["author"],
    },
    {
      type: "datetime",
      label: "Posted Date",
      name: "date",
      ui: {
        dateFormat: "MMMM DD YYYY",
        timeFormat: "hh:mm A",
      },
    },
  ],
}

export default Artwork
