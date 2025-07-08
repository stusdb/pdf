"use client"

import { createContext, useState, useEffect, type ReactNode } from "react"

interface FavoritesContextType {
  favorites: string[]
  addToFavorites: (movieId: string) => void
  removeFromFavorites: (movieId: string) => void
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

interface FavoritesProviderProps {
  children: ReactNode
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem("vinmax-favorites")
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites))
      } catch (error) {
        console.error("Error parsing favorites from localStorage:", error)
      }
    }
  }, [])

  const addToFavorites = (movieId: string) => {
    setFavorites((prev) => {
      if (prev.includes(movieId)) return prev
      const newFavorites = [...prev, movieId]
      localStorage.setItem("vinmax-favorites", JSON.stringify(newFavorites))
      return newFavorites
    })
  }

  const removeFromFavorites = (movieId: string) => {
    setFavorites((prev) => {
      const newFavorites = prev.filter((id) => id !== movieId)
      localStorage.setItem("vinmax-favorites", JSON.stringify(newFavorites))
      return newFavorites
    })
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  )
}
