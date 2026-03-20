import { Metadata } from "next"
import dynamic from "next/dynamic"

import { ErrorBoundary } from "@/components/app/error-boundary"
import {
  PageDescription,
  PageHeader,
  PageHeading,
  PageWrapper,
} from "@/components/app/page"

import { safeJsonLd } from "@/lib/security"

const ExampleComponents = dynamic(() => import("./example-components"))
const Styling = dynamic(() => import("./styling"))

export const metadata: Metadata = {
  title: "Styling",
  description:
    "Learn how to fully customize and generate neobrutalism themes for your React projects using BrutalizmUI.",
  alternates: {
    canonical: "/styling",
  },
}

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Styling - BrutalizmUI",
  description:
    "Customize and generate neobrutalism themes for your React projects.",
  url: "https://brutalizmui.pages.dev/styling",
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
        name: "Styling",
        item: "https://brutalizmui.pages.dev/styling",
      },
    ],
  },
}

export default function Page() {
  return (
    <PageWrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(webPageJsonLd) }}
      />
      <PageHeader>
        <PageHeading>Styling</PageHeading>

        <PageDescription>
          BrutalizmUI Styling is a high-performance theme generator for Next.js
          16 and Tailwind CSS 4, designed to give you full control over the
          neobrutalism aesthetic. By leveraging native CSS variables, our
          styling system allows you to dynamically customize high-contrast color
          schemes, border-radius, and hard-shadow offsets. This &quot;Direct Answer&quot;
          to customization ensures that your design system remains lightweight,
          performant, and perfectly aligned with the copy-paste ownership model.
        </PageDescription>

        <ErrorBoundary>
          <Styling />
        </ErrorBoundary>

        <ErrorBoundary>
          <ExampleComponents />
        </ErrorBoundary>
      </PageHeader>
    </PageWrapper>
  )
}
