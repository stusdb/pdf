"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { LoadingSpinner } from "@/components/loading-spinner"
import { getGenres } from "@/lib/api"
import { useLanguage } from "@/hooks/use-language"
import {
  Zap,
  Compass,
  Palette,
  Laugh,
  Shield,
  FileText,
  Drama,
  Users,
  Wand2,
  BookOpen,
  Ghost,
  Music,
  HelpCircle,
  Heart,
  Rocket,
  Tv,
  GhostIcon as Thriller,
  Swords,
  Mountain,
} from "lucide-react"
import { Film } from "lucide-react" // Declaring Film variable

// 🎭 أيقونات التصنيفات الجميلة
const genreIcons: Record<string, any> = {
  Action: Zap,
  Adventure: Compass,
  Animation: Palette,
  Comedy: Laugh,
  Crime: Shield,
  Documentary: FileText,
  Drama: Drama,
  Family: Users,
  Fantasy: Wand2,
  History: BookOpen,
  Horror: Ghost,
  Music: Music,
  Mystery: HelpCircle,
  Romance: Heart,
  "Science Fiction": Rocket,
  "TV Movie": Tv,
  Thriller: Thriller,
  War: Swords,
  Western: Mountain,
}

// 🌈 ألوان التصنيفات
const genreColors: Record<string, string> = {
  Action: "from-red-500 to-orange-500",
  Adventure: "from-green-500 to-teal-500",
  Animation: "from-purple-500 to-pink-500",
  Comedy: "from-yellow-500 to-orange-500",
  Crime: "from-gray-600 to-gray-800",
  Documentary: "from-blue-500 to-indigo-500",
  Drama: "from-indigo-500 to-purple-500",
  Family: "from-pink-500 to-rose-500",
  Fantasy: "from-purple-600 to-indigo-600",
  History: "from-amber-600 to-orange-600",
  Horror: "from-red-600 to-black",
  Music: "from-cyan-500 to-blue-500",
  Mystery: "from-gray-500 to-slate-600",
  Romance: "from-pink-500 to-red-500",
  "Science Fiction": "from-blue-600 to-purple-600",
  "TV Movie": "from-teal-500 to-cyan-500",
  Thriller: "from-red-700 to-gray-800",
  War: "from-gray-700 to-red-800",
  Western: "from-amber-700 to-orange-800",
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
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-4">
      <div className="max-w-6xl mx-auto">
        {/* 🎭 عنوان الصفحة */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              {language === "ar" ? "التصنيفات" : "Categories"}
            </span>
          </h1>
          <p className="text-gray-400 text-lg">
            {language === "ar" ? "اكتشف الأفلام حسب النوع المفضل لديك" : "Discover movies by your favorite genre"}
          </p>
        </div>

        {/* 🎬 شبكة التصنيفات */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {genres.map((genre) => {
            const Icon = genreIcons[genre] || Film
            const colorClass = genreColors[genre] || "from-gray-500 to-gray-600"

            return (
              <Card
                key={genre}
                className="group bg-gray-900/50 border-gray-800/50 hover:border-orange-500/50 transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-sm hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20"
                onClick={() => handleGenreClick(genre)}
              >
                <CardContent className="p-0">
                  {/* 🎨 خلفية متدرجة */}
                  <div className={`h-32 bg-gradient-to-br ${colorClass} relative overflow-hidden`}>
                    {/* ✨ تأثير الضوء */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                    {/* 🔮 الأيقونة */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon className="h-12 w-12 text-white/90 group-hover:scale-110 transition-transform duration-300" />
                    </div>

                    {/* ⭐ تأثير النجوم */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" />
                    </div>
                    <div className="absolute top-4 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div
                        className="w-1 h-1 bg-white/40 rounded-full animate-pulse"
                        style={{ animationDelay: "0.5s" }}
                      />
                    </div>
                  </div>

                  {/* 📝 اسم التصنيف */}
                  <div className="p-4 text-center">
                    <h3 className="text-white font-bold text-lg group-hover:text-orange-400 transition-colors duration-300">
                      {genre}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {language === "ar" ? "استكشف الآن" : "Explore now"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* 🎯 إحصائيات سريعة */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-gray-900/30 rounded-2xl backdrop-blur-sm border border-gray-800/50">
            <div className="text-3xl font-bold text-orange-400 mb-2">{genres.length}</div>
            <div className="text-gray-400 text-sm">{language === "ar" ? "تصنيف متاح" : "Available Genres"}</div>
          </div>

          <div className="text-center p-6 bg-gray-900/30 rounded-2xl backdrop-blur-sm border border-gray-800/50">
            <div className="text-3xl font-bold text-red-400 mb-2">1000+</div>
            <div className="text-gray-400 text-sm">{language === "ar" ? "فيلم" : "Movies"}</div>
          </div>

          <div className="text-center p-6 bg-gray-900/30 rounded-2xl backdrop-blur-sm border border-gray-800/50">
            <div className="text-3xl font-bold text-yellow-400 mb-2">HD</div>
            <div className="text-gray-400 text-sm">{language === "ar" ? "جودة عالية" : "High Quality"}</div>
          </div>

          <div className="text-center p-6 bg-gray-900/30 rounded-2xl backdrop-blur-sm border border-gray-800/50">
            <div className="text-3xl font-bold text-green-400 mb-2">24/7</div>
            <div className="text-gray-400 text-sm">{language === "ar" ? "متاح دائماً" : "Always Available"}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
