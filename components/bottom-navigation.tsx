"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, Grid3X3, Heart, Search } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

export function BottomNavigation() {
  const pathname = usePathname()
  const { language } = useLanguage()

  const navItems = [
    {
      href: "/",
      icon: Home,
      label: language === "ar" ? "الرئيسية" : "Home",
      active: pathname === "/",
    },
    {
      href: "/categories",
      icon: Grid3X3,
      label: language === "ar" ? "الفئات" : "Categories",
      active: pathname.startsWith("/categories"),
    },
    {
      href: "/favorites",
      icon: Heart,
      label: language === "ar" ? "المفضلة" : "Favorites",
      active: pathname === "/favorites",
    },
    {
      href: "/search",
      icon: Search,
      label: language === "ar" ? "البحث" : "Search",
      active: pathname === "/search",
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 z-50">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                item.active ? "text-blue-500" : "text-gray-400 hover:text-white"
              }`}
            >
              <Icon className={`h-6 w-6 mb-1 ${item.active && item.href === "/favorites" ? "fill-current" : ""}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
