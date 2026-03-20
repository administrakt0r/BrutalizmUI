"use client"

import { Check, Clipboard } from "lucide-react"
import { toast } from "sonner"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { cn } from "@/lib/utils"

export type CopyButtonProps = React.ComponentPropsWithoutRef<typeof Button> & {
  text: string
}

/**
 * 🌐 Atlas: CopyButton component optimized with React.memo and React.forwardRef.
 */
const CopyButton = React.memo(
  React.forwardRef<HTMLButtonElement, CopyButtonProps>(
    (
      {
        text,
        className,
        variant = "noShadow",
        size = "icon",
        "aria-label": ariaLabel,
        ...props
      },
      ref,
    ) => {
      const [isCopied, setIsCopied] = React.useState(false)

      const copy = React.useCallback(async () => {
        try {
          await navigator.clipboard.writeText(text)
          setIsCopied(true)

          setTimeout(() => {
            setIsCopied(false)
          }, 1500)
        } catch (error) {
          toast.error("Failed to copy code to clipboard.")
        }
      }, [text])

      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              ref={ref}
              data-slot="copy-button"
              size={size}
              variant={variant}
              className={cn("size-9 absolute right-3.5 top-2", className)}
              onClick={copy}
              aria-label={isCopied ? "Copied" : (ariaLabel ?? "Copy code to clipboard")}
              {...props}
            >
              <span className="sr-only">{isCopied ? "Copied" : (ariaLabel ?? "Copy code to clipboard")}</span>
              {isCopied ? (
                <Check aria-hidden="true" />
              ) : (
                <Clipboard aria-hidden="true" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isCopied ? "Copied!" : "Copy code"}</p>
          </TooltipContent>
        </Tooltip>
      )
    },
  ),
)

CopyButton.displayName = "CopyButton"

export { CopyButton }
