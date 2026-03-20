"use client"

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import * as React from "react"

import { cn } from "@/lib/utils"

export type DropdownMenuProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Root
>

/**
 * ⚡ Bolt: DropdownMenu component optimized with React.memo.
 */
const DropdownMenu = React.memo(({ ...props }: DropdownMenuProps) => {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
})

DropdownMenu.displayName = "DropdownMenu"

export type DropdownMenuTriggerProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Trigger
>

/**
 * ⚡ Bolt: DropdownMenuTrigger component optimized with React.memo and React.forwardRef.
 */
const DropdownMenuTrigger = React.memo(
  React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Trigger>,
    DropdownMenuTriggerProps
  >(({ ...props }, ref) => {
    return (
      <DropdownMenuPrimitive.Trigger
        ref={ref}
        data-slot="dropdown-menu-trigger"
        {...props}
      />
    )
  }),
)

DropdownMenuTrigger.displayName = "DropdownMenuTrigger"

export type DropdownMenuGroupProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Group
>

/**
 * ⚡ Bolt: DropdownMenuGroup component optimized with React.memo and React.forwardRef.
 */
const DropdownMenuGroup = React.memo(
  React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Group>,
    DropdownMenuGroupProps
  >(({ ...props }, ref) => {
    return (
      <DropdownMenuPrimitive.Group
        ref={ref}
        data-slot="dropdown-menu-group"
        {...props}
      />
    )
  }),
)

DropdownMenuGroup.displayName = "DropdownMenuGroup"

export type DropdownMenuPortalProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Portal
>

/**
 * ⚡ Bolt: DropdownMenuPortal component optimized with React.memo.
 */
const DropdownMenuPortal = React.memo(
  ({ ...props }: DropdownMenuPortalProps) => {
    return (
      <DropdownMenuPrimitive.Portal
        data-slot="dropdown-menu-portal"
        {...props}
      />
    )
  },
)

DropdownMenuPortal.displayName = "DropdownMenuPortal"

export type DropdownMenuSubProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Sub
>

/**
 * ⚡ Bolt: DropdownMenuSub component optimized with React.memo.
 */
const DropdownMenuSub = React.memo(({ ...props }: DropdownMenuSubProps) => {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />
})

DropdownMenuSub.displayName = "DropdownMenuSub"

export type DropdownMenuRadioGroupProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.RadioGroup
>

/**
 * ⚡ Bolt: DropdownMenuRadioGroup component optimized with React.memo and React.forwardRef.
 */
const DropdownMenuRadioGroup = React.memo(
  React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.RadioGroup>,
    DropdownMenuRadioGroupProps
  >(({ ...props }, ref) => {
    return (
      <DropdownMenuPrimitive.RadioGroup
        ref={ref}
        data-slot="dropdown-menu-radio-group"
        {...props}
      />
    )
  }),
)

DropdownMenuRadioGroup.displayName = "DropdownMenuRadioGroup"

export type DropdownMenuSubTriggerProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.SubTrigger
> & {
  inset?: boolean
}

/**
 * ⚡ Bolt: DropdownMenuSubTrigger component optimized with React.memo and React.forwardRef.
 */
const DropdownMenuSubTrigger = React.memo(
  React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
    DropdownMenuSubTriggerProps
  >(({ className, inset, children, ...props }, ref) => {
    return (
      <DropdownMenuPrimitive.SubTrigger
        ref={ref}
        data-slot="dropdown-menu-sub-trigger"
        data-inset={inset}
        className={cn(
          "flex cursor-default select-none items-center rounded-base border-2 border-transparent bg-main px-2 py-1.5 text-sm font-base focus-visible:ring-ring focus-visible:outline-hidden focus:bg-main-foreground/10 focus:border-border data-[state=open]:bg-main-foreground/10 data-[state=open]:border-border gap-2 data-[inset=true]:pl-8 [&_svg]:pointer-events-none [&_svg]:w-4 [&_svg]:h-4 [&_svg]:shrink-0",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronRight className="ml-auto" aria-hidden="true" />
      </DropdownMenuPrimitive.SubTrigger>
    )
  }),
)

DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger"

export type DropdownMenuSubContentProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.SubContent
>

/**
 * ⚡ Bolt: DropdownMenuSubContent component optimized with React.memo and React.forwardRef.
 */
const DropdownMenuSubContent = React.memo(
  React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
    DropdownMenuSubContentProps
  >(({ className, ...props }, ref) => {
    return (
      <DropdownMenuPrimitive.SubContent
        ref={ref}
        data-slot="dropdown-menu-sub-content"
        className={cn(
          "z-50 min-w-[8rem] overflow-hidden rounded-base border-2 border-border bg-main shadow-shadow p-1 font-base text-main-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
          className,
        )}
        {...props}
      />
    )
  }),
)

DropdownMenuSubContent.displayName = "DropdownMenuSubContent"

export type DropdownMenuContentProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Content
>

/**
 * ⚡ Bolt: DropdownMenuContent component optimized with React.memo and React.forwardRef.
 */
const DropdownMenuContent = React.memo(
  React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Content>,
    DropdownMenuContentProps
  >(({ className, sideOffset = 4, ...props }, ref) => {
    return (
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          ref={ref}
          data-slot="dropdown-menu-content"
          sideOffset={sideOffset}
          className={cn(
            "z-50 min-w-[8rem] overflow-hidden rounded-base border-2 border-border bg-main shadow-shadow p-1 font-base text-main-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
            className,
          )}
          {...props}
        />
      </DropdownMenuPrimitive.Portal>
    )
  }),
)

DropdownMenuContent.displayName = "DropdownMenuContent"

export type DropdownMenuItemProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Item
> & {
  inset?: boolean
}

/**
 * ⚡ Bolt: DropdownMenuItem component optimized with React.memo and React.forwardRef.
 */
const DropdownMenuItem = React.memo(
  React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Item>,
    DropdownMenuItemProps
  >(({ className, inset, ...props }, ref) => {
    return (
      <DropdownMenuPrimitive.Item
        ref={ref}
        data-slot="dropdown-menu-item"
        data-inset={inset}
        className={cn(
          "relative gap-2 [&_svg]:pointer-events-none [&_svg]:w-4 [&_svg]:h-4 [&_svg]:shrink-0 flex cursor-default select-none items-center rounded-base border-2 border-transparent data-[inset=true]:pl-8 bg-main px-2 py-1.5 text-sm font-base transition-colors focus-visible:ring-ring focus-visible:outline-hidden focus:bg-main-foreground/10 focus:border-border data-disabled:pointer-events-none data-disabled:opacity-50",
          className,
        )}
        {...props}
      />
    )
  }),
)

DropdownMenuItem.displayName = "DropdownMenuItem"

export type DropdownMenuCheckboxItemProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.CheckboxItem
>

/**
 * ⚡ Bolt: DropdownMenuCheckboxItem component optimized with React.memo and React.forwardRef.
 */
const DropdownMenuCheckboxItem = React.memo(
  React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
    DropdownMenuCheckboxItemProps
  >(({ className, children, checked, ...props }, ref) => {
    return (
      <DropdownMenuPrimitive.CheckboxItem
        ref={ref}
        data-slot="dropdown-menu-checkbox-item"
        className={cn(
          "relative flex cursor-default select-none items-center rounded-base border-2 border-transparent gap-2 py-1.5 pl-8 pr-2 text-sm font-base text-main-foreground transition-colors focus-visible:ring-ring focus-visible:outline-hidden focus:bg-main-foreground/10 focus:border-border data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
          className,
        )}
        checked={checked}
        {...props}
      >
        <span className="absolute left-2 flex size-3.5 items-center justify-center">
          <DropdownMenuPrimitive.ItemIndicator>
            <Check aria-hidden="true" />
          </DropdownMenuPrimitive.ItemIndicator>
        </span>
        {children}
      </DropdownMenuPrimitive.CheckboxItem>
    )
  }),
)

DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem"

export type DropdownMenuRadioItemProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.RadioItem
>

/**
 * ⚡ Bolt: DropdownMenuRadioItem component optimized with React.memo and React.forwardRef.
 */
const DropdownMenuRadioItem = React.memo(
  React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
    DropdownMenuRadioItemProps
  >(({ className, children, ...props }, ref) => {
    return (
      <DropdownMenuPrimitive.RadioItem
        ref={ref}
        data-slot="dropdown-menu-radio-item"
        className={cn(
          "relative flex cursor-default select-none items-center rounded-base border-2 border-transparent gap-2 py-1.5 pl-8 pr-2 text-sm font-base transition-colors focus-visible:ring-ring focus-visible:outline-hidden focus:bg-main-foreground/10 focus:border-border data-disabled:pointer-events-none data-disabled:opacity-50",
          className,
        )}
        {...props}
      >
        <span className="absolute left-2 flex size-3.5 items-center justify-center">
          <DropdownMenuPrimitive.ItemIndicator>
            <Circle className="size-2 fill-current" aria-hidden="true" />
          </DropdownMenuPrimitive.ItemIndicator>
        </span>
        {children}
      </DropdownMenuPrimitive.RadioItem>
    )
  }),
)

DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem"

export type DropdownMenuLabelProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Label
> & {
  inset?: boolean
}

/**
 * ⚡ Bolt: DropdownMenuLabel component optimized with React.memo and React.forwardRef.
 */
const DropdownMenuLabel = React.memo(
  React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Label>,
    DropdownMenuLabelProps
  >(({ className, inset, ...props }, ref) => {
    return (
      <DropdownMenuPrimitive.Label
        ref={ref}
        data-slot="dropdown-menu-label"
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

DropdownMenuLabel.displayName = "DropdownMenuLabel"

export type DropdownMenuSeparatorProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Separator
>

/**
 * ⚡ Bolt: DropdownMenuSeparator component optimized with React.memo and React.forwardRef.
 */
const DropdownMenuSeparator = React.memo(
  React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
    DropdownMenuSeparatorProps
  >(({ className, ...props }, ref) => {
    return (
      <DropdownMenuPrimitive.Separator
        ref={ref}
        data-slot="dropdown-menu-separator"
        className={cn("-mx-1 my-1 h-0.5 bg-border", className)}
        {...props}
      />
    )
  }),
)

DropdownMenuSeparator.displayName = "DropdownMenuSeparator"

export type DropdownMenuShortcutProps = React.ComponentPropsWithoutRef<"span">

/**
 * ⚡ Bolt: DropdownMenuShortcut component optimized with React.memo and React.forwardRef.
 */
const DropdownMenuShortcut = React.memo(
  React.forwardRef<HTMLSpanElement, DropdownMenuShortcutProps>(
    ({ className, ...props }, ref) => {
      return (
        <span
          ref={ref}
          data-slot="dropdown-menu-shortcut"
          className={cn("ml-auto text-xs font-base tracking-widest", className)}
          {...props}
        />
      )
    },
  ),
)

DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}
