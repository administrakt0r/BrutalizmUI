"use client"

import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import * as React from "react"

import { cn } from "@/lib/utils"

export type ScrollAreaProps = React.ComponentPropsWithoutRef<
  typeof ScrollAreaPrimitive.Root
>

/**
 * ⚡ Bolt: ScrollArea component optimized with React.memo and React.forwardRef.
 */
const ScrollArea = React.memo(
  React.forwardRef<
    React.ElementRef<typeof ScrollAreaPrimitive.Root>,
    ScrollAreaProps
  >(({ className, children, ...props }, ref) => {
    return (
      <ScrollAreaPrimitive.Root
        ref={ref}
        data-slot="scroll-area"
        className={cn("relative overflow-hidden", className)}
        {...props}
      >
        <ScrollAreaPrimitive.Viewport className="h-full w-full font-base">
          {children}
        </ScrollAreaPrimitive.Viewport>
        <ScrollBar />
        <ScrollAreaPrimitive.Corner />
      </ScrollAreaPrimitive.Root>
    )
  }),
)

ScrollArea.displayName = "ScrollArea"

export type ScrollBarProps = React.ComponentPropsWithoutRef<
  typeof ScrollAreaPrimitive.ScrollAreaScrollbar
>

/**
 * ⚡ Bolt: ScrollBar component optimized with React.memo and React.forwardRef.
 */
const ScrollBar = React.memo(
  React.forwardRef<
    React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
    ScrollBarProps
  >(({ className, orientation = "vertical", ...props }, ref) => {
    return (
      <ScrollAreaPrimitive.ScrollAreaScrollbar
        ref={ref}
        data-slot="scroll-area-scrollbar"
        orientation={orientation}
        className={cn(
          "flex touch-none select-none transition-colors",
          orientation === "vertical" &&
            "h-full w-2.5 border-l border-l-transparent p-[1px]",
          orientation === "horizontal" &&
            "h-2.5 flex-col border-t border-t-transparent p-[1px]",
          className,
        )}
        {...props}
      >
        <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
      </ScrollAreaPrimitive.ScrollAreaScrollbar>
    )
  }),
)

ScrollBar.displayName = "ScrollBar"

export { ScrollArea, ScrollBar }
