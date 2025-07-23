// web worker handler

// number of workers
let workerCount = navigator.hardwareConcurrency || 1;

function createWorkers(path="./7bag/ww.js", count=workerCount) {
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
  // cancel all workers if they are still running
  function cancelWorkers() {
    for (const worker of workers) {
      worker.terminate();
    }
  }
  
  return new Promise((resolve, reject) => {
    // compute number of jobs for each worker
    const remainder = 2147483646 % workers.length;
    let j = workers.length - remainder; // number of workers that will not get an extra job
    
    // initialize index and number of rejected workers
    let index = 1; // start from 1, since 0 is not a valid seed
    let rejected = 0; // number of workers that have rejected the seed
    
    // send jobs to workers
    for (let i = 0; i < workers.length; i++) {
      const end = (
        index // start index
        + Math.floor(214748364 / workers.length) // number of jobs per worker (floor)
        + Number(i < remainder) // if worker is in the remainder, add 1 job
      );
      
      // if worker is in the first j workers, it will not get an extra job
      j--;
      
      // send message to worker to start searching for a seed
      workers[i].postMessage({
        type: "getOneInRange",
        start: index,
        end,
        data: data,
      });
      
      // message received from worker
      workers[i].onmessage = (e) => {
        // correct type
        if (e.data.type === "result") {
          if (e.data.result !== false) { // found seed
            resolve(e.data.result);
            cancelWorkers();
          } else { // didn't find seed
            rejected++;
            if (rejected === workers.length) {
              // all workers didn't find a seed
              resolve(false);
              cancelWorkers();
            }
          }
        }
      };
      index = end;
    }
  });
}

export { createWorkers, workerCount, findOne };