import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";
import { cookies } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";

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
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

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
      const noticesMap = new Map<string, any>();
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
          noticesMap.get(row.notice_id).files.push({
            nameEn: row.file_name_en || "",
            nameBn: row.file_name_bn || "",
            url: row.file_url,
            size: row.file_size || "",
          });
        }
      }
      return NextResponse.json(Array.from(noticesMap.values()), { status: 200 });
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

    // Insert files if present using a single batch query (Goal 2)
    if (files && Array.isArray(files) && files.length > 0) {
      const placeholders = files.map(() => "(?, ?, ?, ?, ?)").join(", ");
      const insertFilesQuery = `INSERT INTO notice_files (notice_id, name_en, name_bn, url, size) VALUES ${placeholders}`;
      const filesParams = files.flatMap(file => [
        id,
        file.nameEn,
        file.nameBn || file.nameEn,
        file.url,
        file.size || ""
      ]);
      await executeQuery(insertFilesQuery, filesParams);
    }

    // Purge ISR page caches and tags on modifications
    revalidatePath("/notices");
    revalidatePath("/");
    revalidatePath("/", "layout");
    revalidateTag("notices", "max");

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

    if (files && Array.isArray(files) && files.length > 0) {
      const placeholders = files.map(() => "(?, ?, ?, ?, ?)").join(", ");
      const insertFilesQuery = `INSERT INTO notice_files (notice_id, name_en, name_bn, url, size) VALUES ${placeholders}`;
      const filesParams = files.flatMap(file => [
        id,
        file.nameEn,
        file.nameBn || file.nameEn,
        file.url,
        file.size || ""
      ]);
      await executeQuery(insertFilesQuery, filesParams);
    }

    // Purge ISR page caches and tags on modifications
    revalidatePath("/notices");
    revalidatePath("/");
    revalidatePath("/", "layout");
    revalidateTag("notices", "max");

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

    // Purge ISR page caches and tags on modifications
    revalidatePath("/notices");
    revalidatePath("/");
    revalidatePath("/", "layout");
    revalidateTag("notices", "max");

    return NextResponse.json({ success: true, message: "Notice deleted successfully." }, { status: 200 });
  } catch (error) {
    console.error("Dashboard Notice DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete notice record" }, { status: 500 });
  }
}
