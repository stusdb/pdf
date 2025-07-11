"use client"

import { cn } from "@/lib/utils"

interface SkeletonProps {
  className?: string
  variant?: "default" | "card" | "text" | "avatar" | "button"
}

export function Skeleton({ className, variant = "default" }: SkeletonProps) {
  const variants = {
    default: "h-4 w-full",
    card: "h-48 w-full",
    text: "h-4 w-3/4",
    avatar: "h-12 w-12 rounded-full",
    button: "h-10 w-24",
  }

  return <div className={cn("shimmer rounded-md", variants[variant], className)} />
}

// مكونات هيكل عظمي متخصصة
export function MovieCardSkeleton() {
  return (
    <div className="w-40 flex-shrink-0 space-y-3 animate-fade-in">
      <Skeleton className="aspect-[2/3] w-full rounded-xl" />
      <div className="space-y-2 px-1">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-3 w-2/3" />
        <div className="flex justify-between">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    </div>
  )
}

export function HeroSkeleton() {
  return (
    <div className="relative h-[60vh] overflow-hidden">
      <Skeleton className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      <div className="absolute bottom-6 left-6 space-y-4 w-full max-w-md">
        <div className="flex items-center space-x-3">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex space-x-4">
          <Skeleton className="h-12 w-32 rounded-xl" />
          <Skeleton className="h-12 w-24 rounded-xl" />
        </div>
      </div>
    </div>
  )
}

export function ContentCarouselSkeleton() {
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between px-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-6 w-20" />
      </div>
      <div className="flex space-x-4 px-2 overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <MovieCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
