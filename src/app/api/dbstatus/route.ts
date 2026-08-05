import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export const dynamic = 'force-dynamic';

export async function GET() {
  const host = process.env.DB_HOST;
  const port = parseInt(process.env.DB_PORT || '3306', 10);
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD || '';
  const database = process.env.DB_NAME;

  // Check if env vars are present
  if (!host || !user || !database) {
    return NextResponse.json({
      connected: false,
      error: 'Missing DB environment variables',
      env: {
        DB_HOST: host || '(not set)',
        DB_PORT: process.env.DB_PORT || '(not set)',
        DB_USER: user || '(not set)',
        DB_NAME: database || '(not set)',
        DB_PASSWORD: password ? '(set)' : '(not set)',
      }
    });
  }

  let connection: mysql.Connection | null = null;
  try {
    connection = await mysql.createConnection({
      host, port, user, password, database,
      connectTimeout: 5000,
    });

    // Check if table exists
    const [tables]: any = await connection.query(
      `SHOW TABLES LIKE 'travinno_collections'`
    );
    const tableExists = tables.length > 0;

    if (!tableExists) {
      return NextResponse.json({
        connected: true,
        tableExists: false,
        message: 'Connected to MySQL but travinno_collections table does not exist yet.',
        env: { DB_HOST: host, DB_PORT: port, DB_USER: user, DB_NAME: database }
      });
    }

    // Get all collection keys and their sizes
    const [rows]: any = await connection.query(
      `SELECT col_key,
              LENGTH(col_value) AS size_bytes,
              CASE
                WHEN col_value LIKE '[%' THEN JSON_LENGTH(col_value)
                ELSE 1
              END AS item_count
       FROM travinno_collections
       ORDER BY col_key`
    );

    const summary = rows.map((r: any) => ({
      key: r.col_key,
      items: r.item_count,
      size_kb: (r.size_bytes / 1024).toFixed(1) + ' KB',
    }));

    const [countRow]: any = await connection.query(
      `SELECT COUNT(*) as total FROM travinno_collections`
    );

    await connection.end();

    return NextResponse.json({
      connected: true,
      tableExists: true,
      totalCollections: countRow[0].total,
      collections: summary,
      env: { DB_HOST: host, DB_PORT: port, DB_USER: user, DB_NAME: database }
    });

  } catch (err: any) {
    if (connection) { try { await connection.end(); } catch (_) {} }
    return NextResponse.json({
      connected: false,
      error: err.message,
      env: { DB_HOST: host, DB_PORT: port, DB_USER: user, DB_NAME: database }
    });
  }
}
