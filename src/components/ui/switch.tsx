"use client"

import * as SwitchPrimitive from "@radix-ui/react-switch"

import * as React from "react"

import { cn } from "@/lib/utils"

export type SwitchProps = React.ComponentPropsWithoutRef<
  typeof SwitchPrimitive.Root
>

/**
 * ⚡ Bolt: Switch component optimized with React.memo.
 */
const Switch = React.memo(
  React.forwardRef<React.ElementRef<typeof SwitchPrimitive.Root>, SwitchProps>(
    ({ className, id, ...props }, ref) => {
      const generatedId = React.useId()
      const switchId = id ?? generatedId

      return (
        <SwitchPrimitive.Root
          ref={ref}
          data-slot="switch"
          id={switchId}
          className={cn(
            "peer inline-flex h-6 w-12 shrink-0 cursor-pointer items-center rounded-full border-2 border-border bg-secondary-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-main data-[state=unchecked]:bg-secondary-background",
            className,
          )}
          {...props}
        >
          <SwitchPrimitive.Thumb
            data-slot="switch-thumb"
            className={cn(
              "pointer-events-none block h-4 w-4 rounded-full bg-white border-2 border-border ring-0 transition-transform data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-1",
            )}
          />
        </SwitchPrimitive.Root>
      )
    },
  ),
)

Switch.displayName = "Switch"

export { Switch }
