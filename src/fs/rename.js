import { rename as renameFile, access } from "fs/promises";
import { join } from "path";

const rename = async () => {
  const oldPath = join("src/fs/files", "wrongFilename.txt");
  const newPath = join("src/fs/files", "properFilename.md");

  try {
    await access(oldPath);
  } catch {
    throw new Error("FS operation failed");
  }

  try {
    await access(newPath);
    throw new Error("FS operation failed");
  } catch (error) {
    if (error.message === "FS operation failed" && error.code !== "ENOENT") {
      throw error;
    }
    await renameFile(oldPath, newPath);
  }
};

await rename();
