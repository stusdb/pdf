import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { LanguageProvider } from "@/contexts/language-context"
import { FavoritesProvider } from "@/contexts/favorites-context"
import { StateProvider } from "@/contexts/state-context"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: "CineMax - عالم السينما في جيبك",
  description: "تطبيق احترافي لمشاهدة الأفلام والمسلسلات بجودة عالية مع تجربة مستخدم مميزة",
  manifest: "/manifest.json",
  themeColor: "#ed4bff",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  keywords: "أفلام, مسلسلات, مشاهدة, ترفيه, سينما, movies, streaming, entertainment, CineMax",
  authors: [{ name: "CineMax Team" }],
  openGraph: {
    title: "CineMax - عالم السينما في جيبك",
    description: "اكتشف واستمتع بأحدث الأفلام والمسلسلات على منصتنا الاحترافية",
    type: "website",
    locale: "ar_SA",
    siteName: "CineMax",
  },
  twitter: {
    card: "summary_large_image",
    title: "CineMax - عالم السينما في جيبك",
    description: "تطبيق احترافي لمشاهدة الأفلام والمسلسلات",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" className="dark">
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <StateProvider>
            <LanguageProvider>
              <FavoritesProvider>
                <div className="relative min-h-screen bg-background">
                  {children}
                  <Toaster />
                </div>
              </FavoritesProvider>
            </LanguageProvider>
          </StateProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
