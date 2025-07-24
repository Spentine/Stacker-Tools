import { generateBags } from './processing/7bag/fy.js';
import { nextPieces } from './processing/totalMayhem/random.js';

function getSeedInfo(data) {
  const { seed, randomizer } = data;
  
  let pieces;
  
  if (randomizer === "7bag") {
    const result = generateBags(500, seed);
    const bags = result.bags;
    const newSeed = result.seed;
    
    // join each piece in bag
    pieces = bags.map(
      bag => bag.join("")
    );
    
    // join each bag
    pieces = pieces.join(" ");
  } else if (randomizer === "totalMayhem") {
    pieces = nextPieces(5000, seed);
    
    // join each piece
    pieces = pieces.join("");
  }
  
  return {
    pieces,
  };
}

export { getSeedInfo };