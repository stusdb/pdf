"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { LoadingSpinner } from "@/components/loading-spinner"
import type { Movie } from "@/types/movie"
import { getMovieById } from "@/lib/api"
import { useLanguage } from "@/hooks/use-language"
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, ArrowLeft, Settings, ExternalLink } from "lucide-react"

export default function PlayerPage() {
  const params = useParams()
  const router = useRouter()
  const { language } = useLanguage()
  const videoRef = useRef<HTMLVideoElement>(null)

  const [movie, setMovie] = useState<Movie | null>(null)
  const [loading, setLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [quality, setQuality] = useState("1080p")

  const movieId = params.id as string

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const movieData = await getMovieById(movieId)
        setMovie(movieData)
      } catch (error) {
        console.error("Error loading movie:", error)
      } finally {
        setLoading(false)
      }
    }

    if (movieId) {
      loadMovie()
    }
  }, [movieId])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateTime = () => setCurrentTime(video.currentTime)
    const updateDuration = () => setDuration(video.duration)
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    video.addEventListener("timeupdate", updateTime)
    video.addEventListener("loadedmetadata", updateDuration)
    video.addEventListener("play", handlePlay)
    video.addEventListener("pause", handlePause)

    return () => {
      video.removeEventListener("timeupdate", updateTime)
      video.removeEventListener("loadedmetadata", updateDuration)
      video.removeEventListener("play", handlePlay)
      video.removeEventListener("pause", handlePause)
    }
  }, [])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
  }

  const handleSeek = (value: number[]) => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = value[0]
    setCurrentTime(value[0])
  }

  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current
    if (!video) return

    const newVolume = value[0]
    video.volume = newVolume
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    if (isMuted) {
      video.volume = volume
      setIsMuted(false)
    } else {
      video.volume = 0
      setIsMuted(true)
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const openInExternalPlayer = () => {
    if (movie?.video_url) {
      window.open(movie.video_url, "_blank")
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Movie Not Found</h2>
          <p className="text-gray-400">The requested movie could not be found.</p>
        </div>
      </div>
    )
  }

  const title = language === "ar" ? movie.title_ar : movie.title_en

  return (
    <div className="min-h-screen bg-black relative">
      {/* Video Player */}
      <div
        className="relative w-full h-screen"
        onMouseMove={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          src={movie.video_url}
          poster={movie.poster_url}
          crossOrigin="anonymous"
        >
          {movie.subtitle_url && (
            <track
              kind="subtitles"
              src={movie.subtitle_url}
              srcLang={language}
              label={language === "ar" ? "Arabic" : "English"}
              default
            />
          )}
        </video>

        {/* Controls Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50 transition-opacity duration-300 ${
            showControls ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Top Bar */}
          <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.back()}
                className="text-white hover:bg-white/20"
              >
                <ArrowLeft className="h-6 w-6" />
              </Button>
              <h1 className="text-white font-semibold">{title}</h1>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={openInExternalPlayer}
                className="text-white hover:bg-white/20"
              >
                <ExternalLink className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Center Play Button */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                onClick={togglePlay}
                size="lg"
                className="bg-white/20 hover:bg-white/30 text-white rounded-full w-20 h-20 p-0"
              >
                <Play className="h-10 w-10 ml-1" fill="currentColor" />
              </Button>
            </div>
          )}

          {/* Bottom Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            {/* Progress Bar */}
            <div className="mb-4">
              <Slider
                value={[currentTime]}
                max={duration}
                step={1}
                onValueChange={handleSeek}
                className="w-full [&>span:first-child]:h-1 [&>span:first-child]:bg-white/30 [&_[role=slider]]:bg-blue-500 [&_[role=slider]]:w-4 [&_[role=slider]]:h-4 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-blue-500"
              />
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={togglePlay} className="text-white hover:bg-white/20">
                  {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" fill="currentColor" />}
                </Button>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={toggleMute} className="text-white hover:bg-white/20">
                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                  </Button>
                  <div className="w-20">
                    <Slider
                      value={[isMuted ? 0 : volume]}
                      max={1}
                      step={0.1}
                      onValueChange={handleVolumeChange}
                      className="[&>span:first-child]:h-1 [&>span:first-child]:bg-white/30 [&_[role=slider]]:bg-white [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-white"
                    />
                  </div>
                </div>

                <div className="text-white text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={quality}
                  onChange={(e) => setQuality(e.target.value)}
                  className="bg-white/20 text-white border-none rounded px-2 py-1 text-sm"
                >
                  <option value="480p">480p</option>
                  <option value="720p">720p</option>
                  <option value="1080p">1080p</option>
                </select>

                <Button variant="ghost" size="icon" onClick={toggleFullscreen} className="text-white hover:bg-white/20">
                  {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
