import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { BottomNavigation } from "@/components/bottom-navigation"
import { LanguageSwitcher } from "@/components/language-switcher"
import { LanguageProvider } from "@/contexts/language-context"
import { FavoritesProvider } from "@/contexts/favorites-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Vinmax - Movie Streaming App",
  description: "Professional movie streaming application with dark theme",
  manifest: "/manifest.json",
  themeColor: "#111827",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-950`}>
        <LanguageProvider>
          <FavoritesProvider>
            {/* Top Bar */}
            <header className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-sm border-b border-gray-800">
              <div className="flex items-center justify-between p-4">
                <h1 className="text-2xl font-bold text-white">Vinmax</h1>
                <LanguageSwitcher />
              </div>
            </header>

            {/* Main Content */}
            <main className="pb-20">{children}</main>

            {/* Bottom Navigation */}
            <BottomNavigation />
          </FavoritesProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
