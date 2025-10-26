import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const read = async () => {
  const filePath = path.join(__dirname, "files", "fileToRead.txt");
  const stream = fs.createReadStream(filePath);

  stream.pipe(process.stdout);

  stream.on("error", (err) => {
    console.error("Error reading file:", err);
    process.exit(1);
  });
};

await read();
