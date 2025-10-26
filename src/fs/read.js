import { readFile, access } from "fs/promises";
import { join } from "path";

const read = async () => {
  const filePath = join("src/fs/files", "fileToRead.txt");

  try {
    await access(filePath);
    const content = await readFile(filePath, "utf8");
    console.log(content);
  } catch {
    throw new Error("FS operation failed");
  }
};

await read();
