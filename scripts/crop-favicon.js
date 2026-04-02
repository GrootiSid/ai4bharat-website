const sharp = require('sharp');
const path = require('path');

async function processFavicon() {
  try {
    const inputPath = path.join(__dirname, '../public/asset/favicon.png');
    const outputPath = path.join(__dirname, '../src/app/icon.png');
    
    // .trim() automatically removes borders that match the top-left pixel
    // This perfectly crops out excess transparency or solid backgrounds!
    await sharp(inputPath)
      .trim()
      .toFile(outputPath);
      
    console.log('Successfully cropped the favicon padding!');
  } catch (error) {
    console.error('Error during image processing:', error);
  }
}

processFavicon();
