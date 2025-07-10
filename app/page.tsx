"use client"

import { useState, useEffect } from "react"
import { MovieBanner } from "@/components/movie-banner"
import { MovieSection } from "@/components/movie-section"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Header } from "@/components/header"
import { BottomNavigation } from "@/components/bottom-navigation"
import type { Movie } from "@/types/movie"
import { getMovies, getFeaturedMovies, getTrendingMovies, getUpcomingMovies } from "@/lib/api"
import { useLanguage } from "@/hooks/use-language"

export default function HomePage() {
  const { language } = useLanguage()
  const [featuredMovies, setFeaturedMovies] = useState<Movie[]>([])
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([])
  const [popularMovies, setPopularMovies] = useState<Movie[]>([])
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const [featured, trending, popular, upcoming] = await Promise.all([
          getFeaturedMovies(),
          getTrendingMovies(),
          getMovies({ sortBy: "rating", limit: 10 }),
          getUpcomingMovies(),
        ])

        setFeaturedMovies(featured)
        setTrendingMovies(trending)
        setPopularMovies(popular)
        setUpcomingMovies(upcoming)
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
    <div className="min-h-screen bg-black">
      <Header />

      <main className="pb-20">
        {/* Featured Movie Banner */}
        <section className="mb-8">
          <MovieBanner movies={featuredMovies} />
        </section>

        {/* Movie Sections */}
        <div className="space-y-8 px-4">
          <MovieSection
            title={language === "ar" ? "آخر التحديثات" : "Latest Updates"}
            movies={trendingMovies}
            showViewAll
          />

          <MovieSection
            title={language === "ar" ? "الأكثر مشاهدة" : "Most Watched"}
            movies={popularMovies}
            showViewAll
          />

          <MovieSection title={language === "ar" ? "قريباً" : "Coming Soon"} movies={upcomingMovies} showViewAll />
        </div>
      </main>

      <BottomNavigation />
    </div>
  )
}
