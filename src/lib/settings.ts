import { executeQuery, isDbConfigured } from "./db";
import { promises as fs } from "fs";
import path from "path";
import { darkenColor } from "./colorUtils";
import { serializePolicyToMarkdown } from "./policyParser";
import { privacyPolicyContent } from "../app/privacy-policy/content";
import { cookiePolicyContent } from "../app/cookie-policy/content";
import { returnPolicyContent } from "../app/return-policy/content";
import { termsOfServiceContent } from "../app/terms-of-service/content";
import { unstable_cache } from "next/cache";

export { darkenColor };

export interface SpecialtyTransformer {
  en: string;
  bn: string;
}

export interface SocialLinks {
  facebook?: string;
  linkedin?: string;
  instagram?: string;
  youtube?: string;
}

export interface SiteSettings {
  primaryColor: string;
  primaryColorHover: string;
  scrollingTexts?: SpecialtyTransformer[];
  logoPath?: string;
  faviconPath?: string;
  contactCTAImagePath?: string;
  brandBannerSlogan?: {
    rightLabelEn: string;
    rightLabelBn: string;
    rightTitleEn: string;
    rightTitleBn: string;
  };
  socialLinks?: SocialLinks;
  googleMapsEmbedUrl?: string;
  aboutIntro?: {
    subtitleEn: string;
    subtitleBn: string;
    titleEn: string;
    titleBn: string;
    para1En: string;
    para1Bn: string;
    para2En: string;
    para2Bn: string;
  };
  aboutImagePath?: string;
  missionVision?: {
    missionPointsEn: string[];
    missionPointsBn: string[];
    visionTextEn: string;
    visionTextBn: string;
    valuesPointsEn: string[];
    valuesPointsBn: string[];
  };
  policies?: {
    privacyEn: string;
    privacyBn: string;
    cookieEn: string;
    cookieBn: string;
    termsEn: string;
    termsBn: string;
    returnEn: string;
    returnBn: string;
  };
  welcomeModal?: {
    active: boolean;
    imagePath: string;
    suppressionDays: number;
  };
  brandIntro?: {
    subtitleEn: string;
    subtitleBn: string;
    titleEn: string;
    titleBn: string;
    descriptionEn: string;
    descriptionBn: string;
  };
  brandBanner?: {
    leftPara1En: string;
    leftPara1Bn: string;
    leftPara2En: string;
    leftPara2Bn: string;
  };
  contactInfo?: any;
}

const UNIQUE_DEFAULT_SCROLLING_TEXTS: SpecialtyTransformer[] = [
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

const DEFAULT_SETTINGS: SiteSettings = {
  primaryColor: "#dc2626",
  primaryColorHover: "#b91c1c",
  scrollingTexts: UNIQUE_DEFAULT_SCROLLING_TEXTS,
  logoPath: "/images/SEECOI1.png",
  faviconPath: "/icon.png",
  contactCTAImagePath: "/images/transformer-maintenance.webp",
  brandBannerSlogan: {
    rightLabelEn: "Energizing Today",
    rightLabelBn: "এনার্জাইজিং টুডে",
    rightTitleEn: "Empowering Tomorrow",
    rightTitleBn: "এম্পাওয়ারিং টুমোরো",
  },
  socialLinks: {
    facebook: "https://www.facebook.com/seecopowerlimited",
    linkedin: "http://www.linkedin.com/in/seeco-power-limited-132341417",
    instagram: "https://www.instagram.com/seecopowerltd",
    youtube: "https://youtube.com/@seecopowerlimited?si=FQoSyl9caktLh6n1",
  },
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3653.7970229477864!2d90.4149776!3d23.6832157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b900021a5b69%3A0xc06a1d879677ec5!2sSEECO%20Power%20Limited!5e0!3m2!1sen!2sbd!4v1781979253429!5m2!1sen!2sbd",
  aboutIntro: {
    subtitleEn: "Powering Bangladesh's Energy Grid",
    subtitleBn: "বাংলাদেশের বিদ্যুৎ অবকাঠামো বিনির্মাণে",
    titleEn: "Leading Electrical Solutions Provider",
    titleBn: "উন্নত বৈদ্যুতিক সমাধান সরবরাহকারী",
    para1En: "SEECO Power Limited (SPL) is a leading engineering enterprise in the energy sector of Bangladesh. Specializing in the design, manufacturing, testing, and servicing of high-quality Distribution and Power Transformers, BBT (Bus Bar Trunking Systems), Switchgear, and Diesel Generators, we have established ourselves as a benchmark for quality and engineering excellence.",
    para1Bn: "সিকো পাওয়ার লিমিটেড (এসপিএল) বাংলাদেশের জ্বালানি খাতের একটি শীর্ষস্থানীয় ইঞ্জিনিয়ারিং প্রতিষ্ঠান। উচ্চমানের ডিস্ট্রিবিউশন ও পাওয়ার ট্রান্সফরমার, বিবিটি (বাস বার ট্রাংকিং সিস্টেম), সুইচগিয়ার এবং ডিজেল জেনারেটরের ডিজাইন, উৎপাদন, টেস্টিং এবং সেবা প্রদানের মাধ্যমে আমরা নিজেদের গুণমান ও প্রকৌশল উৎকর্ষের একটি প্রতীক হিসেবে প্রতিষ্ঠিত করেছি।",
    para2En: "From our modern production factory located in Ekuria Tila Bari, South Keranigonj, Dhaka, our state-of-the-art machinery and highly experienced engineers produce solutions tailored to utility grids, solar power parks, heavy industries, and commercial high-rise buildings. We do not just build electrical equipment — we engineer long-term energy infrastructure.",
    para2Bn: "ঢাকা দক্ষিণ কেরানীগঞ্জের একুরিয়া টিলা বাড়িতে অবস্থিত আমাদের আধুনিক উৎপাদন কারখানায় অত্যাধুনিক যন্ত্রপাতি এবং অত্যন্ত অভিজ্ঞ প্রকৌশলী দল ইউটিলিটি গ্রিড, সৌর বিদ্যুৎ প্রকল্প, ভারী শিল্প এবং বাণিজ্যিক ভবনের জন্য কাস্টমাইজড সমাধান তৈরি করে থাকেন। আমরা কেবল বৈদ্যুতিক সরঞ্জামই তৈরি করি না — আমরা দীর্ঘমেয়াদী বিদ্যুৎ অবকাঠামো গড়ে তুলি।",
  },
  aboutImagePath: "/images/Transformers-Be-Maintained.png",
  missionVision: {
    missionPointsEn: [
      "To manufacture high-quality, cost effective transformers suited to Bangladesh's environmental and grid conditions",
      "To support government and private sector power projects with reliable solutions",
      "To reduce dependency on imported transformers through local production",
      "To ensure compliance with Bangladesh standards and international benchmarks"
    ],
    missionPointsBn: [
      "বাংলাদেশের পরিবেশ ও গ্রিড ব্যবস্থার উপযোগী উচ্চমানসম্পন্ন এবং সাশ্রয়ী মূল্যের ট্রান্সফরমার প্রস্তুত করা",
      "নির্ভরযোগ্য সমাধানের মাধ্যমে সরকারি ও বেসরকারি খাতের বিদ্যুৎ প্রকল্পসমূহে সহায়তা প্রদান করা",
      "স্থানীয় উৎপাদনের মাধ্যমে আমদানিকৃত ট্রান্সফরমার উপর নির্ভরশীলতা হ্রাস করা",
      "বাংলাদেশ মানদণ্ড এবং আন্তর্জাতিক মানের সাথে সম্মতি নিশ্চিত করা"
    ],
    visionTextEn: "To become a leading transformer manufacturer in Bangladesh by delivering world-class products that ensure sustainable and uninterrupted power across the country.",
    visionTextBn: "দেশব্যাপী টেকসই এবং নিরবচ্ছিন্ন বিদ্যুৎ নিশ্চিত করতে বিশ্বমানের পণ্য সরবরাহের মাধ্যমে বাংলাদেশে একটি শীর্ষস্থানীয় ট্রান্সফরমার প্রস্তুতকারী প্রতিষ্ঠান হওয়া।",
    valuesPointsEn: [
      "Power Transformers (up to 132kV and beyond)",
      "Distribution Transformers (11kV / 33kV)",
      "Pad-mounted Transformers",
      "Special Purpose Transformers (industrial/customized)",
      "Transformer Repair, Maintenance & Retrofitting Services"
    ],
    valuesPointsBn: [
      "পাওয়ার ট্রান্সফরমার (১৩২কেভি এবং এর বেশি)",
      "ডিস্ট্রিবিউশন ট্রান্সফরমার (১১কেভি / ৩৩কেভি)",
      "প্যাড-মাউন্টেড ট্রান্সফরমার",
      "বিশেষ উদ্দেশ্যের ট্রান্সফরমার (শিল্প/কাস্টমাইজড)",
      "ট্রান্সফরমার মেরামত, রক্ষণাবেক্ষণ ও রেটরোফিটিং সেবা"
    ]
  },
  policies: {
    privacyEn: serializePolicyToMarkdown(privacyPolicyContent.en),
    privacyBn: serializePolicyToMarkdown(privacyPolicyContent.bn),
    cookieEn: serializePolicyToMarkdown(cookiePolicyContent.en),
    cookieBn: serializePolicyToMarkdown(cookiePolicyContent.bn),
    termsEn: serializePolicyToMarkdown(termsOfServiceContent.en),
    termsBn: serializePolicyToMarkdown(termsOfServiceContent.bn),
    returnEn: serializePolicyToMarkdown(returnPolicyContent.en),
    returnBn: serializePolicyToMarkdown(returnPolicyContent.bn),
  },
  welcomeModal: {
    active: false,
    imagePath: "",
    suppressionDays: 1,
  },
  brandIntro: {
    subtitleEn: "SEECO Transformer",
    subtitleBn: "সিকো ট্রান্সফরমার",
    titleEn: "High Quality Distribution & Power Transformers",
    titleBn: "উচ্চ মানের ডিস্ট্রিবিউশন ও পাওয়ার ট্রান্সফরমারসমূহ",
    descriptionEn: "SEECO Transformer holds a leading position in the transformer industry with its accumulated expertise and reliability. With our commitment to uncompromising quality and a customer-centric approach, we shape the industry and build the energy infrastructure of the future through our innovative solutions.",
    descriptionBn: "সিকো ট্রান্সফরমার তার অর্জিত দক্ষতা ও নির্ভরযোগ্যতার সাথে ট্রান্সফরমার শিল্পে একটি অগ্রণী অবস্থানে রয়েছে। আপসহীন গুণমান এবং গ্রাহক-কেন্দ্রিক দৃষ্টিভঙ্গির প্রতি আমাদের প্রতিশ্রুতি সহ, আমরা শিল্পটিকে রূপ দিই এবং আমাদের উদ্ভাবনী সমাধানের মাধ্যমে ভবিষ্যতের জ্বালানি অবকাঠামো তৈরি করি।"
  },
  brandBanner: {
    leftPara1En: "SEECO Transformer is a trusted name in the energy sector, offering high-performance transformer solutions tailored to modern infrastructure needs.",
    leftPara1Bn: "সিকো ট্রান্সফরমার জ্বালানি খাতে একটি বিশ্বস্ত নাম, যা আধুনিক অবকাঠামোর প্রয়োজন অনুসারে উচ্চ-ক্ষমতাসম্পন্ন ট্রান্সফরমার সমাধান সরবরাহ করে।",
    leftPara2En: "With our innovative production approach and customer-oriented mindset, we support critical energy projects across the globe. We don’t just deliver products — we deliver long-term value and reliability.",
    leftPara2Bn: "আমাদের উদ্ভাবনী উৎপাদন পদ্ধতি এবং গ্রাহক-বান্ধব মনোভাবের সাথে, আমরা বিশ্বজুড়ে গুরুত্বপূর্ণ জ্বালানি প্রকল্পগুলোতে সহায়তা করি। আমরা শুধু পণ্য সরবরাহ করি না — আমরা দীর্ঘমেয়াদী মূল্য এবং নির্ভরযোগ্যতা প্রদান করি।"
  }
};

const settingsFilePath = path.join(process.cwd(), "src/data/settings.json");

/**
 * RAW: Gets the current site settings (bypassing cache layer).
 */
async function getSiteSettingsRaw(): Promise<SiteSettings> {
  if (isDbConfigured()) {
    try {
      const rows = await executeQuery<any[]>(
        "SELECT setting_key, setting_value FROM site_settings"
      );
      if (rows && rows.length > 0) {
        const settings: Partial<SiteSettings> & { contactInfo?: any } = {};
        for (const row of rows) {
          if (row.setting_key === "primaryColor") {
            settings.primaryColor = row.setting_value;
          } else if (row.setting_key === "primaryColorHover") {
            settings.primaryColorHover = row.setting_value;
          } else if (row.setting_key.startsWith("contact_")) {
            if (!settings.contactInfo) settings.contactInfo = {};
            if (row.setting_key === "contact_address_en") settings.contactInfo.addressEn = row.setting_value;
            if (row.setting_key === "contact_address_bn") settings.contactInfo.addressBn = row.setting_value;
            if (row.setting_key === "contact_factory_address_en") settings.contactInfo.factoryAddressEn = row.setting_value;
            if (row.setting_key === "contact_factory_address_bn") settings.contactInfo.factoryAddressBn = row.setting_value;
            if (row.setting_key === "contact_email") settings.contactInfo.email = row.setting_value;
            if (row.setting_key === "contact_email2") settings.contactInfo.email2 = row.setting_value;
            if (row.setting_key === "contact_phone") settings.contactInfo.phone = row.setting_value;
            if (row.setting_key === "contact_phone2") settings.contactInfo.phone2 = row.setting_value;
            if (row.setting_key === "contact_whatsapp") settings.contactInfo.whatsapp = row.setting_value;
          } else if (row.setting_key === "scrollingTexts") {
            try {
              settings.scrollingTexts = JSON.parse(row.setting_value);
            } catch (e) {
              console.error("Failed to parse scrollingTexts setting:", e);
            }
          } else if (row.setting_key === "logoPath") {
            settings.logoPath = row.setting_value;
          } else if (row.setting_key === "faviconPath") {
            settings.faviconPath = row.setting_value;
          } else if (row.setting_key === "contactCTAImagePath") {
            settings.contactCTAImagePath = row.setting_value;
          } else if (row.setting_key === "brandBannerSlogan") {
            try {
              settings.brandBannerSlogan = JSON.parse(row.setting_value);
            } catch (e) {
              console.error("Failed to parse brandBannerSlogan setting:", e);
            }
          } else if (row.setting_key === "socialLinks") {
            try {
              settings.socialLinks = JSON.parse(row.setting_value);
            } catch (e) {
              console.error("Failed to parse socialLinks setting:", e);
            }
          } else if (row.setting_key === "googleMapsEmbedUrl") {
            settings.googleMapsEmbedUrl = row.setting_value;
          } else if (row.setting_key === "aboutImagePath") {
            settings.aboutImagePath = row.setting_value;
          } else if (row.setting_key === "aboutIntro") {
            try {
              settings.aboutIntro = JSON.parse(row.setting_value);
            } catch (e) {
              console.error("Failed to parse aboutIntro setting:", e);
            }
          } else if (row.setting_key === "missionVision") {
            try {
              settings.missionVision = JSON.parse(row.setting_value);
            } catch (e) {
              console.error("Failed to parse missionVision setting:", e);
            }
          } else if (row.setting_key === "policies") {
            try {
              settings.policies = JSON.parse(row.setting_value);
            } catch (e) {
              console.error("Failed to parse policies setting, attempting local fallback:", e);
              fs.readFile(settingsFilePath, "utf8").then((fileContent) => {
                const parsed = JSON.parse(fileContent);
                if (parsed.policies) {
                  settings.policies = parsed.policies;
                  const serialized = JSON.stringify(parsed.policies);
                  return executeQuery(
                    "INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?",
                    ["policies", serialized, serialized]
                  );
                }
              }).catch(fileErr => console.error("Self-heal: Failed to save back to DB:", fileErr));
            }
          } else if (row.setting_key === "welcomeModal") {
            try {
              settings.welcomeModal = JSON.parse(row.setting_value);
            } catch (e) {
              console.error("Failed to parse welcomeModal setting:", e);
            }
          } else if (row.setting_key === "brandIntro") {
            try {
              settings.brandIntro = JSON.parse(row.setting_value);
            } catch (e) {
              console.error("Failed to parse brandIntro setting:", e);
            }
          } else if (row.setting_key === "brandBanner") {
            try {
              settings.brandBanner = JSON.parse(row.setting_value);
            } catch (e) {
              console.error("Failed to parse brandBanner setting:", e);
            }
          }
        }
        if (settings.primaryColor && settings.primaryColorHover) {
          if (!settings.scrollingTexts) {
            try {
              const content = await fs.readFile(settingsFilePath, "utf8");
              const parsed = JSON.parse(content);
              settings.scrollingTexts = parsed.scrollingTexts || UNIQUE_DEFAULT_SCROLLING_TEXTS;
            } catch (err) {
              settings.scrollingTexts = UNIQUE_DEFAULT_SCROLLING_TEXTS;
            }
          }
          if (!settings.logoPath) {
            settings.logoPath = DEFAULT_SETTINGS.logoPath;
          }
          if (!settings.faviconPath) {
            settings.faviconPath = DEFAULT_SETTINGS.faviconPath;
          }
          if (!settings.contactCTAImagePath) {
            settings.contactCTAImagePath = DEFAULT_SETTINGS.contactCTAImagePath;
          }
          if (!settings.brandBannerSlogan) {
            settings.brandBannerSlogan = DEFAULT_SETTINGS.brandBannerSlogan;
          }
          if (!settings.socialLinks) {
            settings.socialLinks = DEFAULT_SETTINGS.socialLinks;
          }
          if (!settings.googleMapsEmbedUrl) {
            settings.googleMapsEmbedUrl = DEFAULT_SETTINGS.googleMapsEmbedUrl;
          }
          if (!settings.aboutIntro) {
            settings.aboutIntro = DEFAULT_SETTINGS.aboutIntro;
          }
          if (!settings.aboutImagePath) {
            settings.aboutImagePath = DEFAULT_SETTINGS.aboutImagePath;
          }
          if (!settings.missionVision) {
            settings.missionVision = DEFAULT_SETTINGS.missionVision;
          }
          if (!settings.policies) {
            try {
              const fileContent = await fs.readFile(settingsFilePath, "utf8");
              const parsed = JSON.parse(fileContent);
              settings.policies = parsed.policies || DEFAULT_SETTINGS.policies;
            } catch (err) {
              settings.policies = DEFAULT_SETTINGS.policies;
            }
          }
          if (!settings.welcomeModal) {
            settings.welcomeModal = DEFAULT_SETTINGS.welcomeModal;
          }
          if (!settings.brandIntro) {
            settings.brandIntro = DEFAULT_SETTINGS.brandIntro;
          }
          if (!settings.brandBanner) {
            settings.brandBanner = DEFAULT_SETTINGS.brandBanner;
          }
          
          if (!settings.contactInfo) {
            try {
              const contactPath = path.join(process.cwd(), "src/data/contactInfo.json");
              const contactContent = await fs.readFile(contactPath, "utf8");
              settings.contactInfo = JSON.parse(contactContent);
            } catch (e) {
              console.error("Settings Lib: Failed to load fallback contact details inside DB settings mapping:", e);
            }
          }

          return settings as SiteSettings;
        }
      }
    } catch (dbErr) {
      console.warn("Settings Lib: Failed to fetch settings from DB, falling back to local file.", dbErr);
    }
  }

  // Fallback to static JSON file
  try {
    const content = await fs.readFile(settingsFilePath, "utf8");
    const parsed = JSON.parse(content);
    
    let contactInfoFallback = null;
    try {
      const contactPath = path.join(process.cwd(), "src/data/contactInfo.json");
      const contactContent = await fs.readFile(contactPath, "utf8");
      contactInfoFallback = JSON.parse(contactContent);
    } catch (e) {
      console.error("Settings Lib: Failed to read fallback contactInfo.json:", e);
    }

    return {
      primaryColor: parsed.primaryColor || DEFAULT_SETTINGS.primaryColor,
      primaryColorHover: parsed.primaryColorHover || DEFAULT_SETTINGS.primaryColorHover,
      scrollingTexts: parsed.scrollingTexts || UNIQUE_DEFAULT_SCROLLING_TEXTS,
      logoPath: parsed.logoPath || DEFAULT_SETTINGS.logoPath,
      faviconPath: parsed.faviconPath || DEFAULT_SETTINGS.faviconPath,
      contactCTAImagePath: parsed.contactCTAImagePath || DEFAULT_SETTINGS.contactCTAImagePath,
      brandBannerSlogan: parsed.brandBannerSlogan || DEFAULT_SETTINGS.brandBannerSlogan,
      socialLinks: parsed.socialLinks || DEFAULT_SETTINGS.socialLinks,
      googleMapsEmbedUrl: parsed.googleMapsEmbedUrl || DEFAULT_SETTINGS.googleMapsEmbedUrl,
      aboutIntro: parsed.aboutIntro || DEFAULT_SETTINGS.aboutIntro,
      aboutImagePath: parsed.aboutImagePath || DEFAULT_SETTINGS.aboutImagePath,
      missionVision: parsed.missionVision || DEFAULT_SETTINGS.missionVision,
      policies: parsed.policies || DEFAULT_SETTINGS.policies,
      welcomeModal: parsed.welcomeModal || DEFAULT_SETTINGS.welcomeModal,
      brandIntro: parsed.brandIntro || DEFAULT_SETTINGS.brandIntro,
      brandBanner: parsed.brandBanner || DEFAULT_SETTINGS.brandBanner,
      contactInfo: contactInfoFallback,
    };
  } catch (fileErr) {
    console.error("Settings Lib: Failed to read local settings file:", fileErr);
  }

  return DEFAULT_SETTINGS;
}

/**
 * Gets the cached site settings.
 */
export const getSiteSettings = unstable_cache(
  async (): Promise<SiteSettings> => {
    return getSiteSettingsRaw();
  },
  ["site-settings-cache-key"],
  { tags: ["settings"], revalidate: 300 }
);

/**
 * Saves and updates the primary color settings.
 * Synchronizes with database in a single batch query (fixing N+1 queries) and writes directly to local settings.json asynchronously.
 */
export async function updateSiteSettings(settings: SiteSettings): Promise<boolean> {
  let dbSuccess = false;

  if (isDbConfigured()) {
    try {
      const entries: [string, string][] = [
        ["primaryColor", settings.primaryColor],
        ["primaryColorHover", settings.primaryColorHover]
      ];

      if (settings.scrollingTexts) entries.push(["scrollingTexts", JSON.stringify(settings.scrollingTexts)]);
      if (settings.logoPath) entries.push(["logoPath", settings.logoPath]);
      if (settings.faviconPath) entries.push(["faviconPath", settings.faviconPath]);
      if (settings.contactCTAImagePath) entries.push(["contactCTAImagePath", settings.contactCTAImagePath]);
      if (settings.brandBannerSlogan) entries.push(["brandBannerSlogan", JSON.stringify(settings.brandBannerSlogan)]);
      if (settings.socialLinks) entries.push(["socialLinks", JSON.stringify(settings.socialLinks)]);
      if (settings.googleMapsEmbedUrl) entries.push(["googleMapsEmbedUrl", settings.googleMapsEmbedUrl]);
      if (settings.aboutIntro) entries.push(["aboutIntro", JSON.stringify(settings.aboutIntro)]);
      if (settings.aboutImagePath) entries.push(["aboutImagePath", settings.aboutImagePath]);
      if (settings.missionVision) entries.push(["missionVision", JSON.stringify(settings.missionVision)]);
      if (settings.policies) entries.push(["policies", JSON.stringify(settings.policies)]);
      if (settings.welcomeModal) entries.push(["welcomeModal", JSON.stringify(settings.welcomeModal)]);
      if (settings.brandIntro) entries.push(["brandIntro", JSON.stringify(settings.brandIntro)]);
      if (settings.brandBanner) entries.push(["brandBanner", JSON.stringify(settings.brandBanner)]);

      const placeholders = entries.map(() => "(?, ?)").join(", ");
      const sql = `INSERT INTO site_settings (setting_key, setting_value) VALUES ${placeholders} ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)`;
      const params = entries.flat();

      await executeQuery(sql, params);
      dbSuccess = true;
    } catch (dbErr) {
      console.error("Settings Lib: Failed to save settings to DB:", dbErr);
    }
  }

  // Always write to fallback JSON file to remain in sync asynchronously
  try {
    const dir = path.dirname(settingsFilePath);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(settingsFilePath, JSON.stringify(settings, null, 2), "utf8");
  } catch (fileErr) {
    console.error("Settings Lib: Failed to write local settings file:", fileErr);
  }

  return dbSuccess;
}

export interface HeroSlide {
  id: string | number;
  imagePath: string;
  badge: { en: string; bn: string };
  title: { en: string; bn: string };
  description: { en: string; bn: string };
}

/**
 * RAW: Fetches all hero slides from MySQL (bypassing cache layer).
 */
async function getDbHeroSlidesRaw(): Promise<HeroSlide[]> {
  const DEFAULT_SLIDES: HeroSlide[] = [
    {
      id: 1,
      imagePath: "/images/Transformer1.1.png",
      badge: { en: "High Efficiency & High Performance", bn: "উচ্চ দক্ষতা ও উচ্চ কার্যক্ষমতা" },
      title: { en: "Power & Distribution Transformers", bn: "পাওয়ার ও ডিস্ট্রিবিউশন ট্রান্সফরমার" },
      description: { en: "We provide quality with years of experience and our expert team.", bn: "আমরা দীর্ঘ বছরের অভিজ্ঞতা এবং আমাদের বিশেষজ্ঞ দলের সাথে মানসম্পন্ন সেবা প্রদান করি।" }
    },
    {
      id: 2,
      imagePath: "/images/Transformer2.1.png",
      badge: { en: "Innovative Energy Solutions", bn: "উদ্ভাবনী শক্তি সমাধান" },
      title: { en: "Electric Switchgear Systems", bn: "বৈদ্যুতিক সুইচগিয়ার সিস্টেম" },
      description: { en: "Ensuring ultimate grid security and reliable distribution controls.", bn: "সর্বোচ্চ গ্রিড নিরাপত্তা এবং নির্ভরযোগ্য বন্টন নিয়ন্ত্রণ নিশ্চিত করা।" }
    },
    {
      id: 3,
      imagePath: "/images/Transformer3.1.png",
      badge: { en: "Sustainable Power Delivery", bn: "টেকসই শক্তি সরবরাহ" },
      title: { en: "Dry-Type Transformer Technologies", bn: "ড্রাই-টাইপ ট্রান্সফরমার প্রযুক্তি" },
      description: { en: "Safe, eco-friendly, and modern electricity conversion for industrial infrastructure.", bn: "শিল্প অবকাঠামোর জন্য নিরাপদ, পরিবেশ-বান্ধব এবং আধুনিক বিদ্যুৎ রূপান্তর।" }
    }
  ];

  if (isDbConfigured()) {
    try {
      const rows = await executeQuery<any[]>(
        "SELECT * FROM hero_slides ORDER BY order_index ASC, id ASC"
      );
      if (rows && rows.length > 0) {
        return rows.map((row) => ({
          id: row.id,
          imagePath: row.image_path,
          badge: { en: row.badge_en || "", bn: row.badge_bn || "" },
          title: { en: row.title_en || "", bn: row.title_bn || "" },
          description: { en: row.description_en || "", bn: row.description_bn || "" },
        }));
      }
    } catch (err) {
      console.warn("Settings Lib: Failed to query hero_slides from DB, falling back to defaults.", err);
    }
  }

  // Fallback to local hero_slides.json file asynchronously
  try {
    const fallbackPath = path.join(process.cwd(), "src/data/hero_slides.json");
    const data = await fs.readFile(fallbackPath, "utf-8");
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.map((s: any) => ({
        id: s.id,
        imagePath: s.image_path || s.imagePath || "",
        badge: { en: s.badge_en || s.badge?.en || "", bn: s.badge_bn || s.badge?.bn || "" },
        title: { en: s.title_en || s.title?.en || "", bn: s.title_bn || s.title?.bn || "" },
        description: { en: s.description_en || s.description?.en || "", bn: s.description_bn || s.description?.bn || "" },
      }));
    }
  } catch (err) {
    console.error("Settings Lib: Failed to read local hero slides file fallback:", err);
  }

  return DEFAULT_SLIDES;
}

/**
 * Gets the cached hero slides list.
 */
export const getDbHeroSlides = unstable_cache(
  async (): Promise<HeroSlide[]> => {
    return getDbHeroSlidesRaw();
  },
  ["hero-slides-cache-key"],
  { tags: ["hero_slides"], revalidate: 300 }
);
