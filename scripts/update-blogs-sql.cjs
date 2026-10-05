const fs = require('fs');

// 1. Update travinno-data.json
const data = JSON.parse(fs.readFileSync('travinno-data.json', 'utf8'));
if (data.travinno_blogs) {
  data.travinno_blogs.forEach(b => {
    if (b.id === 1) b.image = 'https://res.cloudinary.com/fifyhrcr/image/upload/v1791175166/travinno/b5mfb48vqu8p3qkgxb8x.jpg';
    if (b.id === 2) b.image = 'https://res.cloudinary.com/fifyhrcr/image/upload/v1791175169/travinno/raf426nhpqgurz6ledpa.jpg';
    if (b.id === 3) b.image = 'https://res.cloudinary.com/fifyhrcr/image/upload/v1791175176/travinno/ysaa3pcksqwv50j70v5k.jpg';
  });
  fs.writeFileSync('travinno-data.json', JSON.stringify(data, null, 2), 'utf8');
  console.log('✅ travinno-data.json updated');
}

// 2. Regenerate hostinger_setup.sql
let sql = '-- ====================================================================\n';
sql += '-- Travinno Hostinger Database Setup Script\n';
sql += '-- Table: travinno_collections\n';
sql += '-- Instructions: In Hostinger hPanel -> Databases -> phpMyAdmin -> SQL tab,\n';
sql += '-- paste this entire script and click "Go".\n';
sql += '-- ====================================================================\n\n';
sql += 'CREATE TABLE IF NOT EXISTS `travinno_collections` (\n';
sql += '  `col_key` VARCHAR(255) NOT NULL PRIMARY KEY,\n';
sql += '  `col_value` LONGTEXT NOT NULL\n';
sql += ') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n';

for (const [key, val] of Object.entries(data)) {
  const jsonStr = JSON.stringify(val);
  const escaped = jsonStr.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  sql += '-- Collection: ' + key + '\n';
  sql += "INSERT INTO `travinno_collections` (`col_key`, `col_value`) VALUES ('" + key + "', '" + escaped + "')\n";
  sql += "ON DUPLICATE KEY UPDATE `col_value` = VALUES(`col_value`);\n\n";
}

fs.writeFileSync('hostinger_setup.sql', sql, 'utf8');
console.log('✅ hostinger_setup.sql regenerated with Cloudinary URLs');
