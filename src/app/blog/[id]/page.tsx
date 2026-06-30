import BlogPostDetailClient from "./BlogPostDetailClient";
import { getDbBlogPostById, getDbBlogPosts } from "@/lib/blogs";

// Fallback revalidation cache of 5 minutes (300 seconds) for blog post detail page
export const revalidate = 300;

/**
 * Pre-compiles blog post paths during static site builds.
 */
export async function generateStaticParams() {
  const posts = await getDbBlogPosts();
  return posts.map((post) => ({
    id: String(post.id),
  }));
}

interface BlogPostDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function BlogPostDetailPage({ params }: BlogPostDetailPageProps) {
  const { id } = await params;
  const post = await getDbBlogPostById(id);

  return <BlogPostDetailClient post={post} id={id} />;
}
