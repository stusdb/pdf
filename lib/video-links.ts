// 🎬 إدارة روابط الأفلام والمسلسلات
// يمكنك إضافة روابط الأفلام هنا بسهولة

export interface VideoLink {
  movieId: string
  title: string
  videoUrl: string
  quality: string[]
  subtitles?: {
    language: string
    url: string
  }[]
}

// 📝 أضف روابط الأفلام هنا
export const videoLinks: VideoLink[] = [
  {
    movieId: "550", // Fight Club
    title: "Fight Club",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    quality: ["720p", "1080p"],
    subtitles: [
      {
        language: "ar",
        url: "/subtitles/fight-club-ar.vtt",
      },
      {
        language: "en",
        url: "/subtitles/fight-club-en.vtt",
      },
    ],
  },
  {
    movieId: "155", // The Dark Knight
    title: "The Dark Knight",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    quality: ["720p", "1080p", "4K"],
  },
  {
    movieId: "27205", // Inception
    title: "Inception",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    quality: ["720p", "1080p"],
  },
  // 👆 أضف المزيد من الروابط هنا بنفس الطريقة
]

// 🔍 البحث عن رابط الفيلم
export function getVideoLink(movieId: string): VideoLink | null {
  return videoLinks.find((link) => link.movieId === movieId) || null
}

// 📋 الحصول على جميع الروابط المتاحة
export function getAllVideoLinks(): VideoLink[] {
  return videoLinks
}
