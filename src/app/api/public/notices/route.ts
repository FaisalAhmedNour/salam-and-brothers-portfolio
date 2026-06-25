import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";
import staticNotices from "@/data/notices.json";

/**
 * GET handler: Fetch notices and files from MySQL or fallback to local static notices.json.
 */
export async function GET() {
  try {
    const dbNotices = await executeQuery<any[]>(
      "SELECT * FROM notices ORDER BY publish_date DESC"
    );
    if (dbNotices && dbNotices.length > 0) {
      const notices = [];
      for (const n of dbNotices) {
        // Query attachments for this specific notice record
        const dbFiles =
          (await executeQuery<any[]>(
            "SELECT * FROM notice_files WHERE notice_id = ?",
            [n.id]
          )) || [];

        notices.push({
          id: n.id,
          refNo: n.ref_no,
          publishDate: new Date(n.publish_date).toISOString().split("T")[0],
          category: n.category,
          titleEn: n.title_en,
          titleBn: n.title_bn,
          contentEn: n.content_en,
          contentBn: n.content_bn,
          files: dbFiles.map((f) => ({
            nameEn: f.name_en,
            nameBn: f.name_bn,
            url: f.url,
            size: f.size,
          })),
          signatoryEn: n.signatory_en,
          signatoryBn: n.signatory_bn,
          designationEn: n.designation_en,
          designationBn: n.designation_bn,
        });
      }
      return NextResponse.json(notices, { status: 200 });
    }
  } catch (err) {
    console.error("Failed to query DB notices, falling back to static:", err);
  }
  return NextResponse.json(staticNotices, { status: 200 });
}
