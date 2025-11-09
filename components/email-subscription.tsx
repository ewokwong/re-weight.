"use client"

import { useState } from "react"
import { Send } from "lucide-react"

export default function EmailSubscription() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setSubmitted(true)
        setEmail("")
      } else {
        console.error("Failed to save email")
        setSubmitted(true)
        setEmail("")
      }
    } catch (error) {
      console.error("Error submitting email:", error)
      setSubmitted(true)
      setEmail("")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full">
      <div className="bg-card border border-border rounded-lg p-4 md:p-6">
        {submitted ? (
          <div className="text-center py-6">
            <div className="mb-3 text-4xl">✓</div>
            <h2 className="text-2xl font-bold mb-2">Welcome to re:weight!</h2>
            <p className="text-muted-foreground text-sm">
              Check your email for exclusive content and tips.
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Join the Movement</h2>
              <p className="text-xs text-muted-foreground max-w-xl mx-auto">
                Get our audio lessons delivered straight to your inbox. Learn on the go - while driving, working, or walking. No reading required.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                suppressHydrationWarning
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? "Subscribing..." : "Start my learning journey"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

