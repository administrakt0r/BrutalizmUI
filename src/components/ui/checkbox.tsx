"use client"

import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import * as React from "react"

import { cn } from "@/lib/utils"

export type CheckboxProps = React.ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
>

/**
 * ⚡ Bolt: Checkbox component optimized with React.memo and React.forwardRef.
 */
const Checkbox = React.memo(
  React.forwardRef<
    React.ElementRef<typeof CheckboxPrimitive.Root>,
    CheckboxProps
  >(({ className, id, ...props }, ref) => {
    const generatedId = React.useId()
    const checkboxId = id ?? generatedId

    return (
      <CheckboxPrimitive.Root
        ref={ref}
        data-slot="checkbox"
        id={checkboxId}
        className={cn(
          "peer size-4 shrink-0 outline-2 outline-border focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-main data-[state=checked]:text-white",
          className,
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          data-slot="checkbox-indicator"
          className={cn("flex items-center justify-center text-current")}
        >
          <Check className="size-4 text-main-foreground" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    )
  }),
)

Checkbox.displayName = "Checkbox"

export { Checkbox }
