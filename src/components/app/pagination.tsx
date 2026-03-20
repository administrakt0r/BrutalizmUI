import { ArrowLeft, ArrowRight } from "lucide-react"

import * as React from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"

export type PaginationProps = React.ComponentPropsWithoutRef<"div"> & {
  prev?: {
    name: string
    path: string
  }
  next?: {
    name: string
    path: string
  }
}

/**
 * ⚡ Bolt: Pagination component optimized with React.memo and React.forwardRef.
 */
export const Pagination = React.memo(
  React.forwardRef<HTMLDivElement, PaginationProps>(
    ({ prev, next, className, ...props }, ref) => {
      let justifyContent

      if (prev && next) {
        justifyContent = "justify-between"
      } else if (prev) {
        justifyContent = "justify-start"
      } else if (next) {
        justifyContent = "justify-end"
      }

      return (
        <div
          ref={ref}
          data-slot="pagination"
          className={cn("flex w-full items-center", justifyContent, className)}
          {...props}
        >
          {prev?.name && (
            <Link
              data-slot="pagination-prev-link"
              href={prev.path}
              aria-label={`Previous page: ${prev.name}`}
            >
              <Button
                data-slot="pagination-prev-button"
                className="sm:px-5 px-3.5 py-2 h-[unset] sm:text-sm text-xs"
              >
                <ArrowLeft aria-hidden="true" />
                {prev.name}
              </Button>
            </Link>
          )}

          {next?.name && (
            <Link
              data-slot="pagination-next-link"
              href={next.path}
              aria-label={`Next page: ${next.name}`}
            >
              <Button
                data-slot="pagination-next-button"
                className="sm:px-5 px-3.5 py-2 h-[unset] sm:text-sm text-xs"
              >
                {next.name}
                <ArrowRight aria-hidden="true" />
              </Button>
            </Link>
          )}
        </div>
      )
    },
  ),
)

Pagination.displayName = "Pagination"

export default Pagination
