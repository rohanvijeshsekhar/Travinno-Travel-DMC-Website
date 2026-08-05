import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';
import { cache } from 'react';
import { db } from './db';

const DATA_FILE = path.join(process.cwd(), 'travinno-data.json');

// Memory cache for MySQL and JSON fallback to eliminate query/parsing bottlenecks
let cachedMySQLData: Record<string, any> | null = null;
let cachedJsonData: Record<string, any> | null = null;
let cachedJsonMtime = 0;

// Initialize JSON fallback file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({}, null, 2), 'utf8');
}

function readJsonData(): Record<string, any> {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const stats = fs.statSync(DATA_FILE);
      if (cachedJsonData && stats.mtimeMs === cachedJsonMtime) {
        return cachedJsonData;
      }
      const content = fs.readFileSync(DATA_FILE, 'utf8');
      cachedJsonData = JSON.parse(content);
      cachedJsonMtime = stats.mtimeMs;
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
    if (fs.existsSync(DATA_FILE)) {
      cachedJsonMtime = fs.statSync(DATA_FILE).mtimeMs;
    }
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

    // Create table & sync latest deployed JSON data into Hostinger MySQL
    dbPool.query(
      `CREATE TABLE IF NOT EXISTS travinno_collections (
        col_key VARCHAR(255) PRIMARY KEY,
        col_value LONGTEXT NOT NULL
      )`
    ).then(async () => {
      if (dbPool) {
        console.log('=== Next.js DB Helper: Syncing latest deployed JSON data to Hostinger MySQL ===');
        const localData = readJsonData();
        for (const [k, v] of Object.entries(localData)) {
          const strVal = typeof v === 'string' ? v : JSON.stringify(v);
          await dbPool.query(
            'INSERT INTO travinno_collections (col_key, col_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE col_value = VALUES(col_value)',
            [k, strVal]
          ).catch(() => null);
        }
      }
    }).catch((err: any) => {
      console.log('[db-server] MySQL init unavailable, switching to fast JSON:', err.message);
      useMySQL = false;
    });
  } catch (e: any) {
    console.log('[db-server] MySQL connection failed, falling back to JSON:', e.message);
    useMySQL = false;
  }
}

// Get all collections (deduplicated per request using React cache & memory cache)
export const getCollections = cache(async (): Promise<Record<string, any>> => {
  let rawData: Record<string, any> = {};

  if (useMySQL && dbPool) {
    if (cachedMySQLData) {
      rawData = cachedMySQLData;
    } else {
      try {
        const [rows]: any = await dbPool.query('SELECT col_key, col_value FROM travinno_collections');
        rows.forEach((row: any) => {
          try {
            rawData[row.col_key] = JSON.parse(row.col_value);
          } catch (e) {
            rawData[row.col_key] = row.col_value;
          }
        });
        cachedMySQLData = rawData;
      } catch (err: any) {
        console.log('[db-server] MySQL query failed, permanently reverting to JSON:', err.message);
        useMySQL = false;
        rawData = readJsonData();
      }
    }
  } else {
    rawData = readJsonData();
  }

  // Guarantee default initial collections for any missing key (e.g. travinno_team, travinno_hero_slides)
  const finalData: Record<string, any> = { ...rawData };
  if (db && db.collections) {
    Object.keys(db.collections).forEach((key) => {
      if (finalData[key] === undefined || finalData[key] === null) {
        finalData[key] = db.collections[key];
      }
    });
  }

  return finalData;
});

// Save one collection
export async function saveCollection(key: string, value: any): Promise<void> {
  const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
  const parsedValue = typeof value === 'string' ? JSON.parse(value) : value;

  // Invalidate memory cache so next read gets fresh updated data
  cachedMySQLData = null;
  cachedJsonData = null;

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
      data[key] = parsedValue;
      writeJsonData(data);
    }
  } else {
    const data = readJsonData();
    data[key] = parsedValue;
    const ok = writeJsonData(data);
    if (!ok) {
      throw new Error('Write to JSON file failed');
    }
  }
}

// Reset all
export async function resetCollections(): Promise<void> {
  cachedMySQLData = null;
  cachedJsonData = null;

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
