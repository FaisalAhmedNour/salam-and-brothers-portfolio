"use client";

import Image from "next/image";

/**
 * Arrow right SVG icon for CTA buttons.
 * Renders an inline vector icon.
 */
function ArrowRightLongIcon() {
  return (
    <svg viewBox="0 0 448 512" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z" />
    </svg>
  );
}

/**
 * ContactCTA Component.
 * Renders a prominent section before the footer encouraging user engagement,
 * featuring a company team photo, bold callout heading, and an email contact button.
 */
export default function ContactCTA() {
  return (
    <section id="contact" className="bg-[#FAF9F5] py-20 px-6 font-arone border-t border-gray-100">
      <div className="mx-auto max-w-310">

        {/* Responsive layout container: stacked on mobile, row on desktop */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">

          {/* Left Column: Heading (spans 4/12 on lg) */}
          <div className="text-center lg:col-span-4 lg:text-left">
            <h2 className="font-kanit text-[32px] font-bold leading-tight text-neutral-900 md:text-[44px] tracking-tight">
              Contact Us <br className="hidden lg:inline" /> And Start <br className="hidden lg:inline" /> Your Project!
            </h2>
          </div>

          {/* Center Column: Round Team Photo (spans 5/12 on lg) */}
          <div className="flex justify-center lg:col-span-5">
            <div className="relative aspect-4/5 w-full max-w-90 overflow-hidden bg-gray-100 shadow-md rounded-2xl border border-white">
              <Image
                src="/images/transformer-maintenance.webp"
                alt="Turkish Transformer Engineering and Production Team"
                fill
                sizes="(max-width: 768px) 360px, 450px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Column: CTA Button (spans 3/12 on lg) */}
          <div className="flex justify-center lg:col-span-3 lg:justify-end">
            <a
              href="mailto:info@turkishtransformer.com?subject=Transformer%20RFQ"
              className="inline-flex w-full items-center justify-center gap-3 border-2 border-brand-red bg-transparent px-8 py-4.5 text-base font-bold text-neutral-950 transition-all duration-300 hover:bg-brand-red hover:text-white rounded-md sm:w-auto"
            >
              <span>Get Started</span>
              <ArrowRightLongIcon />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
