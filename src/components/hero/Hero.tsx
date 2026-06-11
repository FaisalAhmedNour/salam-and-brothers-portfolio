"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

/**
 * Arrow right icon for buttons.
 * Renders an inline SVG arrow.
 */
function AngleRightChevronIcon() {
  return (
    <svg viewBox="0 0 256 512" aria-hidden="true" className="h-4.5 w-4.5 fill-current ml-1">
      <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" />
    </svg>
  );
}

// Background images list for slides
const HERO_SLIDESHOW_IMAGES = [
  "/images/Distribution-Transformers-1.png",
  "/images/power-transformer.png",
  "/images/turkish-transfomr-maintance-1.jpg"
];

/**
 * Hero component.
 * Renders a full-width banner section with a sliding background,
 * overlay copy, and calls-to-action.
 */
export default function Hero() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Set up slide rotation interval
  useEffect(() => {
    const slideRotationTimer = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % HERO_SLIDESHOW_IMAGES.length);
    }, 5000); // Transitions slide every 5 seconds

    return () => clearInterval(slideRotationTimer);
  }, []);

  return (
    <section className="relative h-[550px] overflow-hidden bg-neutral-950 md:h-[700px] font-arone round-t-md bg-white rounded-t-3xl">

      {/* Background Slideshow Container */}
      <div className="absolute inset-0 z-0">
        {HERO_SLIDESHOW_IMAGES.map((imagePath, index) => {
          const isActive = index === currentSlideIndex;
          return (
            <div
              key={imagePath}
              className={[
                "absolute inset-0 transition-opacity duration-1000 ease-in-out",
                isActive ? "opacity-100 z-10" : "opacity-0 z-0",
              ].join(" ")}
            >
              <Image
                src={imagePath}
                alt="Industrial power transformer machinery background"
                fill
                priority={index === 0} // Only prioritize loading the first image
                sizes="100vw"
                className={[
                  "object-cover",
                  isActive ? "hero-image-motion" : "",
                ].join(" ")}
              />
            </div>
          );
        })}
      </div>

      {/* Dark tint overlay for reading contrast */}
      <div className="absolute inset-0 z-10 bg-black/45" />

      {/* Content layout wrapper */}
      <div className="relative z-20 flex h-full items-center px-6 py-16 md:px-12 lg:px-20">
        <div className="mx-auto flex w-full max-w-[1240px] justify-end lg:justify-end">
          <div className="text-center text-white lg:mr-[6.5%] lg:text-right space-y-5">

            {/* Upper Badge Tag */}
            <div className="mb-6 inline-flex rounded-[4px] bg-brand-red px-[18px] py-3 text-sm font-bold leading-none text-white tracking-wider">
              High Efficiency &amp; High Performance
            </div>

            {/* Core Heading Title */}
            <h1 className="font-kanit text-[clamp(28px,3vw,50px)] leading-[1.15] tracking-tight text-white">
              Power &amp; Distribution Transformers
            </h1>

            {/* Explanatory Paragraph */}
            <p className="mx-auto text-[18px] leading-relaxed text-white/95 md:text-[21px] lg:mx-0">
              We provide quality with years of experience and our expert team.
            </p>

            {/* Call to action button */}
            <a
              href="#contact"
              className="mt-10 inline-flex w-full items-center justify-center gap-3 rounded-[3px] bg-brand-red px-8 py-3 text-base font-bold text-white shadow-[0_0_0_2px_rgba(255,255,255,0.85)] transition-all duration-300 hover:bg-brand-red-hover hover:scale-102 sm:w-auto"
            >
              <span>Contact Us</span>
              <AngleRightChevronIcon />
            </a>
          </div>
        </div>
      </div>

      {/* Fade out transition element at the bottom to blend with white content */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-[150px] bg-gradient-to-t from-white via-white/70 to-transparent" />
    </section>
  );
}
