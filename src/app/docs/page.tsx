import { notFound } from "next/navigation"

import { DocPageContent, getDocBySlug } from "./doc-page-content"

export const dynamic = "force-static"

export async function generateMetadata() {
  const doc = getDocBySlug("")
  if (doc == null) return {}
  return {
    title: doc.title,
    description: doc.description,
    alternates: {
      canonical: "/docs",
    },
  }
}

export default function DocsIndexPage() {
  const doc = getDocBySlug("")
  if (doc == null) notFound()

  return <DocPageContent doc={doc} />
}
