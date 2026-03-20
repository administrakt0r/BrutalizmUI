import { notFound } from "next/navigation"

import {
  DocPageContent,
  getDocBySlug,
  getDocsStaticParams,
} from "../doc-page-content"

export const dynamic = "force-static"
export const dynamicParams = false

export type DocPageProps = {
  params: Promise<{
    slug: string[]
  }>
}

export async function generateMetadata(props: DocPageProps) {
  const slugAsParams = (await props.params).slug.join("/")
  const doc = getDocBySlug(slugAsParams)
  if (doc == null) return {}
  return {
    title: doc.title,
    description: doc.description,
    keywords: [
      doc.title.toLowerCase(),
      "neobrutalism",
      "brutalizmui documentation",
      "react component",
      "tailwind css 4",
    ],
    alternates: {
      canonical: `/docs/${slugAsParams}`,
    },
  }
}

export async function generateStaticParams(): Promise<
  {
    slug: string[]
  }[]
> {
  return getDocsStaticParams()
}

export default async function DocsSlugPage(props: DocPageProps) {
  const slugAsParams = (await props.params).slug.join("/")
  const doc = getDocBySlug(slugAsParams)
  if (doc == null) notFound()

  return <DocPageContent doc={doc} />
}
