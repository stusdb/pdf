"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MovieCard } from "@/components/movie-card"
import { LoadingSpinner } from "@/components/loading-spinner"
import type { Movie } from "@/types/movie"
import { getMoviesByGenre } from "@/lib/api"
import { useLanguage } from "@/hooks/use-language"
import { ArrowLeft } from "lucide-react"

export default function GenreMoviesPage() {
  const params = useParams()
  const router = useRouter()
  const { language } = useLanguage()
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  const genre = decodeURIComponent(params.genre as string)

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const movieList = await getMoviesByGenre(genre)
        setMovies(movieList)
      } catch (error) {
        console.error("Error loading movies:", error)
      } finally {
        setLoading(false)
      }
    }

    if (genre) {
      loadMovies()
    }
  }, [genre])

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-sm border-b border-gray-800">
        <div className="flex items-center gap-4 p-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-white hover:bg-gray-800">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-white">{genre}</h1>
        </div>
      </div>

      {/* Movies Grid */}
      <div className="p-4">
        {movies.length === 0 ? (
          <div className="text-center text-gray-400 mt-12">
            <p className="text-lg">
              {language === "ar" ? "لا توجد أفلام في هذه الفئة" : "No movies found in this category"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
