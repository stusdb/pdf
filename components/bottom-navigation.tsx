"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, Grid3X3, Search, Heart, User } from "lucide-react"
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
      label: language === "ar" ? "التصنيفات" : "Categories",
      active: pathname.startsWith("/categories"),
    },
    {
      href: "/search",
      icon: Search,
      label: language === "ar" ? "البحث" : "Search",
      active: pathname === "/search",
    },
    {
      href: "/favorites",
      icon: Heart,
      label: language === "ar" ? "المفضلة" : "Favorites",
      active: pathname === "/favorites",
    },
    {
      href: "/profile",
      icon: User,
      label: language === "ar" ? "الملف الشخصي" : "Profile",
      active: pathname === "/profile",
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md border-t border-white/10 z-50">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                item.active ? "text-purple-400" : "text-gray-400 hover:text-white"
              }`}
            >
              <Icon className={`h-5 w-5 mb-1 ${item.active && item.href === "/favorites" ? "fill-current" : ""}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
