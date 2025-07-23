import { lcg } from './processing/lcg.js';
import { shuffle, shuffleNum } from './processing/fy.js';
import { generateQueueData } from './processing/data.js';
import { createWorkers, workerCount, findOne } from './processing/wwHandler.js';
import { validateSeed } from './processing/validate.js';

function main() {
  console.log("Script loaded.");
  
  const queue = "ZLOSIJTZLOJITSZ";
  
  const startTime = Date.now(); // time start
  console.log("Validating seed:", queue);
  
  const data = generateQueueData(queue);
  console.log(data);
  
  const workers = createWorkers();
  const one = findOne(workers, data);
  one.then((seed) => {
    console.log("Found seed:", seed);
    
    const timeElapsed = Date.now() - startTime; // time elapsed
    console.log("Time elapsed:", timeElapsed, "ms");
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", main);
} else {
  main();
}