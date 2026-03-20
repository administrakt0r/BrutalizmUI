import * as React from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { cn } from "@/lib/utils"

export type MdxTabsProps = React.ComponentPropsWithoutRef<typeof Tabs>

/**
 * ⚡ Bolt: MdxTabs component optimized with React.memo and React.forwardRef.
 */
export const MdxTabs = React.memo(
  React.forwardRef<React.ElementRef<typeof Tabs>, MdxTabsProps>(
    ({ className, ...props }, ref) => (
      <Tabs
        ref={ref}
        data-slot="mdx-tabs"
        className={cn("w-full shadow-shadow", className)}
        {...props}
      />
    ),
  ),
)

MdxTabs.displayName = "MdxTabs"

export type MdxTabsListProps = React.ComponentPropsWithoutRef<typeof TabsList>

/**
 * ⚡ Bolt: MdxTabsList component optimized with React.memo and React.forwardRef.
 */
export const MdxTabsList = React.memo(
  React.forwardRef<React.ElementRef<typeof TabsList>, MdxTabsListProps>(
    ({ className, ...props }, ref) => (
      <TabsList
        ref={ref}
        data-slot="mdx-tabs-list"
        className={cn(
          "w-full overflow-x-hidden rounded-none sm:h-12 h-10 p-0 bg-secondary-background",
          className,
        )}
        {...props}
      />
    ),
  ),
)

MdxTabsList.displayName = "MdxTabsList"

export type MdxTabsTriggerProps = React.ComponentPropsWithoutRef<typeof TabsTrigger>

/**
 * ⚡ Bolt: MdxTabsTrigger component optimized with React.memo and React.forwardRef.
 */
export const MdxTabsTrigger = React.memo(
  React.forwardRef<React.ElementRef<typeof TabsTrigger>, MdxTabsTriggerProps>(
    ({ className, ...props }, ref) => (
      <TabsTrigger
        ref={ref}
        data-slot="mdx-tabs-trigger"
        className={cn(
          "h-full border-0 border-r-2 z-10 border-r-border rounded-none sm:text-base data-[state=active]:text-main-foreground text-foreground last:border-r-0",
          className,
        )}
        {...props}
      />
    ),
  ),
)

MdxTabsTrigger.displayName = "MdxTabsTrigger"

export type MdxTabsContentProps = React.ComponentPropsWithoutRef<typeof TabsContent>

/**
 * ⚡ Bolt: MdxTabsContent component optimized with React.memo and React.forwardRef.
 */
export const MdxTabsContent = React.memo(
  React.forwardRef<React.ElementRef<typeof TabsContent>, MdxTabsContentProps>(
    ({ className, ...props }, ref) => (
      <TabsContent
        ref={ref}
        data-slot="mdx-tabs-content"
        className={cn("mt-0 rounded-none", className)}
        {...props}
      />
    ),
  ),
)

MdxTabsContent.displayName = "MdxTabsContent"
