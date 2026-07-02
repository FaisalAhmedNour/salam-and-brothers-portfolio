import { NextResponse } from "next/server";
import { executeQuery, isDbConfigured } from "@/lib/db";
import { getSiteSettings, updateSiteSettings, darkenColor } from "@/lib/settings";
import { revalidatePath, revalidateTag } from "next/cache";
import { checkAuth, hashSha256 } from "@/lib/auth";

/**
 * GET: retrieve health check metrics and env variables configuration parameters.
 */
export async function GET() {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  // 1. Check Database connection status
  let dbStatus = {
    configured: isDbConfigured(),
    connected: false,
    message: "MySQL database is not configured. Add variables in .env.",
  };

  if (dbStatus.configured) {
    try {
      const result = await executeQuery("SELECT 1");
      if (result) {
        dbStatus.connected = true;
        dbStatus.message = "Successfully connected to MySQL database.";
      } else {
        dbStatus.message = "Failed to run verification query on connection pool.";
      }
    } catch (err: any) {
      dbStatus.message = `Database connection error: ${err.message || err}`;
    }
  }

  // 2. Upload directories status
  const uploads = {
    uploadDir: process.env.UPLOAD_DIR || "Default (./public/uploads inside project)",
    uploadUrl: process.env.NEXT_PUBLIC_UPLOAD_URL || "Default (/uploads mapping)",
  };

  // 3. EmailJS credentials summary (masked for security)
  const mask = (str: string | undefined) => {
    if (!str) return "Unset";
    if (str.length <= 6) return "****";
    return `${str.slice(0, 3)}...${str.slice(-3)}`;
  };

  const emailJs = {
    serviceId: mask(process.env.EMAILJS_SERVICE_ID),
    templateId: mask(process.env.EMAILJS_TEMPLATE_ID),
    publicKey: mask(process.env.EMAILJS_PUBLIC_KEY),
  };

  // 4. Retrieve site settings
  const siteSettings = await getSiteSettings();

  return NextResponse.json(
    { database: dbStatus, uploads, emailJs, siteSettings },
    { status: 200 }
  );
}

/**
 * POST: Update administrator credentials (username and/or password) or site color configuration.
 */
export async function POST(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { username, password, primaryColor, scrollingTexts, logoPath, faviconPath, contactCTAImagePath, brandBannerSlogan, socialLinks, googleMapsEmbedUrl, aboutIntro, aboutImagePath, missionVision, policies, welcomeModal, brandIntro, brandBanner } = body;

    // Handle primary color, scrolling texts, slogans, logo, favicon, Contact CTA, socialLinks, map url, about/mission/vision/policies, welcomeModal, brandIntro, or brandBanner updates
    if (
      primaryColor !== undefined ||
      scrollingTexts !== undefined ||
      logoPath !== undefined ||
      faviconPath !== undefined ||
      contactCTAImagePath !== undefined ||
      brandBannerSlogan !== undefined ||
      socialLinks !== undefined ||
      googleMapsEmbedUrl !== undefined ||
      aboutIntro !== undefined ||
      aboutImagePath !== undefined ||
      missionVision !== undefined ||
      policies !== undefined ||
      welcomeModal !== undefined ||
      brandIntro !== undefined ||
      brandBanner !== undefined
    ) {
      const currentSettings = await getSiteSettings();
      const updatedSettings = {
        primaryColor: primaryColor !== undefined ? primaryColor : currentSettings.primaryColor,
        primaryColorHover: primaryColor !== undefined ? darkenColor(primaryColor, 15) : currentSettings.primaryColorHover,
        scrollingTexts: scrollingTexts !== undefined ? scrollingTexts : currentSettings.scrollingTexts,
        logoPath: logoPath !== undefined ? logoPath : currentSettings.logoPath,
        faviconPath: faviconPath !== undefined ? faviconPath : currentSettings.faviconPath,
        contactCTAImagePath: contactCTAImagePath !== undefined ? contactCTAImagePath : currentSettings.contactCTAImagePath,
        brandBannerSlogan: brandBannerSlogan !== undefined ? brandBannerSlogan : currentSettings.brandBannerSlogan,
        socialLinks: socialLinks !== undefined ? socialLinks : currentSettings.socialLinks,
        googleMapsEmbedUrl: googleMapsEmbedUrl !== undefined ? googleMapsEmbedUrl : currentSettings.googleMapsEmbedUrl,
        aboutIntro: aboutIntro !== undefined ? aboutIntro : currentSettings.aboutIntro,
        aboutImagePath: aboutImagePath !== undefined ? aboutImagePath : currentSettings.aboutImagePath,
        missionVision: missionVision !== undefined ? missionVision : currentSettings.missionVision,
        policies: policies !== undefined ? policies : currentSettings.policies,
        welcomeModal: welcomeModal !== undefined ? welcomeModal : currentSettings.welcomeModal,
        brandIntro: brandIntro !== undefined ? brandIntro : currentSettings.brandIntro,
        brandBanner: brandBanner !== undefined ? brandBanner : currentSettings.brandBanner,
      };

      const isDbSaved = await updateSiteSettings(updatedSettings);

      // Revalidate layout path and cached settings tags so static pages are regenerated on-demand
      try {
        revalidatePath("/", "layout");
        revalidateTag("settings", "max");
        revalidateTag("hero_slides", "max");
      } catch (revalErr) {
        console.warn("Failed to revalidate layout path cache:", revalErr);
      }

      return NextResponse.json(
        {
          success: true,
          message: isDbSaved
            ? "Settings updated successfully in database and fallback memory."
            : "Settings updated successfully in fallback memory (MySQL unavailable).",
        },
        { status: 200 }
      );
    }

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }

    let isDbUpdated = false;

    // Try updating MySQL
    if (isDbConfigured()) {
      try {
        if (password) {
          const passHash = hashSha256(password);
          // Check if admin user exists first
          const users = await executeQuery<any[]>("SELECT * FROM admin_users LIMIT 1");
          if (users && users.length > 0) {
            await executeQuery(
              "UPDATE admin_users SET username = ?, password_hash = ? WHERE id = ?",
              [username, passHash, users[0].id]
            );
          } else {
            await executeQuery(
              "INSERT INTO admin_users (username, password_hash) VALUES (?, ?)",
              [username, passHash]
            );
          }
        } else {
          // Update username only
          const users = await executeQuery<any[]>("SELECT * FROM admin_users LIMIT 1");
          if (users && users.length > 0) {
            await executeQuery(
              "UPDATE admin_users SET username = ? WHERE id = ?",
              [username, users[0].id]
            );
          }
        }
        isDbUpdated = true;
      } catch (dbErr) {
        console.warn("Settings API: Database credentials update failed, using memory fallback.", dbErr);
      }
    }

    // Always sync back to process.env in-memory fallbacks to maintain consistency
    process.env.ADMIN_USERNAME = username;
    if (password) {
      process.env.ADMIN_PASSWORD = password;
    }

    return NextResponse.json(
      {
        success: true,
        message: isDbUpdated
          ? "Credentials updated successfully in database and fallback memory."
          : "Credentials updated successfully in fallback memory (MySQL unavailable).",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Dashboard Settings POST error:", error);
    return NextResponse.json(
      { error: "An internal server error occurred." },
      { status: 500 }
    );
  }
}
