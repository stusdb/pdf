"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Movie } from "@/types/movie"
import { useFavorites } from "@/hooks/use-favorites"
import { useLanguage } from "@/hooks/use-language"
import { Heart, Star, Eye, Play } from "lucide-react"

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
      <Card className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-all duration-300 group overflow-hidden">
        <CardContent className="p-0">
          {/* Movie Poster */}
          <div className="relative aspect-[2/3] overflow-hidden">
            {!imageError ? (
              <Image
                src={movie.poster_url || "/placeholder.svg"}
                alt={title}
                fill
                className={`object-cover transition-all duration-300 group-hover:scale-105 ${
                  imageLoading ? "blur-sm" : "blur-0"
                }`}
                onLoad={() => setImageLoading(false)}
                onError={() => {
                  setImageError(true)
                  setImageLoading(false)
                }}
              />
            ) : (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <div className="text-gray-400 text-center">
                  <div className="text-4xl mb-2">🎬</div>
                  <p className="text-sm">Image not available</p>
                </div>
              </div>
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-4 left-4 right-4">
                <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-2">
                  <Play className="h-4 w-4 mr-2 fill-current" />
                  {language === "ar" ? "مشاهدة" : "Watch"}
                </Button>
              </div>
            </div>

            {/* Favorite Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleFavoriteToggle}
              className={`absolute top-2 right-2 w-8 h-8 rounded-full ${
                isFavorite ? "bg-red-600 text-white hover:bg-red-700" : "bg-black/50 text-white hover:bg-black/70"
              }`}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
            </Button>

            {/* Rating Badge */}
            <div className="absolute top-2 left-2">
              <Badge className="bg-yellow-600 text-black font-semibold">
                <Star className="h-3 w-3 mr-1 fill-current" />
                {movie.rating}
              </Badge>
            </div>
          </div>

          {/* Movie Info */}
          <div className="p-3">
            <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2 leading-tight">{title}</h3>

            <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
              <span>{movie.year}</span>
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                <span>{(movie.views / 1000).toFixed(0)}K</span>
              </div>
            </div>

            <div className="flex gap-1 flex-wrap">
              {movie.genre.slice(0, 2).map((genre) => (
                <Badge key={genre} variant="secondary" className="text-xs bg-gray-800 text-gray-300 px-2 py-0">
                  {genre}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
