"use client"

import * as React from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const plans = [
  {
    id: "starter",
    name: "Starter Plan",
    description: "Perfect for small businesses.",
    price: "$10",
  },
  {
    id: "pro",
    name: "Pro Plan",
    description: "Advanced features with more storage.",
    price: "$20",
  },
] as const

export function CardsPaymentMethod() {
  const [name, setName] = React.useState("")
  const [plan, setPlan] = React.useState("starter")
  const [number, setNumber] = React.useState("")
  const [month, setMonth] = React.useState("")
  const [year, setYear] = React.useState("")
  const [cvc, setCvc] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  const submit = async () => {
    if (!name || !number || !month || !year || !cvc) {
      toast.error("Please fill all payment fields")
      return
    }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 700))
    toast.success(`${plans.find((p) => p.id === plan)?.name} activated for ${name}`)
    setLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
        <CardDescription>Add a new payment method to your account.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="First Last" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <fieldset className="flex flex-col gap-3">
          <legend className="text-sm font-medium">Plan</legend>
          <p className="text-muted-foreground text-sm">Select the plan that best fits your needs.</p>
          <RadioGroup value={plan} onValueChange={setPlan} className="grid gap-3">
            {plans.map((p) => (
              <Label
                className="has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-primary/5 flex items-start gap-3 rounded-lg border p-3 cursor-pointer"
                key={p.id}
              >
                <RadioGroupItem value={p.id} id={p.name} className="data-[state=checked]:border-primary" />
                <div className="grid gap-1 font-normal">
                  <div className="font-medium">{p.name}</div>
                  <div className="text-muted-foreground pr-2 text-xs leading-snug text-balance">{p.description}</div>
                </div>
              </Label>
            ))}
          </RadioGroup>
        </fieldset>
        <div className="flex flex-col gap-3">
          <Label htmlFor="number">Card number</Label>
          <Input id="number" placeholder="1234 1234 1234 1234" value={number} onChange={(e) => setNumber(e.target.value)} />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col gap-3">
            <Label htmlFor="month">Expires</Label>
            <Select value={month} onValueChange={setMonth}>
              <SelectTrigger id="month" aria-label="Month" className="w-full">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">January</SelectItem>
                <SelectItem value="2">February</SelectItem>
                <SelectItem value="3">March</SelectItem>
                <SelectItem value="4">April</SelectItem>
                <SelectItem value="5">May</SelectItem>
                <SelectItem value="6">June</SelectItem>
                <SelectItem value="7">July</SelectItem>
                <SelectItem value="8">August</SelectItem>
                <SelectItem value="9">September</SelectItem>
                <SelectItem value="10">October</SelectItem>
                <SelectItem value="11">November</SelectItem>
                <SelectItem value="12">December</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="year">Year</Label>
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger id="year" aria-label="Year" className="w-full">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 10 }, (_, i) => (
                  <SelectItem key={i} value={`${new Date().getFullYear() + i}`}>
                    {new Date().getFullYear() + i}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="cvc">CVC</Label>
            <Input id="cvc" placeholder="CVC" value={cvc} onChange={(e) => setCvc(e.target.value)} />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={submit} disabled={loading}>{loading ? "Processing..." : "Continue"}</Button>
      </CardFooter>
    </Card>
  )
}
