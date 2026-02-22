import Image from "next/image"

import { cn } from "@/lib/utils"

export type ImageCardProps = {
  imageUrl: string
  caption: string
  className?: string
}

function ImageCard({ imageUrl, caption, className }: ImageCardProps) {
  return (
    <figure
      className={cn(
        "w-[250px] overflow-hidden rounded-base border-2 border-border bg-main font-base shadow-shadow",
        className,
      )}
    >
      <div className="relative aspect-4/3 w-full">
        <Image
          className="object-cover"
          src={imageUrl}
          alt={caption}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <figcaption className="border-t-2 text-main-foreground border-border p-4">
        {caption}
      </figcaption>
    </figure>
  )
}

ImageCard.displayName = "ImageCard"

export { ImageCard }
