"use client"

import { memo, useState } from "react"

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
import { TooltipProvider } from "@/components/ui/tooltip"

import CopyBtn from "./copy-btn"
import { PackageManagerProvider } from "./package-manager-context"
import ShadcnBtn from "./shadcn-btn"

export default function StarsGrid() {
  const [command, setCommand] = useState(
    "pnpm dlx shadcn@latest add https://brutalizmui.pages.dev/r/",
  )

  const handleChange = (pkg: string) => {
    const command = "shadcn@latest add https://brutalizmui.pages.dev/r/"

    if (pkg === "pnpm") {
      setCommand("pnpm dlx " + command)
    } else if (pkg === "npm") {
      setCommand("npx " + command)
    } else if (pkg === "yarn") {
      setCommand("npx " + command)
    } else {
      setCommand("bunx --bun " + command)
    }
  }

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

      {/* One provider for all cards avoids creating 40 duplicate tooltip contexts. */}
      <TooltipProvider delayDuration={0}>
        <PackageManagerProvider value={command}>
          <div className="grid gap-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[50px]">
            {STARS.map((star, i) => (
              <StarItem key={i} star={star} i={i} />
            ))}
          </div>
        </PackageManagerProvider>
      </TooltipProvider>
    </>
  )
}

const StarItem = memo(
  ({ star, i }: { star: (typeof STARS)[0]; i: number }) => {
    return (
      <div className="flex items-center gap-4 p-5 justify-center flex-col border-2 border-border bg-secondary-background rounded-base shadow-shadow">
        <div className="xl:size-[200px] md:size-[160px] size-[120px]">
          <star.componentExample />
        </div>

        <h4 className="font-heading">Star {i + 1}</h4>

        <div className="flex items-center gap-2">
          <ShadcnBtn id={`s${i + 1}`} />
          <CopyBtn code={star.code} />
        </div>
      </div>
    )
  },
)

StarItem.displayName = "StarItem"
