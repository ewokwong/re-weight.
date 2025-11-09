"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Hero from "@/components/hero"
import BlogCard from "@/components/blog-card"
import EmailModal from "@/components/email-modal"
import QuestionForm from "@/components/question-form"
import { mockBlogs } from "@/lib/blog-data"

interface BlogWithStats {
  id: number
  title: string
  excerpt: string
  date: string
  views: number
  likes: number
  comments: number
  slug: string
}

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)
  const [blogs, setBlogs] = useState<BlogWithStats[]>(mockBlogs)

  // Fetch stats for all blogs
  useEffect(() => {
    const fetchBlogStats = async () => {
      try {
        const statsPromises = mockBlogs.map(async (blog) => {
          try {
            const response = await fetch(`/api/blog-stats?slug=${blog.slug}`)
            if (response.ok) {
              const data = await response.json()
              return {
                ...blog,
                views: data.stats.views || 0,
                likes: data.stats.likes || 0,
                comments: data.stats.comments || 0,
              }
            }
          } catch (error) {
            console.error(`Failed to fetch stats for ${blog.slug}:`, error)
          }
          return blog
        })

        const blogsWithStats = await Promise.all(statsPromises)
        setBlogs(blogsWithStats)
      } catch (error) {
        console.error("Failed to fetch blog stats:", error)
      }
    }

    fetchBlogStats()
  }, [])

  useEffect(() => {
    // Handle smooth scroll to articles section if hash is present
    const handleHashScroll = () => {
      if (window.location.hash === "#articles") {
        const element = document.getElementById("articles")
        if (element) {
          setTimeout(() => {
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
            const offsetPosition = elementPosition - 80
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
            })
          }, 100)
        }
      }
    }

    // Check on mount
    handleHashScroll()

    // Also listen for hash changes
    window.addEventListener("hashchange", handleHashScroll)

    return () => window.removeEventListener("hashchange", handleHashScroll)
  }, [])

  return (
    <main className="bg-background text-foreground">
      <Hero onCTA={() => setModalOpen(true)} />

      <section id="articles" className="py-20 px-4 md:px-8 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Latest Articles</h2>
          </div>

          <div className="max-w-2xl mx-auto">
            {blogs.slice(0, 5).map((blog, index) => (
              <div key={blog.id} className={index > 0 ? "mt-8" : ""}>
                <BlogCard blog={blog} />
              </div>
            ))}
          </div>

          {/* View All Articles Button */}
          {blogs.length >= 5 && (
            <div className="mt-12 text-center">
              <Link
                href="/articles"
                className="inline-block px-8 py-4 bg-foreground text-background rounded-full font-medium text-lg hover:opacity-90 transition-opacity"
              >
                View All Articles
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 md:px-8 border-t border-border">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-lg md:text-xl text-muted-foreground mb-6">
              Got a question? Send us a message and we'll either answer you personally or in a post!
            </p>
          </div>
          <QuestionForm />
        </div>
      </section>

      <EmailModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  )
}
