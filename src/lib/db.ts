import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";

// Self-contained runtime env loader to ensure cPanel Node Selector environment variables
// (which are stored in .env in the application root) are loaded into process.env at runtime.
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

            if (key && (!process.env[key] || process.env[key].trim() === "" || process.env[key] === "undefined")) {
              process.env[key] = value;
            }
          }
        }
      });
    }
  } catch (err) {
    console.warn("DB ENV: Failed to load .env manually:", err);
  }
})();

// Database configuration loaded from environment variables
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
  charset: "utf8mb4",
  waitForConnections: true,
  connectionLimit: 5, // Lower limit to prevent process exhaustion on cPanel shared hosting
  maxIdle: 5,
  idleTimeout: 30000, // Close idle connections after 30s to release resources
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
  queueLimit: 0,
};

const globalForDb = globalThis as unknown as {
  dbPool: mysql.Pool | undefined;
};

/**
 * Checks if the database credentials are fully configured.
 * @returns boolean indicating if host, user and database are set.
 */
export function isDbConfigured(): boolean {
  return !!(
    process.env.DB_HOST &&
    process.env.DB_USER &&
    process.env.DB_NAME
  );
}

/**
 * Initializes and returns the MySQL connection pool singleton.
 * Returns null if the database is not configured.
 * @returns mysql.Pool instance or null.
 */
export function getDbPool(): mysql.Pool | null {
  if (!isDbConfigured()) {
    return null;
  }
  if (!globalForDb.dbPool) {
    globalForDb.dbPool = mysql.createPool(dbConfig);
  }
  return globalForDb.dbPool;
}

/**
 * Executes a SQL query with parameter binding.
 * Falls back to returning null if DB is not configured or queries fail.
 * 
 * @param query - The SQL query string.
 * @param params - Query parameters array.
 * @returns The query results or null.
 */
export async function executeQuery<T = any>(
  query: string,
  params: any[] = []
): Promise<T | null> {
  const dbPool = getDbPool();
  if (!dbPool) {
    console.warn("DB WARNING: MySQL connection pool is not configured or unavailable.");
    return null;
  }

  try {
    const [results] = await dbPool.execute(query, params);
    return results as T;
  } catch (error) {
    console.error("DB Error executing query:", error);
    return null;
  }
}
