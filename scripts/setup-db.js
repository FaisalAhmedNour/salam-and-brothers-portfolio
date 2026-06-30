const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");

// Zero-dependency Env Loader (to work seamlessly on cPanel without external dotenv library)
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

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
  charset: "utf8mb4",
};

if (!dbConfig.host || !dbConfig.user || !dbConfig.database) {
  console.error("❌ Database connection parameters are missing in the environment. Please check your .env configuration.");
  process.exit(1);
}

async function runSetup() {
  console.log(`Connecting to database "${dbConfig.database}" at "${dbConfig.host}"...`);
  
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log("✔ Connected to database successfully.");
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1);
  }

  try {
    console.log("Initializing database tables...");

    // 1. admin_users
    await connection.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log("✔ Table 'admin_users' is ready.");

    // 2. products
    await connection.query(`
      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(100) PRIMARY KEY,
        slug VARCHAR(100) NOT NULL UNIQUE,
        category VARCHAR(50) NOT NULL,
        image_path VARCHAR(255),
        title_en VARCHAR(255) NOT NULL,
        title_bn VARCHAR(255) NOT NULL,
        subtitle_en VARCHAR(255),
        subtitle_bn VARCHAR(255),
        description_en TEXT,
        description_bn TEXT,
        overview_en TEXT,
        overview_bn TEXT,
        spec_rating_en VARCHAR(100),
        spec_rating_bn VARCHAR(100),
        spec_voltage_en VARCHAR(100),
        spec_voltage_bn VARCHAR(100),
        spec_standard_en VARCHAR(100),
        spec_standard_bn VARCHAR(100),
        advantages_en TEXT,
        advantages_bn TEXT,
        applications_en TEXT,
        applications_bn TEXT,
        specs_table_en TEXT,
        specs_table_bn TEXT,
        accessories_en TEXT,
        accessories_bn TEXT,
        quality_text_en TEXT,
        quality_text_bn TEXT,
        cta_title_en VARCHAR(255),
        cta_title_bn VARCHAR(255),
        cta_text_en TEXT,
        cta_text_bn TEXT,
        cta_btn_en VARCHAR(255),
        cta_btn_bn VARCHAR(255)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log("✔ Table 'products' is ready.");

    // 3. blog_posts
    await connection.query(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id VARCHAR(100) PRIMARY KEY,
        publish_date DATE NOT NULL,
        author_en VARCHAR(100) NOT NULL,
        author_bn VARCHAR(100) NOT NULL,
        read_time_en VARCHAR(50) NOT NULL,
        read_time_bn VARCHAR(50) NOT NULL,
        category VARCHAR(50) NOT NULL,
        image VARCHAR(255),
        title_en VARCHAR(255) NOT NULL,
        title_bn VARCHAR(255) NOT NULL,
        excerpt_en TEXT,
        excerpt_bn TEXT,
        content_en TEXT,
        content_bn TEXT
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log("✔ Table 'blog_posts' is ready.");

    // 4. notices
    await connection.query(`
      CREATE TABLE IF NOT EXISTS notices (
        id VARCHAR(100) PRIMARY KEY,
        ref_no VARCHAR(100) NOT NULL UNIQUE,
        publish_date DATE NOT NULL,
        category VARCHAR(50) NOT NULL,
        title_en VARCHAR(255) NOT NULL,
        title_bn VARCHAR(255) NOT NULL,
        content_en TEXT,
        content_bn TEXT,
        signatory_en VARCHAR(150),
        signatory_bn VARCHAR(150),
        designation_en VARCHAR(150),
        designation_bn VARCHAR(150)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log("✔ Table 'notices' is ready.");

    // 5. notice_files
    await connection.query(`
      CREATE TABLE IF NOT EXISTS notice_files (
        id INT AUTO_INCREMENT PRIMARY KEY,
        notice_id VARCHAR(100) NOT NULL,
        name_en VARCHAR(255) NOT NULL,
        name_bn VARCHAR(255) NOT NULL,
        url VARCHAR(255) NOT NULL,
        size VARCHAR(50),
        FOREIGN KEY (notice_id) REFERENCES notices(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log("✔ Table 'notice_files' is ready.");

    // 6. inquiries
    await connection.query(`
      CREATE TABLE IF NOT EXISTS inquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        email VARCHAR(150) NOT NULL,
        mobile VARCHAR(50),
        subject VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(20) DEFAULT 'unread'
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log("✔ Table 'inquiries' is ready.");

    // 7. site_settings (LONGTEXT to hold policies and config objects)
    await connection.query(`
      CREATE TABLE IF NOT EXISTS site_settings (
        setting_key VARCHAR(100) PRIMARY KEY,
        setting_value LONGTEXT NOT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log("✔ Table 'site_settings' is ready.");

    // 8. media
    await connection.query(`
      CREATE TABLE IF NOT EXISTS media (
        id INT AUTO_INCREMENT PRIMARY KEY,
        filename VARCHAR(255) NOT NULL UNIQUE,
        original_name VARCHAR(255) NOT NULL,
        mime_type VARCHAR(100) NOT NULL,
        file_size VARCHAR(50) NOT NULL,
        url VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log("✔ Table 'media' is ready.");

    // 9. hero_slides
    await connection.query(`
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
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log("✔ Table 'hero_slides' is ready.");

    // 10. certificates
    await connection.query(`
      CREATE TABLE IF NOT EXISTS certificates (
        id VARCHAR(100) PRIMARY KEY,
        title_en VARCHAR(255) NOT NULL,
        title_bn VARCHAR(255) NOT NULL,
        authority_en VARCHAR(255) NOT NULL,
        authority_bn VARCHAR(255) NOT NULL,
        desc_en TEXT,
        desc_bn TEXT,
        image VARCHAR(255),
        order_index INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log("✔ Table 'certificates' is ready.");

    // 11. services
    await connection.query(`
      CREATE TABLE IF NOT EXISTS services (
        id VARCHAR(100) PRIMARY KEY,
        title_en VARCHAR(255) NOT NULL,
        title_bn VARCHAR(255) NOT NULL,
        desc_en TEXT,
        desc_bn TEXT,
        order_index INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log("✔ Table 'services' is ready.");

    // Seed default admin user if not exists (username: 'admin', password: 'admin')
    const [existingUsers] = await connection.query("SELECT * FROM admin_users WHERE username = 'admin'");
    if (existingUsers.length === 0) {
      await connection.query(
        "INSERT INTO admin_users (username, password_hash) VALUES ('admin', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918')"
      );
      console.log("✔ Seeded default admin user.");
    }

    console.log("\n==========================================");
    console.log("🎉 DATABASE SETUP COMPLETED SUCCESSFULLY!");
    console.log("==========================================\n");

  } catch (err) {
    console.error("❌ Database setup failed during operations:", err);
  } finally {
    await connection.end();
    console.log("MySQL connection closed.");
  }
}

runSetup();
