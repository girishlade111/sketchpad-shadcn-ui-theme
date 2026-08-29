"use client"

import * as React from "react"
import { addDays } from "date-fns"
import { toast } from "sonner"

import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import type { DateRange } from "react-day-picker"

const start = new Date(2025, 5, 5)

export function CardsCalendar() {
  const [range, setRange] = React.useState<DateRange | undefined>({ from: start, to: addDays(start, 8) })

  return (
    <Card className="hidden max-w-[260px] p-0 sm:flex">
      <CardContent className="p-0">
        <Calendar
          numberOfMonths={1}
          mode="range"
          defaultMonth={start}
          selected={range}
          onSelect={(r) => {
            setRange(r)
            if (r?.from && r?.to) toast.success(`Selected ${r.from.toLocaleDateString()} - ${r.to.toLocaleDateString()}`)
          }}
        />
      </CardContent>
    </Card>
  )
}
