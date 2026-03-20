"use client"

import { Drawer as DrawerPrimitive } from "vaul"

import * as React from "react"

import { cn } from "@/lib/utils"

export type DrawerProps = React.ComponentPropsWithoutRef<
  typeof DrawerPrimitive.Root
>

/**
 * ⚡ Bolt: Drawer component optimized with React.memo.
 */
const Drawer = React.memo(
  ({ shouldScaleBackground = true, ...props }: DrawerProps) => {
    return (
      <DrawerPrimitive.Root
        data-slot="drawer"
        shouldScaleBackground={shouldScaleBackground}
        {...props}
      />
    )
  },
)

Drawer.displayName = "Drawer"

export type DrawerTriggerProps = React.ComponentPropsWithoutRef<
  typeof DrawerPrimitive.Trigger
>

/**
 * ⚡ Bolt: DrawerTrigger component optimized with React.memo and React.forwardRef.
 */
const DrawerTrigger = React.memo(
  React.forwardRef<
    React.ElementRef<typeof DrawerPrimitive.Trigger>,
    DrawerTriggerProps
  >(({ ...props }, ref) => {
    return (
      <DrawerPrimitive.Trigger
        ref={ref}
        data-slot="drawer-trigger"
        {...props}
      />
    )
  }),
)

DrawerTrigger.displayName = "DrawerTrigger"

export type DrawerPortalProps = React.ComponentPropsWithoutRef<
  typeof DrawerPrimitive.Portal
>

/**
 * ⚡ Bolt: DrawerPortal component optimized with React.memo.
 */
const DrawerPortal = React.memo(({ ...props }: DrawerPortalProps) => {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
})

DrawerPortal.displayName = "DrawerPortal"

export type DrawerCloseProps = React.ComponentPropsWithoutRef<
  typeof DrawerPrimitive.Close
>

/**
 * ⚡ Bolt: DrawerClose component optimized with React.memo and React.forwardRef.
 */
const DrawerClose = React.memo(
  React.forwardRef<
    React.ElementRef<typeof DrawerPrimitive.Close>,
    DrawerCloseProps
  >(({ ...props }, ref) => {
    return (
      <DrawerPrimitive.Close ref={ref} data-slot="drawer-close" {...props} />
    )
  }),
)

DrawerClose.displayName = "DrawerClose"

export type DrawerOverlayProps = React.ComponentPropsWithoutRef<
  typeof DrawerPrimitive.Overlay
>

/**
 * ⚡ Bolt: DrawerOverlay component optimized with React.memo and React.forwardRef.
 */
const DrawerOverlay = React.memo(
  React.forwardRef<
    React.ElementRef<typeof DrawerPrimitive.Overlay>,
    DrawerOverlayProps
  >(({ className, ...props }, ref) => {
    return (
      <DrawerPrimitive.Overlay
        ref={ref}
        data-slot="drawer-overlay"
        className={cn(
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-overlay",
          className,
        )}
        {...props}
      />
    )
  }),
)

DrawerOverlay.displayName = "DrawerOverlay"

export type DrawerContentProps = React.ComponentPropsWithoutRef<
  typeof DrawerPrimitive.Content
>

/**
 * ⚡ Bolt: DrawerContent component optimized with React.memo and React.forwardRef.
 */
const DrawerContent = React.memo(
  React.forwardRef<
    React.ElementRef<typeof DrawerPrimitive.Content>,
    DrawerContentProps
  >(({ className, children, ...props }, ref) => {
    return (
      <DrawerPortal>
        <DrawerOverlay />
        <DrawerPrimitive.Content
          ref={ref}
          data-slot="drawer-content"
          className={cn(
            "bg-background group/drawer-content fixed z-50 flex h-auto flex-col",
            "data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-base border-t-2 border-t-border",
            "data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-base border-b-2 border-b-border",
            "data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:sm:max-w-sm border-r-2 border-r-border",
            "data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:sm:max-w-sm border-l-2 border-l-border",
            className,
          )}
          {...props}
        >
          <div
            aria-hidden="true"
            className="mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full group-data-[vaul-drawer-direction=bottom]/drawer-content:block bg-current"
          />
          {children}
        </DrawerPrimitive.Content>
      </DrawerPortal>
    )
  }),
)

DrawerContent.displayName = "DrawerContent"

export type DrawerHeaderProps = React.ComponentPropsWithoutRef<"div">

/**
 * ⚡ Bolt: DrawerHeader component optimized with React.memo and React.forwardRef.
 */
const DrawerHeader = React.memo(
  React.forwardRef<HTMLDivElement, DrawerHeaderProps>(
    ({ className, ...props }, ref) => {
      return (
        <div
          ref={ref}
          data-slot="drawer-header"
          className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
          {...props}
        />
      )
    },
  ),
)

DrawerHeader.displayName = "DrawerHeader"

export type DrawerFooterProps = React.ComponentPropsWithoutRef<"div">

/**
 * ⚡ Bolt: DrawerFooter component optimized with React.memo and React.forwardRef.
 */
const DrawerFooter = React.memo(
  React.forwardRef<HTMLDivElement, DrawerFooterProps>(
    ({ className, ...props }, ref) => {
      return (
        <div
          ref={ref}
          data-slot="drawer-footer"
          className={cn("mt-auto flex flex-col gap-3 p-4", className)}
          {...props}
        />
      )
    },
  ),
)

DrawerFooter.displayName = "DrawerFooter"

export type DrawerTitleProps = React.ComponentPropsWithoutRef<
  typeof DrawerPrimitive.Title
>

/**
 * ⚡ Bolt: DrawerTitle component optimized with React.memo and React.forwardRef.
 */
const DrawerTitle = React.memo(
  React.forwardRef<
    React.ElementRef<typeof DrawerPrimitive.Title>,
    DrawerTitleProps
  >(({ className, ...props }, ref) => {
    return (
      <DrawerPrimitive.Title
        ref={ref}
        data-slot="drawer-title"
        className={cn(
          "text-lg font-heading leading-none tracking-tight",
          className,
        )}
        {...props}
      />
    )
  }),
)

DrawerTitle.displayName = "DrawerTitle"

export type DrawerDescriptionProps = React.ComponentPropsWithoutRef<
  typeof DrawerPrimitive.Description
>

/**
 * ⚡ Bolt: DrawerDescription component optimized with React.memo and React.forwardRef.
 */
const DrawerDescription = React.memo(
  React.forwardRef<
    React.ElementRef<typeof DrawerPrimitive.Description>,
    DrawerDescriptionProps
  >(({ className, ...props }, ref) => {
    return (
      <DrawerPrimitive.Description
        ref={ref}
        data-slot="drawer-description"
        className={cn("text-sm font-base text-foreground", className)}
        {...props}
      />
    )
  }),
)

DrawerDescription.displayName = "DrawerDescription"

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
