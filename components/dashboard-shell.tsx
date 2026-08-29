"use client"

import * as React from "react"
import { CardsDemo } from "@/index"
import { Header } from "@/components/header"
import { CommandPalette } from "@/components/command-palette"

export function DashboardShell() {
  const [commandOpen, setCommandOpen] = React.useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      <Header onCommandOpen={() => setCommandOpen(true)} />
      <main className="flex-1">
        <CardsDemo />
      </main>
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        <div className="container mx-auto px-4">
          <p>© 2026 Sketchpad — Built with Next.js 14, shadcn/ui & Tailwind CSS 4. Press <kbd className="px-1.5 py-0.5 bg-muted border rounded text-xs">⌘K</kbd> to search.</p>
        </div>
      </footer>
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </div>
  )
}
