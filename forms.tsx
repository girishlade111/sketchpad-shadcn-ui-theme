"use client"

import * as React from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

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
    description: "More features and storage.",
    price: "$20",
  },
] as const

export function CardsForms() {
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [card, setCard] = React.useState("")
  const [expiry, setExpiry] = React.useState("")
  const [cvc, setCvc] = React.useState("")
  const [plan, setPlan] = React.useState("starter")
  const [notes, setNotes] = React.useState("")
  const [terms, setTerms] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const submit = async () => {
    if (!name || !email || !card) {
      toast.error("Please fill required fields")
      return
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Invalid email address")
      return
    }
    if (!terms) {
      toast.error("You must agree to terms")
      return
    }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 900))
    toast.success(`Upgraded to ${plans.find((p) => p.id === plan)?.name} successfully`)
    setLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Upgrade your subscription</CardTitle>
        <CardDescription className="text-balance">
          You are currently on the free plan. Upgrade to the pro plan to get access to all features.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="flex flex-1 flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Evil Rabbit" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="example@acme.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="card-number">Card Number</Label>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-[1fr_80px_60px]">
              <Input id="card-number" placeholder="1234 1234 1234 1234" className="col-span-2 md:col-span-1" value={card} onChange={(e) => setCard(e.target.value)} />
              <Input id="card-number-expiry" placeholder="MM/YY" value={expiry} onChange={(e) => setExpiry(e.target.value)} />
              <Input id="card-number-cvc" placeholder="CVC" value={cvc} onChange={(e) => setCvc(e.target.value)} />
            </div>
          </div>
          <fieldset className="flex flex-col gap-3">
            <legend className="text-sm font-medium">Plan</legend>
            <p className="text-muted-foreground text-sm">Select the plan that best fits your needs.</p>
            <RadioGroup value={plan} onValueChange={setPlan} className="grid gap-3 md:grid-cols-2">
              {plans.map((p) => (
                <Label
                  className="has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-primary/10 flex items-start gap-3 rounded-lg border p-3 cursor-pointer"
                  key={p.id}
                >
                  <RadioGroupItem value={p.id} id={p.name} className="data-[state=checked]:border-primary" />
                  <div className="grid gap-1 font-normal">
                    <div className="font-medium">{p.name}</div>
                    <div className="text-muted-foreground text-xs leading-snug text-balance">{p.description}</div>
                  </div>
                </Label>
              ))}
            </RadioGroup>
          </fieldset>
          <div className="flex flex-col gap-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" placeholder="Enter notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Checkbox id="terms" checked={terms} onCheckedChange={(v) => setTerms(!!v)} />
              <Label htmlFor="terms" className="font-normal">
                I agree to the terms and conditions
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="newsletter" defaultChecked />
              <Label htmlFor="newsletter" className="font-normal">
                Allow us to send you emails
              </Label>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" onClick={() => toast.info("Cancelled")}>
          Cancel
        </Button>
        <Button size="sm" onClick={submit} disabled={loading}>
          {loading ? "Upgrading..." : "Upgrade Plan"}
        </Button>
      </CardFooter>
    </Card>
  )
}
