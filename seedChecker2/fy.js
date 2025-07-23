import { lcg, toFloat } from "./lcg.js";

// fisher-yates shuffle

const pieces = ["Z", "L", "O", "S", "I", "J", "T"];

/**
 * shuffles an array in place using the Fisher-Yates algorithm
 * @param {Array} array - The array to shuffle.
 * @param {number} seed - The seed for the random number generator.
 * @returns {number} - The updated seed after shuffling.
 */
const shuffle = (array, seed) => {
  for (let i = array.length - 1; i > 0; i--) {
    seed = lcg(seed);
    const j = Math.floor(toFloat(seed) * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return seed;
};

/**
 * generates the numbers that are used for the shuffle
 * @param {number} l - The length of the array to shuffle.
 * @param {number} seed - The seed for the random number generator.
 */
const shuffleNum = (l, seed) => {
  const nums = new Array(l - 1);
  for (let i = l - 1; i > 0; i--) {
    seed = lcg(seed);
    const j = Math.floor(toFloat(seed) * (i + 1));
    nums[i - 1] = j;
  }
  return nums;
};

const shuffleFromNums = (array, nums) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = nums[i - 1];
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

/**
 * compares shuffled numbers
 */
const shuffleCompare = (nums, seed) => {
  for (let i = l - 1; i > 0; i--) {
    seed = lcg(seed);
    const n = Math.floor(toFloat(seed) * (i + 1));
    if (nums[i] !== n % l) return false;
  }
  return true;
};

/**
 * generates a map from piece queue to nums
 */
const generateBag2Num = () => {
  const generateAllNumsArrays = (n) => {
    // returns all possible arrays of numbers that satisfy:
    // 1. the first number ranges from 0 to n
    // 2. the second number ranges from 0 to n-1, ...
    // 3. there are only n-1 numbers in the array
    if (n === 1) return [[]];
    const result = [];
    const subArrays = generateAllNumsArrays(n - 1);
    for (let i = 0; i < n; i++) {
      for (const subArray of subArrays) {
        const newArray = [i].concat(subArray);
        result.push(newArray);
      }
    }
    return result;
  };
  const allNums = generateAllNumsArrays(pieces.length);
  const bag2num = {};
  for (const nums of allNums) {
    const bag = shuffleFromNums([...pieces], nums);
    const bagKey = bag.join("");
    bag2num[bagKey] = nums;
  }
  return bag2num;
};

console.log(shuffleFromNums([...pieces], [6, 5, 4, 3, 2, 0]));
console.log(shuffleFromNums([...pieces], [0, 5, 4, 3, 2, 1]));

const bag2num = generateBag2Num();
console.log(bag2num);

export { pieces, shuffle, shuffleNum, shuffleCompare };