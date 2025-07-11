"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import NotificationCard from "@/components/notification-card"
import EmptyState from "@/components/empty-state"
import { useToast } from "@/hooks/use-toast"

interface Notification {
  id: string
  title: string
  message: string
  time: string
  type: "new_release" | "update" | "promotion" | "general"
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    title: "New Release: Dune: Part Two",
    message: "Dune: Part Two is now available for streaming! Don't miss out on the epic conclusion.",
    time: "2 hours ago",
    type: "new_release",
  },
  {
    id: "2",
    title: "App Update Available",
    message: "A new version of MovieApp is available with performance improvements and bug fixes. Update now!",
    time: "1 day ago",
    type: "update",
  },
  {
    id: "3",
    title: "Special Offer: Premium Subscription",
    message: "Get 30% off your first month of premium subscription. Limited time offer!",
    time: "3 days ago",
    type: "promotion",
  },
  {
    id: "4",
    title: "Maintenance Notice",
    message: "Scheduled maintenance on July 15th from 2 AM to 4 AM UTC. Service may be interrupted.",
    time: "5 days ago",
    type: "general",
  },
  {
    id: "5",
    title: "New Episode: The Mandalorian S3 E8",
    message: "The final episode of The Mandalorian Season 3 is here! Watch now.",
    time: "1 week ago",
    type: "new_release",
  },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
  const [filterType, setFilterType] = useState<"all" | "new_release" | "update" | "promotion" | "general">("all")
  const { toast } = useToast()

  const handleDismiss = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
    toast({
      title: "Notification Dismissed",
      description: "The notification has been removed.",
      variant: "info",
    })
  }

  const handleClearAll = () => {
    setNotifications([])
    toast({
      title: "All Notifications Cleared",
      description: "Your notification list is now empty.",
      variant: "success",
    })
  }

  const filteredNotifications = useMemo(() => {
    if (filterType === "all") {
      return notifications
    }
    return notifications.filter((notif) => notif.type === filterType)
  }, [notifications, filterType])

  return (
    <div className="min-h-screen bg-background-dark text-text-white pb-16 md:pb-0">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Notifications</h1>

        <div className="flex flex-wrap gap-2 justify-center mb-6">
          <Button
            variant={filterType === "all" ? "default" : "outline"}
            className={
              filterType === "all"
                ? "bg-primary-red text-white"
                : "border-border-gray text-gray-400 hover:bg-background-light"
            }
            onClick={() => setFilterType("all")}
          >
            All
          </Button>
          <Button
            variant={filterType === "new_release" ? "default" : "outline"}
            className={
              filterType === "new_release"
                ? "bg-primary-red text-white"
                : "border-border-gray text-gray-400 hover:bg-background-light"
            }
            onClick={() => setFilterType("new_release")}
          >
            New Releases
          </Button>
          <Button
            variant={filterType === "update" ? "default" : "outline"}
            className={
              filterType === "update"
                ? "bg-primary-red text-white"
                : "border-border-gray text-gray-400 hover:bg-background-light"
            }
            onClick={() => setFilterType("update")}
          >
            Updates
          </Button>
          <Button
            variant={filterType === "promotion" ? "default" : "outline"}
            className={
              filterType === "promotion"
                ? "bg-primary-red text-white"
                : "border-border-gray text-gray-400 hover:bg-background-light"
            }
            onClick={() => setFilterType("promotion")}
          >
            Promotions
          </Button>
          <Button
            variant={filterType === "general" ? "default" : "outline"}
            className={
              filterType === "general"
                ? "bg-primary-red text-white"
                : "border-border-gray text-gray-400 hover:bg-background-light"
            }
            onClick={() => setFilterType("general")}
          >
            General
          </Button>
        </div>

        <div className="flex justify-end mb-4">
          <Button
            variant="ghost"
            className="text-primary-red hover:bg-background-light"
            onClick={handleClearAll}
            disabled={notifications.length === 0}
          >
            Clear All
          </Button>
        </div>

        <div className="grid gap-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notif) => (
              <NotificationCard
                key={notif.id}
                id={notif.id}
                title={notif.title}
                message={notif.message}
                time={notif.time}
                onDismiss={handleDismiss}
              />
            ))
          ) : (
            <EmptyState message="You have no notifications." />
          )}
        </div>
      </div>
    </div>
  )
}
