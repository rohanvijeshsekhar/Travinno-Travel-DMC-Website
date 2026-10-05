const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const dataFilePath = path.resolve(__dirname, '../travinno-data.json');

async function migrateImagesToCloudinary() {
  console.log('====================================================');
  console.log('  Travinno -> Cloudinary Image Migration Tool       ');
  console.log('====================================================\n');

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    console.error('❌ Cloudinary credentials are not configured in your .env file!');
    console.error('Please add the following to your .env file:');
    console.error('  CLOUDINARY_CLOUD_NAME=your_cloud_name');
    console.error('  CLOUDINARY_API_KEY=your_api_key');
    console.error('  CLOUDINARY_API_SECRET=your_api_secret\n');
    console.error('You can find these in your Cloudinary Dashboard at: https://cloudinary.com/console');
    process.exit(1);
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });

  console.log(`✓ Cloudinary configured for cloud: "${cloudName}"\n`);

  if (!fs.existsSync(dataFilePath)) {
    console.error('❌ travinno-data.json not found!');
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));

  // Collect all base64 images with their access paths
  const tasks = [];

  function findBase64Images(obj, pathArr = []) {
    if (!obj) return;
    if (typeof obj === 'string' && obj.startsWith('data:image/')) {
      tasks.push({ path: pathArr, dataUri: obj });
    } else if (Array.isArray(obj)) {
      obj.forEach((item, idx) => findBase64Images(item, [...pathArr, idx]));
    } else if (typeof obj === 'object') {
      for (const [k, v] of Object.entries(obj)) {
        findBase64Images(v, [...pathArr, k]);
      }
    }
  }

  findBase64Images(data);

  console.log(`Found ${tasks.length} base64 images to upload to Cloudinary...\n`);

  if (tasks.length === 0) {
    console.log('🎉 No base64 images found! All images are already hosted as URLs.');
    process.exit(0);
  }

  let uploadedCount = 0;
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const pathStr = task.path.join('.');
    const sizeKb = (task.dataUri.length / 1024).toFixed(1);
    process.stdout.write(`[${i + 1}/${tasks.length}] Uploading image at ${pathStr} (${sizeKb} KB)... `);

    try {
      const result = await cloudinary.uploader.upload(task.dataUri, {
        folder: 'travinno',
        resource_type: 'image',
        transformation: [
          { quality: 'auto:good' },
          { fetch_format: 'auto' },
        ],
      });

      // Update in data object
      let curr = data;
      for (let p = 0; p < task.path.length - 1; p++) {
        curr = curr[task.path[p]];
      }
      curr[task.path[task.path.length - 1]] = result.secure_url;

      console.log(`✅ Done!\n    ↳ ${result.secure_url}`);
      uploadedCount++;
    } catch (err) {
      console.log(`❌ Failed: ${err.message}`);
    }
  }

  // Save cleaned JSON file
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`\n🎉 Successfully uploaded and replaced ${uploadedCount}/${tasks.length} images!`);
  console.log(`Updated ${dataFilePath}`);

  // Re-generate SQL setup file
  try {
    const { execSync } = require('child_process');
    console.log('\nRegenerating hostinger_setup.sql with clean Cloudinary URLs...');
    execSync('node scripts/generate-sql.cjs', { stdio: 'inherit', cwd: path.resolve(__dirname, '..') });
  } catch (_) {}

  // If MySQL is configured, also update MySQL
  if (process.env.DB_USER && process.env.DB_NAME) {
    try {
      console.log('\nSyncing updated collections with Hostinger MySQL...');
      const mysql = require('mysql2/promise');
      const connection = await mysql.createConnection({
        host: process.env.DB_HOST || '127.0.0.1',
        port: parseInt(process.env.DB_PORT || '3306', 10),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME,
        connectTimeout: 5000,
      });

      for (const [key, val] of Object.entries(data)) {
        const strVal = typeof val === 'string' ? val : JSON.stringify(val);
        await connection.query(
          'INSERT INTO travinno_collections (col_key, col_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE col_value = VALUES(col_value)',
          [key, strVal]
        );
      }
      await connection.end();
      console.log('✅ Successfully updated Hostinger MySQL database rows with Cloudinary URLs!');
    } catch (dbErr) {
      console.log('Note: Could not automatically sync to MySQL (' + dbErr.message + '). You can run "npm run db:hostinger" manually.');
    }
  }

  console.log('\nImage migration to Cloudinary complete!');
}

migrateImagesToCloudinary().catch(err => {
  console.error('Fatal error during migration:', err);
  process.exit(1);
});
