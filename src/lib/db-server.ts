import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';
import { cache } from 'react';
import { db } from './db';

const DATA_FILE = path.join(process.cwd(), 'travinno-data.json');

// ── In-memory caches ───────────────────────────────────────────────────────────
// cachedMySQLData: holds the full result of the last SELECT from travinno_collections.
// Set to null only when saveCollection/resetCollections is called (i.e. admin saves).
// Never expires on a timer — stale data is impossible because every write path
// explicitly nullifies this before writing to MySQL.
let cachedMySQLData: Record<string, any> | null = null;

// cachedJsonData: mtime-gated cache for the JSON fallback file.
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

// ── Database Connection Pool ───────────────────────────────────────────────────
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
      connectTimeout: 1000,
    });
    useMySQL = true;

    // ── One-time table creation + initial seed (ONLY if table is empty) ─────────
    // IMPORTANT: We must NOT overwrite existing MySQL rows on every server restart.
    // Admin panel edits are stored in MySQL as the source of truth (including
    // base64-encoded images). Overwriting them with the JSON file on each boot
    // would silently destroy all admin changes made after deployment.
    // Solution: seed from JSON once (when the table is completely empty),
    // then never touch existing rows again.
    dbPool.query(
      `CREATE TABLE IF NOT EXISTS travinno_collections (
        col_key VARCHAR(255) PRIMARY KEY,
        col_value LONGTEXT NOT NULL
      )`
    ).then(async () => {
      if (!dbPool) return;
      try {
        const [rows]: any = await dbPool.query(
          'SELECT COUNT(*) as count FROM travinno_collections'
        );
        const count = rows?.[0]?.count ?? 0;
        if (count === 0) {
          // First deploy — seed MySQL from JSON so the site has initial data
          console.log('[db-server] Empty MySQL table detected — seeding from JSON...');
          const localData = readJsonData();
          for (const [k, v] of Object.entries(localData)) {
            const strVal = typeof v === 'string' ? v : JSON.stringify(v);
            await dbPool.query(
              'INSERT INTO travinno_collections (col_key, col_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE col_value = VALUES(col_value)',
              [k, strVal]
            ).catch(() => null);
          }
          console.log('[db-server] MySQL seeding complete.');
        } else {
          console.log(`[db-server] MySQL has ${count} rows — skipping seed, keeping live data.`);
        }
      } catch (e: any) {
        console.log('[db-server] MySQL seed check failed:', e.message);
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

// ── getCollections ─────────────────────────────────────────────────────────────
// Uses React cache() for per-request deduplication (generateMetadata + page()
// both call this — the second call within the same React render tree is free).
// Also uses the module-level cachedMySQLData for cross-request warmup so
// subsequent page navigations never hit MySQL at all — they return in <1ms.
export const getCollections = cache(async (): Promise<Record<string, any>> => {
  let rawData: Record<string, any> = {};

  if (useMySQL && dbPool) {
    // Fast path: return the in-memory cache if it's warm
    if (cachedMySQLData) {
      rawData = cachedMySQLData;
    } else {
      try {
        const [rows]: any = await dbPool.query(
          'SELECT col_key, col_value FROM travinno_collections'
        );
        rows.forEach((row: any) => {
          try {
            rawData[row.col_key] = JSON.parse(row.col_value);
          } catch (e) {
            rawData[row.col_key] = row.col_value;
          }
        });
        // Warm up the cache so every subsequent request skips MySQL entirely
        cachedMySQLData = rawData;
      } catch (err: any) {
        console.log('[db-server] MySQL query failed, reverting to JSON:', err.message);
        useMySQL = false;
        rawData = readJsonData();
      }
    }
  } else {
    rawData = readJsonData();
  }

  // Merge in any default collections not present in DB
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

// ── saveCollection ─────────────────────────────────────────────────────────────
// Called by POST /api/save. Invalidates the in-memory cache so the very next
// getCollections() call reads fresh data from MySQL.
export async function saveCollection(key: string, value: any): Promise<void> {
  const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
  const parsedValue = typeof value === 'string' ? (() => { try { return JSON.parse(value); } catch { return value; } })() : value;

  // Invalidate both caches so next getCollections() fetches fresh data
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

// ── resetCollections ───────────────────────────────────────────────────────────
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

// -- Image field stripping for SSR ---------------------------------------------
// Stripping base64 from SSR reduces the HTML response from ~8 MB to ~5 KB.
// Images are served separately via GET /demo/api/image?c=...&i=...&f=...
const IMAGE_COLLECTIONS: Record<string, string[]> = {
  travinno_destinations: ['image'],
  travinno_hero_slides: ['desktopImage', 'mobileImage'],
  travinno_team: ['image'],
  travinno_blogs: ['image'],
};

function makeImageApiUrl(col: string, id: string | number, field: string, raw: string): string {
  const b64start = raw.indexOf(',');
  const ver = b64start >= 0 ? raw.substring(b64start + 1, b64start + 9) : '0';
  return `api/image?c=${col}&i=${encodeURIComponent(String(id))}&f=${field}&v=${ver}`;
}

function stripBase64ForSSR(data: Record<string, any>): Record<string, any> {
  const out: Record<string, any> = {};
  for (const [colKey, colVal] of Object.entries(data)) {
    const imageFields = IMAGE_COLLECTIONS[colKey];
    if (!imageFields || !Array.isArray(colVal)) { out[colKey] = colVal; continue; }
    out[colKey] = (colVal as any[]).map((item: any) => {
      if (!item || typeof item !== 'object') return item;
      const stripped = { ...item };
      for (const field of imageFields) {
        const val = item[field];
        if (typeof val === 'string' && val.startsWith('data:')) {
          const id = item.id ?? item.name ?? 0;
          stripped[field] = makeImageApiUrl(colKey, id, field, val);
        }
      }
      return stripped;
    });
  }
  return out;
}

// Use in public page.tsx files to keep SSR HTML small.
// Admin page uses getCollections() directly to get full base64 for editing.
export async function getCollectionsSSR(): Promise<Record<string, any>> {
  const full = await getCollections();
  return stripBase64ForSSR(full);
}
