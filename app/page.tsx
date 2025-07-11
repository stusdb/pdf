"use client"

import { useState, useEffect } from "react"
import { HeroSection } from "@/components/hero-section"
import { ContentCarousel } from "@/components/content-carousel"
import { QuickActions } from "@/components/quick-actions"
import { TopNavigation } from "@/components/top-navigation"
import { BottomTabBar } from "@/components/bottom-tab-bar"
import { SplashScreen } from "@/components/splash-screen"
import type { Movie } from "@/types/movie"
import { getMovies, getFeaturedMovies, getTrendingMovies } from "@/lib/api"
import { useLanguage } from "@/hooks/use-language"

export default function HomePage() {
  const { language } = useLanguage()
  const [featuredMovies, setFeaturedMovies] = useState<Movie[]>([])
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([])
  const [popularMovies, setPopularMovies] = useState<Movie[]>([])
  const [newReleases, setNewReleases] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadContent = async () => {
      try {
        const [featured, trending, popular, releases] = await Promise.all([
          getFeaturedMovies(),
          getTrendingMovies(),
          getMovies({ sortBy: "rating", limit: 15 }),
          getMovies({ sortBy: "year", limit: 15 }),
        ])

        setFeaturedMovies(featured)
        setTrendingMovies(trending)
        setPopularMovies(popular)
        setNewReleases(releases)
      } catch (error) {
        console.error("Error loading content:", error)
      } finally {
        setLoading(false)
      }
    }

    loadContent()
  }, [])

  if (loading) {
    return <SplashScreen />
  }

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation />

      <main className="pb-24">
        {/* Hero Section */}
        <HeroSection movies={featuredMovies} />

        {/* Quick Actions */}
        <QuickActions />

        {/* Content Sections */}
        <div className="space-y-8 px-4">
          <ContentCarousel
            title={language === "ar" ? "🔥 الرائج الآن" : "🔥 Trending Now"}
            movies={trendingMovies}
            variant="trending"
          />

          <ContentCarousel
            title={language === "ar" ? "⭐ الأكثر شعبية" : "⭐ Most Popular"}
            movies={popularMovies}
            variant="popular"
          />

          <ContentCarousel
            title={language === "ar" ? "🆕 إصدارات جديدة" : "🆕 New Releases"}
            movies={newReleases}
            variant="new"
          />
        </div>
      </main>

      <BottomTabBar />
    </div>
  )
}
