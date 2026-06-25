"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { BLOG_POSTS as staticBlogs, BlogPost } from "@/data/blogData";

/**
 * LatestNews Component.
 * Dynamically fetches and renders the 3 most recent articles on the landing page,
 * falling back to static blogs instantly to prevent visual layout shifts.
 */
export default function LatestNews() {
  const { t, language } = useLanguage();
  const activeLang = (language === "bn" ? "bn" : "en") as "en" | "bn";

  // Pre-load state with static mock articles so we show content instantly
  const [posts, setPosts] = useState<BlogPost[]>(staticBlogs.slice(0, 3));

  useEffect(() => {
    async function loadBlogs() {
      try {
        const res = await fetch("/api/public/blogs");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setPosts(data.slice(0, 3));
          }
        }
      } catch (err) {
        console.warn("Failed to load homepage blogs, running static fallback:", err);
      }
    }
    loadBlogs();
  }, []);

  /**
   * Helper to format publish dates to local digits in Bangla if active.
   */
  const formatLocalDate = (dateStr: string) => {
    if (activeLang === "en") return dateStr;
    const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return dateStr.replace(/[0-9]/g, (digit) => banglaDigits[parseInt(digit)]);
  };

  /**
   * Translates the article categories for badges.
   */
  const getCategoryLabel = (category: string) => {
    if (activeLang === "bn") {
      switch (category) {
        case "transformers": return "ট্রান্সফরমার";
        case "generators": return "জেনারেটর";
        case "switchgear": return "সুইচগিয়ার";
        case "distribution": return "বিদ্যুৎ বিতরণ";
        default: return category;
      }
    } else {
      switch (category) {
        case "transformers": return "Transformer";
        case "generators": return "Generator";
        case "switchgear": return "Switchgear";
        case "distribution": return "Distribution";
        default: return category;
      }
    }
  };

  return (
    <section id="blog" className="bg-white py-20 px-6 font-arone border-t border-gray-100">
      <div className="mx-auto max-w-310">

        {/* News Section Header */}
        <div className="text-center mb-16 max-w-200 mx-auto select-none">
          <h2 className="font-kanit text-[32px] font-bold text-neutral-900 md:text-[42px] tracking-tight">
            {t("latestNews.title")}
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-gray-500">
            {t("latestNews.subtitle")}
          </p>
        </div>

        {/* 3-column Blog Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const title = activeLang === "bn" ? post.titleBn : post.titleEn;
            const excerpt = activeLang === "bn" ? post.excerptBn : post.excerptEn;
            const readTime = activeLang === "bn" ? post.readTimeBn : post.readTimeEn;
            const linkHref = `/blog/${post.id}`;

            return (
              <article
                key={post.id}
                className="group flex flex-col justify-between border border-gray-150 bg-white overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md rounded-xl"
              >
                <div>
                  {/* Image Container with Zoom Animation */}
                  <Link href={linkHref} className="relative block aspect-4/3 w-full overflow-hidden bg-gray-50">
                    <Image
                      src={post.image || "/images/blog-generator.webp"}
                      alt={title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      unoptimized
                    />
                  </Link>

                  {/* Article Copy Details */}
                  <div className="p-6 space-y-4">
                    
                    {/* Meta Tags Row */}
                    <div className="flex items-center gap-3 select-none">
                      <span className="text-[10px] bg-brand-red/10 border border-brand-red/10 px-2.5 py-1 rounded-full uppercase tracking-wider text-brand-red font-extrabold">
                        {getCategoryLabel(post.category)}
                      </span>
                      <span className="text-[12px] font-semibold text-gray-400 font-mono">
                        {formatLocalDate(post.publishDate)}
                      </span>
                      <span className="text-[11px] font-bold text-gray-500">
                        • {readTime}
                      </span>
                    </div>

                    {/* Article Title */}
                    <h3 className="font-kanit text-[19px] font-bold text-neutral-900 leading-snug transition-colors duration-300 hover:text-brand-red">
                      <Link href={linkHref}>{title}</Link>
                    </h3>

                    {/* Text Excerpt */}
                    <p className="text-[14px] leading-relaxed text-gray-600 line-clamp-3">
                      {excerpt}
                    </p>

                    {/* Link button */}
                    <div className="pt-2 select-none">
                      <Link href={linkHref} className="inline-flex items-center gap-1.5 text-[13px] font-bold text-brand-red hover:text-brand-red-hover transition-colors">
                        <span>{activeLang === "bn" ? "আর্টিকেল পড়ুন" : "Read Article"}</span>
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                      </Link>
                    </div>

                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
