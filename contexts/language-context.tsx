"use client"

import { createContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "ar"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    // Load language from localStorage
    const savedLanguage = localStorage.getItem("vinmax-language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ar")) {
      setLanguage(savedLanguage)
    } else {
      // Auto-detect device language
      const deviceLanguage = navigator.language.toLowerCase()
      if (deviceLanguage.startsWith("ar")) {
        setLanguage("ar")
      }
    }
  }, [])

  const handleSetLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage)
    localStorage.setItem("vinmax-language", newLanguage)

    // Update document direction for RTL support
    document.documentElement.dir = newLanguage === "ar" ? "rtl" : "ltr"
    document.documentElement.lang = newLanguage
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>{children}</LanguageContext.Provider>
  )
}
