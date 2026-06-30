import { executeQuery, isDbConfigured } from "./db";
import fallbackCerts from "@/data/certificates.json";
import { unstable_cache } from "next/cache";
import { promises as fs } from "fs";
import path from "path";

export interface CertificateItem {
  id: string;
  titleEn: string;
  titleBn: string;
  authorityEn: string;
  authorityBn: string;
  descEn: string;
  descBn: string;
  image: string;
  orderIndex: number;
}

/**
 * RAW: Fetches all certificates from MySQL (bypassing cache layer).
 */
async function getDbCertificatesRaw(): Promise<CertificateItem[]> {
  if (isDbConfigured()) {
    try {
      const rows = await executeQuery<any[]>(
        "SELECT * FROM certificates ORDER BY order_index ASC, id ASC"
      );
      if (rows && rows.length > 0) {
        return rows.map((c) => ({
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
      }
    } catch (err) {
      console.error("Failed to query DB certificates, falling back to static:", err);
    }
  }

  // Fallback: Read local certificates.json file dynamically from disk
  try {
    const localJsonPath = path.join(process.cwd(), "src/data/certificates.json");
    const data = await fs.readFile(localJsonPath, "utf-8");
    return JSON.parse(data) as CertificateItem[];
  } catch (err) {
    return fallbackCerts as CertificateItem[];
  }
}

/**
 * Gets cached certificates list.
 */
export const getDbCertificates = unstable_cache(
  async (): Promise<CertificateItem[]> => {
    return getDbCertificatesRaw();
  },
  ["certificates-list-cache-key"],
  { tags: ["certificates"], revalidate: 300 }
);
