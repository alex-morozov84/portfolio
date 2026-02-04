const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [
  { size: 192, name: 'icon-192.png' },
  { size: 512, name: 'icon-512.png' },
  { size: 180, name: 'apple-touch-icon.png' }, // Apple рекомендует 180x180
];

async function generateIcons() {
  const logoPath = path.join(__dirname, '../public/logo-dark.png');
  const publicDir = path.join(__dirname, '../public');

  console.log('Generating PWA icons from logo-dark.png...\n');

  for (const { size, name } of sizes) {
    const outputPath = path.join(publicDir, name);

    try {
      await sharp(logoPath)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 139, g: 92, b: 246, alpha: 1 }, // Violet background matching theme
        })
        .png()
        .toFile(outputPath);

      console.log(`✓ Generated ${name} (${size}x${size})`);
    } catch (error) {
      console.error(`✗ Error generating ${name}:`, error.message);
    }
  }

  console.log('\nUpdating manifest.json...');
  updateManifest();
}

function updateManifest() {
  const manifestPath = path.join(__dirname, '../public/manifest.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

  manifest.icons = [
    {
      src: '/icon-192.png',
      sizes: '192x192',
      type: 'image/png',
      purpose: 'any maskable',
    },
    {
      src: '/icon-512.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'any maskable',
    },
  ];

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log('✓ manifest.json updated\n');
  console.log('Done! PWA icons generated successfully.');
}

generateIcons().catch(console.error);
