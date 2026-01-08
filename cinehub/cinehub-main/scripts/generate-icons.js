const sharp = require('sharp');
const path = require('path');

const sourceImage = 'C:\\Users\\gusta\\.gemini\\antigravity\\brain\\a65faf07-8ea5-4ead-be31-93f34fc35661\\cinema_hub_icon_1767828786771.png';
const publicDir = path.join(__dirname, '../public');

async function generateIcons() {
  try {
    // Generate 192x192 icon
    await sharp(sourceImage)
      .resize(192, 192)
      .toFile(path.join(publicDir, 'icon-192x192.png'));
    console.log('✓ Generated icon-192x192.png');

    // Generate 512x512 icon
    await sharp(sourceImage)
      .resize(512, 512)
      .toFile(path.join(publicDir, 'icon-512x512.png'));
    console.log('✓ Generated icon-512x512.png');

    console.log('All icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
    process.exit(1);
  }
}

generateIcons();
