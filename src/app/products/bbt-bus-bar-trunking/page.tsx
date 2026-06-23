"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import PageHeader from "@/components/widgets/PageHeader";

// Local translations for self-contained component modularity
const TRANSLATIONS = {
  en: {
    title: "BBT - Bus Bar Trunking System",
    breadcrumbs: "BBT Busbar Trunking",
    subtitle: "High-Conductivity Compact Busbar Trunking Systems (100 A – 6300 A)",
    overviewTitle: "Product Overview",
    overviewText: "Our busbar trunking systems (BBT) represent the modern, efficient, and flexible alternative to traditional electrical power cabling. Fabricated from compact, sandwich-type copper or aluminum bars housed in rigid galvanized steel or aluminum enclosures, our BBT systems offer extremely low voltage drops, high short-circuit capacity, and simple plug-in tap-off configurations, making them ideal for high-rise buildings, industrial factories, and high-density data centers.",
    specBadgeTitle: "Core Parameters",
    specBadgeRating: "100 A - 6300 A",
    specBadgeVoltage: "Up to 1000 V",
    specBadgeStandard: "IEC 61439-6 Compliant",
    advantagesTitle: "Key Advantages",
    advantages: [
      {
        title: "Extremely Low Voltage Drop",
        desc: "The compact sandwich-type copper/aluminum configuration minimizes reactance and resistance, ensuring stable terminal voltage levels."
      },
      {
        title: "Space Saving & Compact",
        desc: "Requires a fraction of the space used by traditional multi-core cable trays, allowing clean vertical and horizontal risers."
      },
      {
        title: "Flexible Tap-Off Outlets",
        desc: "Equipped with multiple plug-in tap-off slots, allowing power distribution panels to be added or relocated easily without cutting cables."
      },
      {
        title: "High Short-Circuit Resistance",
        desc: "Designed to withstand high dynamic short-circuit forces, offering superior protection compared to conventional power cables."
      }
    ],
    applicationsTitle: "Common Applications",
    applications: [
      "High-rise Residential, Corporate & Commercial Towers",
      "Industrial Plants, Factories, & Textile/Garment Mills",
      "High-Density Data Centers & Server Rooms",
      "Shopping Malls, Hospitals, & Large Sub-stations",
      "Power Distribution Risers & Horizontal Feeders"
    ],
    technicalDataTitle: "Technical Specification Data",
    specsTable: {
      parameter: "Technical Parameter",
      value: "Standard Range / Option",
      rows: [
        { name: "Current Rating Range", val: "100 A to 6300 A (Feeder / Plug-in types)" },
        { name: "Conductor Material", val: "99.99% pure electrolytic Copper (tin-plated) or high-grade Aluminium" },
        { name: "Rated Operating Voltage", val: "Up to 1000 V AC" },
        { name: "Short-time Current capacity", val: "Up to 120 kA / 1 sec (depending on rating class)" },
        { name: "Enclosure Material type", val: "Extruded Aluminium alloy or Hot-dip Galvanized Steel (GI) housing" },
        { name: "IP Protection Rating", val: "IP55, IP65, IP66 (indoor riser / outdoor feeder classifications)" },
        { name: "Insulation Class", val: "Class F Polyester film wrapper or Class F Epoxy coating (withstands 150°C)" },
        { name: "Configuration poles", val: "3-Phase 3-Wire / 3-Phase 4-Wire / 3-Phase 5-Wire (with 50% or 100% integral earth/neutral)" },
        { name: "Standard Conformity guidelines", val: "IEC 61439-6, GB 7251.6 type-tested standards" }
      ]
    },
    accessoriesTitle: "Standard & Optional Accessories",
    accessoriesList: [
      "Plug-in Tap-off Box with MCCB protection switch (from 16A to 1250A)",
      "Feeder End Cable Box with terminal copper lugs",
      "Spring Hangers and rigid wall bracket hangers for indoor mounting",
      "Flexible Joint units (expansion joints) to absorb building expansions",
      "Elbow joints (90-degree horizontal/vertical L-type elbows)",
      "T-joints (T-elbows) for branch feeder splits",
      "IP-rated joint protective covers with insulation bolts",
      "Fire barrier block seals for fire-wall penetrations",
      "Flanged end terminal connections for transformers/switchgear",
      "Terminal End Caps for system sealing"
    ],
    qualityTitle: "Testing & Quality Verification",
    qualityText: "All BBT segments and accessories undergo strict type and routine testing in compliance with IEC 61439-6. Routine tests include: insulation resistance check (500V/1000V Megger), power frequency dry dielectric voltage withstand test (typically 2.5 kV AC for 1 minute), contact resistance checks at joint terminals, phase sequence verification, and mechanical check on tap-off locks.",
    ctaTitle: "Need a BBT design layout for your building?",
    ctaText: "Provide your electrical substation layout, building drawings, and load configurations. Our engineering division will design a complete busbar routing plan.",
    ctaBtn: "Inquire BBT Quote"
  },
  bn: {
    title: "বিবিটি - বাস বার ট্রাংকিং সিস্টেম",
    breadcrumbs: "বিবিটি বাসবার ট্রাংকিং",
    subtitle: "উচ্চ-পরিবাহিতা সম্পন্ন কম্প্যাক্ট বাসবার ট্রাংকিং সিস্টেম (১০০ এ – ৬৩০০ এ)",
    overviewTitle: "পণ্য পরিচিতি",
    overviewText: "আমাদের বাসবার ট্রাংকিং সিস্টেমসমূহ (BBT) প্রথাগত ভারী বৈদ্যুতিক ক্যাবলিংয়ের একটি আধুনিক, দক্ষ এবং নমনীয় বিকল্প। কম্প্যাক্ট স্যান্ডউইচ টাইপের তামা বা অ্যালুমিনিয়াম বার এবং মজবুত গ্যালভানাইজড স্টিল অথবা অ্যালুমিনিয়াম এনক্লোজারে আবৃত এই বিবিটি সিস্টেম অত্যন্ত কম ভোল্টেজ ড্রপ, উচ্চ শর্ট-সার্কিট সহনশীলতা এবং সহজ প্লাগ-ইন সংযোগ সুবিধা প্রদান করে, যা বহুতল ভবন, শিল্প কারখানা এবং ডাটা সেন্টারগুলোতে বিদ্যুৎ বিতরণের জন্য উপযুক্ত।",
    specBadgeTitle: "মূল প্যারামিটার",
    specBadgeRating: "১০০ এ - ৬৩০০ এ",
    specBadgeVoltage: "১০০০ ভি পর্যন্ত",
    specBadgeStandard: "IEC 61439-6 কমপ্লায়েন্ট",
    advantagesTitle: "প্রধান সুবিধাসমূহ",
    advantages: [
      {
        title: "অত্যন্ত কম ভোল্টেজ ড্রপ",
        desc: "কম্প্যাক্ট স্যান্ডউইচ টাইপ ডিজাইনের ফলে আবেশীয় বাধা ও রোধ কম হয়, যা ভোল্টেজের মান স্থিতিশীল রাখে।"
      },
      {
        title: "জায়গা সাশ্রয়ী ও কম্প্যাক্ট",
        desc: "প্রথাগত ক্যাবল ট্রের তুলনায় এটি অনেক কম জায়গায় ইনস্টল করা যায়, ফলে ভবনের মূল্যবান স্পেস বাঁচে।"
      },
      {
        title: "সহজ প্লাগ-ইন বিতরণ ব্যবস্থা",
        desc: "এতে একাধিক প্লাগ-ইন ট্যাব-অফ স্লট থাকে, যার ফলে ক্যাবল কাটার ঝামেলা ছাড়াই সহজেই নতুন ফীডার যুক্ত করা বা স্থানান্তর করা যায়।"
      },
      {
        title: "উচ্চ শর্ট-সার্কিট প্রতিরোধ",
        desc: "যেকোনো আকস্মিক বৈদ্যুতিক শর্ট-সার্কিটের চরম যান্ত্রিক চাপ সহ্য করার মতো মজবুত ও সুরক্ষিত কাঠামোয় তৈরি।"
      }
    ],
    applicationsTitle: "ব্যবহারের ক্ষেত্রসমূহ",
    applications: [
      "বহুতল আবাসিক ও বাণিজ্যিক অফিস টাওয়ারসমূহ",
      "শিল্পকারখানা, টেক্সটাইল প্ল্যান্ট ও গার্মেন্ট মিলসমূহ",
      "উচ্চ ক্ষমতার ডাটা সেন্টার এবং সার্ভার রুম",
      "বৃহৎ শপিং মল, সুপার মার্কেট এবং হাসপাতাল",
      "ট্রান্সফরমার ও সুইচগিয়ারের সরাসরি বৈদ্যুতিক সংযোগ"
    ],
    technicalDataTitle: "কারিগরি তথ্য তালিকা",
    specsTable: {
      parameter: "কারিগরি বৈশিষ্ট্যসমূহ",
      value: "স্ট্যান্ডার্ড রেঞ্জ / অপশন",
      rows: [
        { name: "কারেন্ট রেটিং পরিসীমা", val: "১০০ এ থেকে ৬৩০০ এ (ফিডার এবং প্লাগ-ইন প্রকার)" },
        { name: "কন্ডাক্টরের উপাদান", val: "৯৯.৯৯% খাঁটি তামা (টিন-প্লেটেড কপার) অথবা উন্নত অ্যালুমিনিয়াম" },
        { name: "কার্যকর ভোল্টেজ", val: "১০০০ ভি এসি পর্যন্ত" },
        { name: "শর্ট-সার্কিট সহন ক্ষমতা", val: "১২০ কেএ / ১ সেকেন্ড পর্যন্ত" },
        { name: "এনক্লোজার উপাদান", val: "অ্যালুমিনিয়াম অ্যালয় অথবা হট-ডিপ গ্যালভানাইজড স্টিল (GI) বডি" },
        { name: "আইপি প্রটেকশন ক্লাস", val: "IP55, IP65, IP66 (ইনডোর এবং আউটডোর ফিজিক্যাল প্রটেকশন)" },
        { name: "ইনসুলেশন প্রকার", val: "ক্লাস এফ পলিয়েস্টার ফিল্ম অথবা উন্নত ক্লাস এফ ইপক্সি কোটিং (১৫০° সে. সহনশীল)" },
        { name: "ফেজ কনফিগারেশন", val: "৩-ফেজ ৩-তার / ৩-ফেজ ৪-তার / ৩-ফেজ ৫-তার (৫০% অথবা ১০০% নিউট্রাল ও আর্থ সহ)" },
        { name: "মানসমূহ", val: "IEC 61439-6, GB 7251.6 টাইপ-টেস্টেড কমপ্লায়েন্স" }
      ]
    },
    accessoriesTitle: "স্ট্যান্ডার্ড এবং অতিরিক্ত আনুষাঙ্গিকসমূহ",
    accessoriesList: [
      "MCCB প্রটেকশন সহ প্লাগ-ইন ট্যাব-অফ বক্স (১৬এ থেকে ১২৫০এ পর্যন্ত)",
      "ক্যাবল কানেকশন টার্মিনাল সহ ফিডার এন্ড ক্যাবল বক্স",
      "ইনডোর মাউন্টিংয়ের জন্য স্প্রিং হ্যাঙ্গার এবং ওয়াল ব্র্যাকেট হ্যাঙ্গার",
      "বিল্ডিংয়ের সামান্য মুভমেন্ট শোষণের জন্য ফ্লেক্সিবল এক্সপেনশন জয়েন্ট",
      "এলবো জয়েন্ট (৯০-ডিগ্রি অনুভূমিক/উল্লম্ব L-টাইপ কপার বাঁক)",
      "শাখা লাইনের সংযোগের জন্য টি-জয়েন্ট (T-elbows)",
      "আইপি-রেটেড জয়েন্ট প্রটেকশন কভার",
      "দেয়াল ভেদকারী বিবিটি সুরক্ষার জন্য ফায়ার ব্যারিয়ার সিল",
      "ট্রান্সফরমার বা সুইচবোর্ডের সংযোগের জন্য কাস্টম ফ্ল্যাঞ্জ এন্ড কানেক্টর",
      "বিবিটি লাইনের শেষ প্রান্ত বন্ধ করার জন্য এন্ড ক্যাপ"
    ],
    qualityTitle: "পরীক্ষা এবং গুণমান যাচাইকরণ",
    qualityText: "আমাদের বিবিটি সিস্টেমের প্রতিটি সেগমেন্ট IEC 61439-6 স্ট্যান্ডার্ড অনুসারে টাইপ ও রুটিন টেস্টের মধ্য দিয়ে যায়। পরীক্ষার মধ্যে রয়েছে: ইনসুলেশন রেজিস্ট্যান্স চেক (Megger), এসি ডাই-ইলেকট্রিক ভোল্টেজ টেস্ট (সাধারণত ১ মিনিটের জন্য ২.৫ কেভি), টার্মিনাল জয়েন্টে কন্টাক্ট রেজিস্ট্যান্স পরিমাপ, ফেজ সিকোয়েন্স যাচাইকরণ, এবং ট্যাব-অফ মেকানিক্যাল লকিং সিস্টেম পরীক্ষা।",
    ctaTitle: "আপনার ভবনের জন্য বিবিটি লেআউট ডিজাইন প্রয়োজন?",
    ctaText: "আপনার ভবনের বৈদ্যুতিক সাবস্টেশন লেআউট, ড্রয়িং এবং আনুমানিক লোড আমাদের জানান। আমাদের ইঞ্জিনিয়ারিং দল সেরা বিবিটি রুট ম্যাপ তৈরি করবে।",
    ctaBtn: "বিবিটি কোটেশনের অনুরোধ পাঠান"
  }
};

export default function BbtBusBarTrunkingPage() {
  const { language } = useLanguage();
  const activeLang = language === "bn" ? "bn" : "en";
  const t = TRANSLATIONS[activeLang];

  return (
    <div className="bg-[#FAF9F5] font-arone text-black min-h-screen pb-20">
      {/* Dynamic Subpage Page Header */}
      <PageHeader
        title={t.title}
        breadcrumbsTitle={t.breadcrumbs}
        bgImage="/images/BBT.png"
      />

      <section className="py-12 px-6">
        <div className="mx-auto max-w-310">

          {/* Main Top Intro Block - 2 Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">

            {/* Left side: Detailed overview */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[12px] font-bold text-brand-red uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full border border-red-100">
                {t.subtitle}
              </span>
              <h2 className="pt-3 font-kanit text-[28px] md:text-[36px] font-bold text-neutral-900 leading-tight">
                {t.overviewTitle}
              </h2>
              <p className="text-[15.5px] leading-relaxed text-neutral-600 font-medium">
                {t.overviewText}
              </p>

              {/* Product Visual Showcase Frame */}
              <div className="relative aspect-video w-full overflow-hidden bg-white border border-neutral-200 shadow-sm rounded-2xl p-2 group hover:shadow-md transition-shadow duration-300">
                <div className="relative w-full h-full overflow-hidden rounded-xl">
                  <Image
                    src="/images/BBT.png"
                    alt={t.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>

              {/* Grid of Advantages */}
              <div className="mt-8">
                <h3 className="font-kanit text-[20px] font-bold text-neutral-900 mb-6">
                  {t.advantagesTitle}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {t.advantages.map((adv, idx) => (
                    <div
                      key={idx}
                      className="p-5 bg-white border border-neutral-100 rounded-xl hover:shadow-xs hover:border-red-100 transition-all duration-300 group"
                    >
                      <h4 className="font-kanit text-[16px] md:text-[17px] font-bold text-neutral-900 group-hover:text-brand-red transition-colors duration-200">
                        {adv.title}
                      </h4>
                      <p className="text-[13px] md:text-[13.5px] text-neutral-500 font-medium mt-2 leading-relaxed">
                        {adv.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side: High Impact specs box and applications card */}
            <div className="lg:col-span-5 space-y-8">

              {/* Core Parameters Badge Card */}
              <div className="bg-neutral-900 text-white rounded-2xl p-8 relative overflow-hidden shadow-lg">
                {/* Background glow styling */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-[#0B3A72] opacity-30 rounded-full blur-3xl -mr-10 -mt-10" />
                <div className="relative z-10 space-y-6">
                  <h3 className="font-kanit text-[18px] font-bold text-brand-red uppercase tracking-wider">
                    {t.specBadgeTitle}
                  </h3>

                  <div className="grid grid-cols-1 divide-y divide-neutral-800">
                    <div className="pb-4">
                      <span className="text-[12px] font-bold text-neutral-400 uppercase">{activeLang === "bn" ? "কারেন্ট রেটিং" : "Current Rating"}</span>
                      <p className="text-[26px] font-bold text-white tracking-tight mt-0.5">{t.specBadgeRating}</p>
                    </div>
                    <div className="py-4">
                      <span className="text-[12px] font-bold text-neutral-400 uppercase">{activeLang === "bn" ? "ভোল্টেজ ক্লাস" : "Voltage Level"}</span>
                      <p className="text-[26px] font-bold text-white tracking-tight mt-0.5">{t.specBadgeVoltage}</p>
                    </div>
                    <div className="pt-4">
                      <span className="text-[12px] font-bold text-neutral-400 uppercase">{activeLang === "bn" ? "ডিজাইন স্ট্যান্ডার্ড" : "Standards Compliance"}</span>
                      <p className="text-[18px] font-bold text-white mt-1">{t.specBadgeStandard}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Applications block */}
              <div className="bg-white border border-neutral-100 rounded-2xl p-7 shadow-xs">
                <h3 className="font-kanit text-[19px] font-bold text-neutral-900 mb-5 border-b border-neutral-100 pb-3">
                  {t.applicationsTitle}
                </h3>
                <ul className="space-y-3.5">
                  {t.applications.map((app, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-[13.5px] md:text-[14px] text-neutral-600 font-medium leading-normal">
                      <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-50 text-brand-red">
                        <svg viewBox="0 0 20 20" fill="currentColor" className="h-2.5 w-2.5">
                          <circle cx="10" cy="10" r="5" />
                        </svg>
                      </span>
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

          {/* Technical Data Sheet Table Segment */}
          <div className="mb-16">
            <div className="mb-8">
              <h2 className="font-kanit text-[24px] md:text-[30px] font-bold text-neutral-900">
                {t.technicalDataTitle}
              </h2>
              <div className="h-1 w-20 bg-brand-red mt-3 rounded-full" />
            </div>

            <div className="overflow-x-auto rounded-xl border border-neutral-200 bg-white shadow-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-neutral-900 text-white text-[14px] font-bold font-kanit">
                    <th className="p-5 border-b border-neutral-800 w-1/3">{t.specsTable.parameter}</th>
                    <th className="p-5 border-b border-neutral-800">{t.specsTable.value}</th>
                  </tr>
                </thead>
                <tbody className="text-[14px] text-neutral-700 font-medium">
                  {t.specsTable.rows.map((row, idx) => (
                    <tr
                      key={idx}
                      className={[
                        "border-b border-neutral-150 transition-colors duration-150",
                        idx % 2 === 0 ? "bg-white hover:bg-neutral-50/50" : "bg-neutral-50/30 hover:bg-neutral-50/50"
                      ].join(" ")}
                    >
                      <td className="p-5 font-bold text-neutral-800 border-r border-neutral-150">{row.name}</td>
                      <td className="p-5">{row.val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Dynamic Accessories Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
            <div className="lg:col-span-7 bg-white border border-neutral-100 rounded-2xl p-7 md:p-9 shadow-xs space-y-6">
              <h3 className="font-kanit text-[22px] md:text-[24px] font-bold text-neutral-900">
                {t.accessoriesTitle}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {t.accessoriesList.map((acc, idx) => (
                  <div key={idx} className="flex gap-3 text-[13.5px] text-neutral-600 font-medium leading-relaxed">
                    <span className="mt-1 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-red-50 text-brand-red">
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="h-3 w-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </span>
                    <span>{acc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quality assurance block */}
            <div className="lg:col-span-5 bg-neutral-900 text-white rounded-2xl p-7 md:p-9 shadow-lg relative overflow-hidden h-full flex flex-col justify-between">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-red opacity-15 rounded-full blur-3xl -ml-8 -mb-8" />
              <div className="relative z-10 space-y-4">
                <h3 className="font-kanit text-[20px] font-bold text-brand-red">
                  {t.qualityTitle}
                </h3>
                <p className="text-[13.5px] leading-relaxed text-neutral-300 font-medium">
                  {t.qualityText}
                </p>
              </div>
              <div className="mt-8 border-t border-neutral-800 pt-6 relative z-10 flex gap-4 items-center">
                <div className="h-10 w-10 shrink-0 rounded-full border border-brand-red/50 grid place-items-center text-brand-red">
                  <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[12px] font-bold text-neutral-400 uppercase">Compliance Standard</p>
                  <p className="text-[14px] font-bold text-white">ISO 9001 & IEC 61439-6 Verified</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Trigger RFQ Banner */}
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
                  href="/contact?inquiry=bbt"
                  className="inline-flex items-center gap-3 bg-brand-red hover:bg-red-600 text-white px-8 py-4 text-base font-bold rounded-lg transition-all shadow-md shadow-red-500/10 cursor-pointer group"
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
