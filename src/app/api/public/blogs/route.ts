import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";
import { BLOG_POSTS as staticBlogs } from "@/data/blogData";

/**
 * GET handler: Fetch all blog articles from MySQL or fallback to local static data.
 */
export async function GET() {
  try {
    const dbBlogs = await executeQuery<any[]>(
      "SELECT * FROM blog_posts ORDER BY publish_date DESC"
    );
    if (dbBlogs && dbBlogs.length > 0) {
      const blogs = dbBlogs.map((b) => ({
        id: b.id,
        publishDate: new Date(b.publish_date).toISOString().split("T")[0],
        authorEn: b.author_en,
        authorBn: b.author_bn,
        readTimeEn: b.read_time_en,
        readTimeBn: b.read_time_bn,
        category: b.category,
        image: b.image,
        titleEn: b.title_en,
        titleBn: b.title_bn,
        excerptEn: b.excerpt_en,
        excerptBn: b.excerpt_bn,
        contentEn: b.content_en,
        contentBn: b.content_bn,
      }));
      return NextResponse.json(blogs, { status: 200 });
    }
  } catch (err) {
    console.error("Failed to query DB blogs, falling back to static:", err);
  }
  return NextResponse.json(staticBlogs, { status: 200 });
}
