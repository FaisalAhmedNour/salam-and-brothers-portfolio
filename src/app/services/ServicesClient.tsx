"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import PageHeader from "@/components/widgets/PageHeader";

interface ServicesClientProps {
  initialItems: any[];
  initialSettings: any;
}

export default function ServicesClient({ initialItems, initialSettings }: ServicesClientProps) {
  const { language } = useLanguage();
  const activeLang = (language === "bn" ? "bn" : "en") as "en" | "bn";

  const [items] = useState<any[]>(initialItems);
  const [settings] = useState<any>(initialSettings);

  const headline = activeLang === "bn" ? settings.headlineBn || settings.headlineEn : settings.headlineEn;
  const subtitle = activeLang === "bn" ? settings.subtitleBn || settings.subtitleEn : settings.subtitleEn;
  const pageTitle = activeLang === "bn" ? "সেবা ও রক্ষণাবেক্ষণ" : "Services & Maintenance";
  const ctaText = activeLang === "bn" ? "কোটের জন্য অনুরোধ করুন" : "Request Quote";

  return (
    <div className="bg-[#FAF9F5] font-arone text-black min-h-screen pb-20">
      <PageHeader title={pageTitle} />

      <section className="py-12 px-6">
        <div className="mx-auto max-w-310">

          {/* Headline & Subtitle block */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="font-kanit text-[32px] md:text-[40px] font-bold text-neutral-900 leading-tight">
              {headline}
            </h2>
            <p className="text-[15px] text-neutral-600 font-medium leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Core Layout Split Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

            {/* Left Side: Visual graphic card */}
            <div className="lg:col-span-5 relative aspect-4/5 w-full overflow-hidden bg-neutral-100 shadow-md rounded-2xl border border-white">
              {settings.imagePath && (
                <Image
                  src={settings.imagePath}
                  alt="SEECO Substation Maintenance Engineering Team"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              )}
              <div className="absolute inset-0 bg-brand-red/5 z-10 pointer-events-none" />
            </div>

            {/* Right Side: Services Checklist */}
            <div className="lg:col-span-7 space-y-4">
              {items.map((item, index) => {
                const title = activeLang === "bn" ? item.titleBn || item.titleEn : item.titleEn;
                const desc = activeLang === "bn" ? item.descBn || item.descEn : item.descEn;

                return (
                  <div
                    key={item.id || index}
                    className="flex gap-4 p-4 rounded-xl bg-white border border-neutral-100 hover:border-red-100 hover:shadow-xs transition-all duration-300 group"
                  >
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-50 text-brand-red group-hover:bg-brand-red group-hover:text-white transition-colors duration-300">
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="h-3.5 w-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </span>

                    <div>
                      <h3 className="font-kanit text-[16px] md:text-[18px] font-bold text-neutral-900 group-hover:text-brand-red transition-colors duration-300">
                        {title}
                      </h3>
                      <p className="text-[13px] md:text-[14px] text-neutral-500 font-medium mt-1 leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Action Trigger Banner */}
          <div className="mt-16 text-center">
            <Link
              href="/contact?inquiry=service"
              className="inline-flex items-center gap-3 bg-brand-red hover:bg-brand-red-hover text-white px-8 py-4.5 text-base font-bold rounded-lg transition-colors shadow-md shadow-red-500/10 cursor-pointer group"
            >
              <span>{ctaText}</span>
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
