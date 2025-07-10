"use client"

import { MovieCard } from "@/components/movie-card"
import { Button } from "@/components/ui/button"
import type { Movie } from "@/types/movie"
import { useLanguage } from "@/hooks/use-language"
import { ChevronRight } from "lucide-react"

interface MovieSectionProps {
  title: string
  movies: Movie[]
  showViewAll?: boolean
}

export function MovieSection({ title, movies, showViewAll = false }: MovieSectionProps) {
  const { language } = useLanguage()

  if (movies.length === 0) return null

  return (
    <section className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        {showViewAll && (
          <Button variant="ghost" className="text-purple-400 hover:text-purple-300 p-0">
            <span className="mr-1">{language === "ar" ? "شاهد الكل" : "View All"}</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {movies.slice(0, 12).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  )
}
