"use client"

import type React from "react"

import { createContext, useContext, useReducer, type ReactNode } from "react"

// أنواع البيانات
interface AppState {
  isLoading: boolean
  error: string | null
  user: User | null
  watchHistory: string[]
  downloadQueue: string[]
  playbackSettings: PlaybackSettings
}

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  preferences: UserPreferences
}

interface UserPreferences {
  language: "ar" | "en"
  theme: "dark" | "light"
  autoplay: boolean
  quality: "auto" | "720p" | "1080p" | "4k"
}

interface PlaybackSettings {
  volume: number
  playbackRate: number
  subtitles: boolean
  autoNext: boolean
}

// أنواع الأحداث
type AppAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_USER"; payload: User | null }
  | { type: "ADD_TO_HISTORY"; payload: string }
  | { type: "ADD_TO_DOWNLOADS"; payload: string }
  | { type: "REMOVE_FROM_DOWNLOADS"; payload: string }
  | { type: "UPDATE_PLAYBACK_SETTINGS"; payload: Partial<PlaybackSettings> }
  | { type: "CLEAR_HISTORY" }

// الحالة الأولية
const initialState: AppState = {
  isLoading: false,
  error: null,
  user: null,
  watchHistory: [],
  downloadQueue: [],
  playbackSettings: {
    volume: 1,
    playbackRate: 1,
    subtitles: false,
    autoNext: true,
  },
}

// المخفض (Reducer)
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload }

    case "SET_ERROR":
      return { ...state, error: action.payload }

    case "SET_USER":
      return { ...state, user: action.payload }

    case "ADD_TO_HISTORY":
      const newHistory = [action.payload, ...state.watchHistory.filter((id) => id !== action.payload)].slice(0, 50)
      return { ...state, watchHistory: newHistory }

    case "ADD_TO_DOWNLOADS":
      if (state.downloadQueue.includes(action.payload)) return state
      return { ...state, downloadQueue: [...state.downloadQueue, action.payload] }

    case "REMOVE_FROM_DOWNLOADS":
      return { ...state, downloadQueue: state.downloadQueue.filter((id) => id !== action.payload) }

    case "UPDATE_PLAYBACK_SETTINGS":
      return { ...state, playbackSettings: { ...state.playbackSettings, ...action.payload } }

    case "CLEAR_HISTORY":
      return { ...state, watchHistory: [] }

    default:
      return state
  }
}

// السياق
const StateContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
} | null>(null)

// مزود السياق
export function StateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return <StateContext.Provider value={{ state, dispatch }}>{children}</StateContext.Provider>
}

// خطاف مخصص
export function useAppState() {
  const context = useContext(StateContext)
  if (!context) {
    throw new Error("useAppState must be used within StateProvider")
  }
  return context
}

// خطافات مساعدة
export function useLoading() {
  const { state, dispatch } = useAppState()

  const setLoading = (loading: boolean) => {
    dispatch({ type: "SET_LOADING", payload: loading })
  }

  return { isLoading: state.isLoading, setLoading }
}

export function useError() {
  const { state, dispatch } = useAppState()

  const setError = (error: string | null) => {
    dispatch({ type: "SET_ERROR", payload: error })
  }

  const clearError = () => {
    dispatch({ type: "SET_ERROR", payload: null })
  }

  return { error: state.error, setError, clearError }
}

export function useWatchHistory() {
  const { state, dispatch } = useAppState()

  const addToHistory = (movieId: string) => {
    dispatch({ type: "ADD_TO_HISTORY", payload: movieId })
  }

  const clearHistory = () => {
    dispatch({ type: "CLEAR_HISTORY" })
  }

  return {
    watchHistory: state.watchHistory,
    addToHistory,
    clearHistory,
  }
}

export function useDownloads() {
  const { state, dispatch } = useAppState()

  const addToDownloads = (movieId: string) => {
    dispatch({ type: "ADD_TO_DOWNLOADS", payload: movieId })
  }

  const removeFromDownloads = (movieId: string) => {
    dispatch({ type: "REMOVE_FROM_DOWNLOADS", payload: movieId })
  }

  return {
    downloadQueue: state.downloadQueue,
    addToDownloads,
    removeFromDownloads,
  }
}
