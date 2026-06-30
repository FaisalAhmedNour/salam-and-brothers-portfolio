import BlogClient from "./BlogClient";
import { getDbBlogPosts } from "@/lib/blogs";

// Fallback revalidation cache of 5 minutes (300 seconds) for blog listing page
export const revalidate = 300;

export default async function BlogListingPage() {
  const posts = await getDbBlogPosts();
  return <BlogClient initialPosts={posts} />;
}
