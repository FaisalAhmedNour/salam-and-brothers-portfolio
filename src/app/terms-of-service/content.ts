import { PrivacyPolicyData } from "../privacy-policy/content";

/**
 * Multi-lingual Terms of Service Content for SEECO Power Limited.
 * Contains identical structured translation schemas in both English and Bangla.
 */
export const termsOfServiceContent: Record<"en" | "bn", PrivacyPolicyData> = {
  en: {
    title: "Terms of Services",
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
          'Welcome to SEECO Power Limited ("SEECO", "Company", "we", "our", or "us"). These Terms of Service ("Terms") govern your access to and use of our website, products, services, quotations, technical support, and business transactions.',
          "By accessing our website, requesting quotations, purchasing products, or engaging our services, you agree to comply with and be bound by these Terms. If you do not agree with these Terms, please refrain from using our services."
        ]
      },
      {
        id: "company-services",
        title: "2. Company Services",
        paragraphs: [
          "SEECO Power Limited is engaged in the design, manufacturing, supply, installation, testing, commissioning, maintenance, and servicing of:"
        ],
        lists: [
          {
            items: [
              "Distribution Transformers",
              "Power Transformers",
              "Pad-Mounted Transformers",
              "Substation Equipment",
              "Electrical Accessories and Components",
              "Engineering, Procurement, and Technical Consultancy Services"
            ]
          },
          {
            subtitle: "Technical Compliance",
            items: [
              "All products and services are subject to applicable technical specifications, contractual agreements, and regulatory requirements."
            ]
          }
        ]
      },
      {
        id: "quotations-and-orders",
        title: "3. Quotations and Orders",
        paragraphs: ["Our procurement and sales process follows the guidelines below:"],
        lists: [
          {
            items: [
              "All quotations issued by SEECO Power Limited are valid for the period specified in the quotation.",
              "Submission of an inquiry or request for quotation does not create a binding contract.",
              "A binding agreement is established only after: customer acceptance of our quotation, issuance of a Purchase Order (PO), and subsequent written order confirmation by SEECO Power Limited.",
              "SEECO reserves the right to reject or cancel any order before formal acceptance."
            ]
          }
        ]
      },
      {
        id: "product-specifications",
        title: "4. Product Specifications",
        paragraphs: ["Information regarding product designs and documentation specifications:"],
        lists: [
          {
            items: [
              "Product specifications, drawings, images, catalogues, and technical documents are provided for informational purposes only.",
              "SEECO may modify product designs or specifications without prior notice to improve quality, safety, or performance.",
              "Final specifications shall be those explicitly stated in the approved contract, purchase order, or technical agreement."
            ]
          }
        ]
      },
      {
        id: "pricing-and-payment",
        title: "5. Pricing and Payment",
        paragraphs: ["Financial structures, pricing terms, and payment delays:"],
        lists: [
          {
            items: [
              "Prices are subject to change without prior notice unless otherwise agreed in writing.",
              "Payments shall be made according to the agreed payment terms stated in the quotation, contract, or invoice.",
              "Delayed payments may result in suspension of production or delivery, late payment charges, or cancellation of pending orders.",
              "All applicable taxes, duties, VAT, customs charges, and government fees shall be borne by the customer unless otherwise specified."
            ]
          }
        ]
      },
      {
        id: "delivery-and-shipping",
        title: "6. Delivery and Shipping",
        paragraphs: ["Shipping schedules, constraints, and risk transfers:"],
        lists: [
          {
            items: [
              "Delivery schedules are estimates only and may be affected by raw material availability, transportation constraints, government restrictions, or force majeure events.",
              "SEECO shall not be liable for delays caused by circumstances beyond its reasonable control.",
              "Risk of loss or damage transfers to the customer upon delivery or dispatch as agreed in the contract."
            ]
          }
        ]
      },
      {
        id: "inspection-and-acceptance",
        title: "7. Inspection and Acceptance",
        paragraphs: ["Guidelines for product delivery inspection and acceptance periods:"],
        lists: [
          {
            items: [
              "Customers are encouraged to inspect products upon delivery.",
              "Any visible defects, shortages, or damages must be reported within seven (7) days of receipt.",
              "Failure to notify SEECO within the specified period shall constitute acceptance of the products."
            ]
          }
        ]
      },
      {
        id: "warranty",
        title: "8. Warranty",
        paragraphs: [
          "SEECO Power Limited warrants that its products are free from manufacturing defects under normal operating conditions.",
          "Warranty coverage shall be as specified in the applicable warranty certificate or contract.",
          "The warranty does not cover:"
        ],
        lists: [
          {
            items: [
              "Improper installation",
              "Unauthorized modifications",
              "Misuse or negligence",
              "Natural disasters",
              "Electrical faults caused by external factors"
            ]
          },
          {
            subtitle: "Warranty Claims",
            items: [
              "Warranty claims must be submitted in writing with supporting documentation."
            ]
          }
        ]
      },
      {
        id: "returns-and-replacements",
        title: "9. Returns and Replacements",
        paragraphs: ["Returned goods terms and replacements:"],
        lists: [
          {
            items: [
              "Returns are subject to SEECO's Return Policy.",
              "Customized or made-to-order products are generally non-returnable unless defective.",
              "Approved returns must be accompanied by proper documentation and authorization."
            ]
          }
        ]
      },
      {
        id: "intellectual-property",
        title: "10. Intellectual Property Rights",
        paragraphs: [
          "All content, trademarks, logos, product designs, technical drawings, catalogues, manuals, and website materials remain the exclusive property of SEECO Power Limited.",
          "No content may be copied, reproduced, distributed, modified, or used without prior written consent from SEECO."
        ]
      },
      {
        id: "user-responsibilities",
        title: "11. User Responsibilities",
        paragraphs: ["When engaging with our services, users agree to:"],
        lists: [
          {
            items: [
              "Provide accurate information.",
              "Use SEECO services for lawful purposes only.",
              "Comply with applicable laws and regulations.",
              "Not attempt unauthorized access to company systems.",
              "Not distribute malicious software or harmful content."
            ]
          }
        ]
      },
      {
        id: "limitation-of-liability",
        title: "12. Limitation of Liability",
        paragraphs: [
          "To the maximum extent permitted by law:",
          "SEECO Power Limited shall not be liable for any indirect, incidental, consequential, special, or punitive damages arising from: product use, business interruption, loss of profits, data loss, delayed delivery, or third-party actions.",
          "SEECO's total liability shall not exceed the amount paid by the customer for the specific product or service giving rise to the claim."
        ]
      },
      {
        id: "indemnification",
        title: "13. Indemnification",
        paragraphs: [
          "Customers agree to indemnify and hold harmless SEECO Power Limited, its directors, officers, employees, and representatives from any claims, damages, losses, or expenses arising from: improper use of products, violation of these Terms, or violation of applicable laws and regulations."
        ]
      },
      {
        id: "confidentiality",
        title: "14. Confidentiality",
        paragraphs: [
          "Any confidential technical, commercial, financial, or proprietary information exchanged between SEECO and customers shall be treated as confidential and shall not be disclosed without prior written consent unless required by law."
        ]
      },
      {
        id: "force-majeure",
        title: "15. Force Majeure",
        paragraphs: [
          "SEECO shall not be responsible for failure or delay in performance caused by events beyond its reasonable control, including: natural disasters, floods, fires, earthquakes, war, strikes, government actions, supply chain disruptions, pandemics, or raw material shortages."
        ]
      },
      {
        id: "termination",
        title: "16. Termination",
        paragraphs: [
          "SEECO may suspend or terminate access to its services if: a customer breaches these Terms, fraudulent activities are detected, or payment obligations are not fulfilled.",
          "Termination shall not affect accrued rights and obligations."
        ]
      },
      {
        id: "privacy",
        title: "17. Privacy",
        paragraphs: [
          "Your use of our services is also governed by the SEECO Power Limited Privacy Policy. Personal information collected by SEECO shall be handled in accordance with applicable data protection laws."
        ]
      },
      {
        id: "governing-law",
        title: "18. Governing Law and Jurisdiction",
        paragraphs: [
          "These Terms shall be governed by and construed in accordance with the laws of the People's Republic of Bangladesh.",
          "Any dispute arising out of or relating to these Terms shall be subject to the exclusive jurisdiction of the competent courts of Bangladesh."
        ]
      },
      {
        id: "changes-to-terms",
        title: "19. Changes to These Terms",
        paragraphs: [
          "SEECO Power Limited reserves the right to modify these Terms at any time. Updated versions will be posted on our website and become effective upon publication. Continued use of our services constitutes acceptance of the revised Terms."
        ]
      },
      {
        id: "contact-information",
        title: "20. Contact Information",
        paragraphs: [
          "For any questions regarding these Terms of Service, please contact us using the information below:"
        ],
        lists: [
          {
            subtitle: "SEECO Power Limited",
            items: [
              "Registered Office: Ekuria Tila Bari, South Keranigonj, Dhaka-1311, Bangladesh",
              "Phone: +88 01714-102859 / +88 01818-430308",
              "Email: info@seecopowerlimited.com",
              "Website: www.seecopowerlimited.com"
            ]
          }
        ]
      }
    ],
    footerNote: "SEECO Power Limited - Committed to Privacy, Security, Transparency, and Responsible Business Practices."
  },
  bn: {
    title: "টার্মস অফ সার্ভিস",
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
          'সিকো পাওয়ার লিমিটেড ("SEECO", "কোম্পানি", "আমরা", "আমাদের")-এ আপনাকে স্বাগতম। এই শর্তাবলী ("শর্তাবলী") আমাদের ওয়েবসাইট, পণ্য, পরিষেবা, কোটেশন, প্রযুক্তিগত সহায়তা এবং ব্যবসায়িক লেনদেনগুলোতে আপনার অ্যাক্সেস এবং ব্যবহারকে নিয়ন্ত্রণ করে।',
          "আমাদের ওয়েবসাইট অ্যাক্সেস করার মাধ্যমে, কোটেশন অনুরোধ করার মাধ্যমে, পণ্য ক্রয় করার মাধ্যমে বা আমাদের পরিষেবাগুলোতে জড়িত হওয়ার মাধ্যমে, আপনি এই শর্তাবলী মেনে চলতে এবং আবদ্ধ থাকতে সম্মত হচ্ছেন। আপনি যদি এই শর্তাবলীতে সম্মত না হন, তবে অনুগ্রহ করে আমাদের পরিষেবাগুলো ব্যবহার করা থেকে বিরত থাকুন।"
        ]
      },
      {
        id: "company-services",
        title: "২. কোম্পানির সেবাসমূহ",
        paragraphs: [
          "সিকো পাওয়ার লিমিটেড নিম্নলিখিত পণ্য ও সেবাগুলোর ডিজাইন, উৎপাদন, সরবরাহ, ইনস্টলেশন, টেস্টিং, কমিশনিং, রক্ষণাবেক্ষণ এবং মেরামতের সাথে জড়িত:"
        ],
        lists: [
          {
            items: [
              "ডিস্ট্রিবিউশন ট্রান্সফরমার",
              "পাওয়ার ট্রান্সফরমার",
              "প্যাড-মাউন্টেড ট্রান্সফরমার",
              "সাবস্টেশন সরঞ্জাম",
              "বৈদ্যুতিক এক্সেসরিজ এবং উপাদান",
              "ইঞ্জিনিয়ারিং, প্রকিউরমেন্ট এবং প্রযুক্তিগত পরামর্শ সেবা"
            ]
          },
          {
            subtitle: "প্রযুক্তিগত সম্মতি",
            items: [
              "সকল পণ্য এবং পরিষেবা প্রযোজ্য প্রযুক্তিগত বৈশিষ্ট্য, চুক্তিভিত্তিক চুক্তি এবং নিয়ন্ত্রক প্রয়োজনীয়তার সাপেক্ষে প্রদান করা হয়।"
            ]
          }
        ]
      },
      {
        id: "quotations-and-orders",
        title: "৩. কোটেশন এবং অর্ডারসমূহ",
        paragraphs: ["আমাদের ক্রয় ও বিক্রয় প্রক্রিয়া নিম্নলিখিত নিয়মাবলী অনুসরণ করে:"],
        lists: [
          {
            items: [
              "সিকো পাওয়ার লিমিটেড কর্তৃক জারি করা সমস্ত কোটেশন কোটেশনে উল্লিখিত মেয়াদের জন্য বৈধ থাকবে।",
              "অনুসন্ধান বা কোটেশনের জন্য অনুরোধ জমা দিলেই কোনো বাধ্যতামূলক চুক্তি তৈরি হয় না।",
              "একটি বাধ্যতামূলক চুক্তি কেবল তখনই প্রতিষ্ঠিত হয় যখন: গ্রাহক কর্তৃক আমাদের কোটেশন গ্রহণ করা হয়, পারচেজ অর্ডার (PO) জারি করা হয়, এবং সিকো পাওয়ার লিমিটেড কর্তৃক লিখিত অর্ডার নিশ্চিতকরণ প্রদান করা হয়।",
              "সিকো পাওয়ার লিমিটেড অর্ডার গ্রহণের আগে যেকোনো অর্ডার প্রত্যাখ্যান বা বাতিল করার অধিকার সংরক্ষণ করে।"
            ]
          }
        ]
      },
      {
        id: "product-specifications",
        title: "৪. পণ্যের স্পেসিফিকেশন",
        paragraphs: ["পণ্যের ডিজাইন এবং ডকুমেন্টেশন সম্পর্কিত নিয়মাবলী:"],
        lists: [
          {
            items: [
              "পণ্যের স্পেসিফিকেশন, ড্রয়িং, ইমেজ, ক্যাটালগ এবং প্রযুক্তিগত নথিগুলো কেবল তথ্যগত উদ্দেশ্যে সরবরাহ করা হয়।",
              "সিকো পাওয়ার লিমিটেড পণ্যের গুণমান, নিরাপত্তা বা কার্যকারিতা উন্নত করতে পূর্ব নোটিশ ছাড়াই পণ্যের ডিজাইন বা স্পেসিফিকেশন পরিবর্তন করতে পারে।",
              "চূড়ান্ত স্পেসিফিকেশনগুলো অনুমোদিত চুক্তি, পারচেজ অর্ডার বা প্রযুক্তিগত চুক্তিতে স্পষ্টভাবে উল্লিখিত বিবরণ অনুসারে হবে।"
            ]
          }
        ]
      },
      {
        id: "pricing-and-payment",
        title: "৫. মূল্য নির্ধারণ এবং পেমেন্ট",
        paragraphs: ["আর্থিক কাঠামো, মূল্য নির্ধারণের শর্তাবলী এবং বিলম্বিত পেমেন্ট:"],
        lists: [
          {
            items: [
              "লিখিতভাবে অন্যথা সম্মত না হলে পূর্ব নোটিশ ছাড়াই মূল্য পরিবর্তন সাপেক্ষ হতে পারে।",
              "কোটেশন, চুক্তি বা চালানে উল্লিখিত পেমেন্ট শর্তাবলী অনুসারে অর্থ প্রদান করতে হবে।",
              "অর্থ প্রদানে বিলম্বের ফলে উৎপাদন বা ডেলিভারি স্থগিত হতে পারে, বিলম্বিত পেমেন্ট চার্জ প্রযোজ্য হতে পারে, অথবা অমীমাংসিত অর্ডার বাতিল হতে পারে।",
              "অন্যথা নির্দিষ্ট না করা থাকলে সমস্ত প্রযোজ্য কর, শুল্ক, ভ্যাট, কাস্টমস চার্জ এবং সরকারি ফি গ্রাহককে বহন করতে হবে।"
            ]
          }
        ]
      },
      {
        id: "delivery-and-shipping",
        title: "৬. ডেলিভারি এবং শিপিং",
        paragraphs: ["শিপিং সময়সূচী, সীমাবদ্ধতা এবং ঝুঁকি হস্তান্তর:"],
        lists: [
          {
            items: [
              "ডেলিভারি সময়সূচীগুলো কেবল আনুমানিক এবং নিম্নলিখিত কারণগুলোর দ্বারা প্রভাবিত হতে পারে: কাঁচামালের প্রাপ্যতা, পরিবহন সংক্রান্ত প্রতিবন্ধকতা, সরকারি বিধিনিষেধ, বা ফোর্স মেজার বা অনিবার্য ঘটনা।",
              "সিকো পাওয়ার লিমিটেড তার যুক্তিসঙ্গত নিয়ন্ত্রণের বাইরের পরিস্থিতির কারণে সৃষ্ট বিলম্বের জন্য দায়ী থাকবে না।",
              "চুক্তিতে সম্মত হওয়া ডেলিভারি বা প্রেরণের সাথে সাথে পণ্য হারানোর বা ক্ষতির ঝুঁকি গ্রাহকের কাছে স্থানান্তরিত হয়।"
            ]
          }
        ]
      },
      {
        id: "inspection-and-acceptance",
        title: "৭. পরিদর্শন এবং গ্রহণযোগ্যতা",
        paragraphs: ["ডেলিভারি পরিদর্শন এবং গ্রহণযোগ্যতার সময়সীমা:"],
        lists: [
          {
            items: [
              "গ্রাহকদের ডেলিভারির সময় পণ্যগুলো পরিদর্শন করতে উত্সাহিত করা হচ্ছে।",
              "যেকোনো দৃশ্যমান ত্রুটি, ঘাটতি বা ক্ষতি পণ্য প্রাপ্তির সাত (৭) দিনের মধ্যে রিপোর্ট করতে হবে।",
              "নির্দিষ্ট সময়ের মধ্যে সিকো পাওয়ার লিমিটেডকে অবহিত করতে ব্যর্থ হলে তা পণ্যগুলোর গ্রহণযোগ্যতা হিসেবে গণ্য হবে।"
            ]
          }
        ]
      },
      {
        id: "warranty",
        title: "৮. ওয়ারেন্টি",
        paragraphs: [
          "সিকো পাওয়ার লিমিটেড ওয়ারেন্টি দিচ্ছে যে স্বাভাবিক পরিচালন অবস্থার অধীনে এর পণ্যগুলো উৎপাদনগত ত্রুটি থেকে মুক্ত থাকবে।",
          "ওয়ারেন্টি কভারেজ প্রযোজ্য ওয়ারেন্টি সার্টিফিকেট বা চুক্তিতে নির্দিষ্ট করা বিবরণ অনুযায়ী হবে।",
          "ওয়ারেন্টি নিম্নলিখিত বিষয়গুলো কভার করে না:"
        ],
        lists: [
          {
            items: [
              "ভুল ইনস্টলেশন",
              "অননুমোদিত পরিবর্তন",
              "অপব্যবহার বা অবহেলা",
              "প্রাকৃতিক দুর্যোগ",
              "বাহ্যিক কারণের কারণে সৃষ্ট বৈদ্যুতিক ত্রুটি"
            ]
          },
          {
            subtitle: "ওয়ারেন্টি দাবি",
            items: [
              "ওয়ারেন্টি দাবি অবশ্যই লিখিতভাবে এবং সহায়ক নথি সহ জমা দিতে হবে।"
            ]
          }
        ]
      },
      {
        id: "returns-and-replacements",
        title: "৯. ফেরত এবং প্রতিস্থাপন",
        paragraphs: ["পণ্য ফেরত এবং প্রতিস্থাপনের নিয়মাবলী:"],
        lists: [
          {
            items: [
              "পণ্য ফেরত সিকো-এর রিটার্ন পলিসির সাপেক্ষে হবে।",
              "ত্রুটিপূর্ণ না হলে কাস্টমাইজড বা অর্ডার দিয়ে তৈরি করা পণ্যগুলো সাধারণত ফেরতযোগ্য নয়।",
              "অনুমোদিত পণ্য ফেরতের সাথে উপযুক্ত নথিপত্র এবং অনুমোদন থাকতে হবে।"
            ]
          }
        ]
      },
      {
        id: "intellectual-property",
        title: "১০. মেধা সম্পদ অধিকার",
        paragraphs: [
          "সমস্ত বিষয়বস্তু, ট্রেডমার্ক, লোগো, পণ্যের ডিজাইন, প্রযুক্তিগত ড্রয়িং, ক্যাটালগ, ম্যানুয়াল এবং ওয়েবসাইট সামগ্রী সিকো পাওয়ার লিমিটেড-এর একচেটিয়া সম্পত্তি হিসেবে থাকবে।",
          "সিকো পাওয়ার লিমিটেড-এর পূর্ব লিখিত সম্মতি ছাড়া কোনো সামগ্রী কপি, পুনরুত্পাদন, বিতরণ, পরিবর্তন বা ব্যবহার করা যাবে না।"
        ]
      },
      {
        id: "user-responsibilities",
        title: "১১. ব্যবহারকারীর দায়িত্বসমূহ",
        paragraphs: ["আমাদের সেবাসমূহ ব্যবহারের সময় ব্যবহারকারীরা সম্মত হন যে তারা:"],
        lists: [
          {
            items: [
              "সঠিক তথ্য প্রদান করবেন।",
              "কেবলমাত্র বৈধ উদ্দেশ্যে সিকো-এর সেবাসমূহ ব্যবহার করবেন।",
              "প্রযোজ্য আইন ও প্রবিধান মেনে চলবেন।",
              "কোম্পানির সিস্টেমে অননুমোদিত অ্যাক্সেসের চেষ্টা করবেন না।",
              "ক্ষতিকারক সফ্টওয়্যার বা ক্ষতিকারক সামগ্রী বিতরণ করবেন না।"
            ]
          }
        ]
      },
      {
        id: "limitation-of-liability",
        title: "১২. দায় সীমাবদ্ধতা",
        paragraphs: [
          "আইন দ্বারা অনুমোদিত সর্বোচ্চ সীমা পর্যন্ত:",
          "সিকো পাওয়ার লিমিটেড নিম্নলিখিত কারণে উদ্ভূত কোনো পরোক্ষ, আনুষঙ্গিক, ফলস্বরূপ, বিশেষ বা শাস্তিমূলক ক্ষতির জন্য দায়ী থাকবে না: পণ্যের ব্যবহার, ব্যবসায়িক ব্যাঘাত, মুনাফা হারানো, তথ্য হারানো, বিলম্বিত ডেলিভারি, বা তৃতীয় পক্ষের কোনো কার্যক্রম।",
          "সিকো-এর মোট দায় দাবির জন্ম দেওয়া নির্দিষ্ট পণ্য বা পরিষেবার জন্য গ্রাহক কর্তৃক পরিশোধিত পরিমাণের বেশি হবে না।"
        ]
      },
      {
        id: "indemnification",
        title: "১৩. ক্ষতিপূরণ",
        paragraphs: [
          "গ্রাহকরা সিকো পাওয়ার লিমিটেড, এর পরিচালক, কর্মকর্তা, কর্মচারী এবং প্রতিনিধিদের নিম্নলিখিত বিষয়গুলো থেকে উদ্ভূত যেকোনো দাবি, ক্ষতি বা ব্যয় থেকে ক্ষতিপূরণ দিতে এবং অবমুক্ত রাখতে সম্মত হন: পণ্যের অনুপযুক্ত ব্যবহার, এই শর্তাবলীর লঙ্ঘন, বা প্রযোজ্য আইন ও প্রবিধানের লঙ্ঘন।"
        ]
      },
      {
        id: "confidentiality",
        title: "১৪. গোপনীয়তা",
        paragraphs: [
          "সিকো এবং গ্রাহকদের মধ্যে আদান-প্রদান করা যেকোনো গোপনীয় প্রযুক্তিগত, বাণিজ্যিক, আর্থিক বা মালিকানা সংক্রান্ত তথ্য গোপনীয় হিসেবে গণ্য করা হবে এবং আইনানুযায়ী প্রয়োজন না হলে পূর্ব লিখিত সম্মতি ছাড়া প্রকাশ করা যাবে না।"
        ]
      },
      {
        id: "force-majeure",
        title: "১৫. ফোর্স মেজার / অনিবার্য পরিস্থিতি",
        paragraphs: [
          "সিকো তার যুক্তিসঙ্গত নিয়ন্ত্রণের বাইরের ঘটনার কারণে সৃষ্ট ব্যর্থতা বা বিলম্বের জন্য দায়ী থাকবে না, যার মধ্যে রয়েছে: প্রাকৃতিক দুর্যোগ, বন্যা, আগুন, ভূমিকম্প, যুদ্ধ, ধর্মঘট, সরকারি পদক্ষেপ, সরবরাহ শৃঙ্খলে ব্যাঘাত, মহামারী, বা কাঁচামাল সংকট।"
        ]
      },
      {
        id: "termination",
        title: "১৬. অবসান",
        paragraphs: [
          "সিকো তার পরিষেবাগুলোতে অ্যাক্সেস স্থগিত বা বাতিল করতে পারে যদি: কোনো গ্রাহক এই শর্তাবলী লঙ্ঘন করেন, প্রতারণামূলক কার্যকলাপ সনাক্ত করা হয়, বা পেমেন্টের বাধ্যবাধকতা পূরণ না করা হয়।",
          "পরিষেবা অবসান অর্জিত অধিকার এবং বাধ্যবাধকতাকে প্রভাবিত করবে না।"
        ]
      },
      {
        id: "privacy",
        title: "১৭. গোপনীয়তা",
        paragraphs: [
          "আপনার আমাদের সেবাসমূহের ব্যবহার সিকো পাওয়ার লিমিটেড প্রাইভেসি পলিসি দ্বারাও পরিচালিত হয়। সিকো দ্বারা সংগৃহীত ব্যক্তিগত তথ্য প্রযোজ্য ডেটা সুরক্ষা আইন অনুসারে পরিচালনা করা হবে।"
        ]
      },
      {
        id: "governing-law",
        title: "১৮. প্রযোজ্য আইন এবং এখতিয়ার",
        paragraphs: [
          "এই শর্তাবলী গণপ্রজাতন্ত্রী বাংলাদেশের আইন অনুযায়ী পরিচালিত এবং ব্যাখ্যা করা হবে।",
          "এই শর্তাবলী থেকে উদ্ভূত বা সম্পর্কিত যেকোনো বিরোধ বাংলাদেশের উপযুক্ত আদালতের একচেটিয়া এখতিয়ারের সাপেক্ষে মীমাংসা করা হবে।"
        ]
      },
      {
        id: "changes-to-terms",
        title: "১৯. এই শর্তাবলীর পরিবর্তন",
        paragraphs: [
          "সিকো পাওয়ার লিমিটেড যেকোনো সময় এই শর্তাবলী পরিবর্তন করার অধিকার সংরক্ষণ করে। আপডেট করা সংস্করণগুলো আমাদের ওয়েবসাইটে পোস্ট করা হবে এবং প্রকাশের সাথে সাথে কার্যকর হবে। আমাদের পরিষেবাগুলোর অবিরত ব্যবহার সংশোধিত শর্তাবলীর গ্রহণযোগ্যতা হিসেবে গণ্য হবে।"
        ]
      },
      {
        id: "contact-information",
        title: "২০. যোগাযোগের তথ্য",
        paragraphs: [
          "এই শর্তাবলী সংক্রান্ত যেকোনো প্রশ্নের জন্য, অনুগ্রহ করে নিচের তথ্য ব্যবহার করে আমাদের সাথে যোগাযোগ করুন:"
        ],
        lists: [
          {
            subtitle: "সিকো পাওয়ার লিমিটেড",
            items: [
              "নিবন্ধিত অফিস: ইকুরিয়া টিলা বাড়ি, দক্ষিণ কেরানীগঞ্জ, ঢাকা- ১৩১১, বাংলাদেশ",
              "ফোন: +৮৮ ০১৭১৪-১০২৮৫৯ / +৮৮ ০১৮১৮-৪৩০৩০৮",
              "ইমেল: info@seecopowerlimited.com",
              "ওয়েবসাইট: www.seecopowerlimited.com"
            ]
          }
        ]
      }
    ],
    footerNote: "সিকো পাওয়ার লিমিটেড - গোপনীয়তা, নিরাপত্তা, স্বচ্ছতা এবং দায়িত্বশীল ব্যবসায়িক অনুশীলনের প্রতি প্রতিশ্রুতিবদ্ধ।"
  }
};
