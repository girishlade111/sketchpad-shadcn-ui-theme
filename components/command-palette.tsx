"use client"

import * as React from "react"
import {
  CreditCard,
  Calendar,
  MessageSquare,
  Users,
  Settings,
  FileText,
  BarChart3,
  Activity,
  Share2,
  Cookie,
} from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { toast } from "sonner"

export function CommandPalette({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onOpenChange(!open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [open, onOpenChange])

  const run = (msg: string) => {
    toast.success(msg)
    onOpenChange(false)
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem onSelect={() => run("Navigated to Payments")}>
            <CreditCard className="mr-2 size-4" /> Payments
          </CommandItem>
          <CommandItem onSelect={() => run("Navigated to Calendar")}>
            <Calendar className="mr-2 size-4" /> Calendar
          </CommandItem>
          <CommandItem onSelect={() => run("Navigated to Chat")}>
            <MessageSquare className="mr-2 size-4" /> Chat
          </CommandItem>
          <CommandItem onSelect={() => run("Navigated to Team Members")}>
            <Users className="mr-2 size-4" /> Team Members
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Analytics">
          <CommandItem onSelect={() => run("Opened Stats")}>
            <BarChart3 className="mr-2 size-4" /> View Stats
          </CommandItem>
          <CommandItem onSelect={() => run("Opened Exercise Minutes")}>
            <Activity className="mr-2 size-4" /> Exercise Minutes
          </CommandItem>
          <CommandItem onSelect={() => run("Opened Share")}>
            <Share2 className="mr-2 size-4" /> Share Document
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Settings">
          <CommandItem onSelect={() => run("Opened Cookie Settings")}>
            <Cookie className="mr-2 size-4" /> Cookie Settings
          </CommandItem>
          <CommandItem onSelect={() => run("Opened Report Issue")}>
            <FileText className="mr-2 size-4" /> Report Issue
          </CommandItem>
          <CommandItem onSelect={() => run("Opened Settings")}>
            <Settings className="mr-2 size-4" /> Settings
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
