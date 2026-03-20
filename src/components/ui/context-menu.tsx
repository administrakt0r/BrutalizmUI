"use client"

import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import * as React from "react"

import { cn } from "@/lib/utils"

export type ContextMenuProps = React.ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.Root
>

/**
 * ⚡ Bolt: ContextMenu component optimized with React.memo.
 */
const ContextMenu = React.memo(({ ...props }: ContextMenuProps) => {
  return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />
})
ContextMenu.displayName = "ContextMenu"

export type ContextMenuTriggerProps = React.ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.Trigger
>

/**
 * ⚡ Bolt: ContextMenuTrigger component optimized with React.memo and React.forwardRef.
 */
const ContextMenuTrigger = React.memo(
  React.forwardRef<
    React.ElementRef<typeof ContextMenuPrimitive.Trigger>,
    ContextMenuTriggerProps
  >(({ ...props }, ref) => {
    return (
      <ContextMenuPrimitive.Trigger
        ref={ref}
        data-slot="context-menu-trigger"
        {...props}
      />
    )
  }),
)
ContextMenuTrigger.displayName = "ContextMenuTrigger"

export type ContextMenuGroupProps = React.ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.Group
>

/**
 * ⚡ Bolt: ContextMenuGroup component optimized with React.memo and React.forwardRef.
 */
const ContextMenuGroup = React.memo(
  React.forwardRef<
    React.ElementRef<typeof ContextMenuPrimitive.Group>,
    ContextMenuGroupProps
  >(({ ...props }, ref) => {
    return (
      <ContextMenuPrimitive.Group
        ref={ref}
        data-slot="context-menu-group"
        {...props}
      />
    )
  }),
)
ContextMenuGroup.displayName = "ContextMenuGroup"

export type ContextMenuPortalProps = React.ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.Portal
>

/**
 * ⚡ Bolt: ContextMenuPortal component optimized with React.memo.
 */
const ContextMenuPortal = React.memo(({ ...props }: ContextMenuPortalProps) => {
  return (
    <ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} />
  )
})
ContextMenuPortal.displayName = "ContextMenuPortal"

export type ContextMenuSubProps = React.ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.Sub
>

/**
 * ⚡ Bolt: ContextMenuSub component optimized with React.memo.
 */
const ContextMenuSub = React.memo(({ ...props }: ContextMenuSubProps) => {
  return <ContextMenuPrimitive.Sub data-slot="context-menu-sub" {...props} />
})
ContextMenuSub.displayName = "ContextMenuSub"

export type ContextMenuRadioGroupProps = React.ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.RadioGroup
>

/**
 * ⚡ Bolt: ContextMenuRadioGroup component optimized with React.memo and React.forwardRef.
 */
const ContextMenuRadioGroup = React.memo(
  React.forwardRef<
    React.ElementRef<typeof ContextMenuPrimitive.RadioGroup>,
    ContextMenuRadioGroupProps
  >(({ ...props }, ref) => {
    return (
      <ContextMenuPrimitive.RadioGroup
        ref={ref}
        data-slot="context-menu-radio-group"
        {...props}
      />
    )
  }),
)
ContextMenuRadioGroup.displayName = "ContextMenuRadioGroup"

export type ContextMenuSubTriggerProps = React.ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.SubTrigger
> & {
  inset?: boolean
}

/**
 * ⚡ Bolt: ContextMenuSubTrigger component optimized with React.memo and React.forwardRef.
 */
const ContextMenuSubTrigger = React.memo(
  React.forwardRef<
    React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
    ContextMenuSubTriggerProps
  >(({ className, inset, children, ...props }, ref) => {
    return (
      <ContextMenuPrimitive.SubTrigger
        ref={ref}
        data-slot="context-menu-sub-trigger"
        data-inset={inset}
        className={cn(
          "flex cursor-default select-none items-center rounded-base border-2 border-transparent bg-main px-2 py-1.5 text-sm font-base text-main-foreground focus-visible:ring-ring focus-visible:outline-hidden focus:bg-main-foreground/10 focus:border-border data-[state=open]:bg-main-foreground/10 data-[state=open]:border-border data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronRight className="ml-auto" aria-hidden="true" />
      </ContextMenuPrimitive.SubTrigger>
    )
  }),
)
ContextMenuSubTrigger.displayName = "ContextMenuSubTrigger"

export type ContextMenuSubContentProps = React.ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.SubContent
>

/**
 * ⚡ Bolt: ContextMenuSubContent component optimized with React.memo and React.forwardRef.
 */
const ContextMenuSubContent = React.memo(
  React.forwardRef<
    React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
    ContextMenuSubContentProps
  >(({ className, ...props }, ref) => {
    return (
      <ContextMenuPrimitive.SubContent
        ref={ref}
        data-slot="context-menu-sub-content"
        className={cn(
          "z-50 min-w-[8rem] overflow-hidden rounded-base border-2 border-border bg-main p-1 font-base text-main-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-context-menu-content-transform-origin)",
          className,
        )}
        {...props}
      />
    )
  }),
)
ContextMenuSubContent.displayName = "ContextMenuSubContent"

export type ContextMenuContentProps = React.ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.Content
>

/**
 * ⚡ Bolt: ContextMenuContent component optimized with React.memo and React.forwardRef.
 */
const ContextMenuContent = React.memo(
  React.forwardRef<
    React.ElementRef<typeof ContextMenuPrimitive.Content>,
    ContextMenuContentProps
  >(({ className, ...props }, ref) => {
    return (
      <ContextMenuPrimitive.Portal>
        <ContextMenuPrimitive.Content
          ref={ref}
          data-slot="context-menu-content"
          className={cn(
            "z-50 min-w-[8rem] overflow-hidden rounded-base border-2 border-border bg-main p-1 font-base text-main-foreground shadow-md animate-in fade-in-80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-context-menu-content-transform-origin)",
            className,
          )}
          {...props}
        />
      </ContextMenuPrimitive.Portal>
    )
  }),
)
ContextMenuContent.displayName = "ContextMenuContent"

export type ContextMenuItemProps = React.ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.Item
> & {
  inset?: boolean
}

/**
 * ⚡ Bolt: ContextMenuItem component optimized with React.memo and React.forwardRef.
 */
const ContextMenuItem = React.memo(
  React.forwardRef<
    React.ElementRef<typeof ContextMenuPrimitive.Item>,
    ContextMenuItemProps
  >(({ className, inset, ...props }, ref) => {
    return (
      <ContextMenuPrimitive.Item
        ref={ref}
        data-slot="context-menu-item"
        data-inset={inset}
        className={cn(
          "relative flex cursor-default select-none items-center rounded-base border-2 border-transparent px-2 py-1.5 gap-2 text-sm focus-visible:ring-ring focus-visible:outline-hidden focus:bg-main-foreground/10 focus:border-border data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
          className,
        )}
        {...props}
      />
    )
  }),
)
ContextMenuItem.displayName = "ContextMenuItem"

export type ContextMenuCheckboxItemProps = React.ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.CheckboxItem
>

/**
 * ⚡ Bolt: ContextMenuCheckboxItem component optimized with React.memo and React.forwardRef.
 */
const ContextMenuCheckboxItem = React.memo(
  React.forwardRef<
    React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
    ContextMenuCheckboxItemProps
  >(({ className, children, checked, ...props }, ref) => {
    return (
      <ContextMenuPrimitive.CheckboxItem
        ref={ref}
        data-slot="context-menu-checkbox-item"
        className={cn(
          "relative flex cursor-default select-none items-center rounded-base border-2 border-transparent py-1.5 pl-8 pr-2 gap-2 text-sm font-base text-main-foreground focus-visible:ring-ring focus-visible:outline-hidden focus:bg-main-foreground/10 focus:border-border data-disabled:pointer-events-none data-disabled:opacity-50",
          className,
        )}
        checked={checked}
        {...props}
      >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          <ContextMenuPrimitive.ItemIndicator>
            <Check className="h-4 w-4" aria-hidden="true" />
          </ContextMenuPrimitive.ItemIndicator>
        </span>
        {children}
      </ContextMenuPrimitive.CheckboxItem>
    )
  }),
)
ContextMenuCheckboxItem.displayName = "ContextMenuCheckboxItem"

export type ContextMenuRadioItemProps = React.ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.RadioItem
>

/**
 * ⚡ Bolt: ContextMenuRadioItem component optimized with React.memo and React.forwardRef.
 */
const ContextMenuRadioItem = React.memo(
  React.forwardRef<
    React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
    ContextMenuRadioItemProps
  >(({ className, children, ...props }, ref) => {
    return (
      <ContextMenuPrimitive.RadioItem
        ref={ref}
        data-slot="context-menu-radio-item"
        className={cn(
          "relative flex cursor-default select-none items-center rounded-base border-2 border-transparent py-1.5 pl-8 pr-2 gap-2 text-sm font-base text-main-foreground focus-visible:ring-ring focus-visible:outline-hidden focus:bg-main-foreground/10 focus:border-border data-disabled:pointer-events-none data-disabled:opacity-50",
          className,
        )}
        {...props}
      >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          <ContextMenuPrimitive.ItemIndicator>
            <Circle className="h-2 w-2 fill-current" aria-hidden="true" />
          </ContextMenuPrimitive.ItemIndicator>
        </span>
        {children}
      </ContextMenuPrimitive.RadioItem>
    )
  }),
)
ContextMenuRadioItem.displayName = "ContextMenuRadioItem"

export type ContextMenuLabelProps = React.ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.Label
> & {
  inset?: boolean
}

/**
 * ⚡ Bolt: ContextMenuLabel component optimized with React.memo and React.forwardRef.
 */
const ContextMenuLabel = React.memo(
  React.forwardRef<
    React.ElementRef<typeof ContextMenuPrimitive.Label>,
    ContextMenuLabelProps
  >(({ className, inset, ...props }, ref) => {
    return (
      <ContextMenuPrimitive.Label
        ref={ref}
        data-slot="context-menu-label"
        data-inset={inset}
        className={cn(
          "px-2 py-1.5 text-sm font-base border-2 border-transparent text-main-foreground data-[inset]:pl-8",
          className,
        )}
        {...props}
      />
    )
  }),
)
ContextMenuLabel.displayName = "ContextMenuLabel"

export type ContextMenuSeparatorProps = React.ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.Separator
>

/**
 * ⚡ Bolt: ContextMenuSeparator component optimized with React.memo and React.forwardRef.
 */
const ContextMenuSeparator = React.memo(
  React.forwardRef<
    React.ElementRef<typeof ContextMenuPrimitive.Separator>,
    ContextMenuSeparatorProps
  >(({ className, ...props }, ref) => {
    return (
      <ContextMenuPrimitive.Separator
        ref={ref}
        data-slot="context-menu-separator"
        className={cn("-mx-1 my-1 h-0.5 bg-border", className)}
        {...props}
      />
    )
  }),
)
ContextMenuSeparator.displayName = "ContextMenuSeparator"

export type ContextMenuShortcutProps = React.ComponentPropsWithoutRef<"span">

/**
 * ⚡ Bolt: ContextMenuShortcut component optimized with React.memo and React.forwardRef.
 */
const ContextMenuShortcut = React.memo(
  React.forwardRef<HTMLSpanElement, ContextMenuShortcutProps>(
    ({ className, ...props }, ref) => {
      return (
        <span
          ref={ref}
          data-slot="context-menu-shortcut"
          className={cn(
            "ml-auto text-xs font-base tracking-widest text-main-foreground",
            className,
          )}
          {...props}
        />
      )
    },
  ),
)
ContextMenuShortcut.displayName = "ContextMenuShortcut"

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
}
