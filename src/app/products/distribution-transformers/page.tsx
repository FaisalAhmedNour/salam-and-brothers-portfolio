"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import PageHeader from "@/components/widgets/PageHeader";

// Local translations for self-contained component modularity
const TRANSLATIONS = {
  en: {
    title: "Distribution Transformers",
    subtitle: "Oil-Immersed Distribution Transformers (10 - 5000 kVA)",
    breadcrumbs: "Distribution Transformers",
    overviewTitle: "Product Overview",
    overviewText: "Our oil-immersed distribution transformers are engineered to deliver high efficiency, field reliability, and thermal durability. Fully compliant with IEC 60076 standards and the EU Ecodesign Tier 2 regulation, these transformers serve utilities, heavy industries, solar/wind farms, and large commercial infrastructures to safely step down medium-voltage power for local grids.",
    specBadgeTitle: "Core Parameters",
    specBadgeRating: "10 - 5000 kVA",
    specBadgeVoltage: "Up to 36 kV",
    specBadgeStandard: "IEC 60076 / EU Tier 2",
    advantagesTitle: "Key Advantages",
    advantages: [
      {
        title: "Energy Efficiency",
        desc: "Optimized magnetic core structures and coil designs reduce load and no-load losses, cutting operating expenses."
      },
      {
        title: "Durable Construction",
        desc: "Sealed tanks treated with robust, multi-layer anti-corrosion coatings (up to C4/C5 grade) ensure long-term outdoor service."
      },
      {
        title: "Advanced Diagnostics",
        desc: "Pre-installed nodes accommodate modern monitoring instruments, including oil level gauges, Buchholz relays, and digital OTI/WTI sensors."
      },
      {
        title: "Custom Configurations",
        desc: "Flexible designs adapt to custom installation envelopes, bushing directions, cable terminal layouts, and specific environmental limits."
      }
    ],
    applicationsTitle: "Common Applications",
    applications: [
      "Electric Utility Distribution Subnetworks",
      "Solar (PV) & Wind Power Generation Sites",
      "Industrial Processing Plants & Manufacture Sites",
      "Large-scale Commercial Complexes & Data Centers",
      "Infrastructure Projects (Railways, Harbors, Airports)"
    ],
    technicalDataTitle: "Technical Specification Data",
    specsTable: {
      parameter: "Technical Parameter",
      value: "Standard Range / Option",
      rows: [
        { name: "Power Ratings", val: "10 kVA to 5000 kVA" },
        { name: "HV Voltage Level", val: "6 kV, 11 kV, 20 kV, 22 kV, 33 kV, 36 kV (others on request)" },
        { name: "LV Voltage Level", val: "400 V, 415 V, 420 V, 690 V (custom voltages supported)" },
        { name: "Frequency", val: "50 Hz (60 Hz available on request)" },
        { name: "Cooling Method", val: "ONAN (standard) / ONAF (optional on request)" },
        { name: "Winding Material", val: "Electrolytic Copper or High-Purity Aluminium" },
        { name: "Vector Group", val: "Dyn11, Dyn5, Yyn0 (custom vector groups supported)" },
        { name: "Tap Changer Type", val: "OCTC (Off-Circuit Tap Changer) ±2×2.5% / OLTC (On-Load Tap Changer)" },
        { name: "Bushing Types", val: "Porcelain Bushings (standard) / Plug-in Elastomeric Bushings" },
        { name: "Painting Standard", val: "ISO 12944 standard painting systems, up to C5-I / C5-M marine protection" }
      ]
    },
    accessoriesTitle: "Standard & Optional Accessories",
    accessoriesList: [
      "Off-Circuit Tap Changer switch handle with locking mechanism",
      "Magnetic Oil Level Gauge (with low level indicator contacts)",
      "Oil Temperature Indicator (OTI) with microswitches for Alarm/Trip",
      "Winding Temperature Indicator (WTI) with microswitches for Fan Control/Alarm/Trip",
      "Double-float Buchholz Relay for gas accumulation and surge detection",
      "Pressure Relief Valve (PRV) with electrical switch contacts",
      "Dehydrating Silica Gel Breather",
      "Drain and Sampling Valves for oil diagnostics",
      "Heavy-duty Lifting Lugs, Pulling Eyes, and Towing Holes",
      "Bi-directional rollers / wheels"
    ],
    qualityTitle: "Testing & Quality Assurance",
    qualityText: "Every individual transformer manufactured undergoes strict routine testing in compliance with IEC 60076 in our laboratory. We provide a complete Factory Acceptance Test (FAT) report. Routine tests include: Winding Resistance Measurement, Voltage Ratio & Vector Group Check, Impedance Voltage & Load Loss test, No-Load Loss & No-Load Current measurement, Insulation Resistance (Megger), and Applied Voltage & Induced Overvoltage dielectric checks.",
    ctaTitle: "Need a custom distribution transformer?",
    ctaText: "Let our engineering team design a tailor-made solution matching your exact project specs, footprint, and electrical parameters.",
    ctaBtn: "Request a Technical Quote"
  },
  bn: {
    title: "ডিস্ট্রিবিউশন ট্রান্সফরমার",
    subtitle: "অয়েল-ইমার্সড ডিস্ট্রিবিউশন ট্রান্সফরমার (১০ – ৫০০০ কেভিএ)",
    breadcrumbs: "ডিস্ট্রিবিউশন ট্রান্সফরমার",
    overviewTitle: "পণ্য পরিচিতি",
    overviewText: "আমাদের অয়েল-ইমার্সড ডিস্ট্রিবিউশন ট্রান্সফরমারসমূহ উচ্চ দক্ষতা, দীর্ঘস্থায়ী স্থায়িত্ব এবং মাঠপর্যায়ে নির্ভরযোগ্যতা নিশ্চিত করার জন্য বিশেষভাবে ডিজাইন করা হয়েছে। আইইসি ৬০৭৬ (IEC 60076) এবং ইউরোপীয় Ecodesign Tier 2 নিয়মাবলী মেনে তৈরি এই ট্রান্সফরমারগুলো বিদ্যুৎ বিতরণকারী সংস্থা, মাঝারি ও ভারী শিল্প কারখানা, সোলার/উইন্ড বিদ্যুৎ কেন্দ্র এবং বড় বাণিজ্যিক ভবনে নিরাপদ বিদ্যুৎ সরবরাহে ব্যবহৃত হয়।",
    specBadgeTitle: "মূল প্যারামিটার",
    specBadgeRating: "১০ - ৫০০০ কেভিএ",
    specBadgeVoltage: "৩৬ কেভি পর্যন্ত",
    specBadgeStandard: "IEC 60076 / EU Tier 2",
    advantagesTitle: "প্রধান সুবিধাসমূহ",
    advantages: [
      {
        title: "উচ্চ জ্বালানি দক্ষতা",
        desc: "অপ্টিমাইজড ম্যাগনেটিক কোর এবং উইন্ডিং ডিজাইনের কারণে নো-লোড এবং লোড লস হ্রাস পায়, যা পরিচালন ব্যয় সাশ্রয় করে।"
      },
      {
        title: "দীর্ঘস্থায়ী ও মজবুত গঠন",
        desc: "মরিচারোধী মাল্টি-লেয়ার কোটিং (C4/C5 গ্রেড পর্যন্ত) যুক্ত সিলড ট্যাংক খোলা জায়গায় দীর্ঘ সময় ধরে টেকসই সেবা দেয়।"
      },
      {
        title: "উন্নত পর্যবেক্ষণ ব্যবস্থা",
        desc: "প্রাক-ইনস্টল করা নোডে অয়েল লেভেল গেজ, বুকহোলজ রিলে এবং ডিজিটাল OTI/WTI সেন্সর যুক্ত করা যায়।"
      },
      {
        title: "কাস্টমাইজড কনফিগারেশন",
        desc: "গ্রাহকের প্রয়োজন অনুসারে সাইটের স্থান, বুশিংয়ের দিক, ক্যাবল টার্মিনাল লেআউট এবং বিশেষ আবহাওয়া বিবেচনা করে কাস্টম তৈরি করা হয়।"
      }
    ],
    applicationsTitle: "ব্যবহারের ক্ষেত্রসমূহ",
    applications: [
      "জাতীয় ও আঞ্চলিক বৈদ্যুতিক গ্রিড সাবস্টেশনসমূহ",
      "সোলার (PV) এবং উইন্ড রিনিউয়েবল বিদ্যুৎ কেন্দ্রসমূহ",
      "মাঝারি এবং ভারী শিল্প কারখানা ও ম্যানুফ্যাকচারিং প্ল্যান্ট",
      "বড় বাণিজ্যিক ভবন, ডাটা সেন্টার এবং রিয়েল এস্টেট প্রজেক্ট",
      "অবকাঠামোগত প্রকল্প (রেলওয়ে, বিমানবন্দর ও সমুদ্রবন্দর)"
    ],
    technicalDataTitle: "কারিগরি তথ্য তালিকা",
    specsTable: {
      parameter: "কারিগরি বৈশিষ্ট্যসমূহ",
      value: "স্ট্যান্ডার্ড রেঞ্জ / অপশন",
      rows: [
        { name: "পাওয়ার রেটিং", val: "১০ কেভিএ থেকে ৫০০০ কেভিএ" },
        { name: "এইচভি ভোল্টেজ লেভেল", val: "৬ কেভি, ১১ কেভি, ২০ কেভি, ২২ কেভি, ৩৩ কেভি, ৩৬ কেভি (অনুরোধে অন্যান্য)" },
        { name: "এলভি ভোল্টেজ লেভেল", val: "৪০০ ভি, ৪১৫ ভি, ৪২০ ভি, ৬৯০ ভি (গ্রাহকের চাহিদা অনুযায়ী পরিবর্তনশীল)" },
        { name: "ফ্রিকোয়েন্সি", val: "৫০ হার্জ (অনুরোধে ৬০ হার্জ উপলব্ধ)" },
        { name: "কুলিং পদ্ধতি", val: "ONAN (স্ট্যান্ডার্ড) / ONAF (অনুরোধে)" },
        { name: "উইন্ডিংয়ের উপাদান", val: "উচ্চ পরিবাহী ইলেকট্রোলাইটিক তামা অথবা উন্নত অ্যালুমিনিয়াম" },
        { name: "ভেক্টর গ্রুপ", val: "Dyn11, Dyn5, Yyn0 (অন্যান্য ভেক্টর গ্রুপ কাস্টমাইজ করা সম্ভব)" },
        { name: "ট্যাপ চেঞ্জার টাইপ", val: "অফ-সার্কিট ট্যাপ চেঞ্জার (OCTC) ±২×২.৫% / অন-লোড ট্যাপ চেঞ্জার (OLTC)" },
        { name: "বুশিং প্রকার", val: "পোরসেলিন বুশিং (স্ট্যান্ডার্ড) / প্লাগ-ইন ইলাস্টোমেরিক বুশিং" },
        { name: "পেইন্টিং স্ট্যান্ডার্ড", val: "C5-I / C5-M সামুদ্রিক আবহাওয়া প্রতিরোধী কোটিং (ISO 12944)" }
      ]
    },
    accessoriesTitle: "স্ট্যান্ডার্ড এবং অতিরিক্ত আনুষাঙ্গিকসমূহ",
    accessoriesList: [
      "লকিং মেকানিজম সহ অফ-সার্কিট ট্যাপ চেঞ্জার হ্যান্ডেল",
      "ম্যাগনেটিক অয়েল লেভেল গেজ (কম তেলের সতর্কবার্তা কন্টাক্ট সহ)",
      "অ্যালার্ম ও ট্রিপ সংযোগ সহ অয়েল টেম্পারেচার ইন্ডিকেটর (OTI)",
      "কুলিং ফ্যান কন্ট্রোল ও ট্রিপ সংযোগ সহ উইন্ডিং টেম্পারেচার ইন্ডিকেটর (WTI)",
      "গ্যাস জমার সতর্কবার্তা ও চাপ পরিমাপক ডাবল-ফ্লোট বুকহোলজ রিলে",
      "বৈদ্যুতিক সুইচ কন্টাক্ট সহ প্রেসার রিলিফ ভালভ (PRV)",
      "ডিহাইড্রেটিং সিলিকা জেল ব্রিদার",
      "তেল পরীক্ষা ও ড্রেন করার জন্য ড্রেন এবং স্যাম্পলিং ভালভ",
      "ভারী উত্তোলনের জন্য লিফটিং লাগ এবং পুলিং আইজ",
      "দিক পরিবর্তনযোগ্য রোলার এবং চাকা"
    ],
    qualityTitle: "পরীক্ষা এবং গুণমান নিয়ন্ত্রণ",
    qualityText: "ডেলিভারির পূর্বে আমাদের নিজস্ব ল্যাবরেটরিতে প্রতিটি ট্রান্সফরমার IEC 60076 স্ট্যান্ডার্ড অনুযায়ী সম্পূর্ণ রুটিন টেস্ট করা হয় এবং অফিসিয়াল ফ্যাক্টরি টেস্ট রিপোর্ট (FAT) প্রদান করা হয়। রুটিন পরীক্ষার মধ্যে রয়েছে: উইন্ডিং রেজিস্ট্যান্স পরিমাপ, ভোল্টেজ রেশিও ও ভেক্টর গ্রুপ যাচাইকরণ, ইম্পিডেন্স ভোল্টেজ ও লোড লস পরিমাপ, নো-লোড লস ও নো-লোড কারেন্ট পরিমাপ, ইনসুলেশন রেজিস্ট্যান্স (মেগার পরীক্ষা), এবং ডাই-ইলেকট্রিক টেস্টসমূহ।",
    ctaTitle: "আপনার কি কাস্টম ডিস্ট্রিবিউশন ট্রান্সফরমার প্রয়োজন?",
    ctaText: "আমাদের অভিজ্ঞ ইঞ্জিনিয়ার দল আপনার প্রকল্পের সুনির্দিষ্ট লোড চাহিদা, পরিবেশগত শর্ত এবং ইনস্টলেশন স্পেস বিবেচনা করে উপযুক্ত সমাধান তৈরি করতে প্রস্তুত।",
    ctaBtn: "কারিগরি কোটেশনের অনুরোধ পাঠান"
  }
};

export default function DistributionTransformersPage() {
  const { language } = useLanguage();
  const activeLang = language === "bn" ? "bn" : "en";
  const t = TRANSLATIONS[activeLang];

  return (
    <div className="bg-[#FAF9F5] font-arone text-black min-h-screen pb-20">
      {/* Dynamic Subpage Page Header */}
      <PageHeader
        title={t.title}
        breadcrumbsTitle={t.breadcrumbs}
        bgImage="/images/power-transformer.png"
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
              <h2 className="font-kanit text-[28px] md:text-[36px] font-bold text-neutral-900 leading-tight pt-3">
                {t.overviewTitle}
              </h2>
              <p className="text-[15.5px] leading-relaxed text-neutral-600 font-medium">
                {t.overviewText}
              </p>

              {/* Product Visual Showcase Frame */}
              <div className="relative aspect-video w-full overflow-hidden bg-white border border-neutral-200 shadow-sm rounded-2xl p-2 group hover:shadow-md transition-shadow duration-300">
                <div className="relative w-full h-full overflow-hidden rounded-xl">
                  <Image
                    src="/images/power-transformer.png"
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
                      <span className="text-[12px] font-bold text-neutral-400 uppercase">{activeLang === "bn" ? "পাওয়ার রেটিং" : "Rating Capacity"}</span>
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
                  <p className="text-[14px] font-bold text-white">ISO 9001 & IEC 60076 Verified</p>
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
                  href="/contact?inquiry=distribution"
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
