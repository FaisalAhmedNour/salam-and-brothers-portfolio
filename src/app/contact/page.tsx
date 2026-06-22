"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import PageHeader from "@/components/widgets/PageHeader";

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
    mobile: "Mobile Number",
    subject: "Subject",
    message: "Your Message",
    placeholderName: "Enter your full name",
    placeholderEmail: "Enter your email address",
    placeholderMobile: "Enter your mobile number",
    placeholderSubject: "What is this regarding?",
    placeholderMessage: "Type your message here...",

    // Status
    send: "Send Message",
    sending: "Sending...",
    success: "Thank you! Your message has been sent successfully. We will get back to you soon.",
    error: "Oops! Something went wrong. Please check your inputs and try again.",
    formTitle: "Send Us a Message",
    formSubtitle: "Feel free to reach out. Our team will respond to your inquiry as soon as possible.",

    // Info Cards
    office: "Head Office",
    factory: "Factory",
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
    email: "আপনার ই-মেইল",
    mobile: "মোবাইল নম্বর",
    subject: "বিষয়",
    message: "বার্তা",
    placeholderName: "আপনার পুরো নাম লিখুন",
    placeholderEmail: "আপনার ই-মেইল ঠিকানা লিখুন",
    placeholderMobile: "আপনার মোবাইল নম্বর লিখুন",
    placeholderSubject: "কোন বিষয়ে জানাতে চান?",
    placeholderMessage: "এখানে আপনার বার্তাটি লিখুন...",

    // Status
    send: "বার্তা পাঠান",
    sending: "পাঠানো হচ্ছে...",
    success: "ধন্যবাদ! আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।",
    error: "দুঃখিত! কিছু ভুল হয়েছে। অনুগ্রহ করে ইনপুটগুলো পরীক্ষা করে আবার চেষ্টা করুন।",
    formTitle: "আমাদের বার্তা পাঠান",
    formSubtitle: "যেকোনো প্রয়োজনে আমাদের সাথে যোগাযোগ করুন। আমাদের দল যত দ্রুত সম্ভব আপনার প্রশ্নের উত্তর দেবে।",

    // Info Cards
    office: "প্রধান কার্যালয়",
    factory: "কারখানা",
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

// List of country codes with code, 2-letter country code, and name for selector
const COUNTRY_CODES = [
  { code: "+880", country: "BD", name: "Bangladesh" },
  { code: "+93", country: "AF", name: "Afghanistan" },
  { code: "+355", country: "AL", name: "Albania" },
  { code: "+213", country: "DZ", name: "Algeria" },
  { code: "+1-684", country: "AS", name: "American Samoa" },
  { code: "+376", country: "AD", name: "Andorra" },
  { code: "+244", country: "AO", name: "Angola" },
  { code: "+1-264", country: "AI", name: "Anguilla" },
  { code: "+672", country: "AQ", name: "Antarctica" },
  { code: "+1-268", country: "AG", name: "Antigua and Barbuda" },
  { code: "+54", country: "AR", name: "Argentina" },
  { code: "+374", country: "AM", name: "Armenia" },
  { code: "+297", country: "AW", name: "Aruba" },
  { code: "+61", country: "AU", name: "Australia" },
  { code: "+43", country: "AT", name: "Austria" },
  { code: "+994", country: "AZ", name: "Azerbaijan" },
  { code: "+1-242", country: "BS", name: "Bahamas" },
  { code: "+973", country: "BH", name: "Bahrain" },
  { code: "+1-246", country: "BB", name: "Barbados" },
  { code: "+375", country: "BY", name: "Belarus" },
  { code: "+32", country: "BE", name: "Belgium" },
  { code: "+501", country: "BZ", name: "Belize" },
  { code: "+229", country: "BJ", name: "Benin" },
  { code: "+1-441", country: "BM", name: "Bermuda" },
  { code: "+975", country: "BT", name: "Bhutan" },
  { code: "+591", country: "BO", name: "Bolivia" },
  { code: "+387", country: "BA", name: "Bosnia and Herzegovina" },
  { code: "+267", country: "BW", name: "Botswana" },
  { code: "+55", country: "BR", name: "Brazil" },
  { code: "+246", country: "IO", name: "British Indian Ocean Territory" },
  { code: "+1-284", country: "VG", name: "British Virgin Islands" },
  { code: "+673", country: "BN", name: "Brunei" },
  { code: "+359", country: "BG", name: "Bulgaria" },
  { code: "+226", country: "BF", name: "Burkina Faso" },
  { code: "+257", country: "BI", name: "Burundi" },
  { code: "+855", country: "KH", name: "Cambodia" },
  { code: "+237", country: "CM", name: "Cameroon" },
  { code: "+1", country: "CA", name: "Canada" },
  { code: "+238", country: "CV", name: "Cape Verde" },
  { code: "+1-345", country: "KY", name: "Cayman Islands" },
  { code: "+236", country: "CF", name: "Central African Republic" },
  { code: "+235", country: "TD", name: "Chad" },
  { code: "+56", country: "CL", name: "Chile" },
  { code: "+86", country: "CN", name: "China" },
  { code: "+61", country: "CX", name: "Christmas Island" },
  { code: "+61", country: "CC", name: "Cocos (Keeling) Islands" },
  { code: "+57", country: "CO", name: "Colombia" },
  { code: "+269", country: "KM", name: "Comoros" },
  { code: "+242", country: "CG", name: "Congo (Republic)" },
  { code: "+243", country: "CD", name: "Congo (Democratic Republic)" },
  { code: "+682", country: "CK", name: "Cook Islands" },
  { code: "+506", country: "CR", name: "Costa Rica" },
  { code: "+385", country: "HR", name: "Croatia" },
  { code: "+53", country: "CU", name: "Cuba" },
  { code: "+357", country: "CY", name: "Cyprus" },
  { code: "+420", country: "CZ", name: "Czech Republic" },
  { code: "+45", country: "DK", name: "Denmark" },
  { code: "+253", country: "DJ", name: "Djibouti" },
  { code: "+1-767", country: "DM", name: "Dominica" },
  { code: "+1-809", country: "DO", name: "Dominican Republic" },
  { code: "+593", country: "EC", name: "Ecuador" },
  { code: "+20", country: "EG", name: "Egypt" },
  { code: "+503", country: "SV", name: "El Salvador" },
  { code: "+240", country: "GQ", name: "Equatorial Guinea" },
  { code: "+291", country: "ER", name: "Eritrea" },
  { code: "+372", country: "EE", name: "Estonia" },
  { code: "+251", country: "ET", name: "Ethiopia" },
  { code: "+500", country: "FK", name: "Falkland Islands" },
  { code: "+298", country: "FO", name: "Faroe Islands" },
  { code: "+679", country: "FJ", name: "Fiji" },
  { code: "+358", country: "FI", name: "Finland" },
  { code: "+33", country: "FR", name: "France" },
  { code: "+594", country: "GF", name: "French Guiana" },
  { code: "+689", country: "PF", name: "French Polynesia" },
  { code: "+241", country: "GA", name: "Gabon" },
  { code: "+220", country: "GM", name: "Gambia" },
  { code: "+995", country: "GE", name: "Georgia" },
  { code: "+49", country: "DE", name: "Germany" },
  { code: "+233", country: "GH", name: "Ghana" },
  { code: "+350", country: "GI", name: "Gibraltar" },
  { code: "+30", country: "GR", name: "Greece" },
  { code: "+299", country: "GL", name: "Greenland" },
  { code: "+1-473", country: "GD", name: "Grenada" },
  { code: "+590", country: "GP", name: "Guadeloupe" },
  { code: "+1-671", country: "GU", name: "Guam" },
  { code: "+502", country: "GT", name: "Guatemala" },
  { code: "+224", country: "GN", name: "Guinea" },
  { code: "+245", country: "GW", name: "Guinea-Bissau" },
  { code: "+592", country: "GY", name: "Guyana" },
  { code: "+509", country: "HT", name: "Haiti" },
  { code: "+504", country: "HN", name: "Honduras" },
  { code: "+852", country: "HK", name: "Hong Kong" },
  { code: "+36", country: "HU", name: "Hungary" },
  { code: "+354", country: "IS", name: "Iceland" },
  { code: "+91", country: "IN", name: "India" },
  { code: "+62", country: "ID", name: "Indonesia" },
  { code: "+98", country: "IR", name: "Iran" },
  { code: "+964", country: "IQ", name: "Iraq" },
  { code: "+353", country: "IE", name: "Ireland" },
  { code: "+972", country: "IL", name: "Israel" },
  { code: "+39", country: "IT", name: "Italy" },
  { code: "+225", country: "CI", name: "Ivory Coast" },
  { code: "+1-876", country: "JM", name: "Jamaica" },
  { code: "+81", country: "JP", name: "Japan" },
  { code: "+962", country: "JO", name: "Jordan" },
  { code: "+7", country: "KZ", name: "Kazakhstan" },
  { code: "+254", country: "KE", name: "Kenya" },
  { code: "+686", country: "KI", name: "Kiribati" },
  { code: "+850", country: "KP", name: "North Korea" },
  { code: "+82", country: "KR", name: "South Korea" },
  { code: "+965", country: "KW", name: "Kuwait" },
  { code: "+996", country: "KG", name: "Kyrgyzstan" },
  { code: "+856", country: "LA", name: "Laos" },
  { code: "+371", country: "LV", name: "Latvia" },
  { code: "+961", country: "LB", name: "Lebanon" },
  { code: "+266", country: "LS", name: "Lesotho" },
  { code: "+231", country: "LR", name: "Liberia" },
  { code: "+218", country: "LY", name: "Libya" },
  { code: "+423", country: "LI", name: "Liechtenstein" },
  { code: "+370", country: "LT", name: "Lithuania" },
  { code: "+352", country: "LU", name: "Luxembourg" },
  { code: "+853", country: "MO", name: "Macau" },
  { code: "+389", country: "MK", name: "Macedonia" },
  { code: "+261", country: "MG", name: "Madagascar" },
  { code: "+265", country: "MW", name: "Malawi" },
  { code: "+60", country: "MY", name: "Malaysia" },
  { code: "+960", country: "MV", name: "Maldives" },
  { code: "+223", country: "ML", name: "Mali" },
  { code: "+356", country: "MT", name: "Malta" },
  { code: "+692", country: "MH", name: "Marshall Islands" },
  { code: "+596", country: "MQ", name: "Martinique" },
  { code: "+222", country: "MR", name: "Mauritania" },
  { code: "+230", country: "MU", name: "Mauritius" },
  { code: "+262", country: "YT", name: "Mayotte" },
  { code: "+52", country: "MX", name: "Mexico" },
  { code: "+691", country: "FM", name: "Micronesia" },
  { code: "+373", country: "MD", name: "Moldova" },
  { code: "+377", country: "MC", name: "Monaco" },
  { code: "+976", country: "MN", name: "Mongolia" },
  { code: "+382", country: "ME", name: "Montenegro" },
  { code: "+1-664", country: "MS", name: "Montserrat" },
  { code: "+212", country: "MA", name: "Morocco" },
  { code: "+258", country: "MZ", name: "Mozambique" },
  { code: "+95", country: "MM", name: "Myanmar" },
  { code: "+264", country: "NA", name: "Namibia" },
  { code: "+674", country: "NR", name: "Nauru" },
  { code: "+977", country: "NP", name: "Nepal" },
  { code: "+31", country: "NL", name: "Netherlands" },
  { code: "+687", country: "NC", name: "New Caledonia" },
  { code: "+64", country: "NZ", name: "New Zealand" },
  { code: "+505", country: "NI", name: "Nicaragua" },
  { code: "+227", country: "NE", name: "Niger" },
  { code: "+234", country: "NG", name: "Nigeria" },
  { code: "+683", country: "NU", name: "Niue" },
  { code: "+672", country: "NF", name: "Norfolk Island" },
  { code: "+1-670", country: "MP", name: "Northern Mariana Islands" },
  { code: "+47", country: "NO", name: "Norway" },
  { code: "+968", country: "OM", name: "Oman" },
  { code: "+92", country: "PK", name: "Pakistan" },
  { code: "+680", country: "PW", name: "Palau" },
  { code: "+970", country: "PS", name: "Palestine" },
  { code: "+507", country: "PA", name: "Panama" },
  { code: "+675", country: "PG", name: "Papua New Guinea" },
  { code: "+595", country: "PY", name: "Paraguay" },
  { code: "+51", country: "PE", name: "Peru" },
  { code: "+63", country: "PH", name: "Philippines" },
  { code: "+48", country: "PL", name: "Poland" },
  { code: "+351", country: "PT", name: "Portugal" },
  { code: "+1-787", country: "PR", name: "Puerto Rico" },
  { code: "+974", country: "QA", name: "Qatar" },
  { code: "+262", country: "RE", name: "Reunion" },
  { code: "+40", country: "RO", name: "Romania" },
  { code: "+7", country: "RU", name: "Russia" },
  { code: "+250", country: "RW", name: "Rwanda" },
  { code: "+590", country: "BL", name: "Saint Barthelemy" },
  { code: "+290", country: "SH", name: "Saint Helena" },
  { code: "+1-869", country: "KN", name: "Saint Kitts and Nevis" },
  { code: "+1-758", country: "LC", name: "Saint Lucia" },
  { code: "+590", country: "MF", name: "Saint Martin" },
  { code: "+508", country: "PM", name: "Saint Pierre and Miquelon" },
  { code: "+1-784", country: "VC", name: "Saint Vincent and the Grenadines" },
  { code: "+685", country: "WS", name: "Samoa" },
  { code: "+378", country: "SM", name: "San Marino" },
  { code: "+239", country: "ST", name: "Sao Tome and Principe" },
  { code: "+966", country: "SA", name: "Saudi Arabia" },
  { code: "+221", country: "SN", name: "Senegal" },
  { code: "+381", country: "RS", name: "Serbia" },
  { code: "+248", country: "SC", name: "Seychelles" },
  { code: "+232", country: "SL", name: "Sierra Leone" },
  { code: "+65", country: "SG", name: "Singapore" },
  { code: "+421", country: "SK", name: "Slovakia" },
  { code: "+386", country: "SI", name: "Slovenia" },
  { code: "+677", country: "SB", name: "Solomon Islands" },
  { code: "+252", country: "SO", name: "Somalia" },
  { code: "+27", country: "ZA", name: "South Africa" },
  { code: "+34", country: "ES", name: "Spain" },
  { code: "+94", country: "LK", name: "Sri Lanka" },
  { code: "+249", country: "SD", name: "Sudan" },
  { code: "+597", country: "SR", name: "Suriname" },
  { code: "+268", country: "SZ", name: "Swaziland" },
  { code: "+46", country: "SE", name: "Sweden" },
  { code: "+41", country: "CH", name: "Switzerland" },
  { code: "+963", country: "SY", name: "Syria" },
  { code: "+886", country: "TW", name: "Taiwan" },
  { code: "+992", country: "TJ", name: "Tajikistan" },
  { code: "+255", country: "TZ", name: "Tanzania" },
  { code: "+66", country: "TH", name: "Thailand" },
  { code: "+228", country: "TG", name: "Togo" },
  { code: "+690", country: "TK", name: "Tokelau" },
  { code: "+676", country: "TO", name: "Tonga" },
  { code: "+1-868", country: "TT", name: "Trinidad and Tobago" },
  { code: "+216", country: "TN", name: "Tunisia" },
  { code: "+90", country: "TR", name: "Turkey" },
  { code: "+993", country: "TM", name: "Turkmenistan" },
  { code: "+1-649", country: "TC", name: "Turks and Caicos Islands" },
  { code: "+688", country: "TV", name: "Tuvalu" },
  { code: "+256", country: "UG", name: "Uganda" },
  { code: "+380", country: "UA", name: "Ukraine" },
  { code: "+971", country: "AE", name: "United Arab Emirates" },
  { code: "+44", country: "GB", name: "United Kingdom" },
  { code: "+1", country: "US", name: "United States" },
  { code: "+598", country: "UY", name: "Uruguay" },
  { code: "+998", country: "UZ", name: "Uzbekistan" },
  { code: "+678", country: "VU", name: "Vanuatu" },
  { code: "+379", country: "VA", name: "Vatican City" },
  { code: "+58", country: "VE", name: "Venezuela" },
  { code: "+84", country: "VN", name: "Vietnam" },
  { code: "+1-340", country: "VI", name: "Virgin Islands (US)" },
  { code: "+681", country: "WF", name: "Wallis and Futuna" },
  { code: "+967", country: "YE", name: "Yemen" },
  { code: "+260", country: "ZM", name: "Zambia" },
  { code: "+263", country: "ZW", name: "Zimbabwe" },
];

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
  const [countryCode, setCountryCode] = useState("+880");
  const [mobileNumber, setMobileNumber] = useState("");
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

    // Combine country code and mobile number if input has value
    const fullMobile = mobileNumber.trim() ? `${countryCode} ${mobileNumber.trim()}` : "";

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, mobile: fullMobile, title: subject, message }),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setName("");
        setEmail("");
        setCountryCode("+880");
        setMobileNumber("");
        setSubject("");
        setMessage("");
      } else {
        setSubmitSuccess(false);
        console.log('error', response);
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
      <PageHeader title={text.title} />

      {/* 2. Form & Info Core Content Section */}
      <section className="py-12 px-6">
        <div className="mx-auto max-w-310">

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">

            {/* Left Column: Official Contact Details Cards */}
            <div className="lg:col-span-5 space-y-4">
              <div className="space-y-2">
                <span className="text-[16px] font-extrabold text-brand-red uppercase tracking-widest block">
                  {text.subtitle}
                </span>
                <h2 className="font-kanit text-[32px] font-bold text-neutral-900 leading-8">
                  {language === "en" ? "Let's Build the Future of Energy Together" : "আসুন একসাথে ভবিষ্যতের বিদ্যুৎ অবকাঠামো গড়ে তুলি"}
                </h2>
                <p className="text-[16px] leading-relaxed text-neutral-600">
                  {text.desc}
                </p>
              </div>

              {/* Cards Grid layout */}
              <div className="grid grid-cols-1 gap-3">

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

                {/* Factory Card */}
                <div className="flex gap-4 p-5 bg-white rounded-xl shadow-sm border border-neutral-100/60 hover:shadow-md transition-all duration-300">
                  <div className="p-3 bg-red-50 rounded-lg h-fit">
                    <PinIcon />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-kanit text-lg font-bold text-neutral-900 leading-tight">
                      {text.factory}
                    </h3>
                    <p className="text-[15px] leading-relaxed text-neutral-600">
                      {t("contactInfo.factoryAddress")}
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
                      {/* <a href="tel:+8801818430308" className="hover:text-brand-red transition-colors w-fit">
                        +88 01818-430308
                      </a> */}
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
              {/* Form Title & Introduction Section */}
              <div className="mb-6 space-y-1.5 pb-4 border-b border-neutral-100">
                <h3 className="font-kanit text-[24px] font-bold text-neutral-900 leading-tight">
                  {text.formTitle}
                </h3>
                <p className="text-[14px] leading-relaxed text-neutral-500 font-medium font-montserrat">
                  {text.formSubtitle}
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-6">

                {/* Two Column Grid on Tablet/Desktop for name & email */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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

                {/* Two Column Grid on Tablet/Desktop for mobile & subject */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label htmlFor="mobile" className="text-[14px] font-bold text-neutral-800 flex items-center gap-1.5">
                      {text.mobile} <span className="text-neutral-400 text-[12px] font-medium">({language === "bn" ? "ঐচ্ছিক" : "Optional"})</span>
                    </label>
                    <div className="flex rounded-lg border border-neutral-200 focus-within:border-brand-red focus-within:ring-1 focus-within:ring-brand-red transition-all bg-neutral-50/50 overflow-hidden">
                      <select
                        aria-label="Country Code"
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="bg-neutral-100 pl-1 py-3 border-r border-neutral-200 text-[13px] focus:outline-hidden text-neutral-700 font-medium cursor-pointer"
                      >
                        {COUNTRY_CODES.map((item) => (
                          <option key={`${item.country}-${item.code}`} value={item.code}>
                            {item.country} ({item.code})
                          </option>
                        ))}
                      </select>
                      <input
                        id="mobile"
                        type="tel"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        placeholder={text.placeholderMobile}
                        className="w-full px-4 pl-1 py-3 bg-transparent focus:outline-hidden text-[15px]"
                      />
                    </div>
                  </div>

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
