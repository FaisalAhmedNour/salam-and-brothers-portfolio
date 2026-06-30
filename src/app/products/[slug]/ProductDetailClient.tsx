"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { ProductItem } from "@/lib/products";
import PageHeader from "@/components/widgets/PageHeader";

interface ProductDetailClientProps {
  product: ProductItem | null;
  slug: string;
}

export default function ProductDetailClient({ product, slug }: ProductDetailClientProps) {
  const { language } = useLanguage();
  const activeLang = (language === "bn" ? "bn" : "en") as "en" | "bn";

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FAF9F5] flex flex-col items-center justify-center text-center p-6 select-none font-arone">
        <h2 className="font-kanit text-[28px] font-bold text-neutral-900">Product Not Found</h2>
        <p className="text-neutral-500 mt-2 max-w-sm">The product page you are looking for does not exist or has been removed.</p>
        <Link href="/products" className="mt-6 bg-brand-red hover:bg-brand-red-hover text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md">
          Back to Products
        </Link>
      </div>
    );
  }

  const title = product.title[activeLang] || "";
  const subtitle = product.subtitle[activeLang] || "";
  const overviewText = product.overview[activeLang] || "";
  const specBadgeRating = product.specs.rating[activeLang] || "";
  const specBadgeVoltage = product.specs.voltage[activeLang] || "";
  const specBadgeStandard = product.specs.standard[activeLang] || "";
  
  const advantagesList = product.advantages?.[activeLang] || [];
  const applicationsList = product.applications?.[activeLang] || [];
  const specsTableRows = product.specsTable?.[activeLang] || [];
  const accessoriesList = product.accessories?.[activeLang] || [];
  const qualityText = product.qualityText?.[activeLang] || "";
  const ctaTitle = product.ctaTitle?.[activeLang] || "";
  const ctaText = product.ctaText?.[activeLang] || "";
  const ctaBtn = product.ctaBtn?.[activeLang] || "";

  return (
    <div className="bg-[#FAF9F5] font-arone text-black min-h-screen pb-20">
      <PageHeader
        title={title}
        breadcrumbsTitle={title}
        bgImage="/images/power-transformer.png"
      />

      <section className="py-12 px-6">
        <div className="mx-auto max-w-310">

          {/* Main Top Intro Block */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">

            {/* Left side: Detailed overview */}
            <div className="lg:col-span-7 space-y-6">
              {subtitle && (
                <span className="text-[12.5px] font-bold text-brand-red uppercase tracking-widest bg-red-50 px-3.5 py-1.5 rounded-full border border-red-100">
                  {subtitle}
                </span>
              )}
              <h2 className="font-kanit text-[28px] md:text-[36px] font-bold text-neutral-900 leading-tight pt-3">
                {activeLang === "bn" ? "পণ্য পরিচিতি" : "Product Overview"}
              </h2>
              {overviewText && (
                <p className="text-[15.5px] leading-relaxed text-neutral-600 font-medium">
                  {overviewText}
                </p>
              )}

              {/* Product Visual Image Showcase */}
              <div className="relative aspect-video w-full overflow-hidden bg-white border border-neutral-200 shadow-sm rounded-2xl p-2 group hover:shadow-md transition-shadow duration-300">
                <div className="relative w-full h-full overflow-hidden rounded-xl bg-neutral-100">
                  <Image
                    src={product.imagePath || "/images/power-transformer.png"}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>

              {/* Grid of Key Advantages */}
              {advantagesList.length > 0 && (
                <div className="mt-8">
                  <h3 className="font-kanit text-[20px] font-bold text-neutral-900 mb-6">
                    {activeLang === "bn" ? "প্রধান সুবিধাসমূহ" : "Key Advantages"}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {advantagesList.map((adv, idx) => (
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
              )}
            </div>

            {/* Right side: Parameters and Applications */}
            <div className="lg:col-span-5 space-y-8">

              {/* Core Parameters Card */}
              <div className="bg-neutral-900 text-white rounded-2xl p-8 relative overflow-hidden shadow-lg">
                <div className="absolute top-0 right-0 w-36 h-36 bg-[#0B3A72] opacity-30 rounded-full blur-3xl -mr-10 -mt-10" />
                <div className="relative z-10 space-y-6">
                  <h3 className="font-kanit text-[18px] font-bold text-brand-red uppercase tracking-wider">
                    {activeLang === "bn" ? "মূল প্যারামিটার" : "Core Parameters"}
                  </h3>

                  <div className="grid grid-cols-1 divide-y divide-neutral-800">
                    <div className="pb-4">
                      <span className="text-[12px] font-bold text-neutral-400 uppercase">
                        {activeLang === "bn" ? "পাওয়ার রেটিং" : "Rating Capacity"}
                      </span>
                      <p className="text-[26px] font-bold text-white tracking-tight mt-0.5">{specBadgeRating || "—"}</p>
                    </div>
                    <div className="py-4">
                      <span className="text-[12px] font-bold text-neutral-400 uppercase">
                        {activeLang === "bn" ? "ভোল্টেজ ক্লাস" : "Voltage Level"}
                      </span>
                      <p className="text-[26px] font-bold text-white tracking-tight mt-0.5">{specBadgeVoltage || "—"}</p>
                    </div>
                    <div className="pt-4">
                      <span className="text-[12px] font-bold text-neutral-400 uppercase">
                        {activeLang === "bn" ? "ডিজাইন স্ট্যান্ডার্ড" : "Standards Compliance"}
                      </span>
                      <p className="text-[18px] font-bold text-white mt-1">{specBadgeStandard || "—"}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Common Applications card */}
              {applicationsList.length > 0 && (
                <div className="bg-white border border-neutral-100 rounded-2xl p-7 shadow-xs">
                  <h3 className="font-kanit text-[19px] font-bold text-neutral-900 mb-5 border-b border-neutral-100 pb-3">
                    {activeLang === "bn" ? "ব্যবহারের ক্ষেত্রসমূহ" : "Common Applications"}
                  </h3>
                  <ul className="space-y-3.5">
                    {applicationsList.map((app, idx) => (
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
              )}

            </div>
          </div>

          {/* Technical Data Sheet Table */}
          {specsTableRows.length > 0 && (
            <div className="mb-16">
              <div className="mb-8">
                <h2 className="font-kanit text-[24px] md:text-[30px] font-bold text-neutral-900">
                  {activeLang === "bn" ? "কারিগরি তথ্য তালিকা" : "Technical Specification Data"}
                </h2>
                <div className="h-1 w-20 bg-brand-red mt-3 rounded-full" />
              </div>

              <div className="overflow-x-auto rounded-xl border border-neutral-200 bg-white shadow-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-neutral-900 text-white text-[14px] font-bold font-kanit">
                      <th className="p-5 border-b border-neutral-800 w-1/3">
                        {activeLang === "bn" ? "কারিগরি বৈশিষ্ট্যসমূহ" : "Technical Parameter"}
                      </th>
                      <th className="p-5 border-b border-neutral-800">
                        {activeLang === "bn" ? "স্ট্যান্ডার্ড রেঞ্জ / অপশন" : "Standard Range / Option"}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-[14px] text-neutral-700 font-medium">
                    {specsTableRows.map((row, idx) => (
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
          )}

          {/* Accessories & Quality Section */}
          {(accessoriesList.length > 0 || qualityText) && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
              
              {accessoriesList.length > 0 && (
                <div className="lg:col-span-7 bg-white border border-neutral-100 rounded-2xl p-7 md:p-9 shadow-xs space-y-6">
                  <h3 className="font-kanit text-[22px] md:text-[24px] font-bold text-neutral-900">
                    {activeLang === "bn" ? "স্ট্যান্ডার্ড এবং অতিরিক্ত আনুষাঙ্গিকসমূহ" : "Standard & Optional Accessories"}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {accessoriesList.map((acc, idx) => (
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
              )}

              {qualityText && (
                <div className="lg:col-span-5 bg-neutral-900 text-white rounded-2xl p-7 md:p-9 shadow-lg relative overflow-hidden h-full flex flex-col justify-between">
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-red opacity-15 rounded-full blur-3xl -ml-8 -mb-8" />
                  <div className="relative z-10 space-y-4">
                    <h3 className="font-kanit text-[20px] font-bold text-brand-red">
                      {activeLang === "bn" ? "পরীক্ষা এবং গুণমান নিয়ন্ত্রণ" : "Testing & Quality Assurance"}
                    </h3>
                    <p className="text-[13.5px] leading-relaxed text-neutral-300 font-medium">
                      {qualityText}
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
              )}
            </div>
          )}

          {/* Quotation CTA Banner */}
          {ctaTitle && (
            <div className="bg-white border border-neutral-100 rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto shadow-md relative overflow-hidden">
              <div className="absolute inset-0 bg-[#0B3A72]/5 pointer-events-none" />
              <div className="relative z-10 space-y-6">
                <h3 className="font-kanit text-[24px] md:text-[30px] font-bold text-neutral-900 leading-tight">
                  {ctaTitle}
                </h3>
                {ctaText && (
                  <p className="text-[14.5px] text-neutral-600 font-medium max-w-2xl mx-auto leading-relaxed">
                    {ctaText}
                  </p>
                )}

                <div className="pt-2">
                  <Link
                    href={`/contact?inquiry=${slug}`}
                    className="inline-flex items-center gap-3 bg-brand-red hover:bg-brand-red-hover text-white px-8 py-4 text-base font-bold rounded-lg transition-all shadow-md shadow-red-500/10 cursor-pointer group"
                  >
                    <span>{ctaBtn || (activeLang === "bn" ? "অনুরোধ পাঠান" : "Inquire Now")}</span>
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
