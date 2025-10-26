import fs from "fs";
import crypto from "crypto";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const calculateHash = async () => {
  const filePath = path.join(__dirname, "files", "fileToCalculateHashFor.txt");
  const hash = crypto.createHash("sha256");
  const stream = fs.createReadStream(filePath);

  stream.on("data", (chunk) => {
    hash.update(chunk);
  });

  stream.on("end", () => {
    const hashHex = hash.digest("hex");
    console.log(hashHex);
  });

  stream.on("error", (err) => {
    console.error("Error reading file:", err);
    process.exit(1);
  });
};

await calculateHash();
