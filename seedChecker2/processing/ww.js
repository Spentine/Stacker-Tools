// worker code

import { validateSeed } from "./7bag/validate.js";
import { validateSeedTotalMayhem } from "./totalMayhem/random.js";

function getOneInRange(start, end, data, validationFunction) {
  for (let i = start; i < end; i++) {
    if (validationFunction(i, data)) return i;
  }
  return false;
}

function getAllInRange(start, end, data, validationFunction, minimumSeedAmount) {
  const result = [];
  for (let i = start; i < end; i++) {
    if (validationFunction(i, data)) {
      result.push(i)
      postMessage({ type: "result", result: i })
    }
  }
  return result;
}

onmessage = function (e) {
  const eventData = e.data;
  console.log("Worker started with data:", eventData);
  
  const randomizers = {
    "7bag": validateSeed,
    "totalMayhem": validateSeedTotalMayhem,
  };
  
  const validationFunction = randomizers[eventData.randomizer];
  
  if (eventData.type === "one") {
    // try to find a valid seed in the specified range
    const { start, end, data } = eventData;
    const result = getOneInRange(start, end, data, validationFunction);
    
    // returns seed
    postMessage({ type: "result", result });
  } else if (eventData.type === "all") {
    // try to find all valid seeds in the specified range
    const { start, end, data, minimumSeedAmount } = eventData;
    const result = getAllInRange(start, end, data, validationFunction, minimumSeedAmount);
    
    postMessage({ type: "completed" });
  }
};