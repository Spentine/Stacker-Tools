// worker code

import {
  validateSeed
} from "./validate.js";

function getOneInRange(start, end, data) {
  for (let i = start; i < end; i++) {
    if (validateSeed(i, data)) return i;
  }
  return false;
}

onmessage = function (e) {
  const eventData = e.data;
  console.log("Worker started with data:", eventData);
  
  if (eventData.type === "getOneInRange") {
    // try to find a valid seed in the specified range
    const { start, end, data } = eventData;
    const result = getOneInRange(start, end, data);
    postMessage({ type: "result", result });
  }
};