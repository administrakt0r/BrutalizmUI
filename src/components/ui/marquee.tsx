import * as React from "react"

import { cn } from "@/lib/utils"

export type MarqueeProps = React.ComponentPropsWithoutRef<"div"> & {
  items?: string[]
}

/**
 * ⚡ Bolt: Marquee component standardized with React.forwardRef, React.memo,
 * and data-slot attributes for architectural consistency.
 * Supports both simple string items and complex children content.
 */
const Marquee = React.memo(
  React.forwardRef<HTMLDivElement, MarqueeProps>(
    ({ className, items, children, ...props }, ref) => {
      const content = React.useMemo(() => {
        if (children) return children

        if (items) {
          return items.map((item, i) => (
            <span
              key={`${item}-${i}`}
              data-slot="marquee-item"
              className="mx-4 text-4xl"
            >
              {item}
            </span>
          ))
        }

        return null
      }, [children, items])

      return (
        <div
          ref={ref}
          role="region"
          aria-roledescription="marquee"
          data-slot="marquee"
          className={cn(
            "group relative flex w-full overflow-x-hidden border-b-2 border-t-2 border-border bg-secondary-background text-foreground font-base",
            className,
          )}
          {...props}
        >
          <div
            data-slot="marquee-content"
            className="animate-marquee whitespace-nowrap py-12 group-hover:[animation-play-state:paused] motion-reduce:animate-none"
          >
            {content}
          </div>

          <div
            data-slot="marquee-content"
            className="absolute top-0 animate-marquee2 whitespace-nowrap py-12 group-hover:[animation-play-state:paused] motion-reduce:animate-none"
            aria-hidden="true"
          >
            {content}
          </div>
        </div>
      )
    },
  ),
)

Marquee.displayName = "Marquee"

export { Marquee }
