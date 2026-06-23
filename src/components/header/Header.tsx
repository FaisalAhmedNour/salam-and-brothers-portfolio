"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import LanguageToggle from "@/components/widgets/LanguageToggle";

/**
 * Type definition for navigation links in the header.
 */
interface NavigationLinkItem {
  labelKey: string;
  href: string;
  active?: boolean;
  hasDropdown?: boolean;
  dropdownItems?: { labelKey: string; href: string }[];
}

// Navigation links config matching the site structure
const HEADER_NAVIGATION_ITEMS: NavigationLinkItem[] = [
  { labelKey: "nav.home", href: "#", active: true },
  { labelKey: "nav.aboutUs", href: "#about" },
  {
    labelKey: "nav.products",
    href: "#products",
    hasDropdown: true,
    dropdownItems: [
      { labelKey: "nav.distributionTransformers", href: "/products/distribution-transformers" },
      { labelKey: "nav.powerTransformers", href: "/products/power-transformers" },
      { labelKey: "nav.specialTypeTransformers", href: "/products/special-type-transformers" },
      { labelKey: "nav.dryTypeTransformers", href: "/products/dry-type-transformers" },
      { labelKey: "nav.lovolDiselGenerator", href: "/products/lovol-diesel-generator" },
      { labelKey: "nav.electricSwitchgear", href: "/products/electric-switchgear" },
      { labelKey: "nav.bbtBusBarTrunkingSystem", href: "/products/bbt-bus-bar-trunking" },
      { labelKey: "nav.renewableEnergy", href: "/products/renewable-energy" },
    ],
  },
  { labelKey: "nav.service", href: "/services" },
  { labelKey: "nav.blog", href: "/blog" },
  { labelKey: "nav.contact", href: "/contact" },
  { labelKey: "nav.notice", href: "/notices" },
];

/**
 * Address / Location icon component.
 * Renders an inline SVG pin.
 */
function AddressPinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 shrink-0 fill-brand-red">
      <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.6A2.6 2.6 0 1 1 12 6.4a2.6 2.6 0 0 1 0 5.2Z" />
    </svg>
  );
}

/**
 * Mail / Envelope icon component.
 * Renders an inline SVG mail icon.
 */
function EnvelopeMailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 shrink-0 fill-brand-red">
      <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm-.5 4.1-7 4.9a1 1 0 0 1-1 0l-7-4.9V6.5l7.5 5.2 7.5-5.2v1.6Z" />
    </svg>
  );
}

/**
 * Telephone / Call icon component.
 * Renders an inline SVG phone handset.
 */
function TelephonyPhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 shrink-0 fill-brand-red">
      <path d="M6.6 10.8a15.7 15.7 0 0 0 6.6 6.6l2.2-2.2a1.1 1.1 0 0 1 1.1-.27 12.3 12.3 0 0 0 3.85.62A1.15 1.15 0 0 1 21.5 16.7v3.55a1.15 1.15 0 0 1-1.15 1.15A17.75 17.75 0 0 1 2.6 3.65 1.15 1.15 0 0 1 3.75 2.5H7.3a1.15 1.15 0 0 1 1.15 1.15 12.3 12.3 0 0 0 .62 3.85 1.1 1.1 0 0 1-.27 1.1l-2.2 2.2Z" />
    </svg>
  );
}

/**
 * Chevron down icon component.
 * Used for indicating dropdown sub-menus.
 */
function ArrowChevronDownIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-3.5 w-3.5 fill-current">
      <path d="M5.25 7.25 10 12l4.75-4.75 1.06 1.06L10 14.12 4.19 8.31l1.06-1.06Z" />
    </svg>
  );
}

/**
 * Menu icon component.
 * Toggles between a hamburger layout and an "X" close icon state.
 */
function MobileMenuButtonIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7">
      {open ? (
        <path fill="currentColor" d="m6.4 5 12.6 12.6-1.4 1.4L5 6.4 6.4 5Zm12.6 1.4L6.4 19 5 17.6 17.6 5 19 6.4Z" />
      ) : (
        <path fill="currentColor" d="M3 6.5h18v2H3v-2Zm0 4.5h18v2H3v-2Zm0 4.5h18v2H3v-2Z" />
      )}
    </svg>
  );
}

/**
 * Social media platform icons mapping to premium vector path nodes.
 */
function BrandSocialIcon({ platform, href }: { platform: "linkedin" | "facebook" | "instagram" | "youtube"; href: string }) {
  const socialPaths = {
    linkedin: "M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z",
    facebook: "M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z",
    instagram: "M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z",
    youtube: "M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 131.917-11.412 131.917s0 89.05 11.412 131.917c6.281 23.65 24.787 41.503 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.318 42.003-24.171 48.284-47.821 11.412-42.867 11.412-131.917 11.412-131.917s0-89.05-11.412-131.917zM218.423 318.548V169.524l146.617 74.512-146.617 74.512z"
  };

  const isInstagram = platform === "instagram";
  const iconColorClasses = {
    linkedin: "fill-[#0a66c2] hover:fill-[#084d92] transition-colors duration-250",
    facebook: "fill-[#1877f2] hover:fill-[#0c5bc6] transition-colors duration-250",
    youtube: "fill-[#ff0000] hover:fill-[#cc0000] transition-colors duration-250",
    instagram: "" // Handled via SVG gradient definitions
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={platform.charAt(0).toUpperCase() + platform.slice(1)}
      className="grid h-8 w-8 place-items-center rounded-full transition-all duration-300 hover:bg-gray-100"
    >
      <svg
        viewBox="0 0 512 512"
        aria-hidden="true"
        className="h-4.5 w-4.5 transition-transform duration-250 hover:scale-110"
      >
        {isInstagram && (
          <defs>
            <linearGradient id="instagram-brand-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#f9ce34" />
              <stop offset="30%" stopColor="#ee2a7b" />
              <stop offset="100%" stopColor="#6228d7" />
            </linearGradient>
          </defs>
        )}
        <path
          d={socialPaths[platform]}
          fill={isInstagram ? "url(#instagram-brand-gradient)" : undefined}
          className={isInstagram ? undefined : iconColorClasses[platform]}
        />
      </svg>
    </a>
  );
}

/**
 * Navigation links component that renders a list of anchors.
 * Handles dropdown menus on desktop and toggles state.
 */
function HeaderDesktopNavLinks() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { t } = useLanguage();
  const pathname = usePathname();
  const isHome = pathname === "/";

  const getHref = (href: string) => {
    if (isHome) return href;
    if (href === "#") return "/";
    if (href.startsWith("#")) return `/${href}`;
    return href;
  };

  return (
    <nav aria-label="Primary navigation">
      <ul className="flex items-center gap-7 font-arone font-semibold text-black">
        {HEADER_NAVIGATION_ITEMS.map((item) => (
          <li
            key={item.labelKey}
            className="relative"
            onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.labelKey)}
            onMouseLeave={() => item.hasDropdown && setActiveDropdown(null)}
          >
            <a
              href={getHref(item.href)}
              className={[
                "group relative flex items-center gap-1 py-7 text-[16px] transition-colors duration-300 hover:text-brand-red",
                item.active && isHome ? "text-brand-red" : "",
                item.labelKey === "nav.notice" ? "animate-notice-bounce text-brand-red font-bold" : "",
              ].join(" ")}
            >
              {t(item.labelKey)}
              {item.hasDropdown ? <ArrowChevronDownIcon /> : null}

              {/* Underline indicators with transitions */}
              {item.active && isHome ? (
                <span className="absolute bottom-5 left-0 h-0.5 w-full bg-brand-red" />
              ) : (
                <span className="absolute bottom-5 left-0 h-0.5 w-0 bg-brand-red transition-all duration-300 group-hover:w-full" />
              )}
            </a>

            {/* Dropdown overlay */}
            {item.hasDropdown && item.dropdownItems && activeDropdown === item.labelKey && (
              <ul className="absolute top-full left-0 z-50 w-60 border border-gray-100 bg-white py-2 shadow-xl animate-fade-in">
                {item.dropdownItems.map((subItem) => (
                  <li key={subItem.labelKey}>
                    <a
                      href={getHref(subItem.href)}
                      className="block px-5 py-3 font-arone text-[14px] text-gray-700 transition-colors duration-200 hover:bg-brand-red hover:text-white"
                    >
                      {t(subItem.labelKey)}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

/**
 * Mobile responsive drawer overlay displaying navigation items.
 */
function HeaderMobileNavLinks({
  isOpened,
  onClose,
}: {
  isOpened: boolean;
  onClose: () => void;
}) {
  const [dropdownExpanded, setDropdownExpanded] = useState(false);
  const { t } = useLanguage();
  const pathname = usePathname();
  const isHome = pathname === "/";

  const getHref = (href: string) => {
    if (isHome) return href;
    if (href === "#") return "/";
    if (href.startsWith("#")) return `/${href}`;
    return href;
  };

  return (
    <div
      className={[
        "fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden",
        isOpened ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
      ].join(" ")}
      onClick={onClose}
    >
      <div
        className={[
          "absolute right-0 top-0 bottom-0 w-70 bg-white p-6 shadow-2xl transition-transform duration-300",
          isOpened ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
        onClick={(e) => e.stopPropagation()} // Prevent closing when tapping content
      >
        <div className="flex justify-end mb-6">
          <button
            onClick={onClose}
            className="text-black hover:text-brand-red"
            aria-label="Close mobile navigation menu"
          >
            <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current">
              <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        </div>

        <nav aria-label="Mobile navigation">
          <ul className="flex flex-col gap-2 font-arone font-semibold text-black">
            {HEADER_NAVIGATION_ITEMS.map((item) => (
              <li key={item.labelKey} className="border-b border-gray-100 py-1">
                {item.hasDropdown ? (
                  <div>
                    <button
                      onClick={() => setDropdownExpanded(!dropdownExpanded)}
                      className="flex w-full items-center justify-between py-2 text-[16px] text-left hover:text-brand-red"
                    >
                      <span>{t(item.labelKey)}</span>
                      <span className={dropdownExpanded ? "rotate-180 transition-transform duration-200" : "transition-transform duration-200"}>
                        <ArrowChevronDownIcon />
                      </span>
                    </button>
                    {dropdownExpanded && item.dropdownItems && (
                      <ul className="pl-4 mt-1 bg-gray-50/50 rounded-lg">
                        {item.dropdownItems.map((subItem) => (
                          <li key={subItem.labelKey}>
                            <a
                              href={getHref(subItem.href)}
                              onClick={onClose}
                              className="block py-2.5 text-[14px] text-gray-600 hover:text-brand-red"
                            >
                              {t(subItem.labelKey)}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <a
                    href={getHref(item.href)}
                    onClick={onClose}
                    className={[
                      "block py-2 text-[16px] transition-colors duration-200 hover:text-brand-red",
                      item.active && isHome ? "text-brand-red" : "",
                      item.labelKey === "nav.notice" ? "animate-notice-bounce text-brand-red font-bold" : "",
                    ].join(" ")}
                  >
                    {t(item.labelKey)}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Language Toggle Section */}
        <div className="mt-8 pt-6 border-t border-gray-150 flex flex-col gap-3">
          <span className="text-[12px] font-bold text-gray-400 uppercase tracking-wider">
            {t("footer.support")} / Lang
          </span>
          <LanguageToggle />
        </div>
      </div>
    </div>
  );
}

/**
 * Header Component containing topbar and navigation bar.
 * Replaces the initial developer layout with pixel-perfect, clean responsive blocks.
 */
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const { t } = useLanguage();
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Handle scroll events to dynamically add styling classes
  useEffect(() => {
    const handleScroll = () => {
      // Determine if page has been scrolled down
      setHasScrolled(window.scrollY > 0);
    };

    // Initialize position check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={[
        "sticky top-0 z-50 bg-white/95 backdrop-blur-md text-black font-arone transition-all duration-300",
        hasScrolled
          ? "shadow-sm border-b border-neutral-100"
          : "shadow-none border-b border-transparent",
      ].join(" ")}
    >
      <style>{`
        @keyframes notice-attention-bounce {
          0%, 80%, 100% {
            transform: scale(1) translateY(0);
          }
          83% {
            transform: scale(1.1, 0.9) translateY(0);
          }
          86% {
            transform: scale(0.9, 1.1) translateY(-8px);
          }
          89% {
            transform: scale(1.05, 0.95) translateY(2px);
          }
          92% {
            transform: scale(0.98, 1.02) translateY(-1px);
          }
          95% {
            transform: scale(1) translateY(0);
          }
        }
        .animate-notice-bounce {
          animation: notice-attention-bounce 6s infinite ease-in-out;
          display: inline-flex;
        }
      `}</style>
      {/* Topbar layout */}
      <div className="hidden border-b border-neutral-100 bg-neutral-50/50 text-[13px] md:block">
        <div className="mx-auto flex h-10 max-w-310 items-center justify-between px-6">
          <div className="flex items-center gap-2 text-gray-600">
            <AddressPinIcon />
            <span className="truncate">
              {t("contactInfo.address")}
            </span>
          </div>

          <div className="flex items-center gap-6">
            {/* Hover Dropdown displaying multiple emails */}
            <div className="relative group/email cursor-pointer">
              <div className="flex items-center gap-2 text-gray-600 group-hover/email:text-brand-red transition-colors duration-200">
                <EnvelopeMailIcon />
                <span className="text-[14px] mb-1">{t("contactInfo.email")}</span>
                {/* Chevron icon indicating click/hover dropdown interactions */}
                <svg
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                  className="h-3 w-3 fill-current transition-transform duration-200 group-hover/email:rotate-180"
                >
                  <path d="M5.25 7.25 10 12l4.75-4.75 1.06 1.06L10 14.12 4.19 8.31l1.06-1.06Z" />
                </svg>
              </div>

              {/* Dropdown container absolute overlays */}
              <div className="absolute top-full right-0 z-50 mt-1 w-60 origin-top-right scale-95 opacity-0 pointer-events-none group-hover/email:scale-100 group-hover/email:opacity-100 group-hover/email:pointer-events-auto transition-all duration-200 ease-out">
                <div className="border border-gray-100 bg-white py-2.5 shadow-xl">
                  <a
                    href={`mailto:${t("contactInfo.email")}`}
                    className="block px-4 py-2 hover:bg-gray-50 transition-colors duration-150 text-left"
                  >
                    <div className="text-[14px] font-semibold text-neutral-800 hover:text-brand-red break-all">
                      {t("contactInfo.email")}
                    </div>
                  </a>
                  <div className="h-px bg-gray-150 my-0" />
                  <a
                    href={`mailto:${t("contactInfo.email2")}`}
                    className="block px-4 py-2 hover:bg-gray-50 transition-colors duration-150 text-left"
                  >
                    <div className="text-[14px] font-semibold text-neutral-800 hover:text-brand-red break-all">
                      {t("contactInfo.email2")}
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <a
              href="tel:+8801818430308"
              className="flex items-center gap-1.5 text-gray-600 hover:text-brand-red transition-colors duration-200"
            >
              <TelephonyPhoneIcon />
              <span>{t("contactInfo.phone")}</span>
            </a>

            <div className="h-4 w-px bg-gray-250" />

            <div className="flex items-center gap-1">
              <BrandSocialIcon platform="linkedin" href="http://www.linkedin.com/in/seeco-power-limited-132341417" />
              <BrandSocialIcon platform="facebook" href="https://www.facebook.com/seecopowerlimited" />
              <BrandSocialIcon platform="instagram" href="https://www.instagram.com/seecopowerltd" />
              <BrandSocialIcon platform="youtube" href="https://youtube.com/@seecopowerlimited?si=FQoSyl9caktLh6n1" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-transparent">
        <div className="mx-auto flex h-22.5 max-w-310 items-center justify-between px-6">
          <a href={isHome ? "#" : "/"} className="flex items-center" aria-label="SEECO Transformer Home">
            <Image
              src="/images/SEECOI1.png"
              alt="SEECO Transformer Logo"
              width={180}
              height={45}
              priority
              className="object-contain"
            />
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:block">
            <HeaderDesktopNavLinks />
          </div>

          {/* Desktop Language Toggle */}
          <div className="hidden lg:block">
            <LanguageToggle />
          </div>

          {/* Mobile Navigation Trigger Toggle */}
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(true)}
            className="grid h-11 w-11 place-items-center rounded-md text-black transition-colors duration-300 hover:bg-gray-50 hover:text-brand-red lg:hidden"
          >
            <MobileMenuButtonIcon open={false} />
          </button>
        </div>
      </div>

      {/* Mobile drawer layout */}
      <HeaderMobileNavLinks isOpened={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
}
