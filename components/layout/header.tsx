"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, Search, Bell, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"

interface HeaderProps {
  onMenuClick: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between bg-background-dark px-4 shadow-md md:px-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-text-white" onClick={onMenuClick}>
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <Image src="/placeholder.svg?height=32&width=32" alt="Logo" width={32} height={32} className="rounded-full" />
          <span className="font-cinzel text-lg font-bold text-primary-red">MovieApp</span>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-text-white" onClick={() => setIsSearchOpen(true)}>
          <Search className="h-6 w-6" />
          <span className="sr-only">Search</span>
        </Button>
        <Link href="/notifications" className="relative">
          <Button variant="ghost" size="icon" className="text-text-white">
            <Bell className="h-6 w-6" />
            <span className="sr-only">Notifications</span>
            <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-primary-red text-[10px] font-bold text-white">
              3
            </span>
          </Button>
        </Link>
      </div>

      {/* Search Overlay */}
      <Sheet open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <SheetContent side="top" className="bg-background-dark p-4 pt-16">
          <div className="flex items-center gap-2">
            <Input
              type="search"
              placeholder="Search movies..."
              className="flex-1 rounded-full border-border-gray bg-background-light px-4 py-2 text-text-white placeholder:text-gray-400 focus:border-primary-red focus:ring-primary-red"
            />
            <Button variant="ghost" size="icon" className="text-text-white" onClick={() => setIsSearchOpen(false)}>
              <X className="h-6 w-6" />
              <span className="sr-only">Close search</span>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}
