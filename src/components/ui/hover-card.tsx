"use client"

import * as HoverCardPrimitive from "@radix-ui/react-hover-card"

import * as React from "react"

import { cn } from "@/lib/utils"

export type HoverCardProps = React.ComponentPropsWithoutRef<
  typeof HoverCardPrimitive.Root
>

/**
 * ⚡ Bolt: HoverCard component optimized with React.memo.
 */
const HoverCard = React.memo(({ ...props }: HoverCardProps) => {
  return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />
})

HoverCard.displayName = "HoverCard"

export type HoverCardTriggerProps = React.ComponentPropsWithoutRef<
  typeof HoverCardPrimitive.Trigger
>

/**
 * ⚡ Bolt: HoverCardTrigger component optimized with React.memo and React.forwardRef.
 */
const HoverCardTrigger = React.memo(
  React.forwardRef<
    React.ElementRef<typeof HoverCardPrimitive.Trigger>,
    HoverCardTriggerProps
  >(({ ...props }, ref) => {
    return (
      <HoverCardPrimitive.Trigger
        ref={ref}
        data-slot="hover-card-trigger"
        {...props}
      />
    )
  }),
)

HoverCardTrigger.displayName = "HoverCardTrigger"

export type HoverCardContentProps = React.ComponentPropsWithoutRef<
  typeof HoverCardPrimitive.Content
>

/**
 * ⚡ Bolt: HoverCardContent component optimized with React.memo and React.forwardRef.
 */
const HoverCardContent = React.memo(
  React.forwardRef<
    React.ElementRef<typeof HoverCardPrimitive.Content>,
    HoverCardContentProps
  >(({ className, align = "center", sideOffset = 4, ...props }, ref) => {
    return (
      <HoverCardPrimitive.Content
        ref={ref}
        data-slot="hover-card-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 w-64 rounded-base border-2 border-border bg-main p-4 font-base text-main-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-hover-card-content-transform-origin)",
          className,
        )}
        {...props}
      />
    )
  }),
)

HoverCardContent.displayName = "HoverCardContent"

export { HoverCard, HoverCardTrigger, HoverCardContent }
