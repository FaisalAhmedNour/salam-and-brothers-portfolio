import { NextResponse } from "next/server";
import { getDbBlogPosts } from "@/lib/blogs";

/**
 * GET handler: Fetch all blog articles from MySQL or fallback to local static data using cached getter.
 */
export async function GET() {
  try {
    const blogs = await getDbBlogPosts();
    return NextResponse.json(blogs, { status: 200 });
  } catch (err) {
    console.error("Failed to fetch public blogs:", err);
    return NextResponse.json(
      { error: "An internal server error occurred loading blog articles." },
      { status: 500 }
    );
  }
}
