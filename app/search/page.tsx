"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { MovieCard } from "@/components/movie-card"
import { LoadingSpinner } from "@/components/loading-spinner"
import type { Movie } from "@/types/movie"
import { searchMovies } from "@/lib/api"
import { useLanguage } from "@/hooks/use-language"
import { useDebounce } from "@/hooks/use-debounce"
import { Search } from "lucide-react"

export default function SearchPage() {
  const { language } = useLanguage()
  const [query, setQuery] = useState("")
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const debouncedQuery = useDebounce(query, 300)

  useEffect(() => {
    const performSearch = async () => {
      if (!debouncedQuery.trim()) {
        setMovies([])
        setHasSearched(false)
        return
      }

      setLoading(true)
      setHasSearched(true)

      try {
        const results = await searchMovies(debouncedQuery)
        setMovies(results)
      } catch (error) {
        console.error("Error searching movies:", error)
        setMovies([])
      } finally {
        setLoading(false)
      }
    }

    performSearch()
  }, [debouncedQuery])

  const placeholder = language === "ar" ? "ابحث عن الأفلام..." : "Search for movies..."

  return (
    <div className="min-h-screen bg-gray-950 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">{language === "ar" ? "البحث" : "Search"}</h1>

          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder={placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Search Results */}
        {loading ? (
          <LoadingSpinner />
        ) : hasSearched ? (
          movies.length === 0 ? (
            <div className="text-center text-gray-400 mt-12">
              <Search className="h-16 w-16 mx-auto mb-4 text-gray-600" />
              <h2 className="text-2xl font-semibold mb-2">
                {language === "ar" ? "لا توجد نتائج" : "No Results Found"}
              </h2>
              <p className="text-lg">
                {language === "ar"
                  ? `لم نجد أي أفلام تطابق "${query}"`
                  : `We couldn't find any movies matching "${query}"`}
              </p>
            </div>
          ) : (
            <>
              <div className="text-white mb-6">
                <p className="text-lg">
                  {language === "ar"
                    ? `تم العثور على ${movies.length} نتيجة لـ "${query}"`
                    : `Found ${movies.length} results for "${query}"`}
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </>
          )
        ) : (
          <div className="text-center text-gray-400 mt-12">
            <Search className="h-16 w-16 mx-auto mb-4 text-gray-600" />
            <h2 className="text-2xl font-semibold mb-2">
              {language === "ar" ? "ابحث عن الأفلام" : "Search for Movies"}
            </h2>
            <p className="text-lg">
              {language === "ar"
                ? "اكتب اسم الفيلم الذي تريد البحث عنه"
                : "Type the name of the movie you want to find"}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
