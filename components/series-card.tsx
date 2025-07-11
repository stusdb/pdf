import Link from "next/link"
import Image from "next/image"
import { getBackdropUrl } from "@/lib/tmdb-api"

interface SeriesCardProps {
  id: number
  name: string
  backdropPath: string | null
  overview: string
}

export default function SeriesCard({ id, name, backdropPath, overview }: SeriesCardProps) {
  const imageUrl = getBackdropUrl(backdropPath, "w780")

  return (
    <Link
      href={`/movie/${id}`}
      className="flex flex-col bg-background-light rounded-lg shadow-md overflow-hidden hover:bg-background-dark transition-colors"
      prefetch={false}
    >
      <div className="relative w-full h-36">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg?height=144&width=256"
            e.currentTarget.srcset = ""
          }}
        />
      </div>
      <div className="p-3">
        <h3 className="text-lg font-bold text-text-white line-clamp-1">{name}</h3>
        <p className="text-gray-400 text-sm mt-1 line-clamp-2">{overview}</p>
      </div>
    </Link>
  )
}
