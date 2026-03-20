"use client"

import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import * as React from "react"

import { cn } from "@/lib/utils"

export type AccordionProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Root
>

/**
 * ⚡ Bolt: Accordion component optimized with React.memo.
 */
const Accordion = React.memo(
  React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Root>,
    AccordionProps
  >(({ ...props }, ref) => {
    return (
      <AccordionPrimitive.Root ref={ref} data-slot="accordion" {...props} />
    )
  }),
)

Accordion.displayName = "Accordion"

export type AccordionItemProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Item
>

/**
 * ⚡ Bolt: AccordionItem component optimized with React.memo.
 */
const AccordionItem = React.memo(
  React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Item>,
    AccordionItemProps
  >(({ className, ...props }, ref) => {
    return (
      <AccordionPrimitive.Item
        ref={ref}
        data-slot="accordion-item"
        className={cn(
          "rounded-base overflow-hidden border-2 border-b border-border shadow-shadow",
          className,
        )}
        {...props}
      />
    )
  }),
)

AccordionItem.displayName = "AccordionItem"

export type AccordionTriggerProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Trigger
>

/**
 * ⚡ Bolt: AccordionTrigger component optimized with React.memo.
 */
const AccordionTrigger = React.memo(
  React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Trigger>,
    AccordionTriggerProps
  >(({ className, children, ...props }, ref) => {
    return (
      <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger
          ref={ref}
          data-slot="accordion-trigger"
          className={cn(
            "flex flex-1 items-center justify-between text-left text-base text-main-foreground border-border hover:bg-main-foreground/10 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring bg-main p-4 font-heading transition-all [&[data-state=open]>svg]:rotate-180 data-[state=open]:rounded-b-none data-[state=open]:border-b-2 disabled:pointer-events-none disabled:opacity-50",
            className,
          )}
          {...props}
        >
          {children}
          <ChevronDown
            className="pointer-events-none size-5 shrink-0 transition-transform duration-200"
            aria-hidden="true"
          />
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
    )
  }),
)

AccordionTrigger.displayName = "AccordionTrigger"

export type AccordionContentProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Content
>

/**
 * ⚡ Bolt: AccordionContent component optimized with React.memo.
 */
const AccordionContent = React.memo(
  React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Content>,
    AccordionContentProps
  >(({ className, children, ...props }, ref) => {
    return (
      <AccordionPrimitive.Content
        ref={ref}
        data-slot="accordion-content"
        className="overflow-hidden rounded-b-base bg-secondary-background text-sm font-base transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
        {...props}
      >
        <div className={cn("p-4", className)}>{children}</div>
      </AccordionPrimitive.Content>
    )
  }),
)

AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
