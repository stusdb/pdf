const TMDB_API_KEY = process.env.TMDB_API_KEY || "2493209ccf8d8970c4728e6713c615e6" // Fallback for development
const TMDB_BASE_URL = "https://api.themoviedb.org/3"
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p"

interface Movie {
  id: number
  title: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  overview: string
  genre_ids: number[]
  media_type?: string
}

interface MovieDetails extends Movie {
  genres: { id: number; name: string }[]
  runtime: number | null
  tagline: string | null
  budget: number
  revenue: number
  production_companies: { id: number; logo_path: string | null; name: string; origin_country: string }[]
  spoken_languages: { english_name: string; iso_639_1: string; name: string }[]
  status: string
  homepage: string | null
  imdb_id: string | null
  belongs_to_collection: {
    id: number
    name: string
    poster_path: string | null
    backdrop_path: string | null
    parts: Movie[]
  } | null
}

interface CastMember {
  id: number
  name: string
  character: string
  profile_path: string | null
}

interface CrewMember {
  id: number
  name: string
  job: string
  profile_path: string | null
}

interface MovieCredits {
  cast: CastMember[]
  crew: CrewMember[]
}

interface MovieImage {
  aspect_ratio: number
  file_path: string
  height: number
  iso_639_1: string | null
  vote_average: number
  vote_count: number
  width: number
}

interface MovieImages {
  backdrops: MovieImage[]
  posters: MovieImage[]
}

interface MovieVideo {
  iso_639_1: string
  iso_3166_1: string
  name: string
  key: string
  site: string
  size: number
  type: string
  official: boolean
  published_at: string
  id: string
}

interface MovieVideos {
  results: MovieVideo[]
}

interface Collection {
  id: number
  name: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  parts: Movie[]
}

interface Genre {
  id: number
  name: string
}

interface GenreList {
  genres: Genre[]
}

const fetchFromTmdb = async (path: string, params: Record<string, string> = {}): Promise<any | null> => {
  const url = new URL(`${TMDB_BASE_URL}${path}`)
  url.searchParams.append("api_key", TMDB_API_KEY)
  for (const key in params) {
    url.searchParams.append(key, params[key])
  }

  try {
    const response = await fetch(url.toString(), { next: { revalidate: 3600 } }) // Revalidate every hour
    if (!response.ok) {
      console.error(`TMDB API error: ${response.status} ${response.statusText} for ${path}`)
      return null
    }
    return response.json()
  } catch (error) {
    console.error(`Failed to fetch from TMDB for ${path}:`, error)
    return null
  }
}

export const getImageUrl = (path: string | null, size = "w500"): string => {
  if (!path) return "/placeholder.svg?height=300&width=200" // Default placeholder
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
}

export const getBackdropUrl = (path: string | null, size = "w1280"): string => {
  if (!path) return "/placeholder.svg?height=720&width=1280" // Default placeholder
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
}

export const getProfileUrl = (path: string | null, size = "w185"): string => {
  if (!path) return "/placeholder.svg?height=185&width=185" // Default placeholder for profiles
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
}

export const getLogoUrl = (path: string | null, size = "w92"): string => {
  if (!path) return "/placeholder.svg?height=92&width=92" // Default placeholder for logos
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
}

export const getPopularMovies = async (page = 1): Promise<Movie[]> => {
  const data = await fetchFromTmdb("/movie/popular", { page: page.toString() })
  return data?.results || []
}

export const getNowPlayingMovies = async (page = 1): Promise<Movie[]> => {
  const data = await fetchFromTmdb("/movie/now_playing", { page: page.toString() })
  return data?.results || []
}

export const getTrendingMovies = async (time_window: "day" | "week" = "day", page = 1): Promise<Movie[]> => {
  const data = await fetchFromTmdb(`/trending/movie/${time_window}`, { page: page.toString() })
  return data?.results || []
}

export const getMovieDetails = async (id: number): Promise<MovieDetails | null> => {
  return fetchFromTmdb(`/movie/${id}`)
}

export const getMovieCredits = async (id: number): Promise<MovieCredits | null> => {
  return fetchFromTmdb(`/movie/${id}/credits`)
}

export const getMovieImages = async (id: number): Promise<MovieImages | null> => {
  return fetchFromTmdb(`/movie/${id}/images`)
}

export const getMovieVideos = async (id: number): Promise<MovieVideos | null> => {
  return fetchFromTmdb(`/movie/${id}/videos`)
}

export const getCollectionDetails = async (id: number): Promise<Collection | null> => {
  return fetchFromTmdb(`/collection/${id}`)
}

export const searchMovies = async (query: string, page = 1): Promise<Movie[]> => {
  if (!query) return []
  const data = await fetchFromTmdb("/search/movie", { query, page: page.toString() })
  return data?.results || []
}

export const getMovieGenres = async (): Promise<Genre[]> => {
  const data = await fetchFromTmdb("/genre/movie/list")
  return data?.genres || []
}

export type { Movie, MovieDetails, CastMember, CrewMember, MovieImage, MovieVideo, Collection, Genre }
