"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

/**
 * Properties for the PageHeader component.
 */
interface PageHeaderProps {
  /** The main title of the page to display in the header. */
  title: string;
  /** Optional custom breadcrumbs text (defaults to the page title). */
  breadcrumbsTitle?: string;
  /** Optional background image path (defaults to industrial transformer image). */
  bgImage?: string;
}

/**
 * PageHeader Component.
 * A premium reusable hero section styled for user-end informational pages.
 * Displays page heading, animated/static image overlay background, and localized breadcrumb path.
 *
 * @param props - Component options including title, custom breadcrumbs text, and optional bgImage.
 * @returns JSX Element rendering the responsive section banner.
 */
export default function PageHeader({
  title,
  breadcrumbsTitle,
  bgImage = "/images/Transformer3.1.png",
}: PageHeaderProps) {
  const { language } = useLanguage();

  return (
    <section className="mx-auto max-w-310 pt-6 font-montserrat">
      <div className="relative overflow-hidden rounded-[20px] bg-neutral-900 py-12 md:py-16 text-center text-white shadow-md">

        {/* Background image container for context-appropriate branding */}
        <div className="absolute inset-0 z-0">
          <Image
            src={bgImage}
            alt={`${title} background`}
            fill
            priority
            className="object-cover object-center"
          />
          {/* Semi-transparent dark blue overlay ensures high-contrast legible typography */}
          <div className="absolute inset-0 bg-[#0B3A72]/85" />
        </div>

        {/* Content container centering elements within the overlay */}
        <div className="relative z-10 mx-auto max-w-2xl px-4">
          {/* Primary Page Heading */}
          <h1 className="font-kanit text-[32px] md:text-[44px] font-bold text-white leading-tight capitalize tracking-tight mb-3">
            {title}
          </h1>

          {/* Breadcrumbs navigation structure with localized Home anchor */}
          <nav className="flex justify-center items-center gap-2 text-[14px] font-semibold text-gray-200">
            <Link href="/" className="hover:text-brand-red transition-colors duration-200">
              {language === "bn" ? "হোম" : "Home"}
            </Link>
            <span className="text-gray-400">|</span>
            <span className="text-white font-bold">{breadcrumbsTitle || title}</span>
          </nav>
        </div>
      </div>
    </section>
  );
}
