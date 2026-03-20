"use client"

import * as LabelPrimitive from "@radix-ui/react-label"

import * as React from "react"

import { cn } from "@/lib/utils"

export type LabelProps = React.ComponentPropsWithoutRef<
  typeof LabelPrimitive.Root
>

/**
 * ⚡ Bolt: Label component optimized with React.memo and React.forwardRef.
 */
const Label = React.memo(
  React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, LabelProps>(
    ({ className, ...props }, ref) => {
      return (
        <LabelPrimitive.Root
          ref={ref}
          data-slot="label"
          className={cn(
            "text-sm font-heading leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            className,
          )}
          {...props}
        />
      )
    },
  ),
)

Label.displayName = "Label"

export { Label }
