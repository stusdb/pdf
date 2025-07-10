"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"
import { usePathname } from "next/navigation"
import {
  Home,
  Grid3X3,
  Heart,
  Search,
  TrendingUp,
  Clock,
  Star,
  Film,
  Tv,
  Download,
  Settings,
  User,
  X,
  Menu,
} from "lucide-react"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { language } = useLanguage()
  const pathname = usePathname()

  // 📋 قائمة الروابط الرئيسية
  const mainLinks = [
    {
      href: "/",
      icon: Home,
      label: language === "ar" ? "الرئيسية" : "Home",
      active: pathname === "/",
    },
    {
      href: "/trending",
      icon: TrendingUp,
      label: language === "ar" ? "الرائج" : "Trending",
      active: pathname === "/trending",
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
  ]

  // 📚 قائمة المكتبة
  const libraryLinks = [
    {
      href: "/favorites",
      icon: Heart,
      label: language === "ar" ? "المفضلة" : "Favorites",
      active: pathname === "/favorites",
    },
    {
      href: "/watchlist",
      icon: Clock,
      label: language === "ar" ? "قائمة المشاهدة" : "Watchlist",
      active: pathname === "/watchlist",
    },
    {
      href: "/history",
      icon: Clock,
      label: language === "ar" ? "المشاهدة مؤخراً" : "Recently Watched",
      active: pathname === "/history",
    },
    {
      href: "/downloads",
      icon: Download,
      label: language === "ar" ? "التحميلات" : "Downloads",
      active: pathname === "/downloads",
    },
  ]

  // 🎬 قائمة المحتوى
  const contentLinks = [
    {
      href: "/movies",
      icon: Film,
      label: language === "ar" ? "الأفلام" : "Movies",
      active: pathname === "/movies",
    },
    {
      href: "/series",
      icon: Tv,
      label: language === "ar" ? "المسلسلات" : "TV Series",
      active: pathname === "/series",
    },
    {
      href: "/top-rated",
      icon: Star,
      label: language === "ar" ? "الأعلى تقييماً" : "Top Rated",
      active: pathname === "/top-rated",
    },
  ]

  return (
    <>
      {/* 🌫️ خلفية شفافة للموبايل */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />}

      {/* 📱 القائمة الجانبية */}
      <aside
        className={`
        fixed top-0 left-0 h-full w-80 bg-gradient-to-b from-gray-900 to-gray-950 
        border-r border-gray-800 z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:z-auto
      `}
      >
        {/* 🔝 رأس القائمة */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">V</span>
            </div>
            <h1 className="text-2xl font-black text-white">
              <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">Vinmax</span>
            </h1>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="lg:hidden text-gray-400 hover:text-white hover:bg-gray-800"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* 📜 محتوى القائمة */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* 🏠 الروابط الرئيسية */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
              {language === "ar" ? "الرئيسية" : "Main"}
            </h3>
            <nav className="space-y-1">
              {mainLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link key={link.href} href={link.href} onClick={onClose}>
                    <div
                      className={`
                      flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200
                      ${
                        link.active
                          ? "bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-400 border border-orange-500/30"
                          : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                      }
                    `}
                    >
                      <Icon className={`h-5 w-5 ${link.active ? "text-orange-400" : ""}`} />
                      <span className="font-medium">{link.label}</span>
                    </div>
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* 📚 المكتبة */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
              {language === "ar" ? "مكتبتي" : "My Library"}
            </h3>
            <nav className="space-y-1">
              {libraryLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link key={link.href} href={link.href} onClick={onClose}>
                    <div
                      className={`
                      flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200
                      ${
                        link.active
                          ? "bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-400 border border-orange-500/30"
                          : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                      }
                    `}
                    >
                      <Icon className={`h-5 w-5 ${link.active ? "text-orange-400" : ""}`} />
                      <span className="font-medium">{link.label}</span>
                    </div>
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* 🎬 المحتوى */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
              {language === "ar" ? "المحتوى" : "Content"}
            </h3>
            <nav className="space-y-1">
              {contentLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link key={link.href} href={link.href} onClick={onClose}>
                    <div
                      className={`
                      flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200
                      ${
                        link.active
                          ? "bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-400 border border-orange-500/30"
                          : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                      }
                    `}
                    >
                      <Icon className={`h-5 w-5 ${link.active ? "text-orange-400" : ""}`} />
                      <span className="font-medium">{link.label}</span>
                    </div>
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>

        {/* 👤 ملف المستخدم */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/50 hover:bg-gray-800 transition-colors cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-white font-medium">{language === "ar" ? "المستخدم" : "User"}</p>
              <p className="text-gray-400 text-sm">{language === "ar" ? "الملف الشخصي" : "Profile"}</p>
            </div>
            <Settings className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </aside>
    </>
  )
}

// 🔘 زر فتح القائمة الجانبية
export function SidebarToggle({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className="lg:hidden text-white hover:bg-gray-800 hover:text-orange-400"
    >
      <Menu className="h-6 w-6" />
    </Button>
  )
}
