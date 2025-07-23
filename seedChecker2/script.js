import { search } from "./checker.js";
import { formatQueue } from "./util.js";

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
  
  // retrieve-menu
  const retrieveMenu = document.getElementById("retrieve-menu");
  const seedInput = document.getElementById("seed-input");
  
  // start button
  const startElement = document.getElementById("start-button");
  
  // output element
  const outputElement = document.getElementById("output");
  
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

  startElement.addEventListener("click", async () => {
    const queue = pieceSequenceElement.value;
    console.log("Starting with queue:", queue);

    const seed = await search({
      queue,
      randomizer: randomizerType.value,
      minSeed: Number(minSeed.value),
      maxSeed: Number(maxSeed.value),
    });

    if (seed === false) {
      outputElement.textContent = "No seed found.";
    } else {
      outputElement.textContent = seed;
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", main);
} else {
  main();
}