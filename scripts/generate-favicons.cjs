const sharp = require('sharp');
const fs = require('fs');

async function generateFavicons() {
  // 1. Load src/assets/logo.webp, trim transparent borders
  const trimmedBuffer = await sharp('src/assets/logo.webp').trim().toBuffer();
  
  // 2. Generate a master 512x512 canvas with optical padding
  // 512 square canvas with transparent background.
  // We want the icon to fit comfortably inside 512x512, say 440px max dimension, centered.
  const master512 = await sharp(trimmedBuffer)
    .resize(440, 440, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({
      top: 36,
      bottom: 36,
      left: 36,
      right: 36,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .resize(512, 512)
    .png()
    .toBuffer();

  fs.writeFileSync('public/icon-512.png', master512);

  // Sizes to generate
  const sizes = [16, 32, 48, 64, 96, 128, 144, 180, 192, 256, 512];
  const pngBuffers = {};

  for (const sz of sizes) {
    const buf = await sharp(master512)
      .resize(sz, sz, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
    pngBuffers[sz] = buf;
  }

  // Write out files
  fs.writeFileSync('public/icon.png', pngBuffers[192]);
  fs.writeFileSync('src/app/icon.png', pngBuffers[192]);
  fs.writeFileSync('public/icon-48.png', pngBuffers[48]);
  fs.writeFileSync('public/icon-96.png', pngBuffers[96]);
  fs.writeFileSync('public/icon-144.png', pngBuffers[144]);
  fs.writeFileSync('public/icon-192.png', pngBuffers[192]);
  fs.writeFileSync('public/apple-icon.png', pngBuffers[180]);
  fs.writeFileSync('public/apple-touch-icon.png', pngBuffers[180]);
  fs.writeFileSync('src/app/apple-icon.png', pngBuffers[180]);

  // Create multi-size ICO: 16, 32, 48, 64, 128, 256
  const icoSizes = [16, 32, 48, 64, 128, 256];
  const icoCount = icoSizes.length;
  const headerSize = 6 + 16 * icoCount;
  let offset = headerSize;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = ICO
  header.writeUInt16LE(icoCount, 4);

  const images = [];
  icoSizes.forEach((sz, idx) => {
    const png = pngBuffers[sz];
    images.push(png);
    const entryOffset = 6 + idx * 16;
    header.writeUInt8(sz === 256 ? 0 : sz, entryOffset); // width
    header.writeUInt8(sz === 256 ? 0 : sz, entryOffset + 1); // height
    header.writeUInt8(0, entryOffset + 2); // color count
    header.writeUInt8(0, entryOffset + 3); // reserved
    header.writeUInt16LE(1, entryOffset + 4); // color planes
    header.writeUInt16LE(32, entryOffset + 6); // bits per pixel
    header.writeUInt32LE(png.length, entryOffset + 8); // size of image data
    header.writeUInt32LE(offset, entryOffset + 12); // offset
    offset += png.length;
  });

  const icoBuffer = Buffer.concat([header, ...images]);
  fs.writeFileSync('public/favicon.ico', icoBuffer);
  fs.writeFileSync('src/app/favicon.ico', icoBuffer);

  // Also create a high-quality SVG favicon
  const base64Png = master512.toString('base64');
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <image href="data:image/png;base64,${base64Png}" width="512" height="512"/>
</svg>`;
  fs.writeFileSync('public/favicon.svg', svgContent);
  fs.writeFileSync('public/icon.svg', svgContent);

  // Copy to dist and hostinger-deploy folders if they exist
  const extraDirs = ['dist', 'hostinger-deploy/dist', 'hostinger-deploy'];
  for (const d of extraDirs) {
    if (fs.existsSync(d)) {
      fs.writeFileSync(`${d}/favicon.ico`, icoBuffer);
      fs.writeFileSync(`${d}/favicon.svg`, svgContent);
      if (fs.existsSync(`${d}/images`)) {
        fs.writeFileSync(`${d}/images/icon-512.png`, master512);
      }
    }
  }

  console.log('Successfully generated all favicons, app icons, and ICO files!');
}

generateFavicons().catch(console.error);
