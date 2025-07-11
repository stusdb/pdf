"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Movie } from "@/types/movie"
import { useLanguage } from "@/hooks/use-language"
import { Play, Info, Star } from "lucide-react"

interface FeaturedSliderProps {
  movies: Movie[]
}

export function FeaturedSlider({ movies }: FeaturedSliderProps) {
  const { language } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (movies.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [movies.length])

  if (movies.length === 0) return null

  const currentMovie = movies[currentIndex]
  const title = language === "ar" ? currentMovie.title_ar : currentMovie.title_en
  const description = language === "ar" ? currentMovie.description_ar : currentMovie.description_en

  return (
    <div className="relative h-[50vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={currentMovie.backdrop_url || currentMovie.poster_url}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-end">
        <div className="w-full p-4 space-y-3">
          {/* Movie Info */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Badge className="bg-yellow-500 text-black font-bold text-xs">
                <Star className="h-3 w-3 mr-1 fill-current" />
                {currentMovie.rating}
              </Badge>
              <span className="text-muted-foreground text-sm">{currentMovie.year}</span>
            </div>

            <h1 className="text-2xl font-bold text-foreground leading-tight line-clamp-2">{title}</h1>

            <p className="text-muted-foreground text-sm line-clamp-2 max-w-sm">{description}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Link href={`/player/${currentMovie.id}`} className="flex-1">
              <Button size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold">
                <Play className="h-4 w-4 mr-2 fill-current" />
                {language === "ar" ? "تشغيل" : "Play"}
              </Button>
            </Link>

            <Link href={`/movie/${currentMovie.id}`}>
              <Button size="lg" variant="outline" className="px-6 bg-transparent">
                <Info className="h-4 w-4 mr-2" />
                {language === "ar" ? "تفاصيل" : "Info"}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 right-4 flex space-x-1">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? "bg-green-500 w-6" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
