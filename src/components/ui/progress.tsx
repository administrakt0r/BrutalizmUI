"use client"

import * as ProgressPrimitive from "@radix-ui/react-progress"

import * as React from "react"

import { cn } from "@/lib/utils"

export type ProgressProps = React.ComponentPropsWithoutRef<
  typeof ProgressPrimitive.Root
> & {
  value?: number
}

/**
 * ⚡ Bolt: Progress component optimized with React.memo.
 */
const Progress = React.memo(
  React.forwardRef<
    React.ElementRef<typeof ProgressPrimitive.Root>,
    ProgressProps
  >(({ className, value, ...props }, ref) => (
    <ProgressPrimitive.Root
      ref={ref}
      data-slot="progress"
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-base border-2 border-border bg-secondary-background",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="h-full w-full flex-1 border-r-2 border-border bg-main transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )),
)

Progress.displayName = "Progress"

export { Progress }
