"use client";

import { useLanguage } from "@/context/LanguageContext";

/**
 * Interface representing translation keys required for the Mission, Vision & Values section.
 */
interface MissionVisionValuesTranslations {
  missionVisionValuesTitle: string;
  missionLabel: string;
  visionLabel: string;
  valuesLabel: string;
  missionPoints: string[];
  visionText: string;
  valuesPoints: string[];
}

/**
 * Self-contained translations for the bilingual Mission, Vision & Values showcase.
 */
const TRANSLATIONS: Record<"en" | "bn", MissionVisionValuesTranslations> = {
  en: {
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
    ]
  },
  bn: {
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
    ]
  }
};

/**
 * MissionVisionValues Component.
 * Renders a visually rich, responsive 3-card grid (Mission, Vision, Values)
 * layout overlapping a faded workshop background scene. Supports dual languages (EN/BN).
 *
 * @returns React functional component rendering JSX elements.
 */
export default function MissionVisionValues() {
  const { language } = useLanguage();
  const activeLang = (language === "bn" ? "bn" : "en") as "en" | "bn";
  const t = TRANSLATIONS[activeLang];

  return (
    <section
      className="py-20 px-6 pb-32 relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/turkish-transfomr-maintance-1.jpg')" }}
    >
      {/* Semi-transparent overlay to ensure clarity and bright look */}
      <div className="absolute inset-0 bg-[#FAF9F5]/90 backdrop-blur-[2px] z-0" />

      <div className="relative z-10 mx-auto max-w-310">

        {/* Main Section Header with responsive line break */}
        <div className="text-center mb-">
          <h2 className="font-kanit text-[36px] md:text-[48px] font-semibold text-[#801818] tracking-tight leading-[1.1]">
            {language === "bn" ? (
              <>
                আমাদের মিশন, ভিশন <br className="hidden md:inline" /> <span className="text-[32px] md:text-[40px]">ও মূল্যবোধ</span>
              </>
            ) : (
              <>
                Our Mission, Vision <br className="hidden md:inline" /> <span className="text-[32px] md:text-[40px]">& Values</span>
              </>
            )}
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-14 lg:gap-20 items-end">

          {/* Mission Card */}
          <div className="z-10 relative flex flex-col justify-between bg-[#ec2427] rounded-4xl pt-12 px-4 pb-6 shadow-xl text-center group min-h-125">
            <div className="-mt-18">
              {/* Top Circular Badge */}
              <div className="w-20 h-20 rounded-full border-0 border-white bg-[#ec2427] flex items-center justify-center shadow-lg absolute -top-16 left-1/2 -translate-x-1/2 z-30 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-11 h-11 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a7 7 0 0 0-7 7c0 2.3 1.2 4.3 3 5.4v3.6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3.6c1.8-1.1 3-3.1 3-5.4a7 7 0 0 0-7-7z" />
                  <path d="M9 19h6" />
                  <path d="M10 21h4" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M11.6 6.8 h0.8 l-0.2 4.6 h-0.4 z" fill="currentColor" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="15.2" r="1.2" fill="currentColor" stroke="none" />
                </svg>
              </div>

              {/* Inner White Card */}
              <div className="bg-white rounded-3xl p-3 md:p-4 pt-10 md:pt-16 flex-1 flex flex-col justify-start text-left shadow-sm h-112.5">
                <ul className="space-y-2">
                  {t.missionPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[#1e8d49] text-white mt-1 shadow-sm">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </div>
                      <span className="text-[15px] md:text-[15.5px] leading-relaxed text-neutral-800 font-medium">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Label */}
            <span className="font-kanit text-[28px] font-bold text-white tracking-wider pt-5 block">
              {t.missionLabel}
            </span>

            {/* Speech Bubble Fold Tail */}
            <div className="absolute -bottom-11.25 right-7 w-0 h-0 border-t-45 border-t-[#c6252d] border-r-80 border-r-transparent -z-10 rounded-bl-md" />

            {/* Connection Pointer Arrow to Next Card (Desktop only) */}
            <div className="hidden lg:block absolute -right-8 top-1/2 -translate-y-1/2 z-20">
              <svg className="w-10 h-20 text-[#ec2427] filter" viewBox="0 0 24 48" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 6 L18 24 L4 42" />
              </svg>
            </div>
          </div>

          {/* Vision Card */}
          <div className="relative flex flex-col justify-between bg-[#29944c] rounded-4xl pt-12 px-4 pb-6 shadow-xl text-center group min-h-62.5 lg:translate-y-8">
            <div className="-mt-18">
              {/* Top Circular Badge */}
              <div className="w-20 h-20 rounded-full border-0 border-white bg-[#29944c] flex items-center justify-center shadow-lg absolute -top-16 left-1/2 -translate-x-1/2 z-30 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-11 h-11 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a7 7 0 0 0-7 7c0 2.3 1.2 4.3 3 5.4v3.6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3.6c1.8-1.1 3-3.1 3-5.4a7 7 0 0 0-7-7z" />
                  <path d="M9 19h6" />
                  <path d="M10 21h4" />
                  <path d="M11.6 6.8 h0.8 l-0.2 4.6 h-0.4 z" fill="currentColor" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="15.2" r="1.2" fill="currentColor" stroke="none" />
                </svg>
              </div>

              {/* Inner White Card */}
              <div className="bg-white rounded-3xl p-3 md:p-4 pt-10 md:pt-16 flex-1 flex flex-col justify-center text-center shadow-sm h-50">
                <p className="text-[16px] leading-relaxed text-neutral-800 font-medium">
                  {t.visionText}
                </p>
              </div>
            </div>

            {/* Bottom Label */}
            <span className="font-kanit text-[28px] font-bold text-white tracking-wider pt-5 block">
              {t.visionLabel}
            </span>

            {/* Speech Bubble Fold Tail */}
            <div className="absolute -bottom-11.25 right-7 w-0 h-0 border-t-45 border-t-[#1f7338] border-r-80 border-r-transparent -z-10 rounded-bl-md" />

            {/* Connection Pointer Arrow to Next Card (Desktop only) */}
            <div className="hidden lg:block absolute -right-8 top-1/2 -translate-y-1/2 z-20">
              <svg className="w-10 h-20 text-[#29944c] filter" viewBox="0 0 24 48" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 6 L18 24 L4 42" />
              </svg>
            </div>
          </div>

          {/* Values Card */}
          <div className="relative flex flex-col justify-between bg-[#ec2427] rounded-4xl pt-12 px-4 pb-6 shadow-xl text-center group min-h-125">
            <div className="-mt-18">
              {/* Top Circular Badge (Green to match the image reference) */}
              <div className="w-20 h-20 rounded-full border-0 border-white bg-[#ec2427] flex items-center justify-center shadow-lg absolute -top-16 left-1/2 -translate-x-1/2 z-30 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-11 h-11 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a7 7 0 0 0-7 7c0 2.3 1.2 4.3 3 5.4v3.6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3.6c1.8-1.1 3-3.1 3-5.4a7 7 0 0 0-7-7z" />
                  <path d="M9 19h6" />
                  <path d="M10 21h4" />
                  <path d="M11.6 6.8 h0.8 l-0.2 4.6 h-0.4 z" fill="currentColor" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="15.2" r="1.2" fill="currentColor" stroke="none" />
                </svg>
              </div>

              {/* Inner White Card */}
              <div className="bg-white rounded-3xl p-3 md:p-4 pt-10 md:pt-16 flex-1 flex flex-col justify-start text-left shadow-sm h-112.5">
                <ul className="space-y-2">
                  {t.valuesPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[#1e8d49] text-white mt-1 shadow-sm">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </div>
                      <span className="text-[15px] md:text-[15.5px] leading-relaxed text-neutral-800 font-medium">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Label */}
            <span className="font-kanit text-[28px] font-bold text-white tracking-wider pt-5 block">
              {t.valuesLabel}
            </span>

            {/* Speech Bubble Fold Tail */}
            <div className="absolute -bottom-11.25 right-7 w-0 h-0 border-t-45 border-t-[#c6252d] border-r-80 border-r-transparent -z-10 rounded-bl-md" />

            {/* Connection Pointer Arrow (Desktop only) */}
            <div className="hidden lg:block absolute -right-8 top-1/2 -translate-y-1/2 z-20">
              <svg className="w-10 h-20 text-[#ec2427] filter" viewBox="0 0 24 48" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 6 L18 24 L4 42" />
              </svg>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
