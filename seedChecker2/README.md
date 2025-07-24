# SeedChecker V2

A program to brute force seeds in the game **[TETR.IO](https://tetr.io)**.

The successor to *[Seed Checker V1](https://spentine.github.io/Stacker-Tools/seedChecker/)*. This new program uses more advanced algorithms to quickly brute force game seeds. Rather than shuffling queues, it instead only operates on numbers and more efficiently compares it to cached lists. To further multiply the speed, multithreading is implemented to make use of all logical processors on the machine, allowing for faster and more efficient seed checking on a web application.

## About Block Stacking Games

Before using this program, it's important to know the terminology and meaning behind its purpose. A *piece* is a tetromino, and there are 7 distinct variations (`ZLOSIJT`). A *randomizer* is the method in which the pieces are randomized. A *seed* is a number that will always result in the same piece queue. To test out the seeds found with this application, go to [TETR.IO](https://tetr.io), press singleplayer, custom room, turn off seed randomization, and enter the seed.

### About 7-Bag

7-Bag is a simple randomization system that guarantees the next queue is populated with a roughly even distribution of pieces. It is the standard piece generation system used in Block Stacker games, including TETR.IO.

To generate one '*bag*', take the 7 pieces `ZLOSIJT` and shuffle them. Once they are shuffled, they are appended to the next queue. The next 7 pieces follow the same logic; shuffle and append. This continues indefinitely.

> **Note**
> *A bag is invalid if it contains two duplicate pieces, just like how it is impossible to have two of the same cards in a deck after shuffling it amongst itself. The program will display a message if this occurs so that it's easier to spot the issue.*

## Functions and Use Cases

This program was primarily intended to make it easier to search for seeds on *TETR.IO*, a game of the *Block Stacking* genre. It will attempt to find *integer* seeds that will satisfy a particular number of starting pieces. It supports two different TETR.IO randomizers, **7-bag** and **Total Mayhem**. It can be configured to provide a specific number of seeds along with the range in which the seed must be. It also supports viewing the pieces of a particular seed, which may be tangentially useful.

## How to Use

The program has two modes; **Retrieve Seed Information** and **Find Seed**. The modes perform different but related operations. Press the **Start** button once the configuration has been set. The output will be displayed in the bottommost container.

### Find Seed

The program will try to find a seed in this mode.

- **Randomizer Type**: The randomizer algorithm that is used. Default is **7-Bag** because it is standard.
- **Piece Sequence**: The sequence of pieces. Only accepts the characters `ZLOSIJT`.
- **Minimum Seed**: The minimum value of a seed.
- **Maximum Seed**: The maximum value of a seed.
- **Search Type**: Determines how the program will handle the searched seeds.
  - **Search for One**: The program will stop searching once it finds one valid seed.
  - **Return All**: The program will search for a number of seeds before it stops, or if there are no more seeds to exhaust.
- **Maximum Seed Amount**: If the *search type* is set to *search for all*, then it will specify the number of seeds to search for.

### Retrieve Seed Information

The program will provide information about a seed.

- **Randomizer Type**: The randomizer algorithm that is used. Default is **7-Bag** because it is standard.
- **Seed**: The seed that will be provided information about.