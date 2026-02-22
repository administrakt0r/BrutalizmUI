"use client"

import { memo, useCallback, useState } from "react"

import STARS from "@/data/stars"

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
import ShadcnBtn from "./shadcn-btn"

export default function StarsGrid() {
  const [command, setCommand] = useState(
    "pnpm dlx shadcn@latest add https://brutalizmui.pages.dev/r/",
  )

  const handleChange = useCallback((pkg: string) => {
    const command = "shadcn@latest add https://brutalizmui.pages.dev/r/"

    if (pkg === "pnpm") {
      setCommand("pnpm dlx " + command)
    } else if (pkg === "npm") {
      setCommand("npx " + command)
    } else if (pkg === "yarn") {
      setCommand("yarn dlx " + command)
    } else {
      setCommand("bunx --bun " + command)
    }
  }, [])

  return (
    <>
      <div className="mb-5 flex justify-end">
        <Select onValueChange={handleChange} defaultValue="pnpm">
          <SelectTrigger className="w-[150px]">
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

      {/* ⚡ Bolt: Removed redundant TooltipProvider as it is already provided in the root layout. */}
      <div className="grid gap-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[50px]">
        {STARS.map((star, i) => {
          return (
            <StarCard
              key={star.id}
              star={star}
              index={i}
              command={command + `s${i + 1}.json`}
            />
          )
        })}
      </div>
    </>
  )
}

const StarCard = memo(
  ({
    star,
    index,
    command,
  }: {
    star: (typeof STARS)[0]
    index: number
    command: string
  }) => {
    return (
      <div className="flex items-center gap-4 p-5 justify-center flex-col border-2 border-border bg-secondary-background rounded-base shadow-shadow">
        <div className="xl:size-[200px] md:size-[160px] size-[120px]">
          <star.componentExample />
        </div>

        <h4 className="font-heading">Star {index + 1}</h4>

        <div className="flex items-center gap-2">
          <ShadcnBtn command={command} />
          <CopyBtn id={star.id} />
        </div>
      </div>
    )
  },
)

StarCard.displayName = "StarCard"
