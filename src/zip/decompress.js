import fs from "fs";
import zlib from "zlib";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const decompress = async () => {
  const inputFile = path.join(__dirname, "archive.gz");
  const outputFile = path.join(__dirname, "files", "fileToCompress.txt");

  const readStream = fs.createReadStream(inputFile);
  const writeStream = fs.createWriteStream(outputFile);
  const gunzipStream = zlib.createGunzip();

  readStream.pipe(gunzipStream).pipe(writeStream);

  readStream.on("error", (err) => {
    console.error("Error reading file:", err);
    process.exit(1);
  });

  writeStream.on("error", (err) => {
    console.error("Error writing file:", err);
    process.exit(1);
  });
};

await decompress();
