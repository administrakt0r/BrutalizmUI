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

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = STATIC_PAGES.map((page) => ({
    url: root + (page === "/" ? "" : page),
    lastModified: new Date(),
    priority: page === "/" ? 1 : 0.9,
  }))

  const docRoutes = docs.map((doc) => ({
    url:
      root + "/docs" + (doc.slugAsParams === "" ? "" : `/${doc.slugAsParams}`),
    lastModified: new Date(),
    priority: doc.slugAsParams === "" ? 1 : 0.8,
  }))

  // Combine and deduplicate by URL to ensure a clean sitemap
  const allRoutes = [...staticRoutes, ...docRoutes]
  const uniqueRoutes = Array.from(
    new Map(allRoutes.map((route) => [route.url, route])).values(),
  )

  return uniqueRoutes
}
