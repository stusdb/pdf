import { DollarSign, Calendar, Clock, TrendingUp, BarChart2 } from "lucide-react"

interface DetailCardProps {
  label: string
  value: string | number
  icon: "budget" | "release" | "runtime" | "revenue" | "status"
}

const IconMap = {
  budget: DollarSign,
  release: Calendar,
  runtime: Clock,
  revenue: TrendingUp,
  status: BarChart2,
}

export default function DetailCard({ label, value, icon: iconName }: DetailCardProps) {
  const Icon = IconMap[iconName]

  return (
    <div className="flex items-center gap-2 bg-background-light p-3 rounded-lg">
      <Icon className="h-5 w-5 text-primary-red" />
      <div>
        <p className="text-sm text-gray-400">{label}</p>
        <p className="text-base font-medium text-text-white">{value}</p>
      </div>
    </div>
  )
}
