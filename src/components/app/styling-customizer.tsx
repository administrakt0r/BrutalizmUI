"use client"

import { CheckCircle2Icon } from "lucide-react"

import * as React from "react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const previewStyling = [
  {
    name: "sunset",
    main: "bg-[#F97316] dark:bg-[#FB923C]",
    bg: "bg-[#FFF1DC] dark:bg-[#2E1D14]",
    rounded: "rounded-[5px]!",
    shadow: "shadow-[4px_4px_0_0_rgba(0,0,0,1)]!",
    boxShadow: "4px 4px 0 0 rgba(0,0,0,1)",
  },
  {
    name: "green",
    main: "bg-[#05E17A] dark:bg-[#1EFA94]",
    bg: "bg-[#DEFCE9] dark:bg-[#0E2016]",
    rounded: "rounded-[15px]!",
    shadow: "shadow-[0_4px_0_0_rgba(0,0,0,1)]!",
    boxShadow: "0 4px 0 0 rgba(0,0,0,1)",
  },
  {
    name: "orange",
    main: "bg-[#FF7A05] dark:bg-[#FF871F]",
    bg: "bg-[#FFEDD6] dark:bg-[#322215]",
    rounded: "rounded-[10px]!",
    shadow: "shadow-[-4px_-4px_0_0_rgba(0,0,0,1)]!",
    boxShadow: "-4px -4px 0 0 rgba(0,0,0,1)",
  },
  {
    name: "violet",
    main: "bg-[#A985FF] dark:bg-[#A985FF]",
    bg: "bg-[#EEE6FE] dark:bg-[#332352]",
    rounded: "rounded-none!",
    shadow: "shadow-[4px_-4px_0_0_rgba(0,0,0,1)]!",
    boxShadow: "4px -4px 0 0 rgba(0,0,0,1)",
  },
  {
    name: "coral",
    main: "bg-[#FF6B6B] dark:bg-[#FF7F7F]",
    bg: "bg-[#FFE7DF] dark:bg-[#2F1E1A]",
    rounded: "rounded-[8px]!",
    shadow: "shadow-[4px_0_0_0_rgba(0,0,0,1)]!",
    boxShadow: "4px 0 0 0 rgba(0,0,0,1)",
  },
  {
    name: "forest",
    main: "bg-[#16A34A] dark:bg-[#22C55E]",
    bg: "bg-[#E6F9ED] dark:bg-[#14251A]",
    rounded: "rounded-[12px]!",
    shadow: "shadow-[0_4px_0_0_rgba(0,0,0,1)]!",
    boxShadow: "0 4px 0 0 rgba(0,0,0,1)",
  },
]

type StylingItem = (typeof previewStyling)[number]

const StylingButton = React.memo(
  ({
    color,
    onClick,
  }: {
    color: StylingItem
    onClick: (item: StylingItem) => void
  }) => {
    return (
      <Button
        className={`h-full border-2 border-border md:text-xl sm:text-sm text-xs sm:px-4 px-2 ${color.main}`}
        onClick={() => onClick(color)}
      >
        try {color.name}
      </Button>
    )
  },
)

StylingButton.displayName = "StylingButton"

export default function StylingCustomizer() {
  const [{ main, bg, rounded, boxShadow }, setStyling] = React.useState(
    previewStyling[0],
  )

  const handleSetStyling = React.useCallback((styling: StylingItem) => {
    setStyling(styling)
  }, [])

  return (
    <div className="mx-auto max-w-[800px] w-full mt-20 sm:px-5 px-0">
      <div className="grid md:gap-10 gap-5">
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-2 gap-4 sm:w-full w-2/3 mx-auto">
          {previewStyling.map((color) => (
            <StylingButton
              key={color.name}
              color={color}
              onClick={handleSetStyling}
            />
          ))}
        </div>
        <div
          className={`${bg} sm:border-x-2 border-x-0 border-y-2 sm:shadow-shadow shadow-none flex flex-col justify-between sm:p-8 p-4 border-border h-[350px] bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:30px_30px] ${bg}`}
        >
          <Alert
            style={{
              boxShadow,
            }}
            className={`${main} ${rounded} transition-all duration-200`}
          >
            <CheckCircle2Icon />
            <AlertTitle>Success! Your changes have been saved</AlertTitle>
            <AlertDescription>
              This is an alert with icon, title and description.
            </AlertDescription>
          </Alert>

          <Accordion type="single" defaultValue="item-1">
            <AccordionItem
              style={{
                boxShadow,
              }}
              className={`${rounded} transition-all duration-200`}
              value="item-1"
            >
              <AccordionTrigger className={`${main}`}>
                Is it accessible?
              </AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="flex items-center justify-between gap-2">
            <Button
              style={{
                boxShadow,
              }}
              className={`${main} ${rounded} transition-all duration-200 pointer-events-none`}
              size="sm"
            >
              Button
            </Button>
            <Button
              variant="noShadow"
              className={`${main} ${rounded} transition-all duration-200`}
              size="sm"
            >
              Button
            </Button>
            <Badge
              className={`${main} ${rounded} transition-all hidden md:block duration-200`}
            >
              Badge
            </Badge>

            <div className="hidden sm:block">
              <Select>
                <SelectTrigger
                  className={`${main} ${rounded} w-[180px] transition-all duration-200`}
                >
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent
                  className={`${main} ${rounded} transition-all duration-200`}
                >
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem className={`${rounded}`} value="apple">
                      Apple
                    </SelectItem>
                    <SelectItem className={`${rounded}`} value="banana">
                      Banana
                    </SelectItem>
                    <SelectItem className={`${rounded}`} value="blueberry">
                      Blueberry
                    </SelectItem>
                    <SelectItem className={`${rounded}`} value="grapes">
                      Grapes
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
