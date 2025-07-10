"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Movie } from "@/types/movie"
import { useLanguage } from "@/hooks/use-language"
import { Play, Info, Star, Calendar, Clock, Eye } from "lucide-react"

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

  if (movies.length === 0) return null

  const currentMovie = movies[currentIndex]
  const title = language === "ar" ? currentMovie.title_ar : currentMovie.title_en
  const description = language === "ar" ? currentMovie.description_ar : currentMovie.description_en

  return (
    <div className="relative h-[70vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={currentMovie.backdrop_url || currentMovie.poster_url}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-end">
        <div className="w-full p-6 space-y-4">
          {/* Movie Info */}
          <div className="space-y-3">
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">{title}</h1>

            {/* Meta Info */}
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1 bg-yellow-500 text-black px-2 py-1 rounded font-bold">
                <Star className="h-3 w-3 fill-current" />
                <span>{currentMovie.rating}</span>
              </div>

              <div className="flex items-center space-x-1 text-white/80">
                <Calendar className="h-3 w-3" />
                <span>{currentMovie.year}</span>
              </div>

              <div className="flex items-center space-x-1 text-white/80">
                <Clock className="h-3 w-3" />
                <span>{currentMovie.duration} min</span>
              </div>

              <div className="flex items-center space-x-1 text-white/80">
                <Eye className="h-3 w-3" />
                <span>{(currentMovie.views / 1000000).toFixed(1)}M</span>
              </div>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2">
              {currentMovie.genre.slice(0, 3).map((genre) => (
                <Badge key={genre} variant="secondary" className="bg-white/20 text-white border-white/30">
                  {genre}
                </Badge>
              ))}
            </div>

            {/* Description */}
            <p className="text-white/90 text-sm md:text-base max-w-2xl line-clamp-3">{description}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Link href={`/player/${currentMovie.id}`}>
              <Button size="lg" className="bg-white text-black hover:bg-white/90 font-semibold">
                <Play className="h-5 w-5 mr-2 fill-current" />
                {language === "ar" ? "شاهد الآن" : "Watch Now"}
              </Button>
            </Link>

            <Link href={`/movie/${currentMovie.id}`}>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 bg-transparent"
              >
                <Info className="h-5 w-5 mr-2" />
                {language === "ar" ? "المزيد" : "More Info"}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 right-6 flex space-x-2">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? "bg-white w-6" : "bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  )
}
