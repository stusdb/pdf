import type React from "react"
import type { Metadata } from "next"
import ClientLayout from "./client-layout"

export const metadata: Metadata = {
  title: "Vinmax - أفضل منصة لمشاهدة الأفلام",
  description: "منصة احترافية لمشاهدة الأفلام والمسلسلات بجودة عالية مع دعم اللغة العربية",
  manifest: "/manifest.json",
  themeColor: "#ff6b35",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  keywords: "أفلام, مسلسلات, مشاهدة, ترفيه, سينما, movies, streaming, entertainment",
  authors: [{ name: "Vinmax Team" }],
  openGraph: {
    title: "Vinmax - أفضل منصة لمشاهدة الأفلام",
    description: "اكتشف واستمتع بأحدث الأفلام والمسلسلات على منصتنا الاحترافية",
    type: "website",
    locale: "ar_SA",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}


import './globals.css'
