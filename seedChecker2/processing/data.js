import {
  pieces,
  convertNums,
  bag2num,
  bagTrie,
  getBagCompletions
} from "./fy.js";

/**
 * splits a string into bags of pieces
 * ex. "ZLOSJITZLOS" -> ["ZLOSJIT", "ZLOS"]
 * @param {string} string - the string to split
 * @returns {Array} - an array of bags
 */
function splitIntoBags(string) {
  const bags = [];
  let bag = "";
  for (const char of string) {
    if (!pieces.includes(char)) continue;
    if (bag.length === 6) {
      bag += char;
      bags.push(bag);
      bag = "";
    } else {
      bag += char;
    }
  }
  if (bag.length > 0) {
    bags.push(bag);
  }
  return bags;
}

/**
 * generate bag data for performant checking
 * @returns {Object} - an object mapping bag strings to their numeric representations
 */
function bagData(bag) {
  const data = {
    full: null,
  };
  
  if (bag.length === 7) {
    data.full = true;
    data.fy = bag2num[bag]; // fisher-yates representation
    data.sN = convertNums(data.fy); // single number representation
  } else {
    data.full = false;
    data.nums = new Set(getBagCompletions(bag, bagTrie)); // all possible completions
  }
  return data;
}

/**
 * generate bag data for a string
 * @param {string} string - the string to generate data for
 * @returns {Object} - an object mapping bag strings to their numeric representations
 */

function generateQueueData(string) {
  const bags = splitIntoBags(string);
  const data = {
    bags: bags,
    nums: [],
  };
  for (const bag of bags) {
    data.nums.push(bagData(bag));
  }
  return data;
}

export { generateQueueData };