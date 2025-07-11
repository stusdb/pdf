"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Movie } from "@/types/movie"
import { useLanguage } from "@/hooks/use-language"
import { Play, Plus, Star, Clock, Calendar } from "lucide-react"

interface HeroSectionProps {
  movies: Movie[]
}

export function HeroSection({ movies }: HeroSectionProps) {
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
    <section className="relative h-[60vh] overflow-hidden">
      {/* Background with Parallax Effect */}
      <div className="absolute inset-0 transform scale-110">
        <Image
          src={currentMovie.backdrop_url || currentMovie.poster_url}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/40" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 right-10 w-20 h-20 gradient-secondary rounded-full opacity-20 animate-float" />
      <div
        className="absolute bottom-20 left-10 w-16 h-16 gradient-accent rounded-full opacity-15 animate-float"
        style={{ animationDelay: "2s" }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex items-end">
        <div className="w-full p-6 space-y-6 animate-fade-in-up">
          {/* Movie Metadata */}
          <div className="flex items-center space-x-3 mb-4">
            <Badge className="gradient-primary text-white font-bold px-3 py-1 glow-primary">
              <Star className="h-3 w-3 mr-1 fill-current" />
              {currentMovie.rating}
            </Badge>
            <div className="flex items-center space-x-2 text-purple-200 text-sm">
              <Calendar className="h-3 w-3" />
              <span>{currentMovie.year}</span>
            </div>
            <div className="flex items-center space-x-2 text-purple-200 text-sm">
              <Clock className="h-3 w-3" />
              <span>{currentMovie.duration}m</span>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight font-display">{title}</h1>
            <p className="text-purple-100 text-base max-w-md line-clamp-3 font-body">{description}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Link href={`/player/${currentMovie.id}`} className="flex-1">
              <Button size="lg" className="w-full btn-primary font-bold text-lg py-4">
                <Play className="h-5 w-5 mr-3 fill-current" />
                {language === "ar" ? "▶ تشغيل الآن" : "▶ Play Now"}
              </Button>
            </Link>

            <Link href={`/movie/${currentMovie.id}`}>
              <Button
                size="lg"
                variant="outline"
                className="glass-button border-white/30 text-white hover:glow-secondary px-6 py-4 bg-transparent"
              >
                <Plus className="h-5 w-5 mr-2" />
                {language === "ar" ? "قائمتي" : "My List"}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === currentIndex ? "w-8 gradient-primary glow-primary" : "w-4 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  )
}
