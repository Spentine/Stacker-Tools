function convertNumberToByteArray(number) {
  // ieee754 64-bit double precision
  const buffer = new ArrayBuffer(8);
  const view = new DataView(buffer);
  view.setFloat64(0, number);
  return new Uint8Array(buffer);
}

function convertByteArrayToNumber(byteArray) {
  const buffer = byteArray.buffer.slice(byteArray.byteOffset, byteArray.byteOffset + byteArray.byteLength);
  const view = new DataView(buffer);
  return view.getFloat64(0);
}

function convertStringToByteArray(str) {
  const encoder = new TextEncoder();
  return encoder.encode(str);
}

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
  
  console.log("Pieces:", pieces);
  
  let queueBigInt = 0n;
  for (const piece of pieces) {
    queueBigInt = (queueBigInt << 3n) | BigInt(piece);
  }
  
  // pad remainder bits
  const paddedQueue = queueBigInt << BigInt(remainder);
  
  console.log("Padded queue:", paddedQueue.toString(2).padStart(byteLength * 8, "0"));
  
  // convert to byte array
  const byteArray = new Uint8Array(byteLength);
  let bitMask = 0xFFn << (( // bitmask for the first byte
    BigInt(byteLength) - 1n
  ) * 8n); // shifting by bytes
  let shiftAmount = BigInt((byteLength - 1) * 8);
  for (let index = 0; index < byteLength; index++) {
    const byte = Number((paddedQueue & bitMask) >> shiftAmount);
    byteArray[index] = byte;
    console.log(`Byte ${index}:`, byte.toString(2).padStart(8, "0"));
    
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
  console.log("Queue BigInt:", queueBigInt.toString(2));
  
  const totalBits = byteArray.length * 8 + 3;
  let bitMask = 0b111n << BigInt(totalBits - 3); // mask for the first piece
  let shiftAmount = BigInt(totalBits - 3);
  const pieces = [];
  while (pieces[pieces.length - 1] !== 0b000n) { // until we reach the end marker
    pieces.push((queueBigInt & bitMask) >> shiftAmount);
    bitMask >>= 3n;
    shiftAmount -= 3n;
  }
  
  console.log("Pieces:", pieces);
  
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

function convertConfig(config) {
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
  
  // floats
  const minimumSeed = convertNumberToByteArray(config.minSeed);
  const maximumSeed = convertNumberToByteArray(config.maxSeed);
  const threads = convertNumberToByteArray(config.threads);
  const maximumSeedAmount = convertNumberToByteArray(config.maxSeedAmount);
  
  // queue
  const pieceSequence = convertQueueToByteArray(config.pieceSequence);
  
  // combine all
  const byteArray = new Uint8Array(
    25 + // 1 byte + minSeed, maxSeed, threads
    (searchType === "all" ? 8 : 0) + // maximumSeedAmount if searchType is "all"
    pieceSequence.length // length of pieceSequence
  );
  byteArray[0] = byte;
  byteArray.set(minimumSeed, 1);
  byteArray.set(maximumSeed, 9);
  byteArray.set(threads, 17);
  if (searchType === "all") {
    byteArray.set(maximumSeedAmount, 25);
    byteArray.set(pieceSequence, 33);
  } else {
    byteArray.set(pieceSequence, 25);
  }
  
  return byteArray;
}

export { convertConfig };