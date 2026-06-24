"use client";

import { useLanguage } from "@/context/LanguageContext";

/**
 * BrandBanner Component.
 * Renders a side-by-side section containing detailed trust copy on the left
 * and a large "Positive Energy / Positive Power" statement banner on the right.
 */
export default function BrandBanner() {
  const { t, language } = useLanguage();

  return (
    <section className="bg-white py-16 px-6 font-arone border-t border-gray-100">
      <div className="mx-auto max-w-310">

        {/* Split grid layout */}
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">

          {/* Left Column: Descriptive Trust Text */}
          <div className="text-[16px] leading-relaxed text-gray-700 space-y-5 border-r-4 border-brand-red pr-8 md:pr-12">
            <p>
              {language === "en" ? (
                <>
                  <strong className="text-brand-red font-bold">SEECO Transformer</strong> is a trusted name in the energy sector, offering high-performance transformer solutions tailored to modern infrastructure needs.
                </>
              ) : (
                <>
                  <strong className="text-brand-red font-bold">সিকো ট্রান্সফরমার</strong> জ্বালানি খাতে একটি বিশ্বস্ত নাম, যা আধুনিক অবকাঠামোর প্রয়োজন অনুসারে উচ্চ-ক্ষমতাসম্পন্ন ট্রান্সফরমার সমাধান সরবরাহ করে।
                </>
              )}
            </p>
            <p>
              {t("brandBanner.leftPara2")}
            </p>
          </div>

          {/* Right Column: Prominent Positive Power Heading Box */}
          <div className="flex flex-col justify-center py-4">

            {/* Title Statement */}
            <span className="font-kanit text-[32px] font-bold text-gray-400 uppercase tracking-widest leading-none">
              {t("brandBanner.rightLabel")}
            </span>

            {/* Large Accent Text */}
            <h2 className="font-kanit mt-2 text-[40px] font-bold leading-none text-neutral-900 md:text-[56px] tracking-tight">
              {t("brandBanner.rightTitle")}
            </h2>

          </div>

        </div>

      </div>
    </section>
  );
}
