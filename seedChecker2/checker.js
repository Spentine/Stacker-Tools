import { lcg } from './processing/lcg.js';

// 7-bag
import { generateBags } from './processing/7bag/fy.js';
import { generateQueueData } from './processing/7bag/data.js';
import { createWorkers, workerCount, findOne } from './processing/wwHandler.js';

// total mayhem
import { nextPieces, generateDataTotalMayhem } from './processing/totalMayhem/random.js';

async function search(data) {
  const { queue, randomizer, minSeed, maxSeed } = data;
  
  const startTime = Date.now(); // time start
  console.log("Validating seed:", queue);
  
  let seed;
  let pieceGeneration;
  let queueData;
  
  if (randomizer === "7bag") {
    queueData = generateQueueData(queue);
    pieceGeneration = (seed) => generateBags(4, seed);
  } else if (randomizer === "totalMayhem") {
    queueData = generateDataTotalMayhem(queue);
    pieceGeneration = (seed) => nextPieces(28, seed);
  }
  
  if (!queueData) {
    console.log("Invalid queue data.");
    return;
  }
  
  const generationData = {};
  
  generationData.randomizer = randomizer; // add randomizer type to data
  generationData.minSeed = minSeed || 1; // default to 1 if not provided
  generationData.maxSeed = maxSeed || 2147483646; // default to max seed if not provided
  generationData.data = queueData;
  
  const workers = createWorkers();
  seed = await findOne(workers, generationData);
  
  if (seed === false) {
    console.log("No seed found.");
  } else {
    console.log("Found seed:", seed);
    console.log("Seed queue:", pieceGeneration(seed));
  }
  
  const timeElapsed = Date.now() - startTime; // time elapsed
  console.log("Time elapsed:", timeElapsed, "ms");
  
  return seed;
}

export {
  search,
};