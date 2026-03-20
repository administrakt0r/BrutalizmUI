import * as React from "react"

import { cn } from "@/lib/utils"

import { CopyButton } from "./copy-button"

export type PreProps = React.ComponentPropsWithoutRef<"pre"> & {
  __rawstring__?: string
  wrapperClassName?: string
}

/**
 * ⚡ Bolt: Pre component standardized with React.forwardRef, React.memo,
 * and data-slot attributes for architectural consistency.
 */
export const Pre = React.memo(
  React.forwardRef<HTMLPreElement, PreProps>(
    ({ children, __rawstring__ = "", wrapperClassName, className, ...props }, ref) => {
      return (
        <div
          data-slot="pre-wrapper"
          className={cn("relative shadow-shadow", wrapperClassName)}
        >
          <pre
            ref={ref}
            data-slot="pre"
            tabIndex={0}
            role="region"
            aria-label="Code snippet"
            className={cn(
              "bg-black border-2 border-border code text-sm max-h-[300px] overflow-auto p-4 not-prose focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              className,
            )}
            {...props}
          >
            <CopyButton text={__rawstring__} />
            {children}
          </pre>
        </div>
      )
    },
  ),
)

Pre.displayName = "Pre"
