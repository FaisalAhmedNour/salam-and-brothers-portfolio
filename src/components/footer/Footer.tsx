"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

/**
 * Type representing global shipping destination location points.
 */
interface GlobalShippingLocation {
  name: string;
  top: number;  // Percentage from top
  left: number; // Percentage from left
}

// Shipping locations coordinate mapping for Bangladesh districts
const SHIPPING_DESTINATIONS: GlobalShippingLocation[] = [
  { name: "Rangpur", top: 18, left: 33 },
  { name: "Sylhet", top: 29, left: 60 },
  { name: "Bogura", top: 31, left: 35 },
  { name: "Mymensingh", top: 33, left: 46 },
  { name: "Rajshahi", top: 36, left: 27 },
  { name: "Cumilla", top: 55, left: 53 },
  { name: "Noakhali", top: 63, left: 53 },
  { name: "Chattogram", top: 66, left: 61 },
  { name: "Cox's Bazar", top: 77, left: 62 },
  { name: "Khulna", top: 65, left: 34 },
  { name: "Barishal", top: 61, left: 44 },
  { name: "Jashore", top: 56, left: 33 },
];

// Dhaka coordinates serving as the central distribution/shipping source center
const DHAKA_SOURCE_COORDS = { top: 46, left: 41 };

// SVG coordinate constants
const MAP_SVG_WIDTH = 1536;
const MAP_SVG_HEIGHT = 1024;

/**
 * Address / Location pin icon for footer contact list.
 */
function FooterLocationPinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 shrink-0 fill-brand-red">
      <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.6A2.6 2.6 0 1 1 12 6.4a2.6 2.6 0 0 1 0 5.2Z" />
    </svg>
  );
}

/**
 * Mail icon for footer contact list.
 */
function FooterEnvelopeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 shrink-0 fill-brand-red">
      <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm-.5 4.1-7 4.9a1 1 0 0 1-1 0l-7-4.9V6.5l7.5 5.2 7.5-5.2v1.6Z" />
    </svg>
  );
}

/**
 * Telephone icon for footer contact list.
 */
function FooterPhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 shrink-0 fill-brand-red">
      <path d="M6.6 10.8a15.7 15.7 0 0 0 6.6 6.6l2.2-2.2a1.1 1.1 0 0 1 1.1-.27 12.3 12.3 0 0 0 3.85.62A1.15 1.15 0 0 1 21.5 16.7v3.55a1.15 1.15 0 0 1-1.15 1.15A17.75 17.75 0 0 1 2.6 3.65 1.15 1.15 0 0 1 3.75 2.5H7.3a1.15 1.15 0 0 1 1.15 1.15 12.3 12.3 0 0 0 .62 3.85 1.1 1.1 0 0 1-.27 1.1l-2.2 2.2Z" />
    </svg>
  );
}

/**
 * Calculates the dynamic copyright year range based on the current date.
 * If the month is Jan-Jun (0-5), the range is (currentYear - 1) to currentYear.
 * If the month is Jul-Dec (6-11), the range is currentYear to (currentYear + 1).
 *
 * @returns {string} The formatted copyright year range string.
 */
function calculateCopyrightYearRange(): string {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); // 0-indexed month (Jan = 0, Dec = 11)

  // January (0) to June (5)
  if (currentMonth >= 0 && currentMonth <= 5) {
    return `${currentYear - 1}-${currentYear}`;
  }
  // July (6) to December (11)
  return `${currentYear}-${currentYear + 1}`;
}

/**
 * Footer Component.
 * Contains site links, support policies, company info,
 * and a fully animated SVG global shipping destination map.
 */
export default function Footer() {
  const { t, logoPath, language } = useLanguage();
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Pre-load state with static mock/initial products so we show content instantly
  const [products, setProducts] = useState<any[]>([
    { slug: "distribution-transformers", title: { en: "Distribution Transformers", bn: "ডিস্ট্রিবিউশন ট্রান্সফরমার" } },
    { slug: "power-transformers", title: { en: "Power Transformers", bn: "পাওয়ার ট্রান্সফরমার" } },
    { slug: "special-type-transformers", title: { en: "Special Type Transformers", bn: "স্পেশাল টাইপ ট্রান্সফরমার" } },
    { slug: "dry-type-transformers", title: { en: "Dry-Type Transformers", bn: "ড্রাই-টাইপ ট্রান্সফরমার" } }
  ]);

  // State to hold the dynamically calculated copyright year range, initialized with a fallback to avoid SSR hydration mismatch
  const [copyrightYear, setCopyrightYear] = useState<string>("2025-2026");

  useEffect(() => {
    // Dynamically calculate and set the copyright year range on mount to prevent SSR hydration mismatch
    setCopyrightYear(calculateCopyrightYearRange());

    async function loadProducts() {
      try {
        const res = await fetch("/api/public/products");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setProducts(data.slice(0, 4));
          }
        }
      } catch (err) {
        console.warn("Failed to load footer products dynamic list:", err);
      }
    }
    loadProducts();
  }, []);

  // Hide public footer on dashboard routes
  if (pathname?.startsWith("/spl-dashboard")) {
    return null;
  }

  const getHref = (href: string) => {
    if (isHome) return href;
    if (href === "#") return "/";
    if (href.startsWith("#")) return `/${href}`;
    return href;
  };

  // Source Dhaka point translated to SVG coordinates
  const dhakaSvgX = (DHAKA_SOURCE_COORDS.left * MAP_SVG_WIDTH) / 100;
  const dhakaSvgY = (DHAKA_SOURCE_COORDS.top * MAP_SVG_HEIGHT) / 100;

  // Generate dynamic keyframes for glowing lines based on calculated curve lengths
  const curvePathsStyles = SHIPPING_DESTINATIONS.map((loc, index) => {
    const destX = (loc.left * MAP_SVG_WIDTH) / 100;
    const destY = (loc.top * MAP_SVG_HEIGHT) / 100;
    // Approximating cubic path length for proper dashoffset calculation
    const approximatedLength = Math.round(
      Math.sqrt((destX - dhakaSvgX) ** 2 + (destY - dhakaSvgY) ** 2) * 1.25
    );

    return `
      @keyframes erLine${index} {
        0% { stroke-dashoffset: ${approximatedLength}; opacity: 1; }
        70% { stroke-dashoffset: 0; opacity: 1; }
        85% { stroke-dashoffset: 0; opacity: 0; }
        100% { stroke-dashoffset: ${approximatedLength}; opacity: 0; }
      }
      @keyframes erDotAnim${index} {
        0% { opacity: 0; }
        5% { opacity: 1; }
        70% { opacity: 1; }
        80% { opacity: 0; }
        100% { opacity: 0; }
      }
    `;
  }).join("\n");

  return (
    <footer className="bg-white border-t border-gray-150 py-12 px-6 font-arone text-black">

      {/* Dynamic Keyframes Tag */}
      <style dangerouslySetInnerHTML={{ __html: curvePathsStyles }} />

      <style>{`
        .footer-webmail-btn {
          color: var(--primary-color) !important;
          border-color: color-mix(in srgb, var(--primary-color) 30%, transparent) !important;
          transition: all 0.3s ease !important;
        }
        .footer-webmail-btn:hover {
          background: linear-gradient(to right, var(--primary-color), var(--primary-color-hover)) !important;
          color: white !important;
          border-color: transparent !important;
        }
        .footer-webmail-btn svg {
          fill: currentColor !important;
        }
      `}</style>

      <div className="mx-auto max-w-310">

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Core links and information grid */}
          <div className="lg:col-span-2 grid grid-cols-1 gap-5 sm:grid-cols-2">

            {/* Column 1: Quick Links */}
            <div className="border-b border-gray-150 pb-5 text-center sm:text-left">
              <h4 className="font-kanit text-[20px] font-bold text-neutral-900 mb-6">
                {t("footer.quickLinks")}
              </h4>
              <ul className="space-y-3.5 text-[15px] font-medium text-neutral-600">
                <li className="underline font-semibold"><a href={getHref("#")} className="hover:text-brand-red transition-colors">{t("nav.home")}</a></li>
                <li className="underline font-semibold"><a href={getHref("/about")} className="hover:text-brand-red transition-colors">{t("nav.aboutUs")}</a></li>
                <li className="underline font-semibold"><a href={getHref("#products")} className="hover:text-brand-red transition-colors">{t("nav.products")}</a></li>
                <li className="underline font-semibold"><a href={getHref("/contact")} className="hover:text-brand-red transition-colors">{t("nav.contact")}</a></li>
              </ul>
            </div>

            {/* Column 2: Products */}
            <div className="border-b border-gray-150 pb-5 text-center sm:text-left">
              <h4 className="font-kanit text-[20px] font-bold text-neutral-900 mb-6">
                {t("footer.productsHeader")}
              </h4>
              <ul className="space-y-3.5 text-[15px] font-medium text-neutral-600">
                {products.map((p) => {
                  const title = language === "bn" ? (p.title?.bn || p.title?.en) : p.title?.en;
                  return (
                    <li key={p.slug} className="underline font-semibold">
                      <a href={`/products/${p.slug}`} className="hover:text-brand-red transition-colors">
                        {title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Column 3: Support & Policies */}
            <div className="text-center sm:text-left">
              <h4 className="font-kanit text-[20px] font-bold text-neutral-900 mb-6">
                {t("footer.support")}
              </h4>
              <ul className="space-y-3.5 text-[15px] font-medium text-neutral-600">
                <li className="underline font-semibold"><a href="/privacy-policy" className="hover:text-brand-red transition-colors">{t("footer.privacyPolicy")}</a></li>
                <li className="underline font-semibold"><a href="/cookie-policy" className="hover:text-brand-red transition-colors">{t("footer.cookiePolicy")}</a></li>
                <li className="underline font-semibold"><a href="/terms-of-service" className="hover:text-brand-red transition-colors">{t("footer.termsOfService")}</a></li>
                <li className="underline font-semibold"><a href="/return-policy" className="hover:text-brand-red transition-colors">{t("footer.deliveryReturnPolicy")}</a></li>
              </ul>
            </div>

            {/* Column 4: Contact Info & Brand Logo */}
            <div className="flex flex-col gap-6 items-center sm:items-start text-center sm:text-left">
              <Image
                src={logoPath || "/images/SEECOI1.png"}
                alt="SEECO Footer Brand Logo"
                width={180}
                height={45}
                className="object-contain h-auto"
              />

              <ul className="text-[13px] text-neutral-700 w-full">
                <li className="flex items-start gap-3 justify-center sm:justify-start text-left">
                  <div className="mt-0.5">
                    <FooterPhoneIcon />
                  </div>
                  <div className="flex flex-col gap-1">
                    <a href={`tel:${t("contactInfo.phone")}`} className="hover:text-brand-red leading-none">
                      {t("contactInfo.phone")}
                    </a>
                    {t("contactInfo.phone2") && (
                      <a href={`tel:${t("contactInfo.phone2")}`} className="hover:text-brand-red leading-none">
                        {t("contactInfo.phone2")}
                      </a>
                    )}
                  </div>
                </li>
                <li className="flex items-start gap-3 justify-center sm:justify-start text-left">
                  <div className="mt-0.5">
                    <FooterEnvelopeIcon />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <a href={`mailto:${t("contactInfo.email")}`} className="hover:text-brand-red leading-none">
                      {t("contactInfo.email")}
                    </a>
                  </div>
                </li>
                {t("contactInfo.email2") && (
                  <li className="flex items-start gap-3 justify-center sm:justify-start text-left">
                    <div className="mt-0.5">
                      <FooterEnvelopeIcon />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <a href={`mailto:${t("contactInfo.email2")}`} className="hover:text-brand-red leading-none">
                        {t("contactInfo.email2")}
                      </a>
                    </div>
                  </li>
                )}
                <li className="flex items-start gap-3 justify-center sm:justify-start text-left">
                  <FooterLocationPinIcon />
                  <span className="leading-tight">
                    {t("contactInfo.address")}
                  </span>
                </li>
              </ul>

              <a
                href="https://seecopowerlimited.com/webmail"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 px-5 py-1.5 rounded-full border bg-transparent text-[12px] font-bold transition-all duration-300 select-none shadow-xs hover:shadow-md hover:-translate-y-0.5 cursor-pointer active:scale-98 footer-webmail-btn"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-4.5 w-4.5 shrink-0 group-hover:scale-110 transition-transform duration-300"
                >
                  <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm-.5 4.1-7 4.9a1 1 0 0 1-1 0l-7-4.9V6.5l7.5 5.2 7.5-5.2v1.6Z" />
                </svg>
                <span>{language === "bn" ? "স্টাফ ওয়েবমেইল" : "Staff Webmail"}</span>
              </a>
            </div>
          </div>

          {/* Global Shipment interactive Map container */}
          <div className="text-center lg:col-span-3 flex items-center justify-center">
            {/* <h4 className="font-kanit text-[22px] font-bold text-neutral-900 mb-2">
              Global Shipment Reach
            </h4>
            <p className="text-[14px] text-gray-500 mb-8 max-w-[600px] mx-auto">
              Reliable distribution and power grid supply chains spanning across multi-national projects.
            </p> */}

            <div className="er-map-container">
              <div className="er-map-wrapper">

                {/* World map layout image */}
                <Image
                  src="/images/bangladesh_map.png"
                  alt="Bangladesh Map illustrating Seeco Power shipment paths"
                  width={1536}
                  height={1024}
                  className="w-full object-contain"
                />

                {/* Curves SVG container */}
                <svg
                  className="er-svg"
                  viewBox={`0 0 ${MAP_SVG_WIDTH} ${MAP_SVG_HEIGHT}`}
                  preserveAspectRatio="none"
                >

                  {/* Glow Filter for white dot animation */}
                  <defs>
                    <filter id="er-glow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
                      <feMerge>
                        <feMergeNode />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Draw curve paths and animated items */}
                  {SHIPPING_DESTINATIONS.map((loc, i) => {
                    const destX = (loc.left * MAP_SVG_WIDTH) / 100;
                    const destY = (loc.top * MAP_SVG_HEIGHT) / 100;

                    // Curve control point mid calculations
                    const midX = (dhakaSvgX + destX) / 2;
                    const midY = Math.min(dhakaSvgY, destY) - Math.abs(destX - dhakaSvgX) * 0.22;

                    const pathD = `M${dhakaSvgX},${dhakaSvgY} Q${midX},${midY} ${destX},${destY}`;
                    const pathId = `er-path-${i}`;
                    const delayTime = 1.2 + i * 0.15;
                    const approximatedLength = Math.round(
                      Math.sqrt((destX - dhakaSvgX) ** 2 + (destY - dhakaSvgY) ** 2) * 1.25
                    );

                    return (
                      <g key={i}>

                        {/* Thin static base path */}
                        <path d={pathD} fill="none" stroke="var(--primary-color)" strokeOpacity={0.14} strokeWidth="0.8" />

                        {/* Invisible helper path for animateMotion */}
                        <path id={pathId} d={pathD} fill="none" stroke="none" />

                        {/* Glowing line overlay */}
                        <path
                          d={pathD}
                          fill="none"
                          stroke="var(--primary-color)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          style={{
                            strokeDasharray: approximatedLength,
                            strokeDashoffset: approximatedLength,
                            animation: `erLine${i} 2.4s ease ${delayTime}s infinite`,
                          }}
                        />

                        {/* Traveling dot circle */}
                        <circle
                          r="3.5"
                          fill="#ffffff"
                          filter="url(#er-glow)"
                          style={{
                            animation: `erDotAnim${i} 2.4s ease ${delayTime + 0.1}s infinite`,
                          }}
                        >
                          <animateMotion
                            dur="2.4s"
                            begin={`${delayTime + 0.1}s`}
                            repeatCount="indefinite"
                            calcMode="spline"
                            keyTimes="0;1"
                            keySplines="0.4 0 0.6 1"
                          >
                            <mpath href={`#${pathId}`} />
                          </animateMotion>
                        </circle>

                      </g>
                    );
                  })}

                </svg>

                {/* Hotspot overlays */}
                <div className="absolute inset-0 pointer-events-auto">
                  {SHIPPING_DESTINATIONS.map((loc, i) => (
                    <div
                      key={loc.name}
                      className="er-hotspot"
                      style={{
                        top: `${loc.top}%`,
                        left: `${loc.left}%`,
                        animation: `erFadeIn 0.6s ease ${i * 0.1}s forwards`,
                      }}
                    >
                      <div className="er-pulse-ring" />
                      <div className="er-pulse-ring d1" />
                      <div className="er-pulse-ring d2" />
                      <div className="er-dot" />
                      <div className="er-tooltip">{loc.name}</div>
                    </div>
                  ))}

                  {/* Central Dhaka Source point */}
                  <div
                    className="er-hotspot-turkey"
                    style={{
                      top: `${DHAKA_SOURCE_COORDS.top}%`,
                      left: `${DHAKA_SOURCE_COORDS.left}%`,
                    }}
                  >
                    <div className="er-turkey-ring r1" />
                    <div className="er-turkey-ring r2" />
                    <div className="er-turkey-ring r3" />
                    <div className="er-turkey-core" />
                    <div className="er-turkey-label font-arone font-bold">{t("footer.hqLabel")}</div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Copywrite notice footer bar */}
        <div className="flex justify-center pt-5 text-gray-500 gap-4">
          <p>© {copyrightYear} Seeco Power Limited. All Rights Reserved. | Developed by JAASBD</p>
          {/* <p>© 2025-2026 Turkish Transformer. .</p> */}
          {/* <p>
            Created by{" "}
            <a href="https://pixelexa.com/" target="_blank" rel="noopener" className="font-semibold text-brand-red hover:underline">
              Pixelexa
            </a>
          </p> */}
        </div>

      </div>
    </footer >
  );
}
