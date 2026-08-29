"use client"

import * as React from "react"
import { Search, Bell, LayoutDashboard } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function Header({ onCommandOpen }: { onCommandOpen?: () => void }) {
  const [notifications] = React.useState(3)

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between gap-4 px-4 lg:px-6">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <LayoutDashboard className="size-4" />
            </div>
            <span className="hidden font-bold text-lg tracking-tight sm:inline">Sketchpad</span>
            <Badge variant="secondary" className="hidden ml-2 text-xs lg:inline-flex">Beta</Badge>
          </div>
          <nav className="hidden items-center gap-1 lg:flex">
            <Button variant="secondary" size="sm">Dashboard</Button>
            <Button variant="ghost" size="sm" onClick={() => toast.info("Projects coming soon")}>Projects</Button>
            <Button variant="ghost" size="sm" onClick={() => toast.info("Analytics coming soon")}>Analytics</Button>
            <Button variant="ghost" size="sm" onClick={() => toast.info("Team page coming soon")}>Team</Button>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex relative">
            <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
            <Input
              placeholder="Search... (⌘K)"
              className="w-[200px] pl-8 h-9 bg-muted/50 lg:w-[280px]"
              onFocus={() => onCommandOpen?.()}
              readOnly
            />
            <kbd className="pointer-events-none absolute right-2 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 lg:flex">
              ⌘K
            </kbd>
          </div>

          <Button variant="outline" size="icon" className="md:hidden size-9 bg-transparent" onClick={() => onCommandOpen?.()}>
            <Search className="size-4" />
          </Button>

          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="relative size-9 bg-transparent">
                <Bell className="size-4" />
                {notifications > 0 && (
                  <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] text-white">
                    {notifications}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">Payment received</p>
                  <p className="text-xs text-muted-foreground">Sarah paid $1,280 - 2 min ago</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">New team invite</p>
                  <p className="text-xs text-muted-foreground">Jackson invited you to Project X</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">Goal achieved 🎉</p>
                  <p className="text-xs text-muted-foreground">You hit 350 calories today</p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="size-9 cursor-pointer border">
                <AvatarImage src="/avatars/01.png" alt="User" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => toast.info("Profile coming soon")}>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.info("Settings coming soon")}>Settings</DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.info("Billing coming soon")}>Billing</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => toast.success("Logged out")}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

// Simple badge component if not exists
