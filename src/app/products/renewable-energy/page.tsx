"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import PageHeader from "@/components/widgets/PageHeader";

// Local translations for self-contained component modularity
const TRANSLATIONS = {
  en: {
    title: "Renewable Energy",
    breadcrumbs: "Renewable Energy",
    subtitle: "Custom Substation & Step-Up Transformers for Solar PV & Wind Networks",
    overviewTitle: "Product Overview",
    overviewText: "We provide specialized power distribution systems engineered to handle the unique cyclic loading, high harmonic distortions, and environmental demands of utility-scale solar photovoltaic (PV) parks, wind farms, and battery energy storage systems (BESS). Our product portfolio ranges from multi-winding step-up transformers (connecting multiple central inverters to one medium-voltage terminal) to compact, self-contained pad-mounted substations.",
    specBadgeTitle: "Core Parameters",
    specBadgeRating: "500 kVA - 10 MVA",
    specBadgeVoltage: "Up to 36 kV / 40.5 kV",
    specBadgeStandard: "IEC / IEEE C57 compliant",
    advantagesTitle: "Key Advantages",
    advantages: [
      {
        title: "Multi-Winding Design",
        desc: "Designed with dual or triple low-voltage windings to connect multiple central inverters to the same transformer, preventing interaction loops."
      },
      {
        title: "Harmonic Loading Strength",
        desc: "Engineered with a high K-factor design to handle non-linear currents and prevent structural overheating from high-frequency inverter ripple."
      },
      {
        title: "Ester Liquid Insulation",
        desc: "Supports biodegradable natural or synthetic ester oils to lower fire risks, prevent soil contamination, and increase cooling capacity."
      },
      {
        title: "Compact Pad-Mounted Substation",
        desc: "Integrates HV switchgear, the step-up transformer, and LV breakers in a single compact outdoor steel enclosure."
      }
    ],
    applicationsTitle: "Common Applications",
    applications: [
      "Utility-Scale Solar (PV) Inverter Stations",
      "Onshore & Offshore Wind Power Generating Sites",
      "Battery Energy Storage Systems (BESS) grid-ties",
      "Industrial Microgrid renewable integrations",
      "Eco-sensitive Watershed or Forest Sub-stations"
    ],
    technicalDataTitle: "Technical Specification Data",
    specsTable: {
      parameter: "Technical Parameter",
      value: "Standard Range / Option",
      rows: [
        { name: "Transformer Ratings", val: "500 kVA to 10000 kVA (10 MVA)" },
        { name: "HV Medium Voltage", val: "11 kV, 20 kV, 22 kV, 33 kV, 35 kV, 36 kV, 40.5 kV" },
        { name: "LV Winding Voltages", val: "300 V, 400 V, 480 V, 600 V, 690 V, 800 V (matching inverter specifications)" },
        { name: "Winding Configurations", val: "Dual LV (split-winding) / Triple LV winding options" },
        { name: "Insulation Fluids", val: "Natural Ester (FR3) / Synthetic Ester (Midel 7131) / Mineral Oil" },
        { name: "Cooling Method", val: "KNAN (Ester fluid, natural air) / KNAF / ONAN / ONAF" },
        { name: "Harmonics Capacity", val: "K-factor 4, 9, 13 (or higher to accommodate specific inverter currents)" },
        { name: "Enclosure Type", val: "Corrosion-resistant steel (zinc rich primer), C5 classification, IP54 protection" },
        { name: "Design guidelines", val: "IEC 60076, IEEE C57.159 (Application Guide for Distributed Generation)" }
      ]
    },
    accessoriesTitle: "Standard & Optional Accessories",
    accessoriesList: [
      "High-voltage loop feed / radial feed load-break switches",
      "Elastomeric plug-in screen bushings (elbow connectors) for MV terminations",
      "Double-float Buchholz relay with remote alarms",
      "Sudden pressure relay (SPR) for rapid internal fault clearing",
      "Integrated MV current-limiting fuses and bayonet expulsion fuses",
      "Ester-fluid thermometer and liquid level indicators with microswitch contacts",
      "Pressure vacuum gauge and pressure relief valve (PRV)",
      "Electrostatic shield winding between HV and LV to mitigate high-frequency surge transfer",
      "Stainless steel hardware and anti-vibration damping pads",
      "Integrated low-voltage molded case breakers (MCCB) panel cabinet"
    ],
    qualityTitle: "Testing & Quality Verification",
    qualityText: "Every renewable step-up transformer and pad-mounted station undergoes routine verification in compliance with IEC 60076 / IEEE C57 standards. Special emphasis is placed on checking insulation dielectric strength, verification of the harmonic load capacity, checking moisture levels in natural/synthetic ester fluids, and sealing checks under pressure to guarantee maintenance-free operation.",
    ctaTitle: "Designing a solar PV or wind grid connection?",
    ctaText: "Consult with our renewable energy engineering specialists to design a high-efficiency step-up transformer or pad-mounted substation.",
    ctaBtn: "Inquire Renewable Solution"
  },
  bn: {
    title: "নবায়নযোগ্য শক্তি",
    breadcrumbs: "নবায়নযোগ্য শক্তি",
    subtitle: "সোলার পিভি এবং উইন্ড গ্রিড সংযোগের জন্য কাস্টম সাবস্টেশন ও স্টেপ-আপ ট্রান্সফরমার",
    overviewTitle: "পণ্য পরিচিতি",
    overviewText: "আমরা সৌর বিদ্যুৎ কেন্দ্র (PV), উইন্ড ফার্ম এবং ব্যাটারি এনার্জি স্টোরেজ সিস্টেমের (BESS) অনিয়মিত থার্মাল সাইকেল, উচ্চ হারমোনিকস এবং প্রতিকূল পরিবেশগত পরিস্থিতি বিবেচনা করে বিশেষ ধরণের বিদ্যুৎ বিতরণ ও রূপান্তর ব্যবস্থা তৈরি করি। আমাদের নবায়নযোগ্য শক্তির পণ্যের তালিকায় রয়েছে মাল্টি-উইন্ডিং স্টেপ-আপ ট্রান্সফরমার (যা একাধিক সোলার ইনভার্টারকে একটি একক মিডিয়াম-ভোল্টেজ গ্রিড লাইনে যুক্ত করে) এবং সম্পূর্ণ সুরক্ষিত কাস্টমাইজড প্যাড-মাউন্টেড আউটডোর সাবস্টেশনসমূহ।",
    specBadgeTitle: "মূল প্যারামিটার",
    specBadgeRating: "৫০০ কেভিএ - ১০ এমভিএ",
    specBadgeVoltage: "৩৬ কেভি / ৪০.৫ কেভি পর্যন্ত",
    specBadgeStandard: "IEC / IEEE C57 কমপ্লায়েন্ট",
    advantagesTitle: "প্রধান সুবিধাসমূহ",
    advantages: [
      {
        title: "মাল্টি-উইন্ডিং ডিজাইন",
        desc: "একাধিক সেন্ট্রাল ইনভার্টারকে একই ট্রান্সফরমারের সাথে যুক্ত করতে এতে ডাবল বা ট্রিপল এলভি উইন্ডিং ব্যবহার করা হয়, যা ফেইজ ইন্টারঅ্যাকশন প্রতিরোধ করে।"
      },
      {
        title: "হারমোনিকস প্রতিরোধ ক্ষমতা",
        desc: "উচ্চ K-ফ্যাক্টর ডিজাইনে তৈরি করায় এটি ইনভার্টারের উচ্চ-ফ্রিকোয়েন্সি রিফল এবং নন-লিনিয়ার কারেন্টেও গরম না হয়ে নিরবচ্ছিন্ন কাজ করে।"
      },
      {
        title: "পরিবেশবান্ধব এস্টার তরল",
        desc: "বায়োডিগ্রেডেবল প্রাকৃতিক বা কৃত্রিম এস্টার তেল ব্যবহার করা হয়, যা অগ্নিকাণ্ডের ঝুঁকি কমায় এবং মাটি ও পানি দূষণ রোধ করে।"
      },
      {
        title: "প্যাড-মাউন্টেড সাবস্টেশন",
        desc: "একই আউটডোর মেটাল শিট কেবিনেটের ভেতরে এইচভি সুইচগিয়ার, স্টেপ-আপ ট্রান্সফরমার এবং এলভি ব্রেকার প্যানেল একত্রিত করা থাকে।"
      }
    ],
    applicationsTitle: "ব্যবহারের ক্ষেত্রসমূহ",
    applications: [
      "জাতীয় গ্রিডে সৌর বিদ্যুৎ (PV) প্রকল্পের সংযোগ",
      "অনশোর এবং অফশোর উইন্ড পাওয়ার উৎপাদন কেন্দ্রসমূহ",
      "ব্যাটারি এনার্জি স্টোরেজ সিস্টেম (BESS) গ্রিড-টাই সংযোগ",
      "পরিবেশগতভাবে সংবেদনশীল বন বা জলাশয় সাবস্টেশনসমূহ",
      "রিনিউয়েবল মাইক্রোগ্রিল সাব-ডিস্ট্রিবিউশন হাব"
    ],
    technicalDataTitle: "কারিগরি তথ্য তালিকা",
    specsTable: {
      parameter: "কারিগরি বৈশিষ্ট্যসমূহ",
      value: "স্ট্যান্ডার্ড রেঞ্জ / অপশন",
      rows: [
        { name: "পাওয়ার রেটিং পরিসীমা", val: "৫০০ কেভিএ থেকে ১০০০০ কেভিএ (১০ এমভিএ)" },
        { name: "এইচভি মিডিয়াম ভোল্টেজ", val: "১১ কেভি, ২০ কেভি, ২২ কেভি, ৩৩ কেভি, ৩৫ কেভি, ৩৬ কেভি, ৪০.৫ কেভি" },
        { name: "এলভি উইন্ডিং ভোল্টেজ", val: "৩০০ ভি, ৪০০ ভি, ৪৮০ ভি, ৬০০ ভি, ৬৯০ ভি, ৮০০ ভি (ইনভার্টার স্পেসিফিকেশন অনুযায়ী)" },
        { name: "উইন্ডিং কনফিগারেশন", val: "ডাবল এলভি (স্প্লিট-উইন্ডিং) / ট্রিপল এলভি উইন্ডিং অপশন" },
        { name: "ইনসুলেটিং মিডিয়াম", val: "ন্যাচারাল এস্টার (FR3) / সিন্থেটিক এস্টার (Midel 7131) / মিনারেল অয়েল" },
        { name: "কুলিং পদ্ধতি", val: "KNAN (এস্টার তেল, প্রাকৃতিক বাতাস) / KNAF / ONAN / ONAF" },
        { name: "হারমোনিকস সহনশীলতা", val: "K-ফ্যাক্টর ৪, ৯, ১৩ (নন-লিনিয়ার কারেন্ট প্রতিরোধে বিশেষভাবে উপযোগী)" },
        { name: "এনক্লোজার প্রকার", val: "জিংক সমৃদ্ধ কোটিং সহ মরিচারোধী মেটাল শিট, C5 ক্লাস, IP54 প্রটেকশন" },
        { name: "ডিজাইন স্ট্যান্ডার্ড", val: "IEC 60076, IEEE C57.159 ( distributed generation গাইডলাইন)" }
      ]
    },
    accessoriesTitle: "স্ট্যান্ডার্ড এবং অতিরিক্ত আনুষাঙ্গিকসমূহ",
    accessoriesList: [
      "উচ্চ-ভোল্টেজ লুপ ফিড / রেডিয়াল ফিড লোড-ব্রেক সুইচ",
      "এমভি কানেকশনের জন্য স্ক্রিনড এলবো কানেক্টর বুশিং",
      "রিমোট অ্যালার্ম সহ ডাবল-ফ্লোট বুকহোলজ রিলে",
      "সাডেন প্রেসার রিলে (SPR) অভ্যন্তরীণ ফল্ট নিরসনে",
      "ইন্টিগ্রেটেড কারেন্ট লিমিটিং ফিউজ এবং এক্সপালশন ফিউজ",
      "তেল পরিমাপক থার্মোমিটার ও তরল লেভেল গেজ (মাইক্রো-সুইচ সহ)",
      "প্রেসার ভ্যাকুয়াম গেজ এবং প্রেসার রিলিফ ভালভ (PRV)",
      "উচ্চ ফ্রিকোয়েন্সি ভোল্টেজ ঢেউ এড়াতে এইচভি এবং এলভি-এর মধ্যে ইলেক্ট্রোস্ট্যাটিক শিল্ড উইন্ডিং",
      "মরিচারোধী স্টেইনলেস স্টিল বোল্ট এবং অ্যান্টি-ভাইব্রেশন প্যাড",
      "এলভি সাইডের জন্য লো-ভোল্টেজ এমসিসিবি ব্রেকার প্যানেল ক্যাবিনেট"
    ],
    qualityTitle: "পরীক্ষা এবং গুণমান নিশ্চিতকরণ",
    qualityText: "প্রতিটি রিনিউয়েবল স্টেপ-আপ ট্রান্সফরমার এবং প্যাড-মাউন্টেড সাবস্টেশন IEC 60076 / IEEE C57 স্ট্যান্ডার্ড অনুসারে রুটিন টেস্টের মধ্য দিয়ে যায়। এর মধ্যে বিশেষ জোর দেওয়া হয়: উইন্ডিং ইনসুলেশন ডাই-ইলেকট্রিক ক্ষমতা, হারমোনিক লোড সামর্থ্য যাচাইকরণ, এস্টার তেলের আর্দ্রতা পরীক্ষা এবং চাপ সহ্য করার ক্ষমতা যাচাই।",
    ctaTitle: "সোলার পিভি বা উইন্ড গ্রিড সাবস্টেশন ডিজাইন করছেন?",
    ctaText: "আপনার গ্রিডের নকশা, ইনভার্টার সংখ্যা এবং ইনস্টলেশন শর্ত আমাদের জানান। আমাদের নবায়নযোগ্য জ্বালানি ইঞ্জিনিয়ার দল একটি উপযুক্ত সমাধান প্রস্তাব করবে।",
    ctaBtn: "রিনিউয়েবল সলিউশন কোটেশন পাঠান"
  }
};

export default function RenewableEnergyPage() {
  const { language } = useLanguage();
  const activeLang = language === "bn" ? "bn" : "en";
  const t = TRANSLATIONS[activeLang];

  return (
    <div className="bg-[#FAF9F5] font-arone text-black min-h-screen pb-20">
      {/* Dynamic Subpage Page Header */}
      <PageHeader
        title={t.title}
        breadcrumbsTitle={t.breadcrumbs}
        bgImage="/images/pad-mounted-step-up-transformer-solar-pv-site-1600.webp"
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
                    src="/images/pad-mounted-step-up-transformer-solar-pv-site-1600.webp"
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
                  <p className="text-[14px] font-bold text-white">ISO 9001 & IEEE C57 Verified</p>
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
                  href="/contact?inquiry=renewable"
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
