"use client";

import Image from "next/image";

/**
 * Type representing a news/blog article.
 */
interface NewsBlogPost {
  id: string;
  title: string;
  excerpt: string;
  imagePath: string;
  linkHref: string;
}

// Blog posts config mapping the live site content
const NEWS_BLOG_POSTS_DATA: NewsBlogPost[] = [
  {
    id: "blog-post-1",
    title: "Distribution vs Power vs Step-Up Transformers: USA",
    excerpt: "U.S. Buyer’s Guide for Transformers Selecting the right transformer class—especially between distribution transformers, power transformers, and step-up transformers - can...",
    imagePath: "/images/pad-mounted-step-up-transformer-solar-pv-site-1600.webp",
    linkHref: "#blog-distribution-power-usa",
  },
  {
    id: "blog-post-2",
    title: "Power Transformers: The Excellent Transformers",
    excerpt: "Electricity is the backbone of modern life, powering industries, businesses, and homes worldwide. However, the efficient and safe transmission of...",
    imagePath: "/images/Power-Transformer-Turkish-Transformer.jpg",
    linkHref: "#blog-power-excellent",
  },
  {
    id: "blog-post-3",
    title: "Distribution Transformers in Turkey",
    excerpt: "The importance of electricity in our daily lives is undeniable. From the outlets in our homes to the massive machines...",
    imagePath: "/images/Distribution-Transformers-in-Turkey.png",
    linkHref: "#blog-distribution-turkey",
  },
];

/**
 * LatestNews Component.
 * Renders a section showcasing the latest articles and publications
 * of Turkish Transformer in a clean, responsive layout.
 */
export default function LatestNews() {
  return (
    <section id="blog" className="bg-white py-20 px-6 font-arone border-t border-gray-100">
      <div className="mx-auto max-w-[1240px]">

        {/* News Section Header */}
        <div className="text-center mb-16 max-w-[800px] mx-auto">
          <h2 className="font-kanit text-[32px] font-bold text-neutral-900 md:text-[42px] tracking-tight">
            Latest News
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-gray-500">
            Discover the latest updates in the energy world, innovations in transformer technology, and expert insights from the industry on our blog page.
          </p>
        </div>

        {/* 3-column Blog Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {NEWS_BLOG_POSTS_DATA.map((post) => (
            <article
              key={post.id}
              className="group flex flex-col justify-between border border-gray-150 bg-white overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md rounded-xl"
            >

              {/* Image Container with Zoom Animation */}
              <div>
                <a href={post.linkHref} className="relative block aspect-4/3 w-full overflow-hidden bg-gray-50">
                  <Image
                    src={post.imagePath}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </a>

                {/* Article Copy Details */}
                <div className="p-6">

                  {/* Article Title */}
                  <h3 className="font-kanit text-[19px] font-bold text-neutral-900 transition-colors duration-300 hover:text-brand-red">
                    <a href={post.linkHref}>{post.title}</a>
                  </h3>

                  {/* Text Excerpt */}
                  <p className="mt-4 text-[14px] leading-relaxed text-gray-600">
                    {post.excerpt}
                  </p>

                </div>
              </div>

            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
