import { search } from "./checker.js";
import { formatQueue } from "./util.js";

async function main() {
  console.log("Script loaded.");
  
  const pieceSequenceElement = document.getElementById("piece-sequence");
  const randomizerType = document.getElementById("randomizer-type");
  const startElement = document.getElementById("start-button");
  const outputElement = document.getElementById("output");
  
  function formatDisplayQueue() {
    const formattedQueue = formatQueue(
      pieceSequenceElement.value,
      randomizerType.value
    );
    pieceSequenceElement.value = formattedQueue;
  }
  
  pieceSequenceElement.addEventListener("input", formatDisplayQueue);
  randomizerType.addEventListener("change", formatDisplayQueue);

  startElement.addEventListener("click", async () => {
    const queue = pieceSequenceElement.value;
    console.log("Starting with queue:", queue);

    const seed = await search({
      queue,
      type: randomizerType.value,
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