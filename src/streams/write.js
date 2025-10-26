import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const write = async () => {
  const filePath = path.join(__dirname, "files", "fileToWrite.txt");
  const stream = fs.createWriteStream(filePath);

  process.stdin.pipe(stream);

  stream.on("error", (err) => {
    console.error("Error writing file:", err);
    process.exit(1);
  });
};

await write();
