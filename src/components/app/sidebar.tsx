"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { MAIN_SIDEBAR } from "@/data/sidebar-links"

import { cn } from "@/lib/utils"

export type SidebarLinkProps = React.ComponentPropsWithoutRef<typeof Link> & {
  isActive: boolean
  text: string
}

// ⚡ Bolt: Memoize sidebar links to prevent unnecessary re-renders of the ~50+ items
// in the sidebar when navigating between doc pages.
const SidebarLink = React.memo(
  React.forwardRef<React.ElementRef<typeof Link>, SidebarLinkProps>(
    ({ href, text, isActive, className, ...props }, ref) => {
      return (
        <Link
          ref={ref}
          href={href}
          data-slot="sidebar-link"
          aria-current={isActive ? "page" : undefined}
          className={cn(
            "block border-b-4 border-r-4 border-border p-4 pl-7 text-lg font-base text-foreground/90 hover:bg-main/70 hover:text-main-foreground",
            isActive && "bg-main text-main-foreground hover:bg-main",
            className,
          )}
          {...props}
        >
          {text}
        </Link>
      )
    },
  ),
)

SidebarLink.displayName = "SidebarLink"

export type SidebarProps = React.ComponentPropsWithoutRef<"aside">

/**
 * ⚡ Bolt: Sidebar component optimized with React.memo and React.forwardRef.
 */
const Sidebar = React.memo(
  React.forwardRef<HTMLElement, SidebarProps>(({ className, ...props }, ref) => {
    const pathname = usePathname()

    return (
      <aside
        ref={ref}
        data-slot="sidebar"
        className={cn(
          "scrollbar fixed top-[70px] bg-secondary-background h-[calc(100svh-70px)] max-h-[calc(100svh-70px)] w-[250px] overflow-y-auto border-r-4 lg:block hidden border-border",
          className,
        )}
        {...props}
      >
        {MAIN_SIDEBAR.map((item, id) => {
          if (typeof item === "string") {
            return (
              <div
                key={id}
                data-slot="sidebar-heading"
                className="block border-b-4 border-r-4 border-border p-4 text-xl font-heading"
              >
                {item}
              </div>
            )
          }

          const isActive = item.href === pathname

          return (
            <SidebarLink
              key={id}
              href={item.href}
              text={item.text}
              isActive={isActive}
            />
          )
        })}
      </aside>
    )
  }),
)

Sidebar.displayName = "Sidebar"

export default Sidebar
