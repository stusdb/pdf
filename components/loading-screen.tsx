"use client"

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

export function LoadingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-6 px-4">
        {/* Logo */}
        <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
          <span className="text-white font-bold text-3xl">V</span>
        </div>

        {/* App Name */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Vinmax</h1>
          <p className="text-muted-foreground">أفضل تطبيق لمشاهدة الأفلام</p>
        </div>

        {/* Loading Spinner */}
        <div className="flex items-center justify-center space-x-3">
          <Loader2 className="h-6 w-6 text-green-500 animate-spin" />
          <span className="text-muted-foreground">جاري التحميل...</span>
        </div>

        {/* Progress Bar */}
        <div className="w-64 mx-auto">
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">{Math.round(progress)}%</p>
        </div>
      </div>
    </div>
  )
}
