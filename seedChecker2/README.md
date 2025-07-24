# SeedChecker V2

A program to brute force seeds in the game **TETR.IO**.

The successor to *Seed Checker V1*. This new program uses more advanced algorithms to quickly brute force game seeds. Rather than shuffling queues, it instead only operates on numbers and more efficiently compares it to caching lists. To further multiply the speed, multithreading is implemented to make use of all logical processors on the machine, allowing for faster and more efficient seed checking on a web application.

## About Block Stacking Games

Before using this program, it's important to know the terminology and meaning behind its purpose. A *piece* is a tetromino, and there are 7 distinct variations (`ZLOSIJT`). A *randomizer* is the method in which the pieces are randomized. A *seed* is a number that will always result in the same piece queue.

## Functions and Use Cases

This program was primarily intended to make it easier to search for seeds on *TETR.IO*, a game of the *Block Stacking* genre. It will attempt to find *integer* seeds that will satisfy a particular number of starting pieces. It supports two different TETR.IO randomizers, **7-bag** and **Total Mayhem**. It can be configured to provide a specific number of seeds along with the range in which the seed must be. It also supports viewing the pieces of a particular seed, which may be tangentially useful.