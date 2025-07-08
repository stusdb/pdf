"use client"

import { useState, useEffect } from "react"
import { MovieCard } from "@/components/movie-card"
import { MovieBanner } from "@/components/movie-banner"
import { LoadingSpinner } from "@/components/loading-spinner"
import type { Movie } from "@/types/movie"
import { getMovies, getFeaturedMovies } from "@/lib/api"

export default function HomePage() {
  const [featuredMovies, setFeaturedMovies] = useState<Movie[]>([])
  const [latestMovies, setLatestMovies] = useState<Movie[]>([])
  const [popularMovies, setPopularMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const [featured, latest, popular] = await Promise.all([
          getFeaturedMovies(),
          getMovies({ sortBy: "year", limit: 10 }),
          getMovies({ sortBy: "rating", limit: 10 }),
        ])

        setFeaturedMovies(featured)
        setLatestMovies(latest)
        setPopularMovies(popular)
      } catch (error) {
        console.error("Error loading movies:", error)
      } finally {
        setLoading(false)
      }
    }

    loadMovies()
  }, [])

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Featured Movies Banner */}
      <section className="mb-8">
        <MovieBanner movies={featuredMovies} />
      </section>

      {/* Latest Movies */}
      <section className="px-4 mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Latest Movies</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {latestMovies.map((movie) => (
            <div key={movie.id} className="flex-shrink-0 w-48">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </section>

      {/* Popular Movies */}
      <section className="px-4 mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Popular Movies</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {popularMovies.map((movie) => (
            <div key={movie.id} className="flex-shrink-0 w-48">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
