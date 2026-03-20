"use client"

import * as React from "react"

import STARS from "@/data/stars"

import { LazyRender } from "@/components/app/lazy-render"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import CopyBtn from "./copy-btn"
import ShadcnBtn, { PackageManagerContext } from "./shadcn-btn"

export default function StarsGrid() {
  const [command, setCommand] = React.useState(
    "pnpm dlx shadcn@latest add https://brutalizmui.pages.dev/r/",
  )

  const handleChange = React.useCallback((pkg: string) => {
    const baseCommand = "shadcn@latest add https://brutalizmui.pages.dev/r/"

    if (pkg === "pnpm") {
      setCommand("pnpm dlx " + baseCommand)
    } else if (pkg === "npm") {
      setCommand("npx " + baseCommand)
    } else if (pkg === "yarn") {
      setCommand("yarn dlx " + baseCommand)
    } else {
      setCommand("bunx --bun " + baseCommand)
    }
  }, [])

  return (
    <>
      <div className="mb-5 flex justify-end">
        <Select onValueChange={handleChange} defaultValue="pnpm">
          <SelectTrigger
            aria-label="Select package manager"
            className="w-[150px]"
          >
            <SelectValue placeholder="Pnpm" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Package manager</SelectLabel>
              <SelectItem value="pnpm">Pnpm</SelectItem>
              <SelectItem value="npm">Npm</SelectItem>
              <SelectItem value="yarn">Yarn</SelectItem>
              <SelectItem value="bun">Bun</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <PackageManagerContext.Provider value={command}>
        <div className="grid gap-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[50px]">
          {STARS.map((star, i) => {
            return <StarCard key={star.id} star={star} index={i} />
          })}
        </div>
      </PackageManagerContext.Provider>
    </>
  )
}

export type StarCardProps = React.ComponentPropsWithoutRef<"div"> & {
  star: (typeof STARS)[0]
  index: number
}

/**
 * ⚡ Bolt: StarCard component optimized with React.memo and React.forwardRef.
 */
const StarCard = React.memo(
  React.forwardRef<HTMLDivElement, StarCardProps>(
    ({ star, index, ...props }, ref) => {
      return (
        <div
          ref={ref}
          data-slot="star-card"
          className="flex items-center gap-4 p-5 justify-center flex-col border-2 border-border bg-secondary-background rounded-base shadow-shadow"
          {...props}
        >
          <LazyRender className="xl:size-[200px] md:size-[160px] size-[120px]">
            <star.componentExample />
          </LazyRender>

          <h2 className="font-heading text-lg xl:text-2xl">Star {index + 1}</h2>

          <div className="flex items-center gap-2">
            <ShadcnBtn index={index} />
            <CopyBtn id={star.id} name={`Star ${index + 1}`} />
          </div>
        </div>
      )
    },
  ),
)

StarCard.displayName = "StarCard"
