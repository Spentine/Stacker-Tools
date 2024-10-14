// what did i make
async function readFile(file) {
  const promise = new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function(e) {
      const image = new Image();
      image.onload = function() {
        resolve(image);
      }
      image.onerror = function() {
        reject("fuck you");
      }
      image.src = e.target.result;
    }
    reader.readAsDataURL(file);
  });
  return promise;
}

// ChatGPTisms
// basically the same thing as looking something up

function applyPixelProjection(sourceCanvas, destCanvas, srcCorners, destCorners) {
  const srcCtx = sourceCanvas.getContext('2d');
  const destCtx = destCanvas.getContext('2d');

  // Get the pixel data from the source canvas
  const srcImageData = srcCtx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);
  const srcPixels = srcImageData.data;

  // Create new image data for the destination canvas
  const destImageData = destCtx.createImageData(destCanvas.width, destCanvas.height);
  const destPixels = destImageData.data;

  // For each pixel in the source canvas, map it to the destination canvas
  for (let y = 0; y < sourceCanvas.height; y++) {
    for (let x = 0; x < sourceCanvas.width; x++) {
      // Compute the source pixel index
      const srcIndex = (y * sourceCanvas.width + x) * 4;

      // Calculate the corresponding position on the destination canvas using interpolation
      const destPos = interpolatePixelPosition(x, y, srcCorners, destCorners, sourceCanvas.width, sourceCanvas.height);
      
      // Round the destination position
      const destX = Math.round(destPos.x);
      const destY = Math.round(destPos.y);

      // Make sure we are within bounds of the destination canvas
      if (destX >= 0 && destX < destCanvas.width && destY >= 0 && destY < destCanvas.height) {
        const destIndex = (destY * destCanvas.width + destX) * 4;

        // Copy the pixel data (RGBA) from the source to the destination
        destPixels[destIndex] = srcPixels[srcIndex];       // R
        destPixels[destIndex + 1] = srcPixels[srcIndex + 1]; // G
        destPixels[destIndex + 2] = srcPixels[srcIndex + 2]; // B
        destPixels[destIndex + 3] = srcPixels[srcIndex + 3]; // A (opacity)
      }
    }
  }

  // Put the modified pixel data back onto the destination canvas
  destCtx.putImageData(destImageData, 0, 0);
}

// Function to interpolate the pixel position
function interpolatePixelPosition(x, y, srcCorners, destCorners, srcWidth, srcHeight) {
  // Normalize the source coordinates (0 to 1 range)
  const u = x / srcWidth;
  const v = y / srcHeight;

  // Bilinearly interpolate between the destination corners
  const topX = lerp(destCorners[0].x, destCorners[1].x, u);
  const topY = lerp(destCorners[0].y, destCorners[1].y, u);
  const bottomX = lerp(destCorners[3].x, destCorners[2].x, u);
  const bottomY = lerp(destCorners[3].y, destCorners[2].y, u);

  const destX = lerp(topX, bottomX, v);
  const destY = lerp(topY, bottomY, v);

  return { x: destX, y: destY };
}

// Linear interpolation function
function lerp(start, end, t) {
  return start + t * (end - start);
}

export { readFile, applyPixelProjection };
