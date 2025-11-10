"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import BlogCard from "@/components/blog-card"
import { mockBlogs } from "@/lib/blog-data"
import { ArrowLeft, Search } from "lucide-react"

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

export default function AllArticles() {
  const [blogs, setBlogs] = useState<BlogWithStats[]>(mockBlogs)
  const [searchQuery, setSearchQuery] = useState("")

  // Filter blogs based on search query
  const filteredBlogs = useMemo(() => {
    if (!searchQuery.trim()) {
      return blogs
    }
    
    const query = searchQuery.toLowerCase()
    return blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(query) ||
        blog.excerpt.toLowerCase().includes(query)
    )
  }, [blogs, searchQuery])

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

  return (
    <main className="bg-background text-foreground">
      {/* Back Button */}
      <div className="border-b border-border">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 md:px-12 py-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* All Articles */}
      <section className="py-20 px-6 sm:px-8 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center px-2 sm:px-0">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance">All Articles</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              Explore our complete collection of expert insights and actionable strategies for your weight management journey.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-xl mx-auto px-2 sm:px-0">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2 sm:px-0">
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No articles found matching "{searchQuery}"
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

