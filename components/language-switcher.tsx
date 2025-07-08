"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"
import { Languages } from "lucide-react"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en")
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggleLanguage} className="text-white hover:bg-gray-800">
      <Languages className="h-5 w-5" />
      <span className="sr-only">Switch Language</span>
    </Button>
  )
}
