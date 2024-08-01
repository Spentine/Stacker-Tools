// == util ==

function importImage(url) {
  return new Promise((resolve, reject) => {
    const outputImage = new Image();
    outputImage.src = url;
    outputImage.onload = function() {
      resolve(outputImage);
    };
  })
}

/*
function getHue(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  return (Math.atan2(1.732050808 * (g - b), (2 * r - g - b)) + 2 * Math.PI) % (2 * Math.PI);
}
*/

function rgbToHsl(r, g, b){
  r /= 255, g /= 255, b /= 255;
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if(max == min){
      h = s = 0; // achromatic
  }else{
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch(max){
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
  }

  return {"hue": h, "saturation": s, "lightness": l};
}

function canvasToImage(canvas) { // => image
  const img = document.createElement("img");
  img.src = canvas.toDataURL("image/png");
  return img;
}

function boardToStr(board) {
  return board.map(v => v.map(p => p === null ? "-" : p).toString().replaceAll(",","")).toString().replaceAll(",","\n");
}

// == screenshot reader ==

/*
const pieceHues = [
  ["Z", 0],
  ["L", 0.06],
  ["O", 0.13],
  ["S", 0.22],
  ["I", 0.43],
  ["J", 0.74],
  ["T", 0.75],
];
*/


const pieceHues = [
  ["Z", 321 / 360],
  ["Z", 16 / 360],
  ["L", 17 / 360],
  ["L", 39 / 360],
  ["O", 40 / 360],
  ["O", 62 / 360],
  ["S", 63 / 360],
  ["S", 142 / 360],
  ["I", 143 / 360],
  ["I", 199 / 360],
  ["J", 200 / 360],
  ["J", 264 / 360],
  ["T", 265 / 360],
  ["T", 320 / 360],
]

function compareHues(x, y) {
  return Math.abs((3 * Math.PI + x - y) % (2 * Math.PI) - Math.PI);
}

function convertScreenshot(img, width) {
  const tileSize = img.width / width;
  const height = Math.round(img.height / tileSize);
  
  const canvas = document.createElement("canvas");
  canvas.width = width * tileSize;
  canvas.height = height * tileSize;
  const ctx = canvas.getContext("2d", {willReadFrequently: true});
  // console.log(ctx);
  
  ctx.drawImage(img, 0, 0);
  const board = [];
  
  for (let rowIndex=0; rowIndex<height; rowIndex++) {
    const row = [];
    for (let columnIndex=0; columnIndex<width; columnIndex++) {
      const x = Math.round(tileSize * (columnIndex + 0.5));
      const y = Math.round(tileSize * (rowIndex + 0.5));
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      
      // ctx.fillStyle = "#ffffff";
      // ctx.fillRect(x, y, 5, 5);
      
      const hsl = rgbToHsl(pixel[0], pixel[1], pixel[2]);
      // console.log(rowIndex, columnIndex, hsl);
      
      if (hsl.lightness < 0.1) {
        row.push(null);
      } else if (hsl.saturation < 0.1) {
        row.push("#");
      } else {
        if (pixel[3] > 127) {
          
          var closestPiece = null;
          var closestHue = Infinity;
          
          for (let piece=0; piece<pieceHues.length; piece++) {
            const diff = compareHues(pieceHues[piece][1], hsl.hue);
            // console.log(hsl.hue, diff);
            if (diff < closestHue) {
              closestHue = diff;
              closestPiece = pieceHues[piece][0];
            }
          }
          
        } else {
          closestPiece = null;
        }
        
        row.push(closestPiece);
      }
    }
    board.push(row);
  }
  
  console.log(board);
  console.log(boardToStr(board));
  // document.getElementById("outputImages").appendChild(canvasToImage(canvas));
  return board;
  
}

function addPaste(fn) {
  window.addEventListener("paste", function(event){
    const data = event.clipboardData || window.clipboardData;
    const file = data.files[0];
    
    // console.log(file);
    
    // read file
    const reader = new FileReader();
    reader.addEventListener("load", async function() {
      const image = await importImage(reader.result);
      
      fn(image);
    }, false,);
    
    if (file) {
      reader.readAsDataURL(file);
    }
    
  });
}

export { convertScreenshot, addPaste };