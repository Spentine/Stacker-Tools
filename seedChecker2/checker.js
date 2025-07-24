import { lcg } from './processing/lcg.js';

// 7-bag
import { generateBags } from './processing/7bag/fy.js';
import { generateQueueData } from './processing/7bag/data.js';
import { createWorkers, workerCount, searchWW } from './processing/wwHandler.js';

// total mayhem
import { nextPieces, generateDataTotalMayhem } from './processing/totalMayhem/random.js';

async function search(data) {
  const {
    queue,
    randomizer,
    minSeed,
    maxSeed,
    searchType,
    minimumSeedAmount,
  } = data;
  
  const startTime = Date.now(); // time start
  console.log("Validating seed:", queue);
  
  let results;
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
  generationData.searchType = searchType || "one"; // default to "one" if not provided
  generationData.minimumSeedAmount = minimumSeedAmount || 1000; // default to 1000 if not provided
  
  const workers = createWorkers();
  
  if (searchType === "one") {
    results = await searchWW(workers, generationData);
    
    if (results === false) {
      console.log("No seed found.");
    } else {
      console.log("Found seed:", results);
      console.log("Seed queue:", pieceGeneration(results));
    }
  } else if (searchType === "all") {
    results = await searchWW(workers, generationData);
    
    console.log("Found seeds:", results);
  }
  
  const timeElapsed = Date.now() - startTime; // time elapsed
  console.log("Time elapsed:", timeElapsed, "ms");
  
  return results;
}

export { search };