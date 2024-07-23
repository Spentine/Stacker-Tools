class RNG {
  constructor(seed) {
    this.seed = seed % 2147483647;
    
    if (this.seed <= 0) {
      this.seed += 2147483646;
    }
  }
  
  next() {
    return this.seed = 16807 * this.seed % 2147483647;
  }
  
  nextFloat() {
    return (this.next() - 1) / 2147483646; // divide next number by number of possible numbers
  }
  
  shuffleArray(array) {
    if (array.length == 0) { // if there's nothing
      return array; // return it
    }
    
    for (let i=array.length - 1; i != 0; i--) {
      const r = Math.floor(this.nextFloat() * (i + 1)); // choose random piece ahead of current
      [array[i], array[r]] = [array[r], array[i]]; // swap current and that piece
    }
    
    return array;
  }
  
  shuffleArrayVerify(array, bag) {
    if (array.length == 0) { // if there's nothing
      return false; // return false
    }
    
    for (let i=array.length - 1; i != 0; i--) {
      const r = Math.floor(this.nextFloat() * (i + 1)); // choose random piece ahead of current
      [array[i], array[r]] = [array[r], array[i]]; // swap current and that piece
      
      if (array[i] !== bag[i] && !(bag[i] === undefined)) {
        return false;
      }
    }
    
    if (array[0] !== bag[0]) {
      return false;
    }
    
    return true;
  }
  
  nextBag() {
    return this.shuffleArray(["Z", "L", "O", "S", "I", "J", "T"]); // 7 bag
  }
  
  nextBagVerify(bag) {
    return this.shuffleArrayVerify(["Z", "L", "O", "S", "I", "J", "T"], bag);
  }
  
  nextBags(n) {
    const queue = [];
    for (let i=0; i<n; i++) {
      queue.push(...this.nextBag());
    }
    return queue;
  }
};

export { RNG };