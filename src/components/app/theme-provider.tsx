"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

import * as React from "react"

/**
 * ⚡ Bolt: ThemeProvider component optimized with React.memo.
 */
export const ThemeProvider = React.memo(
  ({ children, ...props }: ThemeProviderProps) => {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
  },
)

ThemeProvider.displayName = "ThemeProvider"
