import { executeQuery, isDbConfigured } from "./db";
import { BLOG_POSTS as staticBlogs } from "@/data/blogData";
import { unstable_cache } from "next/cache";
import { promises as fs } from "fs";
import path from "path";

export interface BlogPost {
  id: string;
  publishDate: string;
  authorEn: string;
  authorBn: string;
  readTimeEn: string;
  readTimeBn: string;
  category: string;
  image: string;
  titleEn: string;
  titleBn: string;
  excerptEn: string;
  excerptBn: string;
  contentEn: string;
  contentBn: string;
}

/**
 * RAW: Fetches all blog posts from the DB.
 */
async function getDbBlogPostsRaw(): Promise<BlogPost[]> {
  if (isDbConfigured()) {
    try {
      const rows = await executeQuery<any[]>(
        "SELECT * FROM blog_posts ORDER BY publish_date DESC, id DESC"
      );
      if (rows && rows.length > 0) {
        return rows.map((post) => {
          let formattedDate = "";
          if (post.publish_date) {
            if (post.publish_date instanceof Date) {
              formattedDate = post.publish_date.toISOString().split("T")[0];
            } else {
              formattedDate = String(post.publish_date).split("T")[0];
            }
          }
          return {
            id: post.id,
            publishDate: formattedDate,
            authorEn: post.author_en,
            authorBn: post.author_bn,
            readTimeEn: post.read_time_en,
            readTimeBn: post.read_time_bn,
            category: post.category,
            image: post.image || "",
            titleEn: post.title_en,
            titleBn: post.title_bn,
            excerptEn: post.excerpt_en,
            excerptBn: post.excerpt_bn,
            contentEn: post.content_en,
            contentBn: post.content_bn,
          };
        });
      }
    } catch (err) {
      console.error("Failed to query DB blogs, falling back to static:", err);
    }
  }

  // Fallback: Read local blogs.json file dynamically from disk
  try {
    const localJsonPath = path.join(process.cwd(), "src/data/blogs.json");
    const data = await fs.readFile(localJsonPath, "utf-8");
    return JSON.parse(data) as BlogPost[];
  } catch (err) {
    return staticBlogs as BlogPost[];
  }
}

/**
 * Gets cached blog posts list.
 */
export const getDbBlogPosts = unstable_cache(
  async (): Promise<BlogPost[]> => {
    return getDbBlogPostsRaw();
  },
  ["blogs-list-cache-key"],
  { tags: ["blogs"], revalidate: 300 }
);

/**
 * RAW: Fetches a single blog post by ID.
 */
async function getDbBlogPostByIdRaw(id: string): Promise<BlogPost | null> {
  if (isDbConfigured()) {
    try {
      const rows = await executeQuery<any[]>(
        "SELECT * FROM blog_posts WHERE id = ?",
        [id]
      );
      if (rows && rows.length > 0) {
        const post = rows[0];
        let formattedDate = "";
        if (post.publish_date) {
          if (post.publish_date instanceof Date) {
            formattedDate = post.publish_date.toISOString().split("T")[0];
          } else {
            formattedDate = String(post.publish_date).split("T")[0];
          }
        }
        return {
          id: post.id,
          publishDate: formattedDate,
          authorEn: post.author_en,
          authorBn: post.author_bn,
          readTimeEn: post.read_time_en,
          readTimeBn: post.read_time_bn,
          category: post.category,
          image: post.image || "",
          titleEn: post.title_en,
          titleBn: post.title_bn,
          excerptEn: post.excerpt_en,
          excerptBn: post.excerpt_bn,
          contentEn: post.content_en,
          contentBn: post.content_bn,
        };
      }
    } catch (err) {
      console.error("Failed to query DB blog by ID:", err);
    }
  }

  // Fallback: Read local blogs.json file dynamically from disk
  try {
    const localJsonPath = path.join(process.cwd(), "src/data/blogs.json");
    const data = await fs.readFile(localJsonPath, "utf-8");
    const blogs = JSON.parse(data) as BlogPost[];
    return blogs.find((b) => String(b.id) === String(id)) || null;
  } catch (err) {
    return staticBlogs.find((b) => String(b.id) === String(id)) || null;
  }
}

/**
 * Gets cached single blog post by ID.
 */
export const getDbBlogPostById = unstable_cache(
  async (id: string): Promise<BlogPost | null> => {
    return getDbBlogPostByIdRaw(id);
  },
  ["blog-detail-cache-key"],
  { tags: ["blogs"], revalidate: 300 }
);
