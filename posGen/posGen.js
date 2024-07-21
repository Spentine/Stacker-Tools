import { SRS } from "./srs.js";

class Position {
  static isEqual(a, b) {
    return (a.x === b.x && a.y === b.y);
  }
  
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  
  clone() {
    return new Position(this.x, this.y);
  }
}

class PiecePos {
  static isEqual(a, b) {
    return (a.type === b.type && a.pos === b.pos && a.rotation === b.rotation);
  }
  
  constructor(type, pos, rotation) {
    this.type = type;
    this.pos = pos;
    this.rotation = rotation;
  }
  
  
}

function generateNeighboringNodes(board, piece) {
  
}

function generatePossiblePositions(board, piece) {
  const adjacencyMatrix = [];
  
}