"use client"

import { GripVertical } from "lucide-react"
import * as ResizablePrimitive from "react-resizable-panels"

import * as React from "react"

import { cn } from "@/lib/utils"

export type ResizablePanelGroupProps = React.ComponentPropsWithoutRef<
  typeof ResizablePrimitive.PanelGroup
>

/**
 * ⚡ Bolt: ResizablePanelGroup component optimized with React.memo and React.forwardRef.
 */
const ResizablePanelGroup = React.memo(
  React.forwardRef<
    React.ElementRef<typeof ResizablePrimitive.PanelGroup>,
    ResizablePanelGroupProps
  >(({ className, ...props }, ref) => {
    return (
      <ResizablePrimitive.PanelGroup
        ref={ref}
        data-slot="resizable-panel-group"
        className={cn(
          "flex h-full w-full font-base data-[panel-group-direction=vertical]:flex-col",
          className,
        )}
        {...props}
      />
    )
  }),
)

ResizablePanelGroup.displayName = "ResizablePanelGroup"

export type ResizablePanelProps = React.ComponentPropsWithoutRef<
  typeof ResizablePrimitive.Panel
>

/**
 * ⚡ Bolt: ResizablePanel component optimized with React.memo and React.forwardRef.
 */
const ResizablePanel = React.memo(
  React.forwardRef<
    React.ElementRef<typeof ResizablePrimitive.Panel>,
    ResizablePanelProps
  >(({ className, ...props }, ref) => {
    return (
      <ResizablePrimitive.Panel
        ref={ref}
        data-slot="resizable-panel"
        className={cn(className)}
        {...props}
      />
    )
  }),
)

ResizablePanel.displayName = "ResizablePanel"

export type ResizableHandleProps = React.ComponentPropsWithoutRef<
  typeof ResizablePrimitive.PanelResizeHandle
> & {
  withHandle?: boolean
}

/**
 * ⚡ Bolt: ResizableHandle component optimized with React.memo.
 */
const ResizableHandle = React.memo(
  ({ withHandle, className, ...props }: ResizableHandleProps) => {
    return (
      <ResizablePrimitive.PanelResizeHandle
        data-slot="resizable-handle"
        aria-label="Resize handle"
        className={cn(
          "relative flex w-0.5 items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring data-[panel-group-direction=vertical]:h-0.5 data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
          className,
        )}
        {...props}
      >
        {withHandle && (
          <div className="z-10 flex h-4 w-3 items-center justify-center rounded-base border bg-border">
            <GripVertical className="size-2.5" />
          </div>
        )}
      </ResizablePrimitive.PanelResizeHandle>
    )
  },
)

ResizableHandle.displayName = "ResizableHandle"

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
