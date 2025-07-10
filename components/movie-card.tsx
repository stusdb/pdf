"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Movie } from "@/types/movie"
import { useLanguage } from "@/hooks/use-language"
import { Star, Play } from "lucide-react"

interface MovieCardProps {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  const { language } = useLanguage()
  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  const title = language === "ar" ? movie.title_ar : movie.title_en

  return (
    <Link href={`/movie/${movie.id}`}>
      <Card className="group bg-gray-900/50 border-gray-800/50 hover:border-purple-500/50 transition-all duration-300 overflow-hidden hover:scale-105">
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
              sizes="(max-width: 768px) 33vw, (max-width: 1200px) 25vw, 16vw"
            />
          ) : (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
              <Play className="h-8 w-8 text-gray-400" />
            </div>
          )}

          {/* Loading Skeleton */}
          {imageLoading && <div className="absolute inset-0 bg-gray-800 animate-pulse" />}

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Rating Badge */}
          <div className="absolute top-2 left-2">
            <Badge className="bg-yellow-500 text-black font-bold text-xs">
              <Star className="h-2 w-2 mr-1 fill-current" />
              {movie.rating}
            </Badge>
          </div>

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Play className="h-6 w-6 text-white fill-current ml-1" />
            </div>
          </div>
        </div>

        {/* Movie Info */}
        <div className="p-3 space-y-1">
          <h3 className="text-white font-medium text-sm line-clamp-2 group-hover:text-purple-400 transition-colors">
            {title}
          </h3>
          <p className="text-gray-400 text-xs">{movie.year}</p>
        </div>
      </Card>
    </Link>
  )
}
