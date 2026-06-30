import { NextResponse } from "next/server";
import { getSiteSettings } from "@/lib/settings";

/**
 * GET handler: Fetch company contact settings using the cached site settings helper.
 */
export async function GET() {
  try {
    const settings = await getSiteSettings();
    return NextResponse.json(settings.contactInfo || {}, { status: 200 });
  } catch (error) {
    console.error("Public contact-info GET API error:", error);
    return NextResponse.json(
      { error: "An internal server error occurred loading contact details." },
      { status: 500 }
    );
  }
}
