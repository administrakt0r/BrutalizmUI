"use client"

import * as React from "react"

import { Calendar } from "@/components/ui/calendar"

export default function CalendarDemo() {
  // ⚡ Bolt: Use lazy state initialization to avoid calling `new Date()` on every render
  const [date, setDate] = React.useState<Date | undefined>(() => new Date())

  return (
    <Calendar
      className="w-max"
      mode="single"
      selected={date}
      onSelect={setDate}
    />
  )
}
