package seedChecker;

import java.util.ArrayList;
import java.util.HashMap;

public class seedChecker {
  public static void main(String[] args) {
    // seed to check
    int seed;
    
    // if seedsToCheck = 0, try to find one valid seed
    // if seedsToCheck > 0, check that many seeds
    int seedsToCheck = 0;
    
    if (args.length != 1) {
      seed = 1;
    } else {
      seed = Integer.parseInt(args[0]);
    }
    
    long startTime = System.currentTimeMillis();
    
    byte[][] bags = SeedCheckerClass.splitIntoBags("ZLOSIJTZLOSIJTZL");
    
    if (seedsToCheck == 0) {
      // find one valid seed
    
      RNG rng = new RNG(1);
      for (int i=0; i < 2147483646; i++) {
        rng.seed = (seed + i) % 2147483647;
        boolean isValid = SeedCheckerClass.verifyBags(bags, rng);
        
        if (isValid) {
          System.out.println("Found valid seed: " + (seed + i));
          
          rng.seed = (seed + i) % 2147483647;
          byte[][] nextBags = rng.nextBags(4);
          System.out.println("Next bags:");
          System.out.println(SeedCheckerClass.printBags(nextBags));
          
          break;
        }
      }
    }
    
    long endTime = System.currentTimeMillis();
    System.out.println("Time taken: " + (endTime - startTime) + " ms");
  }
}

class SeedCheckerClass {
  // map "ZLOSIJT" to "1234567"
  private static final HashMap<Character, Byte> charMap = new HashMap<>() {{
    put('Z', (byte) 1);
    put('L', (byte) 2);
    put('O', (byte) 3);
    put('S', (byte) 4);
    put('I', (byte) 5);
    put('J', (byte) 6);
    put('T', (byte) 7);
  }};
  
  /**
   * one bag = 7 pieces
   * split input string into bags of 7 pieces each
   * convert characters to bytes using the charMap
   * example input: "ZLOSIJT TJISOLZ" --> ["1234567", "7654321"]
   */
  public static byte[][] splitIntoBags(String input) {
    // convert input to a queue of bytes (pieces)
    ArrayList<Byte> queue = new ArrayList<Byte>();
    for (char c : input.toCharArray()) {
      final byte value = charMap.getOrDefault(c, (byte) 0);
      if (value != 0) {
        queue.add(value);
      }
    }
    final int pieces = queue.size();
    byte[][] bags = new byte[(pieces + 6) / 7][7];
    for (int i = 0; i < pieces; i++) {
      int bagIndex = i / 7;
      int pieceIndex = i % 7;
      bags[bagIndex][pieceIndex] = queue.get(i);
    }
    
    // bags already filled with 0s, so no need to fill them
    
    return bags;
  }
  
  public static boolean verifyBags(byte[][] bags, RNG rng) {
    for (byte[] bag : bags) {
      if (!rng.nextBagVerify(bag)) {
        return false; // verification failed
      }
    }
    return true; // all bags verified successfully
  }
  
  /**
   * print the bags in a readable format
   */
  public static String printBags(byte[][] bags) {
    StringBuilder sb = new StringBuilder();
    for (byte[] bag : bags) {
      sb.append("[");
      for (int i = 0; i < bag.length; i++) {
        sb.append(bag[i]);
        if (i < bag.length - 1) {
          sb.append(", ");
        }
      }
      sb.append("]\n");
    }
    return sb.toString();
  }
}

class RNG {
  public long seed;
  private final byte[] sevenBag = {1, 2, 3, 4, 5, 6, 7};
  
  public RNG(long seed) {
    this.seed = seed % 2147483647;
  }
  
  private long nextInt() {
    return this.seed = (16807 * this.seed) % 2147483647;
  }
  
  public double nextFloat() {
    return (double) (this.nextInt() - 1) / 2147483646.0f;
  }
  
  private byte[] shuffleArray(byte[] array) {
    for (int i = array.length - 1; i > 0; i--) {
      double v = this.nextFloat();
      byte j = (byte) (v * (i + 1));
      // swap array[i] and array[j]
      final byte temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    
    return array;
  }
  
  private boolean shuffleArrayVerify(byte[] array, final byte[] bag) {
    for (int i = array.length - 1; i > 0; i--) {
      double v = this.nextFloat();
      byte j = (byte) (v * (i + 1));
      // swap array[i] and array[j]
      final byte temp = array[i];
      array[i] = array[j];
      array[j] = temp;
      
      if ((array[i] != bag[i]) && (bag[i] != 0)) {
        return false; // verification failed
      }
    }
    
    if (array[0] != bag[0]) {
      return false; // verification failed
    }
    
    return true; // verification passed
  }
  
  public byte[] nextBag() {
    final byte[] shuffledBag = this.shuffleArray(sevenBag.clone());
    return shuffledBag;
  }
  
  public boolean nextBagVerify(byte[] bag) {
    final boolean verify = this.shuffleArrayVerify(sevenBag.clone(), bag);
    return verify;
  }
  
  public byte[][] nextBags(int count) {
    byte[][] bags = new byte[count][7];
    for (int i = 0; i < count; i++) {
      bags[i] = this.nextBag();
    }
    return bags;
  }
}