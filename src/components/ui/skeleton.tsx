import * as React from "react"

import { cn } from "@/lib/utils"

export type SkeletonProps = React.ComponentPropsWithoutRef<"div">

/**
 * ⚡ Bolt: Skeleton component optimized with React.memo and forwardRef.
 */
const Skeleton = React.memo(
  React.forwardRef<HTMLDivElement, SkeletonProps>(
    ({ className, ...props }, ref) => (
      <div
        ref={ref}
        data-slot="skeleton"
        className={cn(
          "animate-pulse rounded-base bg-secondary-background border-2 border-border",
          className,
        )}
        {...props}
      />
    ),
  ),
)

Skeleton.displayName = "Skeleton"

export { Skeleton }
