import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";
import staticProducts from "@/data/products.json";

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
 * GET handler: Fetch all products from MySQL (including rich specifications) or fallback to local static JSON.
 */
export async function GET() {
  try {
    const dbProducts = await executeQuery<any[]>("SELECT * FROM products");
    if (dbProducts && dbProducts.length > 0) {
      // Map MySQL schema (including new columns) to Frontend Product schema
      const products = dbProducts.map((p) => ({
        id: p.id,
        slug: p.slug,
        category: p.category,
        imagePath: p.image_path,
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
      return NextResponse.json(products, { status: 200 });
    }
  } catch (err) {
    console.error("Failed to query DB products, falling back to static:", err);
  }
  return NextResponse.json(staticProducts, { status: 200 });
}
