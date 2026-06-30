import { NextResponse } from "next/server";
import { executeQuery, isDbConfigured } from "@/lib/db";
import { cookies } from "next/headers";
import { promises as fs } from "fs";
import path from "path";
import { revalidateTag, revalidatePath } from "next/cache";

/**
 * Shared helper to verify if the current user is authenticated as administrator.
 */
async function checkAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get("spl_session");
  return !!(session && session.value === "spl_admin_logged_in");
}

const localJsonPath = path.join(process.cwd(), "src/data/certificates.json");

/**
 * Read certificates fallback JSON file asynchronously.
 */
async function readFallbackJson(): Promise<any[]> {
  try {
    const data = await fs.readFile(localJsonPath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

/**
 * Write certificates fallback JSON file asynchronously.
 */
async function writeFallbackJson(data: any[]) {
  try {
    const dir = path.dirname(localJsonPath);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(localJsonPath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write fallback certificates.json:", err);
  }
}

/**
 * GET: retrieve certificates list.
 */
export async function GET() {
  if (isDbConfigured()) {
    try {
      const dbCerts = await executeQuery<any[]>("SELECT * FROM certificates ORDER BY order_index ASC");
      if (dbCerts) {
        const certs = dbCerts.map((c) => ({
          id: c.id,
          titleEn: c.title_en,
          titleBn: c.title_bn,
          authorityEn: c.authority_en,
          authorityBn: c.authority_bn,
          descEn: c.desc_en,
          descBn: c.desc_bn,
          image: c.image || "",
          orderIndex: c.order_index,
        }));
        return NextResponse.json(certs, { status: 200 });
      }
    } catch (error) {
      console.error("Dashboard Certificates GET DB error, falling back to local JSON:", error);
    }
  }

  // Fallback to static JSON
  const fallbackCerts = (await readFallbackJson()).map((c) => ({
    id: c.id,
    titleEn: c.titleEn,
    titleBn: c.titleBn || "",
    authorityEn: c.authorityEn,
    authorityBn: c.authorityBn || "",
    descEn: c.descEn || "",
    descBn: c.descBn || "",
    image: c.image || "",
    orderIndex: typeof c.orderIndex === "number" ? c.orderIndex : 0,
  }));
  return NextResponse.json(fallbackCerts, { status: 200 });
}

/**
 * POST: Create a new certificate.
 */
export async function POST(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const cert = await request.json();
    const {
      id, titleEn, titleBn, authorityEn, authorityBn, descEn, descBn, image, orderIndex
    } = cert;

    if (!id || !titleEn || !authorityEn) {
      return NextResponse.json({ error: "Missing required certificate fields" }, { status: 400 });
    }

    const orderIdx = typeof orderIndex === "number" ? orderIndex : 0;

    if (isDbConfigured()) {
      try {
        const query = `
          INSERT INTO certificates (
            id, title_en, title_bn, authority_en, authority_bn,
            desc_en, desc_bn, image, order_index
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const params = [
          id, titleEn, titleBn || "", authorityEn, authorityBn || "",
          descEn || "", descBn || "", image || "", orderIdx
        ];

        await executeQuery(query, params);
      } catch (dbErr) {
        console.error("Failed to insert certificate in DB:", dbErr);
      }
    }

    // Always update fallback JSON file
    const currentFallback = await readFallbackJson();
    const newCertJson = {
      id,
      titleEn,
      titleBn: titleBn || "",
      authorityEn,
      authorityBn: authorityBn || "",
      descEn: descEn || "",
      descBn: descBn || "",
      image: image || "",
      orderIndex: orderIdx,
    };
    currentFallback.push(newCertJson);
    currentFallback.sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));
    await writeFallbackJson(currentFallback);

    revalidatePath("/", "layout");
    revalidateTag("certificates", "max");

    return NextResponse.json({ success: true, message: "Certificate created successfully." }, { status: 200 });
  } catch (error) {
    console.error("Dashboard Certificate POST error:", error);
    return NextResponse.json({ error: "Failed to insert certificate record" }, { status: 500 });
  }
}

/**
 * PUT: Update an existing certificate.
 */
export async function PUT(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const cert = await request.json();
    const {
      id, titleEn, titleBn, authorityEn, authorityBn, descEn, descBn, image, orderIndex
    } = cert;

    if (!id) {
      return NextResponse.json({ error: "Certificate ID is required for editing" }, { status: 400 });
    }

    const orderIdx = typeof orderIndex === "number" ? orderIndex : 0;

    if (isDbConfigured()) {
      try {
        const query = `
          UPDATE certificates SET 
            title_en = ?, title_bn = ?, authority_en = ?, authority_bn = ?, 
            desc_en = ?, desc_bn = ?, image = ?, order_index = ?
          WHERE id = ?
        `;

        const params = [
          titleEn, titleBn || "", authorityEn, authorityBn || "",
          descEn || "", descBn || "", image || "", orderIdx, id
        ];

        await executeQuery(query, params);
      } catch (dbErr) {
        console.error("Failed to update certificate in DB:", dbErr);
      }
    }

    // Always update fallback JSON file
    const currentFallback = await readFallbackJson();
    const updatedFallback = currentFallback.map((c) => {
      if (c.id === id) {
        return {
          id,
          titleEn,
          titleBn: titleBn || "",
          authorityEn,
          authorityBn: authorityBn || "",
          descEn: descEn || "",
          descBn: descBn || "",
          image: image || "",
          orderIndex: orderIdx,
        };
      }
      return c;
    });
    updatedFallback.sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));
    await writeFallbackJson(updatedFallback);

    revalidatePath("/", "layout");
    revalidateTag("certificates", "max");

    return NextResponse.json({ success: true, message: "Certificate updated successfully." }, { status: 200 });
  } catch (error) {
    console.error("Dashboard Certificate PUT error:", error);
    return NextResponse.json({ error: "Failed to update certificate record" }, { status: 500 });
  }
}

/**
 * DELETE: Remove a certificate.
 */
export async function DELETE(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Certificate ID parameter is required" }, { status: 400 });
    }

    if (isDbConfigured()) {
      try {
        await executeQuery("DELETE FROM certificates WHERE id = ?", [id]);
      } catch (dbErr) {
        console.error("Failed to delete certificate in DB:", dbErr);
      }
    }

    // Always update fallback JSON file
    const currentFallback = await readFallbackJson();
    const filteredFallback = currentFallback.filter((c) => c.id !== id);
    await writeFallbackJson(filteredFallback);

    revalidatePath("/", "layout");
    revalidateTag("certificates", "max");

    return NextResponse.json({ success: true, message: "Certificate deleted successfully." }, { status: 200 });
  } catch (error) {
    console.error("Dashboard Certificate DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete certificate record" }, { status: 500 });
  }
}
