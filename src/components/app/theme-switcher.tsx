"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { cn, setCSSVariable } from "@/lib/utils"

export type ThemeSwitcherProps = React.ComponentPropsWithoutRef<typeof Button>

/**
 * ⚡ Bolt: ThemeSwitcher component optimized with React.memo and React.forwardRef.
 */
const ThemeSwitcher = React.memo(
  React.forwardRef<HTMLButtonElement, ThemeSwitcherProps>((props, ref) => {
    const { setTheme, theme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
      setMounted(true)
    }, [])

  const handleThemeChange = React.useCallback(() => {
    const newTheme = resolvedTheme === "light" ? "dark" : "light"
    setTheme(newTheme)

    setTimeout(() => {
      if (typeof window === "undefined") return
      const r = document.querySelector(":root") as HTMLElement
      if (!r) return

      if (newTheme === "dark") {
        setCSSVariable(
          "background",
          r.style.getPropertyValue("--dark-background"),
        )
        setCSSVariable("main", r.style.getPropertyValue("--dark-main"))
      } else {
        setCSSVariable(
          "background",
          r.style.getPropertyValue("--light-background"),
        )
        setCSSVariable("main", r.style.getPropertyValue("--light-main"))
      }
    }, 0)
  }, [resolvedTheme, setTheme])

  const label = !mounted
    ? "Toggle theme"
    : resolvedTheme === "light"
      ? "Switch to dark theme"
      : "Switch to light theme"

    return (
      <>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              ref={ref}
              data-slot="theme-switcher"
              aria-label={label}
              {...props}
              className={cn(
                "size-9 p-0 [&_svg]:size-5 shadow-nav hover:translate-x-[4px]! hover:translate-y-[4px]! hover:shadow-none bg-secondary-background",
                props.className,
              )}
              onClick={(e) => {
                handleThemeChange()
                if (props.onClick) props.onClick(e)
              }}
            >
              <Sun
                aria-hidden="true"
                className="hidden dark:inline stroke-foreground"
              />
              <Moon
                aria-hidden="true"
                className="inline dark:hidden stroke-foreground"
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      </>
    )
  })
)

ThemeSwitcher.displayName = "ThemeSwitcher"

export { ThemeSwitcher }
