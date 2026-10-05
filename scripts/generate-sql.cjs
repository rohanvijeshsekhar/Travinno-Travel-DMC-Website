const fs = require('fs');
const path = require('path');
const { ensureAllCollections } = require('./ensure-collections.cjs');

function escapeSqlString(str) {
  return str
    .replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, (char) => {
      switch (char) {
        case '\0': return '\\0';
        case '\x08': return '\\b';
        case '\x09': return '\\t';
        case '\x1a': return '\\z';
        case '\n': return '\\n';
        case '\r': return '\\r';
        case '"':
        case "'":
        case '\\':
        case '%':
          return '\\' + char;
        default:
          return char;
      }
    });
}

function generateSqlFile() {
  const data = ensureAllCollections();
  const keys = Object.keys(data);

  let sql = `-- ====================================================================\n`;
  sql += `-- Travinno Hostinger Database Setup Script\n`;
  sql += `-- Table: travinno_collections\n`;
  sql += `-- Instructions: In Hostinger hPanel -> Databases -> phpMyAdmin -> SQL tab,\n`;
  sql += `-- paste this entire script and click "Go".\n`;
  sql += `-- ====================================================================\n\n`;

  sql += `CREATE TABLE IF NOT EXISTS \`travinno_collections\` (\n`;
  sql += `  \`col_key\` VARCHAR(255) NOT NULL PRIMARY KEY,\n`;
  sql += `  \`col_value\` LONGTEXT NOT NULL\n`;
  sql += `) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n`;

  for (const key of keys) {
    const val = data[key];
    const jsonStr = typeof val === 'string' ? val : JSON.stringify(val);
    const escapedVal = escapeSqlString(jsonStr);

    sql += `-- Collection: ${key}\n`;
    sql += `INSERT INTO \`travinno_collections\` (\`col_key\`, \`col_value\`) VALUES ('${key}', '${escapedVal}')\n`;
    sql += `ON DUPLICATE KEY UPDATE \`col_value\` = VALUES(\`col_value\`);\n\n`;
  }

  const outputPath = path.resolve(__dirname, '../hostinger_setup.sql');
  fs.writeFileSync(outputPath, sql, 'utf8');
  console.log(`[OK] Generated SQL file: ${outputPath} (${(fs.statSync(outputPath).size / 1024 / 1024).toFixed(2)} MB)`);
}

generateSqlFile();
