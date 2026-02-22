"use client"

import { Check, Clipboard } from "lucide-react"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export interface CopyButtonProps {
  text: string
}

export function CopyButton({ text }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setIsCopied(true)

      setTimeout(() => {
        setIsCopied(false)
      }, 1500)
    } catch (error) {
      console.error("Failed to copy", error)
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          className="size-9 absolute right-3.5 top-2"
          variant="noShadow"
          onClick={copy}
          aria-label={isCopied ? "Copied" : "Copy"}
        >
          <span className="sr-only">{isCopied ? "Copied" : "Copy"}</span>
          {isCopied ? <Check aria-hidden="true" /> : <Clipboard aria-hidden="true" />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{isCopied ? "Copied!" : "Copy code"}</p>
      </TooltipContent>
    </Tooltip>
  )
}

CopyButton.displayName = "CopyButton"
