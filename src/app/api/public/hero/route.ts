import { NextResponse } from "next/server";
import { getDbHeroSlides } from "@/lib/settings";

/**
 * GET: Retrieves active cached hero section slides.
 */
export async function GET() {
  try {
    const slides = await getDbHeroSlides();
    return NextResponse.json(slides, { status: 200 });
  } catch (error) {
    console.error("Public hero slides GET API error:", error);
    return NextResponse.json(
      { error: "An internal server error occurred loading hero slides." },
      { status: 500 }
    );
  }
}
