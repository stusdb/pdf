"use client"

import { useState, useEffect, useMemo, Suspense } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"
import MovieCard from "@/components/movie-card"
import EmptyState from "@/components/empty-state"
import { getMovieGenres, searchMovies, type Movie, type Genre } from "@/lib/tmdb-api"
import { useToast } from "@/hooks/use-toast"
import LoadingSpinner from "@/components/loading-spinner" // Declare the LoadingSpinner component

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null)
  const [movies, setMovies] = useState<Movie[]>([])
  const [genres, setGenres] = useState<Genre[]>([])
  const [loading, setLoading] = useState(false)
  const [initialLoad, setInitialLoad] = useState(true)
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  const { toast } = useToast()

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const fetchedGenres = await getMovieGenres()
        setGenres(fetchedGenres)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load genres.",
          variant: "destructive",
        })
      }
    }
    fetchGenres()
  }, [toast])

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true)
      try {
        const fetchedMovies = await searchMovies(debouncedSearchTerm)
        setMovies(fetchedMovies)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to search movies.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
        setInitialLoad(false)
      }
    }

    if (debouncedSearchTerm) {
      fetchMovies()
    } else if (!initialLoad) {
      setMovies([]) // Clear movies if search term is empty after initial load
    }
  }, [debouncedSearchTerm, initialLoad, toast])

  const filteredMovies = useMemo(() => {
    if (selectedGenre === null) {
      return movies
    }
    return movies.filter((movie) => movie.genre_ids?.includes(selectedGenre))
  }, [movies, selectedGenre])

  return (
    <div className="min-h-screen bg-background-dark text-text-white pb-16 md:pb-0">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Search Movies</h1>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search for movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-full border-border-gray bg-background-light pl-10 pr-4 py-2 text-text-white placeholder:text-gray-400 focus:border-primary-red focus:ring-primary-red"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-text-white"
              onClick={() => setSearchTerm("")}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}
        </div>

        <div className="flex overflow-x-auto hide-scrollbar space-x-2 mb-6 pb-2">
          <Button
            variant={selectedGenre === null ? "default" : "outline"}
            className={
              selectedGenre === null
                ? "bg-primary-red text-white"
                : "border-border-gray text-gray-400 hover:bg-background-light"
            }
            onClick={() => setSelectedGenre(null)}
          >
            All
          </Button>
          {genres.map((genre) => (
            <Button
              key={genre.id}
              variant={selectedGenre === genre.id ? "default" : "outline"}
              className={
                selectedGenre === genre.id
                  ? "bg-primary-red text-white"
                  : "border-border-gray text-gray-400 hover:bg-background-light"
              }
              onClick={() => setSelectedGenre(genre.id)}
            >
              {genre.name}
            </Button>
          ))}
        </div>

        <Suspense fallback={<LoadingSpinner />}>
          {loading ? (
            <LoadingSpinner />
          ) : filteredMovies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  posterPath={movie.poster_path}
                  voteAverage={movie.vote_average}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              message={searchTerm ? "No movies found matching your search." : "Start typing to search for movies."}
            />
          )}
        </Suspense>
      </div>
    </div>
  )
}
