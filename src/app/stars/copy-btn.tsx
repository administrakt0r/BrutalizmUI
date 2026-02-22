"use client"

import { Check, Copy } from "lucide-react"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function CopyBtn({ id }: { id: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (copied) return

    try {
      const response = await fetch(`/r/${id}.json`)
      const data = await response.json()
      const code = data.files[0].content

      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy star code:", error)
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button onClick={handleCopy} variant="noShadow">
          Copy
          {copied ? (
            <Check className="size-[18px]" />
          ) : (
            <Copy className="size-[18px]" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Copy to clipboard</p>
      </TooltipContent>
    </Tooltip>
  )
}
