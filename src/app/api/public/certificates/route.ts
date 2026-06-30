import { NextResponse } from "next/server";
import { getDbCertificates } from "@/lib/certificates";

/**
 * GET handler: Fetch all certificates from MySQL or fallback to local static data using cached getter.
 */
export async function GET() {
  try {
    const certs = await getDbCertificates();
    return NextResponse.json(certs, { status: 200 });
  } catch (err) {
    console.error("Failed to fetch public certificates:", err);
    return NextResponse.json(
      { error: "An internal server error occurred loading certificates." },
      { status: 500 }
    );
  }
}
