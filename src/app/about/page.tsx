"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import PageHeader from "@/components/widgets/PageHeader";

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
    missionTitle: "Our Mission",
    missionText: "To deliver reliable, safe, and energy-efficient power solutions that empower industries, support national grid development, and shape a sustainable future through uncompromising engineering excellence and client-centric service.",
    visionTitle: "Our Vision",
    visionText: "To be South Asia's most trusted and innovative manufacturer of heavy electrical machinery, recognized for quality leadership, green energy grid integration, and pioneering technical standards.",
    certificationsTitle: "Certifications & Compliance",
    certificationsSubtitle: "We adhere to strict international and national quality standards to ensure safety, durability, and reliability.",
    placeholderText: "Certificate Document Placeholder",
    placeholderDesc: "Certificate file upload pending. Double-click or replace image source once files are ready.",
    certsList: [
      {
        title: "ISO 9001:2015 Certification",
        authority: "International Quality Standards",
        desc: "Quality Management System certification for the design, manufacturing, and after-sales servicing of all heavy electrical transformers."
      },
      {
        title: "BSTI Approval",
        authority: "Bangladesh Standards and Testing Institution",
        desc: "Formally certified and licensed for commercial manufacturing and compliance under BSTI national guidelines."
      },
      {
        title: "BUET Testing and Verification",
        authority: "Bangladesh University of Engineering and Technology",
        desc: "Type-tested, temperature-rise tested, and impulse-tested by BUET labs to guarantee absolute performance under extreme grid stress."
      },
      {
        title: "CEI Office Approval",
        authority: "Office of the Chief Electrical Inspector",
        desc: "Fully approved and licensed design specifications for safe substation, generator, and switchgear operation."
      },
      {
        title: "IEC & IEEE Compliance",
        authority: "International Electrotechnical Commission",
        desc: "Every electrical equipment design complies with international standards including IEC 60076 and IEEE C57 series."
      }
    ],
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
    missionTitle: "আমাদের লক্ষ্য (Mission)",
    missionText: "আপসহীন প্রকৌশল উৎকর্ষ এবং গ্রাহক-কেন্দ্রিক সেবার মাধ্যমে নির্ভরযোগ্য, নিরাপদ এবং সাশ্রয়ী বিদ্যুৎ সমাধান সরবরাহ করা যা শিল্প প্রতিষ্ঠানসমূহকে শক্তিশালী করবে, জাতীয় গ্রিডের উন্নয়ন ঘটাবে এবং একটি টেকসই শক্তির ভবিষ্যত গড়ে তুলবে।",
    visionTitle: "আমাদের ভিশন (Vision)",
    visionText: "মানের দিক থেকে সেরা নেতৃত্ব, নবায়নযোগ্য জ্বালানি গ্রিড সংযোগ এবং অগ্রণী প্রযুক্তিগত মানদণ্ডের জন্য দক্ষিণ এশিয়ার সবচেয়ে বিশ্বস্ত এবং উদ্ভাবনী ভারী বৈদ্যুতিক সরঞ্জাম প্রস্তুতকারক প্রতিষ্ঠান হিসেবে আত্মপ্রকাশ করা।",
    certificationsTitle: "সার্টিফিকেশন ও কমপ্লায়েন্স",
    certificationsSubtitle: "নিরাপত্তা, স্থায়িত্ব এবং নির্ভরযোগ্যতা নিশ্চিত করতে আমরা কঠোর আন্তর্জাতিক ও জাতীয় মানদণ্ড মেনে চলি।",
    placeholderText: "সার্টিফিকেট ডকুমেন্ট প্লেসহোল্ডার",
    placeholderDesc: "সার্টিফিকেট ফাইল আপলোড বাকি রয়েছে। ফাইল প্রস্তুত হলে ছবির সোর্স দিয়ে এটি পরিবর্তন করুন।",
    certsList: [
      {
        title: "ISO 9001:2015 সার্টিফিকেশন",
        authority: "আন্তর্জাতিক কোয়ালিটি স্ট্যান্ডার্ড",
        desc: "ভারী বৈদ্যুতিক ট্রান্সফরমারসমূহের ডিজাইন, উৎপাদন এবং বিক্রয়োত্তর সেবা প্রদানের জন্য কোয়ালিটি ম্যানেজমেন্ট সিস্টেমের আন্তর্জাতিক সার্টিফিকেশন।"
      },
      {
        title: "বিএসটিআই (BSTI) অনুমোদন",
        authority: "বাংলাদেশ স্ট্যান্ডার্ডস অ্যান্ড টেস্টিং ইনস্টিটিউশন",
        desc: "জাতীয় ইউটিলিটি গাইডলাইন অনুযায়ী বাণিজ্যিকভাবে উৎপাদন ও মান নিয়ন্ত্রণের জন্য আনুষ্ঠানিকভাবে বিএসটিআই দ্বারা সার্টিফাইড ও অনুমোদিত।"
      },
      {
        title: "বুয়েট (BUET) পরীক্ষিত ও অনুমোদিত",
        authority: "বাংলাদেশ প্রকৌশল বিশ্ববিদ্যালয়",
        desc: "গ্রিডের চরম লোডের মধ্যেও নিখুঁত পারফরম্যান্স নিশ্চিত করতে বুয়েটের ল্যাব দ্বারা টাইপ-টেস্ট, টেম্পারেচার রাইজ এবং ইমপালস পরীক্ষা দ্বারা যাচাইকৃত।"
      },
      {
        title: "প্রধান বিদ্যুৎ পরিদর্শক (CEI) কার্যালয়ের অনুমোদন",
        authority: "প্রধান বিদ্যুৎ পরিদর্শক কার্যালয়",
        desc: "সাবস্টেশন, জেনারেটর এবং সুইচগিয়ারের নিরাপদ অপারেশনের জন্য অনুমোদিত এবং ডিজাইন স্পেসিফিকেশন লাইসেন্সপ্রাপ্ত।"
      },
      {
        title: "আইইসি (IEC) এবং আইইইই (IEEE) স্ট্যান্ডার্ড",
        authority: "আন্তর্জাতিক ইলেকট্রোটেকনিক্যাল কমিশন",
        desc: "আমাদের প্রতিটি বৈদ্যুতিক যন্ত্রপাতির ডিজাইন আইইসি ৬০৭৬ (IEC 60076) এবং আইইইই সি৫৭ (IEEE C57) আন্তর্জাতিক মানদণ্ড অনুসরণ করে।"
      }
    ],
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

      {/* 3. Mission & Vision Section */}
      <section className="py-16 bg-neutral-900 text-white relative overflow-hidden">
        {/* Decorative background glows */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-[#0B3A72] opacity-35 rounded-full blur-3xl -ml-20 -mt-20" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-red opacity-15 rounded-full blur-3xl -mr-20 -mb-20" />

        <div className="relative z-10 mx-auto max-w-310 px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* Mission Card container */}
            <div className="bg-neutral-800/50 backdrop-blur-sm border border-neutral-800 rounded-2xl p-8 hover:border-brand-red transition-all duration-300 group">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-950/50 border border-brand-red/30 text-brand-red mb-6 group-hover:scale-110 transition-transform duration-300">
                {/* SVG Target Icon representing corporate missions */}
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              </div>
              <h3 className="font-kanit text-[24px] font-bold text-white mb-4">
                {t.missionTitle}
              </h3>
              <p className="text-[14.5px] leading-relaxed text-neutral-400 font-medium">
                {t.missionText}
              </p>
            </div>

            {/* Vision Card container */}
            <div className="bg-neutral-800/50 backdrop-blur-sm border border-neutral-800 rounded-2xl p-8 hover:border-[#0B3A72] transition-all duration-300 group">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-950/50 border border-blue-900/30 text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                {/* SVG Compass Icon representing long-term corporate vision */}
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="font-kanit text-[24px] font-bold text-white mb-4">
                {t.visionTitle}
              </h3>
              <p className="text-[14.5px] leading-relaxed text-neutral-400 font-medium">
                {t.visionText}
              </p>
            </div>

          </div>
        </div>
      </section>

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
            {t.certsList.map((cert, index) => (
              <div
                key={index}
                className="flex flex-col justify-between bg-white border border-neutral-200 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all duration-300 group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-4">
                    {/* SVG credential check badge */}
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-brand-red group-hover:bg-brand-red group-hover:text-white transition-colors duration-300">
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                      </svg>
                    </span>
                    <div>
                      <h4 className="font-kanit text-[16.5px] font-bold text-neutral-900 group-hover:text-brand-red transition-colors duration-200">
                        {cert.title}
                      </h4>
                      <p className="text-[12px] text-neutral-400 font-semibold uppercase tracking-wider mt-0.5">
                        {cert.authority}
                      </p>
                    </div>
                  </div>

                  <p className="text-[13.5px] text-neutral-500 font-medium leading-relaxed mb-6">
                    {cert.desc}
                  </p>
                </div>

                {/* Styled Visual Placeholder Box (As requested by the user, for future image mapping) */}
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
              </div>
            ))}
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
                  className="inline-flex items-center gap-3 bg-brand-red hover:bg-red-600 text-white px-8 py-4.5 text-base font-bold rounded-lg transition-all shadow-md shadow-red-500/10 cursor-pointer group"
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
