"use client"

import { COMPONENTS_MAP } from "@/data/components"
import { STARS_EXAMPLES } from "@/data/stars"

import { cn } from "@/lib/utils"

import {
  MdxTabs,
  MdxTabsContent,
  MdxTabsList,
  MdxTabsTrigger,
} from "./mdx-tabs"

export interface ComponentPreviewProps {
  component: string
  children: React.ReactNode
  example?: string
  type?: "star" | "component"
  wrapperClassName?: string
}

export default function ComponentPreview({
  component,
  children,
  example,
  type = "component",
  wrapperClassName,
}: ComponentPreviewProps) {
  let ExampleComponent: React.ComponentType | undefined

  if (type === "star") {
    const starData = STARS_EXAMPLES[component as keyof typeof STARS_EXAMPLES]
    if (!starData) return null

    ExampleComponent = starData
  } else {
    const componentData = COMPONENTS_MAP[component]

    if (!componentData) return null

    if (type === "component") {
      ExampleComponent = example
        ? componentData.examples?.[example]
        : componentData.exampleComponent
    }
  }

  if (!ExampleComponent) return null

  return (
    <>
      <MdxTabs defaultValue="preview" className="w-full">
        <MdxTabsList className="grid w-full border-b-0 grid-cols-2">
          <MdxTabsTrigger value="preview">Preview</MdxTabsTrigger>
          <MdxTabsTrigger value="code">Code</MdxTabsTrigger>
        </MdxTabsList>
        <MdxTabsContent value="preview">
          <div
            className={cn(
              "not-prose flex w-full items-center justify-center z-15 relative border-2 mb-5 min-h-[200px] border-border bg-[15px_20px] bg-[linear-gradient(to_right,#8080804D_1px,transparent_1px),linear-gradient(to_bottom,#80808090_1px,transparent_1px)] sm:px-10 px-5 sm:py-20 py-10 shadow-shadow [background-size:40px_40px]",
              wrapperClassName,
              "bg-secondary-background",
            )}
          >
            <ExampleComponent />
          </div>
        </MdxTabsContent>
        <MdxTabsContent value="code">{children}</MdxTabsContent>
      </MdxTabs>
    </>
  )
}

ComponentPreview.displayName = "ComponentPreview"
