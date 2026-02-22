import { Toc } from "@stefanprobst/rehype-extract-toc"
import { CircleAlert } from "lucide-react"

import { useMemo } from "react"
import * as runtime from "react/jsx-runtime"
import dynamic from "next/dynamic"
import Link from "next/link"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { isSafeUrl } from "@/lib/security"
import { cn } from "@/lib/utils"

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
  Warning: ({
    description,
    className,
    ...props
  }: React.ComponentProps<typeof Alert> & { description: string }) => (
    <Alert
      className={cn(
        "not-prose sm:has-[>svg]:gap-x-4 has-[>svg]:gap-x-3 sm:gap-y-2.5 gap-y-1.5 sm:[&>svg]:size-5 [&>svg]:size-4",
        className,
      )}
      {...props}
    >
      <CircleAlert />
      <AlertTitle className="sm:text-lg sm:leading-5">Warning</AlertTitle>
      <AlertDescription className="sm:text-base">
        {description}
      </AlertDescription>
    </Alert>
  ),
  Link: ({ href, ...props }: React.ComponentProps<typeof Link>) => {
    const safeHref = isSafeUrl(href.toString()) ? href : "#"
    const isExternal =
      href.toString().startsWith("http") || href.toString().startsWith("//")
    const isBlank = props.target === "_blank" || isExternal

    let rel = props.rel
    if (isBlank) {
      const rels = props.rel ? props.rel.split(" ") : []
      if (!rels.includes("noopener")) rels.push("noopener")
      if (isExternal && !rels.includes("noreferrer")) rels.push("noreferrer")
      rel = rels.join(" ")
    }

    return (
      <Link
        {...props}
        href={safeHref}
        rel={rel}
        target={isBlank ? "_blank" : props.target}
      />
    )
  },
  a: ({ href, ...props }: React.ComponentProps<"a">) => {
    const safeHref = href && isSafeUrl(href) ? href : "#"
    const isExternal = href?.startsWith("http") || href?.startsWith("//")
    const isBlank = props.target === "_blank" || isExternal

    let rel = props.rel
    if (isBlank) {
      const rels = props.rel ? props.rel.split(" ") : []
      if (!rels.includes("noopener")) rels.push("noopener")
      if (isExternal && !rels.includes("noreferrer")) rels.push("noreferrer")
      rel = rels.join(" ")
    }

    return (
      <a
        {...props}
        href={safeHref}
        rel={rel}
        target={isBlank ? "_blank" : props.target}
      />
    )
  },
  img: (props: React.ComponentProps<"img">) => {
    const safeSrc =
      props.src && (isSafeUrl(props.src) || props.src.startsWith("data:image/"))
        ? props.src
        : undefined

    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        {...props}
        src={safeSrc}
        className={cn("rounded-md border", props.className)}
        alt={props.alt || "Image"}
      />
    )
  },
  pre: Pre,
  ShadcnCliCommand,
  ComponentPreview,
  Installation: ({
    children,
    component,
  }: {
    children: React.ReactNode
    component: string
  }) => (
    <sharedComponents.Tabs defaultValue="cli" className="w-full">
      <sharedComponents.TabsList className="grid w-full grid-cols-2 border-b-0">
        <sharedComponents.TabsTrigger value="cli">
          Shadcn CLI
        </sharedComponents.TabsTrigger>
        <sharedComponents.TabsTrigger value="manual">
          Manual
        </sharedComponents.TabsTrigger>
      </sharedComponents.TabsList>
      <sharedComponents.TabsContent value="cli">
        <ShadcnCliCommand component={component} />
      </sharedComponents.TabsContent>
      <sharedComponents.TabsContent value="manual">
        {children}
      </sharedComponents.TabsContent>
    </sharedComponents.Tabs>
  ),
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
}

const useMDXComponent = (code: string) => {
  return useMemo(() => {
    const fn = new Function(code)
    return {
      Component: fn({ ...runtime }).default,
      TableOfContents: fn({ ...runtime }).toc as Toc,
    }
  }, [code])
}

interface MDXProps {
  code: string
  components?: Record<string, React.ComponentType>
}

export const MDXContent = ({ code, components }: MDXProps) => {
  const { Component } = useMDXComponent(code)

  // ⚡ Bolt: Memoize components object to prevent unnecessary re-renders
  // of the MDX component tree when the parent re-renders.
  const combinedComponents = useMemo(
    () => ({ ...sharedComponents, ...components }),
    [components],
  )

  return <Component components={combinedComponents} />
}

export function MDXTableOfContents({ code }: { code: string }) {
  const { TableOfContents } = useMDXComponent(code)

  return TableOfContents
}
