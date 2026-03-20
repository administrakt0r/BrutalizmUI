"use client"

import * as SheetPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import * as React from "react"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { cn } from "@/lib/utils"

export type SheetProps = React.ComponentPropsWithoutRef<
  typeof SheetPrimitive.Root
>

/**
 * ⚡ Bolt: Sheet component optimized with React.memo and React.forwardRef.
 */
const Sheet = React.memo(({ ...props }: SheetProps) => {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
})

Sheet.displayName = "Sheet"

export type SheetTriggerProps = React.ComponentPropsWithoutRef<
  typeof SheetPrimitive.Trigger
>

/**
 * ⚡ Bolt: SheetTrigger component optimized with React.memo and React.forwardRef.
 */
const SheetTrigger = React.memo(
  React.forwardRef<
    React.ElementRef<typeof SheetPrimitive.Trigger>,
    SheetTriggerProps
  >(({ ...props }, ref) => {
    return (
      <SheetPrimitive.Trigger ref={ref} data-slot="sheet-trigger" {...props} />
    )
  }),
)

SheetTrigger.displayName = "SheetTrigger"

export type SheetCloseProps = React.ComponentPropsWithoutRef<
  typeof SheetPrimitive.Close
>

/**
 * ⚡ Bolt: SheetClose component optimized with React.memo and React.forwardRef.
 */
const SheetClose = React.memo(
  React.forwardRef<
    React.ElementRef<typeof SheetPrimitive.Close>,
    SheetCloseProps
  >(({ ...props }, ref) => {
    return <SheetPrimitive.Close ref={ref} data-slot="sheet-close" {...props} />
  }),
)

SheetClose.displayName = "SheetClose"

export type SheetPortalProps = React.ComponentPropsWithoutRef<
  typeof SheetPrimitive.Portal
>

/**
 * ⚡ Bolt: SheetPortal component optimized with React.memo.
 */
const SheetPortal = React.memo(({ ...props }: SheetPortalProps) => {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
})

SheetPortal.displayName = "SheetPortal"

export type SheetOverlayProps = React.ComponentPropsWithoutRef<
  typeof SheetPrimitive.Overlay
>

/**
 * ⚡ Bolt: SheetOverlay component optimized with React.memo and React.forwardRef.
 */
const SheetOverlay = React.memo(
  React.forwardRef<
    React.ElementRef<typeof SheetPrimitive.Overlay>,
    SheetOverlayProps
  >(({ className, ...props }, ref) => {
    return (
      <SheetPrimitive.Overlay
        ref={ref}
        data-slot="sheet-overlay"
        className={cn(
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-overlay",
          className,
        )}
        {...props}
      />
    )
  }),
)

SheetOverlay.displayName = "SheetOverlay"

export type SheetContentProps = React.ComponentPropsWithoutRef<
  typeof SheetPrimitive.Content
> & {
  side?: "top" | "bottom" | "left" | "right"
}

/**
 * ⚡ Bolt: SheetContent component optimized with React.memo and React.forwardRef.
 */
const SheetContent = React.memo(
  React.forwardRef<
    React.ElementRef<typeof SheetPrimitive.Content>,
    SheetContentProps
  >(({ className, children, side = "right", ...props }, ref) => {
    return (
      <SheetPortal>
        <SheetOverlay />
        <SheetPrimitive.Content
          ref={ref}
          data-slot="sheet-content"
          className={cn(
            "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 border-2 border-border transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
            side === "right" &&
              "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
            side === "left" &&
              "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
            side === "top" &&
              "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
            side === "bottom" &&
              "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
            className,
          )}
          {...props}
        >
          {children}
          <Tooltip>
            <TooltipTrigger asChild>
              <SheetPrimitive.Close
                aria-label="Close"
                className="absolute right-4 top-4 rounded-base focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </SheetPrimitive.Close>
            </TooltipTrigger>
            <TooltipContent>
              <p>Close</p>
            </TooltipContent>
          </Tooltip>
        </SheetPrimitive.Content>
      </SheetPortal>
    )
  }),
)

SheetContent.displayName = "SheetContent"

export type SheetHeaderProps = React.ComponentPropsWithoutRef<"div">

/**
 * ⚡ Bolt: SheetHeader component optimized with React.memo and React.forwardRef.
 */
const SheetHeader = React.memo(
  React.forwardRef<HTMLDivElement, SheetHeaderProps>(
    ({ className, ...props }, ref) => {
      return (
        <div
          ref={ref}
          data-slot="sheet-header"
          className={cn("flex flex-col gap-1.5 p-4", className)}
          {...props}
        />
      )
    },
  ),
)

SheetHeader.displayName = "SheetHeader"

export type SheetFooterProps = React.ComponentPropsWithoutRef<"div">

/**
 * ⚡ Bolt: SheetFooter component optimized with React.memo and React.forwardRef.
 */
const SheetFooter = React.memo(
  React.forwardRef<HTMLDivElement, SheetFooterProps>(
    ({ className, ...props }, ref) => {
      return (
        <div
          ref={ref}
          data-slot="sheet-footer"
          className={cn("mt-auto flex flex-col gap-3 p-4", className)}
          {...props}
        />
      )
    },
  ),
)

SheetFooter.displayName = "SheetFooter"

export type SheetTitleProps = React.ComponentPropsWithoutRef<
  typeof SheetPrimitive.Title
>

/**
 * ⚡ Bolt: SheetTitle component optimized with React.memo and React.forwardRef.
 */
const SheetTitle = React.memo(
  React.forwardRef<
    React.ElementRef<typeof SheetPrimitive.Title>,
    SheetTitleProps
  >(({ className, ...props }, ref) => {
    return (
      <SheetPrimitive.Title
        ref={ref}
        data-slot="sheet-title"
        className={cn("text-foreground font-heading", className)}
        {...props}
      />
    )
  }),
)

SheetTitle.displayName = "SheetTitle"

export type SheetDescriptionProps = React.ComponentPropsWithoutRef<
  typeof SheetPrimitive.Description
>

/**
 * ⚡ Bolt: SheetDescription component optimized with React.memo and React.forwardRef.
 */
const SheetDescription = React.memo(
  React.forwardRef<
    React.ElementRef<typeof SheetPrimitive.Description>,
    SheetDescriptionProps
  >(({ className, ...props }, ref) => {
    return (
      <SheetPrimitive.Description
        ref={ref}
        data-slot="sheet-description"
        className={cn("text-sm text-foreground font-base", className)}
        {...props}
      />
    )
  }),
)

SheetDescription.displayName = "SheetDescription"

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
