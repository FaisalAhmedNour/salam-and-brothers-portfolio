"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import PageHeader from "@/components/widgets/PageHeader";
import { BLOG_POSTS as staticBlogs, BlogPost } from "@/data/blogData";

// Local translations config for Blog detail items
const TRANSLATIONS = {
  en: {
    backBtn: "Go Back",
    authorLabel: "Author",
    publishLabel: "Published On",
    readTime: "Read Time",
    notFound: "Article Not Found",
    notFoundDesc: "The article you are looking for does not exist or has been removed.",
    goBack: "Go back to blog board",
    shareTitle: "Share this article",
  },
  bn: {
    backBtn: "ফিরে যান",
    authorLabel: "লেখক",
    publishLabel: "প্রকাশের তারিখ",
    readTime: "পড়ার সময়",
    notFound: "আর্টিকেল পাওয়া যায়নি",
    notFoundDesc: "আপনি যে আর্টিকেলটি খুঁজছেন তা বিদ্যমান নেই বা সরিয়ে ফেলা হয়েছে।",
    goBack: "ব্লগ বোর্ডে ফিরে যান",
    shareTitle: "আর্টিকেলটি শেয়ার করুন",
  }
};

/**
 * Dynamic Blog Post Reader Page.
 * Resolves dynamic Next.js parameters, retrieves the matching post, and
 * renders a structured, premium, readable layout in the active language.
 */
export default function BlogPostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { language, t } = useLanguage();
  const activeLang = (language === "bn" ? "bn" : "en") as "en" | "bn";
  const text = TRANSLATIONS[activeLang];

  // Dynamic post load states
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPost() {
      try {
        const res = await fetch("/api/public/blogs");
        if (res.ok) {
          const data = await res.json();
          const match = data.find((p: any) => p.id === id);
          setPost(match || null);
        } else {
          setPost(staticBlogs.find((p) => p.id === id) || null);
        }
      } catch (err) {
        setPost(staticBlogs.find((p) => p.id === id) || null);
      } finally {
        setLoading(false);
      }
    }
    loadPost();
  }, [id]);

  /**
   * Helper to format publish dates to local format.
   * @param dateStr - ISO date string "YYYY-MM-DD"
   */
  const formatLocalDate = (dateStr: string) => {
    if (activeLang === "en") return dateStr;
    const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return dateStr.replace(/[0-9]/g, (digit) => banglaDigits[parseInt(digit)]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF9F5] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-brand-red border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  /**
   * Helper to parse and render inline bold segments formatted as **text**.
   */
  const renderInlineFormat = (text: string) => {
    if (!text.includes("**")) {
      return text;
    }
    const parts = text.split("**");
    return parts.map((part, index) => {
      // Alternating parts: odd indices are text wrapped in **
      if (index % 2 === 1) {
        return <strong key={index} className="font-extrabold text-neutral-900">{part}</strong>;
      }
      return part;
    });
  };

  /**
   * Render helper to parse markdown-like structures into semantic React nodes.
   * Parses:
   *  - "### Subheading" -> <h3>
   *  - "* Item" / "- Item" / "• Item" -> <ul> list
   *  - "1. Item" -> <ol> list
   *  - Paragraphs -> <p> with inline formatting
   */
  const renderArticleBody = (content: string) => {
    // Split content into paragraph/list blocks by double newlines
    const blocks = content.split("\n\n");

    return blocks.map((block, index) => {
      const trimmedBlock = block.trim();
      if (!trimmedBlock) return null;

      // Case 1: Subheading
      if (trimmedBlock.startsWith("### ")) {
        const headingText = trimmedBlock.replace(/^###\s+/, "");
        return (
          <h3 
            key={index} 
            className="font-kanit text-[18px] md:text-[21px] font-bold text-neutral-900 mt-8 mb-4 first:mt-0"
          >
            {renderInlineFormat(headingText)}
          </h3>
        );
      }

      // Case 2: Numbered List Block
      if (/^\d+\.\s+/.test(trimmedBlock)) {
        const lines = trimmedBlock.split("\n");
        return (
          <ol key={index} className="list-decimal pl-6 my-4 space-y-2 text-[14.5px] md:text-[15px] text-neutral-700 font-medium leading-relaxed">
            {lines.map((line, idx) => {
              const itemText = line.replace(/^\d+\.\s+/, "");
              return (
                <li key={idx}>
                  {renderInlineFormat(itemText)}
                </li>
              );
            })}
          </ol>
        );
      }

      // Case 3: Bullet List Block (starts with * or - or •)
      if (trimmedBlock.startsWith("* ") || trimmedBlock.startsWith("- ") || trimmedBlock.startsWith("• ")) {
        const lines = trimmedBlock.split("\n");
        return (
          <ul key={index} className="list-disc pl-6 my-4 space-y-2 text-[14.5px] md:text-[15px] text-neutral-700 font-medium leading-relaxed">
            {lines.map((line, idx) => {
              const itemText = line.replace(/^[\*\-•]\s+/, "");
              return (
                <li key={idx}>
                  {renderInlineFormat(itemText)}
                </li>
              );
            })}
          </ul>
        );
      }

      // Case 4: Standard Paragraph
      const lines = trimmedBlock.split("\n");
      return (
        <p 
          key={index} 
          className="text-[14.5px] md:text-[15.5px] leading-relaxed text-neutral-700 font-medium text-justify mb-5 last:mb-0"
        >
          {lines.map((line, idx) => (
            <span key={idx}>
              {idx > 0 && <br />}
              {renderInlineFormat(line)}
            </span>
          ))}
        </p>
      );
    });
  };

  // Render not found layout if slug is invalid
  if (!post) {
    return (
      <div className="bg-[#FAF9F5] font-arone text-black min-h-screen">
        <PageHeader title={text.notFound} />
        <section className="py-20 px-6 text-center">
          <div className="mx-auto max-w-md bg-white p-8 rounded-2xl border border-neutral-100 shadow-sm">
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mx-auto h-12 w-12 text-brand-red mb-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>
            <h2 className="font-kanit text-[22px] font-bold mb-2 text-neutral-900">{text.notFound}</h2>
            <p className="text-[14px] text-neutral-500 mb-6">{text.notFoundDesc}</p>
            <Link
              href="/blog"
              className="inline-flex w-full items-center justify-center bg-brand-red hover:bg-brand-red-hover text-white py-3 rounded-lg font-bold shadow-md transition-colors cursor-pointer"
            >
              {text.goBack}
            </Link>
          </div>
        </section>
      </div>
    );
  }

  const activeTitle = activeLang === "bn" ? post.titleBn : post.titleEn;
  const activeContent = activeLang === "bn" ? post.contentBn : post.contentEn;
  const activeAuthor = activeLang === "bn" ? post.authorBn : post.authorEn;
  const activeReadTime = activeLang === "bn" ? post.readTimeBn : post.readTimeEn;

  return (
    <div className="bg-[#FAF9F5] font-arone text-black min-h-screen pb-16">

      {/* Dynamic post title page header */}
      <PageHeader title={t("nav.blog")} />

      <div className="mx-auto max-w-310 px-6 mt-8">

        {/* Back Link button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[14px] font-bold text-neutral-500 hover:text-brand-red transition-colors group mb-6 cursor-pointer"
        >
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          <span>{text.backBtn}</span>
        </Link>

        {/* Main Article Body Container (centered, optimized for reading) */}
        <article className="mx-auto max-w-5xl bg-white p-6 md:p-10 rounded-3xl border border-neutral-100 shadow-sm space-y-6">

          {/* Metadata Header Panel */}
          <div className="flex flex-wrap items-center gap-4 text-[13px] text-neutral-500 font-bold border-b border-neutral-100 pb-5">
            <span className="uppercase text-brand-red bg-red-50 px-2.5 py-1 rounded-full text-[11px]">
              {post.category}
            </span>
            <span>{formatLocalDate(post.publishDate)}</span>
            <span className="text-neutral-300">•</span>
            <span>{activeReadTime}</span>
          </div>

          {/* Dynamic Blog Article Title */}
          <h1 className="font-kanit text-[22px] md:text-[30px] font-bold text-neutral-900 leading-snug">
            {activeTitle}
          </h1>

          {/* Simulated Banner Image Card */}
          <div className="relative h-60 md:h-100 w-full bg-neutral-800 rounded-2xl flex items-center justify-center text-white/5 font-black text-[28px] uppercase tracking-widest select-none overflow-hidden border border-neutral-100">
            SEECO Technical Article
            <div className="absolute inset-0 bg-brand-red/5 z-10 pointer-events-none" />
          </div>

          {/* Dynamic parsed Body Content */}
          <div className="article-body-content pt-4 font-arone">
            {renderArticleBody(activeContent)}
          </div>

          {/* Author & Share Footer Panel */}
          <div className="mt-12 pt-8 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-4">
            {/* Author Profile */}
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-neutral-100 flex items-center justify-center font-bold text-brand-red border border-neutral-200">
                {activeAuthor.charAt(0)}
              </div>
              <div>
                <p className="text-[12px] text-neutral-400 font-bold leading-none">{text.authorLabel}</p>
                <p className="text-[15px] font-bold text-neutral-900 leading-snug mt-1">{activeAuthor}</p>
              </div>
            </div>

            {/* Quick Share Widget */}
            <div className="flex items-center gap-3">
              <span className="text-[12px] text-neutral-400 font-bold uppercase tracking-wider">{text.shareTitle}:</span>
              <div className="flex gap-2">
                {/* Facebook Share */}
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ''}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-9 w-9 place-items-center rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-xs"
                >
                  <svg fill="currentColor" viewBox="0 0 24 24" className="h-4.5 w-4.5">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                  </svg>
                </a>

                {/* LinkedIn Share */}
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ''}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-9 w-9 place-items-center rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-700 hover:text-white transition-all shadow-xs"
                >
                  <svg fill="currentColor" viewBox="0 0 24 24" className="h-4.5 w-4.5">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>

                {/* Twitter Share */}
                <a
                  href={`https://twitter.com/intent/tweet?url=${typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ''}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-9 w-9 place-items-center rounded-lg bg-neutral-100 text-neutral-800 hover:bg-neutral-800 hover:text-white transition-all shadow-xs"
                >
                  <svg fill="currentColor" viewBox="0 0 24 24" className="h-4 w-4">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

        </article>

      </div>

    </div>
  );
}
