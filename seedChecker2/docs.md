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

### Single Seed Processing

The random number generator, a *Linear Congruential Generator*, can be reduced to simply choosing an index in a long, repeating list of numbers. Each seed is simply associated 

### Important Numbers

-6: 1483866096 (jump backward one bag)
-1: 1407677000 (modular multiplicative inverse)
+1: 16807
+2: 282475249
+4: 984943658
+6: 470211272 (jump forward one bag)
+8: 1457850878
+16: 1137522503
+32: 1636807826
+64: 685118024
+128: 515204530
+256: 897054849
+512: 2038299453
+1024: 1836275591
+2048: 349037107
+4096: 149796865
+8192: 1186652285
+16384: 2106880871
+32768: 877809922
+65536: 1682791109
+131072: 1900685356
+262144: 2080563572
+524288: 612544882
+1048576: 1295048709
+2097152: 1987420232
+4194304: 868966365
+8388608: 1331238991
+16777216: 1550655590
+33554432: 766698560
+67108864: 1154667137
+134217728: 901595110
+268435456: 1008653149
+536870912: 1821072732
+1073741824: 2147466840