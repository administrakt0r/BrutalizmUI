"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export type LazyRenderProps = React.ComponentPropsWithoutRef<"div"> & {
  rootMargin?: string
}

/**
 * A wrapper component that delays rendering its children until it intersects with the viewport.
 * Uses the `IntersectionObserver` API to monitor visibility, which improves initial load times
 * and time-to-interactive for pages with large amounts of off-screen content.
 *
 * @param {React.ReactNode} props.children - The child components to lazily render.
 * @param {string} [props.className] - Optional class name applied to the wrapping div.
 * @param {string} [props.rootMargin="400px"] - How far outside the viewport to start loading content.
 * @returns {React.ReactElement} The rendered lazy wrapper.
 */
const LazyRender = React.memo(
  React.forwardRef<HTMLDivElement, LazyRenderProps>(
    ({ children, className, rootMargin = "400px", ...props }, ref) => {
      const [inView, setInView] = React.useState(false)
      const internalRef = React.useRef<HTMLDivElement>(null)

      // ⚡ Bolt: Use `useImperativeHandle` to sync the forwarded ref with our internal ref.
      React.useImperativeHandle(ref, () => internalRef.current as HTMLDivElement)

      React.useEffect(() => {
        // ⚡ Bolt: `IntersectionObserver` avoids heavy rendering of off-screen components.
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setInView(true)
              // Disconnect immediately after intersecting to prevent further observer callbacks.
              observer.disconnect()
            }
          },
          { rootMargin },
        )
        if (internalRef.current) observer.observe(internalRef.current)
        return () => observer.disconnect()
      }, [rootMargin])

      return (
        <div
          ref={internalRef}
          data-slot="lazy-render"
          className={cn(className)}
          {...props}
        >
          {inView ? children : null}
        </div>
      )
    },
  ),
)

LazyRender.displayName = "LazyRender"

export { LazyRender }
