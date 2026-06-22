/**
 * Type representing a nested list within a privacy policy section.
 */
export interface PolicyListGroup {
  subtitle?: string;
  items: string[];
}

/**
 * Type representing a section of the privacy policy.
 */
export interface PolicySection {
  id: string;
  title: string;
  paragraphs: string[];
  lists?: PolicyListGroup[];
}

/**
 * Type representing the full translated content structure of the privacy policy.
 */
export interface PrivacyPolicyData {
  title: string;
  companyName: string;
  effectiveDateLabel: string;
  effectiveDate: string;
  lastUpdatedLabel: string;
  lastUpdated: string;
  sections: PolicySection[];
  footerNote: string;
}

/**
 * Multi-lingual Privacy Policy Content for SEECO Power Limited.
 * Contains identical structured translation schemas in both English and Bangla.
 */
export const privacyPolicyContent: Record<"en" | "bn", PrivacyPolicyData> = {
  en: {
    title: "Privacy Policy",
    companyName: "SEECO Power Limited",
    effectiveDateLabel: "Effective Date",
    effectiveDate: "June 01, 2026",
    lastUpdatedLabel: "Last Updated",
    lastUpdated: "June 20, 2026",
    sections: [
      {
        id: "introduction",
        title: "1. Introduction",
        paragraphs: [
          'SEECO Power Limited ("SEECO", "Company", "we", "our", or "us") is committed to protecting the privacy and security of personal information entrusted to us by our customers, suppliers, employees, business partners, website visitors, and other stakeholders.',
          "This Privacy Policy explains how SEECO Power Limited collects, uses, stores, processes, shares, and protects personal information in connection with our business activities, products, services, website, and communications.",
          "By accessing our website, communicating with us, or using our services, you acknowledge that you have read and understood this Privacy Policy."
        ]
      },
      {
        id: "information-we-collect",
        title: "2. Information We Collect",
        paragraphs: ["SEECO Power Limited may collect the following categories of information:"],
        lists: [
          {
            subtitle: "A. Personal Information",
            items: [
              "Full name",
              "Designation and job title",
              "Company/organization name",
              "Postal address",
              "Email address",
              "Telephone and mobile numbers",
              "National identification information (where required by law)",
              "Business registration details"
            ]
          },
          {
            subtitle: "B. Business Information",
            items: [
              "Tender and procurement information",
              "Contractual documentation",
              "Purchase orders and invoices",
              "Supplier and customer records",
              "Banking and payment information"
            ]
          },
          {
            subtitle: "C. Technical Information (automatically collected when you visit our website)",
            items: [
              "IP address",
              "Browser type and version",
              "Operating system",
              "Device information",
              "Website usage statistics",
              "Date and time of access",
              "Referring website information"
            ]
          },
          {
            subtitle: "D. Communication Information",
            items: [
              "Emails and correspondence",
              "Customer inquiries and feedback",
              "Technical support requests",
              "Meeting records and business communications"
            ]
          }
        ]
      },
      {
        id: "how-we-collect-information",
        title: "3. How We Collect Information",
        paragraphs: ["We may collect information through various channels, including:"],
        lists: [
          {
            items: [
              "Direct communications with customers and suppliers",
              "Website contact forms",
              "Email correspondence",
              "Telephone conversations",
              "Business meetings and events",
              "Employment applications",
              "Vendor registration processes",
              "Contractual and procurement activities",
              "Cookies and website analytics tools"
            ]
          }
        ]
      },
      {
        id: "purpose-of-information-collection",
        title: "4. Purpose of Information Collection",
        paragraphs: ["SEECO Power Limited collects and processes information for the following purposes:"],
        lists: [
          {
            subtitle: "Business Operations",
            items: [
              "Providing products and services",
              "Processing orders and inquiries",
              "Managing customer relationships",
              "Managing supplier relationships",
              "Conducting procurement and tender activities"
            ]
          },
          {
            subtitle: "Contract Administration",
            items: [
              "Contract preparation and execution",
              "Project management",
              "Delivery coordination",
              "Billing and payment processing"
            ]
          },
          {
            subtitle: "Customer Support",
            items: [
              "Responding to inquiries",
              "Technical support services",
              "Warranty and after-sales support",
              "Complaint resolution"
            ]
          },
          {
            subtitle: "Legal and Regulatory Compliance",
            items: [
              "Compliance with applicable laws and regulations",
              "Tax and financial reporting",
              "Regulatory requirements",
              "Audit and compliance activities"
            ]
          },
          {
            subtitle: "Website Management",
            items: [
              "Website administration",
              "Improving website functionality",
              "Monitoring website performance",
              "Enhancing user experience"
            ]
          },
          {
            subtitle: "Marketing and Communication",
            items: [
              "Providing company updates",
              "Sharing product information",
              "Sending newsletters and announcements",
              "Inviting stakeholders to events and exhibitions"
            ]
          }
        ]
      },
      {
        id: "legal-basis-for-processing",
        title: "5. Legal Basis for Processing Information",
        paragraphs: [
          "SEECO Power Limited processes personal information based on one or more of the following lawful grounds:"
        ],
        lists: [
          {
            items: [
              "Consent provided by the individual",
              "Performance of contractual obligations",
              "Compliance with legal obligations",
              "Protection of legitimate business interests",
              "Establishment, exercise, or defense of legal claims"
            ]
          }
        ]
      },
      {
        id: "information-sharing-and-disclosure",
        title: "6. Information Sharing and Disclosure",
        paragraphs: [
          "SEECO Power Limited does not sell personal information to third parties.",
          "We may share information with:"
        ],
        lists: [
          {
            subtitle: "Service Providers",
            items: [
              "IT service providers",
              "Website hosting providers",
              "Professional consultants",
              "Auditors and accountants"
            ]
          },
          {
            subtitle: "Business Partners",
            items: [
              "Authorized distributors",
              "Suppliers and subcontractors",
              "Logistics and transportation providers"
            ]
          },
          {
            subtitle: "Government Authorities",
            items: [
              "Where required by law, regulation, court order, or governmental request."
            ]
          },
          {
            subtitle: "Corporate Transactions",
            items: [
              "In the event of a merger, acquisition, restructuring, or sale of business assets."
            ]
          }
        ]
      },
      {
        id: "data-security",
        title: "7. Data Security",
        paragraphs: [
          "SEECO Power Limited implements reasonable administrative, technical, and physical safeguards to protect information from unauthorized access, disclosure, alteration, destruction, misuse, or loss.",
          "Security measures may include:"
        ],
        lists: [
          {
            items: [
              "Access controls",
              "Password protection",
              "Secure servers and networks",
              "Employee confidentiality obligations",
              "Data backup procedures",
              "Cybersecurity monitoring"
            ]
          }
        ]
      },
      {
        id: "data-retention",
        title: "8. Data Retention",
        paragraphs: [
          "SEECO Power Limited retains personal information only for as long as necessary to fulfill business purposes, comply with legal obligations, resolve disputes, enforce agreements, and maintain business records.",
          "Upon expiration of the retention period, information will be securely deleted, anonymized, or destroyed."
        ]
      },
      {
        id: "cookies-and-website-technologies",
        title: "9. Cookies and Website Technologies",
        paragraphs: [
          "Our website may use cookies and similar technologies to improve website performance, remember user preferences, analyze website traffic, and enhance user experience.",
          "Users may configure their browser settings to reject cookies; however, certain website features may not function properly."
        ]
      },
      {
        id: "international-data-transfers",
        title: "10. International Data Transfers",
        paragraphs: [
          "Where necessary, information may be transferred to service providers, partners, or affiliates located in other countries.",
          "SEECO Power Limited will take reasonable measures to ensure that transferred information receives an adequate level of protection consistent with applicable laws."
        ]
      },
      {
        id: "rights-of-individuals",
        title: "11. Rights of Individuals",
        paragraphs: [
          "Subject to applicable laws, individuals may have the right to:",
          "Requests may be submitted using the contact details provided below."
        ],
        lists: [
          {
            items: [
              "Access personal information",
              "Correct inaccurate information",
              "Request deletion of information",
              "Restrict processing activities",
              "Object to certain processing activities",
              "Withdraw consent where applicable",
              "Request a copy of personal information"
            ]
          }
        ]
      },
      {
        id: "childrens-privacy",
        title: "12. Children's Privacy",
        paragraphs: [
          "SEECO Power Limited's products, services, and website are not intended for children under the age of 18.",
          "We do not knowingly collect personal information from children. If such information is identified, appropriate steps will be taken to remove it."
        ]
      },
      {
        id: "third-party-websites",
        title: "13. Third-Party Websites",
        paragraphs: [
          "Our website may contain links to third-party websites.",
          "SEECO Power Limited is not responsible for the privacy practices, policies, or content of external websites. Users are encouraged to review the privacy policies of those websites separately."
        ]
      },
      {
        id: "employee-and-recruitment",
        title: "14. Employee and Recruitment Information",
        paragraphs: [
          "For employment applications and employee management, SEECO Power Limited may collect information necessary for:",
          "Such information will be handled in accordance with applicable employment and privacy laws."
        ],
        lists: [
          {
            items: [
              "Recruitment and hiring",
              "Employment administration",
              "Payroll processing",
              "Performance management",
              "Training and development",
              "Legal and regulatory compliance"
            ]
          }
        ]
      },
      {
        id: "changes-to-policy",
        title: "15. Changes to This Privacy Policy",
        paragraphs: [
          "SEECO Power Limited reserves the right to amend or update this Privacy Policy at any time.",
          "Any changes will be posted on our website with an updated effective date. Continued use of our services after such updates constitutes acceptance of the revised policy."
        ]
      },
      {
        id: "contact-information",
        title: "16. Contact Information",
        paragraphs: [
          "For questions, requests, or concerns regarding this Privacy Policy or the handling of personal information, please contact:"
        ],
        lists: [
          {
            subtitle: "SEECO Power Limited",
            items: [
              "Corporate Office: Ekuria Tila Bari, South Keranigonj, Dhaka-1311, Bangladesh",
              "Phone: +88 01714-102859 / +88 01818-430308",
              "Email: info@seecopowerlimited.com",
              "Website: www.seecopowerlimited.com"
            ]
          }
        ]
      },
      {
        id: "consent",
        title: "17. Consent",
        paragraphs: [
          "By accessing our website, engaging with our services, submitting information, or conducting business with SEECO Power Limited, you consent to the collection, use, processing, and disclosure of information as described in this Privacy Policy."
        ]
      }
    ],
    footerNote: "SEECO Power Limited - Committed to Privacy, Security, Transparency, and Responsible Business Practices."
  },
  bn: {
    title: "প্রাইভেসি পলিসি",
    companyName: "সিকো পাওয়ার লিমিটেড",
    effectiveDateLabel: "কার্যকরী তারিখ",
    effectiveDate: "১ জুন, ২০২৬",
    lastUpdatedLabel: "সর্বশেষ আপডেট",
    lastUpdated: "২০ জুন, ২০২৬",
    sections: [
      {
        id: "introduction",
        title: "১. সূচনা",
        paragraphs: [
          'সিকো পাওয়ার লিমিটেড ("SEECO", "কোম্পানি", "আমরা", "আমাদের") আমাদের গ্রাহক, সরবরাহকারী, কর্মচারী, ব্যবসায়িক অংশীদার, ওয়েবসাইট পরিদর্শক এবং অন্যান্য অংশীজনদের দ্বারা আমাদের ওপর ন্যস্ত ব্যক্তিগত তথ্যের গোপনীয়তা এবং নিরাপত্তা রক্ষায় প্রতিশ্রুতিবদ্ধ।',
          "এই প্রাইভেসি পলিসি ব্যাখ্যা করে যে কীভাবে সিকো পাওয়ার লিমিটেড আমাদের ব্যবসায়িক কার্যক্রম, পণ্য, পরিষেবা, ওয়েবসাইট এবং যোগাযোগের ক্ষেত্রে ব্যক্তিগত তথ্য সংগ্রহ, ব্যবহার, সংরক্ষণ, প্রক্রিয়া, ভাগ এবং সুরক্ষিত করে।",
          "আমাদের ওয়েবসাইট অ্যাক্সেস করার মাধ্যমে, আমাদের সাথে যোগাযোগ করার মাধ্যমে বা আমাদের পরিষেবাগুলো ব্যবহার করার মাধ্যমে, আপনি স্বীকার করছেন যে আপনি এই প্রাইভেসি পলিসিটি পড়েছেন এবং বুঝতে পেরেছেন।"
        ]
      },
      {
        id: "information-we-collect",
        title: "২. আমরা যে তথ্য সংগ্রহ করি",
        paragraphs: ["সিকো পাওয়ার লিমিটেড নিম্নলিখিত শ্রেণীর তথ্য সংগ্রহ করতে পারে:"],
        lists: [
          {
            subtitle: "ক. ব্যক্তিগত তথ্য",
            items: [
              "পূর্ণ নাম",
              "পদবি এবং কাজের খেতাব",
              "কোম্পানি/প্রতিষ্ঠানের নাম",
              "ডাক ঠিকানা",
              "ইমেল ঠিকানা",
              "টেলিফোন এবং মোবাইল নম্বর",
              "জাতীয় পরিচয়পত্র সংক্রান্ত তথ্য (যেখানে আইন দ্বারা প্রয়োজনীয়)",
              "ব্যবসায়িক নিবন্ধনের বিবরণ"
            ]
          },
          {
            subtitle: "খ. ব্যবসায়িক তথ্য",
            items: [
              "দরপত্র এবং সংগ্রহ সংক্রান্ত তথ্য",
              "চুক্তিভিত্তিক নথিপত্র",
              "ক্রয় আদেশ এবং চালান",
              "সরবরাহকারী এবং গ্রাহকের রেকর্ড",
              "ব্যাংকিং এবং পেমেন্টের তথ্য"
            ]
          },
          {
            subtitle: "গ. প্রযুক্তিগত তথ্য (আমাদের ওয়েবসাইট ভিজিট করার সময় স্বয়ংক্রিয়ভাবে সংগৃহীত)",
            items: [
              "আইপি ঠিকানা",
              "ব্রাউজারের ধরন এবং সংস্করণ",
              "অপারেটিং সিস্টেম",
              "ডিভাইসের তথ্য",
              "ওয়েবসাইট ব্যবহারের পরিসংখ্যান",
              "অ্যাক্সেসের তারিখ ও সময়",
              "রেফারিং ওয়েবসাইটের তথ্য"
            ]
          },
          {
            subtitle: "ঘ. যোগাযোগের তথ্য",
            items: [
              "ইমেল এবং চিঠিপত্র",
              "গ্রাহকের অনুসন্ধান এবং প্রতিক্রিয়া",
              "প্রযুক্তিগত সহায়তার অনুরোধ",
              "সভার রেকর্ড এবং ব্যবসায়িক যোগাযোগ"
            ]
          }
        ]
      },
      {
        id: "how-we-collect-information",
        title: "৩. আমরা কীভাবে তথ্য সংগ্রহ করি",
        paragraphs: ["আমরা বিভিন্ন উপায়ে তথ্য সংগ্রহ করতে পারি, যার মধ্যে রয়েছে:"],
        lists: [
          {
            items: [
              "গ্রাহক ও সরবরাহকারীদের সাথে সরাসরি যোগাযোগ",
              "ওয়েবসাইট কন্টাক্ট ফর্ম",
              "ইমেল চিঠিপত্র",
              "টেলিফোনে কথোপকথন",
              "ব্যবসায়িক সভা এবং ইভেন্ট",
              "চাকরির আবেদন",
              "ভেন্ডর নিবন্ধন প্রক্রিয়া",
              "চুক্তিভিত্তিক এবং সংগ্রহ সংক্রান্ত কার্যক্রম",
              "কুকিজ এবং ওয়েবসাইট অ্যানালিটিক্স টুলস"
            ]
          }
        ]
      },
      {
        id: "purpose-of-information-collection",
        title: "৪. তথ্য সংগ্রহের উদ্দেশ্য",
        paragraphs: ["সিকো পাওয়ার লিমিটেড নিম্নলিখিত উদ্দেশ্যে তথ্য সংগ্রহ এবং প্রক্রিয়াকরণ করে:"],
        lists: [
          {
            subtitle: "ব্যবসায়িক কার্যক্রম",
            items: [
              "পণ্য ও সেবা প্রদান",
              "অর্ডার ও অনুসন্ধান প্রক্রিয়াকরণ",
              "গ্রাহক সম্পর্ক ব্যবস্থাপনা",
              "সরবরাহকারী সম্পর্ক ব্যবস্থাপনা",
              "ক্রয় ও দরপত্র কার্যক্রম পরিচালনা"
            ]
          },
          {
            subtitle: "চুক্তি প্রশাসন",
            items: [
              "চুক্তি প্রস্তুত এবং সম্পাদন",
              "প্রকল্প ব্যবস্থাপনা",
              "ডেলিভারি সমন্বয়",
              "বিলিং এবং পেমেন্ট প্রক্রিয়াকরণ"
            ]
          },
          {
            subtitle: "গ্রাহক সেবা",
            items: [
              "অনুসন্ধানের উত্তর দেওয়া",
              "প্রযুক্তিগত সহায়তা সেবা",
              "ওয়ারেন্টি এবং বিক্রয়োত্তর সেবা",
              "অভিযোগ নিষ্পত্তি"
            ]
          },
          {
            subtitle: "আইনি এবং নিয়ন্ত্রক সম্মতি",
            items: [
              "প্রযোজ্য আইন ও প্রবিধান মেনে চলা",
              "কর এবং আর্থিক রিপোর্টিং",
              "নিয়ন্ত্রক প্রয়োজনীয়তা",
              "অডিট এবং সম্মতি কার্যক্রম"
            ]
          },
          {
            subtitle: "ওয়েবসাইট ব্যবস্থাপনা",
            items: [
              "ওয়েবসাইট প্রশাসন",
              "ওয়েবসাইটের কার্যকারিতা উন্নত করা",
              "ওয়েবসাইটের কর্মক্ষমতা পর্যবেক্ষণ",
              "গ্রাহক অভিজ্ঞতা বৃদ্ধি"
            ]
          },
          {
            subtitle: "মার্কেটিং এবং যোগাযোগ",
            items: [
              "কোম্পানির আপডেট প্রদান",
              "পণ্যের তথ্য শেয়ার করা",
              "নিউজলেটার এবং ঘোষণা পাঠানো",
              "স্টেকহোল্ডারদের ইভেন্ট এবং প্রদর্শনীতে আমন্ত্রণ জানানো"
            ]
          }
        ]
      },
      {
        id: "legal-basis-for-processing",
        title: "৫. তথ্য প্রক্রিয়াকরণের আইনি ভিত্তি",
        paragraphs: [
          "সিকো পাওয়ার লিমিটেড নিম্নলিখিত এক বা একাধিক আইনি ভিত্তির ওপর নির্ভর করে ব্যক্তিগত তথ্য প্রক্রিয়া করে:"
        ],
        lists: [
          {
            items: [
              "সংশ্লিষ্ট ব্যক্তির দ্বারা প্রদত্ত সম্মতি",
              "চুক্তিভিত্তিক বাধ্যবাধকতা সম্পাদন",
              "আইনি বাধ্যবাধকতা মেনে চলা",
              "কোম্পানির বৈধ ব্যবসায়িক স্বার্থ রক্ষা",
              "আইনি দাবি প্রতিষ্ঠা, প্রয়োগ বা প্রতিরক্ষা"
            ]
          }
        ]
      },
      {
        id: "information-sharing-and-disclosure",
        title: "৬. তথ্য আদান-প্রদান এবং প্রকাশ",
        paragraphs: [
          "সিকো পাওয়ার লিমিটেড কোনো তৃতীয় পক্ষের কাছে ব্যক্তিগত তথ্য বিক্রি করে না।",
          "আমরা নিম্নলিখিত পক্ষগুলোর সাথে তথ্য শেয়ার করতে পারি:"
        ],
        lists: [
          {
            subtitle: "সেবা প্রদানকারী",
            items: [
              "আইটি সেবা প্রদানকারী",
              "ওয়েবসাইট হোস্টিং প্রদানকারী",
              "পেশাদার পরামর্শদাতা",
              "অডিটর এবং হিসাবরক্ষক"
            ]
          },
          {
            subtitle: "ব্যবসায়িক অংশীদার",
            items: [
              "অনুমোদিত পরিবেশক",
              "সরবরাহকারী এবং উপ-ঠিকাদার",
              "লজিস্টিকস এবং পরিবহন প্রদানকারী"
            ]
          },
          {
            subtitle: "সরকারি কর্তৃপক্ষ",
            items: [
              "যেখানে আইন, প্রবিধান, আদালতের আদেশ বা সরকারি অনুরোধের দ্বারা প্রয়োজনীয়।"
            ]
          },
          {
            subtitle: "কর্পোরেট লেনদেন",
            items: [
              "একত্রীকরণ, অধিগ্রহণ, পুনর্গঠন বা ব্যবসায়িক সম্পদ বিক্রয়ের ক্ষেত্রে।"
            ]
          }
        ]
      },
      {
        id: "data-security",
        title: "৭. তথ্য নিরাপত্তা",
        paragraphs: [
          "অননুমোদিত অ্যাক্সেস, প্রকাশ, পরিবর্তন, ধ্বংস, অপব্যবহার বা ক্ষতি থেকে তথ্য রক্ষা করার জন্য সিকো পাওয়ার লিমিটেড যুক্তিসঙ্গত প্রশাসনিক, প্রযুক্তিগত এবং শারীরিক সুরক্ষা ব্যবস্থা প্রয়োগ করে।",
          "নিরাপত্তা ব্যবস্থার মধ্যে অন্তর্ভুক্ত থাকতে পারে:"
        ],
        lists: [
          {
            items: [
              "অ্যাক্সেস নিয়ন্ত্রণ",
              "পাসওয়ার্ড সুরক্ষা",
              "নিরাপদ সার্ভার এবং নেটওয়ার্ক",
              "কর্মচারীদের গোপনীয়তার বাধ্যবাধকতা",
              "ডাটা ব্যাকআপ প্রক্রিয়া",
              "সাইবার নিরাপত্তা পর্যবেক্ষণ"
            ]
          }
        ]
      },
      {
        id: "data-retention",
        title: "৮. তথ্য সংরক্ষণ",
        paragraphs: [
          "সিকো পাওয়ার লিমিটেড ব্যবসায়িক উদ্দেশ্য পূরণ, আইনি বাধ্যবাধকতা মেনে চলা, বিরোধ নিষ্পত্তি, চুক্তি কার্যকর করা এবং ব্যবসায়িক রেকর্ড বজায় রাখার জন্য যতটুকু সময় প্রয়োজন ততটুকু সময়ের জন্য ব্যক্তিগত তথ্য সংরক্ষণ করে।",
          "সংরক্ষণের সময়কাল শেষ হওয়ার পরে, তথ্যগুলো নিরাপদে মুছে ফেলা, বেনামী করা বা ধ্বংস করা হবে।"
        ]
      },
      {
        id: "cookies-and-website-technologies",
        title: "৯. কুকিজ এবং ওয়েবসাইট প্রযুক্তি",
        paragraphs: [
          "আমাদের ওয়েবসাইটটির কর্মক্ষমতা উন্নত করতে, ব্যবহারকারীর পছন্দগুলো মনে রাখতে, ওয়েবসাইটের ট্রাফিক বিশ্লেষণ করতে এবং ব্যবহারকারীর অভিজ্ঞতা উন্নত করতে কুকিজ এবং অনুরূপ প্রযুক্তি ব্যবহার করতে পারে।",
          "ব্যবহারকারীরা কুকিজ প্রত্যাখ্যান করার জন্য তাদের ব্রাউজার সেটিংস কনফিগার করতে পারেন; তবে, কিছু ওয়েবসাইট বৈশিষ্ট্য সঠিকভাবে কাজ নাও করতে পারে।"
        ]
      },
      {
        id: "international-data-transfers",
        title: "১০. আন্তর্জাতিক তথ্য স্থানান্তর",
        paragraphs: [
          "যেখানে প্রয়োজন, অন্য দেশে অবস্থিত সেবা প্রদানকারী, অংশীদার বা সহযোগীদের কাছে তথ্য স্থানান্তর করা হতে পারে।",
          "সিকো পাওয়ার লিমিটেড নিশ্চিত করতে যুক্তিসঙ্গত ব্যবস্থা গ্রহণ করবে যে স্থানান্তরিত তথ্য প্রযোজ্য আইনের সাথে সামঞ্জস্যপূর্ণ একটি পর্যাপ্ত স্তরের সুরক্ষা পাবে।"
        ]
      },
      {
        id: "rights-of-individuals",
        title: "১১. ব্যক্তির অধিকারসমূহ",
        paragraphs: [
          "প্রযোজ্য আইনের সাপেক্ষে, ব্যক্তিদের নিম্নলিখিত অধিকার থাকতে পারে:",
          "নীচে দেওয়া যোগাযোগের বিবরণ ব্যবহার করে অনুরোধ জমা দেওয়া যেতে পারে।"
        ],
        lists: [
          {
            items: [
              "ব্যক্তিগত তথ্য অ্যাক্সেস করা",
              "ভুল তথ্য সংশোধন করা",
              "তথ্য মুছে ফেলার অনুরোধ করা",
              "প্রক্রিয়াকরণ কার্যক্রম সীমিত করা",
              "কিছু প্রক্রিয়াকরণ কার্যক্রমে আপত্তি জানানো",
              "প্রযোজ্য ক্ষেত্রে সম্মতি প্রত্যাহার করা",
              "ব্যক্তিগত তথ্যের একটি অনুলিপি অনুরোধ করা"
            ]
          }
        ]
      },
      {
        id: "childrens-privacy",
        title: "১২. শিশুদের গোপনীয়তা",
        paragraphs: [
          "সিকো পাওয়ার লিমিটেড-এর পণ্য, পরিষেবা এবং ওয়েবসাইট ১৮ বছরের কম বয়সী শিশুদের জন্য উদ্দিষ্ট নয়।",
          "আমরা জেনেশুনে শিশুদের কাছ থেকে ব্যক্তিগত তথ্য সংগ্রহ করি না। যদি এই ধরনের তথ্য সনাক্ত করা হয়, তবে তা অপসারণের জন্য উপযুক্ত পদক্ষেপ নেওয়া হবে।"
        ]
      },
      {
        id: "third-party-websites",
        title: "১৩. তৃতীয় পক্ষের ওয়েবসাইট",
        paragraphs: [
          "আমাদের ওয়েবসাইটে তৃতীয় পক্ষের ওয়েবসাইটের লিঙ্ক থাকতে পারে।",
          "সিকো পাওয়ার লিমিটেড বাহ্যিক ওয়েবসাইটের গোপনীয়তা অনুশীলন, নীতি বা বিষয়বস্তুর জন্য দায়ী নয়। ব্যবহারকারীদের আলাদাভাবে সেই ওয়েবসাইটগুলোর গোপনীয়তা নীতি পর্যালোচনা করতে উত্সাহিত করা হচ্ছে।"
        ]
      },
      {
        id: "employee-and-recruitment",
        title: "১৪. কর্মচারী এবং নিয়োগ সংক্রান্ত তথ্য",
        paragraphs: [
          "চাকরির আবেদন এবং কর্মচারী ব্যবস্থাপনার জন্য, সিকো পাওয়ার লিমিটেড নিম্নলিখিত ক্ষেত্রে প্রয়োজনীয় তথ্য সংগ্রহ করতে পারে:",
          "এই ধরনের তথ্য প্রযোজ্য কর্মসংস্থান এবং গোপনীয়তা আইন অনুসারে পরিচালনা করা হবে।"
        ],
        lists: [
          {
            items: [
              "নিয়োগ এবং নিয়োগের প্রক্রিয়া",
              "কর্মসংস্থান প্রশাসন",
              "বেতন প্রক্রিয়াকরণ",
              "কর্মক্ষমতা ব্যবস্থাপনা",
              "প্রশিক্ষণ ও উন্নয়ন",
              "আইনি ও নিয়ন্ত্রক সম্মতি"
            ]
          }
        ]
      },
      {
        id: "changes-to-policy",
        title: "১৫. এই প্রাইভেসি পলিসির পরিবর্তন",
        paragraphs: [
          "সিকো পাওয়ার লিমিটেড যেকোনো সময় এই প্রাইভেসি পলিসি সংশোধন বা আপডেট করার অধিকার সংরক্ষণ করে।",
          "যেকোনো পরিবর্তন আপডেট করা কার্যকর তারিখ সহ আমাদের ওয়েবসাইটে পোস্ট করা হবে। এই ধরনের আপডেটের পরে আমাদের পরিষেবাগুলোর অবিরত ব্যবহার সংশোধিত পলিসির স্বীকৃতি হিসেবে গণ্য হবে।"
        ]
      },
      {
        id: "contact-information",
        title: "১৬. যোগাযোগের তথ্য",
        paragraphs: [
          "এই প্রাইভেসি পলিসি বা ব্যক্তিগত তথ্য পরিচালনার বিষয়ে প্রশ্ন, অনুরোধ বা উদ্বেগের জন্য, অনুগ্রহ করে যোগাযোগ করুন:"
        ],
        lists: [
          {
            subtitle: "সিকো পাওয়ার লিমিটেড",
            items: [
              "কর্পোরেট অফিস: ইকুরিয়া টিলা বাড়ি, দক্ষিণ কেরানীগঞ্জ, ঢাকা- ১৩১১, বাংলাদেশ",
              "ফোন: +৮৮ ০১৭১৪-১০২৮৫৯ / +৮৮ ০১৮১৮-৪৩০৩০৮",
              "ইমেল: info@seecopowerlimited.com",
              "ওয়েবসাইট: www.seecopowerlimited.com"
            ]
          }
        ]
      },
      {
        id: "consent",
        title: "১৭. সম্মতি",
        paragraphs: [
          "আমাদের ওয়েবসাইট অ্যাক্সেস করার মাধ্যমে, আমাদের পরিষেবাগুলোর সাথে জড়িত হয়ে, তথ্য জমা দেওয়ার মাধ্যমে বা সিকো পাওয়ার লিমিটেড-এর সাথে ব্যবসা পরিচালনার মাধ্যমে, আপনি এই প্রাইভেসি পলিসিতে বর্ণিত তথ্য সংগ্রহ, ব্যবহার, প্রক্রিয়াকরণ এবং প্রকাশের ক্ষেত্রে সম্মতি দিচ্ছেন।"
        ]
      }
    ],
    footerNote: "সিকো পাওয়ার লিমিটেড - গোপনীয়তা, নিরাপত্তা, স্বচ্ছতা এবং দায়িত্বশীল ব্যবসায়িক অনুশীলনের প্রতি প্রতিশ্রুতিবদ্ধ।"
  }
};
