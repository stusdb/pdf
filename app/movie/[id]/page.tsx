"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { LoadingScreen } from "@/components/loading-screen"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import type { Movie } from "@/types/movie"
import { getMovieById } from "@/lib/api"
import { useFavorites } from "@/hooks/use-favorites"
import { useLanguage } from "@/hooks/use-language"
import { Play, Share2, Star, Clock, Calendar, Eye, Heart, Download } from "lucide-react"

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
    return <LoadingScreen />
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center text-foreground">
          <h2 className="text-2xl font-bold mb-2">Movie Not Found</h2>
          <p className="text-muted-foreground">The requested movie could not be found.</p>
        </div>
      </div>
    )
  }

  const title = language === "ar" ? movie.title_ar : movie.title_en
  const description = language === "ar" ? movie.description_ar : movie.description_en

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pb-20">
        {/* Hero Section */}
        <div className="relative h-[45vh] overflow-hidden">
          <Image src={movie.backdrop_url || movie.poster_url} alt={title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              onClick={() => router.push(`/player/${movie.id}`)}
              size="lg"
              className="w-16 h-16 rounded-full bg-green-500/90 backdrop-blur-sm hover:bg-green-600 text-white shadow-2xl"
            >
              <Play className="h-8 w-8 fill-current ml-1" />
            </Button>
          </div>
        </div>

        {/* Movie Details */}
        <div className="px-4 py-6 space-y-6">
          {/* Title and Basic Info */}
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-foreground leading-tight">{title}</h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <Badge className="bg-yellow-500 text-black font-bold">
                <Star className="h-3 w-3 mr-1 fill-current" />
                {movie.rating}
              </Badge>

              <div className="flex items-center text-muted-foreground">
                <Calendar className="h-3 w-3 mr-1" />
                <span>{movie.year}</span>
              </div>

              <div className="flex items-center text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                <span>{movie.duration} min</span>
              </div>

              <div className="flex items-center text-muted-foreground">
                <Eye className="h-3 w-3 mr-1" />
                <span>{(movie.views / 1000000).toFixed(1)}M</span>
              </div>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2">
              {movie.genre.map((genre) => (
                <Badge key={genre} variant="outline" className="border-border text-muted-foreground">
                  {genre}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={() => router.push(`/player/${movie.id}`)}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 text-lg"
              size="lg"
            >
              <Play className="h-5 w-5 mr-2 fill-current" />
              {language === "ar" ? "مشاهدة الآن" : "Watch Now"}
            </Button>

            <div className="grid grid-cols-3 gap-3">
              <Button
                variant="outline"
                className="flex-1 border-border text-foreground hover:bg-muted bg-transparent"
                onClick={handleFavoriteToggle}
              >
                <Heart className={`h-4 w-4 mr-2 ${isFavorite ? "fill-current text-red-500" : ""}`} />
                {language === "ar" ? "مفضلة" : "Favorite"}
              </Button>

              <Button
                variant="outline"
                className="border-border text-foreground hover:bg-muted bg-transparent"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4 mr-2" />
                {language === "ar" ? "مشاركة" : "Share"}
              </Button>

              <Button variant="outline" className="border-border text-foreground hover:bg-muted bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                {language === "ar" ? "تحميل" : "Download"}
              </Button>
            </div>
          </div>

          {/* Description */}
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {language === "ar" ? "نبذة عن الفيلم" : "About"}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{description}</p>
            </CardContent>
          </Card>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
