"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

// Local translations mapping for contact page elements
const CONTACT_PAGE_TEXT = {
  en: {
    title: "Contact Us",
    subtitle: "Get In Touch",
    desc: "Have a question or want to work together? Send us a message and our team will get back to you shortly.",
    breadcrumbs: "Home / Contact",

    // Form fields
    name: "Your Name",
    email: "Your Email",
    subject: "Subject",
    message: "Your Message",
    placeholderName: "Enter your full name",
    placeholderEmail: "Enter your email address",
    placeholderSubject: "What is this regarding?",
    placeholderMessage: "Type your message here...",

    // Status
    send: "Send Message",
    sending: "Sending...",
    success: "Thank you! Your message has been sent successfully. We will get back to you soon.",
    error: "Oops! Something went wrong. Please check your inputs and try again.",

    // Info Cards
    office: "Headquarters",
    phone: "Call Us",
    emailLabel: "Email Us",
  },
  bn: {
    title: "যোগাযোগ",
    subtitle: "আমাদের সাথে যোগাযোগ করুন",
    desc: "কোনো প্রশ্ন আছে নাকি একসাথে কাজ করতে চান? আমাদের বার্তা পাঠান এবং আমাদের দল শীঘ্রই আপনার সাথে যোগাযোগ করবে।",
    breadcrumbs: "হোম / যোগাযোগ",

    // Form fields
    name: "আপনার নাম",
    email: "আপনার ইমেল",
    subject: "বিষয়",
    message: "বার্তা",
    placeholderName: "আপনার পুরো নাম লিখুন",
    placeholderEmail: "আপনার ইমেল ঠিকানা লিখুন",
    placeholderSubject: "কোন বিষয়ে জানাতে চান?",
    placeholderMessage: "এখানে আপনার বার্তাটি লিখুন...",

    // Status
    send: "বার্তা পাঠান",
    sending: "পাঠানো হচ্ছে...",
    success: "ধন্যবাদ! আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।",
    error: "দুঃখিত! কিছু ভুল হয়েছে। অনুগ্রহ করে ইনপুটগুলো পরীক্ষা করে আবার চেষ্টা করুন।",

    // Info Cards
    office: "প্রধান কার্যালয়",
    phone: "ফোন করুন",
    emailLabel: "ইমেইল করুন",
  }
};

/**
 * Address pin outline SVG icon component.
 */
function PinIcon() {
  return (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-brand-red shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
  );
}

/**
 * Envelope mail outline SVG icon component.
 */
function MailIcon() {
  return (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-brand-red shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
    </svg>
  );
}

/**
 * Handset call phone outline SVG icon component.
 */
function PhoneIcon() {
  return (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-brand-red shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.622C2.25 12.512 7.038 17.3 12.928 17.3a17.9 17.9 0 0 0 7.37-1.579L21.3 14.722a.75.75 0 0 0-.256-1.02l-3.064-1.838a.75.75 0 0 0-.964.135l-1.35 1.62c-3.14-1.7-5.59-4.15-7.29-7.29l1.62-1.35a.75.75 0 0 0 .135-.964L8.337 2.148a.75.75 0 0 0-1.02-.256L5.722 2.7c-2.14 1.135-3.472 3.328-3.472 5.722Z" />
    </svg>
  );
}



/**
 * Contact Page Component.
 * Implements a modern, responsive layout presenting Seeco Power's official
 * details, an interactive contact submission form, and a location map frame.
 */
export default function ContactPage() {
  const { language, t } = useLanguage();
  const text = CONTACT_PAGE_TEXT[language as "en" | "bn"] || CONTACT_PAGE_TEXT.en;

  // Form field states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  // Submission feedback states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);

  // Submit form handler
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        setSubmitSuccess(false);
      }
    } catch (error) {
      console.error("Failed to submit message:", error);
      setSubmitSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FAF9F5] font-arone text-black min-h-screen">

      {/* 1. Page Header segment */}
      <section className="relative py-16 bg-neutral-900 text-white overflow-hidden">
        {/* Animated ambient lighting circles */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-red/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-brand-red/5 rounded-full blur-2xl" />

        <div className="relative mx-auto max-w-310 px-6 z-10">
          <div className="flex flex-col items-center text-center space-y-4">
            <h1 className="font-kanit text-4xl md:text-5xl font-bold tracking-tight text-white">
              {text.title}
            </h1>
            <p className="text-[14px] font-bold text-brand-red uppercase tracking-widest">
              {text.breadcrumbs}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Form & Info Core Content Section */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-310">

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">

            {/* Left Column: Official Contact Details Cards */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <span className="text-[14px] font-bold text-brand-red uppercase tracking-widest block">
                  {text.subtitle}
                </span>
                <h2 className="font-kanit text-[32px] font-bold text-neutral-900 leading-tight">
                  {language === "en" ? "Let's Build the Future of Energy Together" : "আসুন একসাথে ভবিষ্যতের বিদ্যুৎ অবকাঠামো গড়ে তুলি"}
                </h2>
                <p className="text-[16px] leading-relaxed text-neutral-600">
                  {text.desc}
                </p>
              </div>

              {/* Cards Grid layout */}
              <div className="grid grid-cols-1 gap-5">

                {/* Office Card */}
                <div className="flex gap-4 p-5 bg-white rounded-xl shadow-sm border border-neutral-100/60 hover:shadow-md transition-all duration-300">
                  <div className="p-3 bg-red-50 rounded-lg h-fit">
                    <PinIcon />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-kanit text-lg font-bold text-neutral-900 leading-tight">
                      {text.office}
                    </h3>
                    <p className="text-[15px] leading-relaxed text-neutral-600">
                      {t("contactInfo.address")}
                    </p>
                  </div>
                </div>

                {/* Call Phone Card */}
                <div className="flex gap-4 p-5 bg-white rounded-xl shadow-sm border border-neutral-100/60 hover:shadow-md transition-all duration-300">
                  <div className="p-3 bg-red-50 rounded-lg h-fit">
                    <PhoneIcon />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-kanit text-lg font-bold text-neutral-900 leading-tight">
                      {text.phone}
                    </h3>
                    <div className="flex flex-col text-[15px] text-neutral-600 space-y-1">
                      <a href={`tel:${t("contactInfo.phone")}`} className="hover:text-brand-red transition-colors w-fit font-semibold">
                        {t("contactInfo.phone")}
                      </a>
                      <a href="tel:+8801818430308" className="hover:text-brand-red transition-colors w-fit">
                        +88 01818-430308
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email Address Card */}
                <div className="flex gap-4 p-5 bg-white rounded-xl shadow-sm border border-neutral-100/60 hover:shadow-md transition-all duration-300">
                  <div className="p-3 bg-red-50 rounded-lg h-fit">
                    <MailIcon />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-kanit text-lg font-bold text-neutral-900 leading-tight">
                      {text.emailLabel}
                    </h3>
                    <div className="flex flex-col text-[15px] text-neutral-600 space-y-1">
                      <a href={`mailto:${t("contactInfo.email")}`} className="hover:text-brand-red transition-colors break-all font-semibold">
                        {t("contactInfo.email")}
                      </a>
                      <a href={`mailto:${t("contactInfo.email2")}`} className="hover:text-brand-red transition-colors break-all">
                        {t("contactInfo.email2")}
                      </a>
                    </div>
                  </div>
                </div>



              </div>
            </div>

            {/* Right Column: Custom Message Form */}
            <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-2xl border border-neutral-100 shadow-sm">
              <form onSubmit={handleFormSubmit} className="space-y-6">

                {/* Two Column Grid on Tablet/Desktop for name & email */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-[14px] font-bold text-neutral-800">
                      {text.name} <span className="text-brand-red">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={text.placeholderName}
                      className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:outline-hidden focus:border-brand-red focus:ring-1 focus:ring-brand-red text-[15px] transition-all bg-neutral-50/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-[14px] font-bold text-neutral-800">
                      {text.email} <span className="text-brand-red">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={text.placeholderEmail}
                      className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:outline-hidden focus:border-brand-red focus:ring-1 focus:ring-brand-red text-[15px] transition-all bg-neutral-50/50"
                    />
                  </div>
                </div>

                {/* Subject Field */}
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-[14px] font-bold text-neutral-800">
                    {text.subject} <span className="text-brand-red">*</span>
                  </label>
                  <input
                    id="subject"
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder={text.placeholderSubject}
                    className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:outline-hidden focus:border-brand-red focus:ring-1 focus:ring-brand-red text-[15px] transition-all bg-neutral-50/50"
                  />
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-[14px] font-bold text-neutral-800">
                    {text.message} <span className="text-brand-red">*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={text.placeholderMessage}
                    className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:outline-hidden focus:border-brand-red focus:ring-1 focus:ring-brand-red text-[15px] transition-all bg-neutral-50/50"
                  />
                </div>

                {/* Submit Action Block */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-3 rounded-lg bg-brand-red py-4 text-base font-bold text-white shadow-md hover:bg-brand-red/90 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>{text.sending}</span>
                    </>
                  ) : (
                    <span>{text.send}</span>
                  )}
                </button>

                {/* Form feedback prompts */}
                {submitSuccess === true && (
                  <div className="p-4 bg-emerald-50 text-emerald-800 text-[14px] rounded-lg border border-emerald-100 flex items-start gap-2">
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <span>{text.success}</span>
                  </div>
                )}

                {submitSuccess === false && (
                  <div className="p-4 bg-rose-50 text-rose-800 text-[14px] rounded-lg border border-rose-100 flex items-start gap-2">
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5 shrink-0 text-rose-600 mt-0.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>
                    <span>{text.error}</span>
                  </div>
                )}

              </form>
            </div>

          </div>

        </div>
      </section>

      {/* 3. Interactive Map Segment */}
      <section className="pb-20 px-6">
        <div className="mx-auto max-w-310">
          <div className="overflow-hidden rounded-2xl shadow-md border border-neutral-100 bg-white p-3">
            {/* Google Map iframe centered around Ekuria Tila Bari, South Keranigonj, Dhaka */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3653.7970229477864!2d90.4149776!3d23.6832157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b900021a5b69%3A0xc06a1d879677ec5!2sSEECO%20Power%20Limited!5e0!3m2!1sen!2sbd!4v1781979253429!5m2!1sen!2sbd"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-112.5 transition-all duration-700 rounded-xl"
              title="SEECO Power Limited Headquarters Map Location"
            ></iframe>
            {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3653.7970229477864!2d90.4149776!3d23.6832157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b900021a5b69%3A0xc06a1d879677ec5!2sSEECO%20Power%20Limited!5e0!3m2!1sen!2sbd!4v1781979253429!5m2!1sen!2sbd" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
          </div>
        </div>
      </section>

    </div>
  );
}
