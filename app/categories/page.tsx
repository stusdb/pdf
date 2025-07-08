"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { LoadingSpinner } from "@/components/loading-spinner"
import { getGenres } from "@/lib/api"
import { useLanguage } from "@/hooks/use-language"

const genreIcons: Record<string, string> = {
  Action: "💥",
  Drama: "🎭",
  Comedy: "😂",
  Horror: "👻",
  Romance: "💕",
  "Sci-Fi": "🚀",
  Thriller: "🔪",
  Adventure: "🗺️",
  Animation: "🎨",
  Crime: "🕵️",
  Fantasy: "🧙‍♂️",
  Mystery: "🔍",
}

export default function CategoriesPage() {
  const router = useRouter()
  const { language } = useLanguage()
  const [genres, setGenres] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const genreList = await getGenres()
        setGenres(genreList)
      } catch (error) {
        console.error("Error loading genres:", error)
      } finally {
        setLoading(false)
      }
    }

    loadGenres()
  }, [])

  const handleGenreClick = (genre: string) => {
    router.push(`/categories/${encodeURIComponent(genre)}`)
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-gray-950 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          {language === "ar" ? "الفئات" : "Categories"}
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {genres.map((genre) => (
            <Card
              key={genre}
              className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-colors cursor-pointer group"
              onClick={() => handleGenreClick(genre)}
            >
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {genreIcons[genre] || "🎬"}
                </div>
                <h3 className="text-white font-semibold text-lg">{genre}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
