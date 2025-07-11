"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"
import { Zap, Compass, Heart, Download } from "lucide-react"

export function QuickActions() {
  const { language } = useLanguage()

  const actions = [
    {
      icon: Zap,
      label: language === "ar" ? "سريع" : "Quick",
      href: "/trending",
      gradient: "gradient-primary",
      glow: "glow-primary",
    },
    {
      icon: Compass,
      label: language === "ar" ? "استكشف" : "Explore",
      href: "/categories",
      gradient: "gradient-secondary",
      glow: "glow-secondary",
    },
    {
      icon: Heart,
      label: language === "ar" ? "مفضلة" : "Favorites",
      href: "/favorites",
      gradient: "gradient-accent",
      glow: "glow-accent",
    },
    {
      icon: Download,
      label: language === "ar" ? "تحميل" : "Downloads",
      href: "/downloads",
      gradient: "gradient-dark",
      glow: "glow-primary",
    },
  ]

  return (
    <section className="px-4 py-6">
      <div className="grid grid-cols-4 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon
          return (
            <Link key={action.href} href={action.href}>
              <Button
                variant="ghost"
                className={`h-20 w-full flex-col space-y-2 glass-card hover:${action.glow} transition-all duration-300 animate-slide-in-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-10 h-10 ${action.gradient} rounded-2xl flex items-center justify-center`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <span className="text-white text-xs font-medium">{action.label}</span>
              </Button>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
