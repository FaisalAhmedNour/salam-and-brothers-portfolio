"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import PageHeader from "@/components/widgets/PageHeader";

// Local translations schema for all 10 field and workshop services
// Keeps the component fully self-contained and easy to maintain
const SERVICES_TRANSLATIONS = {
  en: {
    title: "Services & Maintenance",
    headline: "Comprehensive Field & Workshop Services",
    subtitle: "SEECO Power Limited delivers end-to-end support for transformer installation, high-voltage diagnostic testing, preventive servicing, and core components refurbishments.",
    ctaText: "Request Quote",
    items: [
      {
        title: "Transformer Assembly & Relocation up to 245 kV",
        desc: "Precision engineering assembly, safe transport, and heavy-rigging placement at client sites."
      },
      {
        title: "Vacuum Oil Processing & Filling",
        desc: "Advanced high-vacuum degassing, dehydration, and particle filtration to restore dielectric strength."
      },
      {
        title: "Dissolved-Gas Analysis (48 h report)",
        desc: "Trace gases diagnostic analysis in insulation fluids to identify faults with a complete lab report."
      },
      {
        title: "Ratio, Winding Resistance, Tan-Delta, SFRA Tests",
        desc: "Comprehensive electrical verification of turns ratio, resistance, dielectric losses, and frequency response."
      },
      {
        title: "OLTC Inspection & Contact Replacement",
        desc: "Detailed evaluation of On-Load Tap Changers, mechanical repairs, and copper contact replacement."
      },
      {
        title: "Cooling System Refurbishment (Radiators/Fans)",
        desc: "Restoring thermal efficiency by descaling radiators, replacing motor fans, and checking valves."
      },
      {
        title: "Full Re-winding at Partner Workshop",
        desc: "High-grade coil reconstruction and core rebuilds for failed or aged transformer units."
      },
      {
        title: "72 h Emergency Fault Response",
        desc: "On-call field engineering mobilization for rapid diagnostics and substation troubleshooting."
      },
      {
        title: "Load-Thermography & Condition Assessment",
        desc: "Infrared imaging inspections to detect localized heat signatures and hot-spot stress points."
      },
      {
        title: "48 h Spare-Parts Dispatch (Bushings, Gaskets, OLTC)",
        desc: "Rapid delivery of original quality hardware spares, sealing elements, and terminal accessories."
      }
    ]
  },
  bn: {
    title: "সেবা ও রক্ষণাবেক্ষণ",
    headline: "কম্প্রিহেনসিভ ফিল্ড এবং ওয়ার্কশপ সেবাসমূহ",
    subtitle: "সিকো পাওয়ার লিমিটেড ট্রান্সফরমার ইনস্টলেশন, উচ্চ-ভোল্টেজ ডায়াগনস্টিক টেস্টিং, প্রতিরোধমূলক সার্ভিসিং এবং মূল উপাদান পুনর্নির্মাণের জন্য সামগ্রিক সহায়তা প্রদান করে।",
    ctaText: "কোটের জন্য অনুরোধ করুন",
    items: [
      {
        title: "২৪৫ কেভি পর্যন্ত ট্রান্সফরমার অ্যাসেম্বলি এবং স্থানান্তর",
        desc: "ক্লায়েন্ট সাইটগুলোতে নিখুঁত প্রকৌশল অ্যাসেম্বলি, নিরাপদ পরিবহন এবং ভারী রিগিংয়ের মাধ্যমে স্থাপন।"
      },
      {
        title: "ভ্যাকুয়াম অয়েল প্রসেসিং এবং ফিলিং",
        desc: "ডাই-ইলেকট্রিক ক্ষমতা পুনরুদ্ধারে উন্নত উচ্চ-ভ্যাকুয়াম ডিগ্যাসিং, ডিহাইড্রেশন এবং কণা পরিস্রাবণ।"
      },
      {
        title: "ডিসলভড-গ্যাস অ্যানালাইসিস (৪৮ ঘণ্টার রিপোর্ট)",
        desc: "ল্যাব রিপোর্ট সহ অভ্যন্তরীণ ত্রুটি সনাক্ত করতে ইনসুলেশন ফ্লুইডের দ্রবীভূত গ্যাস ডায়াগনস্টিক বিশ্লেষণ।"
      },
      {
        title: "রেশিও, উইন্ডিং রেজিস্ট্যান্স, ট্যান-ডেল্টা, এসএফআরএ টেস্ট",
        desc: "টার্ন রেশিও, রেজিস্ট্যান্স, ডাই-ইলেকট্রিক লস এবং ফ্রিকোয়েন্সি প্রতিক্রিয়ার সামগ্রিক বৈদ্যুতিক যাচাইকরণ।"
      },
      {
        title: "ওএলটিসি পরিদর্শন এবং কন্টাক্ট প্রতিস্থাপন",
        desc: "অন-লোড ট্যাপ চেঞ্জারের বিশদ মূল্যায়ন, যান্ত্রিক মেরামত এবং কপার কন্টাক্ট প্রতিস্থাপন।"
      },
      {
        title: "কুলিং সিস্টেম রিফারবিশমেন্ট (রেডিয়েটর/ফ্যান)",
        desc: "রেডিয়েটর পরিষ্কার করা, মোটর ফ্যান প্রতিস্থাপন এবং ভালভ পরীক্ষা করে তাপীয় কার্যক্ষমতা পুনরুদ্ধার।"
      },
      {
        title: "পার্টনার ওয়ার্কশপে সম্পূর্ণ রি-উইন্ডিং",
        desc: "ত্রুটিপূর্ণ বা পুরানো ট্রান্সফরমার ইউনিটের জন্য উন্নত কয়েল পুনর্নির্মাণ এবং কোর পুনর্গঠন।"
      },
      {
        title: "৭২ ঘণ্টার জরুরি ত্রুটি সমাধান সহায়তা",
        desc: "জরুরি প্রয়োজনে দ্রুত ডায়াগনস্টিকস এবং সাবস্টেশন মেরামতের জন্য অন-কল ফিল্ড ইঞ্জিনিয়ারিং দল পাঠানো।"
      },
      {
        title: "লোড-থার্মোগ্রাফি এবং কন্ডিশন অ্যাসেসমেন্ট",
        desc: "অতিরিক্ত গরম হওয়া অংশ এবং হট-স্পট সনাক্ত করতে ইনফ্রারেড ইমেজিং পরিদর্শন।"
      },
      {
        title: "৪৮ ঘণ্টার মধ্যে খুচরা যন্ত্রাংশ সরবরাহ (বুশিং, গ্যাসকেট, ওএলটিসি)",
        desc: "মূল বুশিং, উন্নত মানের গ্যাসকেট সিলিং এবং টার্মিনাল আনুষাঙ্গিকের দ্রুত ডেলিভারি।"
      }
    ]
  }
};

/**
 * ServicesPage Component.
 * Renders a visual list of 10 field and workshop maintenance services
 * in the active language (English or Bengali).
 */
export default function ServicesPage() {
  const { language } = useLanguage();

  // Coerce language key to fallback cleanly in case of custom settings values
  const activeLang = (language === "bn" ? "bn" : "en") as "en" | "bn";
  const text = SERVICES_TRANSLATIONS[activeLang];

  return (
    <div className="bg-[#FAF9F5] font-arone text-black min-h-screen pb-20">
      {/* Unified subpage layout banner */}
      <PageHeader title={text.title} />

      <section className="py-12 px-6">
        <div className="mx-auto max-w-310">

          {/* Headline & Subtitle block */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="font-kanit text-[32px] md:text-[40px] font-bold text-neutral-900 leading-tight">
              {text.headline}
            </h2>
            <p className="text-[15px] text-neutral-600 font-medium leading-relaxed">
              {text.subtitle}
            </p>
          </div>

          {/* Core Layout Split Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

            {/* Left Side: Visual graphic card representing engineers at work */}
            <div className="lg:col-span-5 relative aspect-4/5 w-full overflow-hidden bg-neutral-100 shadow-md rounded-2xl border border-white">
              <Image
                src="/images/transformer-maintenance.webp"
                alt="SEECO Substation Maintenance Engineering Team"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority // Priority load since it resides at the top fold of the services layout
              />
              <div className="absolute inset-0 bg-brand-red/5 z-10 pointer-events-none" />
            </div>

            {/* Right Side: Services Checklist with custom list-item cards */}
            <div className="lg:col-span-7 space-y-4">
              {text.items.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-4 rounded-xl bg-white border border-neutral-100 hover:border-red-100 hover:shadow-xs transition-all duration-300 group"
                >
                  {/* Styled Checkmark Container */}
                  {/* Fades to red background with white icon on list-item hover */}
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-50 text-brand-red group-hover:bg-brand-red group-hover:text-white transition-colors duration-300">
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="h-3.5 w-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </span>

                  <div>
                    <h3 className="font-kanit text-[16px] md:text-[18px] font-bold text-neutral-900 group-hover:text-brand-red transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-[13px] md:text-[14px] text-neutral-500 font-medium mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Action Trigger Banner */}
          <div className="mt-16 text-center">
            {/* Navigates directly to contact page passing dynamic inquiry type query param */}
            <Link
              href="/contact?inquiry=service"
              className="inline-flex items-center gap-3 bg-brand-red hover:bg-red-600 text-white px-8 py-4.5 text-base font-bold rounded-lg transition-colors shadow-md shadow-red-500/10 cursor-pointer group"
            >
              <span>{text.ctaText}</span>
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
