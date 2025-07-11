"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ImageIcon } from "lucide-react"

interface EnhancedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  priority?: boolean
  sizes?: string
  onLoad?: () => void
  onError?: () => void
  fallback?: React.ReactNode
}

export function EnhancedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className,
  priority = false,
  sizes,
  onLoad,
  onError,
  fallback,
}: EnhancedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
    onLoad?.()
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
    onError?.()
  }

  if (hasError) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gradient-to-br from-brand-900/50 to-cinema-900/50 text-muted-foreground",
          className,
        )}
      >
        {fallback || (
          <div className="flex flex-col items-center space-y-2">
            <ImageIcon className="h-8 w-8" />
            <span className="text-xs">صورة غير متاحة</span>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Loading Skeleton */}
      {isLoading && <div className="absolute inset-0 shimmer animate-pulse" />}

      {/* Image */}
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        priority={priority}
        sizes={sizes}
        className={cn(
          "object-cover transition-all duration-500",
          isLoading ? "opacity-0 scale-110" : "opacity-100 scale-100",
        )}
        onLoad={handleLoad}
        onError={handleError}
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/20">
          <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  )
}
