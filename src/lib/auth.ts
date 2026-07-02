import crypto from "crypto";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "default_fallback_jwt_secret_seeco_power_ltd_2026";

if (process.env.NODE_ENV === "production" && (!process.env.JWT_SECRET || process.env.JWT_SECRET === "default_fallback_jwt_secret_seeco_power_ltd_2026")) {
  console.warn("WARNING: JWT_SECRET environment variable is not configured or using default fallback in production environment!");
}

/**
 * SHA-256 hashing helper using Node's native crypto module.
 */
export function hashSha256(text: string): string {
  return crypto.createHash("sha256").update(text).digest("hex");
}

interface JWTPayload {
  username: string;
  exp: number;
}

/**
 * Signs a payload into a secure HMAC-SHA256 signature token.
 */
export async function signToken(payload: JWTPayload): Promise<string> {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  
  const signatureInput = `${header}.${encodedPayload}`;
  const signature = crypto
    .createHmac("sha256", JWT_SECRET)
    .update(signatureInput)
    .digest("base64url");

  return `${signatureInput}.${signature}`;
}

/**
 * Verifies a token's HMAC-SHA256 signature and returns the payload if valid and not expired.
 */
export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      return null;
    }

    const [header, encodedPayload, signature] = parts;
    const signatureInput = `${header}.${encodedPayload}`;
    
    // Verify signature
    const expectedSignature = crypto
      .createHmac("sha256", JWT_SECRET)
      .update(signatureInput)
      .digest("base64url");

    if (signature !== expectedSignature) {
      return null;
    }

    // Decode and parse payload
    const payloadStr = Buffer.from(encodedPayload, "base64url").toString("utf8");
    const payload = JSON.parse(payloadStr) as JWTPayload;

    // Check expiration
    if (Date.now() > payload.exp) {
      return null;
    }

    return payload;
  } catch (err) {
    return null;
  }
}

/**
 * Shared helper to verify if the current user is authenticated as administrator.
 */
export async function checkAuth(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("spl_session");

    if (!sessionCookie || !sessionCookie.value) {
      return false;
    }

    const payload = await verifyToken(sessionCookie.value);
    return payload !== null;
  } catch (err) {
    return false;
  }
}
