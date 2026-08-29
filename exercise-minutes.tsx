"use client"

import * as React from "react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import { toast } from "sonner"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  {
    average: 400,
    today: 240,
    day: "Monday",
  },
  {
    average: 300,
    today: 139,
    day: "Tuesday",
  },
  {
    average: 200,
    today: 980,
    day: "Wednesday",
  },
  {
    average: 278,
    today: 390,
    day: "Thursday",
  },
  {
    average: 189,
    today: 480,
    day: "Friday",
  },
  {
    average: 239,
    today: 380,
    day: "Saturday",
  },
  {
    average: 349,
    today: 430,
    day: "Sunday",
  },
]

const chartConfig = {
  today: {
    label: "Today",
    color: "var(--primary)",
  },
  average: {
    label: "Average",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export function CardsExerciseMinutes() {
  const [range, setRange] = React.useState<"week" | "month">("week")
  const total = data.reduce((acc, d) => acc + d.today, 0)
  const avg = Math.round(total / data.length)
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle>Exercise Minutes</CardTitle>
            <CardDescription>Your exercise minutes are ahead of where you normally are.</CardDescription>
          </div>
          <select
            value={range}
            onChange={(e) => setRange(e.target.value as any)}
            className="h-7 rounded-md border bg-background px-2 text-xs"
          >
            <option value="week">Week</option>
            <option value="month">Month</option>
          </select>
        </div>
        <div className="flex gap-4 pt-2 text-sm">
          <span><b>{total}</b> total</span>
          <span className="text-muted-foreground"><b>{avg}</b> avg/day</span>
          <button className="ml-auto text-xs text-primary hover:underline" onClick={() => toast.info("Exporting exercise data...")}>Export</button>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-[200px]">
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 16,
              bottom: 0,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <Line
              type="monotone"
              dataKey="today"
              strokeWidth={2}
              stroke="var(--color-today)"
              dot={{
                fill: "var(--color-today)",
              }}
              activeDot={{
                r: 5,
              }}
            />
            <Line
              type="monotone"
              strokeWidth={2}
              dataKey="average"
              stroke="var(--color-average)"
              strokeOpacity={0.5}
              dot={{
                fill: "var(--color-average)",
                opacity: 0.5,
              }}
              activeDot={{
                r: 5,
              }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
