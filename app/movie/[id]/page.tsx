"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Star, PlayCircle, ChevronDown, ChevronUp, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  getMovieDetails,
  getMovieCredits,
  getMovieImages,
  getMovieVideos,
  getImageUrl,
  getBackdropUrl,
  type MovieDetails,
  type CastMember,
  type MovieImage,
  type MovieVideo,
} from "@/lib/tmdb-api"
import LoadingSpinner from "@/components/loading-spinner"
import EmptyState from "@/components/empty-state"
import CastCard from "@/components/cast-card"
import DetailCard from "@/components/detail-card"
import CompanyCard from "@/components/company-card"
import ImageModal from "@/components/image-modal"
import { useToast } from "@/hooks/use-toast"
import Plyr from "plyr-react"
import "plyr-react/plyr.css"

// Helper to format currency
const formatCurrency = (amount: number) => {
  if (!amount) return "N/A"
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Helper to format runtime
const formatRuntime = (minutes: number | null) => {
  if (!minutes) return "N/A"
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return `${hours}h ${remainingMinutes}m`
}

export default function MovieDetailPage() {
  const { id } = useParams()
  const movieId = typeof id === "string" ? Number.parseInt(id) : null

  const [movie, setMovie] = useState<MovieDetails | null>(null)
  const [cast, setCast] = useState<CastMember[]>([])
  const [images, setImages] = useState<MovieImage[]>([])
  const [videos, setVideos] = useState<MovieVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [showFullOverview, setShowFullOverview] = useState(false)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    if (!movieId) {
      setLoading(false)
      return
    }

    const fetchData = async () => {
      setLoading(true)
      try {
        const [movieDetails, movieCredits, movieImages, movieVideos] = await Promise.all([
          getMovieDetails(movieId),
          getMovieCredits(movieId),
          getMovieImages(movieId),
          getMovieVideos(movieId),
        ])

        setMovie(movieDetails)
        setCast(movieCredits?.cast || [])
        setImages(movieImages?.backdrops || []) // Prioritize backdrops for images section
        setVideos(movieVideos?.results || [])
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load movie details.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [movieId, toast])

  const trailerVideo = videos.find((video) => video.type === "Trailer" && video.site === "YouTube")
  const youtubeId = trailerVideo?.key

  const handleImageClick = (imageUrl: string) => {
    setCurrentImage(imageUrl)
    setIsImageModalOpen(true)
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (!movie) {
    return <EmptyState message="Movie not found." />
  }

  const displayOverview = showFullOverview ? movie.overview : `${movie.overview?.substring(0, 150)}...`
  const needsTruncation = movie.overview && movie.overview.length > 150

  return (
    <div className="min-h-screen bg-background-dark text-text-white pb-16 md:pb-0">
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
        <Image
          src={getBackdropUrl(movie.backdrop_path || movie.poster_path, "w1280")}
          alt={movie.title}
          fill
          className="object-cover"
          priority
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg?height=400&width=1280"
            e.currentTarget.srcset = ""
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h1 className="text-3xl md:text-4xl font-bold text-text-white drop-shadow-lg">{movie.title}</h1>
          {movie.tagline && <p className="text-lg text-gray-300 italic mt-1">{movie.tagline}</p>}
          <div className="flex items-center gap-2 mt-2">
            <Star className="h-5 w-5 fill-accent-gold text-accent-gold" />
            <span className="text-xl font-semibold">
              {movie.vote_average ? (Math.round(movie.vote_average * 10) / 10).toFixed(1) : "N/A"}
            </span>
            <span className="text-gray-400 text-sm">({movie.vote_count} votes)</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {movie.genres.map((genre) => (
              <span key={genre.id} className="bg-primary-red text-white text-xs px-2 py-1 rounded-full">
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Watch Trailer / Add to List */}
        <div className="flex gap-4 mb-6">
          {youtubeId && (
            <Button className="flex-1 bg-primary-red text-white hover:bg-primary-red/90">
              <PlayCircle className="h-5 w-5 mr-2" />
              Watch Trailer
            </Button>
          )}
          <Button
            variant="outline"
            className="flex-1 border-primary-red text-primary-red hover:bg-primary-red/10 bg-transparent"
          >
            Add to List
          </Button>
        </div>

        {/* Overview */}
        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-3">Overview</h2>
          <p className="text-gray-300 text-base leading-relaxed">
            {displayOverview}
            {needsTruncation && (
              <Button
                variant="link"
                className="p-0 h-auto text-primary-red ml-1"
                onClick={() => setShowFullOverview(!showFullOverview)}
              >
                {showFullOverview ? "Show Less" : "Read More"}
                {showFullOverview ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
              </Button>
            )}
          </p>
        </section>

        {/* Video Player */}
        {youtubeId && (
          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-3">Trailer</h2>
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Plyr
                source={{
                  type: "video",
                  sources: [
                    {
                      src: youtubeId,
                      provider: "youtube",
                    },
                  ],
                }}
                options={{
                  controls: ["play", "progress", "current-time", "mute", "volume", "fullscreen"],
                  autoplay: false,
                  loop: { active: false },
                }}
              />
            </div>
          </section>
        )}

        {/* Cast */}
        {cast.length > 0 && (
          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-3">Cast</h2>
            <div className="flex overflow-x-auto hide-scrollbar space-x-4 pb-2">
              {cast.slice(0, 10).map((member) => (
                <CastCard
                  key={member.id}
                  name={member.name}
                  character={member.character}
                  profilePath={member.profile_path}
                />
              ))}
            </div>
          </section>
        )}

        {/* Details */}
        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-3">Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <DetailCard label="Release Date" value={movie.release_date || "N/A"} icon="release" />
            <DetailCard label="Runtime" value={formatRuntime(movie.runtime)} icon="runtime" />
            <DetailCard label="Status" value={movie.status || "N/A"} icon="status" />
            <DetailCard label="Budget" value={formatCurrency(movie.budget)} icon="budget" />
            <DetailCard label="Revenue" value={formatCurrency(movie.revenue)} icon="revenue" />
            {movie.spoken_languages.length > 0 && (
              <DetailCard label="Language" value={movie.spoken_languages[0]?.english_name || "N/A"} icon="status" />
            )}
          </div>
        </section>

        {/* Production Companies */}
        {movie.production_companies.length > 0 && (
          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-3">Production Companies</h2>
            <div className="flex overflow-x-auto hide-scrollbar space-x-4 pb-2">
              {movie.production_companies.map((company) => (
                <CompanyCard key={company.id} name={company.name} logoPath={company.logo_path} />
              ))}
            </div>
          </section>
        )}

        {/* Images */}
        {images.length > 0 && (
          <section className="mb-6">
            <h2 className="text-2xl font-bold mb-3">Images</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {images.slice(0, 8).map((img, index) => (
                <div
                  key={index}
                  className="relative aspect-video rounded-lg overflow-hidden cursor-pointer group"
                  onClick={() => handleImageClick(getImageUrl(img.file_path, "original"))}
                >
                  <Image
                    src={getImageUrl(img.file_path, "w500") || "/placeholder.svg"}
                    alt={`Image ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg?height=281&width=500"
                      e.currentTarget.srcset = ""
                    }}
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ImageIcon className="h-8 w-8 text-white" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <ImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        imageUrl={currentImage}
        altText={movie.title}
      />
    </div>
  )
}
