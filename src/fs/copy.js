import { cp, access } from "fs/promises";
import { join } from "path";

const copy = async () => {
  const srcDir = join("src/fs", "files");
  const destDir = join("src/fs", "files_copy");

  try {
    await access(srcDir);
  } catch {
    throw new Error("FS operation failed");
  }

  try {
    await access(destDir);
    throw new Error("FS operation failed");
  } catch (error) {
    if (error.message === "FS operation failed" && error.code !== "ENOENT") {
      throw error;
    }
    await cp(srcDir, destDir, { recursive: true });
  }
};

await copy();
