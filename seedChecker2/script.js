import { search } from "./checker.js";
import { formatQueue } from "./util.js";
import { getSeedInfo } from "./seedInfo.js";
import { bound } from "./processing/lcg.js";
import { getWorkerCount, setWorkerCount } from "./processing/wwHandler.js";

async function main() {
  console.log("Script loaded.");
  
  // mode select
  const modeSelect = document.getElementById("mode-select");
  
  // find-menu
  const findMenu = document.getElementById("find-menu");
  const pieceSequenceElement = document.getElementById("piece-sequence");
  const randomizerType = document.getElementById("randomizer-type");
  const minSeed = document.getElementById("min-seed");
  const maxSeed = document.getElementById("max-seed");
  
  const searchType = document.getElementById("search-type");
  const maximumSeedAmountContainer = document.getElementById("maximum-seed-amount-container");
  const maximumSeedAmount = document.getElementById("maximum-seed-amount");
  
  const threads = document.getElementById("threads");
  
  // retrieve-menu
  const retrieveMenu = document.getElementById("retrieve-menu");
  const seedInput = document.getElementById("seed-input");
  
  // start button
  const startElement = document.getElementById("start-button");
  
  // output element
  const outputElement = document.getElementById("output");
  
  // url query parameters to save state
  const urlParams = new URLSearchParams(window.location.search);
  
  function setMenu(menu) {
    if (menu === "find") {
      findMenu.style.display = "block";
      retrieveMenu.style.display = "none";
    } else if (menu === "retrieve") {
      findMenu.style.display = "none";
      retrieveMenu.style.display = "block";
    }
  }
  
  // menu toggle
  modeSelect.addEventListener("change", () => {
    setMenu(modeSelect.value);
  });
  
  setMenu(modeSelect.value);
  
  // find-menu interactivity
  function formatDisplayQueue() {
    const formattedQueue = formatQueue(
      pieceSequenceElement.value,
      randomizerType.value
    );
    pieceSequenceElement.value = formattedQueue;
  }
  
  pieceSequenceElement.addEventListener("change", formatDisplayQueue);
  randomizerType.addEventListener("change", formatDisplayQueue);
  
  maximumSeedAmountContainer.style.display = "none";
  searchType.addEventListener("change", () => {
    if (searchType.value === "all") {
      maximumSeedAmountContainer.style.display = "block";
    } else {
      maximumSeedAmountContainer.style.display = "none";
    }
  });
  
  // threads
  threads.value = getWorkerCount();
  threads.addEventListener("change", () => {
    const newWorkerCount = Math.max(1, Math.min(Number(threads.value), 64));
    setWorkerCount(newWorkerCount);
    threads.value = newWorkerCount;
    console.log(`Worker count set to ${newWorkerCount}`);
  });
  
  // retrieve-menu interactivity (none)
  
  // start
  let started = false;
  startElement.addEventListener("click", async () => {
    if (started) {
      console.log("Already started.");
      return;
    }
    
    started = true;
    outputElement.textContent = "Processing...";
    
    if (modeSelect.value === "find") {
      const queue = pieceSequenceElement.value;
      console.log("Starting with queue:", queue);
      
      const validResults = await search({
        queue,
        randomizer: randomizerType.value,
        minSeed: Number(minSeed.value),
        maxSeed: Number(maxSeed.value),
        searchType: searchType.value,
        maximumSeedAmount: Number(maximumSeedAmount.value),
      });
      
      if (!validResults.valid) {
        outputElement.textContent = validResults.reason;
        return;
      }
      
      const results = validResults.results;

      if (searchType.value === "one") {
        if (results === false) {
          outputElement.textContent = "No seed found.";
        } else {
          outputElement.textContent = results;
        }
      } else if (searchType.value === "all") {
        if (results.length === 0) {
          outputElement.textContent = "No seeds found.";
        } else {
          outputElement.textContent = results.join(" ");
        }
      }
    } else if (modeSelect.value === "retrieve") {
      const originalSeed = Number(seedInput.value);
      const seed = bound(seedInput.value);
      
      if (!seed) {
        outputElement.textContent = "Please enter a seed.";
        return;
      }
      
      const randomizer = randomizerType.value;
      const randomizerDisplayMap = {
        "7bag": "7-Bag",
        "totalMayhem": "Total Mayhem",
      }
      
      const data = { seed, randomizer };
      const info = getSeedInfo(data);
      
      const pieces = info.pieces;

      outputElement.textContent = (
        ((originalSeed === seed)
          ? `Seed: ${seed}\n`
          : `Equivalent Seed: ${seed}\n`
        )
        + ((0 < seed < 1/16807)
          ? `The seed is technically a valid seed, but it breaks the LCG and piece selection algorithm in TETR.IO, causing it to generate an invalid index, and ending the game prematurely.\n`
          : ``
        )
        + `Randomizer: ${randomizerDisplayMap[randomizer]}\n`
        + `Pieces: ${pieces}`
      );
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", main);
} else {
  main();
}