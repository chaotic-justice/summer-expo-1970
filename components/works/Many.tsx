"use client"

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import ReactPlayer from "react-player/lazy"
import { Link } from "@/lib/navigation"
import { ArtworkConnectionQuery } from "@/tina/__generated__/types"
import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"

interface Props {
  query: string
  data: ArtworkConnectionQuery
}

const Many = ({
  data: {
    artworkConnection: { edges },
  },
}: Props) => {
  return (
    <div className="p-4 max-w-[428px] sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-xl">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {edges?.map((artwork) => {
          const { node } = artwork || { node: null }
          if (!node) return null
          const pattern = /\/([^/]+)\.mdx$/
          const match = (node?.id || "").match(pattern)
          if (match && match[1] === "landing") return null
          const caption1 = node?.caption1
          const caption2 = node?.caption2
          const arr = node?.imagesList?.filter((item) => !!item?.imgSrc).map((img) => img?.imgSrc) || []
          return (
            <div key={node?.id}>
              <Link href={`/works/${match && match[1]}`}>
                {
                  <Carousel>
                    <CarouselContent>
                      {arr.map((item, index) => {
                        return (
                          <>
                            <CarouselItem key={index}>
                              <div>
                                <AspectRatio ratio={16 / 9} className="bg-muted">
                                  <Image src={item || "/placeholder.svg"} alt="Artwork" fill unoptimized={item?.includes("gif")} className="rounded-md object-cover" />
                                </AspectRatio>
                                <div className="text-center sm:text-right">
                                  <p className="mt-2 text-gray-700">{caption1}</p>
                                  <p className="text-gray-700 line-clamp-1">{caption2}</p>
                                </div>
                              </div>
                            </CarouselItem>
                          </>
                        )
                      })}
                    </CarouselContent>
                  </Carousel>
                }
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Many
