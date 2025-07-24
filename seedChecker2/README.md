# SeedChecker V2

A program to brute force seeds in the game **TETR.IO**.

The successor to *Seed Checker V1*. This new program uses more advanced algorithms to quickly brute force game seeds. Rather than shuffling queues, it instead only operates on numbers and more efficiently compares it to caching lists. To further multiply the speed, multithreading is implemented to make use of all logical processors on the machine, allowing for faster and more efficient seed checking on a web application.

## About Block Stacking Games

Before using this program, it's important to know the terminology and meaning behind its purpose. A *piece* is a tetromino, and there are 7 distinct variations (`ZLOSIJT`). A *randomizer* is the method in which the pieces are randomized. A *seed* is a number that will always result in the same piece queue.

## Functions and Use Cases

This program was primarily intended to make it easier to search for seeds on *TETR.IO*, a game of the *Block Stacking* genre. It will attempt to find *integer* seeds that will satisfy a particular number of starting pieces. It supports two different TETR.IO randomizers, **7-bag** and **Total Mayhem**. It can be configured to provide a specific number of seeds along with the range in which the seed must be. It also supports viewing the pieces of a particular seed, which may be tangentially useful.

# Curiosities

The LCG is very simplistic, and for some reason, TETR.IO didn't restrict the seed input to exclusively be integers. Below are some interesting seeds and how it was found. The function `f` will be an iteration of the LCG that is implicit before every script.

```js
f = (x) => (x 16807) % 2147483647;
```

## $x = f(x)$

For integers, the numbers chosen for the LCG were selected so that integers do not repeat until after all of the possible integers have been iterated through. However, for floats, numbers can be chosen to satisfy this. In JavaScript, because floating point numbers have inaccuracies, theoretically working numbers would not actually work. However, it is possible to brute force a working number:

```js

for (let i=1; i<127781; i++) {
  const n = 2147483647*i / 16806;
  if (n === f(n)) console.log(n);
}
```

There is only one number that appears to work, and it is `1073741823.5`. Using this number as a seed will yield repeating bags of `IZTLJOS`. It is equal to 2147483641 / 2, so it might be worth trying dividing by other numbers.

Dividing by other numbers yields similar results:

```
2147483647 / 4 = 1610612735.25
2147483647 / 8 = 268435455.875
2147483647 / 16 = 134217727.9375
```

However, the last one repeats every two iterations, alternating with another number `939524095.5625`. The numbers can also be multiplied by other coefficients to yield new seeds, like 3 * 2147483647 / 8