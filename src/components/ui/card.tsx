import * as React from "react"

import { cn } from "@/lib/utils"

export type CardProps = React.ComponentProps<"div">

function Card({ className, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(
        "rounded-base flex flex-col shadow-shadow border-2 gap-6 py-6 border-border bg-background text-foreground font-base",
        className,
      )}
      {...props}
    />
  )
}

Card.displayName = "Card"

export type CardHeaderProps = React.ComponentProps<"div">

function CardHeader({ className, ...props }: CardHeaderProps) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-[data-slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className,
      )}
      {...props}
    />
  )
}

CardHeader.displayName = "CardHeader"

export type CardTitleProps = React.ComponentProps<"div">

function CardTitle({ className, ...props }: CardTitleProps) {
  return (
    <div
      data-slot="card-title"
      className={cn("font-heading leading-none", className)}
      {...props}
    />
  )
}

CardTitle.displayName = "CardTitle"

export type CardDescriptionProps = React.ComponentProps<"div">

function CardDescription({ className, ...props }: CardDescriptionProps) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm font-base", className)}
      {...props}
    />
  )
}

CardDescription.displayName = "CardDescription"

export type CardActionProps = React.ComponentProps<"div">

function CardAction({ className, ...props }: CardActionProps) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  )
}

CardAction.displayName = "CardAction"

export type CardContentProps = React.ComponentProps<"div">

function CardContent({ className, ...props }: CardContentProps) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

CardContent.displayName = "CardContent"

export type CardFooterProps = React.ComponentProps<"div">

function CardFooter({ className, ...props }: CardFooterProps) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

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
