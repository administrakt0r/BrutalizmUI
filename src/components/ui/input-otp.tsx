"use client"

import { OTPInput, OTPInputContext } from "input-otp"
import { Dot } from "lucide-react"

import * as React from "react"

import { cn } from "@/lib/utils"

export type InputOTPProps = React.ComponentPropsWithoutRef<typeof OTPInput> & {
  containerClassName?: string
}

/**
 * ⚡ Bolt: InputOTP component optimized with React.memo and forwardRef.
 */
const InputOTP = React.memo(
  React.forwardRef<React.ElementRef<typeof OTPInput>, InputOTPProps>(
    ({ className, containerClassName, ...props }, ref) => (
      <OTPInput
        ref={ref}
        data-slot="input-otp"
        containerClassName={cn(
          "flex items-center gap-2 has-disabled:opacity-50",
          containerClassName,
        )}
        className={cn("disabled:cursor-not-allowed", className)}
        {...props}
      />
    ),
  ),
)

InputOTP.displayName = "InputOTP"

export type InputOTPGroupProps = React.ComponentPropsWithoutRef<"div">

/**
 * ⚡ Bolt: InputOTPGroup component optimized with React.memo and forwardRef.
 */
const InputOTPGroup = React.memo(
  React.forwardRef<React.ElementRef<"div">, InputOTPGroupProps>(
    ({ className, ...props }, ref) => (
      <div
        ref={ref}
        data-slot="input-otp-group"
        className={cn("flex items-center", className)}
        {...props}
      />
    ),
  ),
)

InputOTPGroup.displayName = "InputOTPGroup"

export type InputOTPSlotProps = React.ComponentPropsWithoutRef<"div"> & {
  index: number
}

/**
 * ⚡ Bolt: InputOTPSlot component optimized with React.memo and forwardRef.
 */
const InputOTPSlot = React.memo(
  React.forwardRef<React.ElementRef<"div">, InputOTPSlotProps>(
    ({ index, className, ...props }, ref) => {
      const inputOTPContext = React.useContext(OTPInputContext)
      const { char, hasFakeCaret, isActive } =
        inputOTPContext?.slots[index] ?? {}

      return (
        <div
          ref={ref}
          data-slot="input-otp-slot"
          data-active={isActive}
          className={cn(
            "relative flex size-10 items-center justify-center border-y-2 border-r-2 border-border bg-secondary-background text-sm font-base text-foreground first:rounded-l-base first:border-l-2 last:rounded-r-base transition-all",
            isActive && "z-10 ring-2 ring-ring",
            className,
          )}
          {...props}
        >
          {char}
          {hasFakeCaret && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-4 w-px animate-caret-blink bg-current duration-1000" />
            </div>
          )}
        </div>
      )
    },
  ),
)

InputOTPSlot.displayName = "InputOTPSlot"

export type InputOTPSeparatorProps = React.ComponentPropsWithoutRef<"div">

/**
 * ⚡ Bolt: InputOTPSeparator component optimized with React.memo and forwardRef.
 */
const InputOTPSeparator = React.memo(
  React.forwardRef<React.ElementRef<"div">, InputOTPSeparatorProps>(
    ({ ...props }, ref) => (
      <div
        ref={ref}
        data-slot="input-otp-separator"
        role="separator"
        {...props}
      >
        <Dot className="size-4" aria-hidden="true" />
      </div>
    ),
  ),
)

InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
