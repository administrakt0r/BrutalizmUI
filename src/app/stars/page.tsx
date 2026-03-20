import { Metadata } from "next"
import Link from "next/link"

import {
  PageDescription,
  PageHeader,
  PageHeading,
  PageWrapper,
} from "@/components/app/page"

import { safeJsonLd } from "@/lib/security"

import StarsGrid from "./stars-grid"

export const metadata: Metadata = {
  title: "Stars",
  description:
    "Explore 40 geometrical neobrutalism shapes and SVG stars for your React and Tailwind CSS projects.",
  alternates: {
    canonical: "/stars",
  },
}

const collectionPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Stars - BrutalizmUI",
  description:
    "Explore 40+ geometrical neobrutalism shapes and SVG stars available as React components for Tailwind CSS 4.",
  url: "https://brutalizmui.pages.dev/stars",
  image: "https://brutalizmui.pages.dev/preview.png",
  publisher: {
    "@type": "Organization",
    name: "BrutalizmUI",
    logo: {
      "@type": "ImageObject",
      url: "https://brutalizmui.pages.dev/favicon.ico",
    },
  },
  dateModified: "2026-03-18T00:00:00Z",
  mainEntity: {
    "@type": "ItemList",
    name: "BrutalizmUI Stars Collection",
    itemListElement: Array.from({ length: 40 }).map((_, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `Star ${i + 1}`,
      url: `https://brutalizmui.pages.dev/docs/stars`,
    })),
  },
  breadcrumb: {
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
        name: "Stars",
        item: "https://brutalizmui.pages.dev/stars",
      },
    ],
  },
}

export default function Page() {
  return (
    <PageWrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(collectionPageJsonLd) }}
      />
      <PageHeader>
        <PageHeading>Stars</PageHeading>

        <PageDescription>
          BrutalizmUI Stars is a collection of 40+ geometrical neobrutalism
          shapes available as React components for Tailwind CSS 4. These
          decorative SVG stars, crosses, and symbols are purpose-built for
          high-contrast neobrutalist layouts. Each shape is fully customizable
          and integrated with the shadcn CLI for rapid development. Check the{" "}
          <Link className="underline" href="/docs/stars">
            installation guide
          </Link>{" "}
          to start using them.
        </PageDescription>
      </PageHeader>
      <StarsGrid />
    </PageWrapper>
  )
}
