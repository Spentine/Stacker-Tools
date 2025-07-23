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
 * @returns {Object} - An object containing the shuffled numbers and the updated seed.
 */
const shuffleNum = (l, seed) => {
  const nums = new Array(l - 1);
  for (let i = l - 1; i > 0; i--) {
    seed = lcg(seed);
    const j = Math.floor(toFloat(seed) * (i + 1));
    nums[i - 1] = j;
  }
  return {
    nums: nums,
    seed: seed,
  };
};

/**
 * converts an array of numbers to a single number
 * @param {Array} nums - The array of numbers to convert.
 * @returns {number} - The converted number.
 */
const convertNums = (nums) => {
  return (
    nums[0] +
    nums[1] * 2 +
    nums[2] * 6 +
    nums[3] * 24 +
    nums[4] * 120 +
    nums[5] * 720
  );
};

/**
 * shuffles an array from a set of numbers
 * @param {Array} array - The array to shuffle.
 * @param {Array} nums - The numbers to use for shuffling.
 * @returns {Array} - The shuffled array.
 */
const shuffleFromNums = (array, nums) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = nums[i - 1];
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

/**
 * compares shuffled numbers
 * @param {Array} nums - The shuffled numbers to compare.
 * @param {number} seed - The seed for the random number generator.
 * @return {boolean|number} - Returns true if the comparison is successful, otherwise returns the updated seed.
 */
const shuffleCompare = (nums, seed) => {
  // the length of nums is one less than the length of pieces
  for (let i = nums.length; i > 0; i--) {
    seed = lcg(seed);
    const n = Math.floor(toFloat(seed) * (i + 1));
    if (nums[i - 1] !== n) return false;
  }
  return seed;
};

/**
 * generates a map from piece queue to nums
 * @returns {Object} - An object mapping piece queues to their numeric representations.
 */
const generateBag2Num = () => {
  const generateAllNumsArrays = (n) => {
    if (n === 1) return [[]];
    const result = [];
    const subArrays = generateAllNumsArrays(n - 1);
    for (let i = 0; i < n; i++) {
      for (const subArray of subArrays) {
        const newArray = subArray.concat([i]);
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

const bag2num = generateBag2Num();

const generateBagTrie = (bag2num) => {
  const trie = {};
  for (const bag in bag2num) {
    let current = trie;
    for (let i = 0; i < bag.length - 1; i++) {
      const char = bag[i];
      if (!current[char]) {
        current[char] = {};
      }
      current = current[char];
    }
    current[bag[bag.length - 1]] = bag2num[bag];
  }
  return trie;
};

const getBagCompletions = (bag, trie) => {
  const completions = [];

  let current = trie;
  for (const char of bag) {
    current = current[char];
  }
  
  const getCompletions = (i, trie) => {
    if (i === 7) {
      completions.push(convertNums(trie));
    } else {
      for (const char in trie) {
        getCompletions(i + 1, trie[char]);
      }
    }
  };

  getCompletions(bag.length, current);
  return completions;
};

const bagTrie = generateBagTrie(bag2num);

export {
  pieces,
  shuffle,
  shuffleNum,
  shuffleCompare,
  convertNums,
  shuffleFromNums,
  bag2num,
  bagTrie,
  getBagCompletions
};