import "@/styling/code.css"

import { docs } from "@docs"
import { ExternalLink } from "lucide-react"

import * as React from "react"

import { MAIN_SIDEBAR } from "@/data/sidebar-links"

import { ErrorBoundary } from "@/components/app/error-boundary"
import { MDXContent, useMDXComponent } from "@/components/app/mdx-components"
import Pagination from "@/components/app/pagination"
import { TableOfContents } from "@/components/app/toc"
import { Badge } from "@/components/ui/badge"

import { isSafeUrl, safeJsonLd } from "@/lib/security"

type Doc = (typeof docs)[number]

// ⚡ Bolt: Create a lookup map for docs by slug to optimize lookups from O(n) to O(1).
const docsBySlug = Object.fromEntries(
  docs.map((doc) => [doc.slugAsParams, doc]),
)

export function getDocBySlug(slugAsParams: string): Doc | null {
  return docsBySlug[slugAsParams] ?? null
}

export function getDocsStaticParams(): { slug: string[] }[] {
  return docs
    .filter((doc) => doc.slugAsParams !== "")
    .map((doc) => ({ slug: doc.slugAsParams.split("/") }))
}

type TOCItem = {
  depth: number
  value: string
  id: string
}

type TOCItemInput = {
  depth: number
  value: string
  id?: string
  children?: TOCItemInput[]
}

function transformTableOfContents(items: TOCItemInput[]): TOCItem[] {
  const flattened: TOCItem[] = []

  items.forEach((item) => {
    if (item.id) {
      flattened.push({
        depth: item.depth,
        value: item.value,
        id: item.id,
      })
    }

    if (item.children) {
      flattened.push(...transformTableOfContents(item.children))
    }
  })

  return flattened
}

// ⚡ Bolt: Pre-filter sidebar links once to avoid repeated filtering on every render.
const FILTERED_SIDEBAR = MAIN_SIDEBAR.filter(
  (item): item is { href: string; text: string } => typeof item === "object",
)

// ⚡ Bolt: Create a lookup map for sidebar items to allow O(1) index lookups.
const SIDEBAR_INDEX_MAP = Object.fromEntries(
  FILTERED_SIDEBAR.map((item, index) => [item.href, index]),
)

export function DocPageContent({ doc }: { doc: Doc }) {
  const { description, title, body, shadcnDocsLink, slugAsParams } = doc

  const href = slugAsParams === "" ? "/docs" : "/docs/" + slugAsParams
  const currentIndex = SIDEBAR_INDEX_MAP[href] ?? -1

  const prevItem = FILTERED_SIDEBAR[currentIndex - 1]
  const nextItem = FILTERED_SIDEBAR[currentIndex + 1]

  // ⚡ Bolt: Use useMDXComponent once to get both the Component and the TOC data
  // to avoid redundant MDX processing.
  const { Component, TableOfContents: rawTableOfContents } =
    useMDXComponent(body)

  // ⚡ Bolt: Memoize the transformed Table of Contents to prevent redundant
  // transformations on every render.
  const tableOfContents = React.useMemo(
    () => transformTableOfContents(rawTableOfContents),
    [rawTableOfContents],
  )

  // ⚡ Bolt: Memoize the paginationProps object to ensure that the memoized
  // Pagination component only re-renders when navigation items actually change.
  const paginationProps = React.useMemo(
    () => ({
      prev: prevItem ? { name: prevItem.text, path: prevItem.href } : undefined,
      next: nextItem ? { name: nextItem.text, path: nextItem.href } : undefined,
    }),
    [prevItem, nextItem],
  )

  const isTocEmpty = tableOfContents.length < 2

  // ⚡ Bolt: Memoize JSON-LD objects to prevent redundant object creation on every render.
  const techArticleJsonLd = React.useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: title,
      description: `Technical documentation for the BrutalizmUI ${title} component. Built with React and Tailwind CSS, this neobrutalism primitive is optimized for accessibility and performance. ${description}`,
      image: "https://brutalizmui.pages.dev/preview.png",
      author: {
        "@type": "Person",
        name: "Samuel Breznjak",
        url: "https://github.com/ekmas",
      },
      publisher: {
        "@type": "Organization",
        name: "BrutalizmUI",
        logo: {
          "@type": "ImageObject",
          url: "https://brutalizmui.pages.dev/favicon.ico",
        },
      },
      url: `https://brutalizmui.pages.dev/docs/${slugAsParams}`,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://brutalizmui.pages.dev/docs/${slugAsParams}`,
      },
      datePublished: "2024-03-01T00:00:00Z",
      dateModified: "2026-03-18T00:00:00Z",
      keywords:
        "neobrutalism, react, tailwind css, shadcn/ui, " + title.toLowerCase(),
      articleSection: "Documentation",
      educationalLevel: "Beginner/Intermediate",
      proficiencyLevel: "Beginner",
    }),
    [title, description, slugAsParams],
  )

  const breadcrumbJsonLd = React.useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://brutalizmui.pages.dev/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Docs",
          item: "https://brutalizmui.pages.dev/docs",
        },
        ...(slugAsParams !== ""
          ? [
              {
                "@type": "ListItem",
                position: 3,
                name: title,
                item: `https://brutalizmui.pages.dev/docs/${slugAsParams}`,
              },
            ]
          : []),
      ],
    }),
    [title, slugAsParams],
  )

  const faqJsonLd = React.useMemo(() => {
    if (slugAsParams === "installation") {
      return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How do I install BrutalizmUI components?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You can install BrutalizmUI components using the shadcn CLI or by manually copying the source code into your project. To use the CLI, run: npx shadcn@latest add https://brutalizmui.pages.dev/r/[component].json",
            },
          },
          {
            "@type": "Question",
            name: "What are the dependencies for BrutalizmUI?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "BrutalizmUI is built with Next.js 16, Tailwind CSS 4, and Radix UI primitives. It also uses lucide-react for icons.",
            },
          },
          {
            "@type": "Question",
            name: "Does BrutalizmUI support CSS Variables?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, BrutalizmUI is architected using CSS variables, allowing for dynamic theme generation and deep customization of the neobrutalism aesthetic.",
            },
          },
        ],
      }
    }
    if (slugAsParams === "") {
      return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is BrutalizmUI?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "BrutalizmUI is an open-source library of neobrutalism-styled React components built with Tailwind CSS and Shadcn/ui.",
            },
          },
          {
            "@type": "Question",
            name: "What is Neobrutalism?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Neobrutalism is a design aesthetic that combines traditional brutalism with modern typography and vibrant color palettes, emphasizing bold borders and high contrast.",
            },
          },
        ],
      }
    }
    return null
  }, [slugAsParams])

  const howToJsonLd = React.useMemo(
    () =>
      slugAsParams === "installation"
        ? {
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to Install BrutalizmUI",
            description:
              "Follow these steps to integrate BrutalizmUI neobrutalism components into your React project.",
            step: [
              {
                "@type": "HowToStep",
                name: "Initialize Shadcn/ui",
                text: "Initialize your project with shadcn/ui by following the official CLI guide.",
                url: "https://ui.shadcn.com/docs/cli#init",
              },
              {
                "@type": "HowToStep",
                name: "Add Neobrutalism Styling",
                text: "Delete existing global styles and paste the desired neobrutalism CSS variables from the BrutalizmUI styling page.",
                url: "https://brutalizmui.pages.dev/styling",
              },
              {
                "@type": "HowToStep",
                name: "Install Components",
                text: "Use the Shadcn CLI to add specific components or copy the source code manually into your project.",
              },
            ],
          }
        : null,
    [slugAsParams],
  )

  return (
    <main
      id="main-content"
      className="docs min-h-[100dvh] w-full bg-background pt-[70px]"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(techArticleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(faqJsonLd) }}
        />
      )}
      {howToJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(howToJsonLd) }}
        />
      )}
      <div className="lg:ml-[250px] xl:mr-[250px] mr-0 ml-0 prose-p:text-foreground prose-p:mt-6 prose-headings:scroll-mt-32 prose-h1:mb-4 prose-ul:pl-5 prose-ul:list-disc prose-li:font-base sm:prose-li:text-base prose-li:text-sm prose-li:mt-2 lg:py-20 sm:py-16 py-12 leading-relaxed prose-h2:mt-10 prose-h2:mb-6 prose-h3:mt-8 prose-headings:font-heading sm:prose-h1:text-3xl prose-h1:text-2xl sm:prose-h2:text-2xl prose-h2:text-xl prose-h3:mb-6 sm:prose-h3:text-xl prose-h3:text-lg prose-p:leading-7 sm:prose-p:text-base prose-p:text-sm prose-p:font-base prose-code:px-[5px] prose-code:py-[3px] prose-a:underline prose-a:font-heading prose-code:rounded-base prose-code:font-bold prose-code:border prose-code:text-main-foreground prose-code:break-normal prose-code:text-sm prose-code:mx-0.5 prose-code:border-border prose-code:bg-main">
        <div className="2xl:max-w-[750px] max-w-[650px] w-full px-5 mx-auto">
          <article>
            <div className="mb-8">
              <h1>{title}</h1>
              {description && (
                <p className="mt-0 mb-4 not-prose sm:text-lg text-base font-base text-foreground">
                  {description}
                </p>
              )}
              {shadcnDocsLink && (
                <a
                  href={isSafeUrl(shadcnDocsLink) ? shadcnDocsLink : "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit official shadcn/ui documentation"
                >
                  <Badge className="gap-2">
                    shadcn/ui docs
                    <ExternalLink aria-hidden="true" />
                  </Badge>
                </a>
              )}
            </div>
            <ErrorBoundary>
              <MDXContent code={body} Component={Component} />
            </ErrorBoundary>

            <div className="mt-14">
              <Pagination {...paginationProps} />
            </div>
          </article>
          {!isTocEmpty && (
            <aside className="fixed bg-secondary-background border-l-4 not-prose border-l-border overflow-hidden top-[70px] xl:flex hidden flex-col justify-between right-0 w-[250px] h-[calc(100svh-70px)] overflow-y-auto">
              <TableOfContents items={tableOfContents} />
            </aside>
          )}
        </div>
      </div>
    </main>
  )
}
