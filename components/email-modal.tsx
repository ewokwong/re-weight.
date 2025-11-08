"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"

interface EmailModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function EmailModal({ isOpen, onClose }: EmailModalProps) {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setEmail("")
      setSubmitted(false)
      onClose()
    }, 2000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg max-w-md w-full relative border border-border">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-muted rounded transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          {submitted ? (
            <div className="text-center py-8">
              <div className="mb-4 text-4xl">✓</div>
              <h2 className="text-2xl font-bold mb-2">Welcome!</h2>
              <p className="text-muted-foreground">Check your email for exclusive content and tips.</p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-3">Join Our Community</h2>
              <p className="text-muted-foreground mb-6">
                Get our audio lessons delivered straight to your inbox. Learn on the go - while driving, working, or walking. No reading required.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Start my learning journey
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
