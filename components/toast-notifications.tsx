"use client"

import type React from "react"

import { useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle, XCircle, AlertCircle, Info } from "lucide-react"

// أنواع الإشعارات
export type ToastType = "success" | "error" | "warning" | "info"

interface ToastOptions {
  title?: string
  description?: string
  duration?: number
  action?: React.ReactNode
}

// خطاف مخصص للإشعارات
export function useNotifications() {
  const { toast } = useToast()

  const showToast = (type: ToastType, options: ToastOptions) => {
    const icons = {
      success: <CheckCircle className="h-5 w-5 text-green-500" />,
      error: <XCircle className="h-5 w-5 text-red-500" />,
      warning: <AlertCircle className="h-5 w-5 text-yellow-500" />,
      info: <Info className="h-5 w-5 text-blue-500" />,
    }

    const variants = {
      success: "default",
      error: "destructive",
      warning: "default",
      info: "default",
    } as const

    toast({
      variant: variants[type],
      title: (
        <div className="flex items-center space-x-2">
          {icons[type]}
          <span>{options.title}</span>
        </div>
      ),
      description: options.description,
      duration: options.duration || 5000,
      action: options.action,
    })
  }

  return {
    success: (options: ToastOptions) => showToast("success", options),
    error: (options: ToastOptions) => showToast("error", options),
    warning: (options: ToastOptions) => showToast("warning", options),
    info: (options: ToastOptions) => showToast("info", options),
  }
}

// مكونات إشعارات جاهزة
export function NetworkErrorToast() {
  const { error } = useNotifications()

  useEffect(() => {
    const handleOnline = () => {
      error({
        title: "تم استعادة الاتصال",
        description: "تم استعادة الاتصال بالإنترنت بنجاح",
      })
    }

    const handleOffline = () => {
      error({
        title: "انقطع الاتصال",
        description: "يرجى التحقق من اتصالك بالإنترنت",
        duration: 10000,
      })
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [error])

  return null
}

// إشعارات المفضلة
export function useFavoriteToasts() {
  const { success, info } = useNotifications()

  const addedToFavorites = (movieTitle: string) => {
    success({
      title: "تمت الإضافة للمفضلة",
      description: `تم إضافة "${movieTitle}" إلى قائمة المفضلة`,
    })
  }

  const removedFromFavorites = (movieTitle: string) => {
    info({
      title: "تم الحذف من المفضلة",
      description: `تم حذف "${movieTitle}" من قائمة المفضلة`,
    })
  }

  return { addedToFavorites, removedFromFavorites }
}

// إشعارات التحميل
export function useDownloadToasts() {
  const { success, info, error } = useNotifications()

  const downloadStarted = (movieTitle: string) => {
    success({
      title: "بدأ التحميل",
      description: `بدأ تحميل "${movieTitle}"`,
    })
  }

  const downloadCompleted = (movieTitle: string) => {
    success({
      title: "اكتمل التحميل",
      description: `تم تحميل "${movieTitle}" بنجاح`,
    })
  }

  const downloadFailed = (movieTitle: string) => {
    error({
      title: "فشل التحميل",
      description: `فشل في تحميل "${movieTitle}". يرجى المحاولة مرة أخرى`,
    })
  }

  return { downloadStarted, downloadCompleted, downloadFailed }
}
