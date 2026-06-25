import { NextResponse } from "next/server";
import { executeQuery, isDbConfigured } from "@/lib/db";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

/**
 * Shared helper to verify if the current user is authenticated as administrator.
 */
async function checkAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get("spl_session");
  return !!(session && session.value === "spl_admin_logged_in");
}

const itemsJsonPath = path.join(process.cwd(), "src/data/services.json");
const settingsJsonPath = path.join(process.cwd(), "src/data/servicesSettings.json");

function readItemsJson(): any[] {
  try {
    if (fs.existsSync(itemsJsonPath)) {
      return JSON.parse(fs.readFileSync(itemsJsonPath, "utf-8"));
    }
  } catch (err) {
    console.error("Failed to read fallback services.json:", err);
  }
  return [];
}

function writeItemsJson(data: any[]) {
  try {
    fs.writeFileSync(itemsJsonPath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write fallback services.json:", err);
  }
}

function readSettingsJson(): any {
  try {
    if (fs.existsSync(settingsJsonPath)) {
      return JSON.parse(fs.readFileSync(settingsJsonPath, "utf-8"));
    }
  } catch (err) {
    console.error("Failed to read fallback servicesSettings.json:", err);
  }
  return {};
}

function writeSettingsJson(data: any) {
  try {
    fs.writeFileSync(settingsJsonPath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write fallback servicesSettings.json:", err);
  }
}

/**
 * GET: retrieve settings and checklist items.
 */
export async function GET() {
  let settings = readSettingsJson();
  let items = readItemsJson();

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
    const currentFallback = readItemsJson();
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
    writeItemsJson(currentFallback);

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

          for (const s of settingsToUpdate) {
            await executeQuery(
              `INSERT INTO site_settings (setting_key, setting_value) 
               VALUES (?, ?) 
               ON DUPLICATE KEY UPDATE setting_value = ?`,
              [s.key, s.value || "", s.value || ""]
            );
          }
        } catch (dbErr) {
          console.error("Failed to update services site_settings in DB:", dbErr);
        }
      }

      // Sync settings fallback JSON
      writeSettingsJson({
        headlineEn: headlineEn || "",
        headlineBn: headlineBn || "",
        subtitleEn: subtitleEn || "",
        subtitleBn: subtitleBn || "",
        imagePath: imagePath || "",
      });

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
      const currentFallback = readItemsJson();
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
      writeItemsJson(updatedFallback);

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
    const currentFallback = readItemsJson();
    const filteredFallback = currentFallback.filter((item) => item.id !== id);
    writeItemsJson(filteredFallback);

    return NextResponse.json({ success: true, message: "Service item deleted successfully." }, { status: 200 });
  } catch (error) {
    console.error("Dashboard Service DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete service record" }, { status: 500 });
  }
}
