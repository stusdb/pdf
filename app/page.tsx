import { Suspense } from "react"
import {
  getPopularMovies,
  getNowPlayingMovies,
  getTrendingMovies,
  getCollectionDetails,
  getBackdropUrl,
  type Movie,
  type Collection,
} from "@/lib/tmdb-api"
import MovieCard from "@/components/movie-card"
import TrendingItem from "@/components/trending-item"
import SeriesCard from "@/components/series-card"
import LoadingSpinner from "@/components/loading-spinner"
import Image from "next/image"
import Link from "next/link"
import { PlayCircle } from "lucide-react"
import EmptyState from "@/components/empty-state" // Declare the EmptyState component

// Helper to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default async function HomePage() {
  const [popularMovies, nowPlayingMovies, trendingMoviesDay, trendingMoviesWeek] = await Promise.all([
    getPopularMovies(1),
    getNowPlayingMovies(1),
    getTrendingMovies("day"),
    getTrendingMovies("week"),
  ])

  // Combine and shuffle trending movies for the "Featured" section
  const featuredMovies = shuffleArray([...trendingMoviesDay, ...trendingMoviesWeek]).slice(0, 5)

  // Example collections (replace with actual TMDB collection IDs if available)
  // For demonstration, we'll use a known collection ID or fallback to popular movies
  const collectionIds = [
    10, // Star Wars Collection
    119, // The Lord of the Rings Collection
    131292, // Avatar Collection
    948525, // Spider-Man: Into the Spider-Verse Collection
    // Add more relevant collection IDs here
  ]

  const collections: Collection[] = (await Promise.all(collectionIds.map((id) => getCollectionDetails(id)))).filter(
    Boolean,
  ) as Collection[]

  // Fallback for series if no collections are found or parts are empty
  const seriesFallback: Movie[] = popularMovies.slice(0, 5)

  return (
    <div className="min-h-screen bg-background-dark text-text-white pb-16 md:pb-0">
      <div className="container mx-auto px-4 py-6">
        {/* Featured Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Featured</h2>
          <Suspense fallback={<LoadingSpinner />}>
            <div className="relative h-[200px] md:h-[300px] rounded-lg overflow-hidden shadow-lg">
              {featuredMovies.length > 0 ? (
                <Link href={`/movie/${featuredMovies[0].id}`} prefetch={false}>
                  <Image
                    src={getBackdropUrl(featuredMovies[0].backdrop_path || featuredMovies[0].poster_path, "w780")}
                    alt={featuredMovies[0].title}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg?height=300&width=780"
                      e.currentTarget.srcset = ""
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                    <h3 className="text-xl md:text-3xl font-bold text-text-white drop-shadow-lg">
                      {featuredMovies[0].title}
                    </h3>
                    <p className="text-sm text-gray-300 mt-1 line-clamp-2">{featuredMovies[0].overview}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <PlayCircle className="h-6 w-6 text-primary-red fill-primary-red" />
                      <span className="text-primary-red font-semibold">Watch Now</span>
                    </div>
                  </div>
                </Link>
              ) : (
                <EmptyState message="No featured movies available." />
              )}
            </div>
          </Suspense>
        </section>

        {/* Popular Movies */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Popular Movies</h2>
          <Suspense fallback={<LoadingSpinner />}>
            <div className="flex overflow-x-auto hide-scrollbar space-x-4 pb-2">
              {popularMovies.length > 0 ? (
                popularMovies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    posterPath={movie.poster_path}
                    voteAverage={movie.vote_average}
                    className="flex-shrink-0 w-[150px]"
                  />
                ))
              ) : (
                <EmptyState message="No popular movies found." />
              )}
            </div>
          </Suspense>
        </section>

        {/* New Releases */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">New Releases</h2>
          <Suspense fallback={<LoadingSpinner />}>
            <div className="flex overflow-x-auto hide-scrollbar space-x-4 pb-2">
              {nowPlayingMovies.length > 0 ? (
                nowPlayingMovies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    posterPath={movie.poster_path}
                    voteAverage={movie.vote_average}
                    className="flex-shrink-0 w-[150px]"
                  />
                ))
              ) : (
                <EmptyState message="No new releases found." />
              )}
            </div>
          </Suspense>
        </section>

        {/* Trending Movies */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Trending</h2>
          <Suspense fallback={<LoadingSpinner />}>
            <div className="grid gap-4">
              {trendingMoviesDay.length > 0 ? (
                trendingMoviesDay
                  .slice(0, 5)
                  .map((movie, index) => (
                    <TrendingItem
                      key={movie.id}
                      id={movie.id}
                      title={movie.title}
                      backdropPath={movie.backdrop_path}
                      voteAverage={movie.vote_average}
                      overview={movie.overview}
                      index={index}
                    />
                  ))
              ) : (
                <EmptyState message="No trending movies found." />
              )}
            </div>
          </Suspense>
        </section>

        {/* Movie Series */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Movie Series</h2>
          <Suspense fallback={<LoadingSpinner />}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {collections.length > 0
                ? collections.map((collection) => (
                    <SeriesCard
                      key={collection.id}
                      id={collection.parts[0]?.id || collection.id} // Link to the first movie in the collection or collection itself
                      name={collection.name}
                      backdropPath={collection.backdrop_path}
                      overview={collection.overview || `Explore the ${collection.name} collection.`}
                    />
                  ))
                : seriesFallback.map((movie) => (
                    <SeriesCard
                      key={movie.id}
                      id={movie.id}
                      name={movie.title}
                      backdropPath={movie.backdrop_path}
                      overview={movie.overview}
                    />
                  ))}
            </div>
          </Suspense>
        </section>
      </div>
    </div>
  )
}
