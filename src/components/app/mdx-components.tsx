import { Toc } from "@stefanprobst/rehype-extract-toc"

import * as React from "react"
import * as runtime from "react/jsx-runtime"
import dynamic from "next/dynamic"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  MdxA,
  MdxImg,
  MdxInstallation,
  MdxLink,
  MdxWarning,
} from "./mdx-elements"
import {
  MdxTabs,
  MdxTabsContent,
  MdxTabsList,
  MdxTabsTrigger,
} from "./mdx-tabs"
import { Pre } from "./pre"
import ShadcnCliCommand from "./shadcn-cli-command"

// ⚡ Bolt: Use dynamic import for ComponentPreview to break the static dependency
// chain from the main bundle to the 50+ component examples.
const ComponentPreview = dynamic(() => import("./component-preview"))

export const sharedComponents = {
  Tabs: MdxTabs,
  TabsList: MdxTabsList,
  TabsTrigger: MdxTabsTrigger,
  TabsContent: MdxTabsContent,
  Warning: MdxWarning,
  Link: MdxLink,
  a: MdxA,
  img: MdxImg,
  pre: Pre,
  ShadcnCliCommand,
  ComponentPreview,
  Installation: MdxInstallation,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
}

// ⚡ Bolt: Global cache for evaluated MDX components to avoid expensive re-evaluation.
const mdxCache = new Map<
  string,
  { Component: React.ComponentType<any>; TableOfContents: Toc }
>()
const MAX_CACHE_SIZE = 100

// ⚡ Bolt: Export useMDXComponent so it can be reused in page components.
// Optimized to only call the MDX function once and cache the result.
export const useMDXComponent = (code: string) => {
  return React.useMemo(() => {
    if (!code)
      return { Component: () => null, TableOfContents: [] as unknown as Toc }

    // ⚡ Bolt: Check global cache first.
    if (mdxCache.has(code)) {
      return mdxCache.get(code)!
    }

    const exports = new Function(code)({ ...runtime })
    const result = {
      Component: exports.default,
      TableOfContents: exports.toc as Toc,
    }

    // ⚡ Bolt: Store result in cache with eviction logic.
    if (mdxCache.size >= MAX_CACHE_SIZE) {
      const firstKey = mdxCache.keys().next().value
      if (firstKey !== undefined) mdxCache.delete(firstKey)
    }
    mdxCache.set(code, result)

    return result
  }, [code])
}

type MDXProps = {
  code: string
  components?: Record<string, React.ComponentType>
  Component?: React.ComponentType<{
    components: Record<string, React.ComponentType>
  }>
}

export const MDXContent = React.memo(
  ({ code, components, Component: ProvidedComponent }: MDXProps) => {
    // ⚡ Bolt: Use ProvidedComponent if available, otherwise call useMDXComponent.
    const { Component: InternalComponent } = useMDXComponent(
      ProvidedComponent ? "" : code,
    )
    const Component = ProvidedComponent || InternalComponent

    // ⚡ Bolt: Memoize components object to prevent unnecessary re-renders
    // of the MDX component tree when the parent re-renders.
    // Optimized to return the stable sharedComponents object directly if no overrides.
    const combinedComponents = React.useMemo(() => {
      if (!components || Object.keys(components).length === 0) {
        return sharedComponents
      }
      return { ...sharedComponents, ...components }
    }, [components])

    return <Component components={combinedComponents} />
  },
)

MDXContent.displayName = "MDXContent"

export function MDXTableOfContents({ code }: { code: string }) {
  const { TableOfContents } = useMDXComponent(code)

  return TableOfContents
}

MDXTableOfContents.displayName = "MDXTableOfContents"
