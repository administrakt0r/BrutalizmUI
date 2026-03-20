"use client"

import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import * as React from "react"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { cn } from "@/lib/utils"

export type DialogProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Root
>

/**
 * ⚡ Bolt: Dialog component optimized with React.memo.
 */
const Dialog = React.memo(({ ...props }: DialogProps) => {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
})

Dialog.displayName = "Dialog"

export type DialogTriggerProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Trigger
>

/**
 * ⚡ Bolt: DialogTrigger component optimized with React.memo and React.forwardRef.
 */
const DialogTrigger = React.memo(
  React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Trigger>,
    DialogTriggerProps
  >(({ ...props }, ref) => {
    return (
      <DialogPrimitive.Trigger
        ref={ref}
        data-slot="dialog-trigger"
        {...props}
      />
    )
  }),
)

DialogTrigger.displayName = "DialogTrigger"

export type DialogPortalProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Portal
>

/**
 * ⚡ Bolt: DialogPortal component optimized with React.memo.
 */
const DialogPortal = React.memo(({ ...props }: DialogPortalProps) => {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
})

DialogPortal.displayName = "DialogPortal"

export type DialogCloseProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Close
>

/**
 * ⚡ Bolt: DialogClose component optimized with React.memo and React.forwardRef.
 */
const DialogClose = React.memo(
  React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Close>,
    DialogCloseProps
  >(({ ...props }, ref) => {
    return (
      <DialogPrimitive.Close ref={ref} data-slot="dialog-close" {...props} />
    )
  }),
)

DialogClose.displayName = "DialogClose"

export type DialogOverlayProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Overlay
>

/**
 * ⚡ Bolt: DialogOverlay component optimized with React.memo and React.forwardRef.
 */
const DialogOverlay = React.memo(
  React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Overlay>,
    DialogOverlayProps
  >(({ className, ...props }, ref) => {
    return (
      <DialogPrimitive.Overlay
        ref={ref}
        data-slot="dialog-overlay"
        className={cn(
          "fixed inset-0 z-50 bg-overlay data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          className,
        )}
        {...props}
      />
    )
  }),
)

DialogOverlay.displayName = "DialogOverlay"

export type DialogContentProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Content
>

/**
 * ⚡ Bolt: DialogContent component optimized with React.memo and React.forwardRef.
 */
const DialogContent = React.memo(
  React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Content>,
    DialogContentProps
  >(({ className, children, ...props }, ref) => {
    return (
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
          ref={ref}
          data-slot="dialog-content"
          className={cn(
            "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-base border-2 border-border p-6 shadow-shadow duration-200 sm:max-w-lg",
            className,
          )}
          {...props}
        >
          {children}
          <Tooltip>
            <TooltipTrigger asChild>
              <DialogPrimitive.Close
                aria-label="Close"
                className="absolute right-4 top-4 rounded-base opacity-100 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
              >
                <X aria-hidden="true" />
              </DialogPrimitive.Close>
            </TooltipTrigger>
            <TooltipContent>
              <p>Close</p>
            </TooltipContent>
          </Tooltip>
        </DialogPrimitive.Content>
      </DialogPortal>
    )
  }),
)

DialogContent.displayName = "DialogContent"

export type DialogHeaderProps = React.ComponentPropsWithoutRef<"div">

/**
 * ⚡ Bolt: DialogHeader component optimized with React.memo and React.forwardRef.
 */
const DialogHeader = React.memo(
  React.forwardRef<HTMLDivElement, DialogHeaderProps>(
    ({ className, ...props }, ref) => {
      return (
        <div
          ref={ref}
          data-slot="dialog-header"
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

DialogHeader.displayName = "DialogHeader"

export type DialogFooterProps = React.ComponentPropsWithoutRef<"div">

/**
 * ⚡ Bolt: DialogFooter component optimized with React.memo and React.forwardRef.
 */
const DialogFooter = React.memo(
  React.forwardRef<HTMLDivElement, DialogFooterProps>(
    ({ className, ...props }, ref) => {
      return (
        <div
          ref={ref}
          data-slot="dialog-footer"
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

DialogFooter.displayName = "DialogFooter"

export type DialogTitleProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Title
>

/**
 * ⚡ Bolt: DialogTitle component optimized with React.memo and React.forwardRef.
 */
const DialogTitle = React.memo(
  React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Title>,
    DialogTitleProps
  >(({ className, ...props }, ref) => {
    return (
      <DialogPrimitive.Title
        ref={ref}
        data-slot="dialog-title"
        className={cn(
          "text-lg font-heading leading-none tracking-tight",
          className,
        )}
        {...props}
      />
    )
  }),
)

DialogTitle.displayName = "DialogTitle"

export type DialogDescriptionProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Description
>

/**
 * ⚡ Bolt: DialogDescription component optimized with React.memo and React.forwardRef.
 */
const DialogDescription = React.memo(
  React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Description>,
    DialogDescriptionProps
  >(({ className, ...props }, ref) => {
    return (
      <DialogPrimitive.Description
        ref={ref}
        data-slot="dialog-description"
        className={cn("text-sm font-base text-foreground", className)}
        {...props}
      />
    )
  }),
)

DialogDescription.displayName = "DialogDescription"

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
