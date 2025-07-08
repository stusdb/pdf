"use client"

import { useState, useEffect } from "react"
import { MovieCard } from "@/components/movie-card"
import { LoadingSpinner } from "@/components/loading-spinner"
import type { Movie } from "@/types/movie"
import { getMovieById } from "@/lib/api"
import { useFavorites } from "@/hooks/use-favorites"
import { useLanguage } from "@/hooks/use-language"
import { Heart } from "lucide-react"

export default function FavoritesPage() {
  const { language } = useLanguage()
  const { favorites } = useFavorites()
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadFavoriteMovies = async () => {
      try {
        const movies = await Promise.all(favorites.map((id) => getMovieById(id)))
        setFavoriteMovies(movies.filter(Boolean))
      } catch (error) {
        console.error("Error loading favorite movies:", error)
      } finally {
        setLoading(false)
      }
    }

    if (favorites.length > 0) {
      loadFavoriteMovies()
    } else {
      setLoading(false)
    }
  }, [favorites])

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-gray-950 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="h-8 w-8 text-red-500 fill-current" />
          <h1 className="text-3xl font-bold text-white">{language === "ar" ? "المفضلة" : "Favorites"}</h1>
        </div>

        {favoriteMovies.length === 0 ? (
          <div className="text-center text-gray-400 mt-12">
            <Heart className="h-16 w-16 mx-auto mb-4 text-gray-600" />
            <h2 className="text-2xl font-semibold mb-2">
              {language === "ar" ? "لا توجد أفلام مفضلة" : "No Favorite Movies"}
            </h2>
            <p className="text-lg">
              {language === "ar" ? "ابدأ بإضافة أفلام إلى قائمة المفضلة" : "Start adding movies to your favorites list"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {favoriteMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
