"use client"

import { MovieCard } from "@/components/movie-card"
import { Button } from "@/components/ui/button"
import type { Movie } from "@/types/movie"
import { useLanguage } from "@/hooks/use-language"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

interface MovieGridProps {
  title: string
  movies: Movie[]
  showAll?: string
}

export function MovieGrid({ title, movies, showAll }: MovieGridProps) {
  const { language } = useLanguage()

  if (movies.length === 0) return null

  return (
    <section className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
        {showAll && (
          <Link href={showAll}>
            <Button variant="ghost" size="sm" className="text-green-500 hover:text-green-400 p-0">
              <span className="mr-1">{language === "ar" ? "عرض الكل" : "See All"}</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        )}
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-2 gap-4">
        {movies.slice(0, 6).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  )
}
