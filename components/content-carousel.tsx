"use client"

import { ContentCard } from "@/components/content-card"
import { Button } from "@/components/ui/button"
import type { Movie } from "@/types/movie"
import { useLanguage } from "@/hooks/use-language"
import { ChevronRight, Sparkles } from "lucide-react"
import Link from "next/link"

interface ContentCarouselProps {
  title: string
  movies: Movie[]
  variant?: "trending" | "popular" | "new"
}

export function ContentCarousel({ title, movies, variant = "trending" }: ContentCarouselProps) {
  const { language } = useLanguage()

  if (movies.length === 0) return null

  const gradientMap = {
    trending: "gradient-primary",
    popular: "gradient-secondary",
    new: "gradient-accent",
  }

  const glowMap = {
    trending: "glow-primary",
    popular: "glow-secondary",
    new: "glow-accent",
  }

  return (
    <section className="space-y-4 animate-slide-in-up">
      {/* Section Header */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center space-x-3">
          <div className={`w-1 h-8 ${gradientMap[variant]} rounded-full ${glowMap[variant]}`} />
          <h2 className="text-2xl font-bold text-white font-display">{title}</h2>
          <Sparkles className="h-5 w-5 text-purple-400 animate-pulse" />
        </div>

        <Link href={`/${variant}`}>
          <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300 glass-button">
            <span className="mr-2">{language === "ar" ? "عرض الكل" : "See All"}</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* Movies Carousel */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex space-x-4 px-2 pb-2">
          {movies.slice(0, 10).map((movie, index) => (
            <ContentCard key={movie.id} movie={movie} variant={variant} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
