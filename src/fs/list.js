import { readdir, access } from "fs/promises";
import { join } from "path";

const list = async () => {
  const dirPath = join("src/fs", "files");

  try {
    await access(dirPath);
  } catch {
    throw new Error("FS operation failed");
  }

  const files = await readdir(dirPath);
  console.log(files);
};

await list();
