"use client";

import Image from "next/image";

// Specialties transformer types scrolling in the vertical marquee
// Structure representing English and Bangla translations for specialty transformers.
interface SpecialtyTransformer {
  en: string;
  bn: string;
}

// Specialties transformer types scrolling in the vertical marquee with translations.
const SPECIALTY_TRANSFORMERS: SpecialtyTransformer[] = [
  { en: "Renewable Energy (PV) Transformers", bn: "নবায়নযোগ্য শক্তি (পিভি) ট্রান্সফরমার" },
  { en: "Dual HV - Dual LV Transformers", bn: "ডুয়াল এইচভি - ডুয়াল এলভি ট্রান্সফরমার" },
  { en: "Auto-Transformers", bn: "অটো-ট্রান্সফরমার" },
  { en: "Insulation Transformers", bn: "ইনসুলেশন ট্রান্সফরমার" },
  { en: "Grounding / Earthing Transformers", bn: "গ্রাউন্ডিং / আর্থিং ট্রান্সফরমার" },
  { en: "Furnace Transformer", bn: "ফার্নেস ট্রান্সফরমার" },
  { en: "Motor Driven Transformer", bn: "মোটর চালিত ট্রান্সফরমার" },
  { en: "Step Up / Step Down Transformers", bn: "স্টেপ আপ / স্টেপ ডাউন ট্রান্সফরমার" },
  { en: "Rectifier Transformers (6P - 12P)", bn: "রেকটিফায়ার ট্রান্সফরমার (৬পি - ১২পি)" },
  { en: "Pad-Mounted Transformers", bn: "প্যাড-মাউন্টেড ট্রান্সফরমার" },
  { en: "Shunt Reactor For PV Application", bn: "পিভি অ্যাপ্লিকেশনের জন্য শান্ট রিঅ্যাক্টর" },
];

/**
 * MarqueeBand Component.
 * Renders an industrial showcase banner with a video background,
 * a white brand logo, and a vertically scrolling list of technical specialties.
 */
export default function MarqueeBand() {
  return (
    <section
      id="marquee-band"
      className="relative min-h-125 w-full overflow-hidden bg-neutral-200 font-arone"
    >

      {/* Background Video Element with Fallback Poster Image */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover opacity-100"
      >
        <source
          src="/images/Transformer-1900-x-600-px.mp4"
          type="video/mp4"
        />
        {/* If video fails to load, poster image or this text serves as fallback */}
        Your browser does not support the video tag.
      </video>

      {/* Dark semi-transparent overlay to ensure content contrast */}
      {/* <div className="absolute inset-0 z-10" /> */}

      {/* Split layout grid wrapper */}
      <div className="relative z-20 mx-auto grid max-w-310 grid-cols-1 md:grid-cols-2 md:min-h-125">

        {/* Left Column: Brand White Logo Container */}
        <div className="flex items-center justify-left p-8">
          <div className="relative h-30 w-full max-w-[320px]">
            <Image
              src="/images/SEECOI1.png"
              alt="SEECO Transformer White Logo"
              fill
              sizes="(max-width: 768px) 320px, 400px"
              className="object-contain"
            />
          </div>
        </div>

        {/* Right Column: Scrolling Marquee Box */}
        <div className="flex justify-end">
          <div className="relative h-full w-100 overflow-hidden flex justify-end">
            <div className="vertical-marquee">

              {/* Double mapped scrolling items for seamless looping */}
              <div className="marquee-content py-4">
                {SPECIALTY_TRANSFORMERS.map((item, index) => (
                  <div
                    key={`marq-1-${index}`}
                    className="marquee-item text-[17px] font-medium tracking-wide text-white uppercase opacity-75"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[25px] leading-tight shrink-0">•</span>
                      <div className="flex flex-col text-left">
                        <span className="leading-tight">{item.en}</span>
                        <span className="text-[16px] text-gray-100 normal-case mt-1 font-normal font-sans">
                          {item.bn}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                {SPECIALTY_TRANSFORMERS.map((item, index) => (
                  <div
                    key={`marq-2-${index}`}
                    className="marquee-item text-[17px] font-medium tracking-wide text-white uppercase opacity-75"
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-[25px] leading-tight shrink-0">•</span>
                      <div className="flex flex-col text-left">
                        <span className="leading-tight">{item.en}</span>
                        <span className="text-[16px] text-gray-100 normal-case mt-1 font-bold font-sans">
                          {item.bn}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
