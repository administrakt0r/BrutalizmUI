"use client"

import { ArrowUp } from "lucide-react"

import * as React from "react"

import { cn } from "@/lib/utils"

export type TocProps = React.ComponentPropsWithoutRef<"nav"> & {
  items: Array<{
    depth: number
    value: string
    id: string
  }>
}

export type TocLinkProps = React.ComponentPropsWithoutRef<"a"> & {
  id: string
  depth: number
  value: string
  isActive: boolean
}

// ⚡ Bolt: Memoize TOC links to prevent unnecessary re-renders of the entire list
// when the active heading changes during scrolling.
export const TocLink = React.memo(
  React.forwardRef<HTMLAnchorElement, TocLinkProps>(
    ({ id, depth, value, isActive, className, ...props }, ref) => {
      return (
        <a
          ref={ref}
          href={`#${id}`}
          data-slot="toc-link"
          aria-current={isActive ? "location" : undefined}
          className={cn(
            "block border-t-3 text-foreground border-t-border last:border-b-3 last:border-b-border hover:bg-main/70 hover:text-main-foreground font-base py-1 pr-3",
            depth === 2 ? "pl-3" : depth === 3 ? "pl-6" : "pl-9",
            isActive && "bg-main hover:bg-main text-main-foreground",
            className,
          )}
          {...props}
        >
          {value}
        </a>
      )
    },
  ),
)

TocLink.displayName = "TocLink"

/**
 * ⚡ Bolt: TableOfContents component optimized with React.memo and React.forwardRef.
 */
export const TableOfContents = React.memo(
  React.forwardRef<HTMLElement, TocProps>(
    ({ items, className, ...props }, ref) => {
      const itemIds = React.useMemo(
        () => (items ? items.map((item) => item.id) : []),
        [items],
      )
      const activeHeading = useActiveItem(itemIds)

      const scrollToTop = React.useCallback(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
      }, [])

      if (!items?.length) {
        return null
      }

      return (
        <nav
          ref={ref}
          data-slot="toc"
          aria-label="Table of contents"
          className={cn(
            "overflow-y-auto toc-scrollbar flex flex-col h-full",
            className,
          )}
          {...props}
        >
          <h2
            data-slot="toc-heading"
            className="text-xl p-3 font-bold border-b-3 border-border"
          >
            On this page
          </h2>
          <div data-slot="toc-links" className="flex-1">
            {items.map((item) => (
              <TocLink
                key={item.id}
                {...item}
                isActive={item.id === activeHeading}
              />
            ))}
          </div>
          <button
            type="button"
            data-slot="toc-back-to-top"
            aria-label="Back to top"
            onClick={scrollToTop}
            className="flex items-center gap-2 p-3 text-sm font-heading border-t-3 border-border hover:bg-main/70 hover:text-main-foreground transition-colors cursor-pointer"
          >
            <ArrowUp className="size-4" aria-hidden="true" />
            Back to top
          </button>
        </nav>
      )
    },
  ),
)

TableOfContents.displayName = "TableOfContents"

function useActiveItem(itemIds: string[]) {
  const [activeId, setActiveId] = React.useState<string | null>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "-100px 0% -66%" },
    )

    itemIds?.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      itemIds?.forEach((id) => {
        const element = document.getElementById(id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [itemIds])

  return activeId
}
