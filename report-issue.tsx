"use client"

import * as React from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export function CardsReportIssue() {
  const id = React.useId()
  const [area, setArea] = React.useState("billing")
  const [severity, setSeverity] = React.useState("2")
  const [subject, setSubject] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  const submit = async () => {
    if (!subject.trim() || !description.trim()) {
      toast.error("Please fill in subject and description")
      return
    }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    toast.success(`Issue reported for ${area} (Severity ${severity})`)
    setSubject("")
    setDescription("")
    setLoading(false)
  }

  const reset = () => {
    setSubject("")
    setDescription("")
    setArea("billing")
    setSeverity("2")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Report an issue</CardTitle>
        <CardDescription>What area are you having problems with?</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-3">
            <Label htmlFor={`area-${id}`}>Area</Label>
            <Select value={area} onValueChange={setArea}>
              <SelectTrigger id={`area-${id}`} aria-label="Area" className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="team">Team</SelectItem>
                <SelectItem value="billing">Billing</SelectItem>
                <SelectItem value="account">Account</SelectItem>
                <SelectItem value="deployments">Deployments</SelectItem>
                <SelectItem value="support">Support</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor={`security-level-${id}`}>Security Level</Label>
            <Select value={severity} onValueChange={setSeverity}>
              <SelectTrigger
                id={`security-level-${id}`}
                className="w-full [&_span]:!block [&_span]:truncate"
                aria-label="Security Level"
              >
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Severity 1 (Highest)</SelectItem>
                <SelectItem value="2">Severity 2</SelectItem>
                <SelectItem value="3">Severity 3</SelectItem>
                <SelectItem value="4">Severity 4 (Lowest)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor={`subject-${id}`}>Subject</Label>
          <Input id={`subject-${id}`} placeholder="I need help with..." value={subject} onChange={(e) => setSubject(e.target.value)} />
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor={`description-${id}`}>Description</Label>
          <Textarea
            id={`description-${id}`}
            placeholder="Please include all information relevant to your issue."
            className="min-h-28"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={reset}>
          Cancel
        </Button>
        <Button size="sm" onClick={submit} disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </CardFooter>
    </Card>
  )
}
