import type { Movie, MovieFilters } from "@/types/movie"

const API_KEY = "2493209ccf8d8970c4728e6713c615e6"
const BASE_URL = "https://api.themoviedb.org/3"
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/"
const BACKDROP_SIZE = "w1280"
const POSTER_SIZE = "w500"

// TMDb API response interfaces
interface TMDbMovie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  genre_ids: number[]
  vote_average: number
  popularity: number
  runtime?: number
  genres?: { id: number; name: string }[]
  videos?: {
    results: Array<{
      key: string
      site: string
      type: string
      name: string
    }>
  }
}

interface TMDbResponse {
  results: TMDbMovie[]
  total_pages: number
  total_results: number
}

interface TMDbGenre {
  id: number
  name: string
}

// 🎭 خريطة الأنواع مع الترجمة العربية
const genreMap: Record<number, { en: string; ar: string }> = {
  28: { en: "Action", ar: "أكشن" },
  12: { en: "Adventure", ar: "مغامرة" },
  16: { en: "Animation", ar: "رسوم متحركة" },
  35: { en: "Comedy", ar: "كوميديا" },
  80: { en: "Crime", ar: "جريمة" },
  99: { en: "Documentary", ar: "وثائقي" },
  18: { en: "Drama", ar: "دراما" },
  10751: { en: "Family", ar: "عائلي" },
  14: { en: "Fantasy", ar: "خيال" },
  36: { en: "History", ar: "تاريخي" },
  27: { en: "Horror", ar: "رعب" },
  10402: { en: "Music", ar: "موسيقى" },
  9648: { en: "Mystery", ar: "غموض" },
  10749: { en: "Romance", ar: "رومانسي" },
  878: { en: "Science Fiction", ar: "خيال علمي" },
  10770: { en: "TV Movie", ar: "فيلم تلفزيوني" },
  53: { en: "Thriller", ar: "إثارة" },
  10752: { en: "War", ar: "حرب" },
  37: { en: "Western", ar: "غربي" },
}

// 🔧 دالة مساعدة لطلبات API
async function fetchFromTMDb(endpoint: string, params: Record<string, string> = {}): Promise<any> {
  const url = new URL(`${BASE_URL}${endpoint}`)
  url.searchParams.append("api_key", API_KEY)

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value)
  })

  try {
    const response = await fetch(url.toString())
    if (!response.ok) {
      throw new Error(`TMDb API error: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error("TMDb API fetch error:", error)
    throw error
  }
}

// 🎬 تحويل بيانات TMDb إلى تنسيقنا
function convertTMDbMovie(tmdbMovie: TMDbMovie): Movie {
  const getImageUrl = (path: string | null, size: string) =>
    path ? `${IMAGE_BASE_URL}${size}${path}` : "/placeholder.svg?height=600&width=400"

  const genres =
    tmdbMovie.genre_ids?.map((id) => genreMap[id]?.en || "Unknown").filter(Boolean) ||
    tmdbMovie.genres?.map((g) => g.name) ||
    []

  const arabicTitle = tmdbMovie.title

  return {
    id: tmdbMovie.id.toString(),
    title_en: tmdbMovie.title,
    title_ar: arabicTitle,
    description_en: tmdbMovie.overview || "No description available.",
    description_ar: tmdbMovie.overview || "لا يوجد وصف متاح.",
    poster_url: getImageUrl(tmdbMovie.poster_path, POSTER_SIZE),
    backdrop_url: getImageUrl(tmdbMovie.backdrop_path, BACKDROP_SIZE),
    video_url: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`,
    year: new Date(tmdbMovie.release_date || "2023").getFullYear(),
    genre: genres,
    rating: Math.round(tmdbMovie.vote_average * 10) / 10,
    views: Math.floor(tmdbMovie.popularity * 1000),
    duration: tmdbMovie.runtime || 120,
    subtitle_url: undefined,
  }
}

export async function getMovies(filters?: MovieFilters): Promise<Movie[]> {
  try {
    let endpoint = "/movie/popular"
    const params: Record<string, string> = {}

    if (filters?.sortBy === "rating") {
      endpoint = "/movie/top_rated"
    } else if (filters?.sortBy === "year") {
      endpoint = "/discover/movie"
      params.sort_by = "release_date.desc"
    }

    if (filters?.genre) {
      endpoint = "/discover/movie"
      const genreId = Object.entries(genreMap).find(([_, value]) => value.en === filters.genre)?.[0]
      if (genreId) {
        params.with_genres = genreId
      }
    }

    const data: TMDbResponse = await fetchFromTMDb(endpoint, params)
    const movies = data.results.slice(0, filters?.limit || 20).map(convertTMDbMovie)

    return movies
  } catch (error) {
    console.error("Error fetching movies:", error)
    return []
  }
}

export async function getMovieById(id: string): Promise<Movie | null> {
  try {
    const tmdbMovie: TMDbMovie = await fetchFromTMDb(`/movie/${id}`, {
      append_to_response: "videos",
    })

    return convertTMDbMovie(tmdbMovie)
  } catch (error) {
    console.error("Error fetching movie by ID:", error)
    return null
  }
}

export async function getFeaturedMovies(): Promise<Movie[]> {
  try {
    const data: TMDbResponse = await fetchFromTMDb("/movie/now_playing")
    return data.results.slice(0, 5).map(convertTMDbMovie)
  } catch (error) {
    console.error("Error fetching featured movies:", error)
    return []
  }
}

export async function searchMovies(query: string): Promise<Movie[]> {
  if (!query.trim()) return []

  try {
    const data: TMDbResponse = await fetchFromTMDb("/search/movie", {
      query: query.trim(),
    })

    return data.results.map(convertTMDbMovie)
  } catch (error) {
    console.error("Error searching movies:", error)
    return []
  }
}

export async function getMoviesByGenre(genre: string): Promise<Movie[]> {
  try {
    const genreId = Object.entries(genreMap).find(([_, value]) => value.en === genre)?.[0]

    if (!genreId) return []

    const data: TMDbResponse = await fetchFromTMDb("/discover/movie", {
      with_genres: genreId,
      sort_by: "popularity.desc",
    })

    return data.results.map(convertTMDbMovie)
  } catch (error) {
    console.error("Error fetching movies by genre:", error)
    return []
  }
}

export async function getGenres(): Promise<string[]> {
  try {
    const data: { genres: TMDbGenre[] } = await fetchFromTMDb("/genre/movie/list")
    return data.genres.map((genre) => genre.name).sort()
  } catch (error) {
    console.error("Error fetching genres:", error)
    return Object.values(genreMap)
      .map((g) => g.en)
      .sort()
  }
}

export async function getTrendingMovies(): Promise<Movie[]> {
  try {
    const data: TMDbResponse = await fetchFromTMDb("/trending/movie/week")
    return data.results.slice(0, 10).map(convertTMDbMovie)
  } catch (error) {
    console.error("Error fetching trending movies:", error)
    return []
  }
}

export async function getUpcomingMovies(): Promise<Movie[]> {
  try {
    const data: TMDbResponse = await fetchFromTMDb("/movie/upcoming")
    return data.results.slice(0, 10).map(convertTMDbMovie)
  } catch (error) {
    console.error("Error fetching upcoming movies:", error)
    return []
  }
}
