"use client"

import { Check, Copy } from "lucide-react"
import { toast } from "sonner"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { sanitizeCSSVariable } from "@/lib/security"

export type CopyBtnProps = React.ComponentPropsWithoutRef<typeof Button> & {
  id: string
  name?: string
}

/**
 * ⚡ Bolt: CopyBtn optimized with React.memo and React.forwardRef.
 * It provides toast notification on success.
 */
const CopyBtn = React.memo(
  React.forwardRef<HTMLButtonElement, CopyBtnProps>(
    ({ id, name, ...props }, ref) => {
      const [copied, setCopied] = React.useState(false)
      const [isLoading, setIsLoading] = React.useState(false)

      const handleCopy = React.useCallback(async () => {
        if (copied || isLoading) return

        setIsLoading(true)
        try {
          const sanitizedId = sanitizeCSSVariable(id)
          if (!sanitizedId) {
            throw new Error("Invalid star identifier")
          }
          const response = await fetch(`/r/${sanitizedId}.json`)
          const data = await response.json()
          const code = data.files[0].content

          await navigator.clipboard.writeText(code)
          setCopied(true)
          toast.success(`Code for ${name ?? "star"} copied to clipboard`)
          setTimeout(() => setCopied(false), 2000)
        } catch (error) {
          toast.error("Failed to copy star code.")
        } finally {
          setIsLoading(false)
        }
      }, [id, copied, isLoading, name])

      const label = copied
        ? `Copied code for ${name ?? "star"}`
        : `Copy code for ${name ?? "star"}`

      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              ref={ref}
              data-slot="copy-btn"
              onClick={handleCopy}
              variant="noShadow"
              isLoading={isLoading}
              aria-label={label}
              {...props}
            >
            {copied ? "Copied" : "Copy"}
            {copied ? (
              <Check className="size-[18px]" aria-hidden="true" />
            ) : (
              <Copy className="size-[18px]" aria-hidden="true" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    )
  }),
)

CopyBtn.displayName = "CopyBtn"

export default CopyBtn
