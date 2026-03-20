import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import * as React from "react"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-base border-2 border-border px-2.5 py-0.5 text-xs font-base w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-main text-main-foreground",
        neutral: "bg-secondary-background text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export type BadgeProps = React.ComponentPropsWithoutRef<"span"> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean
  }

/**
 * ⚡ Bolt: Badge component optimized with React.memo and React.forwardRef.
 * This ensures stable references and prevents unnecessary re-renders.
 */
const Badge = React.memo(
  React.forwardRef<HTMLSpanElement, BadgeProps>(
    ({ className, variant, asChild = false, ...props }, ref) => {
      const Comp = asChild ? Slot : "span"

      return (
        <Comp
          ref={ref}
          data-slot="badge"
          className={cn(badgeVariants({ variant }), className)}
          {...props}
        />
      )
    },
  ),
)

Badge.displayName = "Badge"

export { Badge, badgeVariants }
