import { lcg } from './lcg.js';
import { shuffle, shuffleNum } from './fy.js';
import { generateQueueData } from './data.js';
import { createWorkers, workerCount, findOne } from './wwHandler.js';
import { validateSeed } from './validate.js';

function main() {
  console.log("Script loaded.");
  
  const data = generateQueueData("ZLOSIJT");
  console.log(data);
  
  const workers = createWorkers();
  const one = findOne(workers, data);
  one.then((seed) => {
    console.log("Found seed:", seed);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", main);
} else {
  main();
}