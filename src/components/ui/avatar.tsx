"use client"

import * as AvatarPrimitive from "@radix-ui/react-avatar"

import * as React from "react"

import { cn } from "@/lib/utils"

export type AvatarProps = React.ComponentPropsWithoutRef<
  typeof AvatarPrimitive.Root
>

/**
 * ⚡ Bolt: Avatar component optimized with React.memo and React.forwardRef.
 */
const Avatar = React.memo(
  React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Root>, AvatarProps>(
    ({ className, ...props }, ref) => {
      return (
        <AvatarPrimitive.Root
          ref={ref}
          data-slot="avatar"
          className={cn(
            "relative flex size-10 shrink-0 overflow-hidden rounded-full outline-2 outline-border",
            className,
          )}
          {...props}
        />
      )
    },
  ),
)

Avatar.displayName = "Avatar"

export type AvatarImageProps = React.ComponentPropsWithoutRef<
  typeof AvatarPrimitive.Image
>

/**
 * ⚡ Bolt: AvatarImage component optimized with React.memo and React.forwardRef.
 */
const AvatarImage = React.memo(
  React.forwardRef<
    React.ElementRef<typeof AvatarPrimitive.Image>,
    AvatarImageProps
  >(({ className, ...props }, ref) => {
    return (
      <AvatarPrimitive.Image
        ref={ref}
        data-slot="avatar-image"
        className={cn("aspect-square size-full", className)}
        {...props}
      />
    )
  }),
)

AvatarImage.displayName = "AvatarImage"

export type AvatarFallbackProps = React.ComponentPropsWithoutRef<
  typeof AvatarPrimitive.Fallback
>

/**
 * ⚡ Bolt: AvatarFallback component optimized with React.memo and React.forwardRef.
 */
const AvatarFallback = React.memo(
  React.forwardRef<
    React.ElementRef<typeof AvatarPrimitive.Fallback>,
    AvatarFallbackProps
  >(({ className, ...props }, ref) => {
    return (
      <AvatarPrimitive.Fallback
        ref={ref}
        data-slot="avatar-fallback"
        className={cn(
          "flex size-full items-center justify-center rounded-full bg-secondary-background text-foreground font-base",
          className,
        )}
        {...props}
      />
    )
  }),
)

AvatarFallback.displayName = "AvatarFallback"

export { Avatar, AvatarImage, AvatarFallback }
