import Image from "next/image"
import { getProfileUrl } from "@/lib/tmdb-api"

interface CastCardProps {
  name: string
  character: string
  profilePath: string | null
}

export default function CastCard({ name, character, profilePath }: CastCardProps) {
  const imageUrl = getProfileUrl(profilePath)

  return (
    <div className="flex flex-col items-center text-center w-[100px] flex-shrink-0">
      <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-primary-red">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg?height=80&width=80"
            e.currentTarget.srcset = ""
          }}
        />
      </div>
      <p className="mt-2 text-sm font-medium text-text-white line-clamp-2">{name}</p>
      <p className="text-xs text-gray-400 line-clamp-2">{character}</p>
    </div>
  )
}
