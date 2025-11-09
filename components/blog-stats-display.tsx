"use client"

import { Heart, MessageCircle, Eye } from "lucide-react"
import { useBlogStats } from "@/lib/use-blog-stats"

interface BlogStatsDisplayProps {
  slug: string
  initialViews: number
  initialLikes: number
  initialComments: number
}

export default function BlogStatsDisplay({ 
  slug, 
  initialViews, 
  initialLikes, 
  initialComments 
}: BlogStatsDisplayProps) {
  const { stats, incrementLikes, hasLiked, isLoading } = useBlogStats(slug, {
    views: initialViews,
    likes: initialLikes,
    comments: initialComments,
  })

  const handleLike = () => {
    if (!hasLiked) {
      incrementLikes()
    }
  }

  if (isLoading) {
    return (
      <div className="flex gap-4 sm:gap-8 py-8 border-t border-b border-border mb-12">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-xs sm:text-sm">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap gap-4 sm:gap-8 py-8 border-t border-b border-border mb-12">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="text-xs sm:text-sm">{stats.views.toLocaleString()} views</span>
      </div>
      <button
        onClick={handleLike}
        disabled={hasLiked}
        className={`flex items-center gap-2 text-muted-foreground transition-colors ${
          hasLiked 
            ? "cursor-not-allowed opacity-50" 
            : "hover:text-foreground cursor-pointer"
        }`}
      >
        <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${hasLiked ? "fill-current" : ""}`} />
        <span className="text-xs sm:text-sm">{stats.likes.toLocaleString()} likes</span>
      </button>
      <div className="flex items-center gap-2 text-muted-foreground">
        <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="text-xs sm:text-sm">{stats.comments.toLocaleString()} comments</span>
      </div>
    </div>
  )
}

