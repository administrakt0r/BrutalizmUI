import { Metadata } from "next"

import SHOWCASE from "@/data/showcase"

import { ErrorBoundary } from "@/components/app/error-boundary"
import {
  PageDescription,
  PageHeader,
  PageHeading,
  PageWrapper,
} from "@/components/app/page"
import ShowcaseContainer from "@/components/app/showcase-container"

import { safeJsonLd } from "@/lib/security"

export const metadata: Metadata = {
  title: "Showcase",
  description: "Showcase of websites built with BrutalizmUI.",
  alternates: {
    canonical: "/showcase",
  },
}

const collectionPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Showcase - BrutalizmUI",
  description: "Showcase of websites built with BrutalizmUI.",
  url: "https://brutalizmui.pages.dev/showcase",
  dateModified: "2026-03-18T00:00:00Z",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: SHOWCASE.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.title,
      url: item.liveUrl,
    })),
  },
}

// ⚡ Bolt: Pre-calculate sanitized JSON-LD strings at the module level to eliminate
// redundant stringification and regex replacements during every React render cycle.
const collectionPageJsonLdStr = safeJsonLd(collectionPageJsonLd)

export default function Page() {
  return (
    <PageWrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: collectionPageJsonLdStr }}
      />
      <PageHeader>
        <PageHeading>Showcase</PageHeading>

        <PageDescription>
          BrutalizmUI Showcase features a curated collection of 22+ community
          websites and applications built using our neobrutalism component
          library. Discover how developers leverage high-contrast React
          components and Tailwind CSS to create bold, accessible, and
          performance-optimized user interfaces.
          <br />
          If you&apos;ve built something and want to get it featured here,{" "}
          <a
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Direct message Samuel Breznjak on X (Twitter)"
            href="https://x.com/samuelbreznjak"
          >
            dm me
          </a>{" "}
          or{" "}
          <a
            className="underline"
            href="mailto:samuelbreznjak35@gmail.com"
            aria-label="Send an email to Samuel Breznjak"
          >
            email me
          </a>
          .{" "}
        </PageDescription>
      </PageHeader>

      <ErrorBoundary>
        <ShowcaseContainer items={SHOWCASE} />
      </ErrorBoundary>
    </PageWrapper>
  )
}
