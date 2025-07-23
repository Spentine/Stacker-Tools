import { lcg } from './processing/lcg.js';

// 7-bag
import { generateBags } from './processing/7bag/fy.js';
import { generateQueueData } from './processing/7bag/data.js';
import { createWorkers, workerCount, findOne } from './processing/wwHandler.js';

// total mayhem
import { nextPieces, generateData } from './processing/totalMayhem/random.js';

async function search(data) {
  const { queue, type } = data;
  
  const startTime = Date.now(); // time start
  console.log("Validating seed:", queue);
  
  let seed;
  
  if (type === "7bag") {
    
    const data = generateQueueData(queue);
    console.log(data);
    
    if (!data) {
      console.log("Invalid queue data.");
      return;
    }
    
    const workers = createWorkers();
    seed = await findOne(workers, data);
    
    if (seed === false) {
      console.log("No seed found.");
    } else {
      console.log("Found seed:", seed);
      console.log("Seed queue:", generateBags(4, seed));
    }
    
  } else if (type === "totalMayhem") {
    
    const data = generateData(queue);
    console.log(data);
    
    if (!data) {
      console.log("Invalid queue data.");
      return;
    }
    
    const workers = createWorkers("./totalMayhem/ww.js");
    seed = await findOne(workers, data);
    
    if (seed === false) {
      console.log("No seed found.");
    } else {
      console.log("Found seed:", seed);
      console.log("Next pieces:", nextPieces(28, seed));
    }
    
  }

  const timeElapsed = Date.now() - startTime; // time elapsed
  console.log("Time elapsed:", timeElapsed, "ms");
  
  return seed;
}

export {
  search,
};