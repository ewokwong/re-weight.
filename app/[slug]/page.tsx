import Link from "next/link"
import { getBlogBySlug, getAllBlogSlugs } from "@/lib/blog-data"
import { Heart, MessageCircle, Eye, ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import type React from "react" // Import React to declare JSX

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs()
  return slugs.map((slug) => ({ slug }))
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const blog = getBlogBySlug(params.slug)

  if (!blog) {
    notFound()
  }

  return (
    <main className="bg-background text-foreground">
      {/* Back Button */}
      <div className="border-b border-border">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Articles
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <div className="h-96 bg-muted overflow-hidden">
        <img src={blog.image || "/placeholder.svg"} alt={blog.title} className="w-full h-full object-cover" />
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 md:px-8 py-16">
        {/* Header */}
        <header className="mb-12">
          <div className="mb-6">
            <p className="text-muted-foreground text-sm mb-2">{blog.date}</p>
            <p className="text-muted-foreground text-sm">By {blog.author}</p>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">{blog.title}</h1>
          <p className="text-xl text-muted-foreground">{blog.excerpt}</p>
        </header>

        {/* Engagement Stats */}
        <div className="flex gap-8 py-8 border-t border-b border-border mb-12">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Eye className="w-5 h-5" />
            <span className="text-sm">{blog.views.toLocaleString()} views</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Heart className="w-5 h-5" />
            <span className="text-sm">{blog.likes.toLocaleString()} likes</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm">{blog.comments.toLocaleString()} comments</span>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          {blog.content.split("\n\n").map((paragraph, idx) => {
            if (paragraph.startsWith("#")) {
              const level = paragraph.match(/^#+/)?.[0].length || 1
              const text = paragraph.replace(/^#+\s/, "")
              const HeadingTag = `h${Math.min(level + 1, 6)}` as keyof React.JSX.IntrinsicElements // Declare JSX before using it
              return (
                <HeadingTag
                  key={idx}
                  className={`font-bold mt-8 mb-4 ${level === 1 ? "text-3xl" : level === 2 ? "text-2xl" : "text-xl"}`}
                >
                  {text}
                </HeadingTag>
              )
            }
            if (paragraph.startsWith("-")) {
              return (
                <ul key={idx} className="list-disc list-inside space-y-2 mb-4 text-muted-foreground">
                  {paragraph.split("\n").map((item, i) => (
                    <li key={i} className="text-base">
                      {item.replace(/^-\s/, "")}
                    </li>
                  ))}
                </ul>
              )
            }
            if (paragraph.match(/^\d+\./)) {
              return (
                <ol key={idx} className="list-decimal list-inside space-y-2 mb-4 text-muted-foreground">
                  {paragraph.split("\n").map((item, i) => (
                    <li key={i} className="text-base">
                      {item.replace(/^\d+\.\s/, "")}
                    </li>
                  ))}
                </ol>
              )
            }
            return (
              <p key={idx} className="text-lg text-muted-foreground leading-relaxed mb-6">
                {paragraph}
              </p>
            )
          })}
        </div>
      </article>

      {/* Related Articles Footer */}
      <div className="border-t border-border py-12 mt-16">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <p className="text-muted-foreground mb-6">Want to explore more articles?</p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-foreground text-background font-bold rounded hover:opacity-90 transition-opacity"
          >
            View All Articles
          </Link>
        </div>
      </div>
    </main>
  )
}
