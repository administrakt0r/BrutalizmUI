"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { MAIN_SIDEBAR } from "@/data/sidebar-links"

import { cn } from "@/lib/utils"

// ⚡ Bolt: Memoize sidebar links to prevent unnecessary re-renders of the ~50+ items
// in the sidebar when navigating between doc pages.
const SidebarLink = React.memo(
  ({
    href,
    text,
    isActive,
  }: {
    href: string
    text: string
    isActive: boolean
  }) => {
    return (
      <Link
        href={href}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "block border-b-4 border-r-4 border-border p-4 pl-7 text-lg font-base text-foreground/90 hover:bg-main/70 hover:text-main-foreground",
          isActive && "bg-main text-main-foreground hover:bg-main",
        )}
      >
        {text}
      </Link>
    )
  },
)

SidebarLink.displayName = "SidebarLink"

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="scrollbar fixed top-[70px] bg-secondary-background h-[calc(100svh-70px)] max-h-[calc(100svh-70px)] w-[250px] overflow-y-auto border-r-4 lg:block hidden border-border">
      {MAIN_SIDEBAR.map((item, id) => {
        if (typeof item === "string") {
          return (
            <div
              key={id}
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
}
