"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Header } from "@/components/header"
import { BottomNavigation } from "@/components/bottom-navigation"
import type { Movie } from "@/types/movie"
import { getMovieById } from "@/lib/api"
import { useFavorites } from "@/hooks/use-favorites"
import { useLanguage } from "@/hooks/use-language"
import { Play, Share2, Star, Clock, Calendar, Eye, ArrowLeft, Download, Plus } from "lucide-react"

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

  if (loading) {
    return <LoadingSpinner />
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
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
    <div className="min-h-screen bg-black">
      <Header />

      <main className="pb-20">
        {/* Hero Section */}
        <div className="relative h-[60vh] overflow-hidden">
          <Image src={movie.backdrop_url || movie.poster_url} alt={title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

          {/* Back Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="absolute top-4 left-4 text-white hover:bg-white/20 z-10"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              onClick={() => router.push(`/player/${movie.id}`)}
              size="lg"
              className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-2 border-white/30"
            >
              <Play className="h-10 w-10 fill-current ml-1" />
            </Button>
          </div>
        </div>

        {/* Movie Details */}
        <div className="px-4 py-6 space-y-6">
          {/* Title and Basic Info */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-white">{title}</h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <Badge className="bg-yellow-500 text-black font-bold">
                <Star className="h-3 w-3 mr-1 fill-current" />
                {movie.rating}/10 IMDb
              </Badge>

              <div className="flex items-center text-gray-400">
                <Calendar className="h-3 w-3 mr-1" />
                <span>{movie.year}</span>
              </div>

              <div className="flex items-center text-gray-400">
                <Clock className="h-3 w-3 mr-1" />
                <span>{movie.duration} min</span>
              </div>

              <div className="flex items-center text-gray-400">
                <Eye className="h-3 w-3 mr-1" />
                <span>{movie.views.toLocaleString()}</span>
              </div>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2">
              {movie.genre.map((genre) => (
                <Badge key={genre} variant="outline" className="border-gray-600 text-gray-300">
                  {genre}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={() => router.push(`/player/${movie.id}`)}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3"
              size="lg"
            >
              <Play className="h-5 w-5 mr-2 fill-current" />
              {language === "ar" ? "شاهد الآن" : "Watch Now"}
            </Button>

            <div className="flex space-x-3">
              <Button
                variant="outline"
                className="flex-1 border-gray-600 text-white hover:bg-gray-800 bg-transparent"
                onClick={handleFavoriteToggle}
              >
                <Plus className="h-4 w-4 mr-2" />
                {language === "ar" ? "إضافة للقائمة" : "Add to List"}
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="border-gray-600 text-white hover:bg-gray-800 bg-transparent"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="border-gray-600 text-white hover:bg-gray-800 bg-transparent"
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Description */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-white mb-3">
                {language === "ar" ? "نبذة عن الفيلم" : "About"}
              </h3>
              <p className="text-gray-300 leading-relaxed">{description}</p>
            </CardContent>
          </Card>
        </div>
      </main>

      <BottomNavigation />
    </div>
  )
}
