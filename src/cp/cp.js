import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const spawnChildProcess = async (args) => {
  const scriptPath = join(__dirname, "files", "script.js");
  const childProcess = spawn("node", [scriptPath, ...args]);
  process.stdin.pipe(childProcess.stdin);
  childProcess.stdout.pipe(process.stdout);
};
spawnChildProcess(/* [someArgument1, someArgument2, ...] */);
