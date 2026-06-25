import { NextResponse } from "next/server";
import { executeQuery, isDbConfigured } from "@/lib/db";
import fallbackCerts from "@/data/certificates.json";

/**
 * GET handler: Fetch all certificates from MySQL (sorted by order_index ASC) or fallback to local static data.
 */
export async function GET() {
  if (isDbConfigured()) {
    try {
      const dbCerts = await executeQuery<any[]>(
        "SELECT * FROM certificates ORDER BY order_index ASC"
      );
      if (dbCerts && dbCerts.length > 0) {
        const certs = dbCerts.map((c) => ({
          id: c.id,
          titleEn: c.title_en,
          titleBn: c.title_bn,
          authorityEn: c.authority_en,
          authorityBn: c.authority_bn,
          descEn: c.desc_en,
          descBn: c.desc_bn,
          image: c.image || "",
          orderIndex: c.order_index,
        }));
        return NextResponse.json(certs, { status: 200 });
      }
    } catch (err) {
      console.error("Failed to query DB certificates, falling back to static:", err);
    }
  }
  return NextResponse.json(fallbackCerts, { status: 200 });
}
