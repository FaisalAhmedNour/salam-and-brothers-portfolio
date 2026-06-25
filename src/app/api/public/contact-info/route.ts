import { NextResponse } from "next/server";
import { executeQuery, isDbConfigured } from "@/lib/db";
import fallbackContact from "@/data/contactInfo.json";

/**
 * GET handler: Fetch company contact settings from MySQL
 * or fallback to local static JSON data.
 */
export async function GET() {
  let info = { ...fallbackContact };

  if (isDbConfigured()) {
    try {
      const dbSettings = await executeQuery<any[]>(
        "SELECT setting_key, setting_value FROM site_settings WHERE setting_key LIKE 'contact_%'"
      );
      if (dbSettings && dbSettings.length > 0) {
        dbSettings.forEach((row) => {
          if (row.setting_key === "contact_address_en") info.addressEn = row.setting_value;
          if (row.setting_key === "contact_address_bn") info.addressBn = row.setting_value;
          if (row.setting_key === "contact_factory_address_en") info.factoryAddressEn = row.setting_value;
          if (row.setting_key === "contact_factory_address_bn") info.factoryAddressBn = row.setting_value;
          if (row.setting_key === "contact_email") info.email = row.setting_value;
          if (row.setting_key === "contact_email2") info.email2 = row.setting_value;
          if (row.setting_key === "contact_phone") info.phone = row.setting_value;
        });
      }
    } catch (err) {
      console.error("Failed to query DB contact settings, falling back to static:", err);
    }
  }

  return NextResponse.json(info, { status: 200 });
}
