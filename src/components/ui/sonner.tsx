"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps as SonnerProps } from "sonner"

import * as React from "react"

import { cn } from "@/lib/utils"

export type ToasterProps = SonnerProps

/**
 * ⚡ Bolt: Toaster component optimized with React.memo and React.forwardRef.
 */
const Toaster = React.memo(
  React.forwardRef<HTMLDivElement, ToasterProps>(({ className, ...props }, ref) => {
    const { theme = "system" } = useTheme()

    return (
      <Sonner
        ref={ref}
        data-slot="sonner"
        closeButton
        theme={theme as ToasterProps["theme"]}
        className={cn("font-[inherit] break-anywhere", className)}
        toastOptions={{
          unstyled: true,
          classNames: {
            toast:
              "bg-background text-foreground border-border border-2 font-heading shadow-shadow rounded-base text-[13px] flex items-center gap-2.5 p-4 w-[356px] [&:has(button)]:justify-between",
            description: "font-base",
            actionButton:
              "font-base border-2 text-[12px] h-6 px-2 bg-main text-main-foreground border-border rounded-base shrink-0",
            cancelButton:
              "font-base border-2 text-[12px] h-6 px-2 bg-secondary-background text-foreground border-border rounded-base shrink-0",
            closeButton:
              "bg-background text-foreground border-2 border-border rounded-base hover:bg-main-foreground/10 transition-colors",
            error: "bg-black text-white",
            success: "bg-main text-main-foreground",
            warning: "bg-yellow-400 text-black",
            info: "bg-secondary-background text-foreground",
            loading:
              "[&[data-sonner-toast]_[data-icon]]:flex [&[data-sonner-toast]_[data-icon]]:size-4 [&[data-sonner-toast]_[data-icon]]:relative [&[data-sonner-toast]_[data-icon]]:justify-start [&[data-sonner-toast]_[data-icon]]:items-center [&[data-sonner-toast]_[data-icon]]:flex-shrink-0",
          },
        }}
        {...props}
      />
    )
  }),
)

Toaster.displayName = "Toaster"

export { Toaster }
