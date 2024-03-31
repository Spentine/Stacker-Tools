const SRSKicks = [
  [
    [
      [0, 0], 
    ],
    [
      [0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2],
    ],
    [
      [0, 0], 
    ],
    [
      [0, 0], [1, 0], [1, -1], [0, 2], [1, 2],
    ],
  ],
  [
    [
      [0, 0], [1, 0], [1, 1], [0, -2], [1, -2],
    ],
    [
      [0, 0], 
    ],
    [
      [0, 0], [1, 0], [1, 1], [0, -2], [1, -2],
    ],
    [
      [0, 0], 
    ],
  ],
  [
    [
      [0, 0], 
    ],
    [
      [0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2],
    ],
    [
      [0, 0], 
    ],
    [
      [0, 0], [1, 0], [1, -1], [0, 2], [1, 2],
    ],
  ],
  [
    [
      [0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2], 
    ],
    [
      [0, 0], 
    ],
    [
      [0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2], 
    ],
    [
      [0, 0], 
    ],
  ],
]

const SRSTKicks = [
  [
    [
      [0, 0], 
    ],
    [
      [0, 0], [-1, 0], [-1, -1], [0, 2], {"position": [-1, 2], "spin": 2},
    ],
    [
      [0, 0], 
    ],
    [
      [0, 0], [1, 0], [1, -1], [0, 2], {"position": [1, 2], "spin": 2},
    ],
  ],
  [
    [
      [0, 0], [1, 0], [1, 1], [0, -2], [1, -2],
    ],
    [
      [0, 0], 
    ],
    [
      [0, 0], [1, 0], [1, 1], [0, -2], [1, -2],
    ],
    [
      [0, 0], 
    ],
  ],
  [
    [
      [0, 0], 
    ],
    [
      [0, 0], [-1, 0], [-1, -1], [0, 2], {"position": [-1, 2], "spin": 2},
    ],
    [
      [0, 0], 
    ],
    [
      [0, 0], [1, 0], [1, -1], [0, 2], {"position": [1, 2], "spin": 2},
    ],
  ],
  [
    [
      [0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2], 
    ],
    [
      [0, 0], 
    ],
    [
      [0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2], 
    ],
    [
      [0, 0], 
    ],
  ],
]

const noKicks = [
  [
    [
      [0, 0], 
    ],
    [
      [0, 0], 
    ],
    [
      [0, 0], 
    ],
    [
      [0, 0], 
    ],
  ],
  [
    [
      [0, 0], 
    ],
    [
      [0, 0], 
    ],
    [
      [0, 0], 
    ],
    [
      [0, 0], 
    ],
  ],
  [
    [
      [0, 0], 
    ],
    [
      [0, 0], 
    ],
    [
      [0, 0], 
    ],
    [
      [0, 0], 
    ],
  ],
  [
    [
      [0, 0], 
    ],
    [
      [0, 0], 
    ],
    [
      [0, 0], 
    ],
    [
      [0, 0], 
    ],
  ],
]

const IKicks = [
  [
    [
      [0, 0], 
    ],
    [
      [0, 0], [-2, 0], [1, 0], [-2, 1], [1, -2], 
    ],
    [
      [0, 0], 
    ],
    [
      [0, 0], [-1, 0], [2, 0], [-1, -2], [2, 1], 
    ],
  ],
  [
    [
      [0, 0], [2, 0], [-1, 0], [2, -1], [-1, 2], 
    ],
    [
      [0, 0],
    ],
    [
      [0, 0], [-1, 0], [2, 0], [-1, -2], [2, 1], 
    ],
    [
      [0, 0], 
    ],
  ],
  [
    [
      [0, 0], 
    ],
    [
      [0, 0], [1, 0], [-2, 0], [1, 2], [-2, -1], 
    ],
    [
      [0, 0], 
    ],
    [
      [0, 0], [2, 0], [-1, 0], [2, -1], [-1, 2], 
    ],
  ],
  [
    [
      [0, 0], [1, 0], [-2, 0], [1, 2], [-2, -1], 
    ],
    [
      [0, 0], 
    ],
    [
      [0, 0], [-2, 0], [1, 0], [-2, 1], [1, -2], 
    ],
    [
      [0, 0], 
    ],
  ],
]

const SRS = {
  "Z": {
    "rotations": [
      [
        [1, 1, 0,],
        [0, 1, 1,],
        [0, 0, 0,],
      ],
      [
        [0, 0, 1,],
        [0, 1, 1,],
        [0, 1, 0,],
      ],
      [
        [0, 0, 0,],
        [1, 1, 0,],
        [0, 1, 1,],
      ],
      [
        [0, 1, 0,],
        [1, 1, 0,],
        [1, 0, 0,],
      ],
    ],
    "kicks": SRSKicks,
    "mino": 1,
  },
  "L": {
    "rotations": [
      [
        [0, 0, 1,],
        [1, 1, 1,],
        [0, 0, 0,],
      ],
      [
        [0, 1, 0,],
        [0, 1, 0,],
        [0, 1, 1,],
      ],
      [
        [0, 0, 0,],
        [1, 1, 1,],
        [1, 0, 0,],
      ],
      [
        [1, 1, 0,],
        [0, 1, 0,],
        [0, 1, 0,],
      ],
    ],
    "kicks": SRSKicks,
    "mino": 2,
  },
  "O": {
    "rotations": [
      [
        [1, 1],
        [1, 1],
      ],
      [
        [1, 1],
        [1, 1],
      ],
      [
        [1, 1],
        [1, 1],
      ],
      [
        [1, 1],
        [1, 1],
      ],
    ],
    "kicks": noKicks,
    "mino": 3,
  },
  "S": {
    "rotations": [
      [
        [0, 1, 1,],
        [1, 1, 0,],
        [0, 0, 0,],
      ],
      [
        [0, 1, 0,],
        [0, 1, 1,],
        [0, 0, 1,],
      ],
      [
        [0, 0, 0,],
        [0, 1, 1,],
        [1, 1, 0,],
      ],
      [
        [1, 0, 0,],
        [1, 1, 0,],
        [0, 1, 0,],
      ],
    ],
    "kicks": SRSKicks,
    "mino": 4,
  },
  "I": {
    "rotations": [
      [
        [0, 0, 0, 0,],
        [1, 1, 1, 1,],
        [0, 0, 0, 0,],
        [0, 0, 0, 0,],
      ],
      [
        [0, 0, 1, 0,],
        [0, 0, 1, 0,],
        [0, 0, 1, 0,],
        [0, 0, 1, 0,],
      ],
      [
        [0, 0, 0, 0,],
        [0, 0, 0, 0,],
        [1, 1, 1, 1,],
        [0, 0, 0, 0,],
      ],
      [
        [0, 1, 0, 0,],
        [0, 1, 0, 0,],
        [0, 1, 0, 0,],
        [0, 1, 0, 0,],
      ],
    ],
    "kicks": IKicks,
    "mino": 5,
  },
  "J": {
    "rotations": [
      [
        [1, 0, 0,],
        [1, 1, 1,],
        [0, 0, 0,],
      ],
      [
        [0, 1, 1,],
        [0, 1, 0,],
        [0, 1, 0,],
      ],
      [
        [0, 0, 0,],
        [1, 1, 1,],
        [0, 0, 1,],
      ],
      [
        [0, 1, 0,],
        [0, 1, 0,],
        [1, 1, 0,],
      ],
    ],
    "kicks": SRSKicks,
    "mino": 6,
  },
  "T": {
    "rotations": [
      [
        [-3,  1, -3,],
        [ 1,  1,  1,],
        [-1,  0, -1,],
      ],
      [
        [-3,  1, -2,],
        [ 0,  1,  1,],
        [-1,  1,  -1,],
      ],
      [
        [-2,  0, -2,],
        [ 1,  1,  1,],
        [-1,  1, -1,],
      ],
      [
        [-2,  1, -3,],
        [ 1,  1,  0,],
        [-1,  1, -1,],
      ],
    ],
    "kicks": SRSKicks, // SRSTKicks
    "mino": 7,
  },
};

var width = 9;
var height = 9;
var board = [];
var display = [];
var toRotation = 1;
var currentPiece = {
  "name": "T",
  "position": [3, 3],
  "rotation": 0,
};

const imageMap = ["minos/board.png", "minos/z.png", "minos/l.png", "minos/o.png", "minos/s.png", "minos/i.png", "minos/j.png", "minos/t.png", "minos/garbage.png", "minos/unclearable.png", "minos/movement.png", "minos/x.png"];

function initBoard(w, h) {
  const row = [];
  for (let i=0; i<w; i++) {
    row.push(0);
  }
  board = [];
  for (let i=0; i<h; i++) {
    board.push(structuredClone(row));
  }
  display = structuredClone(board);
}

function displayBoard() {
  const boardDiv = document.getElementById("board");
  for (j in board) {
    for (i in board[0]) {
      const node = document.createElement("img");
      node.setAttribute("src", imageMap[board[j][i]]);
      node.setAttribute("onclick", "getClick(" + j + ", " + i + ")");
      node.classList.add("boardImg");
      boardDiv.appendChild(node);
      display[j][i] = node;
    }
    boardDiv.appendChild(document.createElement("br"));
  }
}

function getClick(i, j) {
  console.log(i, j);
  board[i][j] = 8 - board[i][j];
  update();
}

function renderBoard() {
  for (j in board) {
    for (i in board[0]) {
      display[j][i].setAttribute("src", imageMap[board[j][i]]);
    }
  }
  
  renderPiece(currentPiece, SRS[currentPiece.name].mino);
}

function renderPiece(checkPiece, pieceMino) {
  const pieceData = SRS[checkPiece.name];
  const pieceMatrix = pieceData.rotations[checkPiece.rotation];
  for (let j in pieceMatrix) {
    j = Number(j);
    for (let i in pieceMatrix[0]) {
      i = Number(i);
      if (pieceMatrix[j][i] === 1) {
        const y = j + checkPiece.position[1]
        const x = i + checkPiece.position[0]
        var mino = display[y][x]
        const img = (board[y][x] !== 8) ? pieceMino : 11;
        mino.setAttribute("src", imageMap[img]);
      }
    }
  }
}

function validatePosition(checkPiece) {
  const pieceData = SRS[checkPiece.name];
  const pieceMatrix = pieceData.rotations[checkPiece.rotation];
  for (let j in pieceMatrix) {
    j = Number(j);
    for (let i in pieceMatrix[0]) {
      i = Number(i);
      if (pieceMatrix[j][i] === 1) {
        const y = j + checkPiece.position[1]
        const x = i + checkPiece.position[0]
        if (board[y][x] === 8) {
          return false;
        }
      }
    }
  }
  return true;
}

function tryKicks() {
  const pieceData = SRS[currentPiece.name];
  const kickData = pieceData.kicks[currentPiece.rotation][toRotation]
  for (let currentKick = 0; currentKick < kickData.length; currentKick++) {
    const checkPiece = structuredClone(currentPiece);
    checkPiece.rotation = toRotation;
    checkPiece.position[0] += kickData[currentKick][0];
    checkPiece.position[1] += kickData[currentKick][1];
    if (validatePosition(checkPiece)) {
      return checkPiece;
    }
  }
  return false;
}

function updatePiece() {
  const newPiece = document.getElementById("piece");
  currentPiece.name = newPiece.value;
  update();
}

function update() {
  const kickNumber = document.getElementById("kick");
  if (kickNumber.value < -2) {
    kickNumber.value = -2;
  }
  const pieceKicks = SRS[currentPiece.name].kicks[currentPiece.rotation][toRotation];
  const maxKicks = pieceKicks.length
  if (kickNumber.value >= maxKicks) {
    kickNumber.value = maxKicks - 1;
  }
  renderBoard();
  if (kickNumber.value == -1) {
    k = tryKicks();
    if (k) {
      renderPiece(k, 10);
    }
  } else if (kickNumber.value > -1) {
    k = structuredClone(currentPiece);
    k.position[0] += pieceKicks[kickNumber.value][0];
    k.position[1] += pieceKicks[kickNumber.value][1];
    k.rotation = toRotation;
    renderPiece(k, 10);
  }
}

function main() {
  document.body.addEventListener('dragstart', event => {
    event.preventDefault();
  });

  document.body.addEventListener('drop', event => {
    event.preventDefault();
  });
  
  initBoard(width, height);
  displayBoard();
  update();
}

document.addEventListener("DOMContentLoaded", main);