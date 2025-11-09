"use client"

import { useState } from "react"
import { Send } from "lucide-react"

export default function QuestionForm() {
  const [email, setEmail] = useState("")
  const [question, setQuestion] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)
    
    try {
      const response = await fetch("/api/question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, question }),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitted(true)
        setEmail("")
        setQuestion("")
      } else {
        setError(data.error || "Failed to send question. Please try again later.")
      }
    } catch (error) {
      console.error("Error submitting question:", error)
      setError("Failed to send question. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 md:p-8">
        <div className="text-center py-6">
          <div className="mb-3 text-4xl">✓</div>
          <h2 className="text-2xl font-bold mb-2">Question Sent!</h2>
          <p className="text-muted-foreground">
            We'll get back to you soon. Thanks for reaching out!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 md:p-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            suppressHydrationWarning
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
        </div>
        <div>
          <textarea
            placeholder="Your question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
            rows={4}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-none"
          />
        </div>
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-4 py-3 bg-foreground text-background rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          {isSubmitting ? "Sending..." : "Send Question"}
        </button>
      </form>
    </div>
  )
}

