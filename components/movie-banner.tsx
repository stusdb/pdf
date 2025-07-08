"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Movie } from "@/types/movie"
import { useLanguage } from "@/hooks/use-language"
import { Play, Info, ChevronLeft, ChevronRight } from "lucide-react"

interface MovieBannerProps {
  movies: Movie[]
}

export function MovieBanner({ movies }: MovieBannerProps) {
  const { language } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (movies.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [movies.length])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % movies.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length)
  }

  if (movies.length === 0) return null

  const currentMovie = movies[currentIndex]
  const title = language === "ar" ? currentMovie.title_ar : currentMovie.title_en
  const description = language === "ar" ? currentMovie.description_ar : currentMovie.description_en

  return (
    <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image src={currentMovie.poster_url || "/placeholder.svg"} alt={title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 w-12 h-12 rounded-full z-10"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 w-12 h-12 rounded-full z-10"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">{title}</h1>

            <div className="flex items-center gap-4 mb-4">
              <Badge className="bg-yellow-600 text-black font-semibold">⭐ {currentMovie.rating}</Badge>
              <span className="text-white">{currentMovie.year}</span>
              <div className="flex gap-2">
                {currentMovie.genre.slice(0, 3).map((genre) => (
                  <Badge key={genre} variant="secondary" className="bg-gray-800 text-gray-300">
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>

            <p className="text-gray-200 text-lg mb-8 line-clamp-3 leading-relaxed">{description}</p>

            <div className="flex gap-4">
              <Link href={`/player/${currentMovie.id}`}>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Play className="h-5 w-5 mr-2 fill-current" />
                  {language === "ar" ? "مشاهدة الآن" : "Watch Now"}
                </Button>
              </Link>

              <Link href={`/movie/${currentMovie.id}`}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-400 text-white hover:bg-white/10 bg-transparent"
                >
                  <Info className="h-5 w-5 mr-2" />
                  {language === "ar" ? "المزيد من المعلومات" : "More Info"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? "bg-white" : "bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  )
}
