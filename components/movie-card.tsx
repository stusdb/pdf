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
import { Heart, Star, Play } from "lucide-react"

interface MovieCardProps {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
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

  return (
    <Link href={`/movie/${movie.id}`}>
      <Card className="group bg-card border-border hover:border-green-500/50 transition-all duration-300 overflow-hidden hover:scale-[1.02] active:scale-[0.98]">
        <div className="relative aspect-[2/3]">
          {!imageError ? (
            <Image
              src={movie.poster_url || "/placeholder.svg"}
              alt={title}
              fill
              className={`object-cover transition-all duration-500 ${
                imageLoading ? "blur-sm opacity-0" : "blur-0 opacity-100"
              }`}
              onLoad={() => setImageLoading(false)}
              onError={() => {
                setImageError(true)
                setImageLoading(false)
              }}
              sizes="(max-width: 640px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <Play className="h-8 w-8 text-muted-foreground" />
            </div>
          )}

          {/* Loading Skeleton */}
          {imageLoading && <div className="absolute inset-0 bg-muted animate-pulse" />}

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Rating Badge */}
          <div className="absolute top-2 left-2">
            <Badge className="bg-yellow-500 text-black font-bold text-xs">
              <Star className="h-2 w-2 mr-1 fill-current" />
              {movie.rating}
            </Badge>
          </div>

          {/* Favorite Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleFavoriteToggle}
            className={`absolute top-2 right-2 w-8 h-8 rounded-full transition-all duration-300 ${
              isFavorite ? "bg-red-500/90 text-white hover:bg-red-600" : "bg-black/30 text-white hover:bg-black/50"
            }`}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
          </Button>

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-12 h-12 bg-green-500/90 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Play className="h-6 w-6 text-white fill-current ml-0.5" />
            </div>
          </div>
        </div>

        {/* Movie Info */}
        <div className="p-3 space-y-1">
          <h3 className="text-foreground font-semibold text-sm line-clamp-2 group-hover:text-green-400 transition-colors">
            {title}
          </h3>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{movie.year}</span>
            <span>{movie.duration} min</span>
          </div>
        </div>
      </Card>
    </Link>
  )
}
