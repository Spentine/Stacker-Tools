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

### Important Numbers

-6: 1483866096 (jump backward one bag)
-1: 1407677000 (modular multiplicative inverse)
+1: 16807
+6: 470211272 (jump forward one bag)

## Implementation

The data that will be passed will be in a format that is most performant.

```js
{
  bags: ["ZLOSIJT", "ZLOS"],
  nums: [
    {
      full: true, // full bag
      fy: [1, 2, 3, 4, 5, 6],
      sN: 5039 // single number
    },
    {
      full: false, // not full bag
      nums: Set([ // all numbers that correspond
        3479, 4919, 3599,
        4199, 4319, 5039
      ]),
    }
  ]
}
```