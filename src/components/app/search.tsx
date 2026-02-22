"use client"

import { Search as SearchIcon } from "lucide-react"

import React, { useEffect, useState } from "react"
import dynamic from "next/dynamic"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const SearchDialog = dynamic(() => import("@/components/app/search-dialog"))

export default function Search() {
  const [open, setOpen] = useState(false)
  const [dialogLoaded, setDialogLoaded] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  useEffect(() => {
    if (open) {
      setDialogLoaded(true)
    }
  }, [open])

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => setOpen(true)}
            className="relative bg-secondary-background dark:text-white shadow-nav dark:shadow-navDark hover:translate-x-[4px]! hover:translate-y-[4px]! hover:shadow-none dark:hover:shadow-none px-3 pr-3 xl:pr-16 shrink-0 xl:w-[unset] w-9 h-9 text-base"
            aria-label="Search documentation"
          >
            <span className="flex text-sm items-center gap-1">
              <SearchIcon
                className="xl:!size-4 !size-5 shrink-0"
                aria-hidden="true"
              />
              <span className="xl:inline hidden">Search</span>
            </span>

            <span className="absolute xl:flex hidden items-center justify-center text-black border text-xs px-1 border-black rounded-base bg-main h-6 right-2 top-1">
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
}

Search.displayName = "Search"
