import { NextResponse } from "next/server";
import { executeQuery, isDbConfigured } from "@/lib/db";
import { promises as fs } from "fs";
import path from "path";
import { revalidateTag, revalidatePath } from "next/cache";
import { checkAuth } from "@/lib/auth";

const itemsJsonPath = path.join(process.cwd(), "src/data/services.json");
const settingsJsonPath = path.join(process.cwd(), "src/data/servicesSettings.json");

/**
 * Read items from fallback JSON file asynchronously.
 */
async function readItemsJson(): Promise<any[]> {
  try {
    const data = await fs.readFile(itemsJsonPath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

/**
 * Write items to fallback JSON file asynchronously.
 */
async function writeItemsJson(data: any[]) {
  try {
    const dir = path.dirname(itemsJsonPath);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(itemsJsonPath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write fallback services.json:", err);
  }
}

/**
 * Read settings from fallback JSON file asynchronously.
 */
async function readSettingsJson(): Promise<any> {
  try {
    const data = await fs.readFile(settingsJsonPath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    return {};
  }
}

/**
 * Write settings to fallback JSON file asynchronously.
 */
async function writeSettingsJson(data: any) {
  try {
    const dir = path.dirname(settingsJsonPath);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(settingsJsonPath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write fallback servicesSettings.json:", err);
  }
}

/**
 * GET: retrieve settings and checklist items.
 */
export async function GET() {
  let settings = await readSettingsJson();
  let items = await readItemsJson();

  if (isDbConfigured()) {
    try {
      // Fetch settings
      const dbSettings = await executeQuery<any[]>(
        "SELECT setting_key, setting_value FROM site_settings WHERE setting_key LIKE 'services_%'"
      );
      if (dbSettings && dbSettings.length > 0) {
        dbSettings.forEach((row) => {
          if (row.setting_key === "services_headline_en") settings.headlineEn = row.setting_value;
          if (row.setting_key === "services_headline_bn") settings.headlineBn = row.setting_value;
          if (row.setting_key === "services_subtitle_en") settings.subtitleEn = row.setting_value;
          if (row.setting_key === "services_subtitle_bn") settings.subtitleBn = row.setting_value;
          if (row.setting_key === "services_image_path") settings.imagePath = row.setting_value;
        });
      }

      // Fetch items
      const dbItems = await executeQuery<any[]>("SELECT * FROM services ORDER BY order_index ASC");
      if (dbItems) {
        items = dbItems.map((item) => ({
          id: item.id,
          titleEn: item.title_en,
          titleBn: item.title_bn,
          descEn: item.desc_en,
          descBn: item.desc_bn,
          orderIndex: item.order_index,
        }));
      }
    } catch (error) {
      console.error("Dashboard Services GET DB error, falling back to local JSON:", error);
    }
  }

  return NextResponse.json({ settings, items }, { status: 200 });
}

/**
 * POST: Create a new service checklist item.
 */
export async function POST(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const item = await request.json();
    const { id, titleEn, titleBn, descEn, descBn, orderIndex } = item;

    if (!id || !titleEn) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const orderIdx = typeof orderIndex === "number" ? orderIndex : 0;

    if (isDbConfigured()) {
      try {
        const query = `
          INSERT INTO services (
            id, title_en, title_bn, desc_en, desc_bn, order_index
          ) VALUES (?, ?, ?, ?, ?, ?)
        `;
        const params = [id, titleEn, titleBn || "", descEn || "", descBn || "", orderIdx];
        await executeQuery(query, params);
      } catch (dbErr) {
        console.error("Failed to insert service item in DB:", dbErr);
      }
    }

    // Always update fallback JSON file
    const currentFallback = await readItemsJson();
    const newItemJson = {
      id,
      titleEn,
      titleBn: titleBn || "",
      descEn: descEn || "",
      descBn: descBn || "",
      orderIndex: orderIdx,
    };
    currentFallback.push(newItemJson);
    currentFallback.sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));
    await writeItemsJson(currentFallback);

    revalidatePath("/", "layout");
    revalidateTag("services", "max");

    return NextResponse.json({ success: true, message: "Service item created successfully." }, { status: 200 });
  } catch (error) {
    console.error("Dashboard Service POST error:", error);
    return NextResponse.json({ error: "Failed to insert service record" }, { status: 500 });
  }
}

/**
 * PUT: Update page settings OR a service checklist item.
 */
export async function PUT(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { type } = body;

    if (type === "settings") {
      // Updating Page Layout Settings
      const { headlineEn, headlineBn, subtitleEn, subtitleBn, imagePath } = body.settings;

      if (isDbConfigured()) {
        try {
          const settingsToUpdate = [
            { key: "services_headline_en", value: headlineEn },
            { key: "services_headline_bn", value: headlineBn },
            { key: "services_subtitle_en", value: subtitleEn },
            { key: "services_subtitle_bn", value: subtitleBn },
            { key: "services_image_path", value: imagePath },
          ];

          // Batch insert site settings to prevent loop-based N+1 queries (Goal 2)
          const entries = settingsToUpdate.map(s => [s.key, s.value || ""]);
          const placeholders = entries.map(() => "(?, ?)").join(", ");
          const sql = `INSERT INTO site_settings (setting_key, setting_value) VALUES ${placeholders} ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)`;
          const params = entries.flat();

          await executeQuery(sql, params);
        } catch (dbErr) {
          console.error("Failed to update services site_settings in DB:", dbErr);
        }
      }

      // Sync settings fallback JSON
      await writeSettingsJson({
        headlineEn: headlineEn || "",
        headlineBn: headlineBn || "",
        subtitleEn: subtitleEn || "",
        subtitleBn: subtitleBn || "",
        imagePath: imagePath || "",
      });

      revalidatePath("/", "layout");
      revalidateTag("settings", "max");

      return NextResponse.json({ success: true, message: "Services page settings updated successfully." }, { status: 200 });
    } else {
      // Updating a Checklist Item
      const { id, titleEn, titleBn, descEn, descBn, orderIndex } = body;

      if (!id) {
        return NextResponse.json({ error: "Service ID is required for editing" }, { status: 400 });
      }

      const orderIdx = typeof orderIndex === "number" ? orderIndex : 0;

      if (isDbConfigured()) {
        try {
          const query = `
            UPDATE services SET 
              title_en = ?, title_bn = ?, desc_en = ?, desc_bn = ?, order_index = ?
            WHERE id = ?
          `;
          const params = [titleEn, titleBn || "", descEn || "", descBn || "", orderIdx, id];
          await executeQuery(query, params);
        } catch (dbErr) {
          console.error("Failed to update service item in DB:", dbErr);
        }
      }

      // Always update fallback JSON file
      const currentFallback = await readItemsJson();
      const updatedFallback = currentFallback.map((item) => {
        if (item.id === id) {
          return {
            id,
            titleEn,
            titleBn: titleBn || "",
            descEn: descEn || "",
            descBn: descBn || "",
            orderIndex: orderIdx,
          };
        }
        return item;
      });
      updatedFallback.sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));
      await writeItemsJson(updatedFallback);

      revalidatePath("/", "layout");
      revalidateTag("services", "max");

      return NextResponse.json({ success: true, message: "Service item updated successfully." }, { status: 200 });
    }
  } catch (error) {
    console.error("Dashboard Service PUT error:", error);
    return NextResponse.json({ error: "Failed to update service record" }, { status: 500 });
  }
}

/**
 * DELETE: Remove a service item.
 */
export async function DELETE(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Service ID parameter is required" }, { status: 400 });
    }

    if (isDbConfigured()) {
      try {
        await executeQuery("DELETE FROM services WHERE id = ?", [id]);
      } catch (dbErr) {
        console.error("Failed to delete service item in DB:", dbErr);
      }
    }

    // Always update fallback JSON file
    const currentFallback = await readItemsJson();
    const filteredFallback = currentFallback.filter((item) => item.id !== id);
    await writeItemsJson(filteredFallback);

    revalidatePath("/", "layout");
    revalidateTag("services", "max");

    return NextResponse.json({ success: true, message: "Service item deleted successfully." }, { status: 200 });
  } catch (error) {
    console.error("Dashboard Service DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete service record" }, { status: 500 });
  }
}
