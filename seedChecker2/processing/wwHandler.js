// web worker handler

// number of workers
let workerCount = navigator.hardwareConcurrency || 1;

function createWorkers(path="./ww.js", count=workerCount) {
  const workers = [];
  for (let i = 0; i < count; i++) {
    const worker = new Worker(new URL(path, import.meta.url), {
      type: "module",
    });
    workers.push(worker);
  }
  return workers;
}

/**
 * will find a valid seed for a queue given by some data
 */
function findOne(workers, data) {
  return new Promise((resolve, reject) => {
    const remainder = 2147483646 % workers.length;
    let j = workers.length - remainder; // number of workers that will not get an extra job
    let index = 1; // start from 1, since 0 is not a valid seed
    let rejected = 0; // number of workers that have rejected the seed
    for (let i = 0; i < workers.length; i++) {
      const start = index;
      const end = (
        start
        + Math.floor(214748364 / workers.length)
        + Number(i < remainder)
      );
      j--;
      workers[i].postMessage({
        type: "getOneInRange",
        start,
        end,
        data: data,
      });
      workers[i].onmessage = (e) => {
        if (e.data.type === "result") {
          if (e.data.result !== false) {
            resolve(e.data.result);
            // cancel worker jobs
            for (let k = 0; k < workers.length; k++) {
              if (k !== i) {
                workers[k].terminate();
              }
            }
          } else {
            rejected++;
            if (rejected === workers.length) {
              // all workers have rejected the seed
              resolve(false);
            }
          }
        }
      };
      index = end;
    }
  });
}

export { createWorkers, workerCount, findOne };