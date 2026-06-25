import { NextResponse } from "next/server";
import { executeQuery, isDbConfigured } from "@/lib/db";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

/**
 * Shared helper to verify if the current user is authenticated as administrator.
 */
async function checkAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get("spl_session");
  return !!(session && session.value === "spl_admin_logged_in");
}

/**
 * Helper to ensure the media database table exists when MySQL is configured.
 */
async function initializeMediaTable() {
  if (isDbConfigured()) {
    try {
      await executeQuery(`
        CREATE TABLE IF NOT EXISTS media (
          id INT AUTO_INCREMENT PRIMARY KEY,
          filename VARCHAR(255) NOT NULL UNIQUE,
          original_name VARCHAR(255) NOT NULL,
          mime_type VARCHAR(100) NOT NULL,
          file_size VARCHAR(50) NOT NULL,
          url VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
    } catch (err) {
      console.error("Failed to initialize media table:", err);
    }
  }
}

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

const localJsonPath = path.join(process.cwd(), "src/data/media.json");

/**
 * Read media array from fallback JSON file.
 */
function readFallbackJson(): any[] {
  try {
    if (fs.existsSync(localJsonPath)) {
      const data = fs.readFileSync(localJsonPath, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Failed to read fallback media.json:", err);
  }
  return [];
}

/**
 * Write media array to fallback JSON file.
 */
function writeFallbackJson(data: any[]) {
  try {
    const dir = path.dirname(localJsonPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(localJsonPath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write fallback media.json:", err);
  }
}

/**
 * GET: Fetch all media metadata.
 */
export async function GET() {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  await initializeMediaTable();

  // Try fetching from database if configured
  if (isDbConfigured()) {
    try {
      const rows = await executeQuery<any[]>(
        "SELECT id, filename, original_name as originalName, mime_type as mimeType, file_size as fileSize, url, created_at as createdAt FROM media ORDER BY created_at DESC"
      );
      if (rows) {
        return NextResponse.json(rows, { status: 200 });
      }
    } catch (err) {
      console.warn("Media GET DB error, falling back to local JSON:", err);
    }
  }

  // Fallback to local JSON
  const fallbackData = readFallbackJson();
  // Sort fallback data by date descending (assuming new items are appended)
  const sortedFallback = [...fallbackData].reverse();
  return NextResponse.json(sortedFallback, { status: 200 });
}

/**
 * POST: Upload a new media file and register in metadata store.
 */
export async function POST(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  await initializeMediaTable();

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert file object to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Resolve target write directory
    const uploadDirEnv = process.env.UPLOAD_DIR;
    const targetDir = uploadDirEnv
      ? path.resolve(uploadDirEnv)
      : path.join(process.cwd(), "public", "uploads");

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // Generate unique name
    const fileExt = path.extname(file.name);
    const baseName = path.basename(file.name, fileExt)
      .toLowerCase()
      .replace(/[^a-z0-9_-]+/g, "-");
    const uniqueName = `${baseName}-${Date.now()}${fileExt}`;
    const targetPath = path.join(targetDir, uniqueName);

    // Write file to filesystem
    fs.writeFileSync(targetPath, buffer);

    // Compute URL
    const uploadUrlEnv = process.env.NEXT_PUBLIC_UPLOAD_URL;
    const fileUrl = uploadUrlEnv
      ? `${uploadUrlEnv.replace(/\/$/, "")}/${uniqueName}`
      : `/uploads/${uniqueName}`;

    const formattedSize = formatBytes(file.size);
    const mimeType = file.type || "application/octet-stream";
    const originalName = file.name;

    const newMedia = {
      filename: uniqueName,
      originalName,
      mimeType,
      fileSize: formattedSize,
      url: fileUrl,
      createdAt: new Date().toISOString(),
    };

    let insertedId: string | number = Date.now();

    // 1. Save to Database (if configured)
    if (isDbConfigured()) {
      try {
        const query = `
          INSERT INTO media (filename, original_name, mime_type, file_size, url)
          VALUES (?, ?, ?, ?, ?)
        `;
        const result = await executeQuery<any>(query, [
          uniqueName,
          originalName,
          mimeType,
          formattedSize,
          fileUrl,
        ]);
        if (result && result.insertId) {
          insertedId = result.insertId;
        }
      } catch (dbErr) {
        console.error("Failed to insert media metadata into DB:", dbErr);
      }
    }

    // 2. Always write to fallback JSON file to remain in sync
    const currentFallback = readFallbackJson();
    const fallbackEntry = {
      id: insertedId,
      ...newMedia,
    };
    currentFallback.push(fallbackEntry);
    writeFallbackJson(currentFallback);

    return NextResponse.json(fallbackEntry, { status: 200 });
  } catch (error) {
    console.error("Media POST API Error:", error);
    return NextResponse.json({ error: "Failed to upload media and store metadata" }, { status: 500 });
  }
}

/**
 * DELETE: Delete a media file and remove from metadata store.
 */
export async function DELETE(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  await initializeMediaTable();

  try {
    const { searchParams } = new URL(request.url);
    const idParam = searchParams.get("id");

    if (!idParam) {
      return NextResponse.json({ error: "Media ID is required for deletion" }, { status: 400 });
    }

    let filenameToDelete = "";
    let isFound = false;

    // Retrieve filename from DB
    if (isDbConfigured()) {
      try {
        const rows = await executeQuery<any[]>(
          "SELECT filename FROM media WHERE id = ?",
          [idParam]
        );
        if (rows && rows.length > 0) {
          filenameToDelete = rows[0].filename;
          isFound = true;
        }
      } catch (dbErr) {
        console.error("Failed to query media for deletion from DB:", dbErr);
      }
    }

    // Fallback/sync to local JSON filename query
    const fallbackData = readFallbackJson();
    const fallbackItem = fallbackData.find((item) => String(item.id) === String(idParam));
    if (fallbackItem) {
      filenameToDelete = fallbackItem.filename;
      isFound = true;
    }

    if (!isFound || !filenameToDelete) {
      return NextResponse.json({ error: "Media file record not found" }, { status: 404 });
    }

    // 1. Delete physical file
    const uploadDirEnv = process.env.UPLOAD_DIR;
    const targetDir = uploadDirEnv
      ? path.resolve(uploadDirEnv)
      : path.join(process.cwd(), "public", "uploads");
    const targetPath = path.join(targetDir, filenameToDelete);

    try {
      if (fs.existsSync(targetPath)) {
        fs.unlinkSync(targetPath);
      }
    } catch (fsErr) {
      console.warn(`Physical file deletion failed for ${filenameToDelete}:`, fsErr);
    }

    // 2. Delete from Database
    if (isDbConfigured()) {
      try {
        await executeQuery("DELETE FROM media WHERE id = ?", [idParam]);
      } catch (dbErr) {
        console.error("Failed to delete media from DB:", dbErr);
      }
    }

    // 3. Delete from fallback JSON
    const updatedFallback = fallbackData.filter((item) => String(item.id) !== String(idParam));
    writeFallbackJson(updatedFallback);

    return NextResponse.json({ success: true, message: "Media deleted successfully." }, { status: 200 });
  } catch (error) {
    console.error("Media DELETE API Error:", error);
    return NextResponse.json({ error: "Failed to delete media record" }, { status: 500 });
  }
}
