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
function searchWW(workers, generationData) {
  // cancel all workers if they are still running
  function cancelWorkers() {
    for (const worker of workers) {
      worker.terminate();
    }
  }
  
  return new Promise((resolve, reject) => {
    // compute number of total jobs
    const jobs = generationData.maxSeed - generationData.minSeed + 1; // including maxSeed
    
    // compute number of jobs for each worker
    const remainder = jobs % workers.length;
    let j = workers.length - remainder; // number of workers that will not get an extra job
    
    // initialize index and number of completed workers
    let index = generationData.minSeed;
    let completed = 0; // number of workers that have finished
    
    // initialize results array if searching for all seeds
    let results;
    if (generationData.searchType === "all") {
      results = [];
    }
    
    // send jobs to workers
    for (let i = 0; i < workers.length; i++) {
      const end = (
        index // start index
        + Math.floor(jobs / workers.length) // number of jobs per worker (floor)
        + Number(i < remainder) // if worker is in the remainder, add 1 job
      );
      
      // if worker is in thex first j workers, it will not get an extra job
      j--;
      
      // send message to worker to start searching for a seed
      workers[i].postMessage({
        type: generationData.searchType || "one", // default to "one" if not specified
        randomizer: generationData.randomizer || "7bag", // default to 7bag if not specified
        start: index,
        end,
        data: generationData.data,
        maximumSeedAmount: generationData.maximumSeedAmount || 1000, // default to 1000 if not specified
      });
      
      // message received from worker
      workers[i].onmessage = (e) => {
        // correct type
        if (e.data.type === "result") {
          if (generationData.searchType === "one") { // searching for one
            if (e.data.result !== false) { // found seed
              resolve(e.data.result);
              cancelWorkers();
            } else { // didn't find seed
              completed++;
              if (completed === workers.length) {
                // all workers didn't find a seed
                resolve(false);
                cancelWorkers();
              }
            }
          } else if (generationData.searchType === "all") { // searching for all
            // result will always be an array of seeds
            if (Array.isArray(e.data.result)) { // is array
              results.push(...e.data.result);
            } else if (e.data.result !== false) { // is individual seed
              results.push(e.data.result);
            }
            
            if (
              results.length >= generationData.maximumSeedAmount // reached maximum seed amount
            ) {
              resolve(results);
              cancelWorkers();
            }
          }
        } else if (e.data.type === "completed") {
          if (generationData.searchType === "all") {
            completed++;
            if (completed === workers.length) {
              // all workers have finished
              resolve(results);
              cancelWorkers();
            } 
          }
        }
      };
      
      index = end;
    }
  });
}

export { createWorkers, workerCount, searchWW };