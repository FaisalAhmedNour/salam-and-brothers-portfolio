import { PrivacyPolicyData } from "../privacy-policy/content";

/**
 * Multi-lingual Return Policy Content for SEECO Power Limited.
 * Contains identical structured translation schemas in both English and Bangla.
 */
export const returnPolicyContent: Record<"en" | "bn", PrivacyPolicyData> = {
  en: {
    title: "Return Policy",
    companyName: "SEECO Power Limited",
    effectiveDateLabel: "Effective Date",
    effectiveDate: "June 01, 2026",
    lastUpdatedLabel: "Last Updated",
    lastUpdated: "June 20, 2026",
    sections: [
      {
        id: "eligibility",
        title: "1. Eligibility for Return",
        paragraphs: [
          "SEECO Power Limited is committed to supplying high-quality transformers and electrical equipment that comply with applicable technical specifications and quality standards. Due to the customized and engineered nature of our products, returns shall be governed by the following conditions:",
          "Products may be considered for return only if:"
        ],
        lists: [
          {
            items: [
              "The delivered product differs from the approved purchase order or technical specification.",
              "Manufacturing defects are identified during the warranty period.",
              "The product is damaged during transportation and such damage is reported immediately upon receipt.",
              "The product is found non-functional due to manufacturing faults confirmed by SEECO Power Limited."
            ]
          }
        ]
      },
      {
        id: "non-returnable",
        title: "2. Non-Returnable Items",
        paragraphs: [
          "The following products are generally not eligible for return:"
        ],
        lists: [
          {
            items: [
              "Custom-designed or made-to-order transformers.",
              "Products that have been installed, modified, repaired, or altered without written authorization from SEECO Power Limited.",
              "Products damaged due to improper handling, storage, installation, operation, overloading, accidents, or force majeure events.",
              "Products returned without original identification plates, serial numbers, or inspection records."
            ]
          }
        ]
      },
      {
        id: "procedure",
        title: "3. Return Request Procedure",
        paragraphs: [
          "To request a product return, customers must follow these procedures:"
        ],
        lists: [
          {
            items: [
              "Customers must submit a written return request within 7 days of delivery for visible defects or discrepancies.",
              "Warranty-related claims must be submitted within the applicable warranty period."
            ]
          },
          {
            subtitle: "The request must include:",
            items: [
              "Purchase Order/Invoice Number",
              "Product Serial Number",
              "Description of the issue",
              "Supporting photographs and test reports (if applicable)"
            ]
          }
        ]
      },
      {
        id: "inspection",
        title: "4. Inspection and Approval",
        paragraphs: ["Guidelines for return evaluation and approvals:"],
        lists: [
          {
            items: [
              "All returned products are subject to inspection by SEECO Power Limited.",
              "Return authorization must be obtained before shipment.",
              "SEECO Power Limited reserves the right to repair, replace, or provide a credit note after technical evaluation."
            ]
          }
        ]
      },
      {
        id: "transportation",
        title: "5. Transportation",
        paragraphs: ["Liability for shipping and logistics costs:"],
        lists: [
          {
            items: [
              "For approved warranty claims resulting from manufacturing defects, transportation costs may be borne by SEECO Power Limited.",
              "For all other approved returns, transportation and associated costs shall be borne by the customer unless otherwise agreed in writing."
            ]
          }
        ]
      },
      {
        id: "refunds",
        title: "6. Refunds and Replacements",
        paragraphs: ["Approved returns may be resolved through:"],
        lists: [
          {
            items: [
              "Repair of the product;",
              "Replacement with an equivalent product; or",
              "Credit adjustment against future purchases."
            ]
          },
          {
            subtitle: "Cash Refunds",
            items: [
              "Cash refunds are generally not applicable unless specifically approved by management."
            ]
          }
        ]
      },
      {
        id: "warranty-reference",
        title: "7. Warranty Reference",
        paragraphs: [
          "All return claims shall be subject to the warranty terms and conditions specified in the sales contract, purchase order, or warranty certificate issued by SEECO Power Limited.",
          "SEECO Power Limited reserves the right to amend this Return Policy without prior notice."
        ]
      }
    ],
    footerNote: "SEECO Power Limited - Committed to Privacy, Security, Transparency, and Responsible Business Practices."
  },
  bn: {
    title: "রিটার্ন পলিসি",
    companyName: "সিকো পাওয়ার লিমিটেড",
    effectiveDateLabel: "কার্যকরী তারিখ",
    effectiveDate: "১ জুন, ২০২৬",
    lastUpdatedLabel: "সর্বশেষ আপডেট",
    lastUpdated: "২০ জুন, ২০২৬",
    sections: [
      {
        id: "eligibility",
        title: "১. রিটার্ন পাওয়ার যোগ্যতা",
        paragraphs: [
          "সিকো পাওয়ার লিমিটেড প্রযোজ্য প্রযুক্তিগত বৈশিষ্ট্য এবং মানদণ্ড মেনে উচ্চ-মানের ট্রান্সফরমার এবং বৈদ্যুতিক সরঞ্জাম সরবরাহ করতে প্রতিশ্রুতিবদ্ধ। আমাদের পণ্যগুলোর কাস্টমাইজড এবং ডিজাইন করা বৈশিষ্ট্যের কারণে, যেকোনো পণ্য ফেরত নিম্নলিখিত শর্তাবলীর দ্বারা পরিচালিত হবে:",
          "পণ্যগুলো কেবল তখনই ফেরতের জন্য বিবেচনা করা হতে পারে যদি:"
        ],
        lists: [
          {
            items: [
              "সরবরাহ করা পণ্যটি অনুমোদিত পারচেজ অর্ডার বা প্রযুক্তিগত স্পেসিফিকেশন থেকে ভিন্ন হয়।",
              "ওয়ারেন্টি মেয়াদের মধ্যে উৎপাদনগত ত্রুটি সনাক্ত করা হয়।",
              "পরিবহনের সময় পণ্যটি ক্ষতিগ্রস্ত হয় এবং পণ্য প্রাপ্তির সাথে সাথে তা রিপোর্ট করা হয়।",
              "সিকো পাওয়ার লিমিটেড দ্বারা নিশ্চিত উৎপাদন ত্রুটির কারণে পণ্যটি অকার্যকর পাওয়া যায়।"
            ]
          }
        ]
      },
      {
        id: "non-returnable",
        title: "২. ফেরত অযোগ্য পণ্যসমূহ",
        paragraphs: [
          "নিম্নলিখিত পণ্যগুলো সাধারণত ফেরতের জন্য যোগ্য নয়:"
        ],
        lists: [
          {
            items: [
              "কাস্টম-ডিজাইন করা বা অর্ডার দিয়ে তৈরি করা ট্রান্সফরমার।",
              "সিকো পাওয়ার লিমিটেড-এর লিখিত অনুমোদন ছাড়া ইনস্টল, সংশোধন, মেরামত বা পরিবর্তন করা পণ্য।",
              "অনুপযুক্ত হ্যান্ডলিং, স্টোরেজ, ইনস্টলেশন, পরিচালনা, ওভারলোডিং, দুর্ঘটনা, বা ফোর্স মেজার ঘটনার কারণে ক্ষতিগ্রস্ত পণ্য।",
              "মূল আইডেন্টিফিকেশন প্লেট, সিরিয়াল নম্বর বা পরিদর্শন রেকর্ড ছাড়া ফেরত দেওয়া পণ্য।"
            ]
          }
        ]
      },
      {
        id: "procedure",
        title: "৩. রিটার্ন অনুরোধ প্রক্রিয়া",
        paragraphs: [
          "পণ্য ফেরতের অনুরোধ করার জন্য গ্রাহকদের অবশ্যই নিম্নলিখিত পদ্ধতিগুলো অনুসরণ করতে হবে:"
        ],
        lists: [
          {
            items: [
              "গ্রাহকদের দৃশ্যমান ত্রুটি বা অসঙ্গতির জন্য ডেলিভারির ৭ দিনের মধ্যে একটি লিখিত রিটার্ন অনুরোধ জমা দিতে হবে।",
              "ওয়ারেন্টি সংক্রান্ত দাবিগুলো প্রযোজ্য ওয়ারেন্টি মেয়াদের মধ্যে জমা দিতে হবে।"
            ]
          },
          {
            subtitle: "অনুরোধে অবশ্যই অন্তর্ভুক্ত থাকতে হবে:",
            items: [
              "পারচেজ অর্ডার/চালান নম্বর",
              "পণ্যের সিরিয়াল নম্বর",
              "সমস্যার বিবরণ",
              "সহায়ক ছবি এবং টেস্ট রিপোর্ট (যদি প্রযোজ্য হয়)"
            ]
          }
        ]
      },
      {
        id: "inspection",
        title: "৪. পরিদর্শন এবং অনুমোদন",
        paragraphs: ["রিটার্ন মূল্যায়ন এবং অনুমোদনের নিয়মাবলী:"],
        lists: [
          {
            items: [
              "ফেরত আসা সমস্ত পণ্য সিকো পাওয়ার লিমিটেড দ্বারা পরিদর্শনের সাপেক্ষে থাকবে।",
              "শিপমেন্টের আগে রিটার্ন অনুমোদন সংগ্রহ করতে হবে।",
              "প্রযুক্তিগত মূল্যায়নের পরে সিকো পাওয়ার লিমিটেড পণ্য মেরামত, প্রতিস্থাপন বা ক্রেডিট নোট প্রদানের অধিকার সংরক্ষণ করে।"
            ]
          }
        ]
      },
      {
        id: "transportation",
        title: "৫. পরিবহন",
        paragraphs: ["শিপিং এবং লজিস্টিক খরচের দায়িত্ব:"],
        lists: [
          {
            items: [
              "উৎপাদনগত ত্রুটির কারণে অনুমোদিত ওয়ারেন্টি দাবির জন্য, পরিবহন খরচ সিকো পাওয়ার লিমিটেড বহন করতে পারে।",
              "অন্যান্য সমস্ত অনুমোদিত পণ্য ফেরতের ক্ষেত্রে, লিখিতভাবে অন্যথা সম্মত না হলে পরিবহন এবং সংশ্লিষ্ট খরচ গ্রাহককে বহন করতে হবে।"
            ]
          }
        ]
      },
      {
        id: "refunds",
        title: "৬. ফেরত এবং প্রতিস্থাপন",
        paragraphs: ["অনুমোদিত রিটার্নগুলো নিম্নলিখিত উপায়ে সমাধান করা যেতে পারে:"],
        lists: [
          {
            items: [
              "পণ্য মেরামত;",
              "একটি সমমানের পণ্য দিয়ে প্রতিস্থাপন; অথবা",
              "ভবিষ্যতের ক্রয়ের বিপরীতে ক্রেডিট সমন্বয়।"
            ]
          },
          {
            subtitle: "নগদ অর্থ ফেরত",
            items: [
              "ব্যবস্থাপনা কর্তৃপক্ষ দ্বারা বিশেষভাবে অনুমোদিত না হলে নগদ অর্থ ফেরত সাধারণত প্রযোজ্য নয়।"
            ]
          }
        ]
      },
      {
        id: "warranty-reference",
        title: "৭. ওয়ারেন্টি রেফারেন্স",
        paragraphs: [
          "সমস্ত রিটার্ন দাবি বিক্রয় চুক্তি, পারচেজ অর্ডার, বা সিকো পাওয়ার লিমিটেড দ্বারা জারি করা ওয়ারেন্টি সার্টিফিকেটে নির্দিষ্ট ওয়ারেন্টি শর্তাবলীর সাপেক্ষে হবে।",
          "সিকো পাওয়ার লিমিটেড পূর্ব নোটিশ ছাড়াই এই রিটার্ন পলিসি সংশোধন করার অধিকার সংরক্ষণ করে।"
        ]
      }
    ],
    footerNote: "সিকো পাওয়ার লিমিটেড - গোপনীয়তা, নিরাপত্তা, স্বচ্ছতা এবং দায়িত্বশীল ব্যবসায়িক অনুশীলনের প্রতি প্রতিশ্রুতিবদ্ধ।"
  }
};
