"use client";

import Image from "next/image";

// Specialties transformer types scrolling in the vertical marquee
const SPECIALTY_TRANSFORMERS: string[] = [
  "Renewable Energy (PV) Transformers",
  "Dual HV - Dual LV Transformers",
  "Auto-Transformers",
  "Insulation Transformers",
  "Grounding / Earthing Transformers",
  "Furnace Transformer",
  "Motor Driven Transformer",
  "Step Up / Step Down Transformers",
  "Rectifier Transformers (6P - 12P)",
  "Pad-Mounted Transformers",
  "Shunt Reactor For PV Application",
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
      className="relative min-h-[500px] w-full overflow-hidden bg-neutral-900 font-arone"
    >

      {/* Background Video Element with Fallback Poster Image */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover opacity-95"
        poster="/images/turkish-transfomr-maintance-1.jpg"
      >
        <source
          src="https://turkishtransformer.com/wp-content/uploads/2025/04/Transformer-1900-x-600-px.mp4"
          type="video/mp4"
        />
        {/* If video fails to load, poster image or this text serves as fallback */}
        Your browser does not support the video tag.
      </video>

      {/* Dark semi-transparent overlay to ensure content contrast */}
      <div className="absolute inset-0 z-10 bg-[#2e2d2d00]" />

      {/* Split layout grid wrapper */}
      <div className="relative z-20 mx-auto grid max-w-310 grid-cols-1 md:grid-cols-2 md:min-h-125">

        {/* Left Column: Brand White Logo Container */}
        <div className="flex items-center justify-left p-8">
          <div className="relative h-30 w-full max-w-[320px]">
            <Image
              src="/images/SEECOI1.png"
              alt="Turkish Transformer White Logo"
              fill
              sizes="(max-width: 768px) 320px, 400px"
              className="object-contain"
            />
          </div>
        </div>

        {/* Right Column: Scrolling Marquee Box */}
        <div className="flex justify-end">
          <div className="relative h-100 w-100 overflow-hidden flex justify-end">
            <div className="vertical-marquee">

              {/* Double mapped scrolling items for seamless looping */}
              <div className="marquee-content py-4">
                {SPECIALTY_TRANSFORMERS.map((transformerName, index) => (
                  <div
                    key={`marq-1-${index}`}
                    className="marquee-item text-[17px] font-medium tracking-wide text-white uppercase opacity-75"
                  >
                    • {transformerName}
                  </div>
                ))}
                {SPECIALTY_TRANSFORMERS.map((transformerName, index) => (
                  <div
                    key={`marq-2-${index}`}
                    className="marquee-item text-[17px] font-medium tracking-wide text-white uppercase opacity-75"
                  >
                    • {transformerName}
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
