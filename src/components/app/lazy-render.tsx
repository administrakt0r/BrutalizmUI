"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface LazyRenderProps {
  children: React.ReactNode
  className?: string
  rootMargin?: string
}

export function LazyRender({
  children,
  className,
  rootMargin = "400px",
}: LazyRenderProps) {
  const [inView, setInView] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [rootMargin])

  return (
    <div ref={ref} className={cn(className)}>
      {inView ? children : null}
    </div>
  )
}
