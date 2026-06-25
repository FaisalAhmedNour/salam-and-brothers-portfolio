"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

/**
 * Chevron Up SVG icon for Back to Top.
 */
function ArrowChevronUpIcon() {
  return (
    <svg viewBox="0 0 448 512" aria-hidden="true" className="h-4.5 w-4.5 fill-current">
      <path d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z" />
    </svg>
  );
}

/**
 * WhatsApp brand vector icon.
 */
function BrandWhatsAppIcon() {
  return (
    <svg viewBox="0 0 448 512" aria-hidden="true" className="h-5.5 w-5.5 fill-current">
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
    </svg>
  );
}

/**
 * Widgets Component.
 * Integrates floating interactive icons:
 * - A green WhatsApp button in the bottom-left.
 * - A red "Back to Top" scroll button in the bottom-right that appears after scrolling.
 */
export default function Widgets() {
  const pathname = usePathname();
  const [isScrollButtonVisible, setIsScrollButtonVisible] = useState(false);
  const { t } = useLanguage();

  // Hide public widgets on dashboard routes
  if (pathname?.startsWith("/spl-dashboard")) {
    return null;
  }

  // Monitor scroll height to conditionally show the back-to-top button
  useEffect(() => {
    const handleScrollToggle = () => {
      // Shows the button if scrolled down past 300px
      if (window.scrollY > 300) {
        setIsScrollButtonVisible(true);
      } else {
        setIsScrollButtonVisible(false);
      }
    };

    window.addEventListener("scroll", handleScrollToggle);
    return () => window.removeEventListener("scroll", handleScrollToggle);
  }, []);

  /**
   * Action: Smooth scroll to the top of the browser page.
   */
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="font-arone">

      {/* WhatsApp Sticky Contact Button (bottom-left) */}
      <a
        href="https://wa.me/8801714102859?text=Hello%21%20I%20have%20a%20question%20about%20your%20transformer%20solutions."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-7.5 left-7.5 z-999 flex items-center gap-2.5 rounded-full bg-[#16BE45] px-5 py-3.5 text-[15px] font-bold text-white shadow-lg transition-transform duration-300 hover:scale-105 active:scale-95"
      >
        <BrandWhatsAppIcon />
        <span>{t("widgets.messageUs")}</span>
      </a>

      {/* Back to Top Navigation Action (bottom-right) */}
      <button
        onClick={handleScrollToTop}
        className={[
          "fixed bottom-7.5 right-7.5 z-999 grid h-12 w-12 place-items-center rounded-lg bg-brand-red text-white shadow-lg border border-red-500/20 transition-all duration-300",
          isScrollButtonVisible
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "translate-y-10 opacity-0 pointer-events-none",
          "hover:bg-[#FF0000] hover:-translate-y-1 active:translate-y-0",
        ].join(" ")}
        aria-label="Scroll page to top"
      >
        <ArrowChevronUpIcon />
      </button>

    </div>
  );
}
