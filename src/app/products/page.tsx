"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import PageHeader from "@/components/widgets/PageHeader";
import staticProducts from "@/data/products.json";

// Type contracts matching the structured products.json data representation
interface ProductTitle {
  en: string;
  bn: string;
}

interface ProductSpecsDetail {
  en: string;
  bn: string;
}

interface ProductSpecs {
  rating: ProductSpecsDetail;
  voltage: ProductSpecsDetail;
  standard: ProductSpecsDetail;
}

interface ProductItem {
  id: string;
  slug: string;
  category: string;
  imagePath: string;
  title: ProductTitle;
  subtitle: ProductTitle;
  description: ProductTitle;
  overview: ProductTitle;
  specs: ProductSpecs;
}

// Local translation dictionary for bilingual support (English and Bengali).
// Keeps the component fully self-contained, modular, and easy to maintain.
const PRODUCTS_TRANSLATIONS = {
  en: {
    title: "Our Products",
    breadcrumbs: "Products",
    all: "All Products",
    transformers: "Transformers",
    powerDist: "Power & Generation",
    rating: "Rating",
    voltage: "Voltage Class",
    standard: "Standard",
    learnMore: "Learn More",
    inquireNow: "Inquire Now",
    ctaTitle: "Need a custom electrical solution for your project?",
    ctaText: "Our experienced engineering team is ready to analyze your requirements and manufacture tailored transformers and switchgear systems to meet your exact specifications.",
    ctaBtn: "Contact Our Engineers"
  },
  bn: {
    title: "আমাদের পণ্যসমূহ",
    breadcrumbs: "পণ্যসমূহ",
    all: "সকল পণ্য",
    transformers: "ট্রান্সফরমার",
    powerDist: "পাওয়ার ও জেনারেশন",
    rating: "রেটিং",
    voltage: "ভোল্টেজ ক্লাস",
    standard: "স্ট্যান্ডার্ড",
    learnMore: "আরও জানুন",
    inquireNow: "অনুসন্ধান করুন",
    ctaTitle: "আপনার প্রজেক্টের জন্য কাস্টম বিদ্যুৎ সমাধান প্রয়োজন?",
    ctaText: "আমাদের অভিজ্ঞ প্রকৌশলী দল আপনার প্রজেক্টের প্রয়োজনীয়তা বিশ্লেষণ করে কাস্টমাইজড ট্রান্সফরমার এবং সুইচগিয়ার সিস্টেম ডিজাইন ও তৈরিতে প্রস্তুত।",
    ctaBtn: "প্রকৌশলীদের সাথে যোগাযোগ করুন"
  }
};

/**
 * Arrow icon component pointing to the right.
 * Renders inline vector graphic.
 */
function ArrowRightIcon() {
  return (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4.5 w-4.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
  );
}

/**
 * ProductsPage Component.
 * Implements a premium products directory catalog. Includes interactive filters
 * to toggle between all, transformers, and power distribution systems, mapping
 * product metadata from products.json bilingual database.
 *
 * @returns React functional component rendering JSX elements.
 */
export default function ProductsPage() {
  const { language } = useLanguage();
  const activeLang = (language === "bn" ? "bn" : "en") as "en" | "bn";
  const t = PRODUCTS_TRANSLATIONS[activeLang];

  // Dynamic products list loaded from DB or fallback
  const [productsList, setProductsList] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("/api/public/products");
        if (res.ok) {
          const data = await res.json();
          setProductsList(data);
        } else {
          setProductsList(staticProducts as ProductItem[]);
        }
      } catch (err) {
        setProductsList(staticProducts as ProductItem[]);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  // State to filter active product groups
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const typedProductsData = productsList;

  // Filter products lists dynamically
  const filteredProducts = activeCategory === "all"
    ? typedProductsData
    : typedProductsData.filter(product => product.category === activeCategory);

  return (
    <div className="bg-[#FAF9F5] font-arone text-black min-h-screen pb-20">

      {/* 1. Page Header (Reuses premium theme widget overlaying image background) */}
      <PageHeader
        title={t.title}
        breadcrumbsTitle={t.breadcrumbs}
        bgImage="/images/Transformer3.1.png"
      />

      {/* 2. Interactive Filter Section */}
      <section className="pt-5 px-6">
        <div className="mx-auto max-w-310">
          <div className="flex flex-wrap justify-center items-center gap-3.5 mb-5">
            {/* Filter buttons */}
            <button
              onClick={() => setActiveCategory("all")}
              className={[
                "px-6 py-2.5 rounded-full text-[14.5px] font-bold border transition-all duration-200 cursor-pointer",
                activeCategory === "all"
                  ? "bg-brand-red text-white border-brand-red shadow-md"
                  : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50"
              ].join(" ")}
            >
              {t.all}
            </button>

            <button
              onClick={() => setActiveCategory("transformers")}
              className={[
                "px-6 py-2.5 rounded-full text-[14.5px] font-bold border transition-all duration-200 cursor-pointer",
                activeCategory === "transformers"
                  ? "bg-brand-red text-white border-brand-red shadow-md"
                  : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50"
              ].join(" ")}
            >
              {t.transformers}
            </button>

            <button
              onClick={() => setActiveCategory("power-dist")}
              className={[
                "px-6 py-2.5 rounded-full text-[14.5px] font-bold border transition-all duration-200 cursor-pointer",
                activeCategory === "power-dist"
                  ? "bg-brand-red text-white border-brand-red shadow-md"
                  : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50"
              ].join(" ")}
            >
              {t.powerDist}
            </button>
          </div>

          {/* 3. Products Grid Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="group flex flex-col justify-between border border-neutral-200/60 bg-white p-3 shadow-xs transition-all duration-300 hover:shadow-lg rounded-2xl hover:-translate-y-1"
              >
                <div>
                  {/* Card Image element with category badge overlay */}
                  <Link
                    href={`/products/${product.slug}`}
                    className="relative block aspect-square w-full overflow-hidden bg-neutral-50 rounded-xl"
                  >
                    <Image
                      src={product.imagePath}
                      alt={product.title[activeLang]}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Category Label badge overlay */}
                    <span className="absolute top-3 left-3 bg-neutral-900/80 backdrop-blur-xs text-white text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md font-bold select-none z-10">
                      {product.category === "transformers" ? t.transformers : t.powerDist}
                    </span>
                  </Link>

                  {/* Title and subtext details */}
                  <h3 className="font-kanit mt-3 text-[20px] font-bold text-neutral-900 transition-colors duration-200 hover:text-brand-red leading-snug">
                    <Link href={`/products/${product.slug}`}>{product.title[activeLang]}</Link>
                  </h3>

                  <p className="text-[12.5px] text-neutral-400 font-semibold italic mt-0.5 leading-normal">
                    {product.subtitle[activeLang]}
                  </p>

                  <p className="mt-2.5 text-[14px] leading-relaxed text-neutral-600 font-medium line-clamp-3">
                    {product.description[activeLang]}
                  </p>

                  {/* Specification Quick Parameters Sheet Panel */}
                  <div className="mt-3 pt-2 border-t border-neutral-100 grid grid-cols-3 gap-2 text-center">
                    <div className="bg-neutral-50 rounded-lg p-2">
                      <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">
                        {t.rating}
                      </span>
                      <span
                        className="text-[11.5px] font-bold text-neutral-800 mt-0.5 block truncate"
                        title={product.specs.rating[activeLang]}
                      >
                        {product.specs.rating[activeLang]}
                      </span>
                    </div>

                    <div className="bg-neutral-50 rounded-lg p-2">
                      <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">
                        {t.voltage}
                      </span>
                      <span
                        className="text-[11.5px] font-bold text-neutral-800 mt-0.5 block truncate"
                        title={product.specs.voltage[activeLang]}
                      >
                        {product.specs.voltage[activeLang]}
                      </span>
                    </div>

                    <div className="bg-neutral-50 rounded-lg p-2">
                      <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">
                        {t.standard}
                      </span>
                      <span
                        className="text-[11.5px] font-bold text-neutral-800 mt-0.5 block truncate"
                        title={product.specs.standard[activeLang]}
                      >
                        {product.specs.standard[activeLang]}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer anchor triggers */}
                <div className="mt-3 border-t border-neutral-100 pt-2 flex items-center justify-between">
                  {/* Learn More link */}
                  <Link
                    href={`/products/${product.slug}`}
                    className="inline-flex items-center gap-1.5 text-[13.5px] font-bold text-neutral-900 transition-colors duration-200 hover:text-brand-red group/btn"
                  >
                    <span>{t.learnMore}</span>
                    <span className="transition-transform duration-200 group-hover/btn:translate-x-0.5 text-[8px]">
                      <ArrowRightIcon />
                    </span>
                  </Link>

                  {/* Inquire link pre-filling parameters */}
                  <Link
                    href={`/contact?inquiry=${product.slug}`}
                    className="text-[13.5px] font-bold text-[#0B3A72] hover:text-brand-red transition-colors duration-200"
                  >
                    {t.inquireNow}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Contact Request for Quotation Segment */}
      <section className="px-6 mt-12">
        <div className="mx-auto max-w-310">
          <div className="bg-white border border-neutral-100 rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto shadow-md relative overflow-hidden">
            <div className="absolute inset-0 bg-[#0B3A72]/5 pointer-events-none" />
            <div className="relative z-10 space-y-6">
              <h3 className="font-kanit text-[24px] md:text-[30px] font-bold text-neutral-900 leading-tight">
                {t.ctaTitle}
              </h3>
              <p className="text-[14.5px] text-neutral-600 font-medium max-w-2xl mx-auto leading-relaxed">
                {t.ctaText}
              </p>

              <div className="pt-2">
                <Link
                  href="/contact?inquiry=general"
                  className="inline-flex items-center gap-3 bg-brand-red hover:bg-brand-red-hover text-white px-8 py-4.5 text-base font-bold rounded-lg transition-all shadow-md shadow-red-500/10 cursor-pointer group"
                >
                  <span>{t.ctaBtn}</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    <ArrowRightIcon />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
