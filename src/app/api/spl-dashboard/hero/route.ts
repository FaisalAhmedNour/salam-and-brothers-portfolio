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

const localJsonPath = path.join(process.cwd(), "src/data/hero_slides.json");

/**
 * Read slides array from fallback JSON file.
 */
function readFallbackJson(): any[] {
  try {
    if (fs.existsSync(localJsonPath)) {
      const data = fs.readFileSync(localJsonPath, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Failed to read fallback hero_slides.json:", err);
  }
  return [];
}

/**
 * Write slides array to fallback JSON file.
 */
function writeFallbackJson(data: any[]) {
  try {
    const dir = path.dirname(localJsonPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(localJsonPath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write fallback hero_slides.json:", err);
  }
}

/**
 * Helper to ensure the database table exists.
 */
async function initializeHeroTable() {
  if (isDbConfigured()) {
    try {
      await executeQuery(`
        CREATE TABLE IF NOT EXISTS hero_slides (
          id INT AUTO_INCREMENT PRIMARY KEY,
          image_path VARCHAR(255) NOT NULL,
          badge_en VARCHAR(255),
          badge_bn VARCHAR(255),
          title_en VARCHAR(255) NOT NULL,
          title_bn VARCHAR(255) NOT NULL,
          description_en TEXT,
          description_bn TEXT,
          order_index INT DEFAULT 0,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
    } catch (err) {
      console.error("Failed to initialize hero slides table:", err);
    }
  }
}

/**
 * GET: Retrieve all slides for admin management.
 */
export async function GET() {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  await initializeHeroTable();

  if (isDbConfigured()) {
    try {
      const rows = await executeQuery<any[]>(
        "SELECT * FROM hero_slides ORDER BY order_index ASC, id ASC"
      );
      if (rows) {
        const slides = rows.map((row) => ({
          id: row.id,
          imagePath: row.image_path,
          badge: { en: row.badge_en || "", bn: row.badge_bn || "" },
          title: { en: row.title_en || "", bn: row.title_bn || "" },
          description: { en: row.description_en || "", bn: row.description_bn || "" },
          orderIndex: row.order_index,
        }));
        return NextResponse.json(slides, { status: 200 });
      }
    } catch (err) {
      console.warn("Hero GET DB error, falling back to local JSON:", err);
    }
  }

  // Local JSON fallback
  const fallbackSlides = readFallbackJson().map((s) => ({
    id: s.id,
    imagePath: s.image_path || s.imagePath || "",
    badge: {
      en: s.badge_en || s.badge?.en || "",
      bn: s.badge_bn || s.badge?.bn || "",
    },
    title: {
      en: s.title_en || s.title?.en || "",
      bn: s.title_bn || s.title?.bn || "",
    },
    description: {
      en: s.description_en || s.description?.en || "",
      bn: s.description_bn || s.description?.bn || "",
    },
    orderIndex: s.order_index !== undefined ? s.order_index : (s.orderIndex !== undefined ? s.orderIndex : 0),
  }));
  return NextResponse.json(fallbackSlides, { status: 200 });
}

/**
 * POST: Create a new hero slide.
 */
export async function POST(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  await initializeHeroTable();

  try {
    const body = await request.json();
    const { imagePath, badge, title, description, orderIndex } = body;

    if (!imagePath || !title?.en) {
      return NextResponse.json({ error: "Missing required slide fields" }, { status: 400 });
    }

    const orderIdx = orderIndex !== undefined ? parseInt(orderIndex, 10) : 0;
    let insertedId: string | number = Date.now();

    // 1. Insert to MySQL if configured
    if (isDbConfigured()) {
      try {
        const query = `
          INSERT INTO hero_slides (image_path, badge_en, badge_bn, title_en, title_bn, description_en, description_bn, order_index)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const params = [
          imagePath,
          badge?.en || "",
          badge?.bn || "",
          title.en,
          title.bn || "",
          description?.en || "",
          description?.bn || "",
          orderIdx,
        ];
        const result = await executeQuery<any>(query, params);
        if (result && result.insertId) {
          insertedId = result.insertId;
        }
      } catch (dbErr) {
        console.error("Failed to insert hero slide into DB:", dbErr);
      }
    }

    // 2. Always update local JSON fallback
    const currentFallback = readFallbackJson();
    const newSlideJson = {
      id: insertedId,
      image_path: imagePath,
      badge_en: badge?.en || "",
      badge_bn: badge?.bn || "",
      title_en: title.en,
      title_bn: title.bn || "",
      description_en: description?.en || "",
      description_bn: description?.bn || "",
      order_index: orderIdx,
    };
    currentFallback.push(newSlideJson);
    writeFallbackJson(currentFallback);

    return NextResponse.json({ success: true, id: insertedId }, { status: 200 });
  } catch (error) {
    console.error("Hero POST API Error:", error);
    return NextResponse.json({ error: "Failed to create slide" }, { status: 500 });
  }
}

/**
 * PUT: Update an existing hero slide.
 */
export async function PUT(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  await initializeHeroTable();

  try {
    const body = await request.json();
    const { id, imagePath, badge, title, description, orderIndex } = body;

    if (!id || !imagePath || !title?.en) {
      return NextResponse.json({ error: "Missing required slide fields" }, { status: 400 });
    }

    const orderIdx = orderIndex !== undefined ? parseInt(orderIndex, 10) : 0;

    // 1. Update in MySQL
    if (isDbConfigured()) {
      try {
        const query = `
          UPDATE hero_slides
          SET image_path = ?, badge_en = ?, badge_bn = ?, title_en = ?, title_bn = ?, description_en = ?, description_bn = ?, order_index = ?
          WHERE id = ?
        `;
        const params = [
          imagePath,
          badge?.en || "",
          badge?.bn || "",
          title.en,
          title.bn || "",
          description?.en || "",
          description?.bn || "",
          orderIdx,
          id,
        ];
        await executeQuery(query, params);
      } catch (dbErr) {
        console.error("Failed to update hero slide in DB:", dbErr);
      }
    }

    // 2. Always update local JSON fallback
    const currentFallback = readFallbackJson();
    const updatedFallback = currentFallback.map((slide) => {
      if (String(slide.id) === String(id)) {
        return {
          id: slide.id,
          image_path: imagePath,
          badge_en: badge?.en || "",
          badge_bn: badge?.bn || "",
          title_en: title.en,
          title_bn: title.bn || "",
          description_en: description?.en || "",
          description_bn: description?.bn || "",
          order_index: orderIdx,
        };
      }
      return slide;
    });
    writeFallbackJson(updatedFallback);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Hero PUT API Error:", error);
    return NextResponse.json({ error: "Failed to update slide" }, { status: 500 });
  }
}

/**
 * DELETE: Delete a hero slide.
 */
export async function DELETE(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  await initializeHeroTable();

  try {
    const { searchParams } = new URL(request.url);
    const idParam = searchParams.get("id");

    if (!idParam) {
      return NextResponse.json({ error: "Slide ID is required for deletion" }, { status: 400 });
    }

    // 1. Delete from MySQL
    if (isDbConfigured()) {
      try {
        await executeQuery("DELETE FROM hero_slides WHERE id = ?", [idParam]);
      } catch (dbErr) {
        console.error("Failed to delete hero slide from DB:", dbErr);
      }
    }

    // 2. Always update local JSON fallback
    const currentFallback = readFallbackJson();
    const filteredFallback = currentFallback.filter((slide) => String(slide.id) !== String(idParam));
    writeFallbackJson(filteredFallback);

    return NextResponse.json({ success: true, message: "Slide deleted successfully." }, { status: 200 });
  } catch (error) {
    console.error("Hero DELETE API Error:", error);
    return NextResponse.json({ error: "Failed to delete slide record" }, { status: 500 });
  }
}
