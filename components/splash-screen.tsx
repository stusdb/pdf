"use client"

import { useEffect, useState } from "react"
import { Sparkles, Play, Star } from "lucide-react"

export function SplashScreen() {
  const [progress, setProgress] = useState(0)
  const [stage, setStage] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + Math.random() * 12
      })
    }, 120)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const stageTimer = setInterval(() => {
      setStage((prev) => (prev + 1) % 3)
    }, 1000)

    return () => clearInterval(stageTimer)
  }, [])

  const messages = ["تحضير المحتوى...", "تحميل الأفلام...", "تجهيز التجربة..."]

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 gradient-primary rounded-full opacity-10 animate-float" />
        <div
          className="absolute bottom-32 right-16 w-24 h-24 gradient-secondary rounded-full opacity-15 animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-10 w-16 h-16 gradient-accent rounded-full opacity-20 animate-float"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="text-center space-y-8 px-6 relative z-10">
        {/* Logo Animation */}
        <div className="relative">
          <div className="w-24 h-24 gradient-primary rounded-3xl flex items-center justify-center mx-auto shadow-2xl glow-primary animate-pulse-glow">
            <Sparkles className="h-12 w-12 text-white animate-spin" style={{ animationDuration: "3s" }} />
          </div>

          {/* Floating Icons */}
          <div className="absolute -top-2 -right-2 w-8 h-8 gradient-secondary rounded-full flex items-center justify-center animate-bounce">
            <Play className="h-4 w-4 text-white fill-current" />
          </div>
          <div
            className="absolute -bottom-2 -left-2 w-8 h-8 gradient-accent rounded-full flex items-center justify-center animate-bounce"
            style={{ animationDelay: "0.5s" }}
          >
            <Star className="h-4 w-4 text-white fill-current" />
          </div>
        </div>

        {/* App Name */}
        <div className="space-y-3">
          <h1 className="text-5xl font-black text-white font-display animate-slide-in-up">
            <span className="gradient-primary bg-clip-text text-transparent">CineMax</span>
          </h1>
          <p className="text-purple-300 text-lg font-medium animate-slide-in-up" style={{ animationDelay: "0.2s" }}>
            عالم السينما في جيبك
          </p>
        </div>

        {/* Loading Animation */}
        <div className="space-y-4 animate-slide-in-up" style={{ animationDelay: "0.4s" }}>
          <div className="flex items-center justify-center space-x-3">
            <div className="w-2 h-2 gradient-primary rounded-full animate-bounce" />
            <div
              className="w-2 h-2 gradient-secondary rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            />
            <div className="w-2 h-2 gradient-accent rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
          </div>

          <p className="text-purple-200 font-medium">{messages[stage]}</p>
        </div>

        {/* Progress Bar */}
        <div className="w-80 mx-auto space-y-3 animate-slide-in-up" style={{ animationDelay: "0.6s" }}>
          <div className="relative w-full h-2 glass-card rounded-full overflow-hidden">
            <div
              className="h-full gradient-primary transition-all duration-300 glow-primary"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-purple-300">
            <span>جاري التحميل...</span>
            <span className="font-bold">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-3 gap-4 mt-8 animate-slide-in-up" style={{ animationDelay: "0.8s" }}>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center mx-auto">
              <Play className="h-6 w-6 text-white" />
            </div>
            <p className="text-purple-200 text-xs">مشاهدة فورية</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 gradient-secondary rounded-2xl flex items-center justify-center mx-auto">
              <Star className="h-6 w-6 text-white" />
            </div>
            <p className="text-purple-200 text-xs">جودة عالية</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 gradient-accent rounded-2xl flex items-center justify-center mx-auto">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <p className="text-purple-200 text-xs">تجربة مميزة</p>
          </div>
        </div>
      </div>
    </div>
  )
}
