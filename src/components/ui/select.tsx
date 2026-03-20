"use client"

import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import * as React from "react"

import { cn } from "@/lib/utils"

export type SelectProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>

/**
 * 🌐 Atlas: Select component optimized with React.memo.
 */
const Select = React.memo(({ ...props }: SelectProps) => {
  return <SelectPrimitive.Root data-slot="select" {...props} />
})

Select.displayName = "Select"

export type SelectGroupProps = React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Group
>

/**
 * 🌐 Atlas: SelectGroup component optimized with React.memo and React.forwardRef.
 */
const SelectGroup = React.memo(
  React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Group>,
    SelectGroupProps
  >(({ ...props }, ref) => {
    return (
      <SelectPrimitive.Group ref={ref} data-slot="select-group" {...props} />
    )
  }),
)

SelectGroup.displayName = "SelectGroup"

export type SelectValueProps = React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Value
>

/**
 * 🌐 Atlas: SelectValue component optimized with React.memo and React.forwardRef.
 */
const SelectValue = React.memo(
  React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Value>,
    SelectValueProps
  >(({ ...props }, ref) => {
    return (
      <SelectPrimitive.Value ref={ref} data-slot="select-value" {...props} />
    )
  }),
)

SelectValue.displayName = "SelectValue"

export type SelectTriggerProps = React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Trigger
>

/**
 * 🌐 Atlas: SelectTrigger component optimized with React.memo and React.forwardRef.
 */
const SelectTrigger = React.memo(
  React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Trigger>,
    SelectTriggerProps
  >(({ className, children, ...props }, ref) => {
    return (
      <SelectPrimitive.Trigger
        ref={ref}
        data-slot="select-trigger"
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-base border-2 border-border bg-main gap-2 px-3 py-2 text-sm font-base text-main-foreground placeholder:text-foreground/50 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[state=open]:bg-main-foreground/10 data-[state=open]:border-border",
          className,
        )}
        {...props}
      >
        {children}
        <SelectPrimitive.Icon asChild>
          <ChevronDown className="size-4" aria-hidden="true" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
    )
  }),
)

SelectTrigger.displayName = "SelectTrigger"

export type SelectScrollUpButtonProps = React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.ScrollUpButton
>

/**
 * 🌐 Atlas: SelectScrollUpButton component optimized with React.memo and React.forwardRef.
 */
const SelectScrollUpButton = React.memo(
  React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
    SelectScrollUpButtonProps
  >(({ className, ...props }, ref) => {
    return (
      <SelectPrimitive.ScrollUpButton
        ref={ref}
        data-slot="select-scroll-up"
        className={cn(
          "flex cursor-default text-main-foreground font-base items-center justify-center py-1",
          className,
        )}
        {...props}
      >
        <ChevronUp className="size-4" aria-hidden="true" />
      </SelectPrimitive.ScrollUpButton>
    )
  }),
)

SelectScrollUpButton.displayName = "SelectScrollUpButton"

export type SelectScrollDownButtonProps = React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.ScrollDownButton
>

/**
 * 🌐 Atlas: SelectScrollDownButton component optimized with React.memo and React.forwardRef.
 */
const SelectScrollDownButton = React.memo(
  React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
    SelectScrollDownButtonProps
  >(({ className, ...props }, ref) => {
    return (
      <SelectPrimitive.ScrollDownButton
        ref={ref}
        data-slot="select-scroll-down"
        className={cn(
          "flex cursor-default text-main-foreground font-base items-center justify-center py-1",
          className,
        )}
        {...props}
      >
        <ChevronDown className="size-4" aria-hidden="true" />
      </SelectPrimitive.ScrollDownButton>
    )
  }),
)

SelectScrollDownButton.displayName = "SelectScrollDownButton"

export type SelectContentProps = React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Content
>

/**
 * 🌐 Atlas: SelectContent component optimized with React.memo and React.forwardRef.
 */
const SelectContent = React.memo(
  React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Content>,
    SelectContentProps
  >(({ className, children, position = "popper", ...props }, ref) => {
    return (
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          ref={ref}
          data-slot="select-content"
          className={cn(
            "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-base border-2 border-border bg-main shadow-shadow text-main-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)",
            position === "popper" &&
              "data-[side=bottom]:translate-y-2 data-[side=left]:-translate-x-2 data-[side=right]:translate-x-2 data-[side=top]:-translate-y-2",
            className,
          )}
          position={position}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.Viewport
            className={cn(
              "p-1",
              position === "popper" &&
                "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
            )}
          >
            {children}
          </SelectPrimitive.Viewport>
          <SelectScrollDownButton />
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    )
  }),
)

SelectContent.displayName = "SelectContent"

export type SelectLabelProps = React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Label
>

/**
 * 🌐 Atlas: SelectLabel component optimized with React.memo and React.forwardRef.
 */
const SelectLabel = React.memo(
  React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Label>,
    SelectLabelProps
  >(({ className, ...props }, ref) => {
    return (
      <SelectPrimitive.Label
        ref={ref}
        data-slot="select-label"
        className={cn(
          "border-2 border-transparent py-1.5 pr-8 pl-2 text-sm font-base text-main-foreground/80",
          className,
        )}
        {...props}
      />
    )
  }),
)

SelectLabel.displayName = "SelectLabel"

export type SelectItemProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>

/**
 * 🌐 Atlas: SelectItem component optimized with React.memo and React.forwardRef.
 */
const SelectItem = React.memo(
  React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Item>,
    SelectItemProps
  >(({ className, children, ...props }, ref) => {
    return (
      <SelectPrimitive.Item
        ref={ref}
        data-slot="select-item"
        className={cn(
          "relative flex w-full cursor-default select-none items-center gap-2 rounded-base py-1.5 pr-8 pl-2 text-sm border-2 border-transparent transition-all font-base outline-none focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus:bg-main-foreground/10 focus:border-border data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
          className,
        )}
        {...props}
      >
        <span className="absolute right-2 flex size-3.5 items-center justify-center">
          <SelectPrimitive.ItemIndicator>
            <Check className="size-4" aria-hidden="true" />
          </SelectPrimitive.ItemIndicator>
        </span>
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      </SelectPrimitive.Item>
    )
  }),
)

SelectItem.displayName = "SelectItem"

export type SelectSeparatorProps = React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Separator
>

/**
 * 🌐 Atlas: SelectSeparator component optimized with React.memo and React.forwardRef.
 */
const SelectSeparator = React.memo(
  React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Separator>,
    SelectSeparatorProps
  >(({ className, ...props }, ref) => {
    return (
      <SelectPrimitive.Separator
        ref={ref}
        data-slot="select-separator"
        className={cn("-mx-1 my-1 h-px bg-border", className)}
        {...props}
      />
    )
  }),
)

SelectSeparator.displayName = "SelectSeparator"

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
