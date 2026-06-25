import mysql from "mysql2/promise";

// Database configuration loaded from environment variables
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

let pool: mysql.Pool | null = null;

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
 * Initializes and returns the MySQL connection pool.
 * Returns null if the database is not configured.
 * @returns mysql.Pool instance or null.
 */
export function getDbPool(): mysql.Pool | null {
  if (!isDbConfigured()) {
    return null;
  }
  if (!pool) {
    pool = mysql.createPool(dbConfig);
  }
  return pool;
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
