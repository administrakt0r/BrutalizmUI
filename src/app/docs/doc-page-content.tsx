import "@/styling/code.css"

import { docs } from "@docs"
import { ExternalLink } from "lucide-react"

import { MAIN_SIDEBAR } from "@/data/sidebar-links"

import { ErrorBoundary } from "@/components/app/error-boundary"
import { MDXContent, MDXTableOfContents } from "@/components/app/mdx-components"
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

interface TOCItem {
  depth: number
  value: string
  id: string
}

interface TOCItemInput {
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

  const rawTableOfContents = MDXTableOfContents({ code: body })
  const tableOfContents = transformTableOfContents(rawTableOfContents)

  const paginationProps = {
    prev: prevItem ? { name: prevItem.text, path: prevItem.href } : undefined,
    next: nextItem ? { name: nextItem.text, path: nextItem.href } : undefined,
  }

  const isTocEmpty = tableOfContents.length < 2

  const techArticleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: title,
    description: description,
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
  }

  const breadcrumbJsonLd = {
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
  }

  const faqJsonLd =
    slugAsParams === "installation"
      ? {
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
                text: "BrutalizmUI is built with Next.js 15, Tailwind CSS 4, and Radix UI primitives. It also uses lucide-react for icons.",
              },
            },
          ],
        }
      : null

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
                >
                  <Badge className="gap-2">
                    shadcn/ui docs
                    <ExternalLink />
                  </Badge>
                </a>
              )}
            </div>
            <ErrorBoundary>
              <MDXContent code={body} />
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
