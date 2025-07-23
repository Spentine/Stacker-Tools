import { lcg } from './lcg.js';
import { shuffle, shuffleNum } from './fy.js';

function main() {
  console.log("Script loaded.");
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", main);
} else {
  main();
}