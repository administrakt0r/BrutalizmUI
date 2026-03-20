import * as React from "react"
import Image from "next/image"

import { isSafeUrl } from "@/lib/security"
import { cn } from "@/lib/utils"

export type ImageCardProps = React.ComponentPropsWithoutRef<"figure"> & {
  imageUrl: string
  caption: string
  priority?: boolean
}

/**
 * ⚡ Bolt: ImageCard component standardized with React.forwardRef, React.memo,
 * and data-slot attributes for architectural consistency.
 */
const ImageCard = React.memo(
  React.forwardRef<HTMLElement, ImageCardProps>(
    ({ imageUrl, caption, className, priority, ...props }, ref) => {
      const safeImageUrl =
        isSafeUrl(imageUrl) || imageUrl.startsWith("data:image/")
          ? imageUrl
          : ""

      if (!safeImageUrl) return null

      return (
        <figure
          ref={ref}
          data-slot="image-card"
          className={cn(
            "w-[250px] overflow-hidden rounded-base border-2 border-border bg-main font-base shadow-shadow",
            className,
          )}
          {...props}
        >
          <div
            data-slot="image-card-container"
            className="relative aspect-4/3 w-full"
          >
            <Image
              data-slot="image-card-image"
              className="object-cover"
              src={safeImageUrl}
              alt={caption}
              fill
              priority={priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <figcaption
            data-slot="image-card-caption"
            className="border-t-2 text-main-foreground border-border p-4"
          >
            {caption}
          </figcaption>
        </figure>
      )
    },
  ),
)

ImageCard.displayName = "ImageCard"

export { ImageCard }
