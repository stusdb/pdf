"use client"

import type React from "react"
import { Cairo } from "next/font/google"
import "./globals.css"
import { BottomNavigation } from "@/components/bottom-navigation"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Sidebar, SidebarToggle } from "@/components/sidebar"
import { LanguageProvider } from "@/contexts/language-context"
import { FavoritesProvider } from "@/contexts/favorites-context"
import { useState } from "react"

// 🔤 خط Cairo الجميل للعربية والإنجليزية
const cairo = Cairo({
  subsets: ["latin", "arabic"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
})

function LayoutContent({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* 📱 القائمة الجانبية */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* 📄 المحتوى الرئيسي */}
      <div className="flex-1 lg:ml-0">
        {/* 🔝 الشريط العلوي المحسن */}
        <header className="sticky top-0 z-40 backdrop-blur-xl bg-gray-950/80 border-b border-gray-800/50">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <SidebarToggle onClick={() => setSidebarOpen(true)} />

              {/* 🏷️ شعار محسن */}
              <div className="hidden lg:flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-black text-xl">V</span>
                </div>
                <h1 className="text-2xl font-black">
                  <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                    Vinmax
                  </span>
                </h1>
              </div>
            </div>

            <LanguageSwitcher />
          </div>
        </header>

        {/* 📱 المحتوى */}
        <main className="pb-20 lg:pb-4 min-h-screen">{children}</main>

        {/* 📱 التنقل السفلي للموبايل */}
        <div className="lg:hidden">
          <BottomNavigation />
        </div>
      </div>
    </div>
  )
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={cairo.className}>
        <LanguageProvider>
          <FavoritesProvider>
            <LayoutContent>{children}</LayoutContent>
          </FavoritesProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
