import * as React from "react"

import { cn } from "@/lib/utils"

export type TextareaProps = React.ComponentPropsWithoutRef<"textarea">

/**
 * ⚡ Bolt: Textarea component optimized with React.memo and React.forwardRef.
 */
const Textarea = React.memo(
  React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
      return (
        <textarea
          ref={ref}
          data-slot="textarea"
          className={cn(
            "flex min-h-[80px] w-full rounded-base border-2 border-border bg-secondary-background selection:bg-main selection:text-main-foreground px-3 py-2 text-sm font-base text-foreground placeholder:text-foreground/50 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-red-500 aria-invalid:ring-red-500",
            className,
          )}
          {...props}
        />
      )
    },
  ),
)

Textarea.displayName = "Textarea"

export { Textarea }
