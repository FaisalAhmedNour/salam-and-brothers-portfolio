"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import PageHeader from "@/components/widgets/PageHeader";
import MissionVisionValues from "@/components/about/MissionVisionValues";
import fallbackCerts from "@/data/certificates.json";

// Local translation dictionary for bilingual support (English and Bengali).
// Keeps the component fully self-contained, modular, and easy to maintain.
const ABOUT_TRANSLATIONS = {
  en: {
    title: "About Us",
    breadcrumbs: "About Us",
    introSubtitle: "Powering Bangladesh's Energy Grid",
    introTitle: "Leading Electrical Solutions Provider",
    introPara1: "SEECO Power Limited (SPL) is a leading engineering enterprise in the energy sector of Bangladesh. Specializing in the design, manufacturing, testing, and servicing of high-quality Distribution and Power Transformers, BBT (Bus Bar Trunking Systems), Switchgear, and Diesel Generators, we have established ourselves as a benchmark for quality and engineering excellence.",
    introPara2: "From our modern production factory located in Ekuria Tila Bari, South Keranigonj, Dhaka, our state-of-the-art machinery and highly experienced engineers produce solutions tailored to utility grids, solar power parks, heavy industries, and commercial high-rise buildings. We do not just build electrical equipment — we engineer long-term energy infrastructure.",
    missionVisionValuesTitle: "Our Mission, Vision & Values",
    missionLabel: "Mission",
    visionLabel: "Vision",
    valuesLabel: "Values",
    missionPoints: [
      "To manufacture high-quality, cost effective transformers suited to Bangladesh's environmental and grid conditions",
      "To support government and private sector power projects with reliable solutions",
      "To reduce dependency on imported transformers through local production",
      "To ensure compliance with Bangladesh standards and international benchmarks"
    ],
    visionText: "To become a leading transformer manufacturer in Bangladesh by delivering world-class products that ensure sustainable and uninterrupted power across the country.",
    valuesPoints: [
      "Power Transformers (up to 132kV and beyond)",
      "Distribution Transformers (11kV / 33kV)",
      "Pad-mounted Transformers",
      "Special Purpose Transformers (industrial/customized)",
      "Transformer Repair, Maintenance & Retrofitting Services"
    ],
    certificationsTitle: "Certifications & Compliance",
    certificationsSubtitle: "We adhere to strict international and national quality standards to ensure safety, durability, and reliability.",
    placeholderText: "Certificate Document Placeholder",
    placeholderDesc: "Certificate file upload pending. Double-click or replace image source once files are ready.",
    ctaTitle: "Have questions or need a technical quotation?",
    ctaText: "Our engineering team is ready to analyze your requirements and propose the optimal electrical solutions.",
    ctaBtn: "Contact Our Team"
  },
  bn: {
    title: "আমাদের সম্পর্কে",
    breadcrumbs: "আমাদের সম্পর্কে",
    introSubtitle: "বাংলাদেশের বিদ্যুৎ অবকাঠামো বিনির্মাণে",
    introTitle: "উন্নত বৈদ্যুতিক সমাধান সরবরাহকারী",
    introPara1: "সিকো পাওয়ার লিমিটেড (এসপিএল) বাংলাদেশের জ্বালানি খাতের একটি শীর্ষস্থানীয় ইঞ্জিনিয়ারিং প্রতিষ্ঠান। উচ্চমানের ডিস্ট্রিবিউশন ও পাওয়ার ট্রান্সফরমার, বিবিটি (বাস বার ট্রাংকিং সিস্টেম), সুইচগিয়ার এবং ডিজেল জেনারেটরের ডিজাইন, উৎপাদন, টেস্টিং এবং সেবা প্রদানের মাধ্যমে আমরা নিজেদের গুণমান ও প্রকৌশল উৎকর্ষের একটি প্রতীক হিসেবে প্রতিষ্ঠিত করেছি।",
    introPara2: "ঢাকা দক্ষিণ কেরানীগঞ্জের একুরিয়া টিলা বাড়িতে অবস্থিত আমাদের আধুনিক উৎপাদন কারখানায় অত্যাধুনিক যন্ত্রপাতি এবং অত্যন্ত অভিজ্ঞ প্রকৌশলী দল ইউটিলিটি গ্রিড, সৌর বিদ্যুৎ প্রকল্প, ভারী শিল্প এবং বাণিজ্যিক ভবনের জন্য কাস্টমাইজড সমাধান তৈরি করে থাকেন। আমরা কেবল বৈদ্যুতিক সরঞ্জামই তৈরি করি না — আমরা দীর্ঘমেয়াদী বিদ্যুৎ অবকাঠামো গড়ে তুলি।",
    missionVisionValuesTitle: "আমাদের মিশন, ভিশন ও মূল্যবোধ",
    missionLabel: "মিশন",
    visionLabel: "ভিশন",
    valuesLabel: "মূল্যবোধ",
    missionPoints: [
      "বাংলাদেশের পরিবেশ ও গ্রিড ব্যবস্থার উপযোগী উচ্চমানসম্পন্ন এবং সাশ্রয়ী মূল্যের ট্রান্সফরমার প্রস্তুত করা",
      "নির্ভরযোগ্য সমাধানের মাধ্যমে সরকারি ও বেসরকারি খাতের বিদ্যুৎ প্রকল্পসমূহে সহায়তা প্রদান করা",
      "স্থানীয় উৎপাদনের মাধ্যমে আমদানিকৃত ট্রান্সফরমারের উপর নির্ভরশীলতা হ্রাস করা",
      "বাংলাদেশ মানদণ্ড এবং আন্তর্জাতিক মানের সাথে সম্মতি নিশ্চিত করা"
    ],
    visionText: "দেশব্যাপী টেকসই এবং নিরবচ্ছিন্ন বিদ্যুৎ নিশ্চিত করতে বিশ্বমানের পণ্য সরবরাহের মাধ্যমে বাংলাদেশে একটি শীর্ষস্থানীয় ট্রান্সফরমার প্রস্তুতকারী প্রতিষ্ঠান হওয়া।",
    valuesPoints: [
      "পাওয়ার ট্রান্সফরমার (১৩২কেভি এবং এর বেশি)",
      "ডিস্ট্রিবিউশন ট্রান্সফরমার (১১কেভি / ৩৩কেভি)",
      "প্যাড-মাউন্টেড ট্রান্সফরমার",
      "বিশেষ উদ্দেশ্যের ট্রান্সফরমার (শিল্প/কাস্টমাইজড)",
      "ট্রান্সফরমার মেরামত, রক্ষণাবেক্ষণ ও রেটরোফিটিং সেবা"
    ],
    certificationsTitle: "সার্টিফিকেশন ও কমপ্লায়েন্স",
    certificationsSubtitle: "নিরাপত্তা, স্থায়িত্ব এবং নির্ভরযোগ্যতা নিশ্চিত করতে আমরা কঠোর আন্তর্জাতিক ও জাতীয় মানদণ্ড মেনে চলি।",
    placeholderText: "সার্টিফিকেট ডকুমেন্ট প্লেসহোল্ডার",
    placeholderDesc: "সার্টিফিকেট ফাইল আপলোড বাকি রয়েছে। ফাইল প্রস্তুত হলে ছবির সোর্স দিয়ে এটি পরিবর্তন করুন।",
    ctaTitle: "আপনার প্রজেক্টের জন্য কোটেশন বা তথ্য প্রয়োজন?",
    ctaText: "আমাদের অভিজ্ঞ প্রকৌশলী দল আপনার প্রজেক্টের প্রয়োজনীয়তা বিশ্লেষণ করে সবথেকে উপযুক্ত বিদ্যুৎ সমাধান দিতে প্রস্তুত।",
    ctaBtn: "আমাদের সাথে যোগাযোগ করুন"
  }
};

/**
 * AboutUsPage Component.
 * Implements a premium, responsive informational layout with sections for
 * Introduction, Mission, Vision, and Certification Document Placeholders.
 * Handles localization dynamics seamlessly using LanguageContext.
 *
 * @returns React functional component rendering JSX elements.
 */
export default function AboutUsPage() {
  const { language } = useLanguage();
  const activeLang = (language === "bn" ? "bn" : "en") as "en" | "bn";
  const t = ABOUT_TRANSLATIONS[activeLang];

  const [certs, setCerts] = useState<any[]>([]);

  useEffect(() => {
    async function loadCerts() {
      try {
        const res = await fetch("/api/public/certificates");
        if (res.ok) {
          const data = await res.json();
          setCerts(data);
        } else {
          setCerts(fallbackCerts);
        }
      } catch (err) {
        console.error("Error fetching certificates from API:", err);
        setCerts(fallbackCerts);
      }
    }
    loadCerts();
  }, []);

  return (
    <div className="bg-[#FAF9F5] font-arone text-black min-h-screen pb-20">

      {/* 1. Page Header (Reuses premium theme widget overlaying image background) */}
      <PageHeader
        title={t.title}
        breadcrumbsTitle={t.breadcrumbs}
        bgImage="/images/Transformer3.1.png"
      />

      {/* 2. Introduction Section */}
      <section className="py-10 px-6">
        <div className="mx-auto max-w-310">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Column: Rich Typography and description */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[12px] font-bold text-brand-red uppercase tracking-widest bg-red-50 px-3.5 py-1.5 rounded-full border border-red-100">
                {t.introSubtitle}
              </span>
              <h2 className="pt-3 font-kanit text-[32px] md:text-[42px] font-bold text-neutral-900 leading-tight">
                {t.introTitle}
              </h2>
              <p className="text-[15.5px] leading-relaxed text-neutral-600 font-medium">
                {t.introPara1}
              </p>
              <p className="text-[15.5px] leading-relaxed text-neutral-600 font-medium">
                {t.introPara2}
              </p>
            </div>

            {/* Right Column: Premium Framed Brand Visual Image */}
            <div className="lg:col-span-5 relative aspect-square w-full overflow-hidden bg-white border border-neutral-200 shadow-md rounded-2xl p-2 group hover:shadow-lg transition-shadow duration-300">
              <div className="relative w-full h-full overflow-hidden rounded-xl bg-neutral-100">
                <Image
                  src="/images/Transformers-Be-Maintained.png"
                  alt="SEECO Substation Assembly and Engineering Team"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Mission, Vision & Values Section */}
      <MissionVisionValues />

      {/* 4. Certifications Section */}
      <section className="py-16 px-6">
        <div className="mx-auto max-w-310">

          {/* Section Heading & descriptive label */}
          <div className="text-center max-w-3xl mx-auto mb-8 space-y-4">
            <h2 className="font-kanit text-[32px] md:text-[40px] font-bold text-neutral-900 leading-tight">
              {t.certificationsTitle}
            </h2>
            <div className="h-1 w-20 bg-brand-red mx-auto rounded-full" />
            <p className="text-[15.5px] text-neutral-600 font-medium leading-relaxed pt-2">
              {t.certificationsSubtitle}
            </p>
          </div>

          {/* Grid Layout representing credentials with visual image placeholders */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certs.map((cert, index) => {
              const title = activeLang === "bn" ? cert.titleBn || cert.titleEn : cert.titleEn;
              const authority = activeLang === "bn" ? cert.authorityBn || cert.authorityEn : cert.authorityEn;
              const desc = activeLang === "bn" ? cert.descBn || cert.descEn : cert.descEn;

              return (
                <div
                  key={cert.id || index}
                  className="flex flex-col justify-between bg-white border border-neutral-200 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all duration-300 group hover:-translate-y-1"
                >
                  <div>
                    <div className="flex items-center gap-3.5 mb-4">
                      {/* SVG credential check badge */}
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-brand-red group-hover:bg-brand-red group-hover:text-white transition-colors duration-300">
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12z" />
                        </svg>
                      </span>
                      <div>
                        <h4 className="font-kanit text-[16.5px] font-bold text-neutral-900 group-hover:text-brand-red transition-colors duration-200">
                          {title}
                        </h4>
                        <p className="text-[12px] text-neutral-400 font-semibold uppercase tracking-wider mt-0.5">
                          {authority}
                        </p>
                      </div>
                    </div>

                    <p className="text-[13.5px] text-neutral-500 font-medium leading-relaxed mb-6">
                      {desc}
                    </p>
                  </div>

                  {/* Render premium scan or styled placeholder box */}
                  {cert.image ? (
                    <div className="relative w-full aspect-4/3 rounded-xl overflow-hidden bg-neutral-100 shadow-xs border border-neutral-150 group">
                      <Image
                        src={cert.image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 30vw"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <div className="relative w-full aspect-4/3 rounded-xl border-2 border-dashed border-neutral-200 bg-neutral-50/50 hover:bg-neutral-50 flex flex-col items-center justify-center text-center p-4 transition-colors duration-250 select-none group/placeholder">
                      {/* Dotted document icon */}
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-10 w-10 text-neutral-300 group-hover/placeholder:text-brand-red transition-colors duration-200 mb-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                      <span className="font-kanit text-[12.5px] font-bold text-neutral-700">
                        {t.placeholderText}
                      </span>
                      <span className="text-[10px] text-neutral-400 leading-normal max-w-50 mt-1 font-medium">
                        {t.placeholderDesc}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. Request For Quotation Call To Action Segment */}
      <section className="px-6">
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
                  href="/contact?inquiry=about"
                  className="inline-flex items-center gap-3 bg-brand-red hover:bg-brand-red-hover text-white px-8 py-4.5 text-base font-bold rounded-lg transition-all shadow-md shadow-red-500/10 cursor-pointer group"
                >
                  <span>{t.ctaBtn}</span>
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
