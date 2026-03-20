"use client"

import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import * as React from "react"

import { cn } from "@/lib/utils"

export type TooltipProviderProps = React.ComponentPropsWithoutRef<
  typeof TooltipPrimitive.Provider
>

/**
 * ⚡ Bolt: TooltipProvider component optimized with React.memo.
 */
const TooltipProvider = React.memo(
  ({ delayDuration = 0, ...props }: TooltipProviderProps) => (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  ),
)

TooltipProvider.displayName = "TooltipProvider"

export type TooltipProps = React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root>

/**
 * ⚡ Bolt: Tooltip component optimized with React.memo.
 */
const Tooltip = React.memo(({ ...props }: TooltipProps) => (
  <TooltipPrimitive.Root data-slot="tooltip" {...props} />
))

Tooltip.displayName = "Tooltip"

export type TooltipTriggerProps = React.ComponentPropsWithoutRef<
  typeof TooltipPrimitive.Trigger
>

/**
 * ⚡ Bolt: TooltipTrigger component optimized with React.memo.
 */
const TooltipTrigger = React.memo(
  React.forwardRef<
    React.ElementRef<typeof TooltipPrimitive.Trigger>,
    TooltipTriggerProps
  >(({ ...props }, ref) => (
    <TooltipPrimitive.Trigger
      ref={ref}
      data-slot="tooltip-trigger"
      {...props}
    />
  )),
)

TooltipTrigger.displayName = "TooltipTrigger"

export type TooltipContentProps = React.ComponentPropsWithoutRef<
  typeof TooltipPrimitive.Content
>

/**
 * ⚡ Bolt: TooltipContent component optimized with React.memo.
 */
const TooltipContent = React.memo(
  React.forwardRef<
    React.ElementRef<typeof TooltipPrimitive.Content>,
    TooltipContentProps
  >(({ className, sideOffset = 4, ...props }, ref) => (
    <TooltipPrimitive.Content
      ref={ref}
      data-slot="tooltip-content"
      sideOffset={sideOffset}
      className={cn(
        "z-50 overflow-hidden rounded-base border-2 border-border bg-main px-3 py-1.5 text-sm font-base text-main-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-tooltip-content-transform-origin)",
        className,
      )}
      {...props}
    />
  )),
)

TooltipContent.displayName = "TooltipContent"

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
