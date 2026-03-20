import * as React from "react"

import { cn } from "@/lib/utils"

export type InputProps = React.ComponentPropsWithoutRef<"input">

/**
 * ⚡ Bolt: Input component optimized with React.memo and React.forwardRef.
 */
const Input = React.memo(
  React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
      return (
        <input
          ref={ref}
          type={type}
          data-slot="input"
          className={cn(
            "flex h-10 w-full rounded-base border-2 border-border bg-secondary-background selection:bg-main selection:text-main-foreground px-3 py-2 text-sm font-base text-foreground file:border-0 file:bg-transparent file:text-sm file:font-heading placeholder:text-foreground/50 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-red-500 aria-invalid:ring-red-500",
            className,
          )}
          {...props}
        />
      )
    },
  ),
)

Input.displayName = "Input"

export { Input }
