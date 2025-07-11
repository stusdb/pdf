"use client"

import { Sheet } from "@/components/ui/sheet"

import Link from "next/link"
import Image from "next/image"
import { Home, Film, TrendingUp, Search, Bell, Settings, Info, LogOut, X } from "lucide-react"
import { SheetClose } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetClose asChild>
        <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      </SheetClose>
      <div
        className="fixed right-0 top-0 h-full w-64 bg-background-dark p-6 shadow-lg z-50 transform transition-transform duration-300 ease-in-out"
        style={{ transform: isOpen ? "translateX(0)" : "translateX(100%)" }}
      >
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center gap-2" prefetch={false}>
            <Image
              src="/placeholder.svg?height=32&width=32"
              alt="Logo"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="font-cinzel text-lg font-bold text-primary-red">MovieApp</span>
          </Link>
          <Button variant="ghost" size="icon" className="text-text-white" onClick={onClose}>
            <X className="h-6 w-6" />
            <span className="sr-only">Close menu</span>
          </Button>
        </div>
        <nav className="grid gap-4">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-text-white hover:bg-background-light transition-colors"
            prefetch={false}
          >
            <Home className="h-5 w-5" />
            Home
          </Link>
          <Link
            href="/search"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-text-white hover:bg-background-light transition-colors"
            prefetch={false}
          >
            <Film className="h-5 w-5" />
            Movies
          </Link>
          <Link
            href="/trending"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-text-white hover:bg-background-light transition-colors"
            prefetch={false}
          >
            <TrendingUp className="h-5 w-5" />
            Trending
          </Link>
          <Link
            href="/search"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-text-white hover:bg-background-light transition-colors"
            prefetch={false}
          >
            <Search className="h-5 w-5" />
            Search
          </Link>
          <Link
            href="/notifications"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-text-white hover:bg-background-light transition-colors"
            prefetch={false}
          >
            <Bell className="h-5 w-5" />
            Notifications
          </Link>
          <Link
            href="/privacy"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-text-white hover:bg-background-light transition-colors"
            prefetch={false}
          >
            <Info className="h-5 w-5" />
            Privacy Policy
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-text-white hover:bg-background-light transition-colors"
            prefetch={false}
          >
            <Settings className="h-5 w-5" />
            Settings
          </Link>
          <Button
            variant="ghost"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary-red hover:bg-background-light transition-colors justify-start"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </nav>
      </div>
    </Sheet>
  )
}
