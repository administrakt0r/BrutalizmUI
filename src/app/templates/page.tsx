import { Metadata } from "next"

import TEMPLATES from "@/data/templates"

import {
  PageDescription,
  PageHeader,
  PageHeading,
  PageWrapper,
} from "@/components/app/page"
import ShowcaseContainer from "@/components/app/showcase-container"

import { safeJsonLd } from "@/lib/security"

export const metadata: Metadata = {
  title: "Templates",
  description:
    "Get started with free, open-source neobrutalism templates and page layouts for React and Tailwind CSS.",
  alternates: {
    canonical: "/templates",
  },
}

const collectionPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Templates - BrutalizmUI",
  description: "Free and open source neobrutalism styled Tailwind templates.",
  url: "https://brutalizmui.pages.dev/templates",
  dateModified: "2026-03-18T00:00:00Z",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: TEMPLATES.map((item, index) => ({
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
        <PageHeading>Templates</PageHeading>

        <PageDescription>
          BrutalizmUI Templates is a collection of 4+ free, open-source
          neobrutalism page layouts designed for React and Tailwind CSS. These
          pre-built templates provide a high-contrast starting point for your
          next project, featuring fully customizable components and optimized
          for high-performance accessibility and speed.
        </PageDescription>
      </PageHeader>

      <ShowcaseContainer items={TEMPLATES} />
    </PageWrapper>
  )
}
