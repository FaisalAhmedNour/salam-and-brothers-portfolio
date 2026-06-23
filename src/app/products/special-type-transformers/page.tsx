"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import PageHeader from "@/components/widgets/PageHeader";

// Local translations for self-contained component modularity
const TRANSLATIONS = {
  en: {
    title: "Special Type Transformers",
    subtitle: "Custom-Engineered Special Transformers & Reactors (up to 30 MVA)",
    breadcrumbs: "Special Type Transformers",
    overviewTitle: "Product Overview",
    overviewText: "Our special-type transformers represent the peak of custom-engineered power solutions. Designed to handle severe harmonic loads, unbalanced currents, and extreme thermal overloading, these units are tailored for specialized industrial sectors such as steel fabrication, chemical electrolysis, electric railway networks, and large utility-scale solar photovoltaic (PV) generation plants.",
    specBadgeTitle: "Core Parameters",
    specBadgeRating: "Custom (up to 30 MVA)",
    specBadgeVoltage: "Up to 145 kV / 245 kV",
    specBadgeStandard: "IEC 60076 / IEEE C57",
    advantagesTitle: "Key Advantages",
    advantages: [
      {
        title: "Bespoke Phase Shifting",
        desc: "Precision configuration of winding angles (e.g. ±15°, ±7.5° or custom vector shifts) to suppress harmonics in 12, 18, or 24-pulse rectifier operations."
      },
      {
        title: "Enhanced Short-Circuit Strength",
        desc: "Internal clamping elements designed using Finite Element Method (FEM) simulation to counter severe radial and axial stress."
      },
      {
        title: "High Thermal Endurance",
        desc: "Utilizes Nomex insulation paper or synthetic ester fluids, allowing operation at elevated temperature rises during cyclic peak loading."
      },
      {
        title: "Environmental Resilience",
        desc: "Engineered with dust-tight enclosures, specialized cooling systems, and robust finishes for underground mines or offshore environments."
      }
    ],
    portfolioTitle: "Our Specialized Solutions",
    portfolio: [
      {
        name: "Renewable Energy Multi-Winding Transformers",
        desc: "Equipped with dual or triple low-voltage windings to connect multiple central solar inverters to a single medium-voltage grid node."
      },
      {
        name: "Rectifier & Converter Transformers",
        desc: "Designed to supply high-current DC power for aluminium smelting, chemical electrolysis cells, and railway traction lines."
      },
      {
        name: "Earthing / Grounding Transformers (ZNyn)",
        desc: "Creates an artificial neutral ground point in ungrounded delta-connected medium-voltage electrical subgrids."
      },
      {
        name: "Arc & Induction Furnace Transformers",
        desc: "Built to withstand severe cyclic overloading, current surges, and high mechanical vibration levels in foundry plants."
      },
      {
        name: "Auto-transformers & Shunt Reactors",
        desc: "Cost-efficient voltage matching links and inductive compensation solutions to manage long-line capacitive voltage rises."
      }
    ],
    technicalDataTitle: "Custom Specification Context",
    specsTable: {
      parameter: "Special Application Profile",
      value: "Typical Technical Option",
      rows: [
        { name: "Applicable Power Range", val: "100 kVA up to 30 MVA" },
        { name: "Voltage Configurations", val: "Up to 145 kV / 245 kV primary classes" },
        { name: "Winding Vector Groups", val: "ZNyn11, Ii0, Dd0y1, Dd0d6, Dy11y11 (custom multi-winding schemes)" },
        { name: "Harmonics Capacity", val: "Configured up to K-factor 20+ to withstand non-linear converter currents" },
        { name: "Cooling Methods", val: "ONAN, ONAF, OFAF, ODAF, or Water-cooled (OFWF / WF)" },
        { name: "Tapping Regulation", val: "OCTC or OLTC with extended tap steps up to 17 or 23 positions" },
        { name: "Core Structure Type", val: "Step-lap stacked high-grade CRGO sheet steel core with rigid glass-fiber bands" },
        { name: "Applicable Standard guidelines", val: "IEC 60076-1 through 60076-6, IEEE C57.18.10 (rectifier class)" }
      ]
    },
    accessoriesTitle: "Standard & Optional Accessories",
    accessoriesList: [
      "On-Load Tap Changer (OLTC) with drive cubicle or Off-Circuit Tap Changer (OCTC)",
      "Double-float Buchholz Relay for gas surge protection",
      "Oil and Winding Temperature Indicators (OTI/WTI) with remote PT100/RTD links",
      "Magnetic Oil Level Gauge (MOLG) with auxiliary alarm contacts",
      "Integrated current transformers (BCT) inside bushings for differential protection relays",
      "Sudden Pressure Relay (SPR) for fast internal fault isolation",
      "Pressure Relief Valve (PRV) with electrical switch microcontacts",
      "Dehydrating Silica Gel Breather",
      "Neutral Grounding Bushing links",
      "Anti-vibration pads and bi-directional rollers"
    ],
    qualityTitle: "Testing & Quality Verification",
    qualityText: "Special type transformers require meticulous testing. Alongside standard routine electrical measurements, we perform specialized verification procedures as required by the application. These include: zero-sequence impedance measurement, harmonics validation, magnetic balance check on multi-windings, insulation tangent delta, and partial discharge level testing to confirm structural integrity.",
    ctaTitle: "Need a custom-engineered special transformer?",
    ctaText: "Provide your electrical configuration, harmonic load spectrum, and space envelope. Our specialist engineering team will design the ideal system.",
    ctaBtn: "Submit Custom Specs Inquiry"
  },
  bn: {
    title: "স্পেশাল টাইপ ট্রান্সফরমার",
    subtitle: "কাস্টম-ইঞ্জিনিয়ার্ড বিশেষ ট্রান্সফরমার ও রিঅ্যাক্টরসমূহ (৩০ এমভিএ পর্যন্ত)",
    breadcrumbs: "স্পেশাল টাইপ ট্রান্সফরমার",
    overviewTitle: "পণ্য পরিচিতি",
    overviewText: "আমাদের স্পেশাল-টাইপ ট্রান্সফরমারসমূহ কাস্টম-ইঞ্জিনিয়ার্ড পাওয়ার সলিউশনের এক অনন্য নিদর্শন। অতিরিক্ত হারমোনিক লোড, ভারসাম্যহীন বিদ্যুৎ প্রবাহ এবং তীব্র তাপীয় ওভারলোড নিয়ন্ত্রণে সক্ষম এই বিশেষ ইউনিটগুলো মূলত ধাতব গলন শিল্প (ইস্পাত কারখানা), রাসায়নিক ইলেক্ট্রোলাইসিস প্ল্যান্ট, বৈদ্যুতিক রেলওয়ে নেটওয়ার্ক এবং বৃহৎ সোলার ফোটোভোলটাইক (PV) বিদ্যুৎ প্রকল্পে ব্যবহৃত হয়।",
    specBadgeTitle: "মূল প্যারামিটার",
    specBadgeRating: "কাস্টম (৩০ এমভিএ পর্যন্ত)",
    specBadgeVoltage: "১৪৫ কেভি / ২৪৫ কেভি পর্যন্ত",
    specBadgeStandard: "IEC 60076 / IEEE C57",
    advantagesTitle: "প্রধান সুবিধাসমূহ",
    advantages: [
      {
        title: "কাস্টম ফেজ শিফটিং",
        desc: "১২, ১৮ বা ২৪-পালস রেকটিফায়ার অপারেশনের হারমোনিক্স কমাতে কয়েলের নিখুঁত কোণ শিফট (যেমন ±১৫°, ±৭.৫°) কনফিগার করা হয়।"
      },
      {
        title: "অতিরিক্ত যান্ত্রিক সহনশীলতা",
        desc: "অতিরিক্ত রেডিয়াল ও অ্যাক্সিয়াল মেকানিক্যাল শক প্রতিরোধে ফিনিট এলিমেন্ট মেথড (FEM) সিমুলেশনের সাহায্যে অভ্যন্তরীণ ফ্রেম ক্ল্যাম্প করা হয়।"
      },
      {
        title: "উচ্চ তাপ সহন ক্ষমতা",
        desc: "নোমেক্স (Nomex) ইনসুলেশন পেপার বা কৃত্রিম এস্টার তরল ব্যবহারের ফলে অনিয়মিত অতিরিক্ত লোডেও নিরবচ্ছিন্ন কাজ করে।"
      },
      {
        title: "পরিবেশবান্ধব ও অভিযোজনশীল",
        desc: "খনির অভ্যন্তরে বা অফশোর প্ল্যাটফর্মের জন্য ডাস্ট-টাইট ক্যাবিনেট এবং বিশেষ জারা প্রতিরোধী পেইন্টিং সিস্টেম।"
      }
    ],
    portfolioTitle: "আমাদের বিশেষায়িত পণ্যসমূহ",
    portfolio: [
      {
        name: "নবায়নযোগ্য জ্বালানি মাল্টি-উইন্ডিং ট্রান্সফরমার",
        desc: "একাধিক সোলার ইনভার্টারকে একটি একক মিডিয়াম-ভোল্টেজ গ্রিড নোডে যুক্ত করতে এতে ডাবল বা ট্রিপল এলভি উইন্ডিং ব্যবহার করা হয়।"
      },
      {
        name: "রেকটিফায়ার ও কনভার্টার ট্রান্সফরমার",
        desc: "অ্যালুমিনিয়াম স্মেল্টিং, কেমিক্যাল ইলেক্ট্রোলাইসিস এবং রেলওয়ে ট্র্যাকশন লাইনে উচ্চ-প্রবাহের ডিসি বিদ্যুৎ সরবরাহে ব্যবহৃত হয়।"
      },
      {
        name: "আর্থিং / গ্রাউন্ডিং ট্রান্সফরমার (ZNyn)",
        desc: "আন-গ্রাউন্ডেড ডেল্টা সংযোগের মিডিয়াম-ভোল্টেজ সাবগ্রিড সিস্টেমে কৃত্রিম নিউট্রাল আর্থ পয়েন্ট তৈরি করতে এটি ব্যবহৃত হয়।"
      },
      {
        name: "আর্ক ও ইনডাকশন ফার্নেস ট্রান্সফরমার",
        desc: "ধাতু গলানোর কারখানায় চরম লোড ওঠানামা, অতিরিক্ত কারেন্ট এবং যান্ত্রিক কম্পন সহ্য করার মতো মজবুত গঠনে তৈরি।"
      },
      {
        name: "অটো-ট্রান্সফরমার ও শান্ট রিঅ্যাক্টর",
        desc: "ভোল্টেজ সংযোগের সাশ্রয়ী রূপান্তর এবং দীর্ঘ বিদ্যুৎ লাইনের ক্যাপাসিটিভ প্রভাব প্রতিরোধে আবেশীয় ক্ষতিপূরণ প্রদান করে।"
      }
    ],
    technicalDataTitle: "বিশেষ কাস্টমাইজেশন তালিকা",
    specsTable: {
      parameter: "বিশেষ অ্যাপ্লিকেশনের বিবরণ",
      value: "উপলব্ধ কারিগরি বিকল্পসমূহ",
      rows: [
        { name: "পাওয়ার রেটিং পরিসীমা", val: "১০০ কেভিএ থেকে ৩০ এমভিএ পর্যন্ত" },
        { name: "ভোল্টেজ কনফিগারেশন", val: "১৪৫ কেভি / ২৪৫ কেভি প্রাইমারি ভোল্টেজ ক্লাস" },
        { name: "উইন্ডিং ভেক্টর স্কিম", val: "ZNyn11, Ii0, Dd0y1, Dd0d6, Dy11y11 (কাস্টম মাল্টি-উইন্ডিং স্কিমসমূহ)" },
        { name: "হারমোনিকস ধারণ ক্ষমতা", val: "অ-রৈখিক রেকটিফায়ার কারেন্ট সহনশীল করতে K-ফ্যাক্টর ২০+ পর্যন্ত তৈরি" },
        { name: "কুলিং পদ্ধতি", val: "ONAN, ONAF, OFAF, ODAF, অথবা জল দ্বারা শীতলীকরণ (OFWF / WF)" },
        { name: "ট্যাপ রেগুলেশন রেঞ্জ", val: "১৭ বা ২৩ ধাপ বিশিষ্ট এক্সটেন্ডেড অফ-সার্কিট (OCTC) বা অন-লোড ট্যাপ চেঞ্জার (OLTC)" },
        { name: "কোর মেকানিক্যাল স্ট্রাকচার", val: "গ্লাস-ফাইবার ব্যান্ডের সাহায্যে মজবুতভাবে আটকানো স্টেপ-ল্যাপ হাই-গ্রেড CRGO সিলিকন কোর" },
        { name: "প্রযোজ্য আইইসি নির্দেশিকা", val: "IEC 60076-1 থেকে 60076-6 এবং IEEE C57.18.10 (রেকটিফায়ার ক্লাস)" }
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
    qualityTitle: "পরীক্ষা এবং গুণমান যাচাইকরণ",
    qualityText: "বিশেষ ধরণের ট্রান্সফরমারের জন্য অত্যন্ত নিখুঁত পরীক্ষার প্রয়োজন হয়। স্ট্যান্ডার্ড রুটিন বৈদ্যুতিক পরিমাপ ছাড়াও আমরা জিরো-সিকোয়েন্স ইম্পিডেন্স পরিমাপ, হারমোনিকস বিশ্লেষণ, উইন্ডিংগুলোর ম্যাগনেটিক ব্যালেন্স চেক, ইনসুলেশন টান-ডেল্টা এবং আংশিক ডিসচার্জ পরিমাপের মাধ্যমে এর অভ্যন্তরীণ কাঠামোগত অখণ্ডতা যাচাই করি।",
    ctaTitle: "আপনার কি কাস্টম-ইঞ্জিনিয়ার্ড বিশেষ ট্রান্সফরমার প্রয়োজন?",
    ctaText: "আপনার প্রকল্পের বৈদ্যুতিক স্কিম, হারমোনিক লোড স্পেকট্রাম এবং ইনস্টলেশন স্পেস আমাদের জানান। আমাদের বিশেষজ্ঞ দল সবচেয়ে উপযুক্ত সমাধান ডিজাইন করবে।",
    ctaBtn: "কাস্টম প্রয়োজনীয়তা পাঠান"
  }
};

export default function SpecialTypeTransformersPage() {
  const { language } = useLanguage();
  const activeLang = language === "bn" ? "bn" : "en";
  const t = TRANSLATIONS[activeLang];

  return (
    <div className="bg-[#FAF9F5] font-arone text-black min-h-screen pb-20">
      {/* Dynamic Subpage Page Header */}
      <PageHeader
        title={t.title}
        breadcrumbsTitle={t.breadcrumbs}
        bgImage="/images/special-type.png"
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
                    src="/images/special-type.png"
                    alt={t.title}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
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

            </div>
          </div>

          {/* Specialized Solutions Grid */}
          <div className="mb-16">
            <div className="mb-8">
              <h2 className="font-kanit text-[24px] md:text-[30px] font-bold text-neutral-900">
                {t.portfolioTitle}
              </h2>
              <div className="h-1 w-20 bg-brand-red mt-3 rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.portfolio.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-neutral-100 p-6 rounded-2xl hover:shadow-xs hover:border-red-100 transition-all duration-300"
                >
                  <span className="h-10 w-10 shrink-0 rounded-full bg-red-50 text-brand-red grid place-items-center mb-5 font-bold font-kanit">
                    {idx + 1}
                  </span>
                  <h3 className="font-kanit text-[17px] md:text-[18px] font-bold text-neutral-900 leading-snug">
                    {item.name}
                  </h3>
                  <p className="text-[13px] md:text-[13.5px] text-neutral-500 font-medium mt-3 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
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

          {/* Quality check & QA Info row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-16">

            {/* Standard Accessories card */}
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
            <div className="lg:col-span-5 bg-neutral-900 text-white rounded-2xl p-7 md:p-9 shadow-lg relative overflow-hidden flex flex-col justify-between">
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
                  <p className="text-[14px] font-bold text-white">ISO 9001 & IEC 60076-6 Verified</p>
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
                  href="/contact?inquiry=special"
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
