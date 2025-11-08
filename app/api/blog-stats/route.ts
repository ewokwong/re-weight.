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

  console.log("[blog-stats GET] Request received for slug:", slug)
  console.log("[blog-stats GET] MONGODB_URI exists:", !!process.env.MONGODB_URI)

  if (!slug) {
    console.error("[blog-stats GET] Missing slug parameter")
    return NextResponse.json({ error: "Slug is required" }, { status: 400 })
  }

  try {
    console.log("[blog-stats GET] Attempting to get database connection...")
    const db = await getDatabase()
    console.log("[blog-stats GET] Database connection successful")
    
    // Get or create blog entry
    console.log("[blog-stats GET] Fetching blog entry for slug:", slug)
    let blog = await db.collection(collections.blogs).findOne({ slug })
    console.log("[blog-stats GET] Blog found:", !!blog)
    
    if (!blog) {
      console.log("[blog-stats GET] Blog not found, creating new entry...")
      // Initialize blog entry
      const insertResult = await db.collection(collections.blogs).insertOne({
        slug,
        views: 0,
        likes: 0,
        comments: [],
        viewed_by: [],
        liked_by: [],
        updated_at: new Date(),
      })
      console.log("[blog-stats GET] Blog entry created:", insertResult.insertedId)
      // Fetch the newly created blog
      blog = await db.collection(collections.blogs).findOne({ slug })
      console.log("[blog-stats GET] Fetched newly created blog:", !!blog)
    }

    // Check if this visitor has viewed/liked
    const visitorId = getVisitorId(request)
    console.log("[blog-stats GET] Visitor ID:", visitorId.substring(0, 20) + "...")
    const hasViewed = blog?.viewed_by?.includes(visitorId) || false
    const hasLiked = blog?.liked_by?.includes(visitorId) || false
    console.log("[blog-stats GET] hasViewed:", hasViewed, "hasLiked:", hasLiked)

    const response = {
      stats: {
        views: blog?.views || 0,
        likes: blog?.likes || 0,
        comments: blog?.comments?.length || 0,
      },
      hasViewed,
      hasLiked,
    }
    console.log("[blog-stats GET] Returning response:", response)
    return NextResponse.json(response)
  } catch (error: any) {
    console.error("[blog-stats GET] ERROR DETAILS:")
    console.error("  Error message:", error?.message)
    console.error("  Error stack:", error?.stack)
    console.error("  Error name:", error?.name)
    console.error("  Full error:", JSON.stringify(error, Object.getOwnPropertyNames(error)))
    return NextResponse.json(
      { 
        error: "Failed to fetch stats",
        message: error?.message || "Unknown error",
        details: process.env.NODE_ENV === "development" ? error?.stack : undefined
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  console.log("[blog-stats POST] Request received")
  console.log("[blog-stats POST] MONGODB_URI exists:", !!process.env.MONGODB_URI)
  
  try {
    const body = await request.json()
    const { slug, action } = body
    console.log("[blog-stats POST] Slug:", slug, "Action:", action)

    if (!slug || !action) {
      console.error("[blog-stats POST] Missing slug or action")
      return NextResponse.json(
        { error: "Slug and action are required" },
        { status: 400 }
      )
    }

    console.log("[blog-stats POST] Attempting to get database connection...")
    const db = await getDatabase()
    console.log("[blog-stats POST] Database connection successful")
    const visitorId = getVisitorId(request)
    console.log("[blog-stats POST] Visitor ID:", visitorId.substring(0, 20) + "...")

    if (action === "view") {
      console.log("[blog-stats POST] Processing view action...")
      // Check if already viewed
      const blog = await db.collection(collections.blogs).findOne({ slug })
      console.log("[blog-stats POST] Blog found:", !!blog)
      console.log("[blog-stats POST] Already viewed:", blog?.viewed_by?.includes(visitorId))
      
      if (!blog || !blog.viewed_by?.includes(visitorId)) {
        console.log("[blog-stats POST] Incrementing view count...")
        // Increment view count and add visitor
        const updateResult = await db.collection(collections.blogs).updateOne(
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
        console.log("[blog-stats POST] Update result:", updateResult.modifiedCount, "modified,", updateResult.upsertedCount, "upserted")
      }
    } else if (action === "like") {
      console.log("[blog-stats POST] Processing like action...")
      // Check if already liked
      const blog = await db.collection(collections.blogs).findOne({ slug })
      console.log("[blog-stats POST] Blog found:", !!blog)
      console.log("[blog-stats POST] Already liked:", blog?.liked_by?.includes(visitorId))
      
      if (!blog || !blog.liked_by?.includes(visitorId)) {
        console.log("[blog-stats POST] Incrementing like count...")
        // Increment like count and add visitor
        const updateResult = await db.collection(collections.blogs).updateOne(
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
        console.log("[blog-stats POST] Update result:", updateResult.modifiedCount, "modified,", updateResult.upsertedCount, "upserted")
      }
    }

    // Return updated stats
    console.log("[blog-stats POST] Fetching updated blog stats...")
    const blog = await db.collection(collections.blogs).findOne({ slug })
    console.log("[blog-stats POST] Updated blog stats:", {
      views: blog?.views || 0,
      likes: blog?.likes || 0,
      comments: blog?.comments?.length || 0,
    })

    return NextResponse.json({
      stats: {
        views: blog?.views || 0,
        likes: blog?.likes || 0,
        comments: blog?.comments?.length || 0,
      },
    })
  } catch (error: any) {
    console.error("[blog-stats POST] ERROR DETAILS:")
    console.error("  Error message:", error?.message)
    console.error("  Error stack:", error?.stack)
    console.error("  Error name:", error?.name)
    console.error("  Full error:", JSON.stringify(error, Object.getOwnPropertyNames(error)))
    return NextResponse.json(
      { 
        error: "Failed to update stats",
        message: error?.message || "Unknown error",
        details: process.env.NODE_ENV === "development" ? error?.stack : undefined
      },
      { status: 500 }
    )
  }
}
