"use client"

import * as React from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function CardsCookieSettings() {
  const [necessary, setNecessary] = React.useState(true)
  const [functional, setFunctional] = React.useState(false)

  React.useEffect(() => {
    const s = localStorage.getItem("cookie-prefs")
    if (s) {
      try {
        const p = JSON.parse(s)
        setNecessary(p.necessary ?? true)
        setFunctional(p.functional ?? false)
      } catch {}
    }
  }, [])

  const save = () => {
    localStorage.setItem("cookie-prefs", JSON.stringify({ necessary, functional }))
    toast.success("Cookie preferences saved")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cookie Settings</CardTitle>
        <CardDescription>Manage your cookie settings here.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex items-center justify-between gap-4">
          <Label htmlFor="necessary" className="flex flex-col items-start">
            <span>Strictly Necessary</span>
            <span className="text-muted-foreground leading-snug font-normal">
              These cookies are essential in order to use the website and use its features.
            </span>
          </Label>
          <Switch id="necessary" checked={necessary} onCheckedChange={setNecessary} aria-label="Necessary" />
        </div>
        <div className="flex items-center justify-between gap-4">
          <Label htmlFor="functional" className="flex flex-col items-start">
            <span>Functional Cookies</span>
            <span className="text-muted-foreground leading-snug font-normal">
              These cookies allow the website to provide personalized functionality.
            </span>
          </Label>
          <Switch id="functional" checked={functional} onCheckedChange={setFunctional} aria-label="Functional" />
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full bg-transparent" onClick={save}>
          Save preferences
        </Button>
      </CardFooter>
    </Card>
  )
}
