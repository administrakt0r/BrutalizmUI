"use client"

import * as PopoverPrimitive from "@radix-ui/react-popover"

import * as React from "react"

import { cn } from "@/lib/utils"

export type PopoverProps = React.ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Root
>

/**
 * ⚡ Bolt: Popover component optimized with React.memo.
 */
const Popover = React.memo(({ ...props }: PopoverProps) => {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
})

Popover.displayName = "Popover"

export type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Trigger
>

/**
 * ⚡ Bolt: PopoverTrigger component optimized with React.memo and React.forwardRef.
 */
const PopoverTrigger = React.memo(
  React.forwardRef<
    React.ElementRef<typeof PopoverPrimitive.Trigger>,
    PopoverTriggerProps
  >(({ ...props }, ref) => {
    return (
      <PopoverPrimitive.Trigger
        ref={ref}
        data-slot="popover-trigger"
        {...props}
      />
    )
  }),
)

PopoverTrigger.displayName = "PopoverTrigger"

export type PopoverContentProps = React.ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Content
>

/**
 * ⚡ Bolt: PopoverContent component optimized with React.memo and React.forwardRef.
 */
const PopoverContent = React.memo(
  React.forwardRef<
    React.ElementRef<typeof PopoverPrimitive.Content>,
    PopoverContentProps
  >(({ className, align = "center", sideOffset = 4, ...props }, ref) => {
    return (
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          ref={ref}
          data-slot="popover-content"
          align={align}
          sideOffset={sideOffset}
          className={cn(
            "z-50 w-72 rounded-base border-2 border-border bg-main shadow-shadow p-4 text-foreground outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-popover-content-transform-origin)",
            className,
          )}
          {...props}
        />
      </PopoverPrimitive.Portal>
    )
  }),
)

PopoverContent.displayName = "PopoverContent"

export { Popover, PopoverTrigger, PopoverContent }
