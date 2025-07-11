import { Frown } from "lucide-react"

interface EmptyStateProps {
  message?: string
}

export default function EmptyState({ message = "No results found." }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center text-gray-400">
      <Frown className="h-12 w-12 mb-4" />
      <p className="text-lg font-medium">{message}</p>
    </div>
  )
}
