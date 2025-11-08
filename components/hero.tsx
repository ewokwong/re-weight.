"use client"

import { useEffect, useState, useRef } from "react"

interface HeroProps {
  onCTA: () => void
}

export default function Hero({ onCTA }: HeroProps) {
  const [scrollOpacity, setScrollOpacity] = useState(1)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      // Calculate opacity based on scroll position (fade out in first 500px of scroll)
      const scrolled = window.scrollY
      const opacity = Math.max(0, 1 - scrolled / 500)
      setScrollOpacity(opacity)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Ensure video is always muted
    video.muted = true
    video.volume = 0
    video.playbackRate = 1.0 // Normal speed

    // Handle video loading
    const handleLoadedMetadata = () => {
      // Ensure video is ready
      video.play().catch(() => {
        // Handle autoplay restrictions
      })
    }

    // Handle video events
    video.addEventListener('loadedmetadata', handleLoadedMetadata)

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
    }
  }, [])

  return (
    <section
      className="relative min-h-screen bg-primary text-primary-foreground flex items-center justify-center py-20 px-4 overflow-hidden"
      style={{ opacity: scrollOpacity, transition: "opacity 0.1s ease-out" }}
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/clip.mp4" type="video/mp4" />
      </video>
      
      <div className="absolute inset-0 bg-primary/60"></div>

      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 text-7xl font-black">↗</div>
        <div className="absolute bottom-20 right-10 text-7xl font-black">↙</div>
        <div className="absolute top-1/3 right-20 text-6xl font-black">×</div>
        <div className="absolute bottom-1/3 left-1/4 text-5xl font-black">•</div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 className="text-6xl md:text-8xl font-black mb-6 text-balance leading-tight tracking-tight">
          TWMM
        </h1>
        <p className="text-2xl md:text-4xl font-normal mb-6 text-primary-foreground/90">
          The Weight Management Movement.
        </p>

        <div className="h-1 w-32 bg-secondary mx-auto mb-6"></div>

        <p className="text-lg md:text-xl text-primary-foreground/75 mb-6 max-w-2xl mx-auto text-balance font-normal tracking-wide letter-spacing-wide">
          Helping you not only lose the weight, but keep it off for life.       
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onCTA}
            className="px-8 py-4 bg-secondary text-secondary-foreground rounded-full font-normal text-lg hover:bg-secondary/90 transition-all hover:scale-105 active:scale-95 tracking-wider"
          >
            Join the Movement
          </button>
        </div>
      </div>
    </section>
  )
}
