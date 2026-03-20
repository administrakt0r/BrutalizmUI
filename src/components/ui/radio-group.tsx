"use client"

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import * as React from "react"

import { cn } from "@/lib/utils"

export type RadioGroupProps = React.ComponentPropsWithoutRef<
  typeof RadioGroupPrimitive.Root
>

/**
 * ⚡ Bolt: RadioGroup component optimized with React.memo and forwardRef.
 */
const RadioGroup = React.memo(
  React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitive.Root>,
    RadioGroupProps
  >(({ className, ...props }, ref) => (
    <RadioGroupPrimitive.Root
      ref={ref}
      data-slot="radio-group"
      className={cn("grid gap-2", className)}
      {...props}
    />
  )),
)

RadioGroup.displayName = "RadioGroup"

export type RadioGroupItemProps = React.ComponentPropsWithoutRef<
  typeof RadioGroupPrimitive.Item
>

/**
 * ⚡ Bolt: RadioGroupItem component optimized with React.memo and forwardRef.
 */
const RadioGroupItem = React.memo(
  React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitive.Item>,
    RadioGroupItemProps
  >(({ className, ...props }, ref) => (
    <RadioGroupPrimitive.Item
      ref={ref}
      data-slot="radio-group-item"
      className={cn(
        "aspect-square size-4 rounded-full border-2 border-border text-black dark:text-white focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="flex items-center justify-center"
      >
        <Circle
          className="size-2 fill-current text-current"
          aria-hidden="true"
        />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )),
)

RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }
