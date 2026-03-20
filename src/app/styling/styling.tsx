"use client"

import { toast } from "sonner"

import * as React from "react"
import dynamic from "next/dynamic"

import colors from "@/data/colors"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { sanitizeColor, sanitizeCSSVariable } from "@/lib/security"
import { cn, setCSSVariable } from "@/lib/utils"

// ⚡ Bolt: Define the structure for color palette to ensure type safety.
export type ColorPalette = {
  name: string
  main: string
  darkMain: string
  bg: string
  darkBg: string
  chart1: string
  chart2: string
  chart3: string
  chart4: string
  chart5: string
  darkChart1: string
  darkChart2: string
  darkChart3: string
  darkChart4: string
  darkChart5: string
}

// ⚡ Bolt: Create a lookup map for colors by name to optimize lookups from O(n) to O(1).
const colorsByName = Object.fromEntries(
  colors.map((color) => [color.name, color as ColorPalette]),
)

const LazyPre = dynamic(() =>
  import("@/components/app/pre").then((mod) => mod.Pre),
)

const defaultColorPalette =
  colorsByName["sunset"] ?? (colors[0] as ColorPalette)

// ⚡ Bolt: Hoist static property validation arrays for color palette.
const ALLOWED_COLOR_KEYS = [
  "name",
  "main",
  "darkMain",
  "bg",
  "darkBg",
  "chart1",
  "chart2",
  "chart3",
  "chart4",
  "chart5",
  "darkChart1",
  "darkChart2",
  "darkChart3",
  "darkChart4",
  "darkChart5",
]
const BLOCKED_PROTO_KEYS = [
  "__proto__",
  "constructor",
  "prototype",
  "__definegetter__",
  "__definesetter__",
  "__lookupgetter__",
  "__lookupsetter__",
]

// ⚡ Bolt: Define module-level constants for localStorage keys.
const STORAGE_KEY_COLOR = "color"
const STORAGE_KEY_RADIUS = "borderRadius"
const STORAGE_KEY_SHADOW = "boxShadow"
const STORAGE_KEY_FONT_WEIGHT = "fontWeight"

// ⚡ Bolt: Define static options outside the component to prevent re-creation.
const BORDER_RADIUS_OPTIONS = [0, 5, 10, 15]
const HORIZONTAL_BOX_SHADOW_OPTIONS = [-4, -2, 0, 2, 4]
const VERTICAL_BOX_SHADOW_OPTIONS = [-4, -2, 0, 2, 4]
const HEADING_FONT_WEIGHT_OPTIONS = [700, 800, 900]
const BASE_FONT_WEIGHT_OPTIONS = [500, 600, 700]

type SectionProps = {
  label: string
  id: string
}

/**
 * ⚡ Bolt: Memoized sub-component for the Color selection section.
 */
const ColorSection = React.memo(
  ({
    value,
    onValueChange,
  }: {
    value: string
    onValueChange: (v: string) => void
  }) => (
    <div className="grid gap-3">
      <Label htmlFor="color">Color</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger
          id="color"
          className="bg-secondary-background text-foreground"
        >
          <SelectValue placeholder="Select a color" />
        </SelectTrigger>
        <SelectContent className="bg-secondary-background text-foreground">
          {colors.map(({ name, main }) => (
            <SelectItem key={name} value={name}>
              <div className="flex items-center gap-2">
                <div
                  aria-hidden="true"
                  className="size-4 rounded-full border-2 border-border"
                  style={{ backgroundColor: main }}
                />
                {name}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  ),
)
ColorSection.displayName = "ColorSection"

/**
 * ⚡ Bolt: Generic memoized sub-component for button-based option sections.
 */
const OptionSection = React.memo(
  ({
    id,
    label,
    options,
    currentValue,
    onSelect,
    unit = "",
  }: SectionProps & {
    options: number[]
    currentValue: number
    onSelect: (v: number) => void
    unit?: string
  }) => (
    <div className="grid gap-3">
      <Label htmlFor={id}>{label}</Label>
      <div
        id={id}
        className={cn(
          "grid gap-2",
          options.length === 5
            ? "grid-cols-5"
            : options.length === 4
              ? "grid-cols-4"
              : "grid-cols-3",
        )}
      >
        {options.map((option) => (
          <Button
            key={option}
            onClick={() => onSelect(option)}
            aria-pressed={currentValue === option}
            className={cn(
              "h-8",
              currentValue === option
                ? "bg-main text-main-foreground"
                : "bg-secondary-background text-foreground",
            )}
            variant="noShadow"
          >
            {option}
            {unit}
          </Button>
        ))}
      </div>
    </div>
  ),
)
OptionSection.displayName = "OptionSection"

export default function Styling() {
  const [
    {
      bg,
      darkBg,
      darkMain,
      main,
      name,
      chart1,
      chart2,
      chart3,
      chart4,
      chart5,
      darkChart1,
      darkChart2,
      darkChart3,
      darkChart4,
      darkChart5,
    },
    setColor,
  ] = React.useState<ColorPalette>(defaultColorPalette)
  const [borderRadius, setBorderRadius] = React.useState(5)
  // ⚡ Bolt: Decomposed state arrays to stabilize callbacks and reduce re-renders.
  const [boxShadowX, setBoxShadowX] = React.useState(4)
  const [boxShadowY, setBoxShadowY] = React.useState(4)
  const [fontWeightHeading, setFontWeightHeading] = React.useState(700)
  const [fontWeightBase, setFontWeightBase] = React.useState(500)

  React.useLayoutEffect(() => {
    try {
      const colorJson = localStorage.getItem(STORAGE_KEY_COLOR)
      const colorObj =
        colorJson && colorJson.length < 1000 ? JSON.parse(colorJson) : null
      const borderRadiusStr = localStorage.getItem(STORAGE_KEY_RADIUS)
      const borderRadiusVal =
        borderRadiusStr !== null ? Number(borderRadiusStr) : null
      const boxShadowStr = localStorage.getItem(STORAGE_KEY_SHADOW)
      const boxShadow =
        boxShadowStr && boxShadowStr.length < 100
          ? boxShadowStr.split(",")
          : null
      const fontWeightStr = localStorage.getItem(STORAGE_KEY_FONT_WEIGHT)
      const storedFontWeight =
        fontWeightStr && fontWeightStr.length < 100
          ? fontWeightStr.split(",")
          : null

      if (
        colorObj &&
        typeof colorObj === "object" &&
        !Array.isArray(colorObj)
      ) {
        const sanitizedEntries = Object.entries(colorObj)
          .filter(
            ([key]) =>
              ALLOWED_COLOR_KEYS.includes(key) &&
              !BLOCKED_PROTO_KEYS.includes(key.toLowerCase()),
          )
          .map(([key, value]) => {
            const sanitizedKey = sanitizeCSSVariable(key)
            const sanitizedValue =
              typeof value === "string" ? sanitizeColor(value) : ""
            return [sanitizedKey, sanitizedValue]
          })
          .filter(([key, value]) => key !== "" && value !== "")

        const sanitizedColorObj = Object.fromEntries(
          sanitizedEntries,
        ) as unknown as Partial<ColorPalette>

        if (sanitizedColorObj.name) {
          setColor((prev) => ({ ...prev, ...sanitizedColorObj }))
        }
      }

      if (
        borderRadiusVal !== null &&
        Number.isFinite(borderRadiusVal) &&
        borderRadiusVal >= 0 &&
        borderRadiusVal <= 50
      ) {
        setBorderRadius(borderRadiusVal)
      }

      if (
        boxShadow &&
        boxShadow.length === 2 &&
        Number.isFinite(+boxShadow[0]) &&
        Number.isFinite(+boxShadow[1]) &&
        +boxShadow[0] >= -50 &&
        +boxShadow[0] <= 50 &&
        +boxShadow[1] >= -50 &&
        +boxShadow[1] <= 50
      ) {
        setBoxShadowX(+boxShadow[0])
        setBoxShadowY(+boxShadow[1])
      }

      if (
        storedFontWeight &&
        storedFontWeight.length === 2 &&
        Number.isFinite(+storedFontWeight[0]) &&
        Number.isFinite(+storedFontWeight[1]) &&
        +storedFontWeight[0] >= 100 &&
        +storedFontWeight[0] <= 1000 &&
        +storedFontWeight[1] >= 100 &&
        +storedFontWeight[1] <= 1000
      ) {
        setFontWeightHeading(+storedFontWeight[0])
        setFontWeightBase(+storedFontWeight[1])
      }
    } catch (e) {
      toast.error("Failed to parse styling from localStorage.")
    }
  }, [])

  const updateColor = React.useCallback(
    (value: string) => {
      if (value === name) return

      const color = colorsByName[value]!
      setColor(color)
      localStorage.setItem(STORAGE_KEY_COLOR, JSON.stringify(color))

      const isDarkMode = document.documentElement.classList.contains("dark")
      if (isDarkMode) {
        setCSSVariable("background", color.darkBg)
        setCSSVariable("main", color.darkMain)
        setCSSVariable("chart-1", color.darkChart1)
        setCSSVariable("chart-2", color.darkChart2)
        setCSSVariable("chart-3", color.darkChart3)
        setCSSVariable("chart-4", color.darkChart4)
        setCSSVariable("chart-5", color.darkChart5)
      } else {
        setCSSVariable("background", color.bg)
        setCSSVariable("main", color.main)
        setCSSVariable("chart-1", color.chart1)
        setCSSVariable("chart-2", color.chart2)
        setCSSVariable("chart-3", color.chart3)
        setCSSVariable("chart-4", color.chart4)
        setCSSVariable("chart-5", color.chart5)
      }

      setCSSVariable("dark-background", color.darkBg)
      setCSSVariable("dark-main", color.darkMain)
      setCSSVariable("light-background", color.bg)
      setCSSVariable("light-main", color.main)
    },
    [name],
  )

  const updateBorderRadius = React.useCallback(
    (value: number) => {
      if (value === borderRadius) return
      setCSSVariable("border-radius", `${value}px`)
      localStorage.setItem(STORAGE_KEY_RADIUS, value.toString())
      setBorderRadius(value)
    },
    [borderRadius],
  )

  const updateHorizontalBoxShadow = React.useCallback(
    (value: number) => {
      if (value === boxShadowX) return
      setCSSVariable("box-shadow-x", value + "px")
      localStorage.setItem(STORAGE_KEY_SHADOW, [value, boxShadowY].join(","))
      setBoxShadowX(value)
    },
    [boxShadowX, boxShadowY],
  )

  const updateVerticalBoxShadow = React.useCallback(
    (value: number) => {
      if (value === boxShadowY) return
      setCSSVariable("box-shadow-y", value + "px")
      localStorage.setItem(STORAGE_KEY_SHADOW, [boxShadowX, value].join(","))
      setBoxShadowY(value)
    },
    [boxShadowX, boxShadowY],
  )

  const updateHeadingFontWeight = React.useCallback(
    (value: number) => {
      if (value === fontWeightHeading) return
      setCSSVariable("heading-font-weight", `${value}`)
      localStorage.setItem(STORAGE_KEY_FONT_WEIGHT, [value, fontWeightBase].join(","))
      setFontWeightHeading(value)
    },
    [fontWeightHeading, fontWeightBase],
  )

  const updateBaseFontWeight = React.useCallback(
    (value: number) => {
      if (value === fontWeightBase) return
      setCSSVariable("base-font-weight", `${value}`)
      localStorage.setItem(STORAGE_KEY_FONT_WEIGHT, [fontWeightHeading, value].join(","))
      setFontWeightBase(value)
    },
    [fontWeightHeading, fontWeightBase],
  )

  const resetStyling = React.useCallback(() => {
    updateColor(defaultColorPalette.name)

    setCSSVariable("border-radius", "5px")
    setCSSVariable("box-shadow-x", "4px")
    setCSSVariable("box-shadow-y", "4px")
    setCSSVariable("heading-font-weight", "700")
    setCSSVariable("base-font-weight", "500")

    setColor(defaultColorPalette)
    setBorderRadius(5)
    setBoxShadowX(4)
    setBoxShadowY(4)
    setFontWeightHeading(700)
    setFontWeightBase(500)

    localStorage.removeItem(STORAGE_KEY_COLOR)
    localStorage.removeItem(STORAGE_KEY_RADIUS)
    localStorage.removeItem(STORAGE_KEY_SHADOW)
    localStorage.removeItem(STORAGE_KEY_FONT_WEIGHT)

    toast.success("Styling reset successfully.")
  }, [updateColor])

  // ⚡ Bolt: Memoize the large CSS template literal to prevent re-computation on every render.
  const styling = React.useMemo(
    () => `@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

:root {
  --background: ${bg};
  --secondary-background: oklch(100% 0 0);
  --foreground: oklch(0% 0 0);
  --main-foreground: oklch(0% 0 0);
  --main: ${main};
  --border: oklch(0% 0 0);
  --ring: oklch(0% 0 0);
  --overlay: oklch(0% 0 0 / 0.8);
  --shadow: ${boxShadowX}px ${boxShadowY}px 0px 0px var(--border);
  --chart-1: ${chart1};
  --chart-2: ${chart2};
  --chart-3: ${chart3};
  --chart-4: ${chart4};
  --chart-5: ${chart5};
  --chart-active-dot: #000;
}

.dark {
  --background: ${darkBg};
  --secondary-background: oklch(23.93% 0 0);
  --foreground: oklch(92.49% 0 0);
  --main-foreground: oklch(0% 0 0);
  --main: ${darkMain};
  --border: oklch(0% 0 0);
  --ring: oklch(100% 0 0);
  --shadow: ${boxShadowX}px ${boxShadowY}px 0px 0px var(--border);
  --chart-1: ${darkChart1};
  --chart-2: ${darkChart2};
  --chart-3: ${darkChart3};
  --chart-4: ${darkChart4};
  --chart-5: ${darkChart5};
  --chart-active-dot: #fff;
}

@theme inline {
  --color-main: var(--main);
  --color-background: var(--background);
  --color-secondary-background: var(--secondary-background);
  --color-foreground: var(--foreground);
  --color-main-foreground: var(--main-foreground);
  --color-border: var(--border);
  --color-overlay: var(--overlay);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);

  --spacing-boxShadowX: ${boxShadowX}px;
  --spacing-boxShadowY: ${boxShadowY}px;
  --spacing-reverseBoxShadowX: -${boxShadowX}px;
  --spacing-reverseBoxShadowY: -${boxShadowY}px;
  --radius-base: ${borderRadius}px;
  --shadow-shadow: var(--shadow);
  --font-weight-base: ${fontWeightBase};
  --font-weight-heading: ${fontWeightHeading};
}
  
@layer base {
  body {
    @apply text-foreground font-base bg-background;
  }

  h1, h2, h3, h4, h5, h6{
    @apply font-heading;
  }
}`,
    [
      bg,
      main,
      boxShadowX,
      boxShadowY,
      chart1,
      chart2,
      chart3,
      chart4,
      chart5,
      darkBg,
      darkMain,
      darkChart1,
      darkChart2,
      darkChart3,
      darkChart4,
      darkChart5,
      borderRadius,
      fontWeightBase,
      fontWeightHeading,
    ],
  )

  return (
    <div className="flex items-center justify-center gap-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button>Customize</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Customize styling</SheetTitle>
          </SheetHeader>
          <div className="grid flex-1 auto-rows-min overflow-y-auto gap-4 px-4">
            <ColorSection value={name} onValueChange={updateColor} />
            <OptionSection
              id="border-radius"
              label="Border Radius"
              options={BORDER_RADIUS_OPTIONS}
              currentValue={borderRadius}
              onSelect={updateBorderRadius}
              unit=" px"
            />
            <OptionSection
              id="horizontal-box-shadow"
              label="Horizontal Box Shadow"
              options={HORIZONTAL_BOX_SHADOW_OPTIONS}
              currentValue={boxShadowX}
              onSelect={updateHorizontalBoxShadow}
              unit=" px"
            />
            <OptionSection
              id="vertical-box-shadow"
              label="Vertical Box Shadow"
              options={VERTICAL_BOX_SHADOW_OPTIONS}
              currentValue={boxShadowY}
              onSelect={updateVerticalBoxShadow}
              unit=" px"
            />
            <OptionSection
              id="heading-font-weight"
              label="Heading Font Weight"
              options={HEADING_FONT_WEIGHT_OPTIONS}
              currentValue={fontWeightHeading}
              onSelect={updateHeadingFontWeight}
            />
            <OptionSection
              id="base-font-weight"
              label="Base Font Weight"
              options={BASE_FONT_WEIGHT_OPTIONS}
              currentValue={fontWeightBase}
              onSelect={updateBaseFontWeight}
            />
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button>Save changes</Button>
            </SheetClose>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="neutral">Reset</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action will reset all your theme customizations to
                    their default values. This cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={resetStyling}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="neutral">Copy</Button>
        </DialogTrigger>
        <DialogContent className="max-w-full">
          <DialogHeader>
            <DialogTitle>Theming</DialogTitle>
            <DialogDescription>
              Copy the styling to your globals.css file.
            </DialogDescription>
          </DialogHeader>
          <LazyPre
            wrapperClassName="w-full max-w-full text-white overflow-x-auto"
            __rawstring__={styling}
          >
            {styling}
          </LazyPre>
        </DialogContent>
      </Dialog>
    </div>
  )
}
