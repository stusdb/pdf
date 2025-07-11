"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, Search, Grid3X3, Heart, User } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

export function BottomTabBar() {
  const pathname = usePathname()
  const { language } = useLanguage()

  const tabs = [
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
      label: language === "ar" ? "الفئات" : "Browse",
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
    <nav className="fixed bottom-0 left-0 right-0 glass-morphism border-t border-white/10 z-50">
      <div className="flex items-center justify-around py-2">
        {tabs.map((tab, index) => {
          const Icon = tab.icon
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center py-3 px-4 rounded-2xl transition-all duration-300 touch-action-manipulation ${
                tab.active
                  ? "gradient-primary text-white glow-primary scale-110"
                  : "text-purple-300 hover:text-white active:scale-95"
              }`}
            >
              <Icon className={`h-5 w-5 mb-1 ${tab.active && tab.href === "/favorites" ? "fill-current" : ""}`} />
              <span className="text-xs font-medium font-body">{tab.label}</span>
              {tab.active && <div className="absolute -bottom-1 w-1 h-1 gradient-primary rounded-full glow-primary" />}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
