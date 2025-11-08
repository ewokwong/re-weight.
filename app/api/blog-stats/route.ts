import { NextRequest, NextResponse } from "next/server"
import { getDatabase, collections } from "@/lib/db"

// Generate a simple visitor ID from request headers
function getVisitorId(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for")
  const realIp = request.headers.get("x-real-ip")
  const userAgent = request.headers.get("user-agent") || ""
  
  const ip = forwarded?.split(",")[0] || realIp || "unknown"
  return `${ip}-${userAgent.slice(0, 50)}`.replace(/[^a-zA-Z0-9-]/g, "")
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get("slug")

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 })
  }

  try {
    const db = await getDatabase()
    
    // Get or create blog entry atomically
    // Use findOneAndUpdate with upsert to ensure we don't lose data in race conditions
    const blog = await db.collection(collections.blogs).findOneAndUpdate(
      { slug },
      {
        $setOnInsert: {
          views: 0,
          likes: 0,
          comments: [],
          viewed_by: [],
          liked_by: [],
          updated_at: new Date(),
        },
      },
      {
        upsert: true,
        returnDocument: "after",
      }
    )

    // Check if this visitor has viewed/liked
    const visitorId = getVisitorId(request)
    const hasViewed = blog?.viewed_by?.includes(visitorId) || false
    const hasLiked = blog?.liked_by?.includes(visitorId) || false

    return NextResponse.json({
      stats: {
        views: blog?.views || 0,
        likes: blog?.likes || 0,
        comments: blog?.comments?.length || 0,
      },
      hasViewed,
      hasLiked,
    })
  } catch (error: any) {
    console.error("Error fetching stats:", error)
    return NextResponse.json(
      { 
        error: "Failed to fetch stats",
        details: process.env.NODE_ENV === "development" ? error.message : undefined
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { slug, action } = body

    if (!slug || !action) {
      return NextResponse.json(
        { error: "Slug and action are required" },
        { status: 400 }
      )
    }

    const db = await getDatabase()
    const visitorId = getVisitorId(request)

    if (action === "view") {
      // Check if already viewed
      const blog = await db.collection(collections.blogs).findOne({ slug })
      
      if (!blog || !blog.viewed_by?.includes(visitorId)) {
        // Increment view count and add visitor
        await db.collection(collections.blogs).updateOne(
          { slug },
          {
            $inc: { views: 1 },
            $addToSet: { viewed_by: visitorId },
            $setOnInsert: {
              likes: 0,
              comments: [],
              liked_by: [],
              updated_at: new Date(),
            },
          },
          { upsert: true }
        )
      }
    } else if (action === "like") {
      // Check if already liked
      const blog = await db.collection(collections.blogs).findOne({ slug })
      
      if (!blog || !blog.liked_by?.includes(visitorId)) {
        // Increment like count and add visitor
        await db.collection(collections.blogs).updateOne(
          { slug },
          {
            $inc: { likes: 1 },
            $addToSet: { liked_by: visitorId },
            $setOnInsert: {
              views: 0,
              comments: [],
              viewed_by: [],
              updated_at: new Date(),
            },
          },
          { upsert: true }
        )
      }
    }

    // Return updated stats
    const blog = await db.collection(collections.blogs).findOne({ slug })

    return NextResponse.json({
      stats: {
        views: blog?.views || 0,
        likes: blog?.likes || 0,
        comments: blog?.comments?.length || 0,
      },
    })
  } catch (error: any) {
    console.error("Error updating stats:", error)
    return NextResponse.json(
      { 
        error: "Failed to update stats",
        details: process.env.NODE_ENV === "development" ? error.message : undefined
      },
      { status: 500 }
    )
  }
}
