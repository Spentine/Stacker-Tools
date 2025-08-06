// ai generated
function convertNumberToByteArray(number) {
  // ieee754 64-bit double precision
  const buffer = new ArrayBuffer(8);
  const view = new DataView(buffer);
  view.setFloat64(0, number);
  return new Uint8Array(buffer);
}

// ai generated
function convertByteArrayToNumber(byteArray) {
  const buffer = byteArray.buffer.slice(byteArray.byteOffset, byteArray.byteOffset + byteArray.byteLength);
  const view = new DataView(buffer);
  return view.getFloat64(0);
}

// ai generated
function convertLongToByteArray(long) {
  // 32 bit int
  const buffer = new ArrayBuffer(4);
  const view = new DataView(buffer);
  view.setInt32(0, long);
  return new Uint8Array(buffer);
}

// ai generated
function convertByteArrayToLong(byteArray) {
  const buffer = byteArray.buffer.slice(byteArray.byteOffset, byteArray.byteOffset + byteArray.byteLength);
  const view = new DataView(buffer);
  return view.getInt32(0);
}

// ai generated
function convertStringToByteArray(str) {
  const encoder = new TextEncoder();
  return encoder.encode(str);
}

// ai generated
function convertByteArrayToString(byteArray) {
  const decoder = new TextDecoder();
  return decoder.decode(byteArray);
}

/**
 * converts piece queue string to a byte array
 */
function convertQueueToByteArray(str) {
  const pieceMap = {
    /* end=0 */ "Z": 0b001, "L": 0b010, "O": 0b011,
    "S": 0b100, "I": 0b101, "J": 0b110, "T": 0b111,
  };
  
  const pieces = str
    .split("")
    .filter(piece => pieceMap[piece] !== undefined)
    .map(piece => pieceMap[piece]);
  
  const bits = (pieces.length) * 3;
  const byteLength = Math.ceil(bits / 8);
  
  // number of bits to be padded to make it a multiple of 8
  const remainder = (bits % 8 === 0) ? 0 : (8 - bits % 8);
  
  // console.log("Pieces:", pieces);
  
  let queueBigInt = 0n;
  for (const piece of pieces) {
    queueBigInt = (queueBigInt << 3n) | BigInt(piece);
  }
  
  // pad remainder bits
  const paddedQueue = queueBigInt << BigInt(remainder);
  
  // console.log("Padded queue:", paddedQueue.toString(2).padStart(byteLength * 8, "0"));
  
  // convert to byte array
  const byteArray = new Uint8Array(byteLength);
  let bitMask = 0xFFn << (( // bitmask for the first byte
    BigInt(byteLength) - 1n
  ) * 8n); // shifting by bytes
  let shiftAmount = BigInt((byteLength - 1) * 8);
  for (let index = 0; index < byteLength; index++) {
    const byte = Number((paddedQueue & bitMask) >> shiftAmount);
    byteArray[index] = byte;
    // console.log(`Byte ${index}:`, byte.toString(2).padStart(8, "0"));
    
    bitMask = bitMask >> 8n; // shift to next byte
    shiftAmount -= 8n; // decrease shift amount
  }
  
  return byteArray;
}

function convertByteArrayToQueue(byteArray) {
  let queueBigInt = 0n;
  for (const byte of byteArray) {
    queueBigInt = (queueBigInt << 8n) | BigInt(byte);
  }
  queueBigInt <<= 3n; // add 0b000 at the end as an end marker
  // console.log("Queue BigInt:", queueBigInt.toString(2));
  
  const totalBits = byteArray.length * 8 + 3;
  let bitMask = 0b111n << BigInt(totalBits - 3); // mask for the first piece
  let shiftAmount = BigInt(totalBits - 3);
  const pieces = [];
  while (pieces[pieces.length - 1] !== 0b000n) { // until we reach the end marker
    pieces.push((queueBigInt & bitMask) >> shiftAmount);
    bitMask >>= 3n;
    shiftAmount -= 3n;
  }
  
  // console.log("Pieces:", pieces);
  
  // remove last piece (end marker)
  pieces.pop();
  
  // convert pieces to string
  const pieceMap = {
    0b001: "Z", 0b010: "L", 0b011: "O",
    0b100: "S", 0b101: "I", 0b110: "J", 0b111: "T",
  };
  
  const piecesStr = pieces.map(piece => pieceMap[piece]).join("");
  
  return piecesStr;
}

function convertConfigTypeFind(config) {
  // byte 1
  /*
    [vvvvvvrs]
    - version takes up 6 bits (version=1 right now)
    - randomizer type takes up 1 bit
    - search type takes up 1 bit
  */
  const version = 1 & 0b111111; // 6 bits
  const randomizerType = (config.randomizerType === "7bag") ? 0 : 1; // 1 bit
  const searchType = (config.searchType === "one") ? 0 : 1; // 1 bit
  const byte = (version << 2) | (randomizerType << 1) | searchType;
  const byteArray1 = new Uint8Array(1);
  
  // int
  const threads = new Uint8Array(1);
  threads[0] = config.threads - 1; // 1-256, so store 0-255
  
  // longs
  const minimumSeed = convertLongToByteArray(config.minSeed);
  const maximumSeed = convertLongToByteArray(config.maxSeed);
  const maximumSeedAmount = convertLongToByteArray(config.maxSeedAmount);
  
  // queue
  const pieceSequence = convertQueueToByteArray(config.pieceSequence);
  
  // combine all
  const byteArray = new Uint8Array(
    1 + minimumSeed.length + maximumSeed.length + threads.length +
    (searchType === "all" ? maximumSeedAmount.length : 0) + // maximumSeedAmount if searchType is "all"
    pieceSequence.length // length of pieceSequence
  );
  byteArray[0] = byte;
  byteArray.set(minimumSeed, 1);
  byteArray.set(maximumSeed, 5);
  byteArray.set(threads, 9);
  if (searchType === "all") {
    byteArray.set(maximumSeedAmount, 10);
    byteArray.set(pieceSequence, 14);
  } else {
    byteArray.set(pieceSequence, 10);
  }
  
  return byteArray;
}

function decodeConfigTypeFind(byteArray) {
  const data = {};
  // byte 1
  const byte1 = byteArray[0];
  data.version = (byte1 >> 2) & 0b111111;
  data.randomizerType = (byte1 >> 1) & 0b1 ? "totalMayhem" : "7bag";
  data.searchType = byte1 & 0b1 ? "all" : "one";
  
  // other numbers
  data.minSeed = convertByteArrayToLong(byteArray.slice(1, 5));
  data.maxSeed = convertByteArrayToLong(byteArray.slice(5, 9));
  data.threads = byteArray[9] + 1; // 0-255, so add 1 to get 1-256
  
  let shiftAmount = 10;
  if (data.searchType === "all") {
    data.maxSeedAmount = convertByteArrayToLong(byteArray.slice(10, 14));
    shiftAmount += 4;
  }
  data.pieceSequence = convertByteArrayToQueue(byteArray.slice(shiftAmount));
  
  return data;
}

function getUrlConfigTypeFind(config) {
  const byteArray = convertConfigTypeFind(config);
  // convert to base64 string
  const base64String = btoa(String.fromCharCode(...byteArray));
  
  // replace special characters to make it URL safe
  let safe = base64String
    .replaceAll("+", "-") // replace + with -
    .replaceAll("/", "_") // replace / with _
    .replaceAll("=", ""); // remove padding
  
  // do some special replacements
  const replacements = {
    "AAAA": "~",
    "____": ".",
  };
  for (const [key, value] of Object.entries(replacements)) {
    safe = safe.replaceAll(key, value);
  }
  
  return safe;
}

function decodeUrlConfigTypeFind(encoded) {
  // reverse the replacements
  const replacements = {
    "~": "AAAA",
    ".": "____",
  };
  for (const [key, value] of Object.entries(replacements)) {
    encoded = encoded.replaceAll(key, value);
  }
  
  // convert back to base64
  const base64String = encoded
    .replaceAll("-", "+") // replace - with +
    .replaceAll("_", "/"); // replace _ with /
  
  // decode base64 to byte array
  const byteArray = new Uint8Array([...atob(base64String)].map(char => char.charCodeAt(0)));
  
  return decodeConfigTypeFind(byteArray);
}

function getUrlConfig(config) {
  return getUrlConfigTypeFind(config);
}

function decodeUrlConfig(encoded) {
  return decodeUrlConfigTypeFind(encoded);
}

export { getUrlConfig, decodeUrlConfig };