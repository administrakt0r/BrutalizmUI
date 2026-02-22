import { ArrowLeft, ArrowRight } from "lucide-react"

import Link from "next/link"

import { Button } from "@/components/ui/button"

type Props = {
  prev?: {
    name: string
    path: string
  }
  next?: {
    name: string
    path: string
  }
}

export default function Pagination({ prev, next }: Props) {
  let justifyContent

  if (prev && next) {
    justifyContent = "justify-between"
  } else if (prev) {
    justifyContent = "justify-start"
  } else if (next) {
    justifyContent = "justify-end"
  }

  return (
    <div className={`${justifyContent} flex w-full items-center`}>
      {prev?.name && (
        <Link href={prev.path} aria-label={`Previous page: ${prev.name}`}>
          <Button className="sm:px-5 px-3.5 py-2 h-[unset] sm:text-sm text-xs">
            <ArrowLeft aria-hidden="true" />
            {prev.name}
          </Button>
        </Link>
      )}

      {next?.name && (
        <Link href={next.path} aria-label={`Next page: ${next.name}`}>
          <Button className="sm:px-5 px-3.5 py-2 h-[unset] sm:text-sm text-xs">
            {next.name}
            <ArrowRight aria-hidden="true" />
          </Button>
        </Link>
      )}
    </div>
  )
}
