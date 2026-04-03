/**
 * fix-nvidia-agentmail-final.js
 * Run a flood-fill style background replacement with very generous tolerance
 * to ensure NVIDIA and AgentMail have pure #ffffff backgrounds.
 */
const sharp = require('sharp');
const path = require('path');

const logoDir = path.join(__dirname, '../public/asset/complogo');

// For NVIDIA: the current image has a near-white/grey background after previous processing.
// We need to flood-fill everything that isn't strongly green to pure white.
const logos = [
  {
    file: 'Screenshot 2026-04-03 215752.png', // NVIDIA
    // After previous processing, the image is mostly white/grey with faint green outlines
    // Boost greenish pixels to solid NVIDIA green, make everything else white
    mode: 'nvidia-fix',
  },
];

async function fixNvidia(filePath) {
  const raw = await sharp(filePath).raw().toBuffer({ resolveWithObject: true });
  const { data, info } = raw;
  const { width, height, channels } = info;

  const newData = Buffer.alloc(width * height * 4);

  for (let i = 0; i < width * height; i++) {
    const src = i * channels;
    const dst = i * 4;

    const r = data[src];
    const g = data[src + 1];
    const b = data[src + 2];

    // Calculate "greenness" - NVIDIA green is roughly hue ~80deg (yellowish-green)
    // A pixel is "logo" if it has significant green channel relative to r and b
    const isGreenish = g > r + 20 && g > b + 20 && g > 80;
    const isDarkish = r < 150 && g < 150 && b < 150 && Math.abs(r - g) < 30;

    if (isGreenish) {
      // Map to solid NVIDIA green (#76b900)
      const strength = Math.min(1, (g - Math.max(r, b)) / 80);
      newData[dst]   = Math.round(118 * strength + 255 * (1 - strength));
      newData[dst+1] = Math.round(185 * strength + 255 * (1 - strength));
      newData[dst+2] = Math.round(0   * strength + 255 * (1 - strength));
      newData[dst+3] = 255;
    } else if (isDarkish) {
      // Small dark pixels from anti-aliasing - map to dark green
      newData[dst]   = 180; newData[dst+1] = 200; newData[dst+2] = 120;
      newData[dst+3] = 255;
    } else {
      // Everything else → pure white
      newData[dst] = 255; newData[dst+1] = 255; newData[dst+2] = 255; newData[dst+3] = 255;
    }
  }

  await sharp(newData, { raw: { width, height, channels: 4 } })
    .flatten({ background: '#ffffff' })
    .png()
    .toFile(filePath);

  console.log('✓ NVIDIA fixed');
}

async function fixAgentMail() {
  const filePath = path.join(logoDir, 'Screenshot 2026-04-03 220043.png');
  const raw = await sharp(filePath).raw().toBuffer({ resolveWithObject: true });
  const { data, info } = raw;
  const { width, height, channels } = info;

  const newData = Buffer.alloc(width * height * 4);

  for (let i = 0; i < width * height; i++) {
    const src = i * channels;
    const dst = i * 4;

    const r = data[src];
    const g = data[src + 1];
    const b = data[src + 2];

    const lum = 0.299 * r + 0.587 * g + 0.114 * b;

    // After previous processing: bg is white (255), logo marks are near-white/grey
    // Logo marks should be dark grey/black, rest should be white
    if (lum < 200) {
      // Logo mark pixel → map to dark grey proportionally
      const darkness = Math.round((200 - lum) / 200 * 60); // Max darkness = 60 (dark grey)
      newData[dst] = darkness; newData[dst+1] = darkness; newData[dst+2] = darkness;
    } else {
      // White → stay white
      newData[dst] = 255; newData[dst+1] = 255; newData[dst+2] = 255;
    }
    newData[dst+3] = 255;
  }

  await sharp(newData, { raw: { width, height, channels: 4 } })
    .flatten({ background: '#ffffff' })
    .png()
    .toFile(filePath);

  console.log('✓ AgentMail fixed');
}

async function main() {
  const nvidiaPath = path.join(logoDir, 'Screenshot 2026-04-03 215752.png');
  await fixNvidia(nvidiaPath);
  await fixAgentMail();
  console.log('✅ Done!');
}

main().catch(console.error);
