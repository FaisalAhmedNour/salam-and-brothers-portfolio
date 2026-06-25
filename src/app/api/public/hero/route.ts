import { NextResponse } from "next/server";
import { executeQuery, isDbConfigured } from "@/lib/db";
import fs from "fs";
import path from "path";

const fallbackJsonPath = path.join(process.cwd(), "src/data/hero_slides.json");

function readFallbackJson() {
  try {
    if (fs.existsSync(fallbackJsonPath)) {
      const data = fs.readFileSync(fallbackJsonPath, "utf-8");
      const slides = JSON.parse(data);
      // Map to standard schema
      return slides.map((s: any) => ({
        id: s.id,
        imagePath: s.image_path || s.imagePath,
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
    }
  } catch (err) {
    console.error("Failed to read hero slides JSON fallback:", err);
  }
  return [];
}

/**
 * GET: Retrieves active hero section slides.
 */
export async function GET() {
  if (isDbConfigured()) {
    try {
      // Auto-create table if not exists just to avoid error on first run
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

      const dbSlides = await executeQuery<any[]>(
        "SELECT * FROM hero_slides ORDER BY order_index ASC, id ASC"
      );

      if (dbSlides && dbSlides.length > 0) {
        const slides = dbSlides.map((row) => ({
          id: row.id,
          imagePath: row.image_path,
          badge: { en: row.badge_en, bn: row.badge_bn },
          title: { en: row.title_en, bn: row.title_bn },
          description: { en: row.description_en, bn: row.description_bn },
          orderIndex: row.order_index,
        }));
        return NextResponse.json(slides, { status: 200 });
      }
    } catch (err) {
      console.warn("Hero Slides GET DB error, falling back to static JSON:", err);
    }
  }

  // Fallback to static JSON
  const fallbackSlides = readFallbackJson();
  return NextResponse.json(fallbackSlides, { status: 200 });
}
