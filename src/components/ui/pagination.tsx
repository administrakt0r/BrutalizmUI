import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

import * as React from "react"

import { buttonVariants } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { cn } from "@/lib/utils"

export type PaginationProps = React.ComponentPropsWithoutRef<"nav">

/**
 * ⚡ Bolt: Pagination component optimized with React.memo and forwardRef.
 */
const Pagination = React.memo(
  React.forwardRef<HTMLElement, PaginationProps>(
    ({ className, ...props }, ref) => (
      <nav
        ref={ref}
        data-slot="pagination"
        role="navigation"
        aria-label="pagination"
        className={cn("mx-auto flex w-full justify-center", className)}
        {...props}
      />
    ),
  ),
)

Pagination.displayName = "Pagination"

export type PaginationContentProps = React.ComponentPropsWithoutRef<"ul">

/**
 * ⚡ Bolt: PaginationContent component optimized with React.memo and forwardRef.
 */
const PaginationContent = React.memo(
  React.forwardRef<HTMLUListElement, PaginationContentProps>(
    ({ className, ...props }, ref) => (
      <ul
        ref={ref}
        data-slot="pagination-content"
        className={cn("flex flex-row items-center gap-1", className)}
        {...props}
      />
    ),
  ),
)

PaginationContent.displayName = "PaginationContent"

export type PaginationItemProps = React.ComponentPropsWithoutRef<"li">

/**
 * ⚡ Bolt: PaginationItem component optimized with React.memo and forwardRef.
 */
const PaginationItem = React.memo(
  React.forwardRef<HTMLLIElement, PaginationItemProps>(
    ({ className, ...props }, ref) => (
      <li
        ref={ref}
        data-slot="pagination-item"
        className={cn("", className)}
        {...props}
      />
    ),
  ),
)

PaginationItem.displayName = "PaginationItem"

export type PaginationLinkProps = React.ComponentPropsWithoutRef<"a"> & {
  isActive?: boolean
  size?: "default" | "sm" | "lg" | "icon"
}

/**
 * ⚡ Bolt: PaginationLink component optimized with React.memo and forwardRef.
 */
const PaginationLink = React.memo(
  React.forwardRef<HTMLAnchorElement, PaginationLinkProps>(
    ({ className, isActive, size = "icon", ...props }, ref) => (
      <a
        ref={ref}
        data-slot="pagination-link"
        aria-current={isActive ? "page" : undefined}
        className={cn(
          buttonVariants({
            variant: "noShadow",
            size,
          }),
          className,
          isActive && "bg-black text-white",
        )}
        {...props}
      />
    ),
  ),
)

PaginationLink.displayName = "PaginationLink"

export type PaginationPreviousProps = React.ComponentPropsWithoutRef<
  typeof PaginationLink
>

/**
 * ⚡ Bolt: PaginationPrevious component optimized with React.memo and forwardRef.
 */
const PaginationPrevious = React.memo(
  React.forwardRef<HTMLAnchorElement, PaginationPreviousProps>(
    ({ className, ...props }, ref) => (
      <PaginationLink
        ref={ref}
        data-slot="pagination-previous"
        aria-label="Go to previous page"
        size="default"
        className={cn("gap-1 pl-2.5", className)}
        {...props}
      >
        <ChevronLeft className="size-4" aria-hidden="true" />
        <span>Previous</span>
      </PaginationLink>
    ),
  ),
)

PaginationPrevious.displayName = "PaginationPrevious"

export type PaginationNextProps = React.ComponentPropsWithoutRef<
  typeof PaginationLink
>

/**
 * ⚡ Bolt: PaginationNext component optimized with React.memo and forwardRef.
 */
const PaginationNext = React.memo(
  React.forwardRef<HTMLAnchorElement, PaginationNextProps>(
    ({ className, ...props }, ref) => (
      <PaginationLink
        ref={ref}
        data-slot="pagination-next"
        aria-label="Go to next page"
        size="default"
        className={cn("gap-1 pr-2.5", className)}
        {...props}
      >
        <span>Next</span>
        <ChevronRight className="size-4" aria-hidden="true" />
      </PaginationLink>
    ),
  ),
)

PaginationNext.displayName = "PaginationNext"

export type PaginationEllipsisProps = React.ComponentPropsWithoutRef<"span">

/**
 * ⚡ Bolt: PaginationEllipsis component optimized with React.memo and forwardRef.
 */
const PaginationEllipsis = React.memo(
  React.forwardRef<HTMLSpanElement, PaginationEllipsisProps>(
    ({ className, ...props }, ref) => (
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            ref={ref}
            data-slot="pagination-ellipsis"
            className={cn("flex size-9 items-center justify-center", className)}
            {...props}
          >
            <MoreHorizontal className="size-4" aria-hidden="true" />
            <span className="sr-only">More pages</span>
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>More pages</p>
        </TooltipContent>
      </Tooltip>
    ),
  ),
)

PaginationEllipsis.displayName = "PaginationEllipsis"

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
