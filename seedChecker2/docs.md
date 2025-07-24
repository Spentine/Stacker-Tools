# SeedChecker V2

*SeedChecker V2* is a successor to the previous version, *SeedChecker*. The UI should be more clean, and the code more performant. The most heaviest emphasis must be put on making the code faster.

## Performance

Because the main purpose of SeedChecker V2 is for performance benefits, it should be well-thought out and planned accordingly.

### Multi-Threading

Multi-threading is a powerful tool that can reduce the workload of a single core by distributing it onto multiple different logical processor cores. The `navigator.hardwareConcurrency` should be read to determine this number, but the user should also be able to freely decide what number they would want it to be.

Once a number has been decided for that number of cores, the full seed domain would be evenly split up into equally sized portions and then allocated to the cores.

### Full Bags

The array shuffler, a *Fisher-Yates* shuffle, depends on **6** random numbers to generate a 7-bag queue. Therefore, it is possible to associate a piece sequence to six numbers, which can skip the overhead of processing an array shuffle.

### Incomplete Bags

Incomplete bags, however, will have many different numbers that are valid. To also skip the overhead of shuffling incomplete bags, a preprocessed dictionary of queues should be generated, and all the valid number sequences should be collected into a set.

# Curiosities

The LCG is very simplistic, and for some reason, TETR.IO didn't restrict the seed input to exclusively be integers. Below are some interesting seeds and how it was found. The function `f` will be an iteration of the LCG that is implicit before every script.

```js
f = (x) => (x 16807) % 2147483647;
```

## $x = f(x)$

For integers, the numbers chosen for the LCG were selected so that integers do not repeat until after all of the possible integers have been iterated through. However, for floats, numbers can be chosen to satisfy this. In JavaScript, because floating point numbers have inaccuracies, theoretically working numbers would not actually work.

To solve the equation, first expand the equation $x = f(x)$, where $n$ is an integer, and solve for $x$.

$$
x = 16807x + 2147483647n \\
16806x = -2147483647n \\
x = \frac{2147483647n}{16806}
$$

However, due to floating point inaccuracies, many of the solutions wouldn't actually work. I will brute force solutions using a script:

```js
const a = 16807;
const m = 2147483647;
for (let i=1; i<(a-1)/m; i++) {
  const n = m*i / (a-1);
  if (n === f(n)) console.log(n);
}
```

This method resulted in the number `1073741823.5` (`2147483647 / 2`), which yields repeating bags of `IZTLJOS`.

## $x = f^r(x)$

To solve this, first expand the equation and solve for $x$.

$$
x = 16807^r x + 2147483647n \\
(16807^r - 1)x = -2147483647n \\
x = \frac{2147483647n}{16807^r - 1}
$$

Because of floating point inaccuracies, many theoretical solutions wouldn't work, and only powers of 2 should be used. It's not possible to brute force seeds either because of the sheer number of seeds. To check how many powers of two it allows, calculate the largest power of two $16807^r-1$ is divisible by. Below is a small table with corresponding values of `r` and the power of two.

| $r$ | $2^m$ |
| - | - |
| 1 | 1 |
| 2 | 4 |
| 9 | 7 |
| 13 | 11 |

However, because of the compounding inaccuracies caused by floating point numbers, even powers of 2 don't work beyond a certain point.

Recall the iteration algorithm, but note the number of binary significant figures in each number; 16807 is about 14.03 bits and 2147483647 is 31 bits. In total, the amount used for computation is 45. Floating point numbers lose precision past 53 bits, so there are only about 7.97 bits of information available to be inaccurate. When dividing by 2, it consumes an extra bit in the form of a decimal, while the overall sizes of the integer component still reach up to 31 bits. Therefore, the maximum number of safe bits is 7 bits, which is the maximum amount.