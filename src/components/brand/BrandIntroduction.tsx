"use client";

/**
 * BrandIntroduction Component.
 * Renders the primary text introduction of the brand,
 * highlighting high quality manufacturing and custom solutions.
 */
export default function BrandIntroduction() {
  return (
    <section id="about" className="bg-[#FAF9F5] py-20 px-6 font-arone text-center border-y border-gray-100">
      <div className="mx-auto max-w-200">

        {/* Red Brand Subtitle */}
        <span className="font-kanit text-[15px] font-bold uppercase tracking-wider text-brand-red">
          Turkish Transformer
        </span>

        {/* Core Segment Heading */}
        <h2 className="font-kanit mt-3 text-[32px] font-bold leading-tight text-neutral-900 md:text-[42px] tracking-tight">
          High Quality Distribution &amp; Power Transformers
        </h2>

        {/* Detailed Copy Text */}
        <p className="mt-8 text-[16.5px] leading-relaxed text-neutral-600 md:text-[18px]">
          <strong className="font-semibold text-neutral-900">Turkish Transformer</strong> holds a leading position in the transformer industry with its accumulated expertise and reliability. With our commitment to uncompromising quality and a customer-centric approach, we shape the industry and build the energy infrastructure of the future through our innovative solutions.
        </p>

      </div>
    </section>
  );
}
