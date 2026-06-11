"use client";

import Image from "next/image";

/**
 * Type representing global shipping destination location points.
 */
interface GlobalShippingLocation {
  name: string;
  top: number;  // Percentage from top
  left: number; // Percentage from left
}

// Shipping locations coordinate mapping
const SHIPPING_DESTINATIONS: GlobalShippingLocation[] = [
  { name: "Canada", top: 20, left: 15 },
  { name: "United States", top: 30, left: 14 },
  { name: "Haiti", top: 40, left: 20 },
  { name: "Peru", top: 58, left: 19 },
  { name: "United Kingdom", top: 22, left: 44 },
  { name: "Germany", top: 20, left: 48 },
  { name: "Bulgaria", top: 25, left: 52 },
  { name: "Ukraine", top: 19, left: 54 },
  { name: "Libya", top: 36, left: 50 },
  { name: "Nigeria", top: 48, left: 47 },
  { name: "Kenya", top: 52, left: 56 },
  { name: "Azerbaijan", top: 26, left: 59 },
  { name: "Kazakhstan", top: 19, left: 63 },
  { name: "Russia", top: 13, left: 67 },
  { name: "Kyrgyzstan", top: 23, left: 66 },
  { name: "Philippines", top: 42, left: 82 }
];

// Turkey coordinates serving as the shipping source center
const TURKEY_SOURCE_COORDS = { top: 28, left: 54 };

// SVG coordinate constants
const MAP_SVG_WIDTH = 1000;
const MAP_SVG_HEIGHT = 535;

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
 * Footer Component.
 * Contains site links, support policies, company info,
 * and a fully animated SVG global shipping destination map.
 */
export default function Footer() {
  // Source Turkey point translated to SVG coordinates
  const turkeySvgX = (TURKEY_SOURCE_COORDS.left * MAP_SVG_WIDTH) / 100;
  const turkeySvgY = (TURKEY_SOURCE_COORDS.top * MAP_SVG_HEIGHT) / 100;

  // Generate dynamic keyframes for glowing lines based on calculated curve lengths
  const curvePathsStyles = SHIPPING_DESTINATIONS.map((loc, index) => {
    const destX = (loc.left * MAP_SVG_WIDTH) / 100;
    const destY = (loc.top * MAP_SVG_HEIGHT) / 100;
    // Approximating cubic path length for proper dashoffset calculation
    const approximatedLength = Math.round(
      Math.sqrt((destX - turkeySvgX) ** 2 + (destY - turkeySvgY) ** 2) * 1.25
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

      <div className="mx-auto max-w-310">

        <div className="grid grid-cols-5 gap-4">
          {/* Core links and information grid */}
          <div className="col-span-2 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-2">

            {/* Column 1: Quick Links */}
            <div className="border-b border-gray-150 pb-5">
              <h4 className="font-kanit text-[20px] font-bold text-neutral-900 mb-6">
                Quick Links
              </h4>
              <ul className="space-y-3.5 text-[15px] font-medium text-neutral-600">
                <li className="underline font-semibold"><a href="#" className="hover:text-brand-red transition-colors">Home</a></li>
                <li className="underline font-semibold"><a href="#about" className="hover:text-brand-red transition-colors">About Us</a></li>
                <li className="underline font-semibold"><a href="#products" className="hover:text-brand-red transition-colors">Products</a></li>
                <li className="underline font-semibold"><a href="#contact" className="hover:text-brand-red transition-colors">Contact Us</a></li>
              </ul>
            </div>

            {/* Column 2: Products */}
            <div className="border-b border-gray-150 pb-5">
              <h4 className="font-kanit text-[20px] font-bold text-neutral-900 mb-6">
                Products
              </h4>
              <ul className="space-y-3.5 text-[15px] font-medium text-neutral-600">
                <li className="underline font-semibold"><a href="#products-distribution" className="hover:text-brand-red transition-colors">Distribution Transformers</a></li>
                <li className="underline font-semibold"><a href="#products-power" className="hover:text-brand-red transition-colors">Power Transformers</a></li>
                <li className="underline font-semibold"><a href="#products-special" className="hover:text-brand-red transition-colors">Special Type Transformers</a></li>
                <li className="underline font-semibold"><a href="#products-dry" className="hover:text-brand-red transition-colors">Dry Type Transformers</a></li>
              </ul>
            </div>

            {/* Column 3: Support & Policies */}
            <div>
              <h4 className="font-kanit text-[20px] font-bold text-neutral-900 mb-6">
                Support
              </h4>
              <ul className="space-y-3.5 text-[15px] font-medium text-neutral-600">
                <li className="underline font-semibold"><a href="#" className="hover:text-brand-red transition-colors">Privacy Policy</a></li>
                <li className="underline font-semibold"><a href="#" className="hover:text-brand-red transition-colors">Cookie Policy</a></li>
                <li className="underline font-semibold"><a href="#" className="hover:text-brand-red transition-colors">Terms of Services</a></li>
                <li className="underline font-semibold"><a href="#" className="hover:text-brand-red transition-colors">Delivery &amp; Return Policy</a></li>
              </ul>
            </div>

            {/* Column 4: Contact Info & Brand Logo */}
            <div className="flex flex-col gap-6">
              <Image
                src="/images/SEECOI1.png"
                alt="Turkish Transformer Footer Brand Logo"
                width={180}
                height={46}
                className="object-contain"
              />

              <ul className="text-[13px] text-neutral-700">
                <li className="flex items-center gap-3">
                  <FooterPhoneIcon />
                  <a href="tel:+8801818430308" className="hover:text-brand-red">+88 01818430308</a>
                </li>
                <li className="flex items-center gap-3">
                  <FooterEnvelopeIcon />
                  <a href="mailto: info@seecopowerlimited.com" className="hover:text-brand-red"> info@seecopowerlimited.com</a>
                </li>
                <li className="flex items-start gap-3">
                  <FooterLocationPinIcon />
                  <span className="leading-tight">
                    Ekuria Tila Bari, South Keranigong Dhaka- 1311
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Global Shipment interactive Map container */}
          <div className="text-center col-span-3 flex items-center justify-center">
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
                  src="/images/map.webp"
                  alt="World Map illustrating Turkish Transformer shipment paths"
                  width={1000}
                  height={535}
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
                    const midX = (turkeySvgX + destX) / 2;
                    const midY = Math.min(turkeySvgY, destY) - Math.abs(destX - turkeySvgX) * 0.22;

                    const pathD = `M${turkeySvgX},${turkeySvgY} Q${midX},${midY} ${destX},${destY}`;
                    const pathId = `er-path-${i}`;
                    const delayTime = 1.2 + i * 0.15;
                    const approximatedLength = Math.round(
                      Math.sqrt((destX - turkeySvgX) ** 2 + (destY - turkeySvgY) ** 2) * 1.25
                    );

                    return (
                      <g key={i}>

                        {/* Thin static base path */}
                        <path d={pathD} fill="none" stroke="rgba(220,30,30,0.14)" strokeWidth="0.8" />

                        {/* Invisible helper path for animateMotion */}
                        <path id={pathId} d={pathD} fill="none" stroke="none" />

                        {/* Glowing line overlay */}
                        <path
                          d={pathD}
                          fill="none"
                          stroke="#dc1e1e"
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

                  {/* Central Turkey Source point */}
                  <div
                    className="er-hotspot-turkey"
                    style={{
                      top: `${TURKEY_SOURCE_COORDS.top}%`,
                      left: `${TURKEY_SOURCE_COORDS.left}%`,
                    }}
                  >
                    <div className="er-turkey-ring r1" />
                    <div className="er-turkey-ring r2" />
                    <div className="er-turkey-ring r3" />
                    <div className="er-turkey-core" />
                    <div className="er-turkey-label font-arone font-bold">TT</div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Copywrite notice footer bar */}
        <div className="flex justify-center pt-5 text-gray-500 gap-4">
          <p>© 2025-2026 Created Faisal | Seeco Power Limited</p>
          {/* <p>© 2025-2026 Turkish Transformer. All Rights Reserved.</p> */}
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
