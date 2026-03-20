import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, MoreHorizontal } from "lucide-react"

import * as React from "react"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { cn } from "@/lib/utils"

export type BreadcrumbProps = React.ComponentPropsWithoutRef<"nav"> & {
  separator?: React.ReactNode
}

/**
 * ⚡ Bolt: Breadcrumb component optimized with React.memo.
 */
const Breadcrumb = React.memo(
  React.forwardRef<HTMLElement, BreadcrumbProps>(
    ({ separator: _separator, ...props }, ref) => (
      <nav
        ref={ref}
        data-slot="breadcrumb"
        aria-label="breadcrumb"
        {...props}
      />
    ),
  ),
)

Breadcrumb.displayName = "Breadcrumb"

export type BreadcrumbListProps = React.ComponentPropsWithoutRef<"ol">

/**
 * ⚡ Bolt: BreadcrumbList component optimized with React.memo.
 */
const BreadcrumbList = React.memo(
  React.forwardRef<HTMLOListElement, BreadcrumbListProps>(
    ({ className, ...props }, ref) => (
      <ol
        ref={ref}
        data-slot="breadcrumb-list"
        className={cn(
          "flex flex-wrap items-center gap-1.5 text-sm font-base break-words text-foreground sm:gap-2.5",
          className,
        )}
        {...props}
      />
    ),
  ),
)

BreadcrumbList.displayName = "BreadcrumbList"

export type BreadcrumbItemProps = React.ComponentPropsWithoutRef<"li">

/**
 * ⚡ Bolt: BreadcrumbItem component optimized with React.memo.
 */
const BreadcrumbItem = React.memo(
  React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
    ({ className, ...props }, ref) => (
      <li
        ref={ref}
        data-slot="breadcrumb-item"
        className={cn("inline-flex items-center gap-1.5", className)}
        {...props}
      />
    ),
  ),
)

BreadcrumbItem.displayName = "BreadcrumbItem"

export type BreadcrumbLinkProps = React.ComponentPropsWithoutRef<"a"> & {
  asChild?: boolean
}

/**
 * ⚡ Bolt: BreadcrumbLink component optimized with React.memo.
 */
const BreadcrumbLink = React.memo(
  React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
    ({ asChild, className, ...props }, ref) => {
      const Comp = asChild ? Slot : "a"

      return (
        <Comp
          ref={ref}
          data-slot="breadcrumb-link"
          className={cn(
            "transition-colors hover:text-main focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring rounded-base",
            className,
          )}
          {...props}
        />
      )
    },
  ),
)

BreadcrumbLink.displayName = "BreadcrumbLink"

export type BreadcrumbPageProps = React.ComponentPropsWithoutRef<"span">

/**
 * ⚡ Bolt: BreadcrumbPage component optimized with React.memo.
 */
const BreadcrumbPage = React.memo(
  React.forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
    ({ className, ...props }, ref) => (
      <span
        ref={ref}
        data-slot="breadcrumb-page"
        role="link"
        aria-disabled="true"
        aria-current="page"
        className={cn(className)}
        {...props}
      />
    ),
  ),
)

BreadcrumbPage.displayName = "BreadcrumbPage"

export type BreadcrumbSeparatorProps = React.ComponentPropsWithoutRef<"li">

/**
 * ⚡ Bolt: BreadcrumbSeparator component optimized with React.memo.
 */
const BreadcrumbSeparator = React.memo(
  React.forwardRef<HTMLLIElement, BreadcrumbSeparatorProps>(
    ({ children, className, ...props }, ref) => (
      <li
        ref={ref}
        data-slot="breadcrumb-separator"
        role="presentation"
        aria-hidden="true"
        className={cn("[&>svg]:size-3.5", className)}
        {...props}
      >
        {children ?? <ChevronRight />}
      </li>
    ),
  ),
)

BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

export type BreadcrumbEllipsisProps = React.ComponentPropsWithoutRef<"span">

/**
 * ⚡ Bolt: BreadcrumbEllipsis component optimized with React.memo.
 */
const BreadcrumbEllipsis = React.memo(
  React.forwardRef<HTMLSpanElement, BreadcrumbEllipsisProps>(
    ({ className, ...props }, ref) => (
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            ref={ref}
            data-slot="breadcrumb-ellipsis"
            role="presentation"
            className={cn("flex size-9 items-center justify-center", className)}
            {...props}
          >
            <MoreHorizontal className="size-4" aria-hidden="true" />
            <span className="sr-only">More</span>
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>More</p>
        </TooltipContent>
      </Tooltip>
    ),
  ),
)

BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis"

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
