import { CircleAlert } from "lucide-react"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

import { isSafeUrl } from "@/lib/security"
import { cn } from "@/lib/utils"

import {
  MdxTabs,
  MdxTabsContent,
  MdxTabsList,
  MdxTabsTrigger,
} from "./mdx-tabs"
import ShadcnCliCommand from "./shadcn-cli-command"

export type MdxWarningProps = React.ComponentPropsWithoutRef<typeof Alert> & {
  description: string
}

/**
 * ⚡ Bolt: MdxWarning component optimized with React.memo and React.forwardRef.
 */
export const MdxWarning = React.memo(
  React.forwardRef<React.ElementRef<typeof Alert>, MdxWarningProps>(
    ({ description, className, ...props }, ref) => {
      return (
        <Alert
          ref={ref}
          data-slot="mdx-warning"
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
      )
    },
  ),
)
MdxWarning.displayName = "MdxWarning"

export type MdxLinkProps = React.ComponentPropsWithoutRef<typeof Link>

/**
 * ⚡ Bolt: MdxLink component optimized with React.memo and React.forwardRef.
 */
export const MdxLink = React.memo(
  React.forwardRef<React.ElementRef<typeof Link>, MdxLinkProps>(
    ({ href, ...props }, ref) => {
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
          ref={ref}
          data-slot="mdx-link"
          {...props}
          href={safeHref}
          rel={rel}
          target={isBlank ? "_blank" : props.target}
        />
      )
    },
  ),
)
MdxLink.displayName = "MdxLink"

export type MdxAProps = React.ComponentPropsWithoutRef<"a">

/**
 * ⚡ Bolt: MdxA component optimized with React.memo and React.forwardRef.
 */
export const MdxA = React.memo(
  React.forwardRef<HTMLAnchorElement, MdxAProps>(({ href, ...props }, ref) => {
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
        ref={ref}
        data-slot="mdx-a"
        {...props}
        href={safeHref}
        rel={rel}
        target={isBlank ? "_blank" : props.target}
      />
    )
  }),
)
MdxA.displayName = "MdxA"

export type MdxImgProps = Omit<
  React.ComponentPropsWithoutRef<typeof Image>,
  "src"
> & {
  src?: string
  priority?: boolean
}

/**
 * ⚡ Bolt: MdxImg component optimized with React.memo and React.forwardRef.
 */
export const MdxImg = React.memo(
  React.forwardRef<React.ElementRef<typeof Image>, MdxImgProps>(
    ({ src, alt, className, priority, ...props }, ref) => {
      const safeSrc =
        src && (isSafeUrl(src) || src.startsWith("data:image/"))
          ? src
          : undefined

      if (!safeSrc) return null

      const isExternal = safeSrc.startsWith("http") || safeSrc.startsWith("//")

      return (
        <Image
          ref={ref}
          data-slot="mdx-img"
          src={safeSrc}
          alt={alt || "Image"}
          width={1200}
          height={630}
          priority={priority}
          unoptimized={isExternal}
          className={cn("rounded-md border h-auto w-full", className)}
          {...props}
        />
      )
    },
  ),
)
MdxImg.displayName = "MdxImg"

export type MdxInstallationProps = {
  children: React.ReactNode
  component: string
}

/**
 * ⚡ Bolt: MdxInstallation component optimized with React.memo.
 */
export const MdxInstallation = React.memo(
  ({ children, component }: MdxInstallationProps) => {
    return (
      <MdxTabs
        data-slot="mdx-installation"
        defaultValue="cli"
        className="w-full"
      >
        <MdxTabsList className="grid w-full grid-cols-2 border-b-0">
          <MdxTabsTrigger value="cli">Shadcn CLI</MdxTabsTrigger>
          <MdxTabsTrigger value="manual">Manual</MdxTabsTrigger>
        </MdxTabsList>
        <MdxTabsContent value="cli">
          <ShadcnCliCommand component={component} />
        </MdxTabsContent>
        <MdxTabsContent value="manual">{children}</MdxTabsContent>
      </MdxTabs>
    )
  },
)
MdxInstallation.displayName = "MdxInstallation"
