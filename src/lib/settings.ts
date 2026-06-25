import { executeQuery, isDbConfigured } from "./db";
import fs from "fs";
import path from "path";
import { darkenColor } from "./colorUtils";

export { darkenColor };

export interface SiteSettings {
  primaryColor: string;
  primaryColorHover: string;
}

const DEFAULT_SETTINGS: SiteSettings = {
  primaryColor: "#dc2626",
  primaryColorHover: "#b91c1c",
};

const settingsFilePath = path.join(process.cwd(), "src/data/settings.json");

/**
 * Gets the current primary color settings.
 * Attemps querying MySQL first, falling back to the settings.json file.
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  if (isDbConfigured()) {
    try {
      const rows = await executeQuery<any[]>(
        "SELECT setting_key, setting_value FROM site_settings"
      );
      if (rows && rows.length > 0) {
        const settings: Partial<SiteSettings> = {};
        for (const row of rows) {
          if (row.setting_key === "primaryColor") {
            settings.primaryColor = row.setting_value;
          } else if (row.setting_key === "primaryColorHover") {
            settings.primaryColorHover = row.setting_value;
          }
        }
        if (settings.primaryColor && settings.primaryColorHover) {
          return settings as SiteSettings;
        }
      }
    } catch (dbErr) {
      console.warn("Settings Lib: Failed to fetch settings from DB, falling back to local file.", dbErr);
    }
  }

  // Fallback to static JSON file
  try {
    if (fs.existsSync(settingsFilePath)) {
      const content = fs.readFileSync(settingsFilePath, "utf8");
      return JSON.parse(content) as SiteSettings;
    }
  } catch (fileErr) {
    console.error("Settings Lib: Failed to read local settings file:", fileErr);
  }

  return DEFAULT_SETTINGS;
}

/**
 * Saves and updates the primary color settings.
 * Synchronizes with database and writes directly to local settings.json.
 */
export async function updateSiteSettings(settings: SiteSettings): Promise<boolean> {
  let dbSuccess = false;

  if (isDbConfigured()) {
    try {
      // Ensure the table exists just in case
      await executeQuery(`
        CREATE TABLE IF NOT EXISTS site_settings (
          setting_key VARCHAR(100) PRIMARY KEY,
          setting_value TEXT NOT NULL
        )
      `);

      await executeQuery(
        "INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?",
        ["primaryColor", settings.primaryColor, settings.primaryColor]
      );
      await executeQuery(
        "INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = ?",
        ["primaryColorHover", settings.primaryColorHover, settings.primaryColorHover]
      );
      dbSuccess = true;
    } catch (dbErr) {
      console.error("Settings Lib: Failed to save settings to DB:", dbErr);
    }
  }

  // Always write to fallback JSON file to remain in sync
  try {
    const dir = path.dirname(settingsFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(settingsFilePath, JSON.stringify(settings, null, 2), "utf8");
  } catch (fileErr) {
    console.error("Settings Lib: Failed to write local settings file:", fileErr);
  }

  return dbSuccess;
}
