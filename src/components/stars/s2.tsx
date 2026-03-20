import * as React from "react"

import { cn } from "@/lib/utils"

export type Star2Props = React.ComponentPropsWithoutRef<"svg"> & {
  color?: string
  size?: number
  stroke?: string
  pathClassName?: string
  strokeWidth?: number
}

/**
 * ⚡ Bolt: Star2 component optimized with React.memo and React.forwardRef.
 * @preview ![img](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAhtJREFUSEuVVrtSwkAUPdGI2qG1NHSGn0AN2sIMQyEfgZWWYKuVfAOdDGALM6D/oJQ02EPFQyWrLJC9m90NkYZw92bv45x7LpbHGLOw/DAAq6flM4Pl/1obxRd1pe8qdsBijC3N2+/wQ2/SkBPiVm6SkzMEWL8sf+nykAvXeEQIIDL9+fnmbbRtO6RdcsxVAFra+pnisXkej0c8QDweD6BmxuxfFfT7fX6xc+rwXosk5N6IEwZLzyL6gnBvNpv8IJfLiQpoxRp2qRVoEtuYyuUKrL9+Vu7vFWKbQDHSlKa4mYlsNsvhemm1xNxsYVr4HASqcRyHx11hIR/SvlOCSAGok5hkYT06OuYXj0ZLNvlzFQp4OIsI1gtvgf3YPs97Pp3B3rMDNehQYGapoO691zecn50JkwX0uj2k02lfQKh2CWIFAih9ZMDl1SU6nQ5SqRS63S7AGC5cF+/vH8hkXLTbbQUPSnIyyXJPh8NPJJNJuK6LZqOBg8NDqQfT2RT5fJ4HGAwGOEkk1upLaSVVIA5u724xmUxQfapiZ3cnIOSymnoLD6WbEk/g8eFBoS+ZZGD+9YV6/RnF62IEAClRV8nVajUUCgXEYjEfG0kqdNQ0Lx+zFlEOG6RCs0wUcdAMmrJwItHUpJTKitM6GsVO34AQJdTvOyrXGg9lERluUf4yCDWKsA9oK6JVQL1Ii+QB4YxS1icdRg0GmnX7C+DxTr75fwQvAAAAAElFTkSuQmCC)
 */
const Star2 = React.memo(
  React.forwardRef<SVGSVGElement, Star2Props>(
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
          data-slot="star-s2"
          className={cn(className)}
          {...props}
        >
          <path
        fill={color ?? "currentColor"}
        stroke={stroke}
        strokeWidth={strokeWidth}
        className={pathClassName}
        d="m100 5 67.175 27.825L195 100l-27.825 67.175L100 195l-67.175-27.825L5 100l27.825-67.175z"
      />
        </svg>
      )
    },
  ),
)

Star2.displayName = "Star2"

export default Star2
