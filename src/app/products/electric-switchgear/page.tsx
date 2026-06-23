"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import PageHeader from "@/components/widgets/PageHeader";

// Local translations for self-contained component modularity
const TRANSLATIONS = {
  en: {
    title: "Electric Switchgear",
    breadcrumbs: "Electric Switchgear",
    subtitle: "High & Low Voltage Switchgear Panels (HT & LT Panels)",
    overviewTitle: "Product Overview",
    overviewText: "Our custom-engineered switchgear solutions are designed to regulate, protect, and distribute electrical power across industrial facilities, national grids, and high-rise commercial buildings. Compliant with standard IEC 61439-1 & 2 guidelines for low voltage panels and IEC 62271-200 for medium voltage, our assemblies incorporate circuit breakers, busbars, and monitoring meters from leading manufacturers to ensure operator safety and grid stability.",
    specBadgeTitle: "Core Parameters",
    specBadgeRating: "Up to 6300 A",
    specBadgeVoltage: "LV & MV (up to 33 kV)",
    specBadgeStandard: "IEC 61439 / IEC 62271",
    advantagesTitle: "Key Advantages",
    advantages: [
      {
        title: "Operator Safety First",
        desc: "Designed with internal arc containment configurations, mechanical interlocks, and segregated compartments to protect staff."
      },
      {
        title: "High-Conductivity Copper Busbars",
        desc: "Utilizes 99.9% pure tin-plated electrolytic copper busbars, optimized to prevent excessive heat buildup."
      },
      {
        title: "Premium Components",
        desc: "Assembled with top-tier vacuum circuit breakers (VCB), air circuit breakers (ACB), and molded case breakers (MCCB) from ABB, Schneider, or Siemens."
      },
      {
        title: "Intelligent Power Factor Improvement",
        desc: "Our integrated PFI panels automatically control capacitor banks to boost power factor values, cutting utility penalties."
      }
    ],
    applicationsTitle: "Common Applications",
    applications: [
      "Industrial Plants, Factories, & Processing Hubs",
      "National Grid Sub-stations & Power Plant Feeder bays",
      "Large Commercial Sub-distribution Systems",
      "High-rise Residential & Corporate Complexes",
      "Power Factor Correction (PFI) Plants"
    ],
    technicalDataTitle: "Technical Specification Data",
    specsTable: {
      parameter: "Technical Parameter",
      value: "Standard Range / Option",
      rows: [
        { name: "Switchboard Types", val: "High Tension (HT) Panels, Low Tension (LT) Panels, PFI Plants, Motor Control Centers (MCC)" },
        { name: "Rated Voltage Class", val: "LV (415 V / 690 V), MV/HT (11 kV, 22 kV, 33 kV)" },
        { name: "Rated Current Capacity", val: "Up to 6300 A (LT Panels) / Up to 1250 A (HT Panels)" },
        { name: "Short-time Withstand Current", val: "Up to 50 kA / 1 sec (LT) / Up to 25 kA / 3 sec (HT)" },
        { name: "Busbar System", val: "Electrolytic Copper, Tin-plated, color-coded per phase standards" },
        { name: "Enclosure Protection class", val: "IP31, IP42, IP54, IP65 (indoor or outdoor sheet steel panels)" },
        { name: "Metal Thickness", val: "1.5 mm to 2.0 mm electro-galvanized sheet steel with powder-coated finish" },
        { name: "PFI Capacitor bank types", val: "Dry-type heavy-duty capacitors with detuned reactors to block harmonics" },
        { name: "Standard Conformity guidelines", val: "IEC 61439-1/2 (LV), IEC 62271-200 (HT), IEC 60831 (Capacitors)" }
      ]
    },
    accessoriesTitle: "Standard & Optional Accessories",
    accessoriesList: [
      "Vacuum Circuit Breaker (VCB) or SF6 Circuit Breaker for HT panels",
      "Air Circuit Breaker (ACB) with micro-processor trip unit for LT main panels",
      "Molded Case Circuit Breaker (MCCB) and Miniature Circuit Breakers (MCB)",
      "Automatic Power Factor Correction (APFC) micro-controller relay",
      "Detuned Harmonic Filter Reactors for PFI panels",
      "Digital multi-function power meters (voltage, current, power, harmonics)",
      "Protection Relays (Overcurrent, Earth Fault, Under/Over Voltage)",
      "Current Transformers (CT) and Potential Transformers (PT)",
      "Panel cooling exhaust fans with ventilation filters and thermostats",
      "Anti-condensation space heaters with humidistat controllers"
    ],
    qualityTitle: "Testing & Quality Verification",
    qualityText: "Every switchgear panel undergoes strict routine checks in accordance with IEC standards. These include: dielectric high-voltage power-frequency checks, insulation resistance verification (Megger), primary and secondary current injection tests to verify relay operations, control wiring scheme testing, and busbar torque tightness checks before release.",
    ctaTitle: "Need custom switchgear or a PFI plant?",
    ctaText: "Send us your single line diagram (SLD), load parameters, and structural limitations. Our panel division will engineer a premium solution.",
    ctaBtn: "Inquire Switchgear Quote"
  },
  bn: {
    title: "বৈদ্যুতিক সুইচগিয়ার",
    breadcrumbs: "বৈদ্যুতিক সুইচগিয়ার",
    subtitle: "উচ্চ ও নিম্ন ভোল্টেজ সুইচগিয়ার প্যানেল (HT ও LT প্যানেল)",
    overviewTitle: "পণ্য পরিচিতি",
    overviewText: "আমাদের কাস্টম-ইঞ্জিনিয়ার্ড সুইচগিয়ার সমাধানসমূহ শিল্পকারখানা, জাতীয় বিদ্যুৎ গ্রিড এবং বহুতল বাণিজ্যিক ভবনে বিদ্যুৎ নিয়ন্ত্রণ, সুরক্ষা ও বিতরণের জন্য ডিজাইন করা হয়েছে। নিম্ন ভোল্টেজ প্যানেলের জন্য আইইসি ৬১৪৩৯-১ ও ২ এবং মাঝারি ভোল্টেজের জন্য আইইসি ৬২২৭১-২০০ স্ট্যান্ডার্ড মেনে তৈরি আমাদের সুইচবোর্ডগুলোতে বিশ্বের নামকরা ব্র্যান্ডের সার্কিট ব্রেকার ও বাসবার ব্যবহার করা হয়, যা সর্বোচ্চ অপারেটর নিরাপত্তা এবং গ্রিডের স্থায়িত্ব নিশ্চিত করে।",
    specBadgeTitle: "মূল প্যারামিটার",
    specBadgeRating: "৬৩০০ এ পর্যন্ত",
    specBadgeVoltage: "এলভি ও এমভি (৩৩ কেভি পর্যন্ত)",
    specBadgeStandard: "IEC 61439 / IEC 62271",
    advantagesTitle: "প্রধান সুবিধাসমূহ",
    advantages: [
      {
        title: "অপারেটরের সর্বোচ্চ নিরাপত্তা",
        desc: "কর্মীদের সুরক্ষায় এতে অভ্যন্তরীণ আর্ক নিয়ন্ত্রণ, মেকানিক্যাল ইন্টারলকিং এবং আলাদা কম্পার্টমেন্ট ডিজাইন ব্যবহার করা হয়েছে।"
      },
      {
        title: "উচ্চ পরিবাহী কপার বাসবার",
        desc: "৯৯.৯% খাঁটি টিন-প্লেটেড ইলেকট্রোলাইটিক কপার বাসবার ব্যবহার করা হয়, যা অতিরিক্ত উত্তাপ সৃষ্টি প্রতিরোধ করে।"
      },
      {
        title: "উন্নত মানের কম্পোনেন্ট",
        desc: "এতে এবিবি (ABB), স্নাইডার (Schneider) অথবা সিমেন্স (Siemens)-এর উন্নত ভ্যাকুয়াম সার্কিট ব্রেকার (VCB), এয়ার সার্কিট ব্রেকার (ACB) এবং এমসিসিবি (MCCB) ব্যবহার করা হয়।"
      },
      {
        title: "স্বয়ংক্রিয় পাওয়ার ফ্যাক্টর উন্নয়ন",
        desc: "আমাদের পিএফআই (PFI) প্যানেলগুলো স্বয়ংক্রিয়ভাবে ক্যাপাসিটর ব্যাংক নিয়ন্ত্রণ করে পাওয়ার ফ্যাক্টর উন্নত করে, যা বিদ্যুৎ বিল কমায়।"
      }
    ],
    applicationsTitle: "ব্যবহারের ক্ষেত্রসমূহ",
    applications: [
      "শিল্পকারখানা, ফ্যাক্টরি ও প্রোডাকশন প্ল্যান্টসমূহ",
      "জাতীয় গ্রিড সাবস্টেশন ও বিদ্যুৎ উৎপাদন কেন্দ্রসমূহ",
      "বৃহৎ বাণিজ্যিক ও বহুতল ভবনের বিদ্যুৎ বিতরণ ব্যবস্থা",
      "পাওয়ার ফ্যাক্টর সংশোধনের জন্য পিএফআই (PFI) প্ল্যান্ট",
      "মোটর নিয়ন্ত্রণের জন্য মোটর কন্ট্রোল সেন্টার (MCC) প্যানেল"
    ],
    technicalDataTitle: "কারিগরি তথ্য তালিকা",
    specsTable: {
      parameter: "কারিগরি বৈশিষ্ট্যসমূহ",
      value: "স্ট্যান্ডার্ড রেঞ্জ / অপশন",
      rows: [
        { name: "সুইচবোর্ডের প্রকারভেদ", val: "হাই টেনশন (HT) প্যানেল, লো টেনশন (LT) প্যানেল, পিএফআই প্ল্যান্ট, মোটর কন্ট্রোল সেন্টার (MCC)" },
        { name: "ভোল্টেজ ক্লাস", val: "নিম্ন ভোল্টেজ (৪১৫ ভি / ৬৯০ ভি), মাঝারি ভোল্টেজ/HT (১১ কেভি, ২২ কেভি, ৩৩ কেভি)" },
        { name: "কারেন্ট বহন ক্ষমতা", val: "৬৩০০ এ পর্যন্ত (LT প্যানেল) / ১২৫০ এ পর্যন্ত (HT প্যানেল)" },
        { name: "শর্ট-সার্কিট সহন ক্ষমতা", val: "৫০ কেএ / ১ সেকেন্ড পর্যন্ত (LT) / ২৫ কেএ / ৩ সেকেন্ড পর্যন্ত (HT)" },
        { name: "বাসবার সিস্টেম", val: "ইলেকট্রোলাইটিক কপার, টিন-প্লেটেড, ফেইজ স্ট্যান্ডার্ড কালার কোডেড" },
        { name: "এনক্লোজার প্রটেকশন", val: "IP31, IP42, IP54, IP65 (ইনডোর/আউটডোর ব্যবহারের উপযুক্ত মেটাল শিট)" },
        { name: "শিটের পুরুত্ব", val: "১.৫ মিমি থেকে ২.০ মিমি ইলেক্ট্রো-গ্যালভানাইজড শিট, পাউডার কোটিং ফিনিশ সহ" },
        { name: "পিএফআই ক্যাপাসিটর ব্যাংক", val: "হারমোনিক ফিল্টার সহ হেভি-ডিউটি ড্রাই-টাইপ ক্যাপাসিটর" },
        { name: "মানসমূহ", val: "IEC 61439-1/2 (LV), IEC 62271-200 (HT), IEC 60831 (Capacitors)" }
      ]
    },
    accessoriesTitle: "স্ট্যান্ডার্ড এবং অতিরিক্ত আনুষাঙ্গিকসমূহ",
    accessoriesList: [
      "HT প্যানেলের জন্য ভ্যাকুয়াম সার্কিট ব্রেকার (VCB) অথবা SF6 ব্রেকার",
      "LT প্যানেলের জন্য মাইক্রো-প্রসেসর ট্রিপ ইউনিট সহ এয়ার সার্কিট ব্রেকার (ACB)",
      "মোল্ডেড কেস সার্কিট ব্রেকার (MCCB) এবং মিনিয়েচার সার্কিট ব্রেকার (MCB)",
      "স্বয়ংক্রিয় পিএফআই নিয়ন্ত্রণের জন্য এপিএফসি (APFC) রিলে",
      "হারমোনিক্স দূর করতে ডিটিউনড রিয়্যাক্টর",
      "ডিজিটাল মাল্টি-ফাংশন পাওয়ার মিটার (ভোল্টেজ, কারেন্ট, হারমোনিকস মাপার জন্য)",
      "ওভারকারেন্ট, আর্থ ফল্ট ও আন্ডার/ওভার ভোল্টেজ প্রটেকশন রিলে",
      "কারেন্ট ট্রান্সফরমার (CT) এবং পটেনশিয়াল ট্রান্সফরমার (PT)",
      "থার্মোস্ট্যাট সহ প্যানেল কুলিং ফ্যান এবং ভেন্টিলেশন ফিল্টার",
      "আর্দ্রতা নিয়ন্ত্রক স্পেস হিটার"
    ],
    qualityTitle: "পরীক্ষা এবং গুণমান যাচাইকরণ",
    qualityText: "প্রতিটি সুইচগিয়ার প্যানেল সরবরাহ করার আগে কঠোরভাবে পরীক্ষা করা হয়। এর মধ্যে রয়েছে: হাই-ভোল্টেজ পাওয়ার ফ্রিকোয়েন্সি ডাই-ইলেকট্রিক টেস্ট, ইনসুলেশন রেজিস্ট্যান্স (মেগার), রিলে ট্রিপ যাচাইকরণের জন্য প্রাইমারি ও সেকেন্ডারি কারেন্ট ইনজেকশন টেস্ট, এবং বাসবার কানেকশন টাইটনেস চেক।",
    ctaTitle: "কাস্টম সুইচগিয়ার বা পিএফআই প্যানেল প্রয়োজন?",
    ctaText: "আপনার সাবস্টেশনের সিঙ্গেল লাইন ডায়াগ্রাম (SLD), লোড প্রোফাইল এবং মেটাল শিটের সাইজ আমাদের জানান। আমাদের ইঞ্জিনিয়ারিং দল সেরা সুইচবোর্ড তৈরি করবে।",
    ctaBtn: "সুইচগিয়ার কোটেশনের অনুরোধ পাঠান"
  }
};

export default function ElectricSwitchgearPage() {
  const { language } = useLanguage();
  const activeLang = language === "bn" ? "bn" : "en";
  const t = TRANSLATIONS[activeLang];

  return (
    <div className="bg-[#FAF9F5] font-arone text-black min-h-screen pb-20">
      {/* Dynamic Subpage Page Header */}
      <PageHeader
        title={t.title}
        breadcrumbsTitle={t.breadcrumbs}
        bgImage="/images/switch_giar.webp"
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
                    src="/images/switch_giar.webp"
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
                      <span className="text-[12px] font-bold text-neutral-400 uppercase">{activeLang === "bn" ? "কারেন্ট ক্লাস" : "Rated Current"}</span>
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
                  <p className="text-[14px] font-bold text-white">IEC 61439 & Type-Test Certified</p>
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
                  href="/contact?inquiry=switchgear"
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
