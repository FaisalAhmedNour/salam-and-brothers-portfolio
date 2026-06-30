import { executeQuery, isDbConfigured } from "./db";
import staticProducts from "@/data/products.json";
import { unstable_cache } from "next/cache";
import { promises as fs } from "fs";
import path from "path";

export interface ProductTitle {
  en: string;
  bn: string;
}

export interface ProductSpecsDetail {
  en: string;
  bn: string;
}

export interface ProductSpecs {
  rating: ProductSpecsDetail;
  voltage: ProductSpecsDetail;
  standard: ProductSpecsDetail;
}

export interface AdvantageItem {
  title: string;
  desc: string;
}

export interface SpecTableRow {
  name: string;
  val: string;
}

export interface ProductItem {
  id: string;
  slug: string;
  category: string;
  imagePath: string;
  title: ProductTitle;
  subtitle: ProductTitle;
  description: ProductTitle;
  overview: ProductTitle;
  specs: ProductSpecs;
  advantages?: { en: AdvantageItem[]; bn: AdvantageItem[] };
  applications?: { en: string[]; bn: string[] };
  specsTable?: { en: SpecTableRow[]; bn: SpecTableRow[] };
  accessories?: { en: string[]; bn: string[] };
  qualityText?: ProductTitle;
  ctaTitle?: ProductTitle;
  ctaText?: ProductTitle;
  ctaBtn?: ProductTitle;
}

/**
 * Safely parses a JSON string, falling back to a default value if parsing fails.
 */
function safeParseJSON(val: string | null | undefined, fallback: any = []) {
  if (!val) return fallback;
  try {
    return JSON.parse(val);
  } catch (e) {
    console.error("JSON parse error:", e, "for value:", val);
    return fallback;
  }
}

/**
 * RAW: Fetches all products from the MySQL database (bypassing cache layer).
 */
async function getDbProductsRaw(): Promise<ProductItem[]> {
  if (isDbConfigured()) {
    try {
      const dbProducts = await executeQuery<any[]>("SELECT * FROM products");
      if (dbProducts) {
        return dbProducts.map((p) => ({
          id: p.id,
          slug: p.slug,
          category: p.category,
          imagePath: p.image_path || "",
          title: { en: p.title_en || "", bn: p.title_bn || "" },
          subtitle: { en: p.subtitle_en || "", bn: p.subtitle_bn || "" },
          description: { en: p.description_en || "", bn: p.description_bn || "" },
          overview: { en: p.overview_en || "", bn: p.overview_bn || "" },
          specs: {
            rating: { en: p.spec_rating_en || "", bn: p.spec_rating_bn || "" },
            voltage: { en: p.spec_voltage_en || "", bn: p.spec_voltage_bn || "" },
            standard: { en: p.spec_standard_en || "", bn: p.spec_standard_bn || "" },
          },
          advantages: {
            en: safeParseJSON(p.advantages_en, []),
            bn: safeParseJSON(p.advantages_bn, []),
          },
          applications: {
            en: safeParseJSON(p.applications_en, []),
            bn: safeParseJSON(p.applications_bn, []),
          },
          specsTable: {
            en: safeParseJSON(p.specs_table_en, []),
            bn: safeParseJSON(p.specs_table_bn, []),
          },
          accessories: {
            en: safeParseJSON(p.accessories_en, []),
            bn: safeParseJSON(p.accessories_bn, []),
          },
          qualityText: {
            en: p.quality_text_en || "",
            bn: p.quality_text_bn || "",
          },
          ctaTitle: {
            en: p.cta_title_en || "",
            bn: p.cta_title_bn || "",
          },
          ctaText: {
            en: p.cta_text_en || "",
            bn: p.cta_text_bn || "",
          },
          ctaBtn: {
            en: p.cta_btn_en || "",
            bn: p.cta_btn_bn || "",
          },
        }));
      }
    } catch (err) {
      console.error("Failed to query DB products, falling back to static:", err);
    }
  }

  // Fallback: Read local products.json file dynamically from disk
  try {
    const localJsonPath = path.join(process.cwd(), "src/data/products.json");
    const data = await fs.readFile(localJsonPath, "utf-8");
    return JSON.parse(data) as ProductItem[];
  } catch (err) {
    console.error("Failed to read dynamic products.json fallback, using static compilation cache:", err);
    return staticProducts as ProductItem[];
  }
}

/**
 * Gets the cached products list.
 */
export const getDbProducts = unstable_cache(
  async (): Promise<ProductItem[]> => {
    return getDbProductsRaw();
  },
  ["products-list-cache-key"],
  { tags: ["products"], revalidate: 300 }
);
