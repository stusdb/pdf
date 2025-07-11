"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Movie } from "@/types/movie"
import { useFavorites } from "@/hooks/use-favorites"
import { useLanguage } from "@/hooks/use-language"
import { Heart, Star, Play, Plus, Clock } from "lucide-react"

interface ContentCardProps {
  movie: Movie
  variant?: "trending" | "popular" | "new"
  index?: number
}

export function ContentCard({ movie, variant = "trending", index = 0 }: ContentCardProps) {
  const { language } = useLanguage()
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites()
  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  const isFavorite = favorites.includes(movie.id)
  const title = language === "ar" ? movie.title_ar : movie.title_en

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isFavorite) {
      removeFromFavorites(movie.id)
    } else {
      addToFavorites(movie.id)
    }
  }

  const gradientMap = {
    trending: "from-purple-500/20 to-blue-500/20",
    popular: "from-pink-500/20 to-purple-500/20",
    new: "from-orange-500/20 to-red-500/20",
  }

  return (
    <Link href={`/movie/${movie.id}`}>
      <Card
        className={`group relative w-40 flex-shrink-0 glass-card border-white/10 hover:border-purple-500/50 card-hover animate-scale-in overflow-hidden`}
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className="relative aspect-[2/3]">
          {!imageError ? (
            <Image
              src={movie.poster_url || "/placeholder.svg"}
              alt={title}
              fill
              className={`object-cover transition-all duration-500 group-hover:scale-110 ${
                imageLoading ? "blur-sm opacity-0" : "blur-0 opacity-100"
              }`}
              onLoad={() => setImageLoading(false)}
              onError={() => {
                setImageError(true)
                setImageLoading(false)
              }}
              sizes="160px"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-900/50 to-blue-900/50 flex items-center justify-center">
              <Play className="h-12 w-12 text-purple-300" />
            </div>
          )}

          {/* Loading Skeleton */}
          {imageLoading && <div className="absolute inset-0 shimmer-effect" />}

          {/* Gradient Overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-t ${gradientMap[variant]} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
          />

          {/* Rating Badge */}
          <div className="absolute top-2 left-2">
            <Badge className="gradient-primary text-white font-bold text-xs glow-primary">
              <Star className="h-2 w-2 mr-1 fill-current" />
              {movie.rating}
            </Badge>
          </div>

          {/* Favorite Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleFavoriteToggle}
            className={`absolute top-2 right-2 w-8 h-8 rounded-full glass-button transition-all duration-300 ${
              isFavorite ? "text-red-400 glow-accent" : "text-white/70 hover:text-white"
            }`}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
          </Button>

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="w-14 h-14 gradient-primary rounded-full flex items-center justify-center glow-primary animate-pulse-glow">
              <Play className="h-6 w-6 text-white fill-current ml-1" />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="absolute bottom-2 left-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <Button size="sm" className="flex-1 glass-button text-xs">
              <Plus className="h-3 w-3 mr-1" />
              {language === "ar" ? "إضافة" : "Add"}
            </Button>
          </div>
        </div>

        {/* Movie Info */}
        <div className="p-3 space-y-2">
          <h3 className="text-white font-semibold text-sm line-clamp-2 group-hover:text-purple-300 transition-colors font-display">
            {title}
          </h3>
          <div className="flex items-center justify-between text-xs text-purple-300">
            <span>{movie.year}</span>
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{movie.duration}m</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}
