"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { LoadingSpinner } from "@/components/loading-spinner"
import type { Movie } from "@/types/movie"
import { getMovieById } from "@/lib/api"
import { useFavorites } from "@/hooks/use-favorites"
import { useLanguage } from "@/hooks/use-language"
import { Play, Heart, Share2, Star, Clock, Calendar, Eye, ArrowLeft } from "lucide-react"

export default function MovieDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { language } = useLanguage()
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites()
  const [movie, setMovie] = useState<Movie | null>(null)
  const [loading, setLoading] = useState(true)

  const movieId = params.id as string
  const isFavorite = favorites.includes(movieId)

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const movieData = await getMovieById(movieId)
        setMovie(movieData)
      } catch (error) {
        console.error("Error loading movie:", error)
      } finally {
        setLoading(false)
      }
    }

    if (movieId) {
      loadMovie()
    }
  }, [movieId])

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFromFavorites(movieId)
    } else {
      addToFavorites(movieId)
    }
  }

  const handleShare = async () => {
    if (navigator.share && movie) {
      try {
        await navigator.share({
          title: language === "ar" ? movie.title_ar : movie.title_en,
          text: language === "ar" ? movie.description_ar : movie.description_en,
          url: window.location.href,
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    }
  }

  const handlePlay = () => {
    if (movie) {
      router.push(`/player/${movie.id}`)
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Movie Not Found</h2>
          <p className="text-gray-400">The requested movie could not be found.</p>
        </div>
      </div>
    )
  }

  const title = language === "ar" ? movie.title_ar : movie.title_en
  const description = language === "ar" ? movie.description_ar : movie.description_en

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-sm border-b border-gray-800">
        <div className="flex items-center gap-4 p-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-white hover:bg-gray-800">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-white truncate">{title}</h1>
        </div>
      </div>

      {/* Movie Poster & Info */}
      <div className="relative">
        <div className="aspect-video relative overflow-hidden">
          <Image src={movie.poster_url || "/placeholder.svg"} alt={title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/50 to-transparent" />

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              onClick={handlePlay}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-16 h-16 p-0"
            >
              <Play className="h-8 w-8 ml-1" fill="currentColor" />
            </Button>
          </div>
        </div>

        {/* Movie Info */}
        <div className="px-4 py-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{movie.year}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{movie.duration || "120"} min</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>{movie.views.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleFavoriteToggle}
                className={`border-gray-600 ${
                  isFavorite
                    ? "bg-red-600 text-white border-red-600"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleShare}
                className="border-gray-600 text-gray-400 hover:text-white hover:bg-gray-800 bg-transparent"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Rating & Genres */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1 bg-yellow-600 text-black px-2 py-1 rounded">
              <Star className="h-4 w-4 fill-current" />
              <span className="font-semibold">{movie.rating}</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {movie.genre.map((genre) => (
                <Badge key={genre} variant="secondary" className="bg-gray-800 text-gray-300">
                  {genre}
                </Badge>
              ))}
            </div>
          </div>

          {/* Description */}
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
              <p className="text-gray-300 leading-relaxed">{description}</p>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <Button onClick={handlePlay} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white" size="lg">
              <Play className="h-5 w-5 mr-2 fill-current" />
              Watch Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
