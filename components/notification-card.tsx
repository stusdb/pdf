"use client"

import { Bell, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NotificationCardProps {
  id: string
  title: string
  message: string
  time: string
  onDismiss: (id: string) => void
}

export default function NotificationCard({ id, title, message, time, onDismiss }: NotificationCardProps) {
  return (
    <div className="flex items-start gap-4 p-4 bg-background-light rounded-lg shadow-md">
      <Bell className="h-6 w-6 text-primary-red flex-shrink-0 mt-1" />
      <div className="flex-1">
        <h3 className="text-lg font-bold text-text-white">{title}</h3>
        <p className="text-gray-400 text-sm mt-1">{message}</p>
        <p className="text-gray-500 text-xs mt-2">{time}</p>
      </div>
      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-text-white" onClick={() => onDismiss(id)}>
        <X className="h-5 w-5" />
        <span className="sr-only">Dismiss notification</span>
      </Button>
    </div>
  )
}
