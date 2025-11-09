"use client"

import { Heart, MessageCircle, Eye } from "lucide-react"
import Link from "next/link"

interface Blog {
  id: number
  title: string
  excerpt: string
  date: string
  views: number
  likes: number
  comments: number
  slug: string
}

interface BlogCardProps {
  blog: Blog
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <Link href={`/${blog.slug}`}>
      <article className="group bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow cursor-pointer h-full">
        <div className="p-4 sm:p-6">
          <p className="text-sm text-muted-foreground mb-3">{blog.date}</p>

          <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            {blog.title}
          </h3>

          <p className="text-muted-foreground mb-6 line-clamp-2">{blog.excerpt}</p>

          <div className="flex gap-6 pt-4 border-t border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Eye className="w-4 h-4" />
              <span>{blog.views.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Heart className="w-4 h-4" />
              <span>{blog.likes.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MessageCircle className="w-4 h-4" />
              <span>{blog.comments.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
