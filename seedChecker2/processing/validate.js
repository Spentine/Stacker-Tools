import {
  shuffleNum,
  shuffleCompare,
  convertNums,
} from "./fy.js";

/**
 * check if a seed is valid for the data
 * @param {number} seed - the seed to check
 * @param {Object} data - the data to check against
 * @returns {boolean} - true if the seed is valid, false otherwise
 */
function validateSeed(seed, data) {
  for (const bagNums of data.nums) {
    if (bagNums.full) {
      // shuffleCompare will be set to a number if it is valid
      seed = shuffleCompare(bagNums.fy, seed);
      if (!seed) return false;
    } else {
      const seedSN = shuffleNum(7, seed);
      const n = seedSN.nums;
      seed = seedSN.seed;
      if (!bagNums.nums.has(convertNums(n))) {
        return false; // if the seed does not match any of the possible completions
      }
    }
  }
  return true; // if all bags are valid
}

export { validateSeed };