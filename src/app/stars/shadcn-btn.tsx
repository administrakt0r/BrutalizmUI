"use client"

import { Check } from "lucide-react"
import { toast } from "sonner"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

/**
 * ⚡ Bolt: Context to share the base CLI command across the stars grid,
 * preventing full grid re-renders when the package manager changes.
 */
export const PackageManagerContext = React.createContext<string>("")

export type ShadcnBtnProps = React.ComponentPropsWithoutRef<typeof Button> & {
  index: number
}

/**
 * ⚡ Bolt: ShadcnBtn component optimized with React.memo and React.forwardRef.
 * It provides "Copied" text feedback and toast notification on success.
 * Consumes PackageManagerContext to avoid prop drilling and unnecessary re-renders.
 */
const ShadcnBtn = React.memo(
  React.forwardRef<HTMLButtonElement, ShadcnBtnProps>(
    ({ index, ...props }, ref) => {
      const baseCommand = React.useContext(PackageManagerContext)
      const [copied, setCopied] = React.useState(false)

      const command = React.useMemo(
        () => `${baseCommand}s${index + 1}.json`,
        [baseCommand, index],
      )

      const handleCopy = React.useCallback(() => {
        if (copied) return

        navigator.clipboard.writeText(command)
        setCopied(true)
        toast.success(`Shadcn CLI command for Star ${index + 1} copied`)
        setTimeout(() => setCopied(false), 2000)
      }, [command, copied, index])

      const label = copied
        ? `Copied Shadcn CLI command for Star ${index + 1}`
        : `Copy Shadcn CLI command for Star ${index + 1}`

      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              ref={ref}
              data-slot="shadcn-btn"
              onClick={handleCopy}
              variant="noShadow"
              aria-label={label}
              {...props}
            >
              {copied ? "Copied" : "Copy"}
              {copied ? (
                <Check className="size-[18px]" aria-hidden="true" />
              ) : (
                <ShadcnIcon />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      )
    },
  ),
)

ShadcnBtn.displayName = "ShadcnBtn"

export default ShadcnBtn

/**
 * ⚡ Bolt: ShadcnIcon optimized with React.memo.
 */
const ShadcnIcon = React.memo(() => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="size-[18px]"
    viewBox="0 0 256 256"
    fill="none"
    aria-hidden="true"
  >
    <g clipPath="url(#clip0_574_2)">
      <path
        d="M208 128L128 208"
        stroke="black"
        strokeWidth="32"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M192 40L40 192"
        stroke="black"
        strokeWidth="32"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_574_2">
        <rect width="256" height="256" fill="white" />
      </clipPath>
    </defs>
  </svg>
))

ShadcnIcon.displayName = "ShadcnIcon"
