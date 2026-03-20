import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"

import * as React from "react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-base text-sm font-base transition-all gap-2 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border-2 border-border",
  {
    variants: {
      variant: {
        default:
          "text-main-foreground bg-main shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none",
        noShadow: "text-main-foreground bg-main",
        neutral:
          "bg-secondary-background text-foreground shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none",
        reverse:
          "text-main-foreground bg-main hover:translate-x-reverseBoxShadowX hover:translate-y-reverseBoxShadowY hover:shadow-shadow",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export type ButtonProps = React.ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    isLoading?: boolean
  }

/**
 * ⚡ Bolt: Button component optimized with React.memo and React.forwardRef.
 * This ensures stable references and prevents unnecessary re-renders.
 */
const Button = React.memo(
  React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
      {
        className,
        variant,
        size,
        asChild = false,
        isLoading = false,
        children,
        ...props
      },
      ref,
    ) => {
      const Comp = asChild ? Slot : "button"

      return (
        <Comp
          ref={ref}
          data-slot="button"
          className={cn(buttonVariants({ variant, size, className }))}
          disabled={isLoading || props.disabled}
          aria-busy={isLoading}
          {...props}
        >
          {isLoading && !asChild && <Loader2 className="animate-spin" aria-hidden="true" />}
          {children}
        </Comp>
      )
    },
  ),
)

Button.displayName = "Button"

export { Button, buttonVariants }
