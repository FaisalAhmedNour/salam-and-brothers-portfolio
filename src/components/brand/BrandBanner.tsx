"use client";

/**
 * BrandBanner Component.
 * Renders a side-by-side section containing detailed trust copy on the left
 * and a large "Positive Energy / Positive Power" statement banner on the right.
 */
export default function BrandBanner() {
  return (
    <section className="bg-white py-16 px-6 font-arone border-t border-gray-100">
      <div className="mx-auto max-w-310">

        {/* Split grid layout */}
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">

          {/* Left Column: Descriptive Trust Text */}
          <div className="text-[16px] leading-relaxed text-gray-700 space-y-5">
            <p>
              <strong className="text-brand-red font-bold">Turkish Transformer</strong> is a trusted name in the energy sector, offering high-performance transformer solutions tailored to modern infrastructure needs.
            </p>
            <p>
              With our innovative production approach and customer-oriented mindset, we support critical energy projects across the globe. We don’t just deliver products — we deliver long-term value and reliability.
            </p>
          </div>

          {/* Right Column: Prominent Positive Power Heading Box */}
          <div className="flex flex-col justify-center border-l-4 border-brand-red pl-8 md:pl-12 py-4">

            {/* Title Statement */}
            <span className="font-kanit text-[20px] font-bold text-gray-400 uppercase tracking-widest leading-none">
              Positive Energy
            </span>

            {/* Large Accent Text */}
            <h2 className="font-kanit mt-2 text-[48px] font-bold leading-none text-neutral-900 md:text-[62px] tracking-tight">
              Positive Power
            </h2>

          </div>

        </div>

      </div>
    </section>
  );
}
