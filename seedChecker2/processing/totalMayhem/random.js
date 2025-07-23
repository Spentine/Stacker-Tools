import {
  lcg,
  toFloat
} from '../lcg.js';

const pieces = ["Z", "L", "O", "S", "I", "J", "T"];

const nextPiece = (seed) => {
  seed = lcg(seed);
  return {
    seed: seed,
    piece: pieces[Math.floor(toFloat(seed) * pieces.length)]
  };
};

const nextPieces = (n, seed) => {
  const result = [];
  for (let i = 0; i < n; i++) {
    const next = nextPiece(seed);
    result.push(next.piece);
    seed = next.seed;
  }
  return result;
};

const getPieces = (string) => {
  let result = [];
  for (const char of string) {
    if (pieces.includes(char)) {
      result.push(char);
    }
  }
  return result;
};

const replaceWithNumbers = (queue) => {
  const numbers = [];
  for (const piece of queue) {
    const index = pieces.indexOf(piece);
    if (index !== -1) {
      numbers.push(index);
    }
  }
  return numbers;
};

const generateData = (string) => {
  const pieces = getPieces(string);
  const numbers = replaceWithNumbers(pieces);
  return {
    pieces: pieces,
    numbers: numbers
  };
}

const validateSeed = (seed, data) => {
  const numbers = data.numbers;
  for (const number of numbers) {
    seed = lcg(seed);
    if (number !== Math.floor(toFloat(seed) * pieces.length)) return false;
  }
  return true;
};

export {
  nextPiece,
  nextPieces,
  generateData,
  validateSeed
};