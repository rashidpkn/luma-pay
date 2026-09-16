import sharp from "sharp";

async function processImage() {
  const input = "src/assets/sculpture.jpg";
  const output = "src/assets/sculpture.png";

  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Convert light pixels to transparent
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const brightness = (r + g + b) / 3;

    // Soft threshold for white background
    if (brightness > 240) {
      const alphaFactor = Math.max(0, 1 - (brightness - 240) / 15);
      data[i + 3] = Math.round(data[i + 3] * alphaFactor);
    }
  }

  await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4,
    },
  })
    .png()
    .toFile(output);

  console.log("Successfully generated transparent sculpture.png!");
}

processImage();
