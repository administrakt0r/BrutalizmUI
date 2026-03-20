"use client"

import { addDays } from "date-fns"
import { DateRange } from "react-day-picker"

import * as React from "react"

import { Calendar } from "@/components/ui/calendar"

// ⚡ Bolt: Hoist date constants to avoid repeated instantiation during render and intersection loops
const TODAY = new Date()
const MIN_DATE = new Date("1900-01-01")
const INITIAL_FROM = new Date(TODAY.getFullYear(), 0, 12)

export default function CalendarRangeDemo() {
  // ⚡ Bolt: Use lazy state initialization to compute the initial range only once on mount
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(
    () => ({
      from: INITIAL_FROM,
      to: addDays(INITIAL_FROM, 30),
    }),
  )

  return (
    <Calendar
      mode="range"
      defaultMonth={dateRange?.from}
      selected={dateRange}
      onSelect={setDateRange}
      numberOfMonths={2}
      disabled={(date) => date > TODAY || date < MIN_DATE}
    />
  )
}
