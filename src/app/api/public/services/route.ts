import { NextResponse } from "next/server";
import { getServicesData } from "@/lib/services";

/**
 * GET handler: Fetch both services settings and checklist items from MySQL using cached getter or fallback to local static JSON data.
 */
export async function GET() {
  try {
    const { items, settings } = await getServicesData();
    return NextResponse.json({ settings, items }, { status: 200 });
  } catch (err) {
    console.error("Failed to fetch public services:", err);
    return NextResponse.json(
      { error: "An internal server error occurred loading services." },
      { status: 500 }
    );
  }
}
