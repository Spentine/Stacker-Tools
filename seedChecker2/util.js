const pieces = ["Z", "L", "O", "S", "I", "J", "T"];

/**
 * convert queue input into valid queue
 * @param {string} queue - The input queue string.
 * @returns {string} - The formatted queue string.
 */
function formatQueue(queue, type="7bag") {
  let formatted = "";
  
  // convert to uppercase and filter out invalid characters
  queue = queue.toUpperCase();
  let pieceQueue = "";
  for (const char of queue) {
    if (pieces.includes(char)) {
      pieceQueue += char;
    }
  }
  
  if (type === "7bag") {
    // add space every 7 characters
    for (let i = 0; i < pieceQueue.length; i++) {
      if (i !== 0 && i % 7 === 0) {
        formatted += " ";
      }
      formatted += pieceQueue[i];
    }
  } else if (type === "totalMayhem") {
    formatted = pieceQueue;
  }
  
  return formatted;
}

export {
  formatQueue,
};