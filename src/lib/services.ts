import { executeQuery, isDbConfigured } from "./db";
import fallbackItems from "@/data/services.json";
import fallbackSettings from "@/data/servicesSettings.json";
import { unstable_cache } from "next/cache";
import { promises as fs } from "fs";
import path from "path";

export interface ServiceItem {
  id: string;
  titleEn: string;
  titleBn: string;
  descEn: string;
  descBn: string;
  orderIndex: number;
}

export interface ServiceSettings {
  headlineEn: string;
  headlineBn: string;
  subtitleEn: string;
  subtitleBn: string;
  imagePath: string;
}

/**
 * RAW: Fetches service layout settings and checklist items concurrently (bypassing cache layer).
 */
async function getServicesDataRaw(): Promise<{ items: ServiceItem[]; settings: ServiceSettings }> {
  let items = fallbackItems as ServiceItem[];
  let settings = fallbackSettings as ServiceSettings;
  let loadedFromDb = false;

  if (isDbConfigured()) {
    try {
      // Execute settings and items queries concurrently to optimize database time (Goal 2 & 18)
      const [dbSettings, dbItems] = await Promise.all([
        executeQuery<any[]>(
          "SELECT setting_key, setting_value FROM site_settings WHERE setting_key LIKE 'services_%'"
        ),
        executeQuery<any[]>(
          "SELECT * FROM services ORDER BY order_index ASC, id ASC"
        )
      ]);

      if (dbSettings && dbSettings.length > 0) {
        const mappedSettings: any = {};
        dbSettings.forEach((row) => {
          const key = row.setting_key.replace("services_", "");
          mappedSettings[key] = row.setting_value;
        });
        settings = {
          headlineEn: mappedSettings.headline_en || fallbackSettings.headlineEn,
          headlineBn: mappedSettings.headline_bn || fallbackSettings.headlineBn,
          subtitleEn: mappedSettings.subtitle_en || fallbackSettings.subtitleEn,
          subtitleBn: mappedSettings.subtitle_bn || fallbackSettings.subtitleBn,
          imagePath: mappedSettings.image_path || fallbackSettings.imagePath,
        };
      }

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

      if (dbItems) {
        loadedFromDb = true;
      }
    } catch (err) {
      console.error("Failed to load DB services, using fallbacks:", err);
    }
  }

  // Fallback: Read local services data files dynamically from disk
  if (!loadedFromDb) {
    try {
      const itemsPath = path.join(process.cwd(), "src/data/services.json");
      const itemsData = await fs.readFile(itemsPath, "utf-8");
      items = JSON.parse(itemsData);
    } catch (err) {
      // Ignore
    }

    try {
      const settingsPath = path.join(process.cwd(), "src/data/servicesSettings.json");
      const settingsData = await fs.readFile(settingsPath, "utf-8");
      settings = JSON.parse(settingsData);
    } catch (err) {
      // Ignore
    }
  }

  return { items, settings };
}

/**
 * Gets cached services page settings and checklist items.
 */
export const getServicesData = unstable_cache(
  async () => {
    return getServicesDataRaw();
  },
  ["services-data-cache-key"],
  { tags: ["services", "settings"], revalidate: 300 }
);
