"use client"

import { Command as CommandPrimitive } from "cmdk"
import { Search } from "lucide-react"

import * as React from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { cn } from "@/lib/utils"

export type CommandProps = React.ComponentPropsWithoutRef<
  typeof CommandPrimitive
>

/**
 * ⚡ Bolt: Command component optimized with React.memo and forwardRef.
 */
const Command = React.memo(
  React.forwardRef<React.ElementRef<typeof CommandPrimitive>, CommandProps>(
    ({ className, ...props }, ref) => (
      <CommandPrimitive
        ref={ref}
        data-slot="command"
        className={cn(
          "flex h-full w-full flex-col overflow-hidden rounded-[0px] border-2 border-border bg-main font-base text-main-foreground",
          className,
        )}
        {...props}
      />
    ),
  ),
)

Command.displayName = "Command"

export type CommandDialogProps = React.ComponentPropsWithoutRef<typeof Dialog> & {
  title?: string
  description?: string
}

/**
 * 🌐 Atlas: CommandDialog component optimized with React.memo and React.forwardRef.
 */
const CommandDialog = React.memo(
  React.forwardRef<React.ElementRef<typeof Dialog>, CommandDialogProps>(
    (
      {
        title = "Command Palette",
        description = "Search for a command to run...",
        children,
        ...props
      },
      ref,
    ) => {
      return (
        <Dialog {...props}>
          <DialogHeader className="sr-only">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <DialogContent
            ref={ref}
            className="overflow-hidden p-0 rounded-[0px]! shadow-shadow border-0"
          >
            <Command className="**:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-heading [&_[cmdk-group-heading]]:mb-1 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
              {children}
            </Command>
          </DialogContent>
        </Dialog>
      )
    },
  ),
)

CommandDialog.displayName = "CommandDialog"

export type CommandInputProps = React.ComponentPropsWithoutRef<
  typeof CommandPrimitive.Input
>

/**
 * ⚡ Bolt: CommandInput component optimized with React.memo and forwardRef.
 */
const CommandInput = React.memo(
  React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.Input>,
    CommandInputProps
  >(({ className, ...props }, ref) => (
    <div
      data-slot="command-input-wrapper"
      className="flex h-9 gap-2 items-center border-b-2 border-border px-3"
    >
      <Search className="size-4 shrink-0" aria-hidden="true" />
      <CommandPrimitive.Input
        ref={ref}
        data-slot="command-input"
        className={cn(
          "flex h-10 w-full rounded-base bg-transparent py-3 text-sm outline-hidden placeholder:text-main-foreground placeholder:opacity-50 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring",
          className,
        )}
        {...props}
      />
    </div>
  )),
)

CommandInput.displayName = "CommandInput"

export type CommandListProps = React.ComponentPropsWithoutRef<
  typeof CommandPrimitive.List
>

/**
 * ⚡ Bolt: CommandList component optimized with React.memo and forwardRef.
 */
const CommandList = React.memo(
  React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.List>,
    CommandListProps
  >(({ className, ...props }, ref) => (
    <CommandPrimitive.List
      ref={ref}
      data-slot="command-list"
      className={cn(
        "max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto",
        className,
      )}
      {...props}
    />
  )),
)

CommandList.displayName = "CommandList"

export type CommandEmptyProps = React.ComponentPropsWithoutRef<
  typeof CommandPrimitive.Empty
>

/**
 * ⚡ Bolt: CommandEmpty component optimized with React.memo and forwardRef.
 */
const CommandEmpty = React.memo(
  React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.Empty>,
    CommandEmptyProps
  >(({ className, ...props }, ref) => (
    <CommandPrimitive.Empty
      ref={ref}
      data-slot="command-empty"
      className={cn("py-6 text-center text-sm", className)}
      {...props}
    />
  )),
)

CommandEmpty.displayName = "CommandEmpty"

export type CommandGroupProps = React.ComponentPropsWithoutRef<
  typeof CommandPrimitive.Group
>

/**
 * ⚡ Bolt: CommandGroup component optimized with React.memo and forwardRef.
 */
const CommandGroup = React.memo(
  React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.Group>,
    CommandGroupProps
  >(({ className, ...props }, ref) => (
    <CommandPrimitive.Group
      ref={ref}
      data-slot="command-group"
      className={cn(
        "text-main-foreground overflow-hidden p-2 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-base [&_[cmdk-group-heading]]:font-heading",
        className,
      )}
      {...props}
    />
  )),
)

CommandGroup.displayName = "CommandGroup"

export type CommandSeparatorProps = React.ComponentPropsWithoutRef<
  typeof CommandPrimitive.Separator
>

/**
 * ⚡ Bolt: CommandSeparator component optimized with React.memo and forwardRef.
 */
const CommandSeparator = React.memo(
  React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.Separator>,
    CommandSeparatorProps
  >(({ className, ...props }, ref) => (
    <CommandPrimitive.Separator
      ref={ref}
      data-slot="command-separator"
      className={cn("-mx-1 h-0.5 bg-border", className)}
      {...props}
    />
  )),
)

CommandSeparator.displayName = "CommandSeparator"

export type CommandItemProps = React.ComponentPropsWithoutRef<
  typeof CommandPrimitive.Item
>

/**
 * ⚡ Bolt: CommandItem component optimized with React.memo and forwardRef.
 */
const CommandItem = React.memo(
  React.forwardRef<
    React.ElementRef<typeof CommandPrimitive.Item>,
    CommandItemProps
  >(({ className, ...props }, ref) => (
    <CommandPrimitive.Item
      ref={ref}
      data-slot="command-item"
      className={cn(
        "relative flex cursor-default select-none items-center rounded-base px-2 py-1.5 gap-2 text-sm text-main-foreground border-2 border-transparent transition-all aria-selected:bg-main-foreground/10 aria-selected:border-border focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  )),
)

CommandItem.displayName = "CommandItem"

export type CommandShortcutProps = React.ComponentPropsWithoutRef<"span">

/**
 * ⚡ Bolt: CommandShortcut component optimized with React.memo and forwardRef.
 */
const CommandShortcut = React.memo(
  React.forwardRef<HTMLSpanElement, CommandShortcutProps>(
    ({ className, ...props }, ref) => (
      <span
        ref={ref}
        data-slot="command-shortcut"
        className={cn(
          "ml-auto text-xs tracking-widest text-main-foreground",
          className,
        )}
        {...props}
      />
    ),
  ),
)

CommandShortcut.displayName = "CommandShortcut"

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
