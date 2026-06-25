import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

/**
 * Helper to format file sizes in bytes to human-readable string.
 */
function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

/**
 * Handles POST requests to /api/spl-dashboard/upload.
 * Receives file data, writes to the filesystem (outside or inside project based on UPLOAD_DIR),
 * and returns the mapped public URL.
 */
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert file object to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Resolve write directory path: UPLOAD_DIR environment variable or fallback to public/uploads
    const uploadDirEnv = process.env.UPLOAD_DIR;
    const targetDir = uploadDirEnv
      ? path.resolve(uploadDirEnv)
      : path.join(process.cwd(), "public", "uploads");

    // Make sure the target directory exists
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // Generate secure and unique filename to prevent namespace clashes
    const fileExt = path.extname(file.name);
    const baseName = path.basename(file.name, fileExt)
      .toLowerCase()
      .replace(/[^a-z0-9_-]+/g, "-");
    const uniqueName = `${baseName}-${Date.now()}${fileExt}`;
    const targetPath = path.join(targetDir, uniqueName);

    // Write file to server storage
    fs.writeFileSync(targetPath, buffer);

    // Determine the accessible URL to serve back to the client
    const uploadUrlEnv = process.env.NEXT_PUBLIC_UPLOAD_URL;
    const fileUrl = uploadUrlEnv
      ? `${uploadUrlEnv.replace(/\/$/, "")}/${uniqueName}`
      : `/uploads/${uniqueName}`;

    return NextResponse.json(
      {
        url: fileUrl,
        filename: uniqueName,
        size: formatBytes(file.size),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Upload API Error:", error);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}
