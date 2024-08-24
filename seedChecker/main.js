import { RNG } from "./rng.js";

function splitIntoBags(q) {
  const bags = [];
  const numberOfBags = Math.ceil(q.length / 7);
  
  for (let i=0; i<numberOfBags; i++) {
    bags.push(q.slice(i*7, i*7+7));
  }
  
  return bags;
}

function createInteractivity() {
  const outputElement = document.getElementById("outputElement");
  
  const seedAmountInput = document.getElementById("seedAmountInput");
  
  const firstPieceInput = document.getElementById("firstPieceInput");
  const firstPieceButton = document.getElementById("firstPieceButton");
  
  const bsSelect = document.getElementById("bagSystem");
  
  const firstPieceOneButton = document.getElementById("firstPieceOneButton");
  
  firstPieceButton.addEventListener("click", function () {
    const seedAmount = seedAmountInput.value;
    // const firstPieces = firstPieceInput.value.split("");
    const timeBefore = Date.now();
    console.log("Starting Search " + timeBefore);
    const verifiedSeeds = [];
    if (bsSelect.value == '7bag') {
      const firstPieces = splitIntoBags(firstPieceInput.value.split(""));
      if (firstPieces.length === 0) {
        return null;
      }
      const numberOfBags = firstPieces.length;
      for (let i=0; i<seedAmount; i++) {
        const rng = new RNG(i);
        
        if (firstPieces.every((bag) => rng.nextBagVerify(bag))) {
          verifiedSeeds.push(i);
          console.log(i);
          console.log((new RNG(i)).nextBags(numberOfBags + 1));
        }
        
      }
    } else if (bsSelect.value == 'tm') {
      for (let i=0; i<seedAmount; i++) {
        const rng = new RNG(i);
        const firstPieces = firstPieceInput.value;
        let fits = true;
        for (let j=0; j<firstPieces.length; j++) {
          if (["Z", "L", "O", "S", "I", "J", "T"][Math.floor(rng.nextFloat() * 7)] != firstPieces[j]) {
            fits = false;
            break;
          }
        }
        if (fits) {
          verifiedSeeds.push(i);
          console.log(i);
        }
      }
    }
    
    console.log(verifiedSeeds);
    
    console.log("Time Elapsed: " + (Date.now() - timeBefore) + "ms");
    
    outputElement.innerHTML = verifiedSeeds.join(" ");
  });
 
  firstPieceOneButton.addEventListener("click", function () {
    // const firstPieces = firstPieceInput.value.split("");
    const firstPieces = splitIntoBags(firstPieceInput.value.split(""));
    const timeBefore = Date.now();
    console.log("Starting Search " + timeBefore);
    
    if (firstPieces.length === 0) {
      return null;
    }
    
    const verifiedSeeds = [];
    if (bsSelect.value == '7bag') {
      const numberOfBags = firstPieces.length;

      for (let i = 0; i < 2147483647; i++) {
        const rng = new RNG(i);

        if (firstPieces.every((bag) => rng.nextBagVerify(bag))) {
          verifiedSeeds.push(i);
          console.log(i);
          console.log((new RNG(i)).nextBags(numberOfBags + 1));
          break;
        }
      }
    } else if (bsSelect.value == 'tm') {
      for (let i=0; i<2147483647; i++) {
        const rng = new RNG(i);
        const firstPieces = firstPieceInput.value;
        let fits = true;
        for (let j=0; j<firstPieces.length; j++) {
          if (["Z", "L", "O", "S", "I", "J", "T"][Math.floor(rng.nextFloat() * 7)] != firstPieces[j]) {
            fits = false;
            break;
          }
        }
        if (fits) {
          verifiedSeeds.push(i);
          console.log(i);
          break;
        }
      }
    }
    
    console.log(verifiedSeeds);
    
    console.log("Time Elapsed: " + (Date.now() - timeBefore) + "ms");
    
    outputElement.innerHTML = verifiedSeeds.join(" ");
  });
}

function main() {
  createInteractivity();
}

document.addEventListener("DOMContentLoaded", main);