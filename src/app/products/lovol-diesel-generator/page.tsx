"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import PageHeader from "@/components/widgets/PageHeader";

// Local translations for self-contained component modularity
const TRANSLATIONS = {
  en: {
    title: "Lovol Diesel Generator",
    subtitle: "High-Performance Lovol Diesel Generator Sets (20 – 150 kVA)",
    breadcrumbs: "Lovol Diesel Generator",
    overviewTitle: "Product Overview",
    overviewText: "Our Lovol diesel generator sets are engineered to deliver reliable backup and prime power for industrial facilities, commercial buildings, agricultural sites, and emergency backup sub-stations. Powered by genuine Lovol diesel engines (originally derived from Perkins technology), these generators combine low fuel consumption with exceptional load response, durability, and quiet operations.",
    specBadgeTitle: "Core Parameters",
    specBadgeRating: "20 - 150 kVA",
    specBadgeVoltage: "400V / 230V",
    specBadgeStandard: "ISO 8528 / CE Certified",
    advantagesTitle: "Key Advantages",
    advantages: [
      {
        title: "Fuel Economy",
        desc: "Lovol engines are designed with advanced combustion technology, delivering optimal power output with minimal fuel consumption."
      },
      {
        title: "Robust Engine Block",
        desc: "High mechanical durability, easy maintenance, and widespread spare parts availability ensure low cost of ownership."
      },
      {
        title: "Brushless Alternator",
        desc: "Equipped with Stamford or Leroy Somer brushless alternators featuring Automatic Voltage Regulation (AVR) for clean power."
      },
      {
        title: "Intelligent Controller",
        desc: "Utilizes Deep Sea (DSE) auto-start control panels for comprehensive engine protection and remote monitoring."
      }
    ],
    applicationsTitle: "Common Applications",
    applications: [
      "Industrial Factories & Manufacturing Units",
      "Hospitals, Commercial Complexes, & High-rises",
      "Substation Emergency Power Supplies",
      "Telecommunication Towers & Data Centers",
      "Poultry Farms, Cold Storage, & Agricultural Sites"
    ],
    technicalDataTitle: "Technical Specification Data",
    specsTable: {
      parameter: "Technical Parameter",
      value: "Standard Range / Option",
      rows: [
        { name: "Power Ratings", val: "20 kVA to 150 kVA (Standby / Prime)" },
        { name: "Engine Model", val: "Genuine Lovol Diesel Engine (originally Perkins design)" },
        { name: "Alternator Type", val: "Stamford / Leroy Somer / SEECO Brushless, IP23, H insulation" },
        { name: "Control Panel", val: "Deep Sea Electronics (DSE) Auto Start / AMF Controller" },
        { name: "Voltage & Phase", val: "400V / 230V, 3-Phase 4-Wire (custom voltages available)" },
        { name: "Frequency", val: "50 Hz (60 Hz available on request)" },
        { name: "Canopy Type", val: "Soundproof, Weatherproof Silent Canopy (68-72 dBA at 7m) or Open Type" },
        { name: "Governor Type", val: "Mechanical / Electronic Governor (depending on capacity)" },
        { name: "Starting System", val: "12V DC Starter Motor and lead-acid starting battery" },
        { name: "Base Tank Capacity", val: "8 to 12 hours continuous running fuel tank built into skid frame" }
      ]
    },
    accessoriesTitle: "Standard & Optional Accessories",
    accessoriesList: [
      "Auto Transfer Switch (ATS) panel for automatic mains failure backup",
      "Soundproof, lockable, and weatherproof silent enclosure",
      "Residential exhaust silencer (muffler) with flexible bellows",
      "12V/24V lead-acid starting battery with cable and rack",
      "Industrial battery float charger (smart charger)",
      "Daily service fuel tank built into the base frame",
      "Anti-vibration rubber mounting pads between engine/alternator and skid",
      "Engine jacket water pre-heater (optional for cold-weather starting)",
      "Lube oil drain pump for easy servicing",
      "Standard toolset and operation manual booklet"
    ],
    qualityTitle: "Testing & Quality Assurance",
    qualityText: "Every generator set undergoes strict Factory Acceptance Testing (FAT) on our load banks before dispatch. We test and calibrate each unit at 25%, 50%, 75%, 100%, and 110% overload capacities. Transient response, frequency regulation, and voltage stability checks are carried out to ensure the unit is ready for immediate deployment.",
    ctaTitle: "Need a reliable standby generator?",
    ctaText: "Consult with our power team to select and configure the correct Lovol generator rating and silent canopy setup for your facility.",
    ctaBtn: "Inquire Generator Quote"
  },
  bn: {
    title: "লোভল ডিজেল জেনারেটর",
    subtitle: "উচ্চ-ক্ষমতাসম্পন্ন লোভল ডিজেল জেনারেটর সেট (২০ – ১৫০ কেভিএ)",
    breadcrumbs: "লোভল ডিজেল জেনারেটর",
    overviewTitle: "পণ্য পরিচিতি",
    overviewText: "আমাদের লোভল ডিজেল জেনারেটর সেটসমূহ শিল্পকারখানা, বাণিজ্যিক ভবন, কৃষি খামার এবং সাবস্টেশনগুলোতে নির্ভরযোগ্য ব্যাকআপ এবং প্রাইম পাওয়ার সরবরাহের জন্য তৈরি করা হয়েছে। জেনুইন লোভল ডিজেল ইঞ্জিন (যা মূলত পারকিন্স প্রযুক্তির ওপর ভিত্তি করে নির্মিত) দ্বারা চালিত এই জেনারেটরগুলো ন্যূনতম জ্বালানি খরচে সর্বোচ্চ লোড রেসপন্স, স্থায়িত্ব এবং শব্দহীন কার্যক্রম নিশ্চিত করে।",
    specBadgeTitle: "মূল প্যারামিটার",
    specBadgeRating: "২০ - ১৫০ কেভিএ",
    specBadgeVoltage: "৪০০ভি / ২৩০ভি",
    specBadgeStandard: "ISO 8528 / CE সার্টিফাইড",
    advantagesTitle: "প্রধান সুবিধাসমূহ",
    advantages: [
      {
        title: "জ্বালানি সাশ্রয়ী",
        desc: "লোভল ইঞ্জিনের উন্নত কম্বাশন প্রযুক্তির ফলে এটি খুব কম জ্বালানি খরচ করে সর্বোচ্চ কার্যক্ষমতা নিশ্চিত করে।"
      },
      {
        title: "টেকসই ও মজবুত গঠন",
        desc: "ইঞ্জিনের উচ্চ স্থায়িত্ব, সহজ রক্ষণাবেক্ষণ এবং স্পেয়ার পার্টসের সহজলভ্যতা এর পরিচালনার খরচ কম রাখে।"
      },
      {
        title: "ব্রাশলেস অল্টারনেটর",
        desc: "স্ট্যামফোর্ড বা লেরয় সোমার ব্রাশলেস অল্টারনেটর এবং অটোমেটিক ভোল্টেজ রেগুলেশন (AVR) প্রযুক্তির কারণে এতে ভোল্টেজ ওঠা-নামা করে না।"
      },
      {
        title: "স্মার্ট কন্ট্রোল প্যানেল",
        desc: "ডিপ সি (DSE) অটো-স্টার্ট কন্ট্রোল প্যানেলের মাধ্যমে জেনারেটরের রিমোট মনিটরিং এবং সার্বিক নিরাপত্তা নিশ্চিত করা হয়।"
      }
    ],
    applicationsTitle: "ব্যবহারের ক্ষেত্রসমূহ",
    applications: [
      "শিল্পকারখানা ও ম্যানুফ্যাকচারিং প্ল্যান্টসমূহ",
      "হাসপাতাল, বহুতল বাণিজ্যিক ও আবাসিক ভবন",
      "বৈদ্যুতিক সাবস্টেশন জরুরি বিদ্যুৎ সরবরাহ",
      "টেলিকমিউনিকেশন টাওয়ার এবং ডাটা সেন্টার",
      "পোল্ট্রি ফার্ম, কোল্ড স্টোরেজ এবং কৃষি প্রজেক্ট"
    ],
    technicalDataTitle: "কারিগরি তথ্য তালিকা",
    specsTable: {
      parameter: "কারিগরি বৈশিষ্ট্যসমূহ",
      value: "স্ট্যান্ডার্ড রেঞ্জ / অপশন",
      rows: [
        { name: "পাওয়ার রেটিং", val: "২০ কেভিএ থেকে ১৫০ কেভিএ (স্ট্যান্ডবাই / প্রাইম)" },
        { name: "ইঞ্জিন ব্র্যান্ড", val: "জেনুইন লোভল ডিজেল ইঞ্জিন (মূলত পারকিন্স ডিজাইনে তৈরি)" },
        { name: "অল্টারনেটর প্রকার", val: "স্ট্যামফোর্ড / লেরয় সোমার / সিকো ব্রাশলেস, IP23, H ইনসুলেশন ক্লাস" },
        { name: "কন্ট্রোল প্যানেল", val: "ডিপ সি ইলেকট্রনিক্স (DSE) অটো স্টার্ট / AMF কন্ট্রোলার" },
        { name: "ভোল্টেজ ও ফেজ", val: "৪০০ ভি / ২৩০ ভি, ৩-ফেজ ৪-তার (অনুরোধে অন্যান্য ভোল্টেজ)" },
        { name: "ফ্রিকোয়েন্সি", val: "৫০ হার্জ (অনুরোধে ৬০ হার্জ উপলব্ধ)" },
        { name: "ক্যানোপি টাইপ", val: "সাউন্ডপ্রুফ ও ওয়েদারপ্রুফ সাইলেন্ট ক্যানোপি (৭ মিটারে ৬৮-৭২ dBA) অথবা ওপেন টাইপ" },
        { name: "গভর্নর টাইপ", val: "যান্ত্রিক / ইলেকট্রনিক গভর্নর (ক্ষমতার ওপর নির্ভর করে)" },
        { name: "স্টার্টার ব্যবস্থা", val: "১২ভি ডিসি স্টার্টার মোটর এবং লিড-এসিড ব্যাটারি" },
        { name: "বেস ট্যাংকের ধারণক্ষমতা", val: "বেস ফ্রেমে তৈরি ৮ থেকে ১২ ঘণ্টা একটানা চলার উপযোগী জ্বালানি ট্যাংক" }
      ]
    },
    accessoriesTitle: "স্ট্যান্ডার্ড এবং অতিরিক্ত আনুষাঙ্গিকসমূহ",
    accessoriesList: [
      "অটোমেটিক পাওয়ার ট্রান্সফারের জন্য অটো ট্রান্সফার সুইচ (ATS) প্যানেল",
      "সাউন্ডপ্রুফ, লকযোগ্য এবং ওয়েদারপ্রুফ সাইলেন্ট ক্যানোপি এনক্লোজার",
      "নমনীয় সংযোগ সহ আবাসিক গ্রেড সাইলেন্সার (মাফলার)",
      "ক্যাবল এবং র্যাক সহ ১২ভি/২৪ভি লিড-এসিড স্টার্টিং ব্যাটারি",
      "স্মার্ট ফ্লোট ব্যাটারি চার্জার",
      "জেনারেটর বেস ফ্রেমে যুক্ত জ্বালানি ট্যাংক",
      "ইঞ্জিন-অল্টারনেটর এবং বেসের মাঝে ভাইব্রেশন প্রতিরোধী রাবার প্যাড",
      "শীতকালীন স্টার্টের জন্য ইঞ্জিন জ্যাকেট ওয়াটার প্রি-হিটার (ঐচ্ছিক)",
      "সহজ মবিল পরিবর্তনের জন্য লুব অয়েল ড্রেন পাম্প",
      "স্ট্যান্ডার্ড টুলকিট এবং ইউজার ম্যানুয়াল বই"
    ],
    qualityTitle: "পরীক্ষা এবং গুণমান নিশ্চিতকরণ",
    qualityText: "প্রতিটি জেনারেটর সেট পাঠানোর আগে আমাদের নিজস্ব লোড ব্যাংকে কঠোরভাবে পরীক্ষা করা হয়। আমরা ২৫%, ৫০%, ৭৫%, ১০০%, এবং ১১০% লোডে প্রতিটি ইউনিটের ভোল্টেজ স্থায়িত্ব, ফ্রিকোয়েন্সি নিয়ন্ত্রণ এবং রেসপন্স ক্ষমতা যাচাই করে নিখুঁত পারফরম্যান্স নিশ্চিত করি।",
    ctaTitle: "একটি নির্ভরযোগ্য স্ট্যান্ডবাই জেনারেটর প্রয়োজন?",
    ctaText: "আপনার সাবস্টেশন বা ভবনের বিদ্যুতের লোড চাহিদা বিবেচনা করে উপযুক্ত লোভল জেনারেটর নির্বাচন করতে আমাদের ইঞ্জিনিয়ারিং দলের সাথে কথা বলুন।",
    ctaBtn: "জেনারেটর কোটেশনের অনুরোধ পাঠান"
  }
};

export default function LovolDieselGeneratorPage() {
  const { language } = useLanguage();
  const activeLang = language === "bn" ? "bn" : "en";
  const t = TRANSLATIONS[activeLang];

  return (
    <div className="bg-[#FAF9F5] font-arone text-black min-h-screen pb-20">
      {/* Dynamic Subpage Page Header */}
      <PageHeader
        title={t.title}
        breadcrumbsTitle={t.breadcrumbs}
        bgImage="/images/generator.webp"
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
                    src="/images/generator.webp"
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
                  <p className="text-[14px] font-bold text-white">ISO 8528 & ISO 9001 Verified</p>
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
                  href="/contact?inquiry=generator"
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
