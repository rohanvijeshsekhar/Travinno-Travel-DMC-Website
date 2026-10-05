const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const { ensureAllCollections } = require('./ensure-collections.cjs');

async function migrateToHostinger() {
  console.log('====================================================');
  console.log('  Travinno -> Hostinger Database Migration Tool     ');
  console.log('====================================================\n');

  const host = process.env.DB_HOST || '127.0.0.1';
  const port = parseInt(process.env.DB_PORT || '3306', 10);
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD || '';
  const database = process.env.DB_NAME;

  console.log('Connecting with configuration:');
  console.log(`- Host:     ${host}`);
  console.log(`- Port:     ${port}`);
  console.log(`- Database: ${database || '(NOT SET)'}`);
  console.log(`- User:     ${user || '(NOT SET)'}`);
  console.log(`- Password: ${password ? '********' : '(empty)'}\n`);

  if (!database || !user) {
    console.error('❌ Error: DB_NAME and DB_USER must be set in your .env file.');
    console.error('Please update .env with your Hostinger MySQL credentials and run again.');
    process.exit(1);
  }

  let connection;
  try {
    console.log('Connecting to MySQL server...');
    connection = await mysql.createConnection({
      host,
      port,
      user,
      password,
      database,
      connectTimeout: 10000,
    });
    console.log('✅ Successfully connected to MySQL database on Hostinger!\n');
  } catch (err) {
    console.error('❌ Failed to connect to Hostinger MySQL:');
    console.error(`   ${err.message}\n`);
    console.error('💡 TROUBLESHOOTING TIPS:');
    console.error('1. If running locally:');
    console.error('   - In Hostinger hPanel -> Databases -> Remote MySQL:');
    console.error('     Add your public IP (or "%" to allow any IP for development).');
    console.error('   - Use the Remote MySQL server IP or hostname provided by Hostinger, not localhost.');
    console.error('2. If running directly on the Hostinger server / VPS:');
    console.error('   - Set DB_HOST=localhost or 127.0.0.1');
    console.error('3. Verify that your database name and database username in .env match what Hostinger created (usually starts with u123456789_).');
    process.exit(1);
  }

  try {
    // 1. Create table if not exists
    console.log('Step 1: Creating `travinno_collections` table if not exists...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS travinno_collections (
        col_key VARCHAR(255) PRIMARY KEY,
        col_value LONGTEXT NOT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log('✅ Table `travinno_collections` is ready.\n');

    // 2. Load data from travinno-data.json (and ensure defaults)
    console.log('Step 2: Loading dataset from travinno-data.json...');
    const data = ensureAllCollections();
    const keys = Object.keys(data);
    console.log(`Found ${keys.length} collections to store.\n`);

    // 3. Store data into MySQL
    console.log('Step 3: Storing data in Hostinger database...');
    let successCount = 0;

    for (const key of keys) {
      const val = data[key];
      const stringValue = typeof val === 'string' ? val : JSON.stringify(val);
      const sizeKb = (Buffer.byteLength(stringValue, 'utf8') / 1024).toFixed(1);

      await connection.query(
        `INSERT INTO travinno_collections (col_key, col_value)
         VALUES (?, ?)
         ON DUPLICATE KEY UPDATE col_value = VALUES(col_value)`,
        [key, stringValue]
      );

      const count = Array.isArray(val) ? `${val.length} items` : '1 object';
      console.log(`  ✓ Stored ${key.padEnd(25)} (${count}, ${sizeKb} KB)`);
      successCount++;
    }

    console.log(`\n🎉 Success! Stored all ${successCount} collections into Hostinger database.`);

    // 4. Verify count from database
    const [rows] = await connection.query('SELECT col_key, LENGTH(col_value) as len FROM travinno_collections');
    console.log(`\nVerification query returned ${rows.length} rows from \`travinno_collections\`:`);
    rows.forEach(r => {
      console.log(`  • ${r.col_key}: ${(r.len / 1024).toFixed(1)} KB`);
    });

  } catch (queryErr) {
    console.error('❌ Error executing database operations:', queryErr);
  } finally {
    if (connection) {
      await connection.end();
      console.log('\nDatabase connection closed cleanly.');
    }
  }
}

migrateToHostinger().catch(err => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
