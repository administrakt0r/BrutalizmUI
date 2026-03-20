"use client"

import * as React from "react"
import { usePathname } from "next/navigation"

/**
 * ⚡ Bolt: ScrollToTop component optimized with React.memo.
 * It ensures the page scrolls to the top on every route transition.
 */
export const ScrollToTop = React.memo(() => {
  const pathname = usePathname()

  React.useEffect(() => {
    window.scroll(0, 0)
  }, [pathname])

  return null
})

ScrollToTop.displayName = "ScrollToTop"
