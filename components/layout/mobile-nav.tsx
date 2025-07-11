"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Film, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

export default function MobileNav() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/search", icon: Film, label: "Movies" }, // Changed from Anime Movies to general Movies for search
    { href: "/trending", icon: TrendingUp, label: "Trending" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-border-gray bg-background-dark shadow-lg md:hidden">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex flex-col items-center gap-1 text-xs font-medium transition-colors",
            pathname === item.href ? "text-primary-red" : "text-gray-400 hover:text-text-white",
          )}
          prefetch={false}
        >
          <item.icon className="h-6 w-6" />
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  )
}
