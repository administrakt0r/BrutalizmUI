"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export type LazyRenderProps = React.ComponentPropsWithoutRef<"div"> & {
  rootMargin?: string
}

// ⚡ Bolt: Shared IntersectionObserver pool keyed by rootMargin to minimize browser resource usage.
// On pages with many lazy-rendered components (like Stars or Charts), this prevents
// creating dozens of duplicate observer instances, reducing main-thread overhead.
const observers = new Map<string, IntersectionObserver>()

// ⚡ Bolt: WeakMap to associate DOM elements with their respective state-update callbacks.
// WeakMap ensures that entries are automatically garbage collected when elements are removed.
const callbacks = new WeakMap<Element, () => void>()

/**
 * A wrapper component that delays rendering its children until it intersects with the viewport.
 * Uses a shared `IntersectionObserver` pool to monitor visibility, which improves initial load times
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
        // ⚡ Bolt: Early exit if already in view or element is not yet available.
        if (inView || !internalRef.current) return

        const el = internalRef.current

        // ⚡ Bolt: Initialize or retrieve a shared observer for the specified rootMargin.
        let observer = observers.get(rootMargin)
        if (!observer) {
          observer = new IntersectionObserver(
            (entries, obs) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  const callback = callbacks.get(entry.target)
                  if (callback) {
                    callback()
                    callbacks.delete(entry.target)
                    obs.unobserve(entry.target)
                  }
                }
              })
            },
            { rootMargin },
          )
          observers.set(rootMargin, observer)
        }

        callbacks.set(el, () => setInView(true))
        observer.observe(el)

        return () => {
          callbacks.delete(el)
          // Always unobserve on cleanup to prevent memory leaks.
          observer?.unobserve(el)
        }
      }, [rootMargin, inView])

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
