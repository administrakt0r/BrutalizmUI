"use client"

import { Search as SearchIcon } from "lucide-react"

import * as React from "react"
import dynamic from "next/dynamic"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { cn } from "@/lib/utils"

const SearchDialog = dynamic(() =>
  import("@/components/app/search-dialog").then((mod) => mod.SearchDialog),
)

export type SearchProps = React.ComponentPropsWithoutRef<typeof Button>

/**
 * ⚡ Bolt: Search component optimized with React.memo and React.forwardRef.
 */
const Search = React.memo(
  React.forwardRef<HTMLButtonElement, SearchProps>(({ className, ...props }, ref) => {
    const [open, setOpen] = React.useState(false)
    const [dialogLoaded, setDialogLoaded] = React.useState(false)

    React.useEffect(() => {
      const down = (e: KeyboardEvent) => {
        if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault()
          setOpen((open) => !open)
        }
      }
      document.addEventListener("keydown", down)
      return () => document.removeEventListener("keydown", down)
    }, [])

    React.useEffect(() => {
      if (open) {
        setDialogLoaded(true)
      }
    }, [open])

    return (
      <>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              ref={ref}
              data-slot="search-trigger"
              onClick={(e) => {
                setOpen(true)
                if (props.onClick) props.onClick(e)
              }}
              className={cn(
                "relative bg-secondary-background dark:text-white shadow-nav dark:shadow-navDark hover:translate-x-[4px]! hover:translate-y-[4px]! hover:shadow-none dark:hover:shadow-none px-3 pr-3 xl:pr-16 shrink-0 xl:w-[unset] w-9 h-9 text-base",
                className,
              )}
              aria-label="Search documentation"
              aria-keyshortcuts="Control+K Meta+K"
              {...props}
            >
              <span className="flex text-sm items-center gap-1">
                <SearchIcon
                  className="xl:!size-4 !size-5 shrink-0"
                  aria-hidden="true"
                />
                <span className="xl:inline hidden">Search</span>
              </span>

              <span
                aria-hidden="true"
                className="absolute xl:flex hidden items-center justify-center text-black border text-xs px-1 border-black rounded-base bg-main h-6 right-2 top-1"
              >
                ⌘ K
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Search documentation (⌘K)</p>
          </TooltipContent>
        </Tooltip>
        {dialogLoaded && <SearchDialog open={open} setOpen={setOpen} />}
      </>
    )
  })
)

Search.displayName = "Search"

export default Search
