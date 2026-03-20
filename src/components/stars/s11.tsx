import * as React from "react"

import { cn } from "@/lib/utils"

export type Star11Props = React.ComponentPropsWithoutRef<"svg"> & {
  color?: string
  size?: number
  stroke?: string
  pathClassName?: string
  strokeWidth?: number
}

/**
 * ⚡ Bolt: Star11 component optimized with React.memo and React.forwardRef.
 * @preview ![img](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAmpJREFUSEuVVTuS2kAQfePymoQDrAMLAlaqMsSsA04CGRDhGHwHyImADHwQbwJOkcuiqDJiHXAANsBU7djzQdNiRqv1RKKZ7jf9ef3YM+ecQRwODgbGAShDcqjJ+pYG7Zt2k7/YawAcfpZJ40gw+kLGOReWq0NfZBzO57O8d3Nz4wZwpK0AHGWx7nJg8XUhzc1mMz8pHTOVgRtHWzlQuavIwNvtVvZMlsLUxglKANKNMmDmizE9Dq6q2lWW+KTJLz9mH+9RKpfkgO3iGJ73gTTTMWeuEh0OBzQaDfT7fbRaLRSLxaQU3W4X0+lM/m6325hOp0l1jk9HzOdzjEYjPDx8w+3t+yQf0mQFGccxyuWyusCAwA8wGAzQ6/VwOp2kuVAoYDweYzgcItpEgGQSx263Q6lUUr52BibNzWaDIAhyJ0WFVSeKIvh3vkW6VJMNQTjC8AdqtZoBodHkNwOT7AfW6xDV6sf8KaIMFI7fVyvc339KAon/ZVACtlwuUa/XSfD0yskcU+Gx0gCyEFYGKuYFIIurGasCCMMwKZGJTVEM5nq9RrVaTRpLa6V4QEn5bxX8f5MZougnfN+/6gOHtSr2ekx1HxH4PvqDL/gsx/SP7ME7OqZRdJlo/KJjqmc1BZBFNKET3U4Hs5kgGtDpdDCZTJIdeTzmEU0nRvePFB9i//34CM8TJOKSjJ7nEUKl1zv1zdQDS9YEsdkbpXzPeqpeouKFyUbRrDSsqahU6Lp2RLfk09FklyZfQi0WacHJ0SnVfKNoDpm8iiAkU/TlrZbMLK2hbplEy910rgtXfBI1tgEceWdN12se8ReQcnTE9h6YjQAAAABJRU5ErkJggg==)
 */
const Star11 = React.memo(
  React.forwardRef<SVGSVGElement, Star11Props>(
    (
      {
        color,
        size,
        stroke,
        strokeWidth,
        pathClassName,
        width,
        height,
        className,
        ...props
      },
      ref,
    ) => {
      return (
        <svg
          ref={ref}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 200 200"
          width={size ?? width}
          height={size ?? height}
          data-slot="star-s11"
          className={cn(className)}
          {...props}
        >
          <path
        fill={color ?? "currentColor"}
        stroke={stroke}
        strokeWidth={strokeWidth}
        className={pathClassName}
        d="m100 5 18.05 63.737L182.272 52.5 136.1 100l46.172 47.5-64.222-16.236L100 195l-18.05-63.736L17.728 147.5 63.9 100 17.728 52.5 81.95 68.737z"
      />
        </svg>
      )
    },
  ),
)

Star11.displayName = "Star11"

export default Star11
