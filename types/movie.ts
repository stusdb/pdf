export interface Movie {
  id: string
  title_en: string
  title_ar: string
  description_en: string
  description_ar: string
  poster_url: string
  video_url: string
  year: number
  genre: string[]
  rating: number
  views: number
  duration?: number
  subtitle_url?: string
}

export interface MovieFilters {
  genre?: string
  year?: number
  rating?: number
  sortBy?: "year" | "rating" | "views" | "title"
  limit?: number
}
