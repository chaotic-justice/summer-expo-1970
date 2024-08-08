"use client"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Separator } from "@/components/ui/separator"
import { ArtworkQuery, Author } from "@/tina/__generated__/types"
import { format } from "date-fns"
import Image from "next/image"
import { useState, MouseEvent, useRef, useEffect } from "react"
import ReactPlayer from "react-player/youtube"
import { useTina } from "tinacms/dist/react"

interface Props {
  query: string
  variables: {
    relativePath: string
  }
  data: ArtworkQuery
  lang: string
}

const Single = (props: Props) => {
  const {
    data: { artwork },
  } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  })
  const arr = artwork?.imagesList?.filter((item) => !!item?.imgSrc).map((img) => img?.imgSrc) || []
  const date = new Date(artwork.date || "")
  let formattedDate = ""
  if (!isNaN(date.getTime())) {
    formattedDate = format(date, "MMM dd, yyyy")
  }
  const { author } = artwork
  let displayName = author?.displayNames?.find((name) => name?.lang === props.lang)
  if (!displayName && author?.displayNames && author?.displayNames?.length > 0) {
    displayName = author?.displayNames[0]
  }

  const [showPrev, setShowPrev] = useState(false)
  const [showNext, setShowNext] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center bg-background">
      {!artwork ? (
        <div className="max-w-4xl w-full px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-lg overflow-hidden shadow-lg animate-pulse">
            <Image src={"/placeholder.svg"} alt="placeholder" width={900} height={600} />
            <div className="p-6 sm:p-8 space-y-4">
              <div className="h-6 bg-muted rounded w-1/2" />
              <div className="h-4 bg-muted rounded w-1/3" />
              <div className="h-5 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-2/3" />
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-[428px] sm:max-w-4xl sm:w-full px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-lg overflow-hidden shadow-lg">
            <Carousel className="w-full" opts={{ loop: true }}>
              <CarouselContent>
                {arr.map((item, index) => (
                  <CarouselItem key={index}>
                    <div className="flex flex-col sm:flex-row">
                      <div className="invisible sm:visible p-8" onMouseOver={() => setShowPrev(true)} onMouseLeave={() => setShowPrev(false)}></div>
                      <AspectRatio ratio={16 / 9} className="bg-muted">
                        <Image src={item || "/placeholder.svg"} alt="Artwork" fill unoptimized={item?.includes("gif")} className="rounded-md object-cover" />
                      </AspectRatio>
                      <div className="invisible sm:visible p-8" onMouseOver={() => setShowNext(true)} onMouseLeave={() => setShowNext(false)}></div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {arr.length > 1 && (
                <>
                  <CarouselPrevious className={`${!showPrev && "sm:opacity-25"}`} />
                  <CarouselNext className={`${!showNext && "sm:opacity-25"}`} />
                </>
              )}
            </Carousel>
            <div className="p-6 sm:p-8">
              {artwork.varcharBlocks
                ?.filter((block) => block?.__typename === "ArtworkVarcharBlocksDescriptiveBlock")
                .map((block, i) => {
                  const subtitle = props.lang === "en" ? block?.subtitle_en : block?.subtitle_ja
                  const paragraph = props.lang === "en" ? block?.paragraph_en : block?.paragraph_ja
                  return (
                    <div key={i} className="flex flex-col [&>:not(:last-child)]:mt-6 px-8">
                      <p className="text-xs sm:text-base font-medium mb-2">{subtitle}</p>
                      <p className="text-xs sm:text-base sm:leading-7 tracking-wider">{paragraph}</p>
                    </div>
                  )
                })}
              <Separator className="my-4" />
              {artwork.videoLink && (
                <div className="flex justify-center w-full my-6 sm:mt-12">
                  <ReactPlayer url={artwork.videoLink} width={600} height={400} light controls />
                </div>
              )}
              {artwork.varcharBlocks
                ?.filter((block) => block?.__typename === "ArtworkVarcharBlocksProcedureBlock")
                .map((block, i) => {
                  const paragraph = props.lang === "en" ? block?.paragraph_en : block?.paragraph_ja
                  return (
                    <div key={i} className="flex flex-col space-y-3 mt-8 sm:mt-12 px-8">
                      <AspectRatio ratio={16 / 9} className="bg-muted">
                        <Image src={block.imgSrc || "/placeholder.svg"} alt="Artwork" fill className="rounded-md object-cover" />
                      </AspectRatio>
                      <p className="text-xs sm:text-base sm:leading-7 tracking-wider">{paragraph}</p>
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const DisplayAuthor = ({ author, lang }: { author: Author | null; lang: string }) => {
  let displayName = author?.displayNames?.find((name) => name?.lang === lang)
  if (!displayName && author?.displayNames && author?.displayNames?.length > 0) {
    displayName = author?.displayNames[0]
  }
  return (
    <div className="flex items-center justify-center mt-2 mb-8 sm:mb-12">
      {author && (
        <>
          <div className="flex-shrink-0 mr-4">
            <Image className="h-14 w-14 object-cover rounded-full shadow-sm" src={author.avatar || "/placeholder.svg"} alt={displayName?.value || "avatar"} width={500} height={500} />
          </div>
          <p className="text-base font-medium text-gray-600 group-hover:text-gray-800">{displayName?.value}</p>
          <span className="font-bold text-gray-200 mx-2">—</span>
        </>
      )}
      {/* <p className="text-base text-gray-400 group-hover:text-gray-500">{formattedDate}</p> */}
    </div>
  )
}

export default Single
