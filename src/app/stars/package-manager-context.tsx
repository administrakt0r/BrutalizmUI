"use client"

import React, { createContext, useContext } from "react"

const PackageManagerContext = createContext<string | undefined>(undefined)

export function PackageManagerProvider({
  value,
  children,
}: {
  value: string
  children: React.ReactNode
}) {
  return (
    <PackageManagerContext.Provider value={value}>
      {children}
    </PackageManagerContext.Provider>
  )
}

export function usePackageManager() {
  const context = useContext(PackageManagerContext)
  if (context === undefined) {
    throw new Error(
      "usePackageManager must be used within a PackageManagerProvider",
    )
  }
  return context
}
