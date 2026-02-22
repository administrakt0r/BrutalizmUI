"use client"

import * as React from "react"

import { ChartExample, charts } from "@/data/charts"

import { LazyRender } from "@/components/app/lazy-render"
import { Pre } from "@/components/app/pre"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// ⚡ Bolt: Create a lookup map for charts by name to optimize lookups from O(n) to O(1).
const chartsByName = Object.fromEntries(
  charts.map((chart) => [chart.name, chart]),
)

const FEATURED_CHARTS = [
  chartsByName["ChartAreaStacked"],
  chartsByName["ChartBarMultiple"],
  chartsByName["ChartPieDonutText"],
].filter(Boolean) as ChartExample[]

const AREA_CHARTS = [
  chartsByName["ChartAreaDefault"],
  chartsByName["ChartAreaLinear"],
  chartsByName["ChartAreaStep"],
  chartsByName["ChartAreaStackedExpand"],
  chartsByName["ChartAreaLegend"],
  chartsByName["ChartAreaIcons"],
  chartsByName["ChartAreaAxes"],
].filter(Boolean) as ChartExample[]

const INTERACTIVE_AREA_CHART = chartsByName["ChartAreaInteractive"]

const BAR_CHARTS = [
  chartsByName["ChartBarDefault"],
  chartsByName["ChartBarHorizontal"],
  chartsByName["ChartBarMultiple"],
  chartsByName["ChartBarLabel"],
  chartsByName["ChartBarLabelCustom"],
  chartsByName["ChartBarMixed"],
  chartsByName["ChartBarStacked"],
  chartsByName["ChartBarActive"],
  chartsByName["ChartBarNegative"],
].filter(Boolean) as ChartExample[]

const INTERACTIVE_BAR_CHART = chartsByName["ChartBarInteractive"]

const LINE_CHARTS = [
  chartsByName["ChartLineDefault"],
  chartsByName["ChartLineLinear"],
  chartsByName["ChartLineStep"],
  chartsByName["ChartLineMultiple"],
  chartsByName["ChartLineDots"],
  chartsByName["ChartLineDotsCustom"],
  chartsByName["ChartLineDotsColors"],
  chartsByName["ChartLineLabel"],
  chartsByName["ChartLineLabelCustom"],
].filter(Boolean) as ChartExample[]

const INTERACTIVE_LINE_CHART = chartsByName["ChartLineInteractive"]

const PIE_CHARTS = [
  chartsByName["ChartPieSimple"],
  chartsByName["ChartPieLabel"],
  chartsByName["ChartPieLabelCustom"],
  chartsByName["ChartPieLabelList"],
  chartsByName["ChartPieLegend"],
  chartsByName["ChartPieDonut"],
  chartsByName["ChartPieDonutActive"],
  chartsByName["ChartPieDonutText"],
  chartsByName["ChartPieStacked"],
].filter(Boolean) as ChartExample[]

const TOOLTIP_CHARTS = [
  chartsByName["ChartTooltipDefault"],
  chartsByName["ChartTooltipIndicatorLine"],
  chartsByName["ChartTooltipIndicatorNone"],
  chartsByName["ChartTooltipLabelCustom"],
  chartsByName["ChartTooltipLabelFormatter"],
  chartsByName["ChartTooltipLabelNone"],
  chartsByName["ChartTooltipFormatter"],
  chartsByName["ChartTooltipIcons"],
  chartsByName["ChartTooltipAdvanced"],
].filter(Boolean) as ChartExample[]

export default function Examples() {
  return (
    <div>
      <div className="grid flex-1 gap-12">
        <h2 className="sr-only">Examples</h2>
        <div
          id="examples"
          className="grid flex-1 scroll-mt-20 items-start gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-10"
        >
          {FEATURED_CHARTS.map((chart) => (
            <ChartComponent chart={chart} key={chart.name}>
              <chart.component />
            </ChartComponent>
          ))}
        </div>
        <div
          id="area-chart"
          className="grid flex-1 scroll-mt-20 items-start gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-10"
        >
          {AREA_CHARTS.map((chart) => (
            <ChartComponent chart={chart} key={chart.name}>
              <chart.component />
            </ChartComponent>
          ))}
          <div className="md:col-span-2 lg:col-span-3">
            {INTERACTIVE_AREA_CHART && (
              <ChartComponent
                chart={INTERACTIVE_AREA_CHART}
                key={INTERACTIVE_AREA_CHART.name}
              >
                <INTERACTIVE_AREA_CHART.component />
              </ChartComponent>
            )}
          </div>
        </div>
        <div
          id="bar-chart"
          className="grid flex-1 scroll-mt-20 items-start gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-10"
        >
          {BAR_CHARTS.map((chart) => (
            <ChartComponent chart={chart} key={chart.name}>
              <chart.component />
            </ChartComponent>
          ))}
          <div className="md:col-span-2 lg:col-span-3">
            {INTERACTIVE_BAR_CHART && (
              <ChartComponent
                chart={INTERACTIVE_BAR_CHART}
                key={INTERACTIVE_BAR_CHART.name}
              >
                <INTERACTIVE_BAR_CHART.component />
              </ChartComponent>
            )}
          </div>
        </div>
        <div
          id="line-chart"
          className="grid flex-1 scroll-mt-20 items-start gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-10"
        >
          {LINE_CHARTS.map((chart) => (
            <ChartComponent chart={chart} key={chart.name}>
              <chart.component />
            </ChartComponent>
          ))}
          <div className="md:col-span-2 lg:col-span-3">
            {INTERACTIVE_LINE_CHART && (
              <ChartComponent
                chart={INTERACTIVE_LINE_CHART}
                key={INTERACTIVE_LINE_CHART.name}
              >
                <INTERACTIVE_LINE_CHART.component />
              </ChartComponent>
            )}
          </div>
        </div>
        <div
          id="pie-chart"
          className="grid flex-1 scroll-mt-20 items-start gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-10"
        >
          {PIE_CHARTS.map((chart) => (
            <ChartComponent chart={chart} key={chart.name}>
              <chart.component />
            </ChartComponent>
          ))}
        </div>
        <div
          id="tooltip"
          className="chart-wrapper grid flex-1 scroll-mt-20 items-start gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-10"
        >
          {TOOLTIP_CHARTS.map((chart) => (
            <ChartComponent chart={chart} key={chart.name}>
              <chart.component />
            </ChartComponent>
          ))}
        </div>
      </div>
    </div>
  )
}

const ChartComponent = ({
  children,
  chart,
}: {
  children: React.ReactNode
  chart: ChartExample
}) => {
  const { name, slug } = chart
  const [code, setCode] = React.useState<string | null>(null)
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    if (isOpen && !code) {
      fetch(`/r/charts/${slug}.json`)
        .then((res) => res.json())
        .then((data) => {
          setCode(data.files[0].content)
        })
        .catch((err) => {
          console.error("Failed to fetch chart code:", err)
          setCode("// Failed to load code.")
        })
    }
  }, [isOpen, code, slug])

  return (
    <div>
      <LazyRender className="min-h-[350px]">{children}</LazyRender>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="mt-5 w-full">Copy</Button>
        </DialogTrigger>
        <DialogContent className="max-w-full">
          <DialogHeader>
            <DialogTitle>{name}</DialogTitle>
          </DialogHeader>
          <Pre
            wrapperClassName="w-full max-w-full text-white overflow-x-auto"
            __rawstring__={code || ""}
          >
            {code || "Loading code..."}
          </Pre>
        </DialogContent>
      </Dialog>
    </div>
  )
}
