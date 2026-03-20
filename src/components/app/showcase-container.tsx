import clsx from "clsx"

import * as React from "react"
import Image, { StaticImageData } from "next/image"

import { isSafeUrl, sanitizeColor } from "@/lib/security"

export type ShowcaseItem = {
  color: string
  text?: string
  liveUrl: string
  previewImg: StaticImageData
  repoUrl?: string
  title: string
}

export type ShowcaseContainerProps = React.ComponentPropsWithoutRef<"div"> & {
  items: ShowcaseItem[]
}

const ShowcaseCard = React.memo(
  ({ item, index }: { item: ShowcaseItem; index: number }) => {
    const { color, text, liveUrl, previewImg, repoUrl, title } = item

    const linkStyle = React.useMemo(
      () => ({
        backgroundColor: sanitizeColor(color),
        color: text ? sanitizeColor(text) : "black",
      }),
      [color, text],
    )

    return (
      <div className="p-[15px] bg-secondary-background rounded-base shadow-shadow border-2 border-border">
        <div className="relative overflow-hidden border-2 border-border rounded-base aspect-2/1">
          {/* Keep above-the-fold cards eager and defer the rest to cut initial image payload. */}
          <Image
            className="rounded-base object-cover"
            src={previewImg}
            alt={`${title} preview`}
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            priority={index < 2}
            fetchPriority={index < 2 ? "high" : "auto"}
            placeholder="blur"
          />
        </div>

        <h2 className="text-center font-heading mt-4 text-lg xl:text-xl">
          {title}
        </h2>

        <div className="grid grid-cols-2 md:text-base text-sm gap-5 mt-8">
          <a
            style={linkStyle}
            className={clsx(
              "text-center border-2 py-1.5 font-base shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:hover:shadow-none transition-all border-border rounded-base",
              !repoUrl && "col-span-2",
            )}
            target="_blank"
            rel="noopener noreferrer"
            href={isSafeUrl(liveUrl) ? liveUrl : "#"}
            aria-label={`Visit ${title} live site`}
          >
            Visit
          </a>
          {repoUrl && (
            <a
              style={linkStyle}
              className="text-center border-2 py-1.5 font-base shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:hover:shadow-none transition-all border-border rounded-base"
              target="_blank"
              rel="noopener noreferrer"
              href={isSafeUrl(repoUrl) ? repoUrl : "#"}
              aria-label={`View ${title} GitHub repository`}
            >
              Github repo
            </a>
          )}
        </div>
      </div>
    )
  },
)

ShowcaseCard.displayName = "ShowcaseCard"

const ShowcaseContainer = React.memo(
  React.forwardRef<HTMLDivElement, ShowcaseContainerProps>(
    ({ items, className, ...props }, ref) => {
      return (
        <div
          ref={ref}
          className={clsx(
            "max-w-full grid sm:grid-cols-2 grid-cols-1 gap-5",
            className,
          )}
          {...props}
        >
          {items.map((item, index) => (
            <ShowcaseCard key={item.title} item={item} index={index} />
          ))}
        </div>
      )
    },
  ),
)

ShowcaseContainer.displayName = "ShowcaseContainer"

export default ShowcaseContainer
