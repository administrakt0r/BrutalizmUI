import * as React from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { cn } from "@/lib/utils"

export const MdxTabs = ({
  className,
  ...props
}: React.ComponentProps<typeof Tabs>) => (
  <Tabs className={cn("w-full shadow-shadow", className)} {...props} />
)

export const MdxTabsList = ({
  className,
  ...props
}: React.ComponentProps<typeof TabsList>) => (
  <TabsList
    className={cn(
      "w-full overflow-x-hidden rounded-none sm:h-12 h-10 p-0 bg-secondary-background",
      className,
    )}
    {...props}
  />
)

export const MdxTabsTrigger = ({
  className,
  ...props
}: React.ComponentProps<typeof TabsTrigger>) => (
  <TabsTrigger
    className={cn(
      "h-full border-0 border-r-2 z-10 border-r-border rounded-none sm:text-base data-[state=active]:text-main-foreground text-foreground last:border-r-0",
      className,
    )}
    {...props}
  />
)

export const MdxTabsContent = ({
  className,
  ...props
}: React.ComponentProps<typeof TabsContent>) => (
  <TabsContent className="mt-0 rounded-none" {...props} />
)
