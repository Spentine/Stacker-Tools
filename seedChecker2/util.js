const pieces = ["Z", "L", "O", "S", "I", "J", "T"];

/**
 * convert queue input into valid queue
 * @param {string} queue - The input queue string.
 * @returns {string} - The formatted queue string.
 */
function formatQueue(queue) {
  queue = queue.toUpperCase();
  
  let formatted = "";
  let i = 0;
  for (const char of queue) {
    if (pieces.includes(char)) {
      if (i !== 0 && i % 7 === 0) {
        formatted += " "; // add space every 7 characters
      }
      formatted += char;
      i++;
    }
  }
  return formatted;
}

export {
  formatQueue,
};