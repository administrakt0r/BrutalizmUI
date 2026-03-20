import * as React from "react"

import { cn } from "@/lib/utils"

export type CardProps = React.ComponentPropsWithoutRef<"div">

/**
 * ⚡ Bolt: Card component optimized with React.memo and React.forwardRef.
 */
const Card = React.memo(
  React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, ...props }, ref) => {
      return (
        <div
          ref={ref}
          data-slot="card"
          className={cn(
            "rounded-base flex flex-col shadow-shadow border-2 gap-6 py-6 border-border bg-background text-foreground font-base",
            className,
          )}
          {...props}
        />
      )
    },
  ),
)

Card.displayName = "Card"

export type CardHeaderProps = React.ComponentPropsWithoutRef<"div">

/**
 * ⚡ Bolt: CardHeader component optimized with React.memo and React.forwardRef.
 */
const CardHeader = React.memo(
  React.forwardRef<HTMLDivElement, CardHeaderProps>(
    ({ className, ...props }, ref) => {
      return (
        <div
          ref={ref}
          data-slot="card-header"
          className={cn(
            "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-[data-slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
            className,
          )}
          {...props}
        />
      )
    },
  ),
)

CardHeader.displayName = "CardHeader"

export type CardTitleProps = React.ComponentPropsWithoutRef<"div">

/**
 * ⚡ Bolt: CardTitle component optimized with React.memo and React.forwardRef.
 */
const CardTitle = React.memo(
  React.forwardRef<HTMLDivElement, CardTitleProps>(
    ({ className, ...props }, ref) => {
      return (
        <div
          ref={ref}
          data-slot="card-title"
          className={cn("font-heading leading-none", className)}
          {...props}
        />
      )
    },
  ),
)

CardTitle.displayName = "CardTitle"

export type CardDescriptionProps = React.ComponentPropsWithoutRef<"div">

/**
 * ⚡ Bolt: CardDescription component optimized with React.memo and React.forwardRef.
 */
const CardDescription = React.memo(
  React.forwardRef<HTMLDivElement, CardDescriptionProps>(
    ({ className, ...props }, ref) => {
      return (
        <div
          ref={ref}
          data-slot="card-description"
          className={cn("text-sm font-base", className)}
          {...props}
        />
      )
    },
  ),
)

CardDescription.displayName = "CardDescription"

export type CardActionProps = React.ComponentPropsWithoutRef<"div">

/**
 * ⚡ Bolt: CardAction component optimized with React.memo and React.forwardRef.
 */
const CardAction = React.memo(
  React.forwardRef<HTMLDivElement, CardActionProps>(
    ({ className, ...props }, ref) => {
      return (
        <div
          ref={ref}
          data-slot="card-action"
          className={cn(
            "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
            className,
          )}
          {...props}
        />
      )
    },
  ),
)

CardAction.displayName = "CardAction"

export type CardContentProps = React.ComponentPropsWithoutRef<"div">

/**
 * ⚡ Bolt: CardContent component optimized with React.memo and React.forwardRef.
 */
const CardContent = React.memo(
  React.forwardRef<HTMLDivElement, CardContentProps>(
    ({ className, ...props }, ref) => {
      return (
        <div
          ref={ref}
          data-slot="card-content"
          className={cn("px-6", className)}
          {...props}
        />
      )
    },
  ),
)

CardContent.displayName = "CardContent"

export type CardFooterProps = React.ComponentPropsWithoutRef<"div">

/**
 * ⚡ Bolt: CardFooter component optimized with React.memo and React.forwardRef.
 */
const CardFooter = React.memo(
  React.forwardRef<HTMLDivElement, CardFooterProps>(
    ({ className, ...props }, ref) => {
      return (
        <div
          ref={ref}
          data-slot="card-footer"
          className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
          {...props}
        />
      )
    },
  ),
)

CardFooter.displayName = "CardFooter"

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
}
