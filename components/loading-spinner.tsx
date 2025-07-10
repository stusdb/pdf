"use client"

import { Loader2, Star } from "lucide-react"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  text?: string
}

export function LoadingSpinner({ size = "md", text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center space-y-4">
        {/* Logo */}
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto">
          <span className="text-white font-bold text-2xl">V</span>
        </div>

        {/* App Name */}
        <h1 className="text-white text-2xl font-bold">Vinmax</h1>

        {/* Loading Spinner */}
        <div className="flex items-center justify-center space-x-2">
          <Loader2 className="h-6 w-6 text-purple-400 animate-spin" />
          <span className="text-gray-400">Loading...</span>
        </div>
      </div>
    </div>
  )
}

// مكون تحميل للصفحة الكاملة
export function FullPageLoader() {
  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center space-y-6">
        {/* شعار متحرك */}
        <div className="relative">
          <div className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent animate-pulse">
            VINMAX
          </div>
          <div className="absolute -top-2 -right-2">
            <Star className="w-6 h-6 text-yellow-500 animate-spin" />
          </div>
        </div>

        <LoadingSpinner size="lg" text="Loading amazing content..." />

        <p className="text-gray-400 text-sm max-w-md">Preparing your ultimate movie streaming experience</p>
      </div>
    </div>
  )
}

// مكون تحميل للبطاقات
export function CardSkeleton() {
  return (
    <div className="bg-gray-900/40 border border-gray-800/30 rounded-xl overflow-hidden animate-pulse">
      <div className="aspect-[2/3] bg-gray-800 shimmer" />
      <div className="p-3 space-y-2">
        <div className="h-4 bg-gray-800 rounded shimmer" />
        <div className="h-3 bg-gray-800 rounded w-3/4 shimmer" />
        <div className="flex gap-2">
          <div className="h-5 bg-gray-800 rounded w-12 shimmer" />
          <div className="h-5 bg-gray-800 rounded w-16 shimmer" />
        </div>
      </div>
    </div>
  )
}
