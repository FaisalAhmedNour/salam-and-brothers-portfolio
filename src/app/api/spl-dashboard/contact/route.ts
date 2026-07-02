import { NextResponse } from "next/server";
import { executeQuery, isDbConfigured } from "@/lib/db";
import fs from "fs";
import path from "path";
import { checkAuth } from "@/lib/auth";

const jsonPath = path.join(process.cwd(), "src/data/contactInfo.json");

function readJson(): any {
  try {
    if (fs.existsSync(jsonPath)) {
      return JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
    }
  } catch (err) {
    console.error("Failed to read fallback contactInfo.json:", err);
  }
  return {};
}

function writeJson(data: any) {
  try {
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write fallback contactInfo.json:", err);
  }
}

/**
 * GET: retrieve contact settings.
 */
export async function GET() {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  let info = readJson();

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
          if (row.setting_key === "contact_phone2") info.phone2 = row.setting_value;
          if (row.setting_key === "contact_whatsapp") info.whatsapp = row.setting_value;
        });
      }
    } catch (error) {
      console.error("Dashboard Contact GET DB error, falling back to local JSON:", error);
    }
  }

  return NextResponse.json(info, { status: 200 });
}

/**
 * PUT: Update contact settings.
 */
export async function PUT(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const { addressEn, addressBn, factoryAddressEn, factoryAddressBn, email, email2, phone, phone2, whatsapp } = data;

    if (isDbConfigured()) {
      try {
        const settingsToUpdate = [
          { key: "contact_address_en", value: addressEn },
          { key: "contact_address_bn", value: addressBn },
          { key: "contact_factory_address_en", value: factoryAddressEn },
          { key: "contact_factory_address_bn", value: factoryAddressBn },
          { key: "contact_email", value: email },
          { key: "contact_email2", value: email2 },
          { key: "contact_phone", value: phone },
          { key: "contact_phone2", value: phone2 },
          { key: "contact_whatsapp", value: whatsapp },
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
        console.error("Failed to update contact settings in DB:", dbErr);
      }
    }

    // Always update fallback JSON file
    writeJson({
      addressEn: addressEn || "",
      addressBn: addressBn || "",
      factoryAddressEn: factoryAddressEn || "",
      factoryAddressBn: factoryAddressBn || "",
      email: email || "",
      email2: email2 || "",
      phone: phone || "",
      phone2: phone2 || "",
      whatsapp: whatsapp || "",
    });

    return NextResponse.json({ success: true, message: "Contact information updated successfully." }, { status: 200 });
  } catch (error) {
    console.error("Dashboard Contact PUT error:", error);
    return NextResponse.json({ error: "Failed to update contact record" }, { status: 500 });
  }
}
