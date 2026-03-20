"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import Search from "@/components/app/search"
import { ThemeSwitcher } from "@/components/app/theme-switcher"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { cn } from "@/lib/utils"

const REPO_URL = "https://github.com/administrakt0r/brutalizmUI/"

const NAV_LINKS = [
  { href: "/docs", text: "Docs" },
  { href: "/docs/accordion", text: "Components" },
  { href: "/styling", text: "Styling" },
  { href: "/charts", text: "Charts" },
  { href: "/stars", text: "Stars" },
  { href: "/templates", text: "Templates" },
  { href: "/showcase", text: "Showcase" },
]

type NavLinkProps = {
  href: string
  text: string
  isActive: boolean
}

// ⚡ Bolt: Memoize navbar links to prevent unnecessary re-renders of inactive
// links when navigating.
const NavLink = React.memo(
  React.forwardRef<HTMLAnchorElement, NavLinkProps>(
    ({ href, text, isActive }, ref) => {
  return (
    <Link
      ref={ref}
      data-slot="nav-link"
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "transition-colors hover:text-main",
        isActive && "text-main font-heading",
      )}
    >
      {text}
    </Link>
  )
  }
)
)

NavLink.displayName = "NavLink"

/**
 * ⚡ Bolt: NavbarLinks component isolated to prevent the entire navbar
 * from re-rendering when the pathname changes during navigation.
 */
export type NavbarLinksProps = React.ComponentPropsWithoutRef<"div">

const NavbarLinks = React.memo(
  React.forwardRef<HTMLDivElement, NavbarLinksProps>(
    ({ className, ...props }, ref) => {
      const pathname = usePathname()

      return (
        <div
          ref={ref}
          data-slot="navbar-links"
          className={cn(
            "items-center text-base font-base xl:gap-10 lg:flex gap-10 hidden",
            className,
          )}
          {...props}
        >
          {NAV_LINKS.map((link) => {
            const isActive =
              pathname === link.href || pathname?.startsWith(link.href + "/")

            return (
              <NavLink
                key={link.href}
                href={link.href}
                text={link.text}
                isActive={isActive}
              />
            )
          })}
        </div>
      )
    },
  ),
)

NavbarLinks.displayName = "NavbarLinks"

export type NavbarBrandProps = React.ComponentPropsWithoutRef<typeof Link>

/**
 * ⚡ Bolt: NavbarBrand component optimized with React.memo and React.forwardRef.
 */
const NavbarBrand = React.memo(
  React.forwardRef<React.ElementRef<typeof Link>, NavbarBrandProps>(
    ({ href = "/", "aria-label": ariaLabel = "Home", className, ...props }, ref) => (
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            ref={ref}
            data-slot="navbar-brand"
            className={cn(
              "text-[22px] size-8 rounded-base flex bg-main text-main-foreground border-2 border-black items-center justify-center font-heading",
              className
            )}
            href={href}
            aria-label={ariaLabel}
            {...props}
          >
            B
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>Home</p>
        </TooltipContent>
      </Tooltip>
    ),
  ),
)

NavbarBrand.displayName = "NavbarBrand"

export type NavbarActionsProps = React.ComponentPropsWithoutRef<"div">

/**
 * ⚡ Bolt: NavbarActions component optimized with React.memo and React.forwardRef.
 */
const NavbarActions = React.memo(
  React.forwardRef<HTMLDivElement, NavbarActionsProps>(
    ({ className, ...props }, ref) => (
      <div
        ref={ref}
        data-slot="navbar-actions"
        className={cn("flex items-center gap-4", className)}
        {...props}
      >
        <Search />

        <div className="flex items-center justify-end gap-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub repository"
                href={REPO_URL}
                className="flex gap-2 items-center justify-center rounded-base border-2 border-border shadow-nav dark:shadow-navDark dark:border-darkBorder px-1.5 h-9 transition-all hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none dark:hover:shadow-none"
              >
                <p className="font-semibold sm:inline hidden">GitHub repo</p>

                <svg
                  className="size-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 496 512"
                >
                  <path
                    className="fill-foreground"
                    d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                  />
                </svg>
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>GitHub repository</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Samuel Breznjak on Twitter"
                href="https://twitter.com/samuelbreznjak"
                className="flex items-center justify-center rounded-base border-2 border-border shadow-nav dark:shadow-navDark dark:border-darkBorder size-9 transition-all hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none dark:hover:shadow-none"
              >
                <svg
                  className="size-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    className="fill-foreground"
                    d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
                  />
                </svg>
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>Twitter</p>
            </TooltipContent>
          </Tooltip>

          <ThemeSwitcher />
        </div>
      </div>
    ),
  ),
)

NavbarActions.displayName = "NavbarActions"

export type NavbarProps = React.ComponentPropsWithoutRef<"nav">

/**
 * ⚡ Bolt: Navbar component optimized with React.memo and React.forwardRef.
 */
const Navbar = React.memo(
  React.forwardRef<HTMLElement, NavbarProps>(({ className, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        data-slot="navbar"
        className={cn(
          "fixed left-0 top-0 z-20 mx-auto flex h-[70px] w-full items-center border-b-4 border-border bg-secondary-background px-5",
          className,
        )}
        {...props}
      >
        <div className="mx-auto flex w-[1300px] text-foreground max-w-full items-center justify-between">
          <div className="flex items-center xl:gap-10 gap-10">
            <NavbarBrand href="/" />
            <NavbarLinks />
          </div>

          <NavbarActions />
        </div>
      </nav>
    )
  }),
)

Navbar.displayName = "Navbar"

export default Navbar
