import { search } from "./checker.js";
import { formatQueue } from "./util.js";

async function main() {
  console.log("Script loaded.");
  
  const pieceSequenceElement = document.getElementById("piece-sequence");
  const startElement = document.getElementById("start-button");
  const outputElement = document.getElementById("output");
  
  pieceSequenceElement.addEventListener("input", () => {
    const formattedQueue = formatQueue(pieceSequenceElement.value);
    pieceSequenceElement.value = formattedQueue;
  });

  startElement.addEventListener("click", async () => {
    const queue = pieceSequenceElement.value;
    console.log("Starting with queue:", queue);

    const seed = await search({ queue, type: "7bag" });
    
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