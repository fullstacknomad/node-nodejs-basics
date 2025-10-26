import { unlink, access } from "fs/promises";
import { join } from "path";

const remove = async () => {
  const filePath = join("src/fs/files", "fileToRemove.txt");

  try {
    await access(filePath);
    await unlink(filePath);
  } catch {
    throw new Error("FS operation failed");
  }
};

await remove();
