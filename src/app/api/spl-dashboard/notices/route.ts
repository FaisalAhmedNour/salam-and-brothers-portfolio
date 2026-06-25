import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";
import { cookies } from "next/headers";

/**
 * Shared helper to verify if the current user is authenticated as administrator.
 */
async function checkAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get("spl_session");
  return !!(session && session.value === "spl_admin_logged_in");
}

/**
 * GET: retrieve notices + attachment files from DB (dashboard preview).
 */
export async function GET() {
  try {
    const dbNotices = await executeQuery<any[]>("SELECT * FROM notices ORDER BY publish_date DESC");
    if (dbNotices) {
      const notices = [];
      for (const n of dbNotices) {
        const dbFiles = (await executeQuery<any[]>(
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
    return NextResponse.json([], { status: 200 });
  } catch (error) {
    console.error("Dashboard Notices GET error:", error);
    return NextResponse.json({ error: "Failed to query notices database" }, { status: 500 });
  }
}

/**
 * POST: Create a new notice and its attachment records.
 */
export async function POST(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const notice = await request.json();
    const {
      id, refNo, publishDate, category, titleEn, titleBn,
      contentEn, contentBn, files, signatoryEn, signatoryBn, designationEn, designationBn
    } = notice;

    if (!id || !refNo || !publishDate || !category || !titleEn) {
      return NextResponse.json({ error: "Missing required notice fields" }, { status: 400 });
    }

    // Insert main notice entry
    const insertNoticeQuery = `
      INSERT INTO notices (
        id, ref_no, publish_date, category, title_en, title_bn, content_en, content_bn,
        signatory_en, signatory_bn, designation_en, designation_bn
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const noticeParams = [
      id, refNo, publishDate, category, titleEn, titleBn || "", contentEn || "", contentBn || "",
      signatoryEn || "", signatoryBn || "", designationEn || "", designationBn || ""
    ];
    await executeQuery(insertNoticeQuery, noticeParams);

    // Insert files if present
    if (files && Array.isArray(files)) {
      for (const file of files) {
        await executeQuery(
          "INSERT INTO notice_files (notice_id, name_en, name_bn, url, size) VALUES (?, ?, ?, ?, ?)",
          [id, file.nameEn, file.nameBn || file.nameEn, file.url, file.size || ""]
        );
      }
    }

    return NextResponse.json({ success: true, message: "Notice published successfully." }, { status: 200 });
  } catch (error) {
    console.error("Dashboard Notice POST error:", error);
    return NextResponse.json({ error: "Failed to insert notice record" }, { status: 500 });
  }
}

/**
 * PUT: Update an existing notice record.
 */
export async function PUT(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const notice = await request.json();
    const {
      id, refNo, publishDate, category, titleEn, titleBn,
      contentEn, contentBn, files, signatoryEn, signatoryBn, designationEn, designationBn
    } = notice;

    if (!id) {
      return NextResponse.json({ error: "Notice ID is required for editing" }, { status: 400 });
    }

    // Update main notice record
    const updateNoticeQuery = `
      UPDATE notices SET 
        ref_no = ?, publish_date = ?, category = ?, title_en = ?, title_bn = ?, 
        content_en = ?, content_bn = ?, signatory_en = ?, signatory_bn = ?, 
        designation_en = ?, designation_bn = ?
      WHERE id = ?
    `;
    const noticeParams = [
      refNo, publishDate, category, titleEn, titleBn || "", contentEn || "", contentBn || "",
      signatoryEn || "", signatoryBn || "", designationEn || "", designationBn || "", id
    ];
    await executeQuery(updateNoticeQuery, noticeParams);

    // Clear old files and write new ones
    await executeQuery("DELETE FROM notice_files WHERE notice_id = ?", [id]);

    if (files && Array.isArray(files)) {
      for (const file of files) {
        await executeQuery(
          "INSERT INTO notice_files (notice_id, name_en, name_bn, url, size) VALUES (?, ?, ?, ?, ?)",
          [id, file.nameEn, file.nameBn || file.nameEn, file.url, file.size || ""]
        );
      }
    }

    return NextResponse.json({ success: true, message: "Notice updated successfully." }, { status: 200 });
  } catch (error) {
    console.error("Dashboard Notice PUT error:", error);
    return NextResponse.json({ error: "Failed to update notice record" }, { status: 500 });
  }
}

/**
 * DELETE: Remove a notice.
 */
export async function DELETE(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Notice ID parameter is required" }, { status: 400 });
    }

    // notice_files has ON DELETE CASCADE relationship in schema.sql, so they will be deleted automatically!
    await executeQuery("DELETE FROM notices WHERE id = ?", [id]);
    return NextResponse.json({ success: true, message: "Notice deleted successfully." }, { status: 200 });
  } catch (error) {
    console.error("Dashboard Notice DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete notice record" }, { status: 500 });
  }
}
