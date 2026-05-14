import { Metadata } from "next"
import Link from "next/link"

import {
  PageDescription,
  PageHeader,
  PageHeading,
  PageWrapper,
} from "@/components/app/page"

import { safeJsonLd } from "@/lib/security"

import Examples from "./examples"

export const metadata: Metadata = {
  title: "Charts",
  description:
    "Discover beautiful, high-contrast neobrutalism charts built with Recharts and Tailwind CSS.",
  alternates: {
    canonical: "/charts",
  },
}

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Charts - BrutalizmUI",
  description:
    "Beautiful neobrutalism charts built using Recharts and Tailwind CSS.",
  url: "https://brutalizmui.pages.dev/charts",
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
        name: "Charts",
        item: "https://brutalizmui.pages.dev/charts",
      },
    ],
  },
}

// ⚡ Bolt: Pre-calculate sanitized JSON-LD strings at the module level.
const webPageJsonLdStr = safeJsonLd(webPageJsonLd)

export default function Page() {
  return (
    <PageWrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: webPageJsonLdStr }}
      />
      <PageHeader>
        <PageHeading>Charts</PageHeading>

        <PageDescription>
          BrutalizmUI Charts is a high-performance collection of neobrutalism
          data visualization components built with Recharts and Tailwind CSS 4.
          These accessible React 19 charts support Area, Bar, Line,
          and Pie configurations with full dark mode support and responsive
          layouts. Visit{" "}
          <Link className="underline" href="/docs/chart">
            charts docs
          </Link>{" "}
          for technical specifications and installation guides.
        </PageDescription>
      </PageHeader>

      <Examples />
    </PageWrapper>
  )
}
