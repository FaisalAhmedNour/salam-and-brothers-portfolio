import { NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";
import crypto from "crypto";
import { cookies } from "next/headers";

/**
 * SHA-256 hashing helper using Node's native crypto module.
 */
function hashSha256(text: string): string {
  return crypto.createHash("sha256").update(text).digest("hex");
}

/**
 * GET handler: check current login status based on secure session cookie.
 */
export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("spl_session");

    if (session && session.value === "spl_admin_logged_in") {
      return NextResponse.json({ authenticated: true }, { status: 200 });
    }
    return NextResponse.json({ authenticated: false }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }
}

/**
 * POST handler: perform credentials verification and set secure cookie on success.
 */
export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required." },
        { status: 400 }
      );
    }

    const inputHash = hashSha256(password);
    let isAuthenticated = false;

    // 1. Try DB validation
    try {
      const users = await executeQuery<any[]>(
        "SELECT * FROM admin_users WHERE username = ? AND password_hash = ?",
        [username, inputHash]
      );
      if (users && users.length > 0) {
        isAuthenticated = true;
      }
    } catch (dbErr) {
      console.warn("Authentication DB verification failed, trying fallback check.", dbErr);
    }

    // 2. Fallback check: environment variables or default admin/admin
    const fallbackUser = process.env.ADMIN_USERNAME || "admin";
    const fallbackPassword = process.env.ADMIN_PASSWORD || "admin";
    const fallbackHash = hashSha256(fallbackPassword);

    if (
      !isAuthenticated &&
      username === fallbackUser &&
      inputHash === fallbackHash
    ) {
      isAuthenticated = true;
    }

    // Set secure HTTP-only cookie upon authorization success
    if (isAuthenticated) {
      const cookieStore = await cookies();
      cookieStore.set("spl_session", "spl_admin_logged_in", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24, // 24 hours
      });
      return NextResponse.json(
        { success: true, message: "Logged in successfully." },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: "Invalid username or password credentials." },
      { status: 401 }
    );
  } catch (error) {
    console.error("Auth API Error:", error);
    return NextResponse.json(
      { error: "An internal server error occurred." },
      { status: 500 }
    );
  }
}

/**
 * DELETE handler: remove the session cookie to logout.
 */
export async function DELETE() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("spl_session");
    return NextResponse.json(
      { success: true, message: "Logged out successfully." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to perform logout transaction." },
      { status: 500 }
    );
  }
}
