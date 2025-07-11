import Link from "next/link"
import Image from "next/image"
import { getImageUrl } from "@/lib/tmdb-api"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface MovieCardProps {
  id: number
  title: string
  posterPath: string | null
  voteAverage?: number
  className?: string
  width?: number
  height?: number
}

export default function MovieCard({
  id,
  title,
  posterPath,
  voteAverage,
  className,
  width = 150,
  height = 225,
}: MovieCardProps) {
  const imageUrl = getImageUrl(posterPath, `w${width}`)
  const displayVoteAverage = voteAverage ? (Math.round(voteAverage * 10) / 10).toFixed(1) : "N/A"

  return (
    <Link href={`/movie/${id}`} className={cn("flex flex-col items-center text-center", className)} prefetch={false}>
      <div className="relative overflow-hidden rounded-lg shadow-lg group">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          width={width}
          height={height}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg?height=225&width=150"
            e.currentTarget.srcset = ""
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
          <p className="text-text-white text-sm font-medium">{title}</p>
        </div>
      </div>
      <p className="mt-2 text-sm font-medium text-text-white truncate w-full max-w-[150px]">{title}</p>
      {voteAverage !== undefined && (
        <div className="flex items-center gap-1 text-accent-gold text-sm mt-1">
          <Star className="h-4 w-4 fill-accent-gold" />
          <span>{displayVoteAverage}</span>
        </div>
      )}
    </Link>
  )
}
