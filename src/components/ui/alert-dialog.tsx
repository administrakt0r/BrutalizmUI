"use client"

import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

import * as React from "react"

import { buttonVariants } from "@/components/ui/button"

import { cn } from "@/lib/utils"

export type AlertDialogProps = React.ComponentPropsWithoutRef<
  typeof AlertDialogPrimitive.Root
>

/**
 * ⚡ Bolt: AlertDialog component optimized with React.memo.
 */
const AlertDialog = React.memo(({ ...props }: AlertDialogProps) => {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
})

AlertDialog.displayName = "AlertDialog"

export type AlertDialogTriggerProps = React.ComponentPropsWithoutRef<
  typeof AlertDialogPrimitive.Trigger
>

/**
 * ⚡ Bolt: AlertDialogTrigger component optimized with React.memo and React.forwardRef.
 */
const AlertDialogTrigger = React.memo(
  React.forwardRef<
    React.ElementRef<typeof AlertDialogPrimitive.Trigger>,
    AlertDialogTriggerProps
  >(({ ...props }, ref) => {
    return (
      <AlertDialogPrimitive.Trigger
        ref={ref}
        data-slot="alert-dialog-trigger"
        {...props}
      />
    )
  }),
)

AlertDialogTrigger.displayName = "AlertDialogTrigger"

export type AlertDialogPortalProps = React.ComponentPropsWithoutRef<
  typeof AlertDialogPrimitive.Portal
>

/**
 * ⚡ Bolt: AlertDialogPortal component optimized with React.memo.
 */
const AlertDialogPortal = React.memo(({ ...props }: AlertDialogPortalProps) => {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  )
})

AlertDialogPortal.displayName = "AlertDialogPortal"

export type AlertDialogOverlayProps = React.ComponentPropsWithoutRef<
  typeof AlertDialogPrimitive.Overlay
>

/**
 * ⚡ Bolt: AlertDialogOverlay component optimized with React.memo and React.forwardRef.
 */
const AlertDialogOverlay = React.memo(
  React.forwardRef<
    React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
    AlertDialogOverlayProps
  >(({ className, ...props }, ref) => {
    return (
      <AlertDialogPrimitive.Overlay
        ref={ref}
        data-slot="alert-dialog-overlay"
        className={cn(
          "fixed inset-0 z-50 bg-overlay data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          className,
        )}
        {...props}
      />
    )
  }),
)

AlertDialogOverlay.displayName = "AlertDialogOverlay"

export type AlertDialogContentProps = React.ComponentPropsWithoutRef<
  typeof AlertDialogPrimitive.Content
>

/**
 * ⚡ Bolt: AlertDialogContent component optimized with React.memo and React.forwardRef.
 */
const AlertDialogContent = React.memo(
  React.forwardRef<
    React.ElementRef<typeof AlertDialogPrimitive.Content>,
    AlertDialogContentProps
  >(({ className, ...props }, ref) => {
    return (
      <AlertDialogPortal>
        <AlertDialogOverlay />
        <AlertDialogPrimitive.Content
          ref={ref}
          data-slot="alert-dialog-content"
          className={cn(
            "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-base border-2 border-border p-6 shadow-shadow duration-200 sm:max-w-lg",
            className,
          )}
          {...props}
        />
      </AlertDialogPortal>
    )
  }),
)

AlertDialogContent.displayName = "AlertDialogContent"

export type AlertDialogHeaderProps = React.ComponentPropsWithoutRef<"div">

/**
 * ⚡ Bolt: AlertDialogHeader component optimized with React.memo and React.forwardRef.
 */
const AlertDialogHeader = React.memo(
  React.forwardRef<HTMLDivElement, AlertDialogHeaderProps>(
    ({ className, ...props }, ref) => {
      return (
        <div
          ref={ref}
          data-slot="alert-dialog-header"
          className={cn(
            "flex flex-col gap-2 text-center sm:text-left",
            className,
          )}
          {...props}
        />
      )
    },
  ),
)

AlertDialogHeader.displayName = "AlertDialogHeader"

export type AlertDialogFooterProps = React.ComponentPropsWithoutRef<"div">

/**
 * ⚡ Bolt: AlertDialogFooter component optimized with React.memo and React.forwardRef.
 */
const AlertDialogFooter = React.memo(
  React.forwardRef<HTMLDivElement, AlertDialogFooterProps>(
    ({ className, ...props }, ref) => {
      return (
        <div
          ref={ref}
          data-slot="alert-dialog-footer"
          className={cn(
            "flex flex-col-reverse gap-3 sm:flex-row sm:justify-end",
            className,
          )}
          {...props}
        />
      )
    },
  ),
)

AlertDialogFooter.displayName = "AlertDialogFooter"

export type AlertDialogTitleProps = React.ComponentPropsWithoutRef<
  typeof AlertDialogPrimitive.Title
>

/**
 * ⚡ Bolt: AlertDialogTitle component optimized with React.memo and React.forwardRef.
 */
const AlertDialogTitle = React.memo(
  React.forwardRef<
    React.ElementRef<typeof AlertDialogPrimitive.Title>,
    AlertDialogTitleProps
  >(({ className, ...props }, ref) => {
    return (
      <AlertDialogPrimitive.Title
        ref={ref}
        data-slot="alert-dialog-title"
        className={cn("text-lg font-heading", className)}
        {...props}
      />
    )
  }),
)

AlertDialogTitle.displayName = "AlertDialogTitle"

export type AlertDialogDescriptionProps = React.ComponentPropsWithoutRef<
  typeof AlertDialogPrimitive.Description
>

/**
 * ⚡ Bolt: AlertDialogDescription component optimized with React.memo and React.forwardRef.
 */
const AlertDialogDescription = React.memo(
  React.forwardRef<
    React.ElementRef<typeof AlertDialogPrimitive.Description>,
    AlertDialogDescriptionProps
  >(({ className, ...props }, ref) => {
    return (
      <AlertDialogPrimitive.Description
        ref={ref}
        data-slot="alert-dialog-description"
        className={cn("text-sm font-base text-foreground", className)}
        {...props}
      />
    )
  }),
)

AlertDialogDescription.displayName = "AlertDialogDescription"

export type AlertDialogActionProps = React.ComponentPropsWithoutRef<
  typeof AlertDialogPrimitive.Action
>

/**
 * ⚡ Bolt: AlertDialogAction component optimized with React.memo and React.forwardRef.
 */
const AlertDialogAction = React.memo(
  React.forwardRef<
    React.ElementRef<typeof AlertDialogPrimitive.Action>,
    AlertDialogActionProps
  >(({ className, ...props }, ref) => {
    return (
      <AlertDialogPrimitive.Action
        ref={ref}
        data-slot="alert-dialog-action"
        className={cn(buttonVariants(), className)}
        {...props}
      />
    )
  }),
)

AlertDialogAction.displayName = "AlertDialogAction"

export type AlertDialogCancelProps = React.ComponentPropsWithoutRef<
  typeof AlertDialogPrimitive.Cancel
>

/**
 * ⚡ Bolt: AlertDialogCancel component optimized with React.memo and React.forwardRef.
 */
const AlertDialogCancel = React.memo(
  React.forwardRef<
    React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
    AlertDialogCancelProps
  >(({ className, ...props }, ref) => {
    return (
      <AlertDialogPrimitive.Cancel
        ref={ref}
        data-slot="alert-dialog-cancel"
        className={cn(buttonVariants({ variant: "neutral" }), className)}
        {...props}
      />
    )
  }),
)

AlertDialogCancel.displayName = "AlertDialogCancel"

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
