import { cva, type VariantProps } from "class-variance-authority"

import * as React from "react"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-base border-2 border-border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current shadow-shadow",
  {
    variants: {
      variant: {
        default: "bg-main text-main-foreground",
        destructive: "bg-black text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export type AlertProps = React.ComponentPropsWithoutRef<"div"> &
  VariantProps<typeof alertVariants>

/**
 * ⚡ Bolt: Alert component optimized with React.memo and React.forwardRef.
 */
const Alert = React.memo(
  React.forwardRef<HTMLDivElement, AlertProps>(
    ({ className, variant, ...props }, ref) => {
      return (
        <div
          ref={ref}
          data-slot="alert"
          role="alert"
          className={cn(alertVariants({ variant }), className)}
          {...props}
        />
      )
    },
  ),
)

Alert.displayName = "Alert"

export type AlertTitleProps = React.ComponentPropsWithoutRef<"div">

/**
 * ⚡ Bolt: AlertTitle component optimized with React.memo and React.forwardRef.
 */
const AlertTitle = React.memo(
  React.forwardRef<HTMLDivElement, AlertTitleProps>(
    ({ className, ...props }, ref) => {
      return (
        <div
          ref={ref}
          data-slot="alert-title"
          className={cn(
            "col-start-2 line-clamp-1 min-h-4 font-heading tracking-tight",
            className,
          )}
          {...props}
        />
      )
    },
  ),
)

AlertTitle.displayName = "AlertTitle"

export type AlertDescriptionProps = React.ComponentPropsWithoutRef<"div">

/**
 * ⚡ Bolt: AlertDescription component optimized with React.memo and React.forwardRef.
 */
const AlertDescription = React.memo(
  React.forwardRef<HTMLDivElement, AlertDescriptionProps>(
    ({ className, ...props }, ref) => {
      return (
        <div
          ref={ref}
          data-slot="alert-description"
          className={cn(
            "col-start-2 grid justify-items-start gap-1 text-sm font-base [&_p]:leading-relaxed",
            className,
          )}
          {...props}
        />
      )
    },
  ),
)

AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
