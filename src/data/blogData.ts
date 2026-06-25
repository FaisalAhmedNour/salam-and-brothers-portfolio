import staticBlogs from "./blogs.json";

export interface BlogPost {
  id: string;
  publishDate: string;
  authorEn: string;
  authorBn: string;
  readTimeEn: string;
  readTimeBn: string;
  category: "transformers" | "generators" | "switchgear" | "distribution";
  image: string;
  titleEn: string;
  titleBn: string;
  excerptEn: string;
  excerptBn: string;
  contentEn: string;
  contentBn: string;
}

export const BLOG_POSTS: BlogPost[] = staticBlogs as BlogPost[];
