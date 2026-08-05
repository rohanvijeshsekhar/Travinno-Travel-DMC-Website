import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';
import { cache } from 'react';

const DATA_FILE = path.join(process.cwd(), 'travinno-data.json');

// Memory cache for JSON fallback to eliminate disk I/O bottlenecks
let cachedJsonData: Record<string, any> | null = null;

// Initialize JSON fallback file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({}, null, 2), 'utf8');
}

function readJsonData(): Record<string, any> {
  if (cachedJsonData) {
    return cachedJsonData;
  }
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf8');
      cachedJsonData = JSON.parse(content);
      return cachedJsonData || {};
    }
  } catch (e: any) {
    console.error('[db-server] readJsonData error:', e.message);
  }
  return {};
}

function writeJsonData(data: Record<string, any>): boolean {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
    cachedJsonData = data;
    return true;
  } catch (e: any) {
    console.error('[db-server] writeJsonData error:', e.message);
    return false;
  }
}

// ── Database Connection Pool (MySQL with Instant JSON Fallback) ───────────────────
let dbPool: mysql.Pool | null = null;
let useMySQL = false;

const host = process.env.DB_HOST || '127.0.0.1';
const port = parseInt(process.env.DB_PORT || '3306', 10);
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD || '';
const database = process.env.DB_NAME;

if (database && user) {
  try {
    dbPool = mysql.createPool({
      host,
      port,
      user,
      password,
      database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      connectTimeout: 1000, // Fast 1-second timeout to prevent blocking page loads if MySQL is down
    });
    useMySQL = true;

    // Create table asynchronously on module load
    dbPool.query(
      `CREATE TABLE IF NOT EXISTS travinno_collections (
        col_key VARCHAR(255) PRIMARY KEY,
        col_value LONGTEXT NOT NULL
      )`
    ).catch((err: any) => {
      console.log('[db-server] MySQL init unavailable, switching to fast JSON:', err.message);
      useMySQL = false;
    });
  } catch (e: any) {
    console.log('[db-server] MySQL connection failed, falling back to JSON:', e.message);
    useMySQL = false;
  }
}

// Get all collections (deduplicated per request using React cache)
export const getCollections = cache(async (): Promise<Record<string, any>> => {
  if (useMySQL && dbPool) {
    try {
      const [rows]: any = await dbPool.query('SELECT col_key, col_value FROM travinno_collections');
      const data: Record<string, any> = {};
      rows.forEach((row: any) => {
        try {
          data[row.col_key] = JSON.parse(row.col_value);
        } catch (e) {
          data[row.col_key] = row.col_value;
        }
      });
      return data;
    } catch (err: any) {
      console.log('[db-server] MySQL query failed, permanently reverting to JSON:', err.message);
      useMySQL = false;
      return readJsonData();
    }
  } else {
    return readJsonData();
  }
});

// Save one collection
export async function saveCollection(key: string, value: any): Promise<void> {
  const stringValue = typeof value === 'string' ? value : JSON.stringify(value);

  if (useMySQL && dbPool) {
    try {
      await dbPool.query(
        'INSERT INTO travinno_collections (col_key, col_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE col_value = VALUES(col_value)',
        [key, stringValue]
      );
    } catch (err: any) {
      console.log('[db-server] MySQL write failed, falling back to JSON:', err.message);
      useMySQL = false;
      const data = readJsonData();
      data[key] = typeof value === 'string' ? JSON.parse(value) : value;
      writeJsonData(data);
    }
  } else {
    const data = readJsonData();
    data[key] = typeof value === 'string' ? JSON.parse(value) : value;
    const ok = writeJsonData(data);
    if (!ok) {
      throw new Error('Write to JSON file failed');
    }
  }
}

// Reset all
export async function resetCollections(): Promise<void> {
  if (useMySQL && dbPool) {
    try {
      await dbPool.query('TRUNCATE TABLE travinno_collections');
    } catch (err: any) {
      console.log('[db-server] MySQL Truncate Error:', err.message);
      useMySQL = false;
      writeJsonData({});
    }
  } else {
    writeJsonData({});
  }
}
