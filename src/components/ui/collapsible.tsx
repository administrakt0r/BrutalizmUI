"use client"

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

import * as React from "react"

import { cn } from "@/lib/utils"

export type CollapsibleProps = React.ComponentPropsWithoutRef<
  typeof CollapsiblePrimitive.Root
>

/**
 * ⚡ Bolt: Collapsible component optimized with React.memo.
 */
const Collapsible = React.memo(
  React.forwardRef<
    React.ElementRef<typeof CollapsiblePrimitive.Root>,
    CollapsibleProps
  >(({ className, ...props }, ref) => {
    return (
      <CollapsiblePrimitive.Root
        ref={ref}
        data-slot="collapsible"
        className={cn(className)}
        {...props}
      />
    )
  }),
)
Collapsible.displayName = "Collapsible"

export type CollapsibleTriggerProps = React.ComponentPropsWithoutRef<
  typeof CollapsiblePrimitive.CollapsibleTrigger
>

/**
 * ⚡ Bolt: CollapsibleTrigger component optimized with React.memo and React.forwardRef.
 */
const CollapsibleTrigger = React.memo(
  React.forwardRef<
    React.ElementRef<typeof CollapsiblePrimitive.CollapsibleTrigger>,
    CollapsibleTriggerProps
  >(({ className, ...props }, ref) => {
    return (
      <CollapsiblePrimitive.CollapsibleTrigger
        ref={ref}
        data-slot="collapsible-trigger"
        className={cn(className)}
        {...props}
      />
    )
  }),
)
CollapsibleTrigger.displayName = "CollapsibleTrigger"

export type CollapsibleContentProps = React.ComponentPropsWithoutRef<
  typeof CollapsiblePrimitive.CollapsibleContent
>

/**
 * ⚡ Bolt: CollapsibleContent component optimized with React.memo and React.forwardRef.
 */
const CollapsibleContent = React.memo(
  React.forwardRef<
    React.ElementRef<typeof CollapsiblePrimitive.CollapsibleContent>,
    CollapsibleContentProps
  >(({ className, ...props }, ref) => {
    return (
      <CollapsiblePrimitive.CollapsibleContent
        ref={ref}
        data-slot="collapsible-content"
        className={cn(className)}
        {...props}
      />
    )
  }),
)
CollapsibleContent.displayName = "CollapsibleContent"

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
