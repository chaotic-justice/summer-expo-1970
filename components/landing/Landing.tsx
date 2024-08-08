"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { ArtworkQuery } from "@/tina/__generated__/types"
import { format } from "date-fns"
import Image from "next/image"
import { useState, MouseEvent, useRef, useEffect } from "react"
import { useTina } from "tinacms/dist/react"
import Autoplay from "embla-carousel-autoplay"

interface Props {
  query: string
  variables: {
    relativePath: string
  }
  data: ArtworkQuery
  lang: string
}

const Landing = (props: Props) => {
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
            <Image src={"/placeholder.svg"} alt="placeholder" width={900} height={600} className="w-full h-[600px] object-cover bg-muted" />
            <div className="p-6 sm:p-8 space-y-4">
              <div className="h-6 bg-muted rounded w-1/2" />
              <div className="h-4 bg-muted rounded w-1/3" />
              <div className="h-5 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-2/3" />
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl w-full px-4 sm:px-6 lg:px-8">
          <Carousel
            className="w-full"
            opts={{ loop: true }}
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
          >
            <CarouselContent>
              {arr.map((item, i) => (
                <CarouselItem key={i}>
                  <div className="flex">
                    <div className="p-8" onMouseOver={() => setShowPrev(true)} onMouseLeave={() => setShowPrev(false)}></div>
                    <div className="flex-1 z-10">
                      <Image src={item || "/placeholder.svg"} alt="Artwork" width={900} height={600} />
                    </div>
                    <div className="p-8" onMouseOver={() => setShowNext(true)} onMouseLeave={() => setShowNext(false)}></div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {arr.length > 1 && (
              <>
                <CarouselPrevious className={`${!showPrev && "opacity-25"}`} />
                <CarouselNext className={`${!showNext && "opacity-25"}`} />
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
                    <p className="text-xs/6 sm:text-base font-medium mb-2">{subtitle}</p>
                    <p className="text-xs/6 sm:text-base sm:leading-7 tracking-wider">{paragraph}</p>
                  </div>
                )
              })}
          </div>
        </div>
      )}
    </div>
  )
}

export default Landing
