"use client"

import { Check, ChevronsUpDown } from "lucide-react"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { cn } from "@/lib/utils"

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]

// ⚡ Bolt: Use O(1) lookup map instead of O(n) array.find() in render loops
const frameworksMap = Object.fromEntries(
  frameworks.map((f) => [f.value, f.label]),
)

export type ComboboxDemoProps = React.ComponentPropsWithoutRef<"div">

/**
 * ⚡ Bolt: ComboboxDemo component optimized with React.memo and React.forwardRef.
 */
const ComboboxDemo = React.memo(
  React.forwardRef<HTMLDivElement, ComboboxDemoProps>(
    ({ className, ...props }, ref) => {
      const [open, setOpen] = React.useState(false)
      const [value, setValue] = React.useState("")

      return (
        <div
          ref={ref}
          data-slot="combobox-demo"
          className={className}
          {...props}
        >
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="noShadow"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
              >
                {value ? frameworksMap[value] : "Select framework..."}
                <ChevronsUpDown
                  className="ml-2 size-4 shrink-0"
                  aria-hidden="true"
                />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] border-0! p-0 font-base">
              <Command>
                <CommandInput placeholder="Search framework..." />
                <CommandList>
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandGroup>
                    {frameworks.map((framework) => (
                      <CommandItem
                        key={framework.value}
                        value={framework.value}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue)
                          setOpen(false)
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 size-4",
                            value === framework.value
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                          aria-hidden="true"
                        />
                        {framework.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      )
    },
  ),
)

ComboboxDemo.displayName = "ComboboxDemo"

export { ComboboxDemo }
