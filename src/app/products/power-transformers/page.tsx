"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import PageHeader from "@/components/widgets/PageHeader";

// Local translations for self-contained component modularity
const TRANSLATIONS = {
  en: {
    title: "Power Transformers",
    subtitle: "High-Voltage Oil-Immersed Power Transformers (up to 35 MVA, 245 kV)",
    breadcrumbs: "Power Transformers",
    overviewTitle: "Product Overview",
    overviewText: "Our high-reliability oil-immersed power transformers are engineered to withstand severe electrical stress, high thermal load cycles, and demanding environmental conditions. Configured up to 35 MVA and 245 kV, these units are ideally suited for utility transmission and sub-transmission substations, industrial processing plants (such as steel mills, chemical plants, and refineries), and large-scale renewable energy grid connections.",
    specBadgeTitle: "Core Parameters",
    specBadgeRating: "5 - 35 MVA",
    specBadgeVoltage: "Up to 245 kV",
    specBadgeStandard: "IEC 60076 / ANSI / IEEE",
    advantagesTitle: "Key Advantages",
    advantages: [
      {
        title: "Mechanical Resilience",
        desc: "Coils and magnetic cores are tightly clamped and processed under high vacuum to withstand short-circuit forces."
      },
      {
        title: "Thermal Management",
        desc: "Advanced cooling systems (ONAN, ONAF, ODAF) with optimized oil circulation channels prevent localized hotspots."
      },
      {
        title: "High Efficiency & Low Noise",
        desc: "Utilizes step-lap core joints, high-grade silicon steel laminations, and transposed copper windings to minimize losses and noise."
      },
      {
        title: "Long Service Life",
        desc: "Anti-corrosive polyurethane coating conforming to ISO 12944 (C4/C5 classifications) protects the unit in harsh coastal or industrial sites."
      }
    ],
    applicationsTitle: "Common Applications",
    applications: [
      "Utility Sub-transmission & Substation Hubs",
      "Power Generating Stations (Thermal, Hydro, Gas)",
      "Renewable Energy (Large Wind Farms & Solar Parks)",
      "Heavy Industry (Steel Mills, Cement Plants, Mining, Refineries)",
      "High-Voltage Custom Infrastructures"
    ],
    technicalDataTitle: "Technical Specification Data",
    specsTable: {
      parameter: "Technical Parameter",
      value: "Standard Range / Option",
      rows: [
        { name: "Power Ratings", val: "5 MVA to 35 MVA (higher ratings on request)" },
        { name: "HV Voltage Level", val: "33 kV, 66 kV, 110 kV, 132 kV, 154 kV, 220 kV, 245 kV" },
        { name: "LV/MV Voltage Level", val: "3.15 kV, 6.3 kV, 6.6 kV, 10.5 kV, 11 kV, 20 kV, 33 kV" },
        { name: "Frequency", val: "50 Hz (60 Hz available on request)" },
        { name: "Cooling Method", val: "ONAN (Oil Natural Air Natural) / ONAF (Oil Natural Air Forced) / ODAF" },
        { name: "Winding Material", val: "Electrolytic Copper (standard) / Aluminium" },
        { name: "Vector Group", val: "YNd1, YNd11, Dyn11 (other combinations supported)" },
        { name: "Tap Changer Type", val: "OLTC (On-Load Tap Changer) with drive & control panel / OCTC (Off-Circuit)" },
        { name: "Insulating Medium", val: "High-grade mineral oil (IEC 60296) / Natural ester fluid" },
        { name: "Corrosion Class", val: "C4 (industrial standard) / C5-I & C5-M (harsh industrial & marine)" }
      ]
    },
    accessoriesTitle: "Standard & Optional Accessories",
    accessoriesList: [
      "On-Load Tap Changer (OLTC) with drive cubicle and automatic voltage regulator (AVR) panel",
      "Conservator Tank with partition or rubber bag (diaphragm) to prevent air contact",
      "Oil and Winding Temperature Indicators (OTI/WTI) with remote transmission RTD sensors",
      "Magnetic Oil Level Gauge (MOLG) with alarm & trip switches",
      "Buchholz Relay for gas generation and oil surge alarm",
      "Pressure Relief Valve (PRV) with warning microswitch",
      "Dehydrating Silica Gel Breather or air maintenance dryer system",
      "Sudden Pressure Relay (SPR) for rapid fault isolation",
      "Bushing Current Transformers (BCT) for protection relays",
      "Neutral Grounding Resistor/Bushing connections"
    ],
    qualityTitle: "Testing & Quality Assurance",
    qualityText: "Every power transformer is subjected to strict routine tests according to IEC 60076. Routine tests include: Winding Resistance, Voltage Ratio and Vector Group verification, Insulation Resistance and Polarization Index, Impedance and Load Loss, No-Load Loss, Applied and Induced AC dielectric tests. Type and special tests (e.g. Temperature Rise, Lightning Impulse, Acoustic Noise Level, Partial Discharge) can be performed upon request in accredited testing centers.",
    ctaTitle: "Need a custom high-voltage power transformer?",
    ctaText: "Consult with our electrical engineers to design a robust, high-performance power transformer tailored for your utility, industry, or generation site.",
    ctaBtn: "Consult with Our Engineers"
  },
  bn: {
    title: "পাওয়ার ট্রান্সফরমার",
    subtitle: "হাই-ভোল্টেজ অয়েল-ইমার্সড পাওয়ার ট্রান্সফরমার (৩৫ এমভিএ, ২৪৫ কেভি পর্যন্ত)",
    breadcrumbs: "পাওয়ার ট্রান্সফরমার",
    overviewTitle: "পণ্য পরিচিতি",
    overviewText: "আমাদের উচ্চ-নির্ভরযোগ্য অয়েল-ইমার্সড পাওয়ার ট্রান্সফরমারসমূহ তীব্র বৈদ্যুতিক চাপ, অধিক লোড সাইকেল এবং প্রতিকূল পরিবেশগত পরিস্থিতি সহ্য করার জন্য বিশেষভাবে ডিজাইন করা হয়েছে। ৩৫ এমভিএ এবং ২৪৫ কেভি পর্যন্ত ক্ষমতাসম্পন্ন এই ট্রান্সফরমারগুলো জাতীয় গ্রিড সাবস্টেশন, বৃহৎ বিদ্যুৎ উৎপাদন কেন্দ্র (তাপ বিদ্যুৎ, জলবিদ্যুৎ, গ্যাস টারবাইন), ভারী শিল্প কারখানা (যেমন স্টিল মিল, রাসায়নিক প্ল্যান্ট, শোধনাগার) এবং উচ্চ-ক্ষমতার নবায়নযোগ্য বিদ্যুৎ কেন্দ্রের সংযোগে ব্যবহৃত হয়।",
    specBadgeTitle: "মূল প্যারামিটার",
    specBadgeRating: "৫ - ৩৫ এমভিএ",
    specBadgeVoltage: "২৪৫ কেভি পর্যন্ত",
    specBadgeStandard: "IEC 60076 / ANSI / IEEE",
    advantagesTitle: "প্রধান সুবিধাসমূহ",
    advantages: [
      {
        title: "যান্ত্রিক মজবুতি",
        desc: "বাহ্যিক শর্ট-সার্কিটের সময় সৃষ্ট যান্ত্রিক বল সহ্য করতে উইন্ডিং এবং কোর ভ্যাকুয়ামে ক্ল্যাম্প ও প্রসেস করা হয়।"
      },
      {
        title: "দক্ষ তাপ নিয়ন্ত্রণ",
        desc: "উন্নত কুলিং সিস্টেম (ONAN, ONAF, ODAF) এবং অপ্টিমাইজড অয়েল সার্কুলেশন চ্যানেল অতিরিক্ত তাপমাত্রা জমতে বাধা দেয়।"
      },
      {
        title: "উচ্চ কার্যক্ষমতা ও কম শব্দ",
        desc: "স্টেপ-ল্যাপ কোর জয়েন্ট, উচ্চ মানের সিলিকন শিট এবং উইন্ডিংয়ের কারণে বিদ্যুৎ অপচয় এবং শব্দ সর্বনিম্ন হয়।"
      },
      {
        title: "দীর্ঘস্থায়ী স্থায়িত্ব",
        desc: "C4/C5 গ্রেডের মরিচারোধী পেইন্ট কোটিং উপকূলীয় লবণাক্ত বাতাস বা দূষিত শিল্প এলাকায়ও মরিচা প্রতিরোধ করে।"
      }
    ],
    applicationsTitle: "ব্যবহারের ক্ষেত্রসমূহ",
    applications: [
      "জাতীয় ও আঞ্চলিক বৈদ্যুতিক গ্রিড ও সাবস্টেশন হাবসমূহ",
      "বিদ্যুৎ উৎপাদন কেন্দ্রসমূহ (তাপ বিদ্যুৎ, জলবিদ্যুৎ, গ্যাস টারবাইন)",
      "বৃহৎ উইন্ড ও সোলার পাওয়ার পার্কসমূহ",
      "ভারী শিল্পকারখানা (স্টিল মিল, সিমেন্ট প্ল্যান্ট, রিফাইনারি, খনি)",
      "উচ্চ-ভোল্টেজ কাস্টম বৈদ্যুতিক অবকাঠামো"
    ],
    technicalDataTitle: "কারিগরি তথ্য তালিকা",
    specsTable: {
      parameter: "কারিগরি বৈশিষ্ট্যসমূহ",
      value: "স্ট্যান্ডার্ড রেঞ্জ / অপশন",
      rows: [
        { name: "পাওয়ার রেটিং", val: "৫ এমভিএ থেকে ৩৫ এমভিএ (অনুরোধে এর বেশি)" },
        { name: "এইচভি ভোল্টেজ লেভেল", val: "৩৩ কেভি, ৬৬ কেভি, ১১০ কেভি, ১৩২ কেভি, ১৫৪ কেভি, ২২০ কেভি, ২৪৫ কেভি" },
        { name: "এলভি/এমভি ভোল্টেজ লেভেল", val: "৩.১৫ কেভি, ৬.৩ কেভি, ৬.৬ কেভি, ১০.৫ কেভি, ১১ কেভি, ২০ কেভি, ৩৩ কেভি" },
        { name: "ফ্রিকোয়েন্সি", val: "৫০ হার্জ (অনুরোধে ৬০ হার্জ উপলব্ধ)" },
        { name: "কুলিং পদ্ধতি", val: "ONAN (স্ট্যান্ডার্ড) / ONAF (ফোর্সড এয়ার) / ODAF (ডিরেক্টেড অয়েল ফোর্সড এয়ার)" },
        { name: "উইন্ডিংয়ের উপাদান", val: "উচ্চ মানের তামা (তামা উইন্ডিং স্ট্যান্ডার্ড) / অ্যালুমিনিয়াম" },
        { name: "ভেক্টর গ্রুপ", val: "YNd1, YNd11, Dyn11 (অন্যান্য কম্বিনেশন সমর্থন করে)" },
        { name: "ট্যাপ চেঞ্জার টাইপ", val: "ড্রাইভ ও কন্ট্রোল প্যানেল সহ অন-লোড ট্যাপ চেঞ্জার (OLTC) / অফ-সার্কিট ট্যাপ চেঞ্জার (OCTC)" },
        { name: "ইনসুলেটিং অয়েল", val: "উন্নত মানের মিনারেল অয়েল (IEC 60296) / ন্যাচারাল এস্টার ফ্লুইড" },
        { name: "মরিচা প্রতিরোধী পেইন্টিং", val: "ISO 12944 C4 (শিল্প স্ট্যান্ডার্ড) / C5-I ও C5-M (লবণাক্ত ও দূষিত বায়ু প্রতিরোধী)" }
      ]
    },
    accessoriesTitle: "স্ট্যান্ডার্ড এবং অতিরিক্ত আনুষাঙ্গিকসমূহ",
    accessoriesList: [
      "অটোমেটিক ভোল্টেজ রেগুলেটর (AVR) প্যানেল এবং ড্রাইভ সহ অন-লোড ট্যাপ চেঞ্জার (OLTC)",
      "তেল ও বাতাস আলাদা রাখার জন্য রাবার ডায়াফ্রাম সহ কনজারভেটর ট্যাংক",
      "রিমোট ট্রান্সমিশন RTD সেন্সর সহ অয়েল ও উইন্ডিং টেম্পারেচার ইন্ডিকেটর (OTI/WTI)",
      "অ্যালার্ম ও ট্রিপ কন্টাক্ট সহ ম্যাগনেটিক অয়েল লেভেল গেজ (MOLG)",
      "গ্যাস ট্র্যাপ ও চাপ পরিমাপক ডাবল-ফ্লোট বুকহোলজ রিলে",
      "মাইক্রো-সুইচ সহ প্রেসার রিলিফ ভালভ (PRV)",
      "সিলিকা জেল ডিহাইড্রেটিং ব্রিদার অথবা স্বয়ংক্রিয় ড্রাইং সিস্টেম",
      "দ্রুত ত্রুটি সনাক্তকরণ ও সুরক্ষায় সাডেন প্রেসার রিলে (SPR)",
      "রিলে সুরক্ষার জন্য বুশিং কারেন্ট ট্রান্সফরমার (BCT)",
      "নিউট্রাল আর্থিং রেজিস্টর/বুশিং সংযোগ"
    ],
    qualityTitle: "পরীক্ষা এবং গুণমান নিয়ন্ত্রণ",
    qualityText: "প্রতিটি পাওয়ার ট্রান্সফরমার IEC 60076 স্ট্যান্ডার্ড অনুসারে পরীক্ষা করা হয়। রুটিন পরীক্ষার মধ্যে রয়েছে: উইন্ডিং রেজিস্ট্যান্স পরিমাপ, ভোল্টেজ রেশিও ও ভেক্টর গ্রুপ যাচাইকরণ, ইনসুলেশন রেজিস্ট্যান্স এবং পোলারাইজেশন ইনডেক্স, ইম্পিডেন্স ও লোড লস পরিমাপ, নো-লোড লস পরিমাপ, এবং হাই-ভোল্টেজ ডাই-ইলেকট্রিক টেস্টসমূহ। এছাড়া গ্রাহকের অনুরোধে স্পেশাল টেস্ট যেমন: টেম্পারেচার রাইজ, লাইটনিং ইমপালস, অ্যাকোস্টিক নয়েজ লেভেল এবং পার্শিয়াল ডিসচার্জ পরীক্ষাগুলো করা সম্ভব।",
    ctaTitle: "আপনার কি হাই-ভোল্টেজ পাওয়ার ট্রান্সফরমার প্রয়োজন?",
    ctaText: "আমাদের অভিজ্ঞ ইলেকট্রিক্যাল ইঞ্জিনিয়ারদের সাথে পরামর্শ করুন আপনার প্রকল্পের গ্রিড চাহিদা, সাবস্টেশন স্পেস এবং সর্বোত্তম বিদ্যুৎ সঞ্চালন ক্ষমতা বিবেচনা করে উপযুক্ত পাওয়ার ট্রান্সফরমার ডিজাইন করতে।",
    ctaBtn: "আমাদের ইঞ্জিনিয়ারদের সাথে যোগাযোগ করুন"
  }
};

export default function PowerTransformersPage() {
  const { language } = useLanguage();
  const activeLang = language === "bn" ? "bn" : "en";
  const t = TRANSLATIONS[activeLang];

  return (
    <div className="bg-[#FAF9F5] font-arone text-black min-h-screen pb-20">
      {/* Dynamic Subpage Page Header */}
      <PageHeader
        title={t.title}
        breadcrumbsTitle={t.breadcrumbs}
        bgImage="/images/Distribution-Transformers-1.png"
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
                    src="/images/Distribution-Transformers-1.png"
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
                  href="/contact?inquiry=power"
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
