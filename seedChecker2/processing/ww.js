// worker code

import { validateSeed } from "./7bag/validate.js";
import { validateSeedTotalMayhem } from "./totalMayhem/random.js";

function getOneInRange(start, end, data, validationFunction) {
  for (let i = start; i < end; i++) {
    if (validationFunction(i, data)) return i;
  }
  return false;
}

onmessage = function (e) {
  const eventData = e.data;
  console.log("Worker started with data:", eventData);
  
  const randomizers = {
    "7bag": validateSeed,
    "totalMayhem": validateSeedTotalMayhem,
  };
  
  const validationFunction = randomizers[eventData.randomizer];
  
  if (eventData.type === "getOneInRange") {
    // try to find a valid seed in the specified range
    const { start, end, data } = eventData;
    const result = getOneInRange(start, end, data, validationFunction);
    postMessage({ type: "result", result });
  }
};