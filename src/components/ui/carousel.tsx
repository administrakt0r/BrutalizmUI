"use client"

import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { cn } from "@/lib/utils"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

export type CarouselProps = React.ComponentPropsWithoutRef<"div"> & {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
  plugins?: CarouselPlugin
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

/**
 * ⚡ Bolt: Carousel component optimized with React.memo and memoized context value.
 */
const Carousel = React.memo(
  React.forwardRef<HTMLDivElement, CarouselProps>(
    (
      {
        orientation = "horizontal",
        opts,
        setApi,
        plugins,
        className,
        children,
        ...props
      },
      ref,
    ) => {
      const [carouselRef, api] = useEmblaCarousel(
        {
          ...opts,
          axis: orientation === "horizontal" ? "x" : "y",
        },
        plugins,
      )
      const [canScrollPrev, setCanScrollPrev] = React.useState(false)
      const [canScrollNext, setCanScrollNext] = React.useState(false)

      const onSelect = React.useCallback((api: CarouselApi) => {
        if (!api) {
          return
        }

        setCanScrollPrev(api.canScrollPrev())
        setCanScrollNext(api.canScrollNext())
      }, [])

      const scrollPrev = React.useCallback(() => {
        api?.scrollPrev()
      }, [api])

      const scrollNext = React.useCallback(() => {
        api?.scrollNext()
      }, [api])

      const handleKeyDown = React.useCallback(
        (event: React.KeyboardEvent<HTMLDivElement>) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault()
            scrollPrev()
          } else if (event.key === "ArrowRight") {
            event.preventDefault()
            scrollNext()
          }
        },
        [scrollPrev, scrollNext],
      )

      React.useEffect(() => {
        if (!api || !setApi) {
          return
        }

        setApi(api)
      }, [api, setApi])

      React.useEffect(() => {
        if (!api) {
          return
        }

        onSelect(api)
        api.on("reInit", onSelect)
        api.on("select", onSelect)

        return () => {
          api?.off("select", onSelect)
        }
      }, [api, onSelect])

      const value = React.useMemo(
        () => ({
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }),
        [
          carouselRef,
          api,
          opts,
          orientation,
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        ],
      )

      return (
        <CarouselContext.Provider value={value}>
          <div
            ref={ref}
            onKeyDownCapture={handleKeyDown}
            className={cn("relative", className)}
            role="region"
            aria-roledescription="carousel"
            data-slot="carousel"
            {...props}
          >
            {children}
          </div>
        </CarouselContext.Provider>
      )
    },
  ),
)

Carousel.displayName = "Carousel"

export type CarouselContentProps = React.ComponentPropsWithoutRef<"div">

/**
 * ⚡ Bolt: CarouselContent component optimized with React.memo and React.forwardRef.
 */
const CarouselContent = React.memo(
  React.forwardRef<HTMLDivElement, CarouselContentProps>(
    ({ className, ...props }, ref) => {
      const { carouselRef, orientation } = useCarousel()

      return (
        <div
          ref={carouselRef}
          className="overflow-hidden"
          data-slot="carousel-content"
        >
          <div
            ref={ref}
            className={cn(
              "flex",
              orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
              className,
            )}
            {...props}
          />
        </div>
      )
    },
  ),
)

CarouselContent.displayName = "CarouselContent"

export type CarouselItemProps = React.ComponentPropsWithoutRef<"div">

/**
 * ⚡ Bolt: CarouselItem component optimized with React.memo and React.forwardRef.
 */
const CarouselItem = React.memo(
  React.forwardRef<HTMLDivElement, CarouselItemProps>(
    ({ className, ...props }, ref) => {
      const { orientation } = useCarousel()

      return (
        <div
          ref={ref}
          data-slot="carousel-item"
          role="group"
          aria-roledescription="slide"
          className={cn(
            "min-w-0 shrink-0 grow-0 basis-full",
            orientation === "horizontal" ? "pl-4" : "pt-4",
            className,
          )}
          {...props}
        />
      )
    },
  ),
)

CarouselItem.displayName = "CarouselItem"

export type CarouselPreviousProps = React.ComponentPropsWithoutRef<typeof Button>

/**
 * ⚡ Bolt: CarouselPrevious component optimized with React.memo and React.forwardRef.
 */
const CarouselPrevious = React.memo(
  React.forwardRef<HTMLButtonElement, CarouselPreviousProps>(
    ({ className, variant = "noShadow", size = "icon", ...props }, ref) => {
      const { orientation, scrollPrev, canScrollPrev } = useCarousel()

      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              ref={ref}
              data-slot="carousel-previous"
              variant={variant}
              size={size}
              className={cn(
                "absolute size-8 rounded-base",
                orientation === "horizontal"
                  ? "top-1/2 -left-12 -translate-y-1/2"
                  : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
                className,
              )}
              disabled={!canScrollPrev}
              onClick={scrollPrev}
              {...props}
            >
              <ArrowLeft aria-hidden="true" />
              <span className="sr-only">Previous slide</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Previous slide</p>
          </TooltipContent>
        </Tooltip>
      )
    },
  ),
)

CarouselPrevious.displayName = "CarouselPrevious"

export type CarouselNextProps = React.ComponentPropsWithoutRef<typeof Button>

/**
 * ⚡ Bolt: CarouselNext component optimized with React.memo and React.forwardRef.
 */
const CarouselNext = React.memo(
  React.forwardRef<HTMLButtonElement, CarouselNextProps>(
    ({ className, variant = "noShadow", size = "icon", ...props }, ref) => {
      const { orientation, scrollNext, canScrollNext } = useCarousel()

      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              ref={ref}
              data-slot="carousel-next"
              variant={variant}
              size={size}
              className={cn(
                "absolute h-8 w-8 rounded-base",
                orientation === "horizontal"
                  ? "-right-12 top-1/2 -translate-y-1/2"
                  : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
                className,
              )}
              disabled={!canScrollNext}
              onClick={scrollNext}
              {...props}
            >
              <ArrowRight aria-hidden="true" />
              <span className="sr-only">Next slide</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Next slide</p>
          </TooltipContent>
        </Tooltip>
      )
    },
  ),
)

CarouselNext.displayName = "CarouselNext"

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}
