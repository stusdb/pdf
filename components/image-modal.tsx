"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import Image from "next/image"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  imageUrl: string
  altText: string
}

export default function ImageModal({ isOpen, onClose, imageUrl, altText }: ImageModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full p-0 bg-transparent border-none shadow-none">
        <div className="relative w-full h-[80vh] flex items-center justify-center">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={altText}
            fill
            className="object-contain rounded-lg"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg?height=720&width=1280"
              e.currentTarget.srcset = ""
            }}
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Close image</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
