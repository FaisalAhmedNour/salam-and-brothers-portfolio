"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import PageHeader from "@/components/widgets/PageHeader";
import { BLOG_POSTS, BlogPost } from "@/data/blogData";

// Local translations config for Blog listing items
const TRANSLATIONS = {
  en: {
    title: "Seeco Knowledge Hub",
    searchPlaceholder: "Search articles by title...",
    filterAll: "All Articles",
    filterTransformers: "Transformers",
    filterGenerators: "Generators",
    filterSwitchgear: "Switchgear",
    filterDistribution: "Power Distribution",
    readTime: "Read Time",
    authorLabel: "By",
    readMore: "Read Article",
    featuredBadge: "Featured Article",
    noArticles: "No articles found matching your criteria.",
  },
  bn: {
    title: "সিকো নলেজ হাব",
    searchPlaceholder: "শিরোনাম দিয়ে আর্টিকেল খুঁজুন...",
    filterAll: "সব আর্টিকেল",
    filterTransformers: "ট্রান্সফরমার",
    filterGenerators: "জেনারেটর",
    filterSwitchgear: "সুইচগিয়ার",
    filterDistribution: "বিদ্যুৎ বিতরণ",
    readTime: "পড়ার সময়",
    authorLabel: "লেখক:",
    readMore: "আর্টিকেল পড়ুন",
    featuredBadge: "ফিচার্ড আর্টিকেল",
    noArticles: "আপনার খোঁজা ফিল্টারের সাথে মিলে এমন কোনো আর্টিকেল পাওয়া যায়নি।",
  }
};

/**
 * Main Blog Listing Page Component.
 * Presents a searchable and filterable board of educational articles
 * about electric transformers, switchgears, and power backup solutions.
 */
export default function BlogListingPage() {
  const { language } = useLanguage();
  const activeLang = (language === "bn" ? "bn" : "en") as "en" | "bn";
  const text = TRANSLATIONS[activeLang];

  // Filtering states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Filter posts based on category and search query
  const filteredPosts = BLOG_POSTS.filter((post) => {
    const title = activeLang === "bn" ? post.titleBn : post.titleEn;
    const excerpt = activeLang === "bn" ? post.excerptBn : post.excerptEn;
    const matchesSearch =
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Highlight the first post in the filtered list as "Featured" (if search results are present)
  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const gridPosts = filteredPosts.length > 1 ? filteredPosts.slice(1) : [];

  /**
   * Helper to format publish dates to local format.
   * @param dateStr - ISO date string "YYYY-MM-DD"
   */
  const formatLocalDate = (dateStr: string) => {
    if (activeLang === "en") return dateStr;
    const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return dateStr.replace(/[0-9]/g, (digit) => banglaDigits[parseInt(digit)]);
  };

  return (
    <div className="bg-[#FAF9F5] font-arone text-black min-h-screen">
      {/* Visual Subpage Header */}
      <PageHeader title={text.title} />

      {/* Main Content Section */}
      <section className="py-6">
        <div className="mx-auto max-w-310">

          {/* Controls Bar: Search & Category Tabs */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-5 bg-white p-5 rounded-2xl border border-neutral-100 shadow-sm">
            {/* Real-time search bar */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={text.searchPlaceholder}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-neutral-200 focus:outline-hidden focus:border-brand-red focus:ring-1 focus:ring-brand-red text-[15px] transition-all bg-neutral-50/50"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.637 10.637Z" />
                </svg>
              </span>
            </div>

            {/* Category selection filters */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: "all", label: text.filterAll },
                { id: "transformers", label: text.filterTransformers },
                { id: "generators", label: text.filterGenerators },
                { id: "switchgear", label: text.filterSwitchgear },
                { id: "distribution", label: text.filterDistribution },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={[
                    "px-4 py-2.5 rounded-lg text-[14px] font-semibold transition-all cursor-pointer",
                    selectedCategory === tab.id
                      ? "bg-brand-red text-white shadow-md shadow-red-500/10"
                      : "bg-neutral-50 text-neutral-600 hover:bg-neutral-100",
                  ].join(" ")}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results Area */}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-8 bg-white rounded-2xl border border-neutral-100 shadow-sm">
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mx-auto h-12 w-12 text-neutral-300 mb-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
              </svg>
              <p className="text-[16px] text-neutral-500 font-medium">{text.noArticles}</p>
            </div>
          ) : (
            <div className="space-y-10">

              {/* Highlight Featured Post Spotlight Card (only if search is not filtering it away) */}
              {featuredPost && (
                <div className="bg-white rounded-3xl border border-neutral-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 grid grid-cols-1 lg:grid-cols-12">
                  <div className="relative h-60 md:h-80 lg:h-full lg:col-span-7 bg-neutral-100 overflow-hidden group">
                    {/* Placeholder colored canvas if actual image is missing */}
                    <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center text-white/10 font-black text-[24px] uppercase tracking-widest select-none">
                      SEECO Power Hub
                    </div>
                    {/* Visual post banner */}
                    <div className="absolute inset-0 bg-brand-red/10 group-hover:bg-brand-red/0 transition-all duration-300 z-10" />
                    {/* We can use standard colored gradients as backgrounds for visual assets since no real files exist */}
                    <div className="absolute inset-0 bg-linear-to-tr from-neutral-900/60 to-transparent z-10" />
                  </div>
                  <div className="p-8 md:p-12 lg:col-span-5 flex flex-col justify-between space-y-5">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] uppercase font-bold text-brand-red bg-red-50 px-2.5 py-1 rounded-full">
                          {text[`filter${featuredPost.category.charAt(0).toUpperCase() + featuredPost.category.slice(1)}` as keyof typeof text]}
                        </span>
                        <span className="text-[11px] uppercase font-bold bg-neutral-950 text-white px-2.5 py-1 rounded-full tracking-wider">
                          {text.featuredBadge}
                        </span>
                      </div>
                      <h2 className="font-kanit text-[24px] md:text-[28px] font-bold text-neutral-900 leading-snug hover:text-brand-red transition-colors">
                        <Link href={`/blog/${featuredPost.id}`}>
                          {activeLang === "bn" ? featuredPost.titleBn : featuredPost.titleEn}
                        </Link>
                      </h2>
                      <p className="text-[15px] leading-relaxed text-neutral-600 font-medium">
                        {activeLang === "bn" ? featuredPost.excerptBn : featuredPost.excerptEn}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-4">
                      <div className="text-[12px] text-neutral-500">
                        <span className="font-bold">{text.authorLabel} {activeLang === "bn" ? featuredPost.authorBn : featuredPost.authorEn}</span>
                        <span className="mx-2">•</span>
                        <span>{formatLocalDate(featuredPost.publishDate)}</span>
                      </div>
                      <Link
                        href={`/blog/${featuredPost.id}`}
                        className="inline-flex items-center gap-1.5 bg-brand-red hover:bg-red-600 text-white px-4.5 py-2.5 text-[13px] font-bold rounded-lg transition-colors cursor-pointer"
                      >
                        <span>{text.readMore}</span>
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Grid of Other Articles */}
              {gridPosts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {gridPosts.map((post) => {
                    const displayTitle = activeLang === "bn" ? post.titleBn : post.titleEn;
                    const displayExcerpt = activeLang === "bn" ? post.excerptBn : post.excerptEn;

                    return (
                      <div
                        key={post.id}
                        className="group flex flex-col justify-between bg-white rounded-2xl border border-neutral-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        <div>
                          {/* Image Placeholder Card */}
                          <div className="relative h-48 bg-neutral-800 flex items-center justify-center text-white/5 font-black text-[18px] uppercase tracking-widest select-none overflow-hidden">
                            SEECO Info
                            <div className="absolute inset-0 bg-brand-red/5 group-hover:bg-brand-red/0 transition-all duration-300 z-10" />
                          </div>

                          {/* Card Content */}
                          <div className="p-6 space-y-3">
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-[11px] uppercase font-bold text-brand-red bg-red-50 px-2.5 py-0.5 rounded-full">
                                {text[`filter${post.category.charAt(0).toUpperCase() + post.category.slice(1)}` as keyof typeof text]}
                              </span>
                              <span className="text-[12px] text-neutral-400 font-semibold">{post.readTimeEn}</span>
                            </div>
                            <h3 className="font-kanit text-[18px] font-bold text-neutral-900 leading-snug hover:text-brand-red transition-colors line-clamp-2">
                              <Link href={`/blog/${post.id}`}>{displayTitle}</Link>
                            </h3>
                            <p className="text-[14px] leading-relaxed text-neutral-500 line-clamp-3">
                              {displayExcerpt}
                            </p>
                          </div>
                        </div>

                        {/* Card Footer actions */}
                        <div className="px-6 pb-6 pt-4 border-t border-neutral-100/60 flex items-center justify-between gap-4 text-[12px]">
                          <div className="text-neutral-400 font-semibold">
                            {formatLocalDate(post.publishDate)}
                          </div>
                          <Link
                            href={`/blog/${post.id}`}
                            className="inline-flex items-center gap-1 font-bold text-neutral-900 hover:text-brand-red transition-colors"
                          >
                            <span>{text.readMore}</span>
                            <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

            </div>
          )}

        </div>
      </section>
    </div>
  );
}
