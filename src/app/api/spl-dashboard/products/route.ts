import { NextResponse } from "next/server";
import { executeQuery, isDbConfigured } from "@/lib/db";
import { revalidatePath, revalidateTag } from "next/cache";
import { promises as fs } from "fs";
import path from "path";
import { checkAuth } from "@/lib/auth";

const localJsonPath = path.join(process.cwd(), "src/data/products.json");

/**
 * Read products fallback JSON file asynchronously.
 */
async function readFallbackJson(): Promise<any[]> {
  try {
    const data = await fs.readFile(localJsonPath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

/**
 * Write products fallback JSON file asynchronously.
 */
async function writeFallbackJson(data: any[]) {
  try {
    const dir = path.dirname(localJsonPath);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(localJsonPath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write fallback products.json:", err);
  }
}

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
 * GET: retrieve products list directly from DB (dashboard preview) or local fallback.
 */
export async function GET() {
  if (isDbConfigured()) {
    try {
      const dbProducts = await executeQuery<any[]>("SELECT * FROM products");
      if (dbProducts) {
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
    } catch (error) {
      console.error("Dashboard Product GET error:", error);
    }
  }

  // Fallback to static JSON
  const fallbackProducts = (await readFallbackJson()).map((p) => ({
    id: p.id,
    slug: p.slug,
    category: p.category,
    imagePath: p.imagePath || p.image_path || "",
    title: p.title || { en: "", bn: "" },
    subtitle: p.subtitle || { en: "", bn: "" },
    description: p.description || { en: "", bn: "" },
    overview: p.overview || { en: "", bn: "" },
    specs: p.specs || { rating: { en: "", bn: "" }, voltage: { en: "", bn: "" }, standard: { en: "", bn: "" } },
    advantages: p.advantages || { en: [], bn: [] },
    applications: p.applications || { en: [], bn: [] },
    specsTable: p.specsTable || { en: [], bn: [] },
    accessories: p.accessories || { en: [], bn: [] },
    qualityText: p.qualityText || { en: "", bn: "" },
    ctaTitle: p.ctaTitle || { en: "", bn: "" },
    ctaText: p.ctaText || { en: "", bn: "" },
    ctaBtn: p.ctaBtn || { en: "", bn: "" },
  }));
  return NextResponse.json(fallbackProducts, { status: 200 });
}

/**
 * POST: Create a new product.
 */
export async function POST(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const product = await request.json();
    const {
      id, slug, category, imagePath,
      title, subtitle, description, overview, specs,
      advantages, applications, specsTable, accessories,
      qualityText, ctaTitle, ctaText, ctaBtn
    } = product;

    if (!id || !slug || !category || !title?.en) {
      return NextResponse.json({ error: "Missing required product fields" }, { status: 400 });
    }

    // 1. Save to Database (if configured)
    if (isDbConfigured()) {
      try {
        const query = `
          INSERT INTO products (
            id, slug, category, image_path, 
            title_en, title_bn, subtitle_en, subtitle_bn, 
            description_en, description_bn, overview_en, overview_bn, 
            spec_rating_en, spec_rating_bn, spec_voltage_en, spec_voltage_bn, spec_standard_en, spec_standard_bn,
            advantages_en, advantages_bn, applications_en, applications_bn, 
            specs_table_en, specs_table_bn, accessories_en, accessories_bn,
            quality_text_en, quality_text_bn, cta_title_en, cta_title_bn, 
            cta_text_en, cta_text_bn, cta_btn_en, cta_btn_bn
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const params = [
          id, slug, category, imagePath || "",
          title.en, title.bn || "", subtitle?.en || "", subtitle?.bn || "",
          description?.en || "", description?.bn || "", overview?.en || "", overview?.bn || "",
          specs?.rating?.en || "", specs?.rating?.bn || "",
          specs?.voltage?.en || "", specs?.voltage?.bn || "",
          specs?.standard?.en || "", specs?.standard?.bn || "",
          JSON.stringify(advantages?.en || []), JSON.stringify(advantages?.bn || []),
          JSON.stringify(applications?.en || []), JSON.stringify(applications?.bn || []),
          JSON.stringify(specsTable?.en || []), JSON.stringify(specsTable?.bn || []),
          JSON.stringify(accessories?.en || []), JSON.stringify(accessories?.bn || []),
          qualityText?.en || "", qualityText?.bn || "",
          ctaTitle?.en || "", ctaTitle?.bn || "",
          ctaText?.en || "", ctaText?.bn || "",
          ctaBtn?.en || "", ctaBtn?.bn || ""
        ];

        await executeQuery(query, params);
      } catch (dbErr) {
        console.error("Failed to insert product in DB:", dbErr);
      }
    }

    // 2. Always write to fallback JSON file
    const currentFallback = await readFallbackJson();
    const newProductJson = {
      id,
      slug,
      category,
      imagePath: imagePath || "",
      title: title || { en: "", bn: "" },
      subtitle: subtitle || { en: "", bn: "" },
      description: description || { en: "", bn: "" },
      overview: overview || { en: "", bn: "" },
      specs: specs || { rating: { en: "", bn: "" }, voltage: { en: "", bn: "" }, standard: { en: "", bn: "" } },
      advantages: advantages || { en: [], bn: [] },
      applications: applications || { en: [], bn: [] },
      specsTable: specsTable || { en: [], bn: [] },
      accessories: accessories || { en: [], bn: [] },
      qualityText: qualityText || { en: "", bn: "" },
      ctaTitle: ctaTitle || { en: "", bn: "" },
      ctaText: ctaText || { en: "", bn: "" },
      ctaBtn: ctaBtn || { en: "", bn: "" },
    };
    currentFallback.push(newProductJson);
    await writeFallbackJson(currentFallback);

    // Purge ISR page caches and cache tag on modifications
    revalidatePath("/products");
    revalidatePath("/products/[slug]");
    revalidatePath("/");
    revalidatePath("/", "layout");
    revalidateTag("products", "max");

    return NextResponse.json({ success: true, message: "Product created successfully." }, { status: 200 });
  } catch (error) {
    console.error("Dashboard Product POST error:", error);
    return NextResponse.json({ error: "Failed to insert product record" }, { status: 500 });
  }
}

/**
 * PUT: Update an existing product.
 */
export async function PUT(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const product = await request.json();
    const {
      id, slug, category, imagePath,
      title, subtitle, description, overview, specs,
      advantages, applications, specsTable, accessories,
      qualityText, ctaTitle, ctaText, ctaBtn
    } = product;

    if (!id) {
      return NextResponse.json({ error: "Product ID is required for editing" }, { status: 400 });
    }

    // 1. Update in MySQL
    if (isDbConfigured()) {
      try {
        const query = `
          UPDATE products SET 
            slug = ?, category = ?, image_path = ?, 
            title_en = ?, title_bn = ?, subtitle_en = ?, subtitle_bn = ?, 
            description_en = ?, description_bn = ?, overview_en = ?, overview_bn = ?, 
            spec_rating_en = ?, spec_rating_bn = ?, spec_voltage_en = ?, spec_voltage_bn = ?, spec_standard_en = ?, spec_standard_bn = ?,
            advantages_en = ?, advantages_bn = ?, applications_en = ?, applications_bn = ?, 
            specs_table_en = ?, specs_table_bn = ?, accessories_en = ?, accessories_bn = ?,
            quality_text_en = ?, quality_text_bn = ?, cta_title_en = ?, cta_title_bn = ?, 
            cta_text_en = ?, cta_text_bn = ?, cta_btn_en = ?, cta_btn_bn = ?
          WHERE id = ?
        `;

        const params = [
          slug, category, imagePath || "",
          title?.en || "", title?.bn || "", subtitle?.en || "", subtitle?.bn || "",
          description?.en || "", description?.bn || "", overview?.en || "", overview?.bn || "",
          specs?.rating?.en || "", specs?.rating?.bn || "",
          specs?.voltage?.en || "", specs?.voltage?.bn || "",
          specs?.standard?.en || "", specs?.standard?.bn || "",
          JSON.stringify(advantages?.en || []), JSON.stringify(advantages?.bn || []),
          JSON.stringify(applications?.en || []), JSON.stringify(applications?.bn || []),
          JSON.stringify(specsTable?.en || []), JSON.stringify(specsTable?.bn || []),
          JSON.stringify(accessories?.en || []), JSON.stringify(accessories?.bn || []),
          qualityText?.en || "", qualityText?.bn || "",
          ctaTitle?.en || "", ctaTitle?.bn || "",
          ctaText?.en || "", ctaText?.bn || "",
          ctaBtn?.en || "", ctaBtn?.bn || "",
          id
        ];

        await executeQuery(query, params);
      } catch (dbErr) {
        console.error("Failed to update product in DB:", dbErr);
      }
    }

    // 2. Always write to fallback JSON file
    const currentFallback = await readFallbackJson();
    const updatedFallback = currentFallback.map((p) => {
      if (p.id === id) {
        return {
          id,
          slug,
          category,
          imagePath: imagePath || "",
          title: title || { en: "", bn: "" },
          subtitle: subtitle || { en: "", bn: "" },
          description: description || { en: "", bn: "" },
          overview: overview || { en: "", bn: "" },
          specs: specs || { rating: { en: "", bn: "" }, voltage: { en: "", bn: "" }, standard: { en: "", bn: "" } },
          advantages: advantages || { en: [], bn: [] },
          applications: applications || { en: [], bn: [] },
          specsTable: specsTable || { en: [], bn: [] },
          accessories: accessories || { en: [], bn: [] },
          qualityText: qualityText || { en: "", bn: "" },
          ctaTitle: ctaTitle || { en: "", bn: "" },
          ctaText: ctaText || { en: "", bn: "" },
          ctaBtn: ctaBtn || { en: "", bn: "" },
        };
      }
      return p;
    });
    await writeFallbackJson(updatedFallback);

    // Purge ISR page caches and cache tag on modifications
    revalidatePath("/products");
    if (slug) {
      revalidatePath(`/products/${slug}`);
    }
    revalidatePath("/products/[slug]");
    revalidatePath("/");
    revalidatePath("/", "layout");
    revalidateTag("products", "max");

    return NextResponse.json({ success: true, message: "Product updated successfully." }, { status: 200 });
  } catch (error) {
    console.error("Dashboard Product PUT error:", error);
    return NextResponse.json({ error: "Failed to update product record" }, { status: 500 });
  }
}

/**
 * DELETE: Remove a product.
 */
export async function DELETE(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Product ID parameter is required" }, { status: 400 });
    }

    // 1. Delete from MySQL
    if (isDbConfigured()) {
      try {
        await executeQuery("DELETE FROM products WHERE id = ?", [id]);
      } catch (dbErr) {
        console.error("Failed to delete product from DB:", dbErr);
      }
    }

    // 2. Always write to fallback JSON file
    const currentFallback = await readFallbackJson();
    const updatedFallback = currentFallback.filter((p) => p.id !== id);
    await writeFallbackJson(updatedFallback);

    // Purge ISR page caches and cache tag on modifications
    revalidatePath("/products");
    revalidatePath("/products/[slug]");
    revalidatePath("/");
    revalidateTag("products", "max");
    revalidatePath("/", "layout");

    return NextResponse.json({ success: true, message: "Product deleted successfully." }, { status: 200 });
  } catch (error) {
    console.error("Dashboard Product DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete product record" }, { status: 500 });
  }
}
