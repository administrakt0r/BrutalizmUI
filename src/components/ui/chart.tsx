"use client"

import * as RechartsPrimitive from "recharts"

import * as React from "react"

import {
  escapeCSSString,
  sanitizeColor,
  sanitizeCSSVariable,
} from "@/lib/security"
import { cn } from "@/lib/utils"

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const

// ⚡ Bolt: Hoist BLOCKED_KEYS to the module level to avoid re-creating the array on every lookup.
const BLOCKED_KEYS = [
  "__proto__",
  "constructor",
  "prototype",
  "__definegetter__",
  "__definesetter__",
  "__lookupgetter__",
  "__lookupsetter__",
]

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

export type ChartContainerProps = React.ComponentPropsWithoutRef<"div"> & {
  config: ChartConfig
  children: React.ComponentPropsWithoutRef<
    typeof RechartsPrimitive.ResponsiveContainer
  >["children"]
}

/**
 * ⚡ Bolt: ChartContainer component optimized with React.memo and React.forwardRef.
 */
const ChartContainer = React.memo(
  React.forwardRef<HTMLDivElement, ChartContainerProps>(
    ({ id, className, children, config, ...props }, ref) => {
      const uniqueId = React.useId()

      // ⚡ Bolt: Memoize chartId to avoid redundant string processing on every render.
      const chartId = React.useMemo(() => {
        const sanitizedId = id ? sanitizeCSSVariable(id) : null
        return `chart-${sanitizedId || uniqueId.replace(/[^a-zA-Z0-9]/g, "")}`
      }, [id, uniqueId])

      // ⚡ Bolt: Memoize context value to prevent consumers from re-rendering when config is stable.
      const contextValue = React.useMemo(() => ({ config }), [config])

      return (
        <ChartContext.Provider value={contextValue}>
          <div
            ref={ref}
            data-slot="chart"
            data-chart={chartId}
            className={cn(
              "[&_.recharts-cartesian-axis-tick_text]:fill-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-[#80808080] [&_.recharts-curve.recharts-tooltip-cursor]:stroke-[#80808080] [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-black [&_.recharts-polar-grid_[stroke='#ccc']]:dark:stroke-white [&_.recharts-reference-line_[stroke='#ccc']]:stroke-black [&_.recharts-reference-line_[stroke='#ccc']]:dark:stroke-white flex aspect-video justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-border [&_.recharts-surface]:outline-hidden",
              "[&_.recharts-layer_path]:[fill-opacity:1] [&_.recharts-layer_path]:[stroke-width:2] [&_.recharts-layer_path]:[stroke:var(--color-border)]",
              className,
            )}
            {...props}
          >
            <ChartStyle id={chartId} config={config} />
            <RechartsPrimitive.ResponsiveContainer>
              {children}
            </RechartsPrimitive.ResponsiveContainer>
          </div>
        </ChartContext.Provider>
      )
    },
  ),
)

ChartContainer.displayName = "ChartContainer"

// ⚡ Bolt: Memoize ChartStyle to prevent unnecessary re-renders and DOM updates of the <style> tag.
const ChartStyle = React.memo(
  ({ id, config }: { id: string; config: ChartConfig }) => {
    const sanitizedId = sanitizeCSSVariable(id)

    const colorConfig = Object.entries(config).filter(
      ([, config]) => config.theme || config.color,
    )

    if (!colorConfig.length) {
      return null
    }

    return (
      <style
        dangerouslySetInnerHTML={{
          __html: Object.entries(THEMES)
            .map(
              ([theme, prefix]) => `
${prefix} [data-chart="${escapeCSSString(sanitizedId)}"] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color
    const sanitizedColorValue = color ? sanitizeColor(color) : null
    const sanitizedKey = sanitizeCSSVariable(key)
    return sanitizedColorValue && sanitizedKey
      ? `  --color-${sanitizedKey}: ${sanitizedColorValue};`
      : null
  })
  .join("\n")}
}
`,
            )
            .join("\n"),
        }}
      />
    )
  },
)

ChartStyle.displayName = "ChartStyle"

// ⚡ Bolt: Extract Intl.NumberFormat instantiation outside of the render loop
const numberFormatter = new Intl.NumberFormat("en-US")

const ChartTooltip = RechartsPrimitive.Tooltip

export type ChartTooltipContentProps = React.ComponentPropsWithoutRef<
  typeof RechartsPrimitive.Tooltip
> &
  React.ComponentPropsWithoutRef<"div"> & {
    hideLabel?: boolean
    hideIndicator?: boolean
    indicator?: "line" | "dot" | "dashed"
    nameKey?: string
    labelKey?: string
  }

/**
 * ⚡ Bolt: ChartTooltipContent component optimized with React.memo and React.forwardRef.
 */
const ChartTooltipContent = React.memo(
  React.forwardRef<HTMLDivElement, ChartTooltipContentProps>(
    (
      {
        active,
        payload,
        className,
        indicator = "dot",
        hideLabel = false,
        hideIndicator = false,
        label,
        labelFormatter,
        labelClassName,
        formatter,
        color,
        nameKey,
        labelKey,
      },
      ref,
    ) => {
      const { config } = useChart()

      const tooltipLabel = React.useMemo(() => {
        if (hideLabel || !payload?.length) {
          return null
        }

        const [item] = payload
        const key = `${labelKey || item?.dataKey || item?.name || "value"}`
        const itemConfig = getPayloadConfigFromPayload(config, item, key)
        const value =
          !labelKey && typeof label === "string"
            ? config[label as keyof typeof config]?.label || label
            : itemConfig?.label

        if (labelFormatter) {
          return (
            <div className={cn("font-heading", labelClassName)}>
              {labelFormatter(value, payload)}
            </div>
          )
        }

        if (!value) {
          return null
        }

        return <div className={cn("font-base", labelClassName)}>{value}</div>
      }, [
        label,
        labelFormatter,
        payload,
        hideLabel,
        labelClassName,
        config,
        labelKey,
      ])

      if (!active || !payload?.length) {
        return null
      }

      const nestLabel = payload.length === 1 && indicator !== "dot"

      return (
        <div
          ref={ref}
          data-slot="chart-tooltip-content"
          className={cn(
            "border-border bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl",
            className,
          )}
        >
          {!nestLabel ? tooltipLabel : null}
          <div className="grid gap-1.5">
            {payload.map((item, index) => {
              const key = `${nameKey || item.name || item.dataKey || "value"}`
              const itemConfig = getPayloadConfigFromPayload(config, item, key)
              const indicatorColor = sanitizeColor(
                color || item.payload.fill || item.color,
              )

              return (
                <div
                  key={item.dataKey}
                  className={cn(
                    "[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 ",
                    indicator === "dot" && "items-center",
                  )}
                >
                  {formatter && item?.value !== undefined && item.name ? (
                    formatter(item.value, item.name, item, index, item.payload)
                  ) : (
                    <>
                      {itemConfig?.icon ? (
                        <itemConfig.icon />
                      ) : (
                        !hideIndicator && (
                          <div
                            className={cn(
                              "shrink-0 rounded-[2px] bg-(--color-bg)",
                              {
                                "size-2.5 border border-border":
                                  indicator === "dot",
                                "w-1": indicator === "line",
                                "w-0 border-[1.5px] border-dashed bg-transparent":
                                  indicator === "dashed",
                                "my-0.5": nestLabel && indicator === "dashed",
                              },
                            )}
                            style={
                              {
                                "--color-bg": indicatorColor,
                                "--color-border": indicatorColor,
                              } as React.CSSProperties
                            }
                          />
                        )
                      )}
                      <div
                        className={cn(
                          "flex flex-1 justify-between leading-none",
                          nestLabel ? "items-end" : "items-center",
                        )}
                      >
                        <div className="grid gap-1.5">
                          {nestLabel ? tooltipLabel : null}
                          <span className="text-muted-foreground">
                            {itemConfig?.label || item.name}
                          </span>
                        </div>
                        {item.value && (
                          <span className="text-foreground font-mono font-medium tabular-nums">
                            {numberFormatter.format(Number(item.value))}
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )
    },
  ),
)

ChartTooltipContent.displayName = "ChartTooltipContent"

const ChartLegend = RechartsPrimitive.Legend

export type ChartLegendContentProps = React.ComponentPropsWithoutRef<"div"> &
  Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
    hideIcon?: boolean
    nameKey?: string
  }

/**
 * ⚡ Bolt: ChartLegendContent component optimized with React.memo and React.forwardRef.
 */
const ChartLegendContent = React.memo(
  React.forwardRef<HTMLDivElement, ChartLegendContentProps>(
    (
      {
        className,
        hideIcon = false,
        payload,
        verticalAlign = "bottom",
        nameKey,
      },
      ref,
    ) => {
      const { config } = useChart()

      if (!payload?.length) {
        return null
      }

      return (
        <div
          ref={ref}
          data-slot="chart-legend-content"
          className={cn(
            "flex items-center justify-center gap-4",
            verticalAlign === "top" ? "pb-3" : "pt-3",
            className,
          )}
        >
          {payload.map((item) => {
            const key = `${nameKey || item.dataKey || "value"}`
            const itemConfig = getPayloadConfigFromPayload(config, item, key)

            return (
              <div
                key={item.value}
                className={cn(
                  "[&>svg]:text-foreground flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3",
                )}
              >
                {itemConfig?.icon && !hideIcon ? (
                  <itemConfig.icon />
                ) : (
                  <div
                    className="h-2 w-2 border border-border shrink-0 rounded-[2px]"
                    style={{
                      backgroundColor: item.color
                        ? sanitizeColor(item.color)
                        : undefined,
                    }}
                  />
                )}
                {itemConfig?.label}
              </div>
            )
          })}
        </div>
      )
    },
  ),
)

ChartLegendContent.displayName = "ChartLegendContent"

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string,
) {
  if (typeof payload !== "object" || payload === null) {
    return undefined
  }

  const payloadPayload =
    Object.prototype.hasOwnProperty.call(payload, "payload") &&
    typeof (payload as Record<string, unknown>).payload === "object" &&
    (payload as Record<string, unknown>).payload !== null
      ? ((payload as Record<string, unknown>).payload as Record<
          string,
          unknown
        >)
      : undefined

  let configLabelKey: string = key

  if (
    Object.prototype.hasOwnProperty.call(payload, key) &&
    typeof (payload as Record<string, unknown>)[key] === "string"
  ) {
    configLabelKey = (payload as Record<string, unknown>)[key] as string
  } else if (
    payloadPayload &&
    Object.prototype.hasOwnProperty.call(payloadPayload, key) &&
    typeof payloadPayload[key] === "string"
  ) {
    configLabelKey = payloadPayload[key] as string
  }

  // ⚡ Bolt: Extract `trim().toLowerCase()` to avoid redundant processing.
  const normalizedKey = key.trim().toLowerCase()
  const normalizedLabelKey = configLabelKey.trim().toLowerCase()

  // Prevent prototype pollution via configLabelKey or key
  if (
    BLOCKED_KEYS.includes(normalizedLabelKey) ||
    (normalizedKey !== normalizedLabelKey && BLOCKED_KEYS.includes(normalizedKey))
  ) {
    return undefined
  }

  return Object.prototype.hasOwnProperty.call(config, configLabelKey)
    ? config[configLabelKey as keyof typeof config]
    : Object.prototype.hasOwnProperty.call(config, key)
      ? config[key as keyof typeof config]
      : undefined
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
}
