import path from "node:path";
import { release, version } from "node:os";
import { createServer as createServerHttp } from "node:http";
import { fileURLToPath } from "node:url";
import fs from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import .cjs file - note: you may need to adjust this based on your setup
import("./files/c.cjs").catch((err) => {
  console.error("Error importing c.cjs:", err);
});

const random = Math.random();

const unknownObject =
  random > 0.5
    ? JSON.parse(
        fs.readFileSync(new URL("./files/a.json", import.meta.url), "utf8")
      )
    : JSON.parse(
        fs.readFileSync(new URL("./files/b.json", import.meta.url), "utf8")
      );

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const myServer = createServerHttp((_, res) => {
  res.end("Request accepted");
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log("To terminate it, use Ctrl+C combination");
});

export { unknownObject, myServer };
