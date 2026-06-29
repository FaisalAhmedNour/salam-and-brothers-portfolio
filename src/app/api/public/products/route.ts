import { NextResponse } from "next/server";
import { getDbProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

/**
 * GET handler: Fetch all products from MySQL (using consolidated helper).
 */
export async function GET() {
  try {
    const products = await getDbProducts();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Public products GET API error:", error);
    return NextResponse.json(
      { error: "An internal server error occurred loading products." },
      { status: 500 }
    );
  }
}
