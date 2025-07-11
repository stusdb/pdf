"use client"

import { useState } from "react"
import { Bell, Search, Menu, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"
import Link from "next/link"

export function TopNavigation() {
  const { language } = useLanguage()
  const [notifications] = useState(5)

  return (
    <header className="sticky top-0 z-50 glass-morphism border-b border-white/10">
      <div className="flex items-center justify-between px-4 py-4">
        {/* Logo Section */}
        <Link href="/" className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center shadow-lg glow-primary">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-pink-500 to-red-500 rounded-full animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-xl font-display">CineMax</span>
            <span className="text-purple-300 text-xs font-medium">
              {language === "ar" ? "عالم السينما" : "Cinema World"}
            </span>
          </div>
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          {/* Search */}
          <Link href="/search">
            <Button variant="ghost" size="icon" className="relative glass-button hover:glow-secondary">
              <Search className="h-5 w-5 text-white" />
            </Button>
          </Link>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative glass-button hover:glow-accent">
            <Bell className="h-5 w-5 text-white" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 w-6 h-6 gradient-accent text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse-glow">
                {notifications}
              </span>
            )}
          </Button>

          {/* Menu */}
          <Button variant="ghost" size="icon" className="glass-button hover:glow-primary">
            <Menu className="h-5 w-5 text-white" />
          </Button>
        </div>
      </div>
    </header>
  )
}
