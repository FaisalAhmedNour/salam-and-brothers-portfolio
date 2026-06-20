"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { privacyPolicyContent } from "./content";

/**
 * Address / Location pin icon for contact card.
 */
function AddressIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-brand-red">
      <path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.6A2.6 2.6 0 1 1 12 6.4a2.6 2.6 0 0 1 0 5.2Z" />
    </svg>
  );
}

/**
 * Envelope / Mail icon for contact card.
 */
function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-brand-red">
      <path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm-.5 4.1-7 4.9a1 1 0 0 1-1 0l-7-4.9V6.5l7.5 5.2 7.5-5.2v1.6Z" />
    </svg>
  );
}

/**
 * Telephone icon for contact card.
 */
function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-brand-red">
      <path fill="currentColor" d="M6.6 10.8a15.7 15.7 0 0 0 6.6 6.6l2.2-2.2a1.1 1.1 0 0 1 1.1-.27 12.3 12.3 0 0 0 3.85.62A1.15 1.15 0 0 1 21.5 16.7v3.55a1.15 1.15 0 0 1-1.15 1.15A17.75 17.75 0 0 1 2.6 3.65 1.15 1.15 0 0 1 3.75 2.5H7.3a1.15 1.15 0 0 1 1.15 1.15 12.3 12.3 0 0 0 .62 3.85 1.1 1.1 0 0 1-.27 1.1l-2.2 2.2Z" />
    </svg>
  );
}

/**
 * Globe icon for website link.
 */
function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-brand-red">
      <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93Zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39Z" />
    </svg>
  );
}

/**
 * Chevron right icon for breadcrumbs.
 */
function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4 text-gray-400">
      <path fill="currentColor" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0Z" />
    </svg>
  );
}

/**
 * Premium Privacy Policy page component.
 * Integrates layout structure with sidebar TOC navigation, active scroll spy highlighting,
 * and translations support for English and Bangla.
 */
export default function PrivacyPolicyPage() {
  const { language } = useLanguage();
  const data = privacyPolicyContent[language];
  const [activeSection, setActiveSection] = useState<string>("");

  // Update HTML Document Title dynamically based on active language context
  useEffect(() => {
    document.title = language === "bn"
      ? "প্রাইভেসি পলিসি | SEECO Power Limited"
      : "Privacy Policy | SEECO Power Limited";
  }, [language]);

  // Setup Scroll-Spy active section tracker
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-15% 0px -55% 0px", // Trigger when section headers occupy center of viewport
      threshold: 0.1,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    data.sections.forEach((section) => {
      const sectionElement = document.getElementById(section.id);
      if (sectionElement) {
        observer.observe(sectionElement);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [language, data.sections]);

  // Helper to handle smooth scrolling with top offset adjustment
  const handleTocClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -140; // Account for the sticky header height + some spacing
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <div className="relative bg-white text-black">

      {/* 2. Page Hero header Section */}
      <section className="mx-auto max-w-310 px-6 pt-6 font-montserrat">
        <div className="relative overflow-hidden rounded-[20px] bg-neutral-900 py-12 md:py-16 text-center text-white shadow-md">
          {/* Background image container representing industrial transformer setting */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/Transformer3.1.png"
              alt={`${data.title} background`}
              fill
              priority
              className="object-cover object-center"
            />
            {/* Semi-transparent dark blue overlay for high-contrast legible typography */}
            <div className="absolute inset-0 bg-[#0B3A72]/85" />
          </div>

          {/* Content container aligned center relative to overlay */}
          <div className="relative z-10 mx-auto max-w-2xl px-4">
            {/* Primary Page Heading */}
            <h1 className="font-kanit text-[32px] md:text-[44px] font-bold text-white leading-tight uppercase tracking-tight mb-3">
              {data.title}
            </h1>

            {/* Breadcrumbs navigation structure with vertical pipe separator */}
            <nav className="flex justify-center items-center gap-2 text-[14px] font-semibold text-gray-200">
              <Link href="/" className="hover:text-brand-red transition-colors duration-200">
                {language === "bn" ? "হোম" : "Home"}
              </Link>
              <span className="text-gray-400">|</span>
              <span className="text-white font-bold">{data.title}</span>
            </nav>
          </div>
        </div>
      </section>

      {/* 3. Main content Layout Grid (Sidebar TOC & Policy text container) */}
      <section className="mx-auto max-w-310 px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">

          {/* Left Column: Sticky Table of Contents navigation menu */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="bg-white p-4 shadow-xs border border-gray-150 rounded-lg sticky top-34 max-h-[calc(100vh-9rem)] overflow-y-auto">
              <h4 className="font-kanit text-[15px] font-bold text-neutral-900 pb-2 mb-2.5 border-b border-gray-150">
                {language === "bn" ? "সূচিপত্র" : "Table of Contents"}
              </h4>
              <nav aria-label="Table of contents navigation">
                <ul className="space-y-2 text-[13px] font-semibold text-neutral-600">
                  {data.sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        onClick={(e) => handleTocClick(e, section.id)}
                        className={[
                          "block py-0.5 pl-2.5 border-l-2 transition-all duration-200 hover:text-brand-red",
                          activeSection === section.id
                            ? "border-brand-red text-brand-red font-bold translate-x-0.5"
                            : "border-gray-200 hover:border-brand-red/50",
                        ].join(" ")}
                      >
                        {section.title.split(".")[1] ? section.title.split(".")[1].trim() : section.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          {/* Right Column: Scrollable Policy Content body markup */}
          <article className="lg:col-span-3 font-montserrat text-[15px] md:text-[16px] leading-relaxed text-gray-700 space-y-8">
            {data.sections.map((section, idx) => {
              const isContactSection = section.id === "contact-information";
              const isConsentSection = section.id === "consent";

              return (
                <section
                  key={section.id}
                  id={section.id}
                  className={[
                    "scroll-mt-36 border-b border-gray-150",
                    idx === data.sections.length - 1 ? "pb-0 border-b-0" : "pb-8",
                    isConsentSection ? "bg-red-50/30 p-6 md:p-8 rounded-xl border border-red-100/80" : "",
                  ].join(" ")}
                >
                  {/* Section Title */}
                  <h2 className="font-kanit text-[22px] md:text-[24px] font-bold text-neutral-900 mb-5 flex items-center">
                    <span className="w-2.5 h-6 bg-brand-red rounded-full mr-3 inline-block shrink-0" />
                    {section.title}
                  </h2>

                  {/* Section Paragraphs */}
                  {section.paragraphs.map((p, idx) => (
                    <p key={idx} className="mb-4 last:mb-0 text-neutral-800">
                      {p}
                    </p>
                  ))}

                  {/* Section List items groups (nested grid list markup if present) */}
                  {section.lists && (
                    <div className="mt-5 space-y-6">
                      {section.lists.map((listGroup, groupIdx) => (
                        <div key={groupIdx} className="bg-neutral-50/50 p-5 rounded-lg border border-neutral-100">
                          {listGroup.subtitle && (
                            <h3 className="font-kanit text-[16px] font-bold text-neutral-900 mb-3 uppercase tracking-wide">
                              {listGroup.subtitle}
                            </h3>
                          )}

                          {isContactSection ? (
                            // Premium structured business contacts info layout
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {listGroup.items.map((item, itemIdx) => {
                                let icon = <AddressIcon />;
                                let linkHref = "";
                                const val = item.split(":");
                                const label = val[0] + ":";
                                const desc = val.slice(1).join(":");

                                if (item.toLowerCase().includes("phone")) {
                                  icon = <PhoneIcon />;
                                  linkHref = "tel:+8801714102859";
                                } else if (item.toLowerCase().includes("email")) {
                                  icon = <EmailIcon />;
                                  linkHref = "mailto:info@seecopowerlimited.com";
                                } else if (item.toLowerCase().includes("website")) {
                                  icon = <GlobeIcon />;
                                  linkHref = "https://www.seecopowerlimited.com";
                                }

                                return (
                                  <li key={itemIdx} className="flex gap-3 bg-white p-4 rounded-md shadow-xs border border-gray-150/60">
                                    <div className="mt-0.5 shrink-0">{icon}</div>
                                    <div>
                                      <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                                        {label}
                                      </span>
                                      {linkHref ? (
                                        <a href={linkHref} className="text-neutral-800 hover:text-brand-red font-semibold transition-colors duration-200">
                                          {desc.trim()}
                                        </a>
                                      ) : (
                                        <span className="text-neutral-800 font-semibold">{desc.trim()}</span>
                                      )}
                                    </div>
                                  </li>
                                );
                              })}
                            </ul>
                          ) : (
                            // Standard Bullet Lists with styled inline arrow bullets
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2.5">
                              {listGroup.items.map((item, itemIdx) => (
                                <li key={itemIdx} className="flex items-start gap-2.5 text-neutral-700">
                                  <span className="text-brand-red font-extrabold mt-0.5 select-none text-[18px] leading-none">
                                    •
                                  </span>
                                  <span className="font-medium text-[14px] md:text-[15px]">{item}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              );
            })}

            {/* Note signature at bottom */}
            <div className="pt-1 border-t border-gray-150 text-center">
              <p className="text-[14px] italic font-semibold text-gray-500">
                {data.footerNote}
              </p>
            </div>
          </article>

        </div>
      </section>

    </div>
  );
}
