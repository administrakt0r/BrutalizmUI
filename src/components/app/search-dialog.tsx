"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { COMPONENTS_LINKS, GETTING_STARTED_LINKS } from "@/data/sidebar-links"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

export type SearchDialogProps = {
  open: boolean
  setOpen: (open: boolean) => void
}

// ⚡ Bolt: Define static data outside the component to eliminate React hook overhead
// and ensure the data is only instantiated once globally.
const DOCS_LINKS = [
  {
    heading: "Getting started",
    links: GETTING_STARTED_LINKS,
  },
  {
    heading: "Components",
    links: COMPONENTS_LINKS,
  },
]

/**
 * 🌐 Atlas: SearchDialog component optimized with React.memo and React.forwardRef.
 */
export const SearchDialog = React.memo(
  React.forwardRef<
    React.ElementRef<typeof CommandDialog>,
    SearchDialogProps
  >(({ open, setOpen }, ref) => {
    const router = useRouter()

  const runCommand = React.useCallback(
    (command: () => unknown) => {
      setOpen(false)
      command()
    },
    [setOpen],
  )

    return (
      <CommandDialog
        ref={ref}
        data-slot="search-dialog"
        title="Search documentation"
        open={open}
        onOpenChange={setOpen}
      >
        <CommandInput placeholder="Search documentation..." />
        <CommandList className="command-scrollbar **:data-[slot=command-item]:py-1.5!">
          <CommandEmpty>No results found.</CommandEmpty>
          {DOCS_LINKS.map(({ heading, links }, i) => {
            return (
              <React.Fragment key={heading}>
                <CommandGroup heading={heading}>
                  {links.map(({ text, href }) => {
                    return (
                      <CommandItem
                        value={text}
                        onSelect={() => {
                          runCommand(() => router.push(href))
                        }}
                        key={href}
                      >
                        {text}
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
                {i < 2 && <CommandSeparator />}
              </React.Fragment>
            )
          })}
        </CommandList>
      </CommandDialog>
    )
  }),
)

SearchDialog.displayName = "SearchDialog"

export default SearchDialog
