function importImage(url) {
  return new Promise((resolve, reject) => {
    const outputImage = new Image();
    outputImage.src = url;
    outputImage.onload = function() {
      resolve(outputImage);
    };
  })
}

const currentSkinURL = "minos/tetrio.png";
const tileSize = 96;
const currentSkin = await importImage(currentSkinURL);
const piecePosMap = {
  "Z": [0, 0],
  "L": [96, 0],
  "O": [192, 0],
  "S": [288, 0],
  "I": [384, 0],
  "J": [0, 96],
  "T": [96, 96],
  "hold": [192, 96],
  "garbage": [288, 96],
  "unclearable": [384, 96],
};
const charPieceMap = {
  "-": null,
  "Z": "Z",
  "L": "L",
  "O": "O",
  "S": "S",
  "I": "I",
  "J": "J",
  "T": "T",
  "h": "hold",
  "#": "garbage",
  "@": "unclearable",
}
const pieces = {
  "Z": {
    "minos": [[
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
    ], null, null, null],
  },
  "L": {
    "minos": [[
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
    ], null, null, null],
  },
  "O": {
    "minos": [[
        [1, 1],
        [1, 1],
    ], null, null, null],
  },
  "S": {
    "minos": [[
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
    ], null, null, null],
  },
  "I": {
    "minos": [[
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ], null, null, null],
  },
  "J": {
    "minos": [[
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
    ], null, null, null],
  },
  "T": {
    "minos": [[
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
    ], null, null, null],
  },
}

function rotateMatrix(matrix) {
  // internet genius solution
  return matrix[0].map((val, index) => matrix.map(row => row[index]).reverse());
}

function initData() {
  const pieceNames = Object.keys(pieces);
  pieceNames.forEach(function(pieceName) {
    const piece = pieces[pieceName];
    const minos = piece.minos;
    
    // calculate rotations of piece
    for (let rotation=0; rotation<3; rotation++) {
      minos[rotation+1] = rotateMatrix(minos[rotation]);
    }
    piece.bounds = new Array(4);
    
    // calculate bounds of rotations
    for (let rotation=0; rotation<4; rotation++) {
      const row = {"min": null, "max": null};
      const column = {"min": null, "max": null};
      const bounds = {"row": row, "column": column};
      piece.bounds[rotation] = bounds;
      
      const currentMinos = minos[rotation];
      
      for (let i=0; row.min === null; i++) {
        if (!currentMinos[i].every(v => v === 0)) { // if there is a 1 in the row
          row.min = i;
        }
      }
      
      for (let i=currentMinos.length-1; row.max === null; i--) {
        if (!currentMinos[i].every(v => v === 0)) {
          row.max = i;
        }
      }
      
      for (let i=0; column.min === null; i++) {
        if (!currentMinos.every(v => v[i] === 0)) { // if there is a 1 in the column
          column.min = i;
        }
      }
      
      for (let i=currentMinos.length-1; column.max === null; i--) {
        if (!currentMinos.every(v => v[i] === 0)) {
          column.max = i;
        }
      }
    }
  });
}

const renderingCanvas = document.createElement("canvas");

function getCanvas() {
  return renderingCanvas;
}

function canvasToImage(canvas) { // => image
  const img = document.createElement("img");
  img.src = canvas.toDataURL("image/png");
  return {"image": img, "width": canvas.width, "height": canvas.height};
}

async function resizeImage(image, width, height) {
  const canvas = getCanvas()
  canvas.width = width;
  canvas.height = height;
  
  const img = await importImage(image.image.src);
  
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, width, height);
  
  return canvasToImage(canvas);
}

function getMinoData(mino) {
  return [currentSkin, ...piecePosMap[mino], tileSize, tileSize];
}

function renderMino(mino) {
  const canvas = getCanvas();
  canvas.width = tileSize;
  canvas.height = tileSize;
  
  const ctx = canvas.getContext("2d");
  
  ctx.drawImage(...getMinoData(mino), 0, 0, tileSize, tileSize);
  
  const image = canvasToImage(canvas);
  // canvas.remove();
  
  return image;
}

function stringToBoard(str, width, height) {
  const board = [];
  
  var filteredStr = "";
  const allowedChars = Object.keys(charPieceMap);
  for (let i=0; i<str.length; i++) {
    if (allowedChars.includes(str[i])) {
      filteredStr += str[i];
    }
  }
  
  while (filteredStr.length < width * height) {
    filteredStr = "-" + filteredStr;
  }
  
  // in case the height is different than the one specified
  if (filteredStr.length > width * height && filteredStr.length % width === 0) {
    height = filteredStr.length / width;
  }
  
  var charIndex = 0;
  for (let rowIndex=0; rowIndex<height; rowIndex++) {
    const row = new Array(width);
    board.push(row);
    
    for (let columnIndex=0; columnIndex<width; columnIndex++) {
      row[columnIndex] = filteredStr[charIndex];
      charIndex++;
    }
    
  }
  
  return board;
}

function renderBoard(board) {
  const canvas = getCanvas();
  const width = board[0].length;
  const height = board.length;
  canvas.width = tileSize * width;
  canvas.height = tileSize * height;
  
  const ctx = canvas.getContext("2d");
  
  for (let rowIndex=0; rowIndex<height; rowIndex++) {
    const row = board[rowIndex];
    
    for (let columnIndex=0; columnIndex<width; columnIndex++) {
      const mino = charPieceMap[row[columnIndex]];
      if (mino) {
        ctx.drawImage(...getMinoData(mino), columnIndex * tileSize, rowIndex * tileSize, tileSize, tileSize);
      }
    }
    
  }
  
  const image = canvasToImage(canvas);
  // canvas.remove();
  
  return image;
}

function renderPieceOnContext(ctx, piece, x=0, y=0, centeredX=false, centeredY=false, rotation=0) {
  if (centeredX) {
    const bounds = pieces[piece].bounds[rotation].column;
    x += tileSize * ((bounds.min - bounds.max) / 2 - bounds.min - 0.5);
  }
  if (centeredY) {
    const bounds = pieces[piece].bounds[rotation].row;
    y += tileSize * ((bounds.min - bounds.max) / 2 - bounds.min - 0.5);
  }
  
  const minos = pieces[piece].minos[rotation];
  minos.forEach((row, rowIndex) => {
    row.forEach((mino, columnIndex) => {
      if (mino === 1) {
        ctx.drawImage(...getMinoData(piece), x + columnIndex * tileSize, y + rowIndex * tileSize, tileSize, tileSize);
      }
    });
  });
}

function renderQueue(inputQueue, dividers, direction="v", spacing=0.5, evenlySpaced=true) {
  
  try {
    var queue;
    if (typeof inputQueue === "string") {
      queue = [];
      for (let i=0; i<inputQueue.length; i++) {
        
        if (Object.keys(pieces).includes(inputQueue[i])) {
          queue.push(inputQueue[i]);
        } else if (Object.keys(pieces).includes(inputQueue[i].toUpperCase())) {
          queue.push(inputQueue[i].toUpperCase());
        }
        
      }
    } else {
      queue = inputQueue;
    }
  } catch (e) {
    console.log("Error parsing queue.");
    console.log(inputQueue);
    console.log(e);
    return null;
  }
  
  if (dividers === null) {
    dividers = [];
  }
  
  /*
  try {
    dividers.sort((a, b) => a - b);
  } catch (e) {
    console.log("Unable to sort dividers.");
    console.log(dividers);
    console.log(e);
    return null;
  }
  */
  
  // handle weird ass inputs
  try {
    spacing = Number(spacing);
  } catch (e) {
    console.log("Unable to parse spacing.");
    console.log(spacing);
    console.log(e);
  }
  if (
        queue.length === 0
    ||  typeof spacing !== "number"
    ||  spacing < -100 || spacing > 100
    ||  (direction !== "v" && direction !== "h")
  ) {
    console.log("Invalid input");
    console.log({
      "inputQueue": inputQueue,
      "parsedQueue": queue,
      "direction": direction,
      "spacing": spacing,
      "evenlySpaced": evenlySpaced
    });
    return null;
  }
  
  const canvas = getCanvas();
  const ctx = canvas.getContext("2d");
  const dividerPositions = [0];
  
  if (direction === "v") {
    
    var max = 0;
    queue.forEach((piece) => {
      const b = pieces[piece].bounds[0].column;
      const w = 1 + b.max - b.min;
      if (w > max) {
        max = w;
      }
    });
    
    const width = max;
    const middle = (tileSize * max) >>> 1; // divided by 2
    canvas.width = tileSize * width;
    
    if (evenlySpaced) {
      
      /*
        ||.||.|||.|||.|
        spacing * (queue.length -1) + sum
      */
      
      var sum = 0;
      queue.forEach((piece) => {
        const b = pieces[piece].bounds[0].row;
        sum += 1 + b.max - b.min;
      });
      
      const height = spacing * (queue.length - 1) + sum;
      sum = 0;
      canvas.height = tileSize * height;
      
      queue.forEach((piece, index) => {
        const b = pieces[piece].bounds[0].row;
        
        renderPieceOnContext(ctx, piece, middle, tileSize * (sum + (1 + b.max - b.min) / 2), true, true, 0);
        sum += spacing + 1 + b.max - b.min;
        dividerPositions.push(sum - spacing / 2);
      });
      
    } else {
      
      const height = spacing * (queue.length);
      canvas.height = tileSize * height;
      
      queue.forEach((piece, index) => {
        renderPieceOnContext(ctx, piece, middle, tileSize * spacing * (index + 0.5), true, true, 0);
        dividerPositions.push(spacing * index);
      });
      
    }
    
    // draw dividers
    ctx.fillStyle = "#ffffff";
    ctx.globalAlpha = 0.5;
    
    dividers.forEach(function (divider) {
      if (dividerPositions[divider]) { // handle invalid indicies (number larger than array)
        ctx.fillRect(10, tileSize * dividerPositions[divider] - 5, tileSize * width - 20, 10);
      }
    });
    
  } else {
    var max = 0;
    queue.forEach((piece) => {
      const b = pieces[piece].bounds[0].row;
      const w = 1 + b.max - b.min;
      if (w > max) {
        max = w;
      }
    });
    
    const height = max;
    const middle = (tileSize * max) >>> 1; // divided by 2
    canvas.height = tileSize * height;
    
    if (evenlySpaced) {
      
      var sum = 0;
      queue.forEach((piece) => {
        const b = pieces[piece].bounds[0].column;
        sum += 1 + b.max - b.min;
      });
      
      const width = spacing * (queue.length - 1) + sum;
      sum = 0;
      canvas.width = tileSize * width;
      
      queue.forEach((piece, index) => {
        const b = pieces[piece].bounds[0].column;
        
        renderPieceOnContext(ctx, piece, tileSize * (sum + (1 + b.max - b.min) / 2), middle, true, true, 0);
        sum += spacing + 1 + b.max - b.min;
        dividerPositions.push(sum - spacing / 2);
      });
      
    } else {
      
      const width = spacing * (queue.length);
      canvas.width = tileSize * width;
      
      queue.forEach((piece, index) => {
        renderPieceOnContext(ctx, piece, tileSize * spacing * (index + 0.5), middle, true, true, 0);
        dividerPositions.push(spacing * index);
      });
      
    }
    
    // draw dividers
    ctx.fillStyle = "#ffffff";
    ctx.globalAlpha = 0.5;
    
    dividers.forEach(function (divider) {
      if (dividerPositions[divider]) {
        ctx.fillRect(tileSize * dividerPositions[divider] - 5, 10, 10, tileSize * height - 20);
      }
    });
    
  }
  
  const image = canvasToImage(canvas);
  
  return image;
}

initData();

export { resizeImage, renderMino, stringToBoard, renderBoard, renderQueue };