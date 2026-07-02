import { NextResponse } from "next/server";
import { executeQuery, isDbConfigured } from "@/lib/db";
import { revalidatePath, revalidateTag } from "next/cache";
import { promises as fs } from "fs";
import path from "path";
import { checkAuth } from "@/lib/auth";

const localJsonPath = path.join(process.cwd(), "src/data/blogs.json");

/**
 * Read blogs fallback JSON file asynchronously.
 */
async function readFallbackJson(): Promise<any[]> {
  try {
    const data = await fs.readFile(localJsonPath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

/**
 * Write blogs fallback JSON file asynchronously.
 */
async function writeFallbackJson(data: any[]) {
  try {
    const dir = path.dirname(localJsonPath);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(localJsonPath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write fallback blogs.json:", err);
  }
}

/**
 * GET: retrieve blogs list directly from DB (dashboard preview) or local fallback.
 */
export async function GET() {
  if (isDbConfigured()) {
    try {
      const dbBlogs = await executeQuery<any[]>("SELECT * FROM blog_posts ORDER BY publish_date DESC");
      if (dbBlogs) {
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
    } catch (error) {
      console.error("Dashboard Blogs GET DB error, falling back to local JSON:", error);
    }
  }

  // Fallback to static JSON
  const fallbackBlogs = (await readFallbackJson()).map((b) => ({
    id: b.id,
    publishDate: b.publishDate,
    authorEn: b.authorEn,
    authorBn: b.authorBn || "",
    readTimeEn: b.readTimeEn,
    readTimeBn: b.readTimeBn || "",
    category: b.category,
    image: b.image || "",
    titleEn: b.titleEn,
    titleBn: b.titleBn || "",
    excerptEn: b.excerptEn || "",
    excerptBn: b.excerptBn || "",
    contentEn: b.contentEn || "",
    contentBn: b.contentBn || "",
  }));
  return NextResponse.json(fallbackBlogs, { status: 200 });
}

/**
 * POST: Create a new blog post.
 */
export async function POST(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const blog = await request.json();
    const {
      id, publishDate, authorEn, authorBn, readTimeEn, readTimeBn,
      category, image, titleEn, titleBn, excerptEn, excerptBn, contentEn, contentBn
    } = blog;

    if (!id || !publishDate || !authorEn || !titleEn) {
      return NextResponse.json({ error: "Missing required blog post fields" }, { status: 400 });
    }

    if (isDbConfigured()) {
      try {
        const query = `
          INSERT INTO blog_posts (
            id, publish_date, author_en, author_bn, read_time_en, read_time_bn,
            category, image, title_en, title_bn, excerpt_en, excerpt_bn, content_en, content_bn
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const params = [
          id, publishDate, authorEn, authorBn || "", readTimeEn || "", readTimeBn || "",
          category, image || "", titleEn, titleBn || "", excerptEn || "", excerptBn || "",
          contentEn || "", contentBn || ""
        ];

        await executeQuery(query, params);
      } catch (dbErr) {
        console.error("Failed to insert blog post in DB:", dbErr);
      }
    }

    // Always update fallback JSON file
    const currentFallback = await readFallbackJson();
    const newBlogJson = {
      id,
      publishDate,
      authorEn,
      authorBn: authorBn || "",
      readTimeEn: readTimeEn || "",
      readTimeBn: readTimeBn || "",
      category,
      image: image || "",
      titleEn,
      titleBn: titleBn || "",
      excerptEn: excerptEn || "",
      excerptBn: excerptBn || "",
      contentEn: contentEn || "",
      contentBn: contentBn || "",
    };
    currentFallback.unshift(newBlogJson); // Prepend newest first
    await writeFallbackJson(currentFallback);

    // Purge ISR page caches and tags on modifications
    revalidatePath("/blog");
    revalidatePath("/blog/[id]");
    revalidatePath("/");
    revalidateTag("blogs", "max");
    revalidatePath("/", "layout");

    return NextResponse.json({ success: true, message: "Blog post created successfully." }, { status: 200 });
  } catch (error) {
    console.error("Dashboard Blog POST error:", error);
    return NextResponse.json({ error: "Failed to insert blog post record" }, { status: 500 });
  }
}

/**
 * PUT: Update an existing blog post.
 */
export async function PUT(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const blog = await request.json();
    const {
      id, publishDate, authorEn, authorBn, readTimeEn, readTimeBn,
      category, image, titleEn, titleBn, excerptEn, excerptBn, contentEn, contentBn
    } = blog;

    if (!id) {
      return NextResponse.json({ error: "Blog ID is required for editing" }, { status: 400 });
    }

    if (isDbConfigured()) {
      try {
        const query = `
          UPDATE blog_posts SET 
            publish_date = ?, author_en = ?, author_bn = ?, read_time_en = ?, read_time_bn = ?, 
            category = ?, image = ?, title_en = ?, title_bn = ?, excerpt_en = ?, excerpt_bn = ?, 
            content_en = ?, content_bn = ?
          WHERE id = ?
        `;

        const params = [
          publishDate, authorEn, authorBn || "", readTimeEn || "", readTimeBn || "",
          category, image || "", titleEn, titleBn || "", excerptEn || "", excerptBn || "",
          contentEn || "", contentBn || "", id
        ];

        await executeQuery(query, params);
      } catch (dbErr) {
        console.error("Failed to update blog post in DB:", dbErr);
      }
    }

    // Always update fallback JSON file
    const currentFallback = await readFallbackJson();
    const updatedFallback = currentFallback.map((b) => {
      if (b.id === id) {
        return {
          id,
          publishDate,
          authorEn,
          authorBn: authorBn || "",
          readTimeEn: readTimeEn || "",
          readTimeBn: readTimeBn || "",
          category,
          image: image || "",
          titleEn,
          titleBn: titleBn || "",
          excerptEn: excerptEn || "",
          excerptBn: excerptBn || "",
          contentEn: contentEn || "",
          contentBn: contentBn || "",
        };
      }
      return b;
    });
    await writeFallbackJson(updatedFallback);

    // Purge ISR page caches and tags on modifications
    revalidatePath("/blog");
    if (id) {
      revalidatePath(`/blog/${id}`);
    }
    revalidatePath("/blog/[id]");
    revalidatePath("/");
    revalidateTag("blogs", "max");
    revalidatePath("/", "layout");

    return NextResponse.json({ success: true, message: "Blog post updated successfully." }, { status: 200 });
  } catch (error) {
    console.error("Dashboard Blog PUT error:", error);
    return NextResponse.json({ error: "Failed to update blog post record" }, { status: 500 });
  }
}

/**
 * DELETE: Remove a blog post.
 */
export async function DELETE(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Blog ID parameter is required" }, { status: 400 });
    }

    if (isDbConfigured()) {
      try {
        await executeQuery("DELETE FROM blog_posts WHERE id = ?", [id]);
      } catch (dbErr) {
        console.error("Failed to delete blog post in DB:", dbErr);
      }
    }

    // Always update fallback JSON file
    const currentFallback = await readFallbackJson();
    const filteredFallback = currentFallback.filter((b) => b.id !== id);
    await writeFallbackJson(filteredFallback);

    // Purge ISR page caches and tags on modifications
    revalidatePath("/blog");
    revalidatePath("/blog/[id]");
    revalidatePath("/");
    revalidateTag("blogs", "max");
    revalidatePath("/", "layout");

    return NextResponse.json({ success: true, message: "Blog post deleted successfully." }, { status: 200 });
  } catch (error) {
    console.error("Dashboard Blog DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete blog post record" }, { status: 500 });
  }
}
