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

function getHue(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  /*
  var hue;
  if ((r >= g) && (g >= b)) {
      hue = 60*(g-b)/(r-b);
  } else if ((g > r) && (r >= b)) {
      hue = 60*(2 - (r-b)/(g-b));
  }
  
  return hue;
  */
  return (Math.atan2(1.732050808 * (g - b), (2 * r - g - b)) + 2 * Math.PI) % (2 * Math.PI);
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

const pieceHues = {
  "#": 0,
  "Z": 6.283,
  "Z": 0.001,
  "L": 0.385,
  "O": 0.855,
  "S": 1.424,
  "I": 2.765,
  "J": 4.243,
  "T": 4.9,
}

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
      var value = null;
      
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(x, y, 5, 5);
      
      const brightness = pixel[0] + pixel[1] + pixel[2];
      // console.log(brightness);
      
      if (brightness < 50) {
        row.push(null);
      } else if (brightness < 260) {
        row.push("#");
      } else {
        if (pixel[3] > 127) {
          value = getHue(pixel[0], pixel[1], pixel[2]);
        }
        
        var closestPiece = null;
        var closestHue = Infinity;
        
        const pieces = Object.keys(pieceHues);
        for (let piece=0; piece<pieces.length; piece++) {
          const diff = compareHues(pieceHues[pieces[piece]], value);
          if (diff < closestHue) {
            closestHue = diff;
            closestPiece = pieces[piece];
          }
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
      
      fn(image, 10);
    }, false,);
    
    if (file) {
      reader.readAsDataURL(file);
    }
    
  });
}

export { convertScreenshot, addPaste };