"use client"

import * as SliderPrimitive from "@radix-ui/react-slider"

import * as React from "react"

import { cn } from "@/lib/utils"

export type SliderProps = React.ComponentPropsWithoutRef<
  typeof SliderPrimitive.Root
>

/**
 * 🌐 Atlas: Slider component optimized with React.memo and React.forwardRef.
 */
const Slider = React.memo(
  React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, SliderProps>(
    ({ className, defaultValue, value, min = 0, max = 100, ...props }, ref) => {
      const _values = React.useMemo(
        () =>
          Array.isArray(value)
            ? value
            : Array.isArray(defaultValue)
              ? defaultValue
              : [min, max],
        [value, defaultValue, min, max],
      )

      return (
        <SliderPrimitive.Root
          ref={ref}
          data-slot="slider"
          defaultValue={defaultValue}
          value={value}
          min={min}
          max={max}
          className={cn(
            "relative flex w-full touch-none select-none items-center data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
            className,
          )}
          {...props}
        >
          <SliderPrimitive.Track
            data-slot="slider-track"
            className="relative w-full grow overflow-hidden rounded-base bg-secondary-background border-2 border-border data-[orientation=horizontal]:h-3 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-3"
          >
            <SliderPrimitive.Range
              data-slot="slider-range"
              className="absolute bg-main data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
            />
          </SliderPrimitive.Track>
          {Array.from({ length: _values.length }, (_, index) => (
            <SliderPrimitive.Thumb
              data-slot="slider-thumb"
              key={index}
              aria-label={`Value ${index + 1}`}
              className="block h-5 w-5 rounded-full border-2 border-border bg-white transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            />
          ))}
        </SliderPrimitive.Root>
      )
    },
  ),
)
Slider.displayName = "Slider"

export { Slider }
