import { NextResponse } from "next/server";
import { getDbNotices } from "@/lib/notices";

/**
 * GET handler: Fetch notices and files from MySQL using cached getter or fallback to local static notices.json.
 */
export async function GET() {
  try {
    const notices = await getDbNotices();
    return NextResponse.json(notices, { status: 200 });
  } catch (err) {
    console.error("Failed to fetch public notices:", err);
    return NextResponse.json(
      { error: "An internal server error occurred loading notices." },
      { status: 500 }
    );
  }
}
