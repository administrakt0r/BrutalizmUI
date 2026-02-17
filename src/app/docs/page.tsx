import { notFound } from "next/navigation"

import { DocPageContent, getDocBySlug } from "./doc-page-content"

export const dynamic = "force-static"

export async function generateMetadata() {
  const doc = getDocBySlug("")
  if (doc == null) return {}
  return { title: doc.title, description: doc.description }
}

export default function DocsIndexPage() {
  const doc = getDocBySlug("")
  if (doc == null) notFound()

  return <DocPageContent doc={doc} />
}
