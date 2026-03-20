"use client"

import * as MenubarPrimitive from "@radix-ui/react-menubar"
import { Check, ChevronRight, Circle } from "lucide-react"

import * as React from "react"

import { cn } from "@/lib/utils"

export type MenubarProps = React.ComponentPropsWithoutRef<
  typeof MenubarPrimitive.Root
>

/**
 * ⚡ Bolt: Menubar component optimized with React.memo and React.forwardRef.
 */
const Menubar = React.memo(
  React.forwardRef<
    React.ElementRef<typeof MenubarPrimitive.Root>,
    MenubarProps
  >(({ className, ...props }, ref) => {
    return (
      <MenubarPrimitive.Root
        ref={ref}
        data-slot="menubar"
        className={cn(
          "flex h-11 items-center space-x-1 rounded-base border-2 border-border bg-main p-1 font-base",
          className,
        )}
        {...props}
      />
    )
  }),
)

Menubar.displayName = "Menubar"

export type MenubarMenuProps = React.ComponentPropsWithoutRef<
  typeof MenubarPrimitive.Menu
>

/**
 * ⚡ Bolt: MenubarMenu component optimized with React.memo.
 */
const MenubarMenu = React.memo(({ ...props }: MenubarMenuProps) => {
  return <MenubarPrimitive.Menu data-slot="menubar-menu" {...props} />
})

MenubarMenu.displayName = "MenubarMenu"

export type MenubarTriggerProps = React.ComponentPropsWithoutRef<
  typeof MenubarPrimitive.Trigger
>

/**
 * ⚡ Bolt: MenubarTrigger component optimized with React.memo and React.forwardRef.
 */
const MenubarTrigger = React.memo(
  React.forwardRef<
    React.ElementRef<typeof MenubarPrimitive.Trigger>,
    MenubarTriggerProps
  >(({ className, ...props }, ref) => {
    return (
      <MenubarPrimitive.Trigger
        ref={ref}
        data-slot="menubar-trigger"
        className={cn(
          "flex cursor-default select-none items-center text-main-foreground rounded-base px-3 py-1.5 text-sm border-2 border-transparent font-heading focus-visible:ring-ring focus-visible:outline-hidden focus:bg-main-foreground/10 focus:border-border data-[state=open]:bg-main-foreground/10 data-[state=open]:border-border",
          className,
        )}
        {...props}
      />
    )
  }),
)

MenubarTrigger.displayName = "MenubarTrigger"

export type MenubarContentProps = React.ComponentPropsWithoutRef<
  typeof MenubarPrimitive.Content
>

/**
 * ⚡ Bolt: MenubarContent component optimized with React.memo and React.forwardRef.
 */
const MenubarContent = React.memo(
  React.forwardRef<
    React.ElementRef<typeof MenubarPrimitive.Content>,
    MenubarContentProps
  >(
    (
      {
        className,
        align = "start",
        alignOffset = -4,
        sideOffset = 8,
        ...props
      },
      ref,
    ) => {
      return (
        <MenubarPrimitive.Portal>
          <MenubarPrimitive.Content
            ref={ref}
            data-slot="menubar-content"
            align={align}
            alignOffset={alignOffset}
            sideOffset={sideOffset}
            className={cn(
              "z-50 min-w-[12rem] overflow-hidden rounded-base border-2 border-border bg-main p-1 text-main-foreground data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 origin-(--radix-menubar-content-transform-origin)",
              className,
            )}
            {...props}
          />
        </MenubarPrimitive.Portal>
      )
    },
  ),
)

MenubarContent.displayName = "MenubarContent"

export type MenubarGroupProps = React.ComponentPropsWithoutRef<
  typeof MenubarPrimitive.Group
>

/**
 * ⚡ Bolt: MenubarGroup component optimized with React.memo and React.forwardRef.
 */
const MenubarGroup = React.memo(
  React.forwardRef<
    React.ElementRef<typeof MenubarPrimitive.Group>,
    MenubarGroupProps
  >(({ ...props }, ref) => {
    return (
      <MenubarPrimitive.Group ref={ref} data-slot="menubar-group" {...props} />
    )
  }),
)

MenubarGroup.displayName = "MenubarGroup"

export type MenubarPortalProps = React.ComponentPropsWithoutRef<
  typeof MenubarPrimitive.Portal
>

/**
 * ⚡ Bolt: MenubarPortal component optimized with React.memo.
 */
const MenubarPortal = React.memo(({ ...props }: MenubarPortalProps) => {
  return <MenubarPrimitive.Portal data-slot="menubar-portal" {...props} />
})

MenubarPortal.displayName = "MenubarPortal"

export type MenubarSubProps = React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Sub>

/**
 * ⚡ Bolt: MenubarSub component optimized with React.memo.
 */
const MenubarSub = React.memo(({ ...props }: MenubarSubProps) => {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />
})

MenubarSub.displayName = "MenubarSub"

export type MenubarRadioGroupProps = React.ComponentPropsWithoutRef<
  typeof MenubarPrimitive.RadioGroup
>

/**
 * ⚡ Bolt: MenubarRadioGroup component optimized with React.memo and React.forwardRef.
 */
const MenubarRadioGroup = React.memo(
  React.forwardRef<
    React.ElementRef<typeof MenubarPrimitive.RadioGroup>,
    MenubarRadioGroupProps
  >(({ ...props }, ref) => {
    return (
      <MenubarPrimitive.RadioGroup
        ref={ref}
        data-slot="menubar-radio-group"
        {...props}
      />
    )
  }),
)

MenubarRadioGroup.displayName = "MenubarRadioGroup"

export type MenubarItemProps = React.ComponentPropsWithoutRef<
  typeof MenubarPrimitive.Item
> & {
  inset?: boolean
}

/**
 * ⚡ Bolt: MenubarItem component optimized with React.memo and React.forwardRef.
 */
const MenubarItem = React.memo(
  React.forwardRef<
    React.ElementRef<typeof MenubarPrimitive.Item>,
    MenubarItemProps
  >(({ className, inset, ...props }, ref) => {
    return (
      <MenubarPrimitive.Item
        ref={ref}
        data-slot="menubar-item"
        data-inset={inset}
        className={cn(
          "relative flex cursor-default select-none items-center rounded-base border-2 border-transparent px-2 py-1.5 text-sm font-base focus-visible:ring-ring focus-visible:outline-hidden focus:bg-main-foreground/10 focus:border-border data-disabled:pointer-events-none data-disabled:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
          className,
        )}
        {...props}
      />
    )
  }),
)

MenubarItem.displayName = "MenubarItem"

export type MenubarCheckboxItemProps = React.ComponentPropsWithoutRef<
  typeof MenubarPrimitive.CheckboxItem
>

/**
 * ⚡ Bolt: MenubarCheckboxItem component optimized with React.memo and React.forwardRef.
 */
const MenubarCheckboxItem = React.memo(
  React.forwardRef<
    React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
    MenubarCheckboxItemProps
  >(({ className, children, checked, ...props }, ref) => {
    return (
      <MenubarPrimitive.CheckboxItem
        ref={ref}
        data-slot="menubar-checkbox-item"
        className={cn(
          "relative flex cursor-default select-none items-center rounded-base border-2 border-transparent py-1.5 pl-8 pr-2 text-sm font-base focus-visible:ring-ring focus-visible:outline-hidden focus:bg-main-foreground/10 focus:border-border data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
          className,
        )}
        checked={checked}
        {...props}
      >
        <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
          <MenubarPrimitive.ItemIndicator>
            <Check className="size-4" />
          </MenubarPrimitive.ItemIndicator>
        </span>
        {children}
      </MenubarPrimitive.CheckboxItem>
    )
  }),
)

MenubarCheckboxItem.displayName = "MenubarCheckboxItem"

export type MenubarRadioItemProps = React.ComponentPropsWithoutRef<
  typeof MenubarPrimitive.RadioItem
>

/**
 * ⚡ Bolt: MenubarRadioItem component optimized with React.memo and React.forwardRef.
 */
const MenubarRadioItem = React.memo(
  React.forwardRef<
    React.ElementRef<typeof MenubarPrimitive.RadioItem>,
    MenubarRadioItemProps
  >(({ className, children, ...props }, ref) => {
    return (
      <MenubarPrimitive.RadioItem
        ref={ref}
        data-slot="menubar-radio-item"
        className={cn(
          "relative flex cursor-default select-none items-center rounded-base border-2 border-transparent py-1.5 pl-8 pr-2 text-sm font-base focus-visible:ring-ring focus-visible:outline-hidden focus:bg-main-foreground/10 focus:border-border data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
          className,
        )}
        {...props}
      >
        <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
          <MenubarPrimitive.ItemIndicator>
            <Circle className="size-2 fill-current" />
          </MenubarPrimitive.ItemIndicator>
        </span>
        {children}
      </MenubarPrimitive.RadioItem>
    )
  }),
)

MenubarRadioItem.displayName = "MenubarRadioItem"

export type MenubarLabelProps = React.ComponentPropsWithoutRef<
  typeof MenubarPrimitive.Label
> & {
  inset?: boolean
}

/**
 * ⚡ Bolt: MenubarLabel component optimized with React.memo and React.forwardRef.
 */
const MenubarLabel = React.memo(
  React.forwardRef<
    React.ElementRef<typeof MenubarPrimitive.Label>,
    MenubarLabelProps
  >(({ className, inset, ...props }, ref) => {
    return (
      <MenubarPrimitive.Label
        ref={ref}
        data-slot="menubar-label"
        data-inset={inset}
        className={cn(
          "px-2 py-1.5 text-sm font-heading data-[inset]:pl-8",
          className,
        )}
        {...props}
      />
    )
  }),
)

MenubarLabel.displayName = "MenubarLabel"

export type MenubarSeparatorProps = React.ComponentPropsWithoutRef<
  typeof MenubarPrimitive.Separator
>

/**
 * ⚡ Bolt: MenubarSeparator component optimized with React.memo and React.forwardRef.
 */
const MenubarSeparator = React.memo(
  React.forwardRef<
    React.ElementRef<typeof MenubarPrimitive.Separator>,
    MenubarSeparatorProps
  >(({ className, ...props }, ref) => {
    return (
      <MenubarPrimitive.Separator
        ref={ref}
        data-slot="menubar-separator"
        className={cn("-mx-1 my-1 h-0.5 bg-border", className)}
        {...props}
      />
    )
  }),
)

MenubarSeparator.displayName = "MenubarSeparator"

export type MenubarShortcutProps = React.ComponentPropsWithoutRef<"span">

/**
 * ⚡ Bolt: MenubarShortcut component optimized with React.memo and React.forwardRef.
 */
const MenubarShortcut = React.memo(
  React.forwardRef<HTMLSpanElement, MenubarShortcutProps>(
    ({ className, ...props }, ref) => {
      return (
        <span
          ref={ref}
          data-slot="menubar-shortcut"
          className={cn(
            "ml-auto text-xs tracking-widest text-main-foreground",
            className,
          )}
          {...props}
        />
      )
    },
  ),
)

MenubarShortcut.displayName = "MenubarShortcut"

export type MenubarSubTriggerProps = React.ComponentPropsWithoutRef<
  typeof MenubarPrimitive.SubTrigger
> & {
  inset?: boolean
}

/**
 * ⚡ Bolt: MenubarSubTrigger component optimized with React.memo and React.forwardRef.
 */
const MenubarSubTrigger = React.memo(
  React.forwardRef<
    React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
    MenubarSubTriggerProps
  >(({ className, inset, children, ...props }, ref) => {
    return (
      <MenubarPrimitive.SubTrigger
        ref={ref}
        data-slot="menubar-sub-trigger"
        className={cn(
          "flex cursor-default select-none items-center rounded-base border-2 border-transparent px-3 py-1.5 text-sm font-base focus-visible:ring-ring focus-visible:outline-hidden focus:bg-main-foreground/10 focus:border-border data-[state=open]:bg-main-foreground/10 data-[state=open]:border-border data-[inset]:pl-8",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronRight className="ml-auto size-4" aria-hidden="true" />
      </MenubarPrimitive.SubTrigger>
    )
  }),
)

MenubarSubTrigger.displayName = "MenubarSubTrigger"

export type MenubarSubContentProps = React.ComponentPropsWithoutRef<
  typeof MenubarPrimitive.SubContent
>

/**
 * ⚡ Bolt: MenubarSubContent component optimized with React.memo and React.forwardRef.
 */
const MenubarSubContent = React.memo(
  React.forwardRef<
    React.ElementRef<typeof MenubarPrimitive.SubContent>,
    MenubarSubContentProps
  >(({ className, ...props }, ref) => {
    return (
      <MenubarPrimitive.SubContent
        ref={ref}
        data-slot="menubar-sub-content"
        className={cn(
          "z-50 min-w-[8rem] overflow-hidden rounded-base border-2 border-border bg-main p-1 font-base text-main-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-menubar-content-transform-origin)",
          className,
        )}
        {...props}
      />
    )
  }),
)

MenubarSubContent.displayName = "MenubarSubContent"

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
}
