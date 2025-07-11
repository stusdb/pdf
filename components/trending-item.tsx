import Link from "next/link"
import Image from "next/image"
import { getBackdropUrl } from "@/lib/tmdb-api"
import { Star } from "lucide-react"

interface TrendingItemProps {
  id: number
  title: string
  backdropPath: string | null
  voteAverage: number
  overview: string
  index: number
}

export default function TrendingItem({ id, title, backdropPath, voteAverage, overview, index }: TrendingItemProps) {
  const imageUrl = getBackdropUrl(backdropPath, "w780")
  const displayVoteAverage = (Math.round(voteAverage * 10) / 10).toFixed(1)

  return (
    <Link
      href={`/movie/${id}`}
      className="flex items-center gap-4 p-3 bg-background-light rounded-lg shadow-md hover:bg-background-dark transition-colors"
      prefetch={false}
    >
      <div className="relative flex-shrink-0">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          width={120}
          height={80}
          className="rounded-md object-cover"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg?height=80&width=120"
            e.currentTarget.srcset = ""
          }}
        />
        <span className="absolute bottom-0 left-0 bg-primary-red text-white text-xs font-bold px-2 py-1 rounded-tr-lg rounded-bl-lg">
          #{index + 1}
        </span>
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-bold text-text-white line-clamp-1">{title}</h3>
        <div className="flex items-center gap-1 text-accent-gold text-sm mt-1">
          <Star className="h-4 w-4 fill-accent-gold" />
          <span>{displayVoteAverage}</span>
        </div>
        <p className="text-gray-400 text-sm mt-1 line-clamp-2">{overview}</p>
      </div>
    </Link>
  )
}
