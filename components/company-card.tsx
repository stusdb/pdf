import Image from "next/image"
import { getLogoUrl } from "@/lib/tmdb-api"

interface CompanyCardProps {
  name: string
  logoPath: string | null
}

export default function CompanyCard({ name, logoPath }: CompanyCardProps) {
  const imageUrl = getLogoUrl(logoPath)

  return (
    <div className="flex flex-col items-center text-center w-[100px] flex-shrink-0">
      <div className="relative w-16 h-16 flex items-center justify-center bg-white rounded-lg p-2">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={name}
          width={64}
          height={64}
          className="object-contain"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg?height=64&width=64"
            e.currentTarget.srcset = ""
          }}
        />
      </div>
      <p className="mt-2 text-xs text-gray-400 line-clamp-2">{name}</p>
    </div>
  )
}
