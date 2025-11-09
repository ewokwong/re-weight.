"use client"

import { useEffect, useState, useRef } from "react"
import { SITE_DESCRIPTION } from "@/lib/constants"

interface HeroProps {
  onCTA: () => void
}

export default function Hero({ onCTA }: HeroProps) {
  const [scrollOpacity, setScrollOpacity] = useState(1)
  const [typedText, setTypedText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [wordIndex, setWordIndex] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  const words = ["think", "define", "connect", "weight."]

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

  // Typing animation effect
  useEffect(() => {
    const currentWord = words[wordIndex]
    // Longer pause for "re:weight." to emphasize it
    const pauseTime = currentWord === "weight." ? 5000 : 2000
    
    if (!isDeleting && typedText === currentWord) {
      // Finished typing, pause then start deleting
      const pauseTimeout = setTimeout(() => {
        setIsDeleting(true)
      }, pauseTime)
      return () => clearTimeout(pauseTimeout)
    }
    
    if (isDeleting && typedText === "") {
      // Finished deleting, move to next word
      setIsDeleting(false)
      setWordIndex((prev) => (prev + 1) % words.length)
      return
    }

    const typeSpeed = isDeleting ? 50 : 100
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        setTypedText(currentWord.slice(0, typedText.length + 1))
      } else {
        // Deleting backward
        setTypedText(typedText.slice(0, -1))
      }
    }, typeSpeed)

    return () => clearTimeout(timeout)
  }, [typedText, isDeleting, wordIndex, words])

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
      className="relative min-h-screen bg-primary text-primary-foreground flex items-center justify-center py-20 px-6 sm:px-8 md:px-12 overflow-hidden"
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

      <div className="relative z-10 max-w-4xl mx-auto text-center px-2 sm:px-0">
        <h1 className="text-4xl sm:text-5xl md:text-8xl font-black mb-6 sm:mb-8 text-balance leading-tight tracking-tight">
          re:{typedText}
          <span className="animate-pulse">|</span>
        </h1>
        <div className="h-1 w-24 sm:w-32 bg-secondary mx-auto mb-4 sm:mb-6"></div>
        <p className="text-sm sm:text-base md:text-xl text-primary-foreground/75 mb-4 sm:mb-6 mx-auto sm:whitespace-nowrap font-normal tracking-wide letter-spacing-wide">
          {SITE_DESCRIPTION}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onCTA}
            className="px-6 sm:px-8 py-3 sm:py-4 bg-secondary text-secondary-foreground rounded-full font-normal text-base sm:text-lg hover:bg-secondary/90 transition-all hover:scale-105 active:scale-95 tracking-wider"
          >
            Make a change today
          </button>
        </div>
      </div>
    </section>
  )
}
