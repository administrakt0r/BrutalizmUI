"use client"

import * as TabsPrimitive from "@radix-ui/react-tabs"

import * as React from "react"

import { cn } from "@/lib/utils"

export type TabsProps = React.ComponentPropsWithoutRef<
  typeof TabsPrimitive.Root
>

/**
 * ⚡ Bolt: Tabs component optimized with React.memo and React.forwardRef.
 */
const Tabs = React.memo(
  React.forwardRef<React.ElementRef<typeof TabsPrimitive.Root>, TabsProps>(
    ({ className, ...props }, ref) => {
      return (
        <TabsPrimitive.Root
          ref={ref}
          data-slot="tabs"
          className={cn("w-full", className)}
          {...props}
        />
      )
    },
  ),
)

Tabs.displayName = "Tabs"

export type TabsListProps = React.ComponentPropsWithoutRef<
  typeof TabsPrimitive.List
>

/**
 * ⚡ Bolt: TabsList component optimized with React.memo and React.forwardRef.
 */
const TabsList = React.memo(
  React.forwardRef<React.ElementRef<typeof TabsPrimitive.List>, TabsListProps>(
    ({ className, ...props }, ref) => {
      return (
        <TabsPrimitive.List
          ref={ref}
          data-slot="tabs-list"
          className={cn(
            "inline-flex h-12 items-center justify-center rounded-base border-2 border-border bg-background p-1 text-foreground",
            className,
          )}
          {...props}
        />
      )
    },
  ),
)

TabsList.displayName = "TabsList"

export type TabsTriggerProps = React.ComponentPropsWithoutRef<
  typeof TabsPrimitive.Trigger
>

/**
 * ⚡ Bolt: TabsTrigger component optimized with React.memo and React.forwardRef.
 */
const TabsTrigger = React.memo(
  React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Trigger>,
    TabsTriggerProps
  >(({ className, ...props }, ref) => {
    return (
      <TabsPrimitive.Trigger
        ref={ref}
        data-slot="tabs-trigger"
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-base border-2 border-transparent px-2 py-1 gap-1.5 text-sm font-heading transition-all hover:bg-main-foreground/10 hover:border-border focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:bg-main-foreground/10 focus-visible:border-border disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-main data-[state=active]:text-main-foreground data-[state=active]:border-border",
          className,
        )}
        {...props}
      />
    )
  }),
)

TabsTrigger.displayName = "TabsTrigger"

export type TabsContentProps = React.ComponentPropsWithoutRef<
  typeof TabsPrimitive.Content
>

/**
 * ⚡ Bolt: TabsContent component optimized with React.memo and React.forwardRef.
 */
const TabsContent = React.memo(
  React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Content>,
    TabsContentProps
  >(({ className, ...props }, ref) => {
    return (
      <TabsPrimitive.Content
        ref={ref}
        data-slot="tabs-content"
        className={cn(
          "mt-2 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring",
          className,
        )}
        {...props}
      />
    )
  }),
)

TabsContent.displayName = "TabsContent"

export { Tabs, TabsList, TabsTrigger, TabsContent }
