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
 * GET: retrieve contact inquiries directly from DB (dashboard preview).
 */
export async function GET() {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const dbInquiries = await executeQuery<any[]>(
      "SELECT * FROM inquiries ORDER BY created_at DESC"
    );
    if (dbInquiries) {
      const inquiries = dbInquiries.map((i) => ({
        id: i.id,
        name: i.name,
        email: i.email,
        mobile: i.mobile || "",
        subject: i.subject,
        message: i.message,
        created_at: new Date(i.created_at).toISOString(),
        status: i.status || "unread",
      }));
      return NextResponse.json(inquiries, { status: 200 });
    }
    return NextResponse.json([], { status: 200 });
  } catch (error) {
    console.error("Dashboard Inquiries GET error:", error);
    return NextResponse.json({ error: "Failed to query inquiries database" }, { status: 500 });
  }
}

/**
 * PUT: Update status of inquiry (e.g. read, resolved).
 */
export async function PUT(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "Inquiry ID and Status are required" }, { status: 400 });
    }

    await executeQuery("UPDATE inquiries SET status = ? WHERE id = ?", [status, id]);
    return NextResponse.json(
      { success: true, message: "Inquiry status updated successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Dashboard Inquiry PUT error:", error);
    return NextResponse.json({ error: "Failed to update inquiry record" }, { status: 500 });
  }
}

/**
 * DELETE: Remove an inquiry.
 */
export async function DELETE(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Inquiry ID parameter is required" }, { status: 400 });
    }

    await executeQuery("DELETE FROM inquiries WHERE id = ?", [id]);
    return NextResponse.json(
      { success: true, message: "Inquiry record deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Dashboard Inquiry DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete inquiry record" }, { status: 500 });
  }
}
