import { executeQuery, isDbConfigured } from "./db";
import fallbackNotices from "@/data/notices.json";
import { unstable_cache } from "next/cache";
import { promises as fs } from "fs";
import path from "path";

export interface NoticeFile {
  nameEn: string;
  nameBn: string;
  url: string;
  size: string;
}

export interface NoticeItem {
  id: string;
  refNo: string;
  publishDate: string;
  category: string;
  titleEn: string;
  titleBn: string;
  contentEn: string;
  contentBn: string;
  signatoryEn: string;
  signatoryBn: string;
  designationEn: string;
  designationBn: string;
  files: NoticeFile[];
}

/**
 * RAW: Fetches all notices and files in a single LEFT JOIN query (bypassing cache layer).
 */
async function getDbNoticesRaw(): Promise<NoticeItem[]> {
  if (isDbConfigured()) {
    try {
      const rows = await executeQuery<any[]>(`
        SELECT 
          n.id as notice_id, n.ref_no, n.publish_date, n.category, n.title_en, n.title_bn, 
          n.content_en, n.content_bn, n.signatory_en, n.signatory_bn, n.designation_en, n.designation_bn,
          f.name_en as file_name_en, f.name_bn as file_name_bn, f.url as file_url, f.size as file_size
        FROM notices n
        LEFT JOIN notice_files f ON n.id = f.notice_id
        ORDER BY n.publish_date DESC, n.id DESC
      `);

      if (rows && rows.length > 0) {
        const noticesMap = new Map<string, NoticeItem>();
        for (const row of rows) {
          if (!noticesMap.has(row.notice_id)) {
            let formattedDate = "";
            if (row.publish_date) {
              if (row.publish_date instanceof Date) {
                formattedDate = row.publish_date.toISOString().split("T")[0];
              } else {
                formattedDate = String(row.publish_date).split("T")[0];
              }
            }
            noticesMap.set(row.notice_id, {
              id: row.notice_id,
              refNo: row.ref_no,
              publishDate: formattedDate,
              category: row.category,
              titleEn: row.title_en,
              titleBn: row.title_bn,
              contentEn: row.content_en || "",
              contentBn: row.content_bn || "",
              signatoryEn: row.signatory_en || "",
              signatoryBn: row.signatory_bn || "",
              designationEn: row.designation_en || "",
              designationBn: row.designation_bn || "",
              files: [],
            });
          }

          if (row.file_url) {
            noticesMap.get(row.notice_id)!.files.push({
              nameEn: row.file_name_en || "",
              nameBn: row.file_name_bn || "",
              url: row.file_url,
              size: row.file_size || "",
            });
          }
        }
        return Array.from(noticesMap.values());
      }
    } catch (err) {
      console.error("Failed to query DB notices, falling back to static:", err);
    }
  }

  // Fallback: Read local notices.json file dynamically from disk
  try {
    const localJsonPath = path.join(process.cwd(), "src/data/notices.json");
    const data = await fs.readFile(localJsonPath, "utf-8");
    return JSON.parse(data) as NoticeItem[];
  } catch (err) {
    return fallbackNotices as NoticeItem[];
  }
}

/**
 * Gets cached notices list.
 */
export const getDbNotices = unstable_cache(
  async (): Promise<NoticeItem[]> => {
    return getDbNoticesRaw();
  },
  ["notices-list-cache-key"],
  { tags: ["notices"], revalidate: 300 }
);
