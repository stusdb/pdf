"use client"

import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { Tajawal, Cinzel_Decorative, Baloo_Bhaijaan_2 } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import Header from "@/components/layout/header"
import MobileNav from "@/components/layout/mobile-nav"
import Sidebar from "@/components/layout/sidebar"
import { useState } from "react"

const inter = Inter({ subsets: ["latin"] })

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  variable: "--font-tajawal",
  display: "swap",
})

const cinzelDecorative = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-cinzel",
  display: "swap",
})

const balooBhaijaan2 = Baloo_Bhaijaan_2({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-baloo",
  display: "swap",
})

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <html lang="en" className={`${tajawal.variable} ${cinzelDecorative.variable} ${balooBhaijaan2.variable}`}>
      <body className={cn("min-h-screen bg-background-dark font-tajawal antialiased", inter.className)}>
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <main className="pt-16 pb-16 md:pb-0">
          {" "}
          {/* Adjust padding for fixed header/footer */}
          {children}
        </main>
        <MobileNav />
        <Toaster />
      </body>
    </html>
  )
}
