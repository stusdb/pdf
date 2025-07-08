import type { Movie, MovieFilters } from "@/types/movie"

// Mock movie data
const mockMovies: Movie[] = [
  {
    id: "1",
    title_en: "Inception",
    title_ar: "بداية",
    description_en:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    description_ar:
      "لص يسرق الأسرار من الشركات باستخدام تقنية مشاركة الأحلام يُكلف بمهمة عكسية وهي زرع فكرة في عقل مدير تنفيذي.",
    poster_url: "/placeholder.svg?height=600&width=400",
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    year: 2010,
    genre: ["Action", "Sci-Fi", "Thriller"],
    rating: 8.8,
    views: 2500000,
    duration: 148,
    subtitle_url: "/subtitles/inception.srt",
  },
  {
    id: "2",
    title_en: "The Dark Knight",
    title_ar: "فارس الظلام",
    description_en:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
    description_ar:
      "عندما يعيث الجوكر فساداً وفوضى في مدينة جوثام، يجب على باتمان أن يواجه واحداً من أعظم الاختبارات النفسية والجسدية.",
    poster_url: "/placeholder.svg?height=600&width=400",
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    year: 2008,
    genre: ["Action", "Crime", "Drama"],
    rating: 9.0,
    views: 3200000,
    duration: 152,
  },
  {
    id: "3",
    title_en: "Interstellar",
    title_ar: "بين النجوم",
    description_en:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    description_ar: "فريق من المستكشفين يسافر عبر ثقب دودي في الفضاء في محاولة لضمان بقاء البشرية.",
    poster_url: "/placeholder.svg?height=600&width=400",
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    year: 2014,
    genre: ["Adventure", "Drama", "Sci-Fi"],
    rating: 8.6,
    views: 1800000,
    duration: 169,
  },
  {
    id: "4",
    title_en: "The Matrix",
    title_ar: "المصفوفة",
    description_en:
      "A computer programmer is led to fight an underground war against powerful computers who have constructed his entire reality with a system called the Matrix.",
    description_ar: "مبرمج كمبيوتر يُقاد لخوض حرب سرية ضد أجهزة كمبيوتر قوية بنت واقعه بالكامل بنظام يُسمى المصفوفة.",
    poster_url: "/placeholder.svg?height=600&width=400",
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    year: 1999,
    genre: ["Action", "Sci-Fi"],
    rating: 8.7,
    views: 2100000,
    duration: 136,
  },
  {
    id: "5",
    title_en: "Pulp Fiction",
    title_ar: "الخيال الرخيص",
    description_en:
      "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
    description_ar: "حياة قاتلين من المافيا وملاكم وعضو عصابة وزوجته تتشابك في أربع حكايات من العنف والخلاص.",
    poster_url: "/placeholder.svg?height=600&width=400",
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    year: 1994,
    genre: ["Crime", "Drama"],
    rating: 8.9,
    views: 1900000,
    duration: 154,
  },
  {
    id: "6",
    title_en: "Avatar",
    title_ar: "أفاتار",
    description_en:
      "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
    description_ar:
      "جندي بحري مشلول يُرسل إلى قمر باندورا في مهمة فريدة يجد نفسه ممزقاً بين اتباع أوامره وحماية العالم الذي يشعر أنه بيته.",
    poster_url: "/placeholder.svg?height=600&width=400",
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    year: 2009,
    genre: ["Action", "Adventure", "Fantasy"],
    rating: 7.8,
    views: 2800000,
    duration: 162,
  },
  {
    id: "7",
    title_en: "Titanic",
    title_ar: "تايتانيك",
    description_en:
      "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
    description_ar: "أرستقراطية في السابعة عشرة تقع في حب فنان طيب لكن فقير على متن سفينة تايتانيك الفاخرة سيئة الحظ.",
    poster_url: "/placeholder.svg?height=600&width=400",
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    year: 1997,
    genre: ["Drama", "Romance"],
    rating: 7.8,
    views: 3500000,
    duration: 194,
  },
  {
    id: "8",
    title_en: "The Avengers",
    title_ar: "المنتقمون",
    description_en:
      "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
    description_ar:
      "أقوى أبطال الأرض يجب أن يتحدوا ويتعلموا القتال كفريق إذا كانوا سيوقفون لوكي المؤذي وجيشه الفضائي من استعباد البشرية.",
    poster_url: "/placeholder.svg?height=600&width=400",
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    year: 2012,
    genre: ["Action", "Adventure", "Sci-Fi"],
    rating: 8.0,
    views: 2700000,
    duration: 143,
  },
  {
    id: "9",
    title_en: "Joker",
    title_ar: "الجوكر",
    description_en:
      "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime.",
    description_ar:
      "في مدينة جوثام، الكوميديان آرثر فليك المضطرب نفسياً يتم تجاهله وسوء معاملته من المجتمع. ثم يبدأ في دوامة هابطة من الثورة والجريمة الدموية.",
    poster_url: "/placeholder.svg?height=600&width=400",
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    year: 2019,
    genre: ["Crime", "Drama", "Thriller"],
    rating: 8.4,
    views: 2200000,
    duration: 122,
  },
  {
    id: "10",
    title_en: "Spider-Man: No Way Home",
    title_ar: "سبايدر مان: لا طريق للعودة",
    description_en:
      "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear.",
    description_ar:
      "مع كشف هوية سبايدر مان الآن، يطلب بيتر المساعدة من الدكتور سترينج. عندما تسوء التعويذة، يبدأ أعداء خطيرون من عوالم أخرى بالظهور.",
    poster_url: "/placeholder.svg?height=600&width=400",
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
    year: 2021,
    genre: ["Action", "Adventure", "Fantasy"],
    rating: 8.2,
    views: 3100000,
    duration: 148,
  },
]

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getMovies(filters?: MovieFilters): Promise<Movie[]> {
  await delay(500) // Simulate network delay

  let filteredMovies = [...mockMovies]

  if (filters?.genre) {
    filteredMovies = filteredMovies.filter((movie) => movie.genre.includes(filters.genre!))
  }

  if (filters?.year) {
    filteredMovies = filteredMovies.filter((movie) => movie.year === filters.year)
  }

  if (filters?.rating) {
    filteredMovies = filteredMovies.filter((movie) => movie.rating >= filters.rating!)
  }

  if (filters?.sortBy) {
    filteredMovies.sort((a, b) => {
      switch (filters.sortBy) {
        case "year":
          return b.year - a.year
        case "rating":
          return b.rating - a.rating
        case "views":
          return b.views - a.views
        case "title":
          return a.title_en.localeCompare(b.title_en)
        default:
          return 0
      }
    })
  }

  if (filters?.limit) {
    filteredMovies = filteredMovies.slice(0, filters.limit)
  }

  return filteredMovies
}

export async function getMovieById(id: string): Promise<Movie | null> {
  await delay(300)
  return mockMovies.find((movie) => movie.id === id) || null
}

export async function getFeaturedMovies(): Promise<Movie[]> {
  await delay(400)
  return mockMovies.filter((movie) => movie.rating >= 8.5).slice(0, 5)
}

export async function searchMovies(query: string): Promise<Movie[]> {
  await delay(300)

  const searchTerm = query.toLowerCase()
  return mockMovies.filter(
    (movie) =>
      movie.title_en.toLowerCase().includes(searchTerm) ||
      movie.title_ar.includes(searchTerm) ||
      movie.description_en.toLowerCase().includes(searchTerm) ||
      movie.description_ar.includes(searchTerm) ||
      movie.genre.some((genre) => genre.toLowerCase().includes(searchTerm)),
  )
}

export async function getMoviesByGenre(genre: string): Promise<Movie[]> {
  await delay(400)
  return mockMovies.filter((movie) => movie.genre.includes(genre))
}

export async function getGenres(): Promise<string[]> {
  await delay(200)
  const allGenres = mockMovies.flatMap((movie) => movie.genre)
  return [...new Set(allGenres)].sort()
}
