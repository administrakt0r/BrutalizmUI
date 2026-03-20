"use client"

import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { cva } from "class-variance-authority"
import { ChevronDown } from "lucide-react"

import * as React from "react"

import { cn } from "@/lib/utils"

export type NavigationMenuProps = React.ComponentPropsWithoutRef<
  typeof NavigationMenuPrimitive.Root
> & {
  viewport?: boolean
}

/**
 * ⚡ Bolt: NavigationMenu component optimized with React.memo and React.forwardRef.
 */
const NavigationMenu = React.memo(
  React.forwardRef<
    React.ElementRef<typeof NavigationMenuPrimitive.Root>,
    NavigationMenuProps
  >(({ className, children, viewport = true, ...props }, ref) => {
    return (
      <NavigationMenuPrimitive.Root
        ref={ref}
        data-slot="navigation-menu"
        data-viewport={viewport}
        className={cn(
          "relative z-10 flex max-w-max rounded-base font-heading border-border border-2 p-1 bg-main flex-1 items-center justify-center",
          className,
        )}
        {...props}
      >
        {children}
        {viewport && <NavigationMenuViewport />}
      </NavigationMenuPrimitive.Root>
    )
  }),
)

NavigationMenu.displayName = "NavigationMenu"

export type NavigationMenuListProps = React.ComponentPropsWithoutRef<
  typeof NavigationMenuPrimitive.List
>

/**
 * ⚡ Bolt: NavigationMenuList component optimized with React.memo and React.forwardRef.
 */
const NavigationMenuList = React.memo(
  React.forwardRef<
    React.ElementRef<typeof NavigationMenuPrimitive.List>,
    NavigationMenuListProps
  >(({ className, ...props }, ref) => {
    return (
      <NavigationMenuPrimitive.List
        ref={ref}
        data-slot="navigation-menu-list"
        className={cn(
          "group flex flex-1 list-none items-center font-heading justify-center space-x-1",
          className,
        )}
        {...props}
      />
    )
  }),
)

NavigationMenuList.displayName = "NavigationMenuList"

export type NavigationMenuItemProps = React.ComponentPropsWithoutRef<
  typeof NavigationMenuPrimitive.Item
>

/**
 * ⚡ Bolt: NavigationMenuItem component optimized with React.memo and React.forwardRef.
 */
const NavigationMenuItem = React.memo(
  React.forwardRef<
    React.ElementRef<typeof NavigationMenuPrimitive.Item>,
    NavigationMenuItemProps
  >(({ className, ...props }, ref) => {
    return (
      <NavigationMenuPrimitive.Item
        ref={ref}
        data-slot="navigation-menu-item"
        className={cn("relative", className)}
        {...props}
      />
    )
  }),
)

NavigationMenuItem.displayName = "NavigationMenuItem"

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-10 w-max items-center justify-center text-main-foreground rounded-base bg-main px-4 py-2 text-sm font-heading transition-colors focus-visible:ring-ring focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50",
)

export type NavigationMenuTriggerProps = React.ComponentPropsWithoutRef<
  typeof NavigationMenuPrimitive.Trigger
>

/**
 * ⚡ Bolt: NavigationMenuTrigger component optimized with React.memo and React.forwardRef.
 */
const NavigationMenuTrigger = React.memo(
  React.forwardRef<
    React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
    NavigationMenuTriggerProps
  >(({ className, children, ...props }, ref) => {
    return (
      <NavigationMenuPrimitive.Trigger
        ref={ref}
        data-slot="navigation-menu-trigger"
        className={cn(navigationMenuTriggerStyle(), "group", className)}
        {...props}
      >
        {children}{" "}
        <ChevronDown
          className="relative top-[1px] ml-2 size-4 font-heading transition duration-200 group-data-[state=open]:rotate-180"
          aria-hidden="true"
        />
      </NavigationMenuPrimitive.Trigger>
    )
  }),
)

NavigationMenuTrigger.displayName = "NavigationMenuTrigger"

export type NavigationMenuContentProps = React.ComponentPropsWithoutRef<
  typeof NavigationMenuPrimitive.Content
>

/**
 * ⚡ Bolt: NavigationMenuContent component optimized with React.memo and React.forwardRef.
 */
const NavigationMenuContent = React.memo(
  React.forwardRef<
    React.ElementRef<typeof NavigationMenuPrimitive.Content>,
    NavigationMenuContentProps
  >(({ className, ...props }, ref) => {
    return (
      <NavigationMenuPrimitive.Content
        ref={ref}
        data-slot="navigation-menu-content"
        className={cn(
          "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 top-0 left-0 w-full p-2 pr-2.5 md:absolute md:w-auto",
          "group-data-[viewport=false]/navigation-menu:bg-main group-data-[viewport=false]/navigation-menu:text-main-foreground group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:duration-200",
          className,
        )}
        {...props}
      />
    )
  }),
)

NavigationMenuContent.displayName = "NavigationMenuContent"

export type NavigationMenuLinkProps = React.ComponentPropsWithoutRef<
  typeof NavigationMenuPrimitive.Link
>

/**
 * ⚡ Bolt: NavigationMenuLink component optimized with React.memo and React.forwardRef.
 */
const NavigationMenuLink = React.memo(
  React.forwardRef<
    React.ElementRef<typeof NavigationMenuPrimitive.Link>,
    NavigationMenuLinkProps
  >(({ className, ...props }, ref) => {
    return (
      <NavigationMenuPrimitive.Link
        ref={ref}
        data-slot="navigation-menu-link"
        className={cn(
          "block select-none space-y-1 rounded-base p-2 leading-none no-underline transition-colors focus-visible:ring-ring focus-visible:outline-hidden [&_svg:not([class*='size-'])]:size-4",
          className,
        )}
        {...props}
      />
    )
  }),
)

NavigationMenuLink.displayName = "NavigationMenuLink"

export type NavigationMenuViewportProps = React.ComponentPropsWithoutRef<
  typeof NavigationMenuPrimitive.Viewport
>

/**
 * ⚡ Bolt: NavigationMenuViewport component optimized with React.memo and React.forwardRef.
 */
const NavigationMenuViewport = React.memo(
  React.forwardRef<
    React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
    NavigationMenuViewportProps
  >(({ className, ...props }, ref) => {
    return (
      <div
        className={cn(
          "absolute top-full left-0 isolate z-50 flex justify-center",
        )}
      >
        <NavigationMenuPrimitive.Viewport
          ref={ref}
          data-slot="navigation-menu-viewport"
          className={cn(
            "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-base border-2 border-border bg-main text-main-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
            className,
          )}
          {...props}
        />
      </div>
    )
  }),
)

NavigationMenuViewport.displayName = "NavigationMenuViewport"

export type NavigationMenuIndicatorProps = React.ComponentPropsWithoutRef<
  typeof NavigationMenuPrimitive.Indicator
>

/**
 * ⚡ Bolt: NavigationMenuIndicator component optimized with React.memo and React.forwardRef.
 */
const NavigationMenuIndicator = React.memo(
  React.forwardRef<
    React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
    NavigationMenuIndicatorProps
  >(({ className, ...props }, ref) => {
    return (
      <NavigationMenuPrimitive.Indicator
        ref={ref}
        data-slot="navigation-menu-indicator"
        className={cn(
          "top-full z-[1] flex h-1.5 items-end font-heading justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
          className,
        )}
        {...props}
      >
        <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-white" />
      </NavigationMenuPrimitive.Indicator>
    )
  }),
)

NavigationMenuIndicator.displayName = "NavigationMenuIndicator"

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
}
