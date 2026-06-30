const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");

// 1. Zero-dependency Env Loader (to work seamlessly in all environments without dotenv)
(() => {
  try {
    const envPath = path.join(process.cwd(), ".env");
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf-8");
      content.split(/\r?\n/).forEach((line) => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith("#")) {
          const firstEqual = trimmed.indexOf("=");
          if (firstEqual !== -1) {
            const key = trimmed.substring(0, firstEqual).trim();
            let value = trimmed.substring(firstEqual + 1).trim();
            
            // Strip inline comments starting with '#' (excluding if inside quotes)
            const hashIndex = value.indexOf("#");
            if (hashIndex !== -1) {
              const beforeHash = value.substring(0, hashIndex).trim();
              value = beforeHash.replace(/^['"]|['"]$/g, "");
            } else {
              value = value.replace(/^['"]|['"]$/g, "");
            }

            if (key && !(key in process.env)) {
              process.env[key] = value;
            }
          }
        }
      });
      console.log("✔ Environment variables successfully loaded from .env");
    } else {
      console.warn("⚠ No local .env file found, using system environment variables.");
    }
  } catch (err) {
    console.error("❌ Failed to parse .env file:", err);
  }
})();

// 2. Validate DB credentials
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
  charset: "utf8mb4",
};

if (!dbConfig.host || !dbConfig.user || !dbConfig.database) {
  console.error("❌ Database connection parameters are missing in the environment. Please check your .env configurations.");
  process.exit(1);
}

// Helper to parse JSON files safely
function readJsonFile(filePath) {
  try {
    const absolutePath = path.join(process.cwd(), filePath);
    if (!fs.existsSync(absolutePath)) {
      console.warn(`⚠ File not found: ${filePath}`);
      return null;
    }
    const data = fs.readFileSync(absolutePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error(`❌ Failed to read or parse JSON file: ${filePath}`, err);
    return null;
  }
}

async function runSeeder() {
  console.log(`Connecting to database "${dbConfig.database}" at "${dbConfig.host}:${dbConfig.port}" as "${dbConfig.user}"...`);

  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log("✔ Connected to database successfully.");
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1);
  }

  try {
    // Enable foreign key checks toggle helper
    await connection.query("SET FOREIGN_KEY_CHECKS = 0");

    // ==========================================
    // 1. SEED: Site Settings & Layout Configs
    // ==========================================
    console.log("\n--- Seeding Site Settings ---");
    await connection.query("DELETE FROM site_settings");

    // settings.json
    const settings = readJsonFile("src/data/settings.json");
    if (settings) {
      for (const [key, value] of Object.entries(settings)) {
        const valStr = typeof value === "object" ? JSON.stringify(value) : String(value);
        await connection.query(
          "INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?)",
          [key, valStr]
        );
      }
      console.log(`✔ Seeded settings from settings.json`);
    }

    // contactInfo.json
    const contactInfo = readJsonFile("src/data/contactInfo.json");
    if (contactInfo) {
      await connection.query(
        "INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?)",
        ["contactInfo", JSON.stringify(contactInfo)]
      );
      console.log("✔ Seeded settings key: 'contactInfo'");
    }

    // servicesSettings.json
    const servicesSettings = readJsonFile("src/data/servicesSettings.json");
    if (servicesSettings) {
      await connection.query(
        "INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?)",
        ["servicesSettings", JSON.stringify(servicesSettings)]
      );
      console.log("✔ Seeded settings key: 'servicesSettings'");
    }

    // ==========================================
    // 2. SEED: Media Library
    // ==========================================
    console.log("\n--- Seeding Media Library ---");
    await connection.query("DELETE FROM media");
    const mediaList = readJsonFile("src/data/media.json");
    if (mediaList && Array.isArray(mediaList)) {
      for (const m of mediaList) {
        await connection.query(
          "INSERT INTO media (id, filename, original_name, mime_type, file_size, url, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [
            m.id,
            m.filename,
            m.originalName,
            m.mimeType,
            m.fileSize,
            m.url,
            m.createdAt ? new Date(m.createdAt) : new Date()
          ]
        );
      }
      console.log(`✔ Seeded ${mediaList.length} media items.`);
    }

    // ==========================================
    // 3. SEED: Hero Slides
    // ==========================================
    console.log("\n--- Seeding Hero Slides ---");
    await connection.query("DELETE FROM hero_slides");
    const slides = readJsonFile("src/data/hero_slides.json");
    if (slides && Array.isArray(slides)) {
      for (const s of slides) {
        await connection.query(
          "INSERT INTO hero_slides (id, image_path, badge_en, badge_bn, title_en, title_bn, description_en, description_bn, order_index) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            s.id || null,
            s.imagePath,
            s.badgeEn || "",
            s.badgeBn || "",
            s.titleEn,
            s.titleBn || "",
            s.descriptionEn || "",
            s.descriptionBn || "",
            s.orderIndex || 0
          ]
        );
      }
      console.log(`✔ Seeded ${slides.length} hero slides.`);
    }

    // ==========================================
    // 4. SEED: Services
    // ==========================================
    console.log("\n--- Seeding Services ---");
    await connection.query("DELETE FROM services");
    const services = readJsonFile("src/data/services.json");
    if (services && Array.isArray(services)) {
      for (const s of services) {
        await connection.query(
          "INSERT INTO services (id, title_en, title_bn, desc_en, desc_bn, order_index) VALUES (?, ?, ?, ?, ?, ?)",
          [s.id, s.titleEn, s.titleBn, s.descEn, s.descBn, s.orderIndex || 0]
        );
      }
      console.log(`✔ Seeded ${services.length} services.`);
    }

    // ==========================================
    // 5. SEED: Certificates
    // ==========================================
    console.log("\n--- Seeding Certificates ---");
    await connection.query("DELETE FROM certificates");
    const certs = readJsonFile("src/data/certificates.json");
    if (certs && Array.isArray(certs)) {
      for (const c of certs) {
        await connection.query(
          "INSERT INTO certificates (id, title_en, title_bn, authority_en, authority_bn, desc_en, desc_bn, image, order_index) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            c.id,
            c.titleEn,
            c.titleBn,
            c.authorityEn,
            c.authorityBn,
            c.descEn || "",
            c.descBn || "",
            c.image || "",
            c.orderIndex || 0
          ]
        );
      }
      console.log(`✔ Seeded ${certs.length} certificates.`);
    }

    // ==========================================
    // 6. SEED: Blog Posts
    // ==========================================
    console.log("\n--- Seeding Blog Posts ---");
    await connection.query("DELETE FROM blog_posts");
    const blogs = readJsonFile("src/data/blogs.json");
    if (blogs && Array.isArray(blogs)) {
      for (const b of blogs) {
        await connection.query(
          `INSERT INTO blog_posts (
            id, publish_date, author_en, author_bn, read_time_en, read_time_bn, 
            category, image, title_en, title_bn, excerpt_en, excerpt_bn, content_en, content_bn
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            b.id,
            b.publishDate,
            b.authorEn,
            b.authorBn || "",
            b.readTimeEn,
            b.readTimeBn || "",
            b.category,
            b.image || "",
            b.titleEn,
            b.titleBn || "",
            b.excerptEn || "",
            b.excerptBn || "",
            b.contentEn || "",
            b.contentBn || ""
          ]
        );
      }
      console.log(`✔ Seeded ${blogs.length} blog posts.`);
    }

    // ==========================================
    // 7. SEED: Notices & Notice Files
    // ==========================================
    console.log("\n--- Seeding Notices & Attachments ---");
    await connection.query("DELETE FROM notice_files");
    await connection.query("DELETE FROM notices");
    const notices = readJsonFile("src/data/notices.json");
    if (notices && Array.isArray(notices)) {
      for (const n of notices) {
        await connection.query(
          `INSERT INTO notices (
            id, ref_no, publish_date, category, title_en, title_bn, 
            content_en, content_bn, signatory_en, signatory_bn, designation_en, designation_bn
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            n.id,
            n.refNo,
            n.publishDate,
            n.category,
            n.titleEn,
            n.titleBn || "",
            n.contentEn || "",
            n.contentBn || "",
            n.signatoryEn || "",
            n.signatoryBn || "",
            n.designationEn || "",
            n.designationBn || ""
          ]
        );

        if (n.files && Array.isArray(n.files)) {
          for (const f of n.files) {
            await connection.query(
              "INSERT INTO notice_files (notice_id, name_en, name_bn, url, size) VALUES (?, ?, ?, ?, ?)",
              [n.id, f.nameEn, f.nameBn || "", f.url, f.size || ""]
            );
          }
        }
      }
      console.log(`✔ Seeded ${notices.length} notices and attachments.`);
    }

    // ==========================================
    // 8. SEED: Products
    // ==========================================
    console.log("\n--- Seeding Products ---");
    await connection.query("DELETE FROM products");
    const products = readJsonFile("src/data/products.json");
    if (products && Array.isArray(products)) {
      for (const p of products) {
        await connection.query(
          `INSERT INTO products (
            id, slug, category, image_path, 
            title_en, title_bn, subtitle_en, subtitle_bn, 
            description_en, description_bn, overview_en, overview_bn, 
            spec_rating_en, spec_rating_bn, spec_voltage_en, spec_voltage_bn, spec_standard_en, spec_standard_bn,
            advantages_en, advantages_bn, applications_en, applications_bn, 
            specs_table_en, specs_table_bn, accessories_en, accessories_bn,
            quality_text_en, quality_text_bn, cta_title_en, cta_title_bn, 
            cta_text_en, cta_text_bn, cta_btn_en, cta_btn_bn
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            p.id,
            p.slug,
            p.category,
            p.imagePath || "",
            p.title?.en || "",
            p.title?.bn || "",
            p.subtitle?.en || "",
            p.subtitle?.bn || "",
            p.description?.en || "",
            p.description?.bn || "",
            p.overview?.en || "",
            p.overview?.bn || "",
            p.specs?.rating?.en || "",
            p.specs?.rating?.bn || "",
            p.specs?.voltage?.en || "",
            p.specs?.voltage?.bn || "",
            p.specs?.standard?.en || "",
            p.specs?.standard?.bn || "",
            JSON.stringify(p.advantages?.en || []),
            JSON.stringify(p.advantages?.bn || []),
            JSON.stringify(p.applications?.en || []),
            JSON.stringify(p.applications?.bn || []),
            JSON.stringify(p.specsTable?.en || []),
            JSON.stringify(p.specsTable?.bn || []),
            JSON.stringify(p.accessories?.en || []),
            JSON.stringify(p.accessories?.bn || []),
            p.qualityText?.en || "",
            p.qualityText?.bn || "",
            p.ctaTitle?.en || "",
            p.ctaTitle?.bn || "",
            p.ctaText?.en || "",
            p.ctaText?.bn || "",
            p.ctaBtn?.en || "",
            p.ctaBtn?.bn || ""
          ]
        );
      }
      console.log(`✔ Seeded ${products.length} products.`);
    }

    console.log("\n==========================================");
    console.log("🎉 DATABASE SEEDING COMPLETED SUCCESSFULLY!");
    console.log("==========================================\n");

  } catch (dbErr) {
    console.error("\n❌ Seeding Error: Failed to write data into database.", dbErr);
  } finally {
    await connection.query("SET FOREIGN_KEY_CHECKS = 1");
    await connection.end();
  }
}

runSeeder();
