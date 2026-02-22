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

interface SearchDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function SearchDialog({ open, setOpen }: SearchDialogProps) {
  const router = useRouter()

  const DOCS_LINKS = React.useMemo(
    () => [
      {
        heading: "Getting started",
        links: GETTING_STARTED_LINKS,
      },
      {
        heading: "Components",
        links: COMPONENTS_LINKS,
      },
    ],
    [],
  )

  const runCommand = React.useCallback(
    (command: () => unknown) => {
      setOpen(false)
      command()
    },
    [setOpen],
  )

  return (
    <CommandDialog
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
}

SearchDialog.displayName = "SearchDialog"
