import { docs } from "@docs"

import { MetadataRoute } from "next"

const root = "https://brutalizmui.pages.dev"

const STATIC_PAGES = [
  "/",
  "/templates",
  "/showcase",
  "/stars",
  "/styling",
  "/charts",
]

/**
 * Generates the `sitemap.xml` file dynamically at build time.
 * Includes all statically defined core pages and dynamically mapped documentation pages.
 *
 * Performance and SEO optimization strategy:
 * - Uses a hardcoded `lastModified` date to prevent unnecessary crawling of unchanged pages.
 * - Deduplicates routes to ensure the XML is compact and cleanly parsed.
 *
 * @returns {MetadataRoute.Sitemap} The array of URLs mapping the static site's core structure.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // Use a stable date for static and doc routes to prevent unnecessary crawler re-processing
  // when content hasn't changed. Update this date when major library updates occur.
  const lastModified = new Date("2026-03-18")

  const staticRoutes = STATIC_PAGES.map((page) => ({
    url: root + (page === "/" ? "" : page),
    lastModified,
    priority: page === "/" ? 1 : 0.9,
  }))

  const docRoutes = docs.map((doc) => ({
    url:
      root + "/docs" + (doc.slugAsParams === "" ? "" : `/${doc.slugAsParams}`),
    lastModified,
    priority: doc.slugAsParams === "" ? 1 : 0.8,
  }))

  // Combine and deduplicate by URL to ensure a clean sitemap
  const allRoutes = [...staticRoutes, ...docRoutes]
  const uniqueRoutes = Array.from(
    new Map(allRoutes.map((route) => [route.url, route])).values(),
  )

  return uniqueRoutes
}
