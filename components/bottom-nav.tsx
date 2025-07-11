"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, Search, Heart, Grid3X3, User } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

export function BottomNav() {
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
      href: "/search",
      icon: Search,
      label: language === "ar" ? "البحث" : "Search",
      active: pathname === "/search",
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
      href: "/profile",
      icon: User,
      label: language === "ar" ? "الملف" : "Profile",
      active: pathname === "/profile",
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-md border-t border-border z-50">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200 touch-manipulation ${
                item.active
                  ? "text-green-500 bg-green-500/10"
                  : "text-muted-foreground hover:text-foreground active:scale-95"
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
