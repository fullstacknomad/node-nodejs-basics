import { Worker } from "worker_threads";
import os from "os";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const performCalculations = async () => {
  const cpuCount = os.cpus().length;
  const workers = [];
  const workerPath = path.join(__dirname, "worker.js");

  for (let i = 0; i < cpuCount; i++) {
    const worker = new Worker(workerPath);
    const number = 10 + i;

    const promise = new Promise((resolve) => {
      worker.postMessage(number);

      worker.once("message", (result) => {
        resolve(result);
        worker.terminate();
      });

      worker.on("error", () => {
        resolve({ status: "error", data: null });
        worker.terminate();
      });
    });

    workers.push(promise);
  }

  const workerResults = await Promise.all(workers);
  console.log(workerResults);
};

await performCalculations();
