import * as React from "react"

import { cn } from "@/lib/utils"

export type PageWrapperProps = React.ComponentPropsWithoutRef<"main">

/**
 * ⚡ Bolt: PageWrapper component optimized with React.memo and React.forwardRef.
 */
const PageWrapper = React.memo(
  React.forwardRef<HTMLElement, PageWrapperProps>(
    ({ children, className, ...props }, ref) => {
      return (
        <main
          ref={ref}
          id="main-content"
          data-slot="page-wrapper"
          className={cn(
            "min-h-[100dvh] bg-background bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px] px-5 pt-[70px] prose-h4:xl:text-2xl prose-h4:lg:text-xl prose-h4:text-lg",
            className,
          )}
          {...props}
        >
          <div className="py-16 mx-auto w-container max-w-full text-foreground text-left">
            {children}
          </div>
        </main>
      )
    },
  ),
)

PageWrapper.displayName = "PageWrapper"

export type PageHeadingProps = React.ComponentPropsWithoutRef<"h1">

/**
 * ⚡ Bolt: PageHeading component optimized with React.memo and React.forwardRef.
 */
const PageHeading = React.memo(
  React.forwardRef<HTMLHeadingElement, PageHeadingProps>(
    ({ className, ...props }, ref) => {
      return (
        <h1
          ref={ref}
          data-slot="page-heading"
          className={cn(
            "font-heading text-center 2xl:text-4xl xl:text-3xl text-2xl",
            className,
          )}
          {...props}
        />
      )
    },
  ),
)

PageHeading.displayName = "PageHeading"

export type PageHeaderProps = React.ComponentPropsWithoutRef<"div">

/**
 * ⚡ Bolt: PageHeader component optimized with React.memo and React.forwardRef.
 */
const PageHeader = React.memo(
  React.forwardRef<HTMLDivElement, PageHeaderProps>(
    ({ children, className, ...props }, ref) => {
      return (
        <div
          ref={ref}
          data-slot="page-header"
          className={cn("mb-[50px] flex flex-col gap-8", className)}
          {...props}
        >
          {children}
        </div>
      )
    },
  ),
)

PageHeader.displayName = "PageHeader"

export type PageDescriptionProps = React.ComponentPropsWithoutRef<"p">

/**
 * ⚡ Bolt: PageDescription component optimized with React.memo and React.forwardRef.
 */
const PageDescription = React.memo(
  React.forwardRef<HTMLParagraphElement, PageDescriptionProps>(
    ({ className, ...props }, ref) => {
      return (
        <p
          ref={ref}
          data-slot="page-description"
          className={cn(
            "font-base 2xl:text-2xl xl:text-xl md:text-lg sm:text-lg text-base text-center",
            className,
          )}
          {...props}
        />
      )
    },
  ),
)

PageDescription.displayName = "PageDescription"

export type PageActionsProps = React.ComponentPropsWithoutRef<"div">

/**
 * ⚡ Bolt: PageActions component optimized with React.memo and React.forwardRef.
 */
const PageActions = React.memo(
  React.forwardRef<HTMLDivElement, PageActionsProps>(
    ({ className, ...props }, ref) => {
      return (
        <div
          ref={ref}
          data-slot="page-actions"
          className={cn(
            "flex w-full items-center justify-center gap-2 pt-2",
            className,
          )}
          {...props}
        />
      )
    },
  ),
)

PageActions.displayName = "PageActions"

export { PageWrapper, PageActions, PageDescription, PageHeading, PageHeader }
