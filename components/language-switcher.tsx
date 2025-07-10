"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"
import { Globe } from "lucide-react"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
      className="text-white hover:bg-white/10"
    >
      <Globe className="h-5 w-5" />
    </Button>
  )
}
