"use client"

import { useState, useEffect } from "react"
import { MessageCircle, Send, User, Reply } from "lucide-react"
import { useBlogStats } from "@/lib/use-blog-stats"

interface Comment {
  id: number
  author: string
  content: string
  date: string
  createdAt?: string
  parentId?: number | null
  replies?: Comment[]
}

interface CommentsSectionProps {
  blogSlug: string
  initialComments?: Comment[]
  initialCommentsCount?: number
}

function CommentItem({ 
  comment, 
  blogSlug, 
  onReply 
}: { 
  comment: Comment
  blogSlug: string
  onReply: (parentId: number) => void
}) {
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "Just now"
    try {
      return new Date(dateStr).toLocaleDateString()
    } catch {
      return "Just now"
    }
  }

  return (
    <div className="pb-6 border-b border-border last:border-0">
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            <User className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-semibold">{comment.author}</span>
            <span className="text-sm text-muted-foreground">
              {formatDate(comment.createdAt || comment.date)}
            </span>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-3">{comment.content}</p>
          <button
            onClick={() => onReply(comment.id)}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Reply className="w-4 h-4" />
            Reply
          </button>
          
          {/* Render replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-6 ml-6 pl-6 border-l border-border space-y-6">
              {comment.replies.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  blogSlug={blogSlug}
                  onReply={onReply}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function CommentsSection({ 
  blogSlug, 
  initialComments = [], 
  initialCommentsCount = 0 
}: CommentsSectionProps) {
  const { updateComments } = useBlogStats(blogSlug, {
    views: 0,
    likes: 0,
    comments: initialCommentsCount,
  })
  
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [newComment, setNewComment] = useState("")
  const [authorName, setAuthorName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [replyingTo, setReplyingTo] = useState<number | null>(null)

  // Load comments from API
  useEffect(() => {
    const loadComments = async () => {
      try {
        const response = await fetch(`/api/blog-comments?slug=${blogSlug}`)
        if (response.ok) {
          const data = await response.json()
          setComments(data.comments)
          // Count only top-level comments
          const topLevelCount = data.comments.length
          updateComments(topLevelCount)
        }
      } catch (error) {
        console.error("Failed to load comments", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadComments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blogSlug]) // updateComments is stable now, but we'll keep it out to be safe

  const handleSubmit = async (e: React.FormEvent, parentId?: number | null) => {
    e.preventDefault()
    if (!newComment.trim() || !authorName.trim() || isSubmitting) return

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/blog-comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: blogSlug,
          author: authorName,
          content: newComment,
          parentId: parentId || null,
        }),
      })

      if (response.ok) {
        // Reload all comments to get the nested structure
        const reloadResponse = await fetch(`/api/blog-comments?slug=${blogSlug}`)
        if (reloadResponse.ok) {
          const reloadData = await reloadResponse.json()
          setComments(reloadData.comments)
          const topLevelCount = reloadData.comments.length
          updateComments(topLevelCount)
        }
        
        setNewComment("")
        setAuthorName("")
        setReplyingTo(null)
      }
    } catch (error) {
      console.error("Failed to post comment", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReply = (parentId: number) => {
    setReplyingTo(parentId)
  }

  const totalComments = comments.reduce((count, comment) => {
    return count + 1 + (comment.replies?.length || 0)
  }, 0)

  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-8 md:px-12 py-16 border-t border-border">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <MessageCircle className="w-6 h-6 text-muted-foreground" />
          <h2 className="text-3xl font-bold">Comments</h2>
        </div>
        <p className="text-muted-foreground">
          {totalComments} comment{totalComments !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Comment Form */}
      <form 
        onSubmit={(e) => handleSubmit(e, replyingTo)} 
        className="mb-12 p-6 bg-card border border-border rounded-lg"
      >
        {replyingTo && (
          <div className="mb-4 p-3 bg-muted rounded-md">
            <p className="text-sm text-muted-foreground">
              Replying to comment #{replyingTo}
            </p>
            <button
              type="button"
              onClick={() => setReplyingTo(null)}
              className="text-xs text-muted-foreground hover:text-foreground mt-1"
            >
              Cancel reply
            </button>
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="author" className="block text-sm font-medium mb-2">
            Name
          </label>
          <input
            id="author"
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="Your name"
            className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="comment" className="block text-sm font-medium mb-2">
            {replyingTo ? "Reply" : "Comment"}
          </label>
          <textarea
            id="comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={replyingTo ? "Write your reply..." : "Share your thoughts..."}
            rows={4}
            className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting || !newComment.trim() || !authorName.trim()}
          className="flex items-center gap-2 px-6 py-2 bg-foreground text-background font-medium rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
          {isSubmitting ? "Posting..." : replyingTo ? "Post Reply" : "Post Comment"}
        </button>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {isLoading ? (
          <p className="text-muted-foreground text-center py-8">Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No comments yet. Be the first to share your thoughts!</p>
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              blogSlug={blogSlug}
              onReply={handleReply}
            />
          ))
        )}
      </div>
    </div>
  )
}

