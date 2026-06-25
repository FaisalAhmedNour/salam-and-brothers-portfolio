import { NextResponse } from "next/server";
import { executeQuery, isDbConfigured } from "@/lib/db";
import fallbackItems from "@/data/services.json";
import fallbackSettings from "@/data/servicesSettings.json";

/**
 * GET handler: Fetch both services settings and checklist items from MySQL
 * or fallback to local static JSON data.
 */
export async function GET() {
  let settings = { ...fallbackSettings };
  let items = [...fallbackItems];

  if (isDbConfigured()) {
    try {
      // 1. Fetch page settings (prefixed with 'services_')
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

      // 2. Fetch service items
      const dbItems = await executeQuery<any[]>(
        "SELECT * FROM services ORDER BY order_index ASC"
      );
      if (dbItems && dbItems.length > 0) {
        items = dbItems.map((item) => ({
          id: item.id,
          titleEn: item.title_en,
          titleBn: item.title_bn,
          descEn: item.desc_en,
          descBn: item.desc_bn,
          orderIndex: item.order_index,
        }));
      }
    } catch (err) {
      console.error("Failed to query DB services, falling back to static:", err);
    }
  }

  return NextResponse.json({ settings, items }, { status: 200 });
}
