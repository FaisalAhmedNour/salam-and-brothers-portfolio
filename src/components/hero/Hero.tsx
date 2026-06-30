"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

interface Slide {
  id: string | number;
  imagePath: string;
  badge: { en: string; bn: string };
  title: { en: string; bn: string };
  description: { en: string; bn: string };
}

// Fallback slides
const DEFAULT_SLIDES: Slide[] = [
  {
    id: 1,
    imagePath: "/images/Transformer1.1.png",
    badge: { en: "High Efficiency & High Performance", bn: "উচ্চ দক্ষতা ও উচ্চ কার্যক্ষমতা" },
    title: { en: "Power & Distribution Transformers", bn: "পাওয়ার ও ডিস্ট্রিবিউশন ট্রান্সফরমার" },
    description: { en: "We provide quality with years of experience and our expert team.", bn: "আমরা দীর্ঘ বছরের অভিজ্ঞতা এবং আমাদের বিশেষজ্ঞ দলের সাথে মানসম্পন্ন সেবা প্রদান করি।" }
  },
  {
    id: 2,
    imagePath: "/images/Transformer2.1.png",
    badge: { en: "Innovative Energy Solutions", bn: "উদ্ভাবনী শক্তি সমাধান" },
    title: { en: "Electric Switchgear Systems", bn: "বৈদ্যুতিক সুইচগিয়ার সিস্টেম" },
    description: { en: "Ensuring ultimate grid security and reliable distribution controls.", bn: "সর্বোচ্চ গ্রিড নিরাপত্তা এবং নির্ভরযোগ্য বন্টন নিয়ন্ত্রণ নিশ্চিত করা।" }
  },
  {
    id: 3,
    imagePath: "/images/Transformer3.1.png",
    badge: { en: "Sustainable Power Delivery", bn: "টেকসই শক্তি সরবরাহ" },
    title: { en: "Dry-Type Transformer Technologies", bn: "ড্রাই-টাইপ ট্রান্সফরমার প্রযুক্তি" },
    description: { en: "Safe, eco-friendly, and modern electricity conversion for industrial infrastructure.", bn: "শিল্প অবকাঠামোর জন্য নিরাপদ, পরিবেশ-বান্ধব এবং আধুনিক বিদ্যুৎ রূপান্তর।" }
  }
];

/**
 * Arrow right icon for buttons.
 */
function AngleRightChevronIcon() {
  return (
    <svg viewBox="0 0 256 512" aria-hidden="true" className="h-4.5 w-4.5 fill-current ml-1">
      <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" />
    </svg>
  );
}

/**
 * Hero component.
 * Renders a full-width homepage slideshow banner.
 * Loads slides from dynamic DB API, falls back to static JSON details,
 * and updates background images and overlay copy with animations.
 */
export default function Hero({ initialSlides }: { initialSlides?: Slide[] }) {
  const [slides, setSlides] = useState<Slide[]>(initialSlides || DEFAULT_SLIDES);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const { language, t } = useLanguage();

  // Set up rotation interval loop
  useEffect(() => {
    if (slides.length <= 1) return;

    const slideRotationTimer = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 6000); // Transitions slide every 6 seconds

    return () => clearInterval(slideRotationTimer);
  }, [slides]);

  const currentSlide = slides[currentSlideIndex] || DEFAULT_SLIDES[0];

  const badgeText = currentSlide.badge[language] || currentSlide.badge["en"] || "";
  const titleText = currentSlide.title[language] || currentSlide.title["en"] || "";
  const descriptionText = currentSlide.description[language] || currentSlide.description["en"] || "";

  return (
    <section className="relative h-[calc(100vh-64px)] md:h-[calc(100vh-100px)] min-h-130 sm:min-h-140 overflow-hidden bg-white font-arone round-t-md rounded-t-3xl">

      {/* Background Slideshow Container */}
      <div className="absolute inset-0 z-0 bg-neutral-900">
        {slides.map((slide, index) => {
          const isActive = index === currentSlideIndex;
          return (
            <div
              key={slide.id}
              className={[
                "absolute inset-0 transition-opacity duration-1000 ease-in-out",
                isActive ? "opacity-100 z-10" : "opacity-0 z-0",
              ].join(" ")}
            >
              <Image
                src={slide.imagePath}
                alt="Industrial power machinery slideshow background"
                fill
                priority={index === 0}
                sizes="100vw"
                className={[
                  "object-cover",
                  isActive ? "hero-image-motion" : "",
                ].join(" ")}
                unoptimized
              />
            </div>
          );
        })}
      </div>

      {/* Dark tint overlay for reading contrast */}
      <div className="absolute inset-0 z-10 bg-black/35" />

      {/* Content layout wrapper */}
      <div className="relative z-20 flex h-full items-center px-6 md:px-12">
        <div className="mx-auto flex w-full max-w-310 justify-center lg:justify-end pb-8 md:pb-16 px-4">

          {/* Wrapper key={currentSlideIndex} forces full mount/re-trigger of CSS animations on slide change */}
          <div
            key={currentSlideIndex}
            className="text-center text-white lg:text-right space-y-4 animate-hero-text select-none w-full max-w-3xl"
          >
            {/* Upper Badge Tag */}
            {badgeText && (
              <div className="mb-4 inline-flex rounded-sm bg-brand-red px-4.5 py-3 text-sm font-bold leading-none text-white tracking-wider">
                {badgeText}
              </div>
            )}

            {/* Core Heading Title */}
            {titleText && (
              <h1 className="font-kanit text-[clamp(28px,3vw,50px)] leading-[1.15] tracking-tight text-white font-extrabold">
                {titleText}
              </h1>
            )}

            {/* Explanatory Paragraph */}
            {descriptionText && (
              <p className="mx-auto text-[18px] leading-relaxed text-white/95 md:text-[21px] lg:mx-0">
                {descriptionText}
              </p>
            )}

            {/* Call to action button */}
            <a
              href="/contact"
              className="mt-4 inline-flex w-full items-center justify-center gap-3 rounded-[3px] bg-brand-red px-8 py-2 text-base font-bold text-white shadow-[0_0_0_2px_rgba(255,255,255,0.85)] transition-all duration-300 hover:bg-brand-red-hover hover:scale-102 sm:w-auto"
            >
              <span>{t("hero.button")}</span>
              <AngleRightChevronIcon />
            </a>
          </div>
        </div>
      </div>

      {/* Fade out transition element at the bottom to blend with white content */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-28 bg-linear-to-t from-white via-white-700 to-transparent" />
    </section>
  );
}
